import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./src/screens/HomeScreen";
import HistoricalDataScreen from "./src/screens/HistoricalDataScreen";
import React, { useEffect, useState } from 'react'

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    HistoricalData: HistoricalDataScreen
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      title: "ChoateVisual",
    },
  }
);

export default createAppContainer(navigator);