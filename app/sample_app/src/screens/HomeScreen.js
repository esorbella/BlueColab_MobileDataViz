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
        navigation.navigate('OurStory')
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
              source={{ uri: "https://cdn.discordapp.com/attachments/1151185129549602860/1164227285323362406/PXL_20221014_204618892.png?ex=65427227&is=652ffd27&hm=a4bd499fa34356dba736c42cd0daf8913e1c172dd1ffdca29e04fc7cce688d6c&" }}
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
