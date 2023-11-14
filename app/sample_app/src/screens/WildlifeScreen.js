import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  Image,
  ImageBackground,
  Dimensions, // Import Dimensions
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import styles from "../../styles";

const windowWidth = Dimensions.get("window").width;

const WildlifeScreen = ({ navigation }) => {
  const wildlifeData = [
    {
      label: "Largemouth bass (Micropterus salmoides)",
      imageUri:
        "https://th.bing.com/th/id/R.6dc550e4629145cbd44548c0b36a6145?rik=gHN9%2bthmmTih9A&riu=http%3a%2f%2fupload.wikimedia.org%2fwikipedia%2fcommons%2fe%2fed%2fLargemouth_bass_fish_underwater_animal_in_natural_habitat_micropterus_salmoides.jpg&ehk=BjhvQX7mchDiAAH0iVqhZ7QGdUjUlcL9SFFuNcRo6PM%3d&risl=&pid=ImgRaw&r=0",
    },
    {
      label: "Snapping turtle (Chelydra serpentina)",
      imageUri:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Common_Snapping_Turtle_Close_Up.jpg/1280px-Common_Snapping_Turtle_Close_Up.jpg",
    },
    {
      label: "Red-Eared Sliders(Trachemys scripta elegans)",
      imageUri:
        "https://www.thesprucepets.com/thmb/v96sCG04MaXcJJMoiB_sjH-846U=/5500x0/filters:no_upscale():strip_icc()/red-eared-slider-swimming-520669620-57fff0185f9b5805c2b11b7b.jpg",
    },
    {
      label: "Goldfish (Carassius auratus)",
      imageUri:
        "https://image.mlive.com/home/mlive-media/pgfull/img/grandrapidspress/photo/2016/04/26/-22847150d92e4f23.JPG",
    },
    {
      label: "Wood Ducks (Aix sponsa)",
      imageUri:
        "https://www.allaboutbirds.org/guide/assets/photo/65533521-480px.jpg",
    },
    {
      label: "Great Blue Heron (Ardea herodias)",
      imageUri:
        "https://cdn.download.ams.birds.cornell.edu/api/v1/asset/60314281/1800",
    },
    {
      label: "CrayFish (Orconectes rusticus)",
      imageUri:
        "https://fullserviceaquatics.com/wp-content/uploads/2012/04/pond_crayfish_main.jpg",
    },
    {
      label: "Northern Water Snake (Nerodia sipedon)",
      imageUri:
        "https://www.mass.gov/files/styles/embedded_full_width/public/images/2022-08/northernwatersnakstockcrop_0.jpg?itok=aSzaOBR7",
    },
    {
      label: "Green Frog (Rana clamitans)",
      imageUri:
        "https://www.thesprucepets.com/thmb/lyR-o9nIgJRke0rZOEPu5j2gIxY=/2122x0/filters:no_upscale():strip_icc()/95724120-56a2bcee5f9b58b7d0cdf874.jpg",
    },
    {
      label: "Bullfrog (Lithobates catesbeianus)",
      imageUri:
        "https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/1-bullfrog-smithtown-new-york-bob-savage.jpg",
    },
    // Add more wildlife data in a similar format
  ];

  const renderItem = ({ item }) => (
    <View>
      <Image
        source={{ uri: item.imageUri }}
        style={{ width: windowWidth * 0.9, aspectRatio: 2097 / 1227 }}
      />
      <Text style={styles.pictureSub}>{item.label}</Text>
    </View>
  );

  return (
    <ScrollView>
      <View style={styles.wildContainer}>
        <Text style = {styles.paragraphText}> Wildlife in Choate Pond: </Text>
        <Image
          source={{
            uri: "https://th.bing.com/th/id/R.6dc550e4629145cbd44548c0b36a6145?rik=gHN9%2bthmmTih9A&riu=http%3a%2f%2fupload.wikimedia.org%2fwikipedia%2fcommons%2fe%2fed%2fLargemouth_bass_fish_underwater_animal_in_natural_habitat_micropterus_salmoides.jpg&ehk=BjhvQX7mchDiAAH0iVqhZ7QGdUjUlcL9SFFuNcRo6PM%3d&risl=&pid=ImgRaw&r=0",
          }}
          style={{ width: windowWidth * 0.9, aspectRatio: 2097 / 1227 }}
          // Set width to 90% of screen width and maintain aspect ratio
        />
      </View>
    </ScrollView>
  );
};

export default WildlifeScreen;