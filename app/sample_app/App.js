import React, { useState } from 'react';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./src/screens/HomeScreen";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import BlogScreen from "./src/screens/BlogScreen";
import DataChoate from "./src/screens/Data screens/DataChoate";
import DataPough from "./src/screens/Data screens/DataPough";
import DataWP from "./src/screens/Data screens/DataWP";
import DataYonk from "./src/screens/Data screens/DataYonk";
import WeatherScreen from "./src/screens/WeatherScreen";
import StoryScreen from "./src/screens/StoryScreen";
import DataHub from "./src/screens/DataHub";
import React, { useEffect, useState } from 'react'
import WildlifeScreen from "./src/screens/WildlifeScreen";
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './src/screens/HomeScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import DataChoate from './src/screens/Data screens/DataChoate';
import DataPough from './src/screens/Data screens/DataPough';
import DataWP from './src/screens/Data screens/DataWP';
import DataYonk from './src/screens/Data screens/DataYonk';
import WeatherScreen from './src/screens/WeatherScreen';
import StoryScreen from './src/screens/StoryScreen';
import DataHub from './src/screens/DataHub';
import WildlifeScreen from './src/screens/WildlifeScreen';

const fetchFonts = () => {
  return Font.loadAsync({
    'Nunito': require('./assets/fonts/Nunito/static/Nunito-Black.ttf'),
    // Add more fonts if needed
  });
};

const navigator = createStackNavigator(
  {
    Wel: WelcomeScreen,
    Home: HomeScreen,
    Choate: DataChoate,
    Weather: WeatherScreen,
    Story: StoryScreen,
    Hub: DataHub,
    Wildlife: WildlifeScreen,
    Pough: DataPough,
    WP: DataWP,
    Yonk: DataYonk,
    Blog: BlogScreen
  },
  {
    initialRouteName: 'Wel',
    defaultNavigationOptions: {
      title: 'ChoateVisual',
    },
  }
);

export default createAppContainer(navigator);





