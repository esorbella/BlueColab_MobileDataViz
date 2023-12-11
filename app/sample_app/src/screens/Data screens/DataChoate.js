import React from "react";
import moment from "moment";
import { View, ScrollView } from "react-native";
import { WebView } from 'react-native-webview';
import styles from "../../../styles";

export default function HistoricalDataScreenChoate({ navigation }) {

  console.log();
  console.log(moment().clone().subtract(1, 'months').format('MMMM')
  );

  return (
        <WebView
          source={{ uri: `https://aquawatchmobile.shinyapps.io/aquaWatchMobileR/?defaultLocation=Choate&month=${moment().clone().subtract(1, 'months').format('MMMM')}&year=${moment().format('YYYY')}` }}
          style={{ flex: 1 }}
        />

  );
}