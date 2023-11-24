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
            source={require("../../assets/homescreen/notTransparent.jpg")}
            style={styles.imageContainer}
          />
           <Text style={styles.graphParagraphText}>
          Visualizing the statistics of our local water sources is important for 
          determining the water quality. We aim to optimize this process so one day
          we can put it into our drinking water sources. 
        </Text>
          <TouchableHighlight
            onPress={() => {
              handleDataHubPress();
            }}
          >
            <View style={styles.graphButton}>
              <Text style={styles.mainButtonText}>See Historical Data...</Text>
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

        <View style = {{backgroundColor: 'black', height: deviceHeight/15, width: deviceWidth}}></View>
        <Image
              source ={{uri: "https://cdn.discordapp.com/attachments/1151185129549602860/1173717151232839700/Blue_CoLab_2.png?ex=6564f847&is=65528347&hm=139e1acbabfdb193ad52e2b60687e7a8347eab9061333f2e254447b6d791a10d&"}}
              style={{ height: deviceHeight/16.5, width: deviceWidth/1.8, margin: deviceWidth/20, position: 'absolute', left: -deviceWidth/25, bottom: -deviceWidth/25 }}
            />

        

      </View>
    </ScrollView>
  );
}
