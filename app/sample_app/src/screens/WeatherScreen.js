import React from "react";
import { WebView } from 'react-native-webview';
import styles from "../../styles";

export default function WeatherScreen({navigation}) {

    return (
      <WebView
      source={{ uri: 'https://choate-visual-weather.shinyapps.io/choateVisualWeather/' }}
      style={{ flex: 1 }}
    />
    )
}