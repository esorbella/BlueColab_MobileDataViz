import React from "react";
import { View, ScrollView } from "react-native";
import { WebView } from 'react-native-webview';
import styles from "../../styles";

export default function HistoricalDataScreen({ navigation }) {
  return (
        <WebView
          source={{ uri: 'https://gallery.shinyapps.io/113-bookmarking-url/' }}
          style={{ flex: 1 }}
        />
  );
}