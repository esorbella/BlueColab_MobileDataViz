import React from "react";
import { View, Text, Linking, TouchableOpacity, ScrollView } from "react-native";
import styles from "../../styles";

export default function Attributions({ navigation }) {
  const handleLinkPress = (url) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView>
      <View style={styles.attributions}>
        <Text>We would like to give the following attributions:</Text>
        
        <Text>
          • The image-based plant species identification service used is based on
          the Pl@ntNet recognition API, regularly updated and accessible through
          the site{" "}
          <TouchableOpacity onPress={() => handleLinkPress("https://my.plantnet.org/")}>
            <Text style={styles.links} >
              my.plantnet.org
            </Text>
          </TouchableOpacity>.
        </Text>

        <Text>
          • The species data service for sample image used is based on the GBIF
          API, accessible through the site{" "}
          <TouchableOpacity onPress={() => handleLinkPress("https://www.gbif.org/developer/summary")}>
            <Text style={styles.links} >
              gbif.org
            </Text>
          </TouchableOpacity>.
        </Text>

        <Text>
          • The list of invasive species of the United States is adapted from the
          United States Register of Introduced and Invasive Species by the U.S.
          Geological Survey (USGS), accessible through the site{" "}
          <TouchableOpacity onPress={() => handleLinkPress("https://www.sciencebase.gov/catalog/item/62d59ae5d34e87fffb2dda99")}>
            <Text style={styles.links} >
              US-RIIS
            </Text>
          </TouchableOpacity>.
        </Text>

        <Text>
          • The calculations to convert dissolved oxygen units are adapted from the
          U of MN Natural Resources Research Institute, see{" "}
          <TouchableOpacity onPress={() => handleLinkPress("https://www.waterontheweb.org/under/waterquality/dosatcalc.html")}>
            <Text style={styles.links} >
             waterontheweb
            </Text>
          </TouchableOpacity>.
        </Text>

        <Text>
          • The calculations to calculate WQI are adapted from George Moses & Ali
          Tejeda, see{" "}
          <TouchableOpacity onPress={() => handleLinkPress("https://colab.research.google.com/drive/17uZffhhG-OtwZyPsU5QVXbhWqQcfp7jv#scrollTo=QJ7FQ4m8BnA8")}>
            <Text style={styles.links} >
              Python
            </Text>
          </TouchableOpacity>.
        </Text>
        
        <Text>
          • Code to calculate distances between to latitudes has been adapted from {" "}
          <TouchableOpacity onPress={() => handleLinkPress("https://stackoverflow.com/questions/72867971/distance-calculation-gives-strange-output-javascript")}>
            <Text style={styles.links}>
              stackoverflow
            </Text>
          </TouchableOpacity>.
        </Text>

        <Text>
          • Pace University water data is courtesy of Blue CoLab. Join the team:{" "}
          <TouchableOpacity onPress={() => handleLinkPress("https://bluecolab.pace.edu/")}>
            <Text style={styles.links}>
              https://bluecolab.pace.edu/
            </Text>
          </TouchableOpacity>.
        </Text>

        <Text>
          • Yonkers, Poughkeepsie, and West Point water data is courtesy of the
          USGS. Discover more here:{" "}
          <TouchableOpacity onPress={() => handleLinkPress("https://waterdata.usgs.gov/nwis")}>
            <Text style={styles.links}>
              Water Data
            </Text>
          </TouchableOpacity>.
        </Text>

        <Text>
          • Lastly we would like to thank our friends and fellow classmates in our Software Engineering Class for their support and feedback. A shotout to Prolog 2.0, TLX, PowerPuff, and SCRUMptious. We also appreciate feedback by various persons not listed here in improving our UI/UX design.
        </Text>

        <Text>
        </Text>
      </View>
    </ScrollView>
  );
}
