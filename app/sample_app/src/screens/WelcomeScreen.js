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

export default function WelcomeScreen({ navigation }) {
    const handleHomeScreenPress = () => {
      navigation.navigate("Home");
    };
   
    return(
        <View style = {styles.welcome}>

            <Image
              source ={{uri: "https://cdn.discordapp.com/attachments/1151185129549602860/1173719162003140759/Blue_CoLab_logo_brighter_1000.png?ex=6564fa26&is=65528526&hm=19a806fbdf53d45701f793e4e24d429973dbb8ed163d6a257de56aafbda3dd72&"}}
              style={{ height: 250, width: 250 }}
            />
            <TouchableHighlight
            onPress={() => {
                handleHomeScreenPress();
            }}
            >
        <Text style = {styles.paragraphText}> Welcome </Text>
        </TouchableHighlight>
        </View>
    );
}
