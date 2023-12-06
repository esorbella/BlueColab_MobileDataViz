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

  return (
    <ScrollView>
      <View style={styles.container}>

        
        {/*Start Our Story Widget*/}
        <View style={styles.buttonContainer}>
          {/*Choate pond image*/}
          <Image
            source={require("../../assets/homescreen/PXL_20221014_204618892.png")}
            style={styles.imageContainer}
          />
          <Text style={styles.storyParagraphText}>
            Blue CoLab is a program of training, innovation, and research in
            real-time water monitoring technologies, committed to the principle
            that the human right to clean water requires the right-to-know water
            is clean.
          </Text>

          {/*Start Our story button*/}
          <TouchableHighlight
            onPress={() => {
              handleStoryScreenPress();
            }}
          >
            <View style={styles.storyButton}>
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
          <Text style={styles.graphParagraphText}>
            Adding sensors and visualizing the information and statistics of our
            local water sources is important for determining the water quality.
            We aim to optimize this process so one day we can put these sensors
            into our drinking water sources and bring this type of information
            to people across the globe.
          </Text>
          {/*Start Data Hub button*/}
          <TouchableHighlight
            onPress={() => {
              handleDataHubPress();
            }}
          >
            <View style={styles.graphButton}>
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
          <Text style={styles.paragraphText}>
            Some of the local wildlife in both Choate Pond and the 
            Hudson River might surprise you. View this page to learn about 
            the wildlife in these bodies of water and what they are doing 
            at this time of year!
          </Text>
          {/*Start wildlife button*/}
          <TouchableHighlight
            onPress={() => {
              handleWildlifeScreenPress();
            }}
          >
            <View style={styles.wildlifeButton}>
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
          <Text style={styles.paragraphText}>
            Weather has a signifigant impact on the health of marine ecosystems.
          </Text>

          {/*Start Weather Button*/}
          <TouchableHighlight
            onPress={() => {
              handleWeatherScreenPress();
            }}
          >
            <View style={styles.weatherButton}>
              <Text style={styles.mainButtonText}>See Local Weather...</Text>
            </View>
          </TouchableHighlight>
          {/*End Weather Button*/}
        </View>
        {/*End Weather Widget*/}

        {/*Start blog page*/}
        <View style={styles.buttonContainer}>
          {/*Water Splash picture*/}
          <Image
            source={require("../../assets/homescreen/waterSplash2.jpg")}
            style={styles.imageContainer}
          />
          <Text style={styles.storyParagraphText}>
            Check out some of the Blue CoLab Blogs.
          </Text>
          {/*Start blog page button*/}
          <TouchableHighlight
            onPress={() => {
              handleBlogScreenPress();
            }}
          >
            <View style={styles.storyButton}>
              <Text style={styles.mainButtonText}>Learn more...</Text>
            </View>
          </TouchableHighlight>
          {/*End blog page button*/}
        </View>
        {/*End blog page*/}

        {/*Start AI Widget*/}
        <View style={styles.aiWidget}>
          <Image
            source={require("../../assets/homescreen/waterQuestion.jpg")}
            style={styles.imageContainer}
          />
          <Text style={styles.storyParagraphText}>
            Coming Soon: What's That in The Water
          </Text>
          <TouchableHighlight
            onPress={() => {
              handleAiPress();
            }}
          >
            <View style={styles.aiWidgetButton}>
              <Text style={styles.mainButtonText}>Discover more...</Text>
            </View>
          </TouchableHighlight>
        </View>
        {/*End AI Widget*/}

        <Text>
          {" "}
          Hidden text to make the bottom on this screen come out a little more{" "}
        </Text>
      </View>
    </ScrollView>
  );
}
