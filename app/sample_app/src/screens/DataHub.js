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

export default function DataHub({ navigation }) {
  const handleChoatePress = () => {
    navigation.navigate("Choate");
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableHighlight
          onPress={() => {
            handleChoatePress();
          }}
        >
          <View style={styles.buttonContainer}> 
          <Image
              source={{ uri: "https://cdn.discordapp.com/attachments/936750465562083384/1167380193015496796/choatepnd.PNG" }}
              style={{ height: "100%", width: "auto" }}
            />
            <View style={styles.dataButton}>
              <Text style={styles.dataButtonText}>Choate Data</Text>
            </View>
          </View>
        </TouchableHighlight>


        <View style={styles.buttonContainer}>
        <Image
              source={{ uri: "https://cdn.discordapp.com/attachments/936750465562083384/1167380193271357522/pough.PNG" }}
              style={{ height: "100%", width: "auto" }}
            />
          <View style={styles.dataButton}>
            <Text style={styles.dataButtonText}>Poughkeepsie Data</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
        <Image
              source={{ uri: "https://cdn.discordapp.com/attachments/936750465562083384/1167380193535594586/westpoint.PNG" }}
              style={{ height: "100%", width: "auto" }}
            />
          <View style={styles.dataButton}>
            <Text style={styles.dataButtonText}>West Point Data</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
        <Image
              source={{ uri: "https://cdn.discordapp.com/attachments/936750465562083384/1167380193896300645/yonkers.PNG" }}
              style={{ height: "100%", width: "auto" }}
            />
          <View style={styles.dataButton}>
            <Text style={styles.dataButtonText}>Yonkers Data</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
