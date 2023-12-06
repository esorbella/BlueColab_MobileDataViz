import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  Image,
  ImageBackground,
  WebView
} from "react-native";
import styles from "../../styles";

export default function WeatherScreen({navigation}) {

    return (
      <WebView
      source={{ uri: 'https://choate-visual-weather.shinyapps.io/choateVisualWeather/' }}
      style={{ flex: 1 }}
    />
    )
}