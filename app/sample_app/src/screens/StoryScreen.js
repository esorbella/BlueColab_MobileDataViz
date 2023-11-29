import React from "react";
import {WebView} from "react-native-webview";
import { View, ScrollView, Text } from "react-native";
import styles from "../../styles";

//The webview component below links to the about us page after 
//clicking the our story button in the home screen

export default function StoryScreen({navigation}) {

    return (
        <WebView
          source={{ uri: 'https://bluecolab.pace.edu/about-us-2/' }}
          style={{ flex: 1 }}
        />
    )
}