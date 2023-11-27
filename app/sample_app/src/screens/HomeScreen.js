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

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;


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
  const handleBlogScreenPress = () => {
    navigation.navigate("Blog");
  };
  const handleAiPress = () => {
    navigation.navigate("Ai");
  }

  return (
    <ScrollView>
      <View style={styles.container}>

        <View style={styles.buttonContainer}>
          <Image
            source={require("../../assets/homescreen/PXL_20221014_204618892.png")}
            style={styles.imageContainer}
          />
          <Text style={styles.storyParagraphText}>
          Blue CoLab is a program of training, innovation, and research in 
          real-time water monitoring technologies, committed to the 
          principle that the human right to clean water requires the 
          right-to-know water is clean.
          </Text>
          <TouchableHighlight
            onPress={() => {
              handleStoryScreenPress();
            }}
          >
            <View style={styles.storyButton}>
              <Text style={styles.mainButtonText}>Learn more...</Text>
            </View>
          </TouchableHighlight>
        </View>
       
        <View style={styles.graphButtonContainer}>
          <Image
            source={{uri: "https://img.freepik.com/premium-vector/trading-graph-chart-growth-fall-business-profit-loss-stats-concept-vector-illustration_509058-11.jpg"}}
            style={styles.imageContainer}
          />
           <Text style={styles.graphParagraphText}>
          Adding sensors and visualizing the information and statistics of our local 
          water sources is important for determining the water quality. We aim 
          to optimize this process so one day we can put these sensors into our 
          drinking water sources and bring this type of information to people across
          the globe.
        </Text>
          <TouchableHighlight
            onPress={() => {
              handleDataHubPress();
            }}
          >
            <View style={styles.graphButton}>
              <Text style={styles.mainButtonText}>See Live Data...</Text>
            </View>
          </TouchableHighlight>
        </View>
        
        <View style={styles.animalButtonContainer}>
          <Image
            source={require("../../assets/homescreen/turtle.png")}
            style={styles.imageContainer}
          />
           <Text style={styles.paragraphText}>
          Animals need clean water too. Measuring water quality is important
          to the wildlife as well as it can cause health problems for them.
          Learn about how Wildlife in Choate Pond and the Hudson River is affect
          by changes in certain statistics in water quality.
          </Text>
          <TouchableHighlight
            onPress={() => {
              handleWildlifeScreenPress();
            }}
          >
            <View style={styles.wildlifeButton}>
              <Text style={styles.mainButtonText}>See Local Wildlife...</Text>
            </View>
          </TouchableHighlight>
        </View>

        <View style={styles.weatherButtonContainer}>
          <Image
            source={require("../../assets/homescreen/lightning-bolts.jpg")}
            style={styles.imageContainer}
          />
          <Text style={styles.paragraphText}>
          Weather has a signifigant impact on the health of marine ecosystems.
          </Text>
          <TouchableHighlight
            onPress={() => {
              handleWeatherScreenPress();
            }}
          >
            <View style={styles.weatherButton}>
              <Text style={styles.mainButtonText}>See Local Weather...</Text>
            </View>
          </TouchableHighlight>
        </View>

        <View style={styles.buttonContainer}>
          <Image
            source={require("../../assets/homescreen/waterSplash2.jpg")}
            style={styles.imageContainer}
          />
          <Text style={styles.storyParagraphText}>
          Check out some of the Blue CoLab Blogs.
          </Text>
          <TouchableHighlight
            onPress={() => {
              handleBlogScreenPress();
            }}
          >
            <View style={styles.storyButton}>
              <Text style={styles.mainButtonText}>Learn more...</Text>
            </View>
          </TouchableHighlight>
        </View>

        <View style={styles.buttonContainer}>
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
            <View style={styles.storyButton}>
              <Text style={styles.mainButtonText}>Discover more...</Text>
            </View>
          </TouchableHighlight>
        </View>

      </View>
    </ScrollView>
  );
}
