import React from "react";
import moment from 'moment'; 

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
  const choateWildlifeData = [
    {
      animalName: "Largemouth bass",
      scientificName: "Micropterus salmoides",
      funFact: "The largemouth bass is an ambush predator and often consumes prey in a single strike.",  
      imageUri:
        "https://th.bing.com/th/id/R.6dc550e4629145cbd44548c0b36a6145?rik=gHN9%2bthmmTih9A&riu=http%3a%2f%2fupload.wikimedia.org%2fwikipedia%2fcommons%2fe%2fed%2fLargemouth_bass_fish_underwater_animal_in_natural_habitat_micropterus_salmoides.jpg&ehk=BjhvQX7mchDiAAH0iVqhZ7QGdUjUlcL9SFFuNcRo6PM%3d&risl=&pid=ImgRaw&r=0",
    },
    {
      animalName: "Snapping turtle",
      scientificName: "Chelydra serpentina",
      funFact: "Snapping turtles are capable of living over 100 years.",
      imageUri:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Common_Snapping_Turtle_Close_Up.jpg/1280px-Common_Snapping_Turtle_Close_Up.jpg",
    },
    {
      animalName: "Red-Eared Sliders",
      scientificName: "Trachemys scripta elegans",
      funFact: "Red-eared sliders are popular as pets but can live up to 30 years or more.",
      imageUri:
        "https://www.thesprucepets.com/thmb/v96sCG04MaXcJJMoiB_sjH-846U=/5500x0/filters:no_upscale():strip_icc()/red-eared-slider-swimming-520669620-57fff0185f9b5805c2b11b7b.jpg",
    },
    {
      animalName: "Goldfish",
      scientificName: "Carassius auratus",
      funFact: "Goldfish have a memory span of at least three months.",
      imageUri:
        "https://image.mlive.com/home/mlive-media/pgfull/img/grandrapidspress/photo/2016/04/26/-22847150d92e4f23.JPG",
    },
    {
      animalName: "Wood Ducks",
      scientificName: "Aix sponsa",
      funFact: "Wood ducks are one of the few duck species equipped with strong claws that help them perch in trees.",
      imageUri:
        "https://www.allaboutbirds.org/guide/assets/photo/65533521-480px.jpg",
    },
    {
      animalName: "Great Blue Heron",
      scientificName: "Ardea herodias",
      funFact: "Great blue herons swallow prey whole, rather than breaking it into smaller pieces.",
      imageUri:
        "https://cdn.download.ams.birds.cornell.edu/api/v1/asset/60314281/1800",
    },
    {
      animalName: "CrayFish",
      scientificName: "Orconectes rusticus",
      funFact: "Crayfish are omnivores and feed on small fish, tadpoles, and aquatic vegetation.",
      imageUri:
        "https://fullserviceaquatics.com/wp-content/uploads/2012/04/pond_crayfish_main.jpg",
    },
    {
      animalName: "Northern Water Snake",
      scientificName: "Nerodia sipedon",
      funFact: "Northern water snakes are non-venomous and primarily feed on fish and amphibians.",
      imageUri:
        "https://www.mass.gov/files/styles/embedded_full_width/public/images/2022-08/northernwatersnakstockcrop_0.jpg?itok=aSzaOBR7",
    },
    {
      animalName: "Green Frog",
      scientificName: "Rana clamitans",
      funFact: "Male green frogs have a loud and distinctive call that resembles the plucking of a loose banjo string.",
      imageUri:
        "https://www.thesprucepets.com/thmb/lyR-o9nIgJRke0rZOEPu5j2gIxY=/2122x0/filters:no_upscale():strip_icc()/95724120-56a2bcee5f9b58b7d0cdf874.jpg",
    },
    {
      animalName: "Bullfrog",
      scientificName: "Lithobates catesbeianus",
      funFact: "Bullfrogs are known for their deep croaking calls that sound like a cow's moo.",
      imageUri:
        "https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/1-bullfrog-smithtown-new-york-bob-savage.jpg",
    },
    // Add more wildlife data in a similar format
  ];
  
  const hudsonWildlifeData = [
    {
      animalName: "Atlantic Sturgeon",
      scientificName: "Acipenser oxyrinchus oxyrinchus",
      funFact: "Atlantic sturgeon can live up to 60 years and migrate over 1400 miles.",
      imageUri:
        "https://th.bing.com/th/id/OIP.Pk0oZ6sKQmvri258EwgbEAHaFj?pid=ImgDet&rs=1",
    },
    {
      animalName: "Diamondback Terrapin",
      scientificName: "Malaclemys terrapin",
      funFact: "Diamondback terrapins are the only turtle species in North America that inhabit estuarine habitats exclusively.",
      imageUri:
        "https://th.bing.com/th/id/R.ea7fece4729197bf548c724e2ee896ed?rik=a48QKyM8pfxhXg&riu=http%3a%2f%2ffarm6.staticflickr.com%2f5231%2f7165621250_c7629dc1a5_o_d.jpg&ehk=j4ooaqMGC%2fNdBOgCs%2fd%2fYaBe2Kx4BuPSn5EdZCmcnp8%3d&risl=&pid=ImgRaw&r=0",
    },
    {
      animalName: "Lined Seahorse",
      scientificName: "Hippocampus erectus",
      funFact: "Seahorses use their long snouts to suck up tiny shrimp and plankton.",
      imageUri: "https://live.staticflickr.com/6217/6316824300_49c319eb2b_b.jpg",
    },
    {
      animalName: "Blue Crab",
      scientificName: "Callinectes sapidus",
      funFact: "Blue crabs are named for their blue claws and are one of the most recognizable crab species.",
      imageUri: "https://th.bing.com/th/id/OIP.iTsbymGPQ2wXr-Q9dnS-jgHaE8?pid=ImgDet&rs=1",
    },
    {
      animalName: "Humpback Whale",
      scientificName: "Megaptera novaeangliae",
      funFact: "Humpback whales are known for their magical songs, which can last for hours.",
      imageUri:
        "https://th.bing.com/th/id/R.0597795217c0fd35b1a5276cf8dc4dc4?rik=kXyr6duUrZt8nA&riu=http%3a%2f%2f2.bp.blogspot.com%2f-hRXrWYgdhvA%2fTtG0Oshp85I%2fAAAAAAAAFFQ%2fWSJVQhs6C8M%2fs1600%2fHumpback%2bWhale%2bunderwater.jpg&ehk=OmLVx%2bKtw3KuTusunRZvP76po56jLuoQs%2fSuTlo2pv8%3d&risl=&pid=ImgRaw&r=0",
    },
    {
      animalName: "Great Blue Heron",
      scientificName: "Ardea herodias",
      funFact: "Great blue herons swallow prey whole, rather than breaking it into smaller pieces.",
      imageUri: "https://cdn.download.ams.birds.cornell.edu/api/v1/asset/60314281/1800",
    },
    {
      animalName: "American Shad",
      scientificName: "Alosa sapidissima",
      funFact: "American shad are anadromous fish that spend most of their lives in the ocean but return to freshwater rivers to spawn.",
      imageUri:
        "https://www.fws.gov/sites/default/files/styles/facebook_1200x630/public/banner_images/2021-06/American%20shad.jpg?h=a4c76022&itok=vYCojAe0",
    },
    {
      animalName: "Mink",
      scientificName: "Neovison vison",
      funFact: "Minks are excellent swimmers and are known to prey on fish, birds, and small mammals.",
      imageUri: "https://calphotos.berkeley.edu/imgs/512x768/8235_3181/2555/0081.jpeg",
    },
    {
      animalName: "American Eel",
      scientificName: "Anguilla rostrata",
      funFact: "American eels can travel thousands of miles during their migration from freshwater to saltwater.",
      imageUri: "https://th.bing.com/th/id/OIP.t0RrvsP9s7EKMFvlNG-PEAHaE7?pid=ImgDet&rs=1",
    },
    {
      animalName: "Eastern Red-backed Salamander",
      scientificName: "Plethodon cinereus",
      funFact: "Eastern red-backed salamanders are lungless amphibians that breathe through their skin.",
      imageUri: "https://live.staticflickr.com/2548/5739708251_48ed49dc85_b.jpg",
    },
    // Add more wildlife data entries in the same format
  ];

      // Function to check if the current month is December
    const isWinter = moment().format('MMMM') === 'December'|| moment().format('MMMM') === 'January'|| moment().format('MMMM') === 'February';
    const isSummer = moment().format('MMMM') === 'May' || moment().format('MMMM') === 'June';

    //Hudson River animals 
    const linedSeahorse = hudsonWildlifeData.find(item => item.animalName === "Lined Seahorse");
    const atlanticSturgeon = hudsonWildlifeData.find(item => item.animalName === "Atlantic Sturgeon");
    const diamondbackTerrapin = hudsonWildlifeData.find(item => item.animalName === "Diamondback Terrapin");
    const blueCrab = hudsonWildlifeData.find(item => item.animalName === "Blue Crab");
    const humpbackWhale = hudsonWildlifeData.find(item => item.animalName === "Humpback Whale");
    const greatBlueHeron = hudsonWildlifeData.find(item => item.animalName === "Great Blue Heron");
    const americanShad = hudsonWildlifeData.find(item => item.animalName === "American Shad");
    const mink = hudsonWildlifeData.find(item => item.animalName === "Mink");
    const americanEel = hudsonWildlifeData.find(item => item.animalName === "American Eel");
    const easternRedBackedSalamander = hudsonWildlifeData.find(item => item.animalName === "Eastern Red-backed Salamander");

    //Choate Pond Animals 
    const largemouthBass = choateWildlifeData.find(item => item.animalName === "Largemouth bass");
    const snappingTurtle = choateWildlifeData.find(item => item.animalName === "Snapping turtle");
    const redEaredSliders = choateWildlifeData.find(item => item.animalName === "Red-Eared Sliders");
    const goldfish = choateWildlifeData.find(item => item.animalName === "Goldfish");
    const woodDucks = choateWildlifeData.find(item => item.animalName === "Wood Ducks");
    const greatBlueHeronChoate = choateWildlifeData.find(item => item.animalName === "Great Blue Heron");
    const crayFish = choateWildlifeData.find(item => item.animalName === "CrayFish");
    const northernWaterSnake = choateWildlifeData.find(item => item.animalName === "Northern Water Snake");
    const greenFrog = choateWildlifeData.find(item => item.animalName === "Green Frog");
    const bullfrog = choateWildlifeData.find(item => item.animalName === "Bullfrog");
    
    // Modify the funFact based on the current month
    if (isSummer) {
      // If the item is found, update the funFact
      if (atlanticSturgeon) {
        atlanticSturgeon.funFact = "Female Atlantic Sturgeon, aged 2 to 5 years, are currently laying eggs in the Hudson River";
      }
      if (linedSeahorse) {
        linedSeahorse.funFact = "Lined seahorses are currently engaging in breeding rituals, including courtship dances, reproduction, and seeking sheltered habitats to ensure their survival and reproductive success.";
      }

    }
    if (isWinter){
      //Choate Winter 
      if (greatBlueHeronChoate) {
        greatBlueHeronChoate.funFact = "Great Blue Herons are continuing to forage for fish in open waters or move to areas with less ice cover to hunt for food."
      }
      if (bullfrog) {
        bullfrog.funFact = "Bullfrogs are entering a state of dormancy or hibernation by seeking refuge in the mud at the bottom of Choate Pond of water to endure the cold temperatures."
      }
      if (greenFrog) {
        greenFrog.funFact = "Green Frogs are currently exhibiting reduced activity levels, possibly hibernating or seeking shelter in mud at the bottom of Choate Pond to survive the cold weather."
      }
      if (largemouthBass) {
        largemouthBass.funFact = "Largemouth Bass are currently slowing down their activity levels, seeking deeper water while feeding less frequently due to the colder temperatures affecting their metabolism."
      }
      if (snappingTurtle) {
        snappingTurtle.funFact = "Snapping Turtles in Choate Pond are entering a period of reduced activity, seeking out burrows or deeper water to hibernate and conserve energy during the colder months."
      }
      if (redEaredSliders) {
        redEaredSliders.funFact = "Red-Eared Sliders in Choate Pond are likely experiencing decreased activity levels, seeking shelter in aquatic environments or burrowing into mud to hibernate or limit their movements at this time of year."
      }
      if (woodDucks) {
        woodDucks.funFact = "Wood Ducks, seasonal residents of Choate Pond, are migrating to wintering grounds, moving to open waters or coastal habitats to escape freezing temperatures and find suitable feeding areas."
      }
      if (crayFish) {
        crayFish.funFact = "Crayfish may experience reduced activity, seeking refuge in burrows or deeper water to survive the colder temperatures, at this time of year."
      }
      if (northernWaterSnake) {
        northernWaterSnake.funFact = "Northern Water Snakes of Choate Pond are going into hibernation or brumation, seeking shelter in dens or burrows to survive the cold weather."
      }
      if (goldfish) {
        goldfish.funFact = "Goldfish in Choate Pond continue to forage actively for food and adapt to varying water temperatures, displaying heightened movement and activity levels compared to some native fish species in the pond."
      }

      //Hudson Winter 
      if (linedSeahorse) {
        linedSeahorse.funFact = "Lined Seahorses are currently reducing their activity levels, seeking sheltered and warmer areas to escape colder temperatures, potentially decreasing their reproductive and feeding activities during this December."
      }
      if (mink) {
        mink.funFact = "Minks are currently focusing on foraging for food, grooming their winter fur, and seeking shelter to endure the colder weather conditions."
      }
      if (americanEel) {
        americanEel.funFact = "American Eels are currently migrating downstream to brackish waters or estuaries in preparation for their spawning phase, triggered by cooler temperatures."
      }
      if (humpbackWhale) {
        humpbackWhale.funFact = "Humpback Whales are currently migrating southward towards warmer waters for breeding and calving after feeding in the northern regions during the summer and fall."
      }
      if (easternRedBackedSalamander) {
        easternRedBackedSalamander.funFact = "Eastern Red Backed Salamanders are currently undergoing a period of hibernation, seeking refuge in underground shelters to survive the colder temperatures."
      }
      if (blueCrab) {
        blueCrab.funFact = "Blue Crabs are currently migrating to deeper, warmer waters, or become less active and enter a state of torpor due to the cooler temperatures."
      }
      if (diamondbackTerrapin){
        diamondbackTerrapin.funFact = "Many Diamondback Terrapin are in a state of brumation, a reptilian hibernation, during Winter."
      }
      if (americanShad){
        americanShad.funFact = "During Winter, American Shad are spawning in the Hudson River after migrating from the ocean."
      }
      if (greatBlueHeron){
        greatBlueHeron.funFact = "Great Blue Herons are continuing to forage for fish in open waters or move to areas with less ice cover to hunt for food."
      }
      if (atlanticSturgeon) {
        atlanticSturgeon.funFact = "Female Atlantic Sturgeon in Northeast America are currently spawning and laying eggs in rivers like the Hudson River."
      }
    }
    

    const renderItem = ({ item }) => (
      <View style={styles.wildContainer}>
        <Image
          source={{ uri: item.imageUri }}
          style={{ width: windowWidth * 0.9, aspectRatio: 2097 / 1227 }}
        />
        <Text style={styles.pictureSub}>{item.animalName}</Text>
        <Text style={styles.pictureSubScientific}>{item.scientificName}</Text>
        <Text style={styles.pictureSub}>{item.funFact}</Text>
      </View>
    );

    const currentDate = moment().format('MMMM Do YYYY');
  
  return (
    <ScrollView>
      <View style={styles.wildContainer}>
        
        {/* Display the current date */}
        {/* //plain 
        <Text style={styles.dateText}>{currentDate}</Text>*/}
        <Text style={styles.dateText}>
        Wildlife Activity on <Text style={styles.dateText}>{currentDate}</Text>:
        </Text>

        {/* Choate Pond wildlife carousel */}
        <Text style={styles.paragraphTextWildlife}>Wildlife in Choate Pond:</Text>
        <Carousel
          data={choateWildlifeData}
          renderItem={renderItem}
          sliderWidth={windowWidth}
          itemWidth={windowWidth * 0.9}
          layout= "default"
          loop={true}
          loopClonesPerSide={2}
          inactiveSlideScale={0.9}
          inactiveSlideOpacity={0.7}
        />
        {/* Hudson River wildlife carousel */}
        <Text style={styles.paragraphTextWildlife}>Wildlife in The Hudson River:</Text>
        <Carousel
          data={hudsonWildlifeData}
          renderItem={renderItem}
          sliderWidth={windowWidth}
          itemWidth={windowWidth * 0.9}
          layout="default"
          loop={true}
          loopClonesPerSide={2}
          inactiveSlideScale={0.9}
          inactiveSlideOpacity={0.7}
        />
      </View>
    </ScrollView>
  );
};

export default WildlifeScreen;