import React from "react";
import { View, ScrollView } from "react-native";
import { WebView } from 'react-native-webview';
import styles from "../../styles";

export default function HistoricalDataScreen({ navigation }) {
  return (
      <ScrollView>
        <WebView
          source={{ uri: 'https://choatevisual.shinyapps.io/choateVisual/' }}
          style={{ flex: .5 }}
        />
        <View style = {styles.container}>
          <Text>
            Animals here
          </Text>
        </View>
      </ScrollView>
  );
}