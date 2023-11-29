import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';
import { Dimensions, Switch, Button, StyleSheet, Text, TouchableOpacity, View, ImageBackground, Image, SafeAreaView, FlatList, TouchableHighlight } from 'react-native';
import axios from 'axios';
import { Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import styles from "../../styles";

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;


export default function AiScreen({ navigation }) {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [previewVisible, setPreviewVisible] = useState(false)
  const [capturedImage, setCapturedImage] = useState(null)
  const [aiReplyVisible, setAIVisible] = useState(false);
  const [speciesData, setSpeciesData] = useState([]);



  // permission handling
  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    //permission screen
    
    return (
      <View style={styles.aiContainer}>
        <Text style = {styles.aiParagraphText}>We need permission to use your device's camera</Text>
        <Image
        source = {require('../../assets/robot.png')}
        style = {{ height: deviceHeight/3.5, width: deviceHeight/3.5, margin: deviceWidth/20 }}
            />
        <TouchableHighlight onPress={requestPermission}>
          <View style = {styles.aiButton}>
            <Text style = {styles.aiButtonText}> Grant Permission </Text>
          </View>

        </TouchableHighlight>
      </View>
    );
  }

  const takePicture = () => {
    if (this.camera) {
      this.camera.takePictureAsync({ onPictureSaved: onPictureSaved });
    }
  };

  const __retakePicture = () => {
    setCapturedImage(null)
    setPreviewVisible(false)
  }

  const onPictureSaved = (photo) => {
    setPreviewVisible(true)
    setCapturedImage(photo)
  }


  const __savePhoto = async () => {
    const uri = capturedImage.uri;
    uploadImage(uri);
    setAIVisible(true);
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setPreviewVisible(true);

      // Check if the result contains the 'assets' array
      if (result.assets && result.assets.length > 0) {
        // Use the first item in the 'assets' array
        setCapturedImage(result.assets[0]);
      } else {
        // Fallback to using the 'uri' property if 'assets' is not available (for older versions)
        setCapturedImage(result);
      }
    }
  };

  const toggleCameraType = () => {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  const uploadImage = async (imageUri) => {
    try {
      const formData = createFormData({ uri: imageUri });
      const response = await axios.post('http://192.168.1.211:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.message != 'Species not found') {
        setSpeciesData(response.data.result.data.results);
      } else {
        setSpeciesData([
          {
            species: {
              scientificNameWithoutAuthor: "Error! Could not identify a plant.",
              commonNames: []
            },
            score: 0,
            invasive: false
          }
        ]);
      }

    } catch (error) {
      // Handle errors
      console.error('Error uploading image: ', error);
    }
  };

  const createFormData = (photo, body = {}) => {
    const data = new FormData();

    data.append('photo', {
      name: 'photo.jpg',
      type: 'image/jpeg',
      uri: Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', ''),
    });

    // Append additional data to the FormData if needed
    Object.keys(body).forEach((key) => {
      data.append(key, body[key]);
    });

    return data;
  };

  return (
    <View style={styles.container}>
      {previewVisible && capturedImage ? (aiReplyVisible ? (<AIResponse speciesData={speciesData} />) : (<CameraPreview photo={capturedImage} savePhoto={__savePhoto} retakePicture={__retakePicture} />)
      ) : (<Camera style={styles.camera} type={type} ref={(ref) => { this.camera = ref }} >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={takePicture} >
            <Text style={styles.text}>Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={pickImage} >
            <Text style={styles.text}>Photo from Phone</Text>
          </TouchableOpacity>
        </View>
      </Camera>)}
    </View>
  );
}

const CameraPreview = ({ photo, retakePicture, savePhoto }) => {
  // console.log('The photo', photo)
  return (
    <View
      style={{
        backgroundColor: 'transparent',
        flex: 1,
        width: '100%',
        height: '100%'
      }}
    >
      <ImageBackground
        source={{ uri: photo && photo.uri }}
        style={{
          flex: 1
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            padding: 15,
            justifyContent: 'flex-end'
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <TouchableOpacity
              onPress={retakePicture}
              style={{
                width: 130,
                height: 40,

                alignItems: 'center',
                borderRadius: 4
              }}
            >
              <Text
                style={{
                  color: '#fff',
                  fontSize: 20
                }}
              >
                Re-take
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={savePhoto}
              style={{
                width: 130,
                height: 40,

                alignItems: 'center',
                borderRadius: 4
              }}
            >
              <Text
                style={{
                  color: '#fff',
                  fontSize: 20
                }}
              >
                analyze photo
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}
const ImageGallery = ({imageUrls}) => {

  return (
    <View style={styles.container}>
      <Text>Sample Images (if available):</Text>
      <FlatList
        data={imageUrls}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.thumbnail} />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const Item = ({ title, score, commonNames, isInvasive, isEnabled, imgs }) => {

  if (isEnabled && score < 0.01) {
    return <></>
  }


  if (commonNames.length <= 0)
    return (<View style={styles.item}>
      <Text style={styles.sidewaystitle}><Text>{title}</Text></Text>
      <Text>Score: {Math.round(score * 10000) / 100}</Text>
      <Text>Invasive: {isInvasive ? "Yes" : "No"}</Text>
      <ImageGallery imageUrls={imgs} />
    </View>)
  else if ((commonNames.length == 1)) {
    return (<View style={styles.item}>
      <Text style={styles.title}>{commonNames[0]}</Text>
      <Text>Scientific Name: <Text style={styles.sideways} >{title}</Text></Text>
      <Text>Score: {Math.round(score * 10000) / 100}</Text>
      <Text>Invasive: {isInvasive ? "Yes" : "No"}</Text>
      <ImageGallery imageUrls={imgs} />
    </View>)
  } else if ((commonNames.length > 1)) {
    return (<View style={styles.item}>
      <Text style={styles.title}>{commonNames[0]}</Text>
      <Text>Other Common Name(s): {commonNames.slice(1).join(", ")}</Text>
      <Text>Scientific Name: <Text style={styles.sideways} >{title}</Text></Text>
      <Text>Score: {Math.round(score * 10000) / 100}</Text>
      <Text>Invasive: {isInvasive ? "Yes" : "No"}</Text>
      <ImageGallery imageUrls={imgs} />
    </View>)
  }
};

const AIResponse = ({ speciesData }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const loadingImages = [
    "https://cdn.dribbble.com/users/2882885/screenshots/7861928/media/a4c4da396c3da907e7ed9dd0b55e5031.gif",
    "https://media.tenor.com/DHkIdy0a-UkAAAAC/loading-cat.gif",
    "https://64.media.tumblr.com/bdaea39db57dc0b48d763262514268db/tumblr_mgj44mNyST1s199fdo1_500.gif",
    "https://cdn.dribbble.com/users/160117/screenshots/3197970/main.gif",
  ];

  const displaySpecies = (species) => {
    if (species.length > 0) { // valid array received
      return (
        <SafeAreaView style={styles.container}>
          <View>
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
            <Text>Display responses with a score above 1%.</Text>
          </View>
          <FlatList
            data={species}
            renderItem={({ item }) => <Item title={item.species.scientificNameWithoutAuthor} score={item.score} commonNames={item.species.commonNames} isInvasive={item.invasive} isEnabled={isEnabled} imgs={item.imgs} />}
            keyExtractor={item => item.species.scientificNameWithoutAuthor}
          />
        </SafeAreaView>
      );
    } else { // an error or we're still waiting for a response from a server
      return (
        <View>
          <Text>Loading...</Text>
          <Image
            source={{ uri: loadingImages[Math.floor(Math.random() * loadingImages.length)] }}
            style={{ height: 500, width: 400 }} // Adjust the dimensions as needed
          />
        </View>
      );
    }


  }

  return (
    displaySpecies(speciesData)
  )
}


