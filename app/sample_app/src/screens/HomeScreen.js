import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  Image,
  ImageBackground,
  Dimensions,
} from "react-native";
import styles from "../../styles";

//this is the first screen you see after the welcome screen
//takes you to all the other sections of the app

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

export default function HomeScreen({ navigation }) {
  //each of these constants handle navigation from each button
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
  const handleBlogScreenPress = () => {
    navigation.navigate("Blog");
  };
  const handleAiPress = () => {
    navigation.navigate("Ai");
  };

  const handleAttributionPress = () => {
    navigation.navigate("Attributions");
  }

  return (
    <ScrollView>
      <View style={styles.container}>


        {/*Start Our Story Widget*/}
        <View style={styles.BlueCoLabContainer}>
          {/*Choate pond image*/}
          <Image
            source={require("../../assets/homescreen/PXL_20221014_204618892.png")}
            style={styles.imageContainer}
          />
          <Text style={styles.homeParagraphText}>
            This app is brought to you by Blue CoLab, a program committed to the principle
            that the human right to clean water requires the right-to-know that water
            is clean.
          </Text>

          {/*Start Our story button*/}
          <TouchableHighlight
            onPress={() => {
              handleStoryScreenPress();
            }}
          >
            <View style={styles.generalButton}>
              <Text style={styles.mainButtonText}>Learn more...</Text>
            </View>
          </TouchableHighlight>
          {/*End Our Story Button*/}
        </View>
        {/*End Our Story Widget*/}

        {/*Start Graph Widget*/}
        <View style={styles.graphButtonContainer}>
          {/*Green graph image*/}
          <Image
            source={{
              uri: "https://img.freepik.com/premium-vector/trading-graph-chart-growth-fall-business-profit-loss-stats-concept-vector-illustration_509058-11.jpg",
            }}
            style={styles.imageContainer}
          />
          <Text style={styles.homeParagraphText}>
            It is important to know the quality of water before you swim or fish
            in it. The purpose of our app is to make this information more accessible. 
          </Text>
          {/*Start Data Hub button*/}
          <TouchableHighlight
            onPress={() => {
              handleDataHubPress();
            }}
          >
            <View style={styles.generalButton}>
              <Text style={styles.mainButtonText}>See Live Data...</Text>
            </View>
          </TouchableHighlight>
          {/*End Data Hub Button*/}
        </View>
        {/*End Graph Widget*/}

        {/*Start Wildlife Widget*/}
        <View style={styles.animalButtonContainer}>
          <Image
            source={require("../../assets/homescreen/turtle.png")}
            style={styles.imageContainer}
          />
          <Text style={styles.homeParagraphText}>
            Some of the local wildlife in both Choate Pond and the 
            Hudson River might surprise you!
          </Text>
          {/*Start wildlife button*/}
          <TouchableHighlight
            onPress={() => {
              handleWildlifeScreenPress();
            }}
          >
            <View style={styles.generalButton}>
              <Text style={styles.mainButtonText}>See Local Wildlife...</Text>
            </View>
          </TouchableHighlight>
          {/*End Wildlife button*/}
        </View>
        {/*End Wildlife Widget*/}

        {/*start Weather Widget*/}
        <View style={styles.weatherButtonContainer}>
          {/*Lightning image*/}
          <Image
            source={require("../../assets/homescreen/lightning-bolts.jpg")}
            style={styles.imageContainer}
          />
          <Text style={styles.homeParagraphText}>
            Weather has a significant impact on the health of aquatic ecosystems.
          </Text>

          {/*Start Weather Button*/}
          <TouchableHighlight
            onPress={() => {
              handleWeatherScreenPress();
            }}
          >
            <View style={styles.generalButton}>
              <Text style={styles.mainButtonText}>See Local Weather...</Text>
            </View>
          </TouchableHighlight>
          {/*End Weather Button*/}
        </View>
        {/*End Weather Widget*/}

        {/*Start blog page*/}
        <View style={styles.BlogContainer}>
          {/*Water Splash picture*/}
          <Image
            source={require("../../assets/homescreen/waterSplash2.jpg")}
            style={styles.imageContainer}
          />
          <Text style={styles.homeParagraphText}>
            Check out some of the Blue CoLab Blogs!
          </Text>
          {/*Start blog page button*/}
          <TouchableHighlight
            onPress={() => {
              handleBlogScreenPress();
            }}
          >
            <View style={styles.generalButton}>
              <Text style={styles.mainButtonText}>Learn more...</Text>
            </View>
          </TouchableHighlight>
          {/*End blog page button*/}
        </View>
        {/*End blog page*/}

        {/*Start AI Widget*/}
        <View style={styles.aiWidget}>
          <Image
            source={require("../../assets/homescreen/Plant2.jpg")}
            style={styles.imageContainer}
          />
          <Text style={styles.homeParagraphText}>
            Use this AI to identify any species of plant that you may see outdoors!
          </Text>
          <TouchableHighlight
            onPress={() => {
              handleAiPress();
            }}
          >
            <View style={styles.generalButton}>
              <Text style={styles.mainButtonText}>Discover more...</Text>
            </View>
          </TouchableHighlight>
        </View>
        <View style={styles.attributionsWidget}>
          <Image
            source={require("../../assets/homescreen/code.jpg")}
            style={styles.imageContainer}
          />
          <Text style={styles.homeParagraphText}>
          Code & Data Attributions
          </Text>
          <TouchableHighlight
            onPress={() => {
              handleAttributionPress();
            }}
          >
            <View style={styles.generalButton}>
              <Text style={styles.mainButtonText}>Learn more...</Text>
            </View>
          </TouchableHighlight>
        </View>
        {<Text >
          {" "}
          Hidden text to make the bottom on this screen come out a little more{" "}
        </Text>}
      </View>
    </ScrollView>
  );
}
