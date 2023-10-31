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
  const handlePoughPress = () => {
    navigation.navigate("Pough");
  };
  const handleWPPress = () => {
    navigation.navigate("WP");
  };
  const handleYonkPress = () => {
    navigation.navigate("Yonk");
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
              source={require("../../assets/datahub/choate.png")}
              style={{ height: "100%", width: "auto" }}
            />
            <View style={styles.dataButton}>
              <Text style={styles.dataButtonText}>Choate Data</Text>
            </View>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          onPress={() => {
            handlePoughPress();
          }}
        >
          <View style={styles.buttonContainer}>
            <Image
              source={require("../../assets/datahub/pough.png")}
              style={{ height: "100%", width: "auto" }}
            />
            <View style={styles.dataButton}>
              <Text style={styles.dataButtonText}>Poughkeepsie Data</Text>
            </View>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          onPress={() => {
            handleWPPress();
          }}
        >
          <View style={styles.buttonContainer}>
            <Image
              source={require("../../assets/datahub/westpoint.png")}
              style={{ height: "100%", width: "auto" }}
            />
            <View style={styles.dataButton}>
              <Text style={styles.dataButtonText}>West Point Data</Text>
            </View>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => {
            handleYonkPress();
          }}
        >
          <View style={styles.buttonContainer}>
            <Image
              source={require("../../assets/datahub/yonkers.png")}
              style={{ height: "100%", width: "auto" }}
            />
            <View style={styles.dataButton}>
              <Text style={styles.dataButtonText}>Yonkers Data</Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    </ScrollView>
  );
}
