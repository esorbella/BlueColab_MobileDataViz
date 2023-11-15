import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  Image,
  ImageBackground,
  Dimensions
} from "react-native";
import styles from "../../styles";

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

export default function WelcomeScreen({ navigation }) {
    const handleHomeScreenPress = () => {
      navigation.navigate("Home");
    };
   
    return(
        <View style = {styles.welcome}>

            <Image
              source ={{uri: "https://cdn.discordapp.com/attachments/1151185129549602860/1173719162003140759/Blue_CoLab_logo_brighter_1000.png?ex=6564fa26&is=65528526&hm=19a806fbdf53d45701f793e4e24d429973dbb8ed163d6a257de56aafbda3dd72&"}}
              style={{ height: 250, width: 250, margin: 30 }}
            />
            <Text style = {styles.quoteText}> Humans can live longer without food than water, 
            so communication about clean water is essential to help avoid the 
            risk of cholera, dysentery, malnutrition, famine, and death. - Tae Yoo</Text>
            <TouchableHighlight
            onPress={() => {
                handleHomeScreenPress();
            }}
            >
        <View style = {styles.welcomeButton}>       
        <Text style = {styles.welcomeText}> Get Started </Text>
        </View>
        </TouchableHighlight>
      
        <Image
              source ={{uri: "https://cdn.discordapp.com/attachments/1151185129549602860/1173717151232839700/Blue_CoLab_2.png?ex=6564f847&is=65528347&hm=139e1acbabfdb193ad52e2b60687e7a8347eab9061333f2e254447b6d791a10d&"}}
              style={{ height: 52, width: 225, margin: deviceWidth/20, position: 'absolute', left: -deviceWidth/25, bottom: -deviceWidth/25 }}
            />

        </View>
    );
}
