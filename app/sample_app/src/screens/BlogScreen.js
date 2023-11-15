import React from "react";
import {WebView} from "react-native-webview";
import { View, ScrollView, Text } from "react-native";
import styles from "../../styles";

export default function BlogScreen({navigation}) {

    return (
        <WebView
          source={{ uri: 'https://bluecolab.blogs.pace.edu/blog-app/' }}
          style={{ flex: 1 }}
        />
    )
}