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
    navigation.navigate('WIldlife')
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
              source={{ uri: "https://cdn.discordapp.com/attachments/1151185129549602860/1164227285323362406/PXL_20221014_204618892.png" }}
              style={{ height: "100%", width: "auto" }}
            />
            <View style={styles.mainButton}>
              <Text style={styles.mainButtonText}>Our Story</Text>
            </View>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => {
            handleDataHubPress();
          }}
        >
          <View style={styles.buttonContainer}>
            <Image
              source={{ uri: "https://cdn.discordapp.com/attachments/1151185129549602860/1164228432427753512/notTransparent.jpg?ex=65427338&is=652ffe38&hm=e2ea18de95f08c70d5cb91fa680c6100f589b454e64334f22699a1460065be30&" }}
              style={{ height: "100%", width: "auto" }}
            />
            <View style={styles.mainButton}>
              <Text style={styles.mainButtonText}>Historical Data</Text>
            </View>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => {
            handleWeatherScreenPress();
          }}
        >
          <View style={styles.buttonContainer}>
            <Image
              source={{ uri: "https://images.nationalgeographic.org/image/upload/t_edhub_resource_key_image/v1638886301/EducationHub/photos/lightning-bolts.jpg" }}
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
              source={{ uri: "https://th.bing.com/th/id/R.8a6285bd63687233c53b2c7aa8e40f8d?rik=uopynz9NTZ4qkg&riu=http%3a%2f%2fwww.conservativestewards.org%2fwp-content%2fuploads%2f2016%2f05%2fTurtles_sm.jpg&ehk=%2fznrbzjqkZVqCYzTQV0qQZ0id7H7ADNbc%2fOx7p0wxz4%3d&risl=&pid=ImgRaw&r=0" }}
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
