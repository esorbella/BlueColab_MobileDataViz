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
  const handleWildlifeScreenPress = () => {
    navigation.navigate('Wildlife')
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
                source={require('../../assets/homescreen/PXL_20221014_204618892.png')}
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
              source={require('../../assets/homescreen/notTransparent.jpg')}
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
              source={require('../../assets/homescreen/lightning-bolts.jpg')}
              style={{ height: "100%", width: "auto" }}
            />
            <View style={styles.mainButton}>
              <Text style={styles.mainButtonText}>Local Weather</Text>
            </View>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => {
            handleWildlifeScreenPress();
          }}
        >
          <View style={styles.buttonContainer}>
            <Image
              source={require('../../assets/homescreen/turtle.png')}
              style={{ height: "100%", width: "auto" }}
            />
            <View style={styles.mainButton}>
              <Text style={styles.mainButtonText}>Local Wildlife</Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    </ScrollView>
  );
}
