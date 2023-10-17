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

export default function HomeScreen({navigation}) {
const handleStoryScreenPress = () => {
        navigation.navigate('Our Story')
    }
const handleHistoricalDataScreenPress = () => {
        navigation.navigate('HistoricalData')
    }
 return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableHighlight
          onPress={() => {
            alert("Pressed Our Story");
          }}
        >
          <View style={styles.buttonContainer}>
            <Image
              source={{ uri: "https://i.imgur.com/MMXvBLp.jpg" }}
              style={{ height: "100%", width: "auto" }}
            />
            <View style={styles.mainButton}>
              <Text style={styles.mainButtonText}>Our Story</Text>
            </View>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => {
            handleHistoricalDataScreenPress();
          }}
        >
          <View style={styles.buttonContainer}>
            <Image
              source={{ uri: "https://i.imgur.com/MMXvBLp.jpg" }}
              style={{ height: "100%", width: "auto" }}
            />
            <View style={styles.mainButton}>
              <Text style={styles.mainButtonText}>Historical Data</Text>
            </View>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => {
            alert("Pressed Local Weather");
          }}
        >
          <View style={styles.buttonContainer}>
            <Image
              source={{ uri: "https://i.imgur.com/MMXvBLp.jpg" }}
              style={{ height: "100%", width: "auto" }}
            />
            <View style={styles.mainButton}>
              <Text style={styles.mainButtonText}>Local Weather</Text>
            </View>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => {
            alert("Pressed Local Wildlife");
          }}
        >
          <View style={styles.buttonContainer}>
            <Image
              source={{ uri: "https://i.imgur.com/MMXvBLp.jpg" }}
              style={{ height: "100%", width: "auto" }}
            />
            <View style={styles.mainButton}>
              <Text style={styles.mainButtonText}>Choate Pond Wildlife</Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    </ScrollView>
  );
}
