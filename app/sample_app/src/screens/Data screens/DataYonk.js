import React from "react";
import moment from "moment";
import { View, ScrollView, Text } from "react-native";
import { WebView } from 'react-native-webview';
import styles from "../../../styles";

export default function DataYonk({ navigation }) {
  return (
    <WebView
    source={{ uri: `https://aquawatchmobile.shinyapps.io/aquaWatchMobileR/?defaultLocation=Y&month=${moment().clone().subtract(1, 'months').format('MMMM')}&year=${moment().format('YYYY')}` }}
    style={{ flex: 1 }}
  />
  );
}