import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  Image,
  ImageBackground,
} from "react-native";
import styles from "../../styles";

export default function DataHub({ navigation }) {
  const handleChoatePress = () => {
    navigation.navigate("Choate");
  };
  const handlePoughPress = () => {
    navigation.navigate("Pough");
  };
  const handleWPPress = () => {
    navigation.navigate("WP");
  };
  const handleYonkPress = () => {
    navigation.navigate("Yonk");
  };

  return (
    <ScrollView>
      <View style={styles.container}>

        {/*Choate Pond Widget*/}
        <View style={styles.dataHubWidget}>
          <Image
            source={require("../../assets/homescreen/PXL_20221014_204618892.png")}
            style={styles.imageContainer}
          />
          <Text style={styles.homeParagraphText}>
            Choate Pond is in the center of the Pace University campus. This 
            Pond and many others flow out into the Hudson River, contributing 
            to its overall water quality which is why we look at its quality and
            Pace University's contribution to either better or worse Hudson water 
            quality.
          </Text>
          <TouchableHighlight
            onPress={() => {
              handleChoatePress();
            }}
          >
            <View style={styles.generalButton}>
              <Text style={styles.mainButtonText}>Choate Data</Text>
            </View>
          </TouchableHighlight>
        </View>
        {/*End Choate Pond Widget*/}

        {/*Start Pough Widget*/}
        <View style={styles.dataHubWidget}>
          <Image
            source={{uri:"https://cdn18.picryl.com/photo/2019/11/18/poughkeepsie-bridge-spanning-hudson-river-poughkeepsie-dutchess-county-ny-e51f90-1024.jpg"}}
            style={styles.imageContainer}
          />
          <Text style={styles.homeParagraphText}>
            Poughkeepsie is the furthest north out of all the data points in this
            app. Ideally this would have the highest water quality as the pollution
            of the bigger towns down below could not reach it.
          </Text>
          <TouchableHighlight
            onPress={() => {
              handlePoughPress();
            }}
          >
            <View style={styles.generalButton}>
              <Text style={styles.mainButtonText}>Poughkeepsie Data</Text>
            </View>
          </TouchableHighlight>
        </View>
        {/*End Pough Widget*/}


        {/*Start West Point Widget*/}
        <View style={styles.dataHubWidget}>
          <Image
            source={{uri: "https://www.stripes.com/incoming/522n9n-3011234658_baf0dc3ac9_c.jpg/alternates/LANDSCAPE_910/3011234658_baf0dc3ac9_c.jpg"}}
            style={styles.imageContainer}
          />
          <Text style={styles.homeParagraphText}>
            The West Point Military academy is still north of Pace,
            closer to areas such as Beacon and Cold Spring. 
          </Text>
          <TouchableHighlight
            onPress={() => {
              handleWPPress();
            }}
          >
            <View style={styles.generalButton}>
              <Text style={styles.mainButtonText}>West Point Data</Text>
            </View>
          </TouchableHighlight>
        </View>
        {/*End West Point Widget*/}

        {/*Start Yonkers Widget*/}
        <View style={styles.dataHubWidget}>
          <Image
            source= {{uri: "https://res.cloudinary.com/simpleview/image/upload/v1522775889/clients/westchesterny/shutterstock_20108908_1__b0a14121-1a73-4fe0-b578-cac657063725.jpg"}}
            style={styles.imageContainer}
          />
          <Text style={styles.homeParagraphText}>
            Yonkers is the furthest south out of all the data shown. Being 
            closest to NYC we expect this point to be the lowest quality and
            we at Pace University contribute to this part of the river.
          </Text>
          <TouchableHighlight
            onPress={() => {
              handleYonkPress();
            }}
          >
            <View style={styles.generalButton}>
              <Text style={styles.mainButtonText}>Yonkers Data</Text>
            </View>
          </TouchableHighlight>
        </View>
        {/*End Yonkers Widget*/}

      </View>
    </ScrollView>
  );
}
