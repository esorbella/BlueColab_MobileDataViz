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

//This screen is the first screen that appears in the app

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

//quote declaration, add or remove as needed
let quote1 =
  "Humans can live longer without food than water, so communication about clean water is essential to help avoid the risk of cholera, dysentery, malnutrition, famine, and death.- Tae Yoo";
let quote2 =
  "For many of us, clean water is so plentiful and readily available that we rarely, if ever, pause to consider what life would be like without it. - Marcus Samuelsson";
let quote3 =
  "Clean water is such a treasure that we take for granted in America. - Hannah Teter";
let quote4 =
  "Clean water and power is our right as humans on this earth. - William Kamkwamba";
let quote5 =
  "Without regard to whether some place is wealthy or poor, everybody should have the chance at clean air and clean water. - Barack Obama";
let quote6 =
  "Water is one of the most basic of all needs - we cannot live for more than a few days without it. And yet, most people take water for granted. We waste water needlessly and don't realize that clean water is a very limited resource. -Robert Alan Aurthur";

//array declaration, modify this if quotes are added or removed
const quoteArr = [quote1, quote2, quote3, quote4, quote5, quote6];

//this line takes a random quote from the array and puts it into quoteUsed
let quoteUsed = quoteArr[Math.floor(Math.random() * quoteArr.length)];

export default function WelcomeScreen({ navigation }) {
  const handleHomeScreenPress = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={styles.welcome}>



      {/* Blue colab logo image */}
      <Image
        source={{
          uri: "https://cdn.discordapp.com/attachments/1151185129549602860/1173719162003140759/Blue_CoLab_logo_brighter_1000.png?ex=6564fa26&is=65528526&hm=19a806fbdf53d45701f793e4e24d429973dbb8ed163d6a257de56aafbda3dd72&",
        }}
        style={{
          height: deviceHeight / 3.5,
          width: deviceHeight / 3.5,
          margin: deviceWidth / 20,
        }}
      />

      {/*Random quote text component*/}
      <Text style={styles.quoteText}> {quoteUsed} </Text>

      {/*Get Started Button*/}
      <TouchableHighlight
        onPress={() => {
          handleHomeScreenPress();
        }}
      >
        <View style={styles.welcomeButton}>
          <Text style={styles.welcomeText}> Get Started </Text>
        </View>
      </TouchableHighlight>
      {/*End Get Started Button*/}

     
    </View>
  );
}
