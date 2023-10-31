import React from "react";
import { View, ScrollView, Text } from "react-native";
import { WebView } from 'react-native-webview';
import styles from "../../../styles";

export default function DataYonk({ navigation }) {
  return (
    <View style = {styles.container}>
      
    <Text style = {styles.paragraphText}>Yonkers data</Text>

   </View>
  );
}