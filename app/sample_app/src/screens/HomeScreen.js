import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  Image,
  ImageBackground,
} from "react-native";
import styles from "../../styles";


export default function HomeScreen({ navigation }) {
  const handleStoryScreenPress = () => {
    navigation.navigate('Story')
  }
  const handleDataHubPress = () => {
    navigation.navigate('Hub')
  }
  const handleWeatherScreenPress = () => {
    navigation.navigate('Weather')
  }
  

  return (
    <ScrollView>
      <View style={styles.container}>

       

        <TouchableHighlight
          onPress={() => {
            handleStoryScreenPress();
          }}
        >
          <View style={styles.buttonContainer}>
            
            <Image
              source={{ uri: "https://cdn.discordapp.com/attachments/1151185129549602860/1164227285323362406/PXL_20221014_204618892.png" }}
              style={{ height: "100%", width: "auto" }}
            />
            <View style={styles.mainButton}>
              <Text style={styles.mainButtonText}>Our Story</Text>
            </View>
          </View>
        </TouchableHighlight>

        <Text style={styles.paragraphText}>Click above to see our story</Text>
        
        <TouchableHighlight
          onPress={() => {
            handleDataHubPress();
          }}
        >
          <View style={styles.buttonContainer}>
            <Image
              source={{ uri: "https://cdn.discordapp.com/attachments/1151185129549602860/1164228432427753512/notTransparent.jpg?ex=65427338&is=652ffe38&hm=e2ea18de95f08c70d5cb91fa680c6100f589b454e64334f22699a1460065be30&" }}
              style={{ height: "100%", width: "auto" }}
            />
            <View style={styles.mainButton}>
              <Text style={styles.mainButtonText}>Historical Data</Text>
            </View>
          </View>
        </TouchableHighlight>

        <Text style={styles.paragraphText}>Click the image above to see the data of different water sources in westchester</Text>
        

        <TouchableHighlight
          onPress={() => {
            handleWeatherScreenPress();
          }}
        >
          <View style={styles.buttonContainer}>
            <Image
              source={{ uri: "https://images.nationalgeographic.org/image/upload/t_edhub_resource_key_image/v1638886301/EducationHub/photos/lightning-bolts.jpg" }}
              style={{ height: "100%", width: "auto" }}
            />
            <View style={styles.mainButton}>
              <Text style={styles.mainButtonText}>Local Weather</Text>
            </View>
          </View>
        </TouchableHighlight>

        <Text style={styles.paragraphText}>Click above to see the local weather and how it affects water quality</Text>
        

      </View>
    </ScrollView>
  );
}
