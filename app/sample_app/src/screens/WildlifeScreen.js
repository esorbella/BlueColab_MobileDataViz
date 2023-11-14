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
import styles from "../../styles";

const windowWidth = Dimensions.get("window").width; // Get the screen width

export default function WildlifeScreen({ navigation }) {
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
        <Text style={styles.pictureSub}>
          Largemouth bass (Micropterus salmoides)
        </Text>
        <Text style = {styles.paragraphText}>The Bass is fun to catch</Text>

        <Image
          source={{
            uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Common_Snapping_Turtle_Close_Up.jpg/1280px-Common_Snapping_Turtle_Close_Up.jpg",
          }}
          style={{ width: windowWidth * 0.9, aspectRatio: 2097 / 1227 }}
          // Set width to 90% of screen width and maintain aspect ratio
        />
        <Text style={styles.pictureSub}>
        Snapping turtle (Chelydra serpentina)
        </Text>
        <Text style = {styles.paragraphText}>I like turtles</Text>
        

        <Image
          source={{
            uri: "https://www.thesprucepets.com/thmb/v96sCG04MaXcJJMoiB_sjH-846U=/5500x0/filters:no_upscale():strip_icc()/red-eared-slider-swimming-520669620-57fff0185f9b5805c2b11b7b.jpg",
          }}
          style={{ width: windowWidth * 0.9, aspectRatio: 2097 / 1227 }}
          // Set width to 90% of screen width and maintain aspect ratio
        />
        <Text style={styles.pictureSub}>
          Red-Eared Sliders(Trachemys scripta elegans)
        </Text>
        <Text style = {styles.paragraphText}>Sliders are my favorite thing to order in diners</Text>

        <Image
          source={{
            uri: "https://image.mlive.com/home/mlive-media/pgfull/img/grandrapidspress/photo/2016/04/26/-22847150d92e4f23.JPG",
          }}
          style={{ width: windowWidth * 0.9, aspectRatio: 2097 / 1227 }}
          // Set width to 90% of screen width and maintain aspect ratio
        />
        <Text style={styles.pictureSub}>
          Goldfish (Carassius auratus)
        </Text>
        <Text style = {styles.paragraphText}>The best pets that live for only 2 days</Text>

        <Image
          source={{
            uri: "https://www.allaboutbirds.org/guide/assets/photo/65533521-480px.jpg",
          }}
          style={{ width: windowWidth * 0.9, aspectRatio: 2097 / 1227 }}
          // Set width to 90% of screen width and maintain aspect ratio
        />
        <Text style={styles.pictureSub}>
          Wood Ducks (Aix sponsa)
        </Text>
        <Text style = {styles.paragraphText}>Duck You</Text>

        <Image
          source={{
            uri: "https://cdn.download.ams.birds.cornell.edu/api/v1/asset/60314281/1800",
          }}
          style={{ width: windowWidth * 0.9, aspectRatio: 2097 / 1227 }}
          // Set width to 90% of screen width and maintain aspect ratio
        />
        <Text style={styles.pictureSub}>
          Great Blue Heron (Ardea herodias)
        </Text>
        <Text style = {styles.paragraphText}>I swear this is a pelican</Text>

        <Image
          source={{
            uri: "https://fullserviceaquatics.com/wp-content/uploads/2012/04/pond_crayfish_main.jpg",
          }}
          style={{ width: windowWidth * 0.9, aspectRatio: 2097 / 1227 }}
          // Set width to 90% of screen width and maintain aspect ratio
        />

        <Text style={styles.pictureSub}>
          CrayFish (Orconectes rusticus)
        </Text>
        <Text style = {styles.paragraphText}>These things are cray cray</Text>

        <Image
          source={{
            uri: "https://www.mass.gov/files/styles/embedded_full_width/public/images/2022-08/northernwatersnakstockcrop_0.jpg?itok=aSzaOBR7",
          }}
          style={{ width: windowWidth * 0.9, aspectRatio: 2097 / 1227 }}
          // Set width to 90% of screen width and maintain aspect ratio
        />

        <Text style={styles.pictureSub}>
          Northern Water Snake (Nerodia sipedon)
        </Text>
        <Text style = {styles.paragraphText}>This thing will eat you in one bite</Text>

        <Image
          source={{
            uri: "https://www.thesprucepets.com/thmb/lyR-o9nIgJRke0rZOEPu5j2gIxY=/2122x0/filters:no_upscale():strip_icc()/95724120-56a2bcee5f9b58b7d0cdf874.jpg",
          }}
          style={{ width: windowWidth * 0.9, aspectRatio: 2097 / 1227 }}
          // Set width to 90% of screen width and maintain aspect ratio
        />
        <Text style={styles.pictureSub}>
          Green Frog (Rana clamitans)
        </Text>
        <Text style = {styles.paragraphText}>This thing will get eaten in one bite</Text>

        <Image
          source={{
            uri: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/1-bullfrog-smithtown-new-york-bob-savage.jpg",
          }}
          style={{ width: windowWidth * 0.9, aspectRatio: 2097 / 1227 }}
          // Set width to 90% of screen width and maintain aspect ratio
        />
        <Text style={styles.pictureSub}>
          Bullfrog (Lithobates catesbeianus)
        </Text>
        <Text style = {styles.paragraphText}>This thing looks nothing like a bull</Text>
      </View>
    </ScrollView>
  );
}
