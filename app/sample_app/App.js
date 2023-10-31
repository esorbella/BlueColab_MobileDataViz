import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./src/screens/HomeScreen";
import DataChoate from "./src/screens/Data screens/DataChoate";
import WeatherScreen from "./src/screens/WeatherScreen";
import StoryScreen from "./src/screens/StoryScreen";
import DataHub from "./src/screens/DataHub";
import React, { useEffect, useState } from 'react'
import WildlifeScreen from "./src/screens/WildlifeScreen";


const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Choate: DataChoate,
    Weather: WeatherScreen,
    Story: StoryScreen,
    Hub: DataHub,
    Wildlife: WildlifeScreen
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      title: "ChoateVisual",
    }
  }
);

export default createAppContainer(navigator);