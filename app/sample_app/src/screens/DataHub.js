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
            <View style={styles.mainButton}>
              <Text style={styles.mainButtonText}>Choate Data</Text>
            </View>
          </View>
        </TouchableHighlight>
        <View style={styles.buttonContainer}>
          <View style={styles.mainButton}>
            <Text style={styles.mainButtonText}>Poughkeepsie Data</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.mainButton}>
            <Text style={styles.mainButtonText}>West Point Data</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.mainButton}>
            <Text style={styles.mainButtonText}>Yonkers Data</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}