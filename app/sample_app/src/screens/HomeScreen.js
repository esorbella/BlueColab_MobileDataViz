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
    navigation.navigate("Story");
  };
  const handleDataHubPress = () => {
    navigation.navigate("Hub");
  };
  const handleWeatherScreenPress = () => {
    navigation.navigate("Weather");
  };
  const handleWildlifeScreenPress = () => {
    navigation.navigate("Wildlife");
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Image
            source={require("../../assets/homescreen/PXL_20221014_204618892.png")}
            style={styles.imageContainer}
          />
          <Text style={styles.paragraphText}>
          Blue CoLab is a part of the Seidenberg school of CSIS and its ultimate
          purpose is to make viable and reliable ways to give clean water to
          those across the world. 
        </Text>
          <TouchableHighlight
            onPress={() => {
              handleStoryScreenPress();
            }}
          >
            <View style={styles.mainButton}>
              <Text style={styles.mainButtonText}>Learn more...</Text>
            </View>
          </TouchableHighlight>
        </View>

       

        <View style={styles.buttonContainer}>
          <Image
            source={require("../../assets/homescreen/notTransparent.jpg")}
            style={styles.imageContainer}
          />
           <Text style={styles.paragraphText}>
          Click the image above to see the data from different water sources in
          westchester
        </Text>
          <TouchableHighlight
            onPress={() => {
              handleDataHubPress();
            }}
          >
            <View style={styles.mainButton}>
              <Text style={styles.mainButtonText}>Historical Data</Text>
            </View>
          </TouchableHighlight>
        </View>

        

        <View style={styles.buttonContainer}>
          <Image
            source={require("../../assets/homescreen/lightning-bolts.jpg")}
            style={styles.imageContainer}
          />
          <Text style={styles.paragraphText}>
          Take a look at the local weather and how it affects water quality
        </Text>
          <TouchableHighlight
            onPress={() => {
              handleWeatherScreenPress();
            }}
          >
            <View style={styles.mainButton}>
              <Text style={styles.mainButtonText}>Local Weather</Text>
            </View>
          </TouchableHighlight>
        </View>


        <View style={styles.buttonContainer}>
          <Image
            source={require("../../assets/homescreen/turtle.png")}
            style={styles.imageContainer}
          />
           <Text style={styles.paragraphText}>
          Click above to read about Choate and Hudson Wildlife
        </Text>
          <TouchableHighlight
            onPress={() => {
              handleWildlifeScreenPress();
            }}
          >
            <View style={styles.mainButton}>
              <Text style={styles.mainButtonText}>Local Wildlife</Text>
            </View>
          </TouchableHighlight>
        </View>

       
      </View>
    </ScrollView>
  );
}
