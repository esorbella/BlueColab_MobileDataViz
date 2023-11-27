import React from "react";
import { View, ScrollView, Text } from "react-native";
import { WebView } from 'react-native-webview';
import styles from "../../../styles";

export default function DataWP({ navigation }) {
  return (
    <WebView
    source={{ uri: 'https://choatevisual.shinyapps.io/choateVisual/?defaultLocation=WP' }}
    style={{ flex: 1 }}
  />
  );
}