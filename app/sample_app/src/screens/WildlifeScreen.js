import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  Image,
  ImageBackground,
  Dimensions, // Import Dimensions
} from "react-native";
import styles from "../../styles";

const windowWidth = Dimensions.get('window').width; // Get the screen width

export default function WildlifeScreen({navigation}) {

    return (
<<<<<<< Updated upstream
        <View>
=======
        <View style = {styles.container}>
>>>>>>> Stashed changes
            <Text> Wildlife in Choate Pond: </Text>
            <Image 
                source={{
                    uri: "https://th.bing.com/th/id/R.6dc550e4629145cbd44548c0b36a6145?rik=gHN9%2bthmmTih9A&riu=http%3a%2f%2fupload.wikimedia.org%2fwikipedia%2fcommons%2fe%2fed%2fLargemouth_bass_fish_underwater_animal_in_natural_habitat_micropterus_salmoides.jpg&ehk=BjhvQX7mchDiAAH0iVqhZ7QGdUjUlcL9SFFuNcRo6PM%3d&risl=&pid=ImgRaw&r=0"
                }}
                style={{width: windowWidth * 0.9, aspectRatio: 2097/1227}} 
                // Set width to 90% of screen width and maintain aspect ratio
            />
            <Text>Largemouth bass (Micropterus salmoides)</Text>
        </View>
    )
}
