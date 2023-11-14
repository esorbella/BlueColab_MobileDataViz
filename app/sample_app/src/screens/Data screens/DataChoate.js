import React from "react";
import { View, ScrollView } from "react-native";
import { WebView } from 'react-native-webview';
import styles from "../../../styles";

export default function HistoricalDataScreenChoate({ navigation }) {
  return (
        <WebView
          source={{ uri: 'https://choatevisual.shinyapps.io/choateVisual/' }}
          style={{ flex: 1 }}
        />

  );
}