import { Camera, CameraType } from 'expo-camera';
import { useState, useEffect } from 'react';
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
  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    // Import the local JSON file using require
    const localJson = require('../../assets/USRIISv2_MasterList.json');

    // Access the JSON data
    setJsonData(localJson);
  }, []); // Run only once when the component mounts



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

  
  // STARTS SERVER SIDE LOGIC IGNORE
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
      const formData = new FormData();
      formData.append('organs', 'auto');

      // Append the image file to FormData
      formData.append('images', {
        uri: imageUri,
        name: 'image.png',
        type: 'image/png',
      });

      // Use the formData object in your API request
      const apiKey = '2b10RIKodP0IQc4eGgBJFaABO'; // Replace with your actual PlantNet API key
      const apiUrl = `https://my-api.plantnet.org/v2/identify/all?api-key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const responseData = await response.json();

      let plantList = responseData.results;

      // attaches links to images of the plants
      const promises = plantList.map(async (item) => {
        try {
          const result1 = await getImages(item.gbif.id);
          item.imgs = result1;
        } catch (error) {
          console.error(`Error for ${item.species.scientificNameWithoutAuthor}: ${error.message}`);
        }
      });

      await Promise.all(promises);


      try {
        const rows = jsonData.scientificName;
        
        // Iterate over CSV rows
        rows.forEach((row) => {
          currentName = row;
          plantList.forEach((species) => {
            const scientificNameWithoutAuthor = species.species.scientificNameWithoutAuthor;

            if (scientificNameWithoutAuthor === currentName) {
              species.invasive = true;
            } else if (species.invasive === true) {
              // edge case
            } else {
              species.invasive = false;
            }
          });
        });

        console.log('Finished reading the CSV file.');
        setSpeciesData(plantList);
       // console.log(result.data.results);
      } catch (error) {
        console.error(`An error occurred: ${error}`);
        res.status(500).json({ error: 'Internal Server Error' });
      }



      if (responseData != 'Species not found') {
        setSpeciesData(responseData.results);
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

  // gets images of plants
  async function getImages(id) {
    try {
      const apiUrl = `https://api.gbif.org/v1/species/${id}/media`;
      const response = await axios.get(apiUrl);

      const listOfNames = response.data.results.map(obj => obj.identifier);

      return listOfNames;
    } catch (error) {
      console.error(`Error: ${error.message}`);
      throw error; // Rethrow the error to handle it elsewhere if needed
    }
  }
  // ENDS SERVER SIDE LOGIC IGNORE

  return (
   
    <View style={styles.container}>
      
      { previewVisible && capturedImage ?
      (aiReplyVisible ? 
        (<AIResponse speciesData={speciesData} />) :  
        (<CameraPreview photo={capturedImage} savePhoto={__savePhoto} retakePicture={__retakePicture} /> ) ) 
        :
      (  <Camera style={styles.camera} type={type} ref={(ref) => { this.camera = ref }} > 
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
      </Camera>)
      }
    </View>
  );
}

// the Camera Preview component
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
                Analyze Photo
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}

// Component containing the logic to display AI Response 
const AIResponse = ({ speciesData }) => {
  const [isEnabled, setIsEnabled] = useState(false); // toggle to determine if scores < 1 should be shown
  const toggleSwitch = () => setIsEnabled(previousState => !previousState); // toggle on, off if < 1% score

  // loading screen images
  const loadingImages = [
    "https://cdn.dribbble.com/users/2882885/screenshots/7861928/media/a4c4da396c3da907e7ed9dd0b55e5031.gif",
    "https://media.tenor.com/DHkIdy0a-UkAAAAC/loading-cat.gif",
    "https://64.media.tumblr.com/bdaea39db57dc0b48d763262514268db/tumblr_mgj44mNyST1s199fdo1_500.gif",
    "https://cdn.dribbble.com/users/160117/screenshots/3197970/main.gif",
  ];

  const displaySpecies = (speciesData) => {
    if (speciesData.length > 0) { // valid array received
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
            data={speciesData}
            renderItem={({ item }) => <Item title={item.species.scientificNameWithoutAuthor} score={item.score} commonNames={item.species.commonNames} isInvasive={item.invasive} isEnabled={isEnabled} imgs={item.imgs} />}
            keyExtractor={item => item.species.scientificNameWithoutAuthor}
          />
        </SafeAreaView>
      );
    } else { // an error or we're still waiting for a response from a server. i.e. the screen that first appears after clicking "Analyze photo"
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

// this is the individual plant species it could be 
const Item = ({ title, score, commonNames, isInvasive, isEnabled, imgs }) => {

  // logic to check the toggle state
  if (isEnabled && score < 0.01) { // disabled
    return <></> 
  }
  if (commonNames.length <= 0) // if the number of common names is 0, it just displays the scientific name as the title
    return (<View style={styles.item}>
      <Text style={styles.sidewaystitle}><Text>{title}</Text></Text>
      <Text>Score: {Math.round(score * 10000) / 100}</Text>
      <Text>Invasive: {isInvasive ? "Yes" : "No"}</Text>
      <ImageGallery imageUrls={imgs} />
    </View>)
  else if ((commonNames.length == 1)) { // if the number of common names is 1, it displays that common name as the title and scientific name below
    return (<View style={styles.item}>
      <Text style={styles.title}>{commonNames[0]}</Text>
      <Text>Scientific Name: <Text style={styles.sideways} >{title}</Text></Text>
      <Text>Score: {Math.round(score * 10000) / 100}</Text>
      <Text>Invasive: {isInvasive ? "Yes" : "No"}</Text>
      <ImageGallery imageUrls={imgs} />
    </View>)
  } else if ((commonNames.length > 1)) { // if there's more then 1 common name; it displays the first one, other names below it and then the scientific name
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

// this is just the image gallery 
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
