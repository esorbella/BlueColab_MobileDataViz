import { Dimensions, StyleSheet } from 'react-native';
import Constants from 'expo-constants';



let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;


export default StyleSheet.create({


    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        width: deviceWidth,
        

    },
    welcome: {
        flex: 1,
        backgroundColor: '#333333',
        alignItems: 'center',
        justifyContent: 'center',
        width: deviceWidth,
        

    },
    storyButton: {
        borderRadius: 8,
        height: deviceHeight / 25, 
        width: deviceWidth / 2,
        alignItems: 'center',
        backgroundColor: '#F7B00C',
        borderWidth: 2,
        borderColor: 'white',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
    graphButton: {
        borderRadius: 8,
        height: deviceHeight / 25, 
        width: deviceWidth / 2,
        alignItems: 'center',
        backgroundColor: 'seashell',
        borderWidth: 2,
        borderColor: '#333333',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
    weatherButton: {
        borderRadius: 8,
        height: deviceHeight / 25, 
        width: deviceWidth / 2,
        alignItems: 'center',
        backgroundColor: 'lightsteelblue',
        borderWidth: 2,
        borderColor: 'white',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
    wildlifeButton: {
        borderRadius: 8,
        height: deviceHeight / 25, 
        width: deviceWidth / 2,
        alignItems: 'center',
        backgroundColor: '#50A684',
        borderWidth: 2,
        borderColor: 'white',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
    mainButtonText: {
        color: 'black',
    },
    buttonContainer: {
        width: deviceWidth/1.01,
        
        backgroundColor: '#0E2B58',
        borderColor: '#787878',
        borderRadius: 20,
        borderWidth: 1,
        marginTop: deviceHeight / 200,
        marginBottom: deviceHeight/200,
        
    },
    graphImage: {
        width: deviceWidth/1.01,
        height: deviceHeight/4,
        backgroundColor: '#0E2B58',
        borderColor: '#787878',
        borderRadius: 20,
        borderWidth: 1,
        marginTop: deviceHeight / 200,
        marginBottom: deviceHeight/200,
        
    },
    graphButtonContainer: {
        width: deviceWidth/1.01,
        backgroundColor: 'darkgrey',
        borderColor: '#787878',
        borderRadius: 20,
        borderWidth: 1,
        marginTop: deviceHeight / 300,
        marginBottom: deviceHeight/300,
        
    },
    weatherButtonContainer: {
        width: deviceWidth/1.01,
        backgroundColor: '#333333',
        borderColor: '#787878',
        borderRadius: 20,
        borderWidth: 1,
        marginTop: deviceHeight / 300,
        marginBottom: deviceHeight/300,
        
    },
    animalButtonContainer: {
        width: deviceWidth/1.01,
        backgroundColor: 'darkolivegreen',
        borderColor: '#787878',
        borderRadius: 20,
        borderWidth: 1,
        marginTop: deviceHeight / 300,
        marginBottom: deviceHeight/300,
        
    },
    dataButton: {
        borderRadius: 8,
        height: deviceHeight / 25, 
        width: deviceWidth / 2,
        alignItems: 'center',
        backgroundColor: '#50A684',
        borderWidth: 2,
        borderColor: 'white',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
    dataButtonText: {
        color: 'black',
    },
    storyParagraphText: {
        color: 'white',
        fontSize: deviceHeight/25,
        marginTop: deviceHeight/100,
        marginBottom: deviceHeight/20,
        marginLeft: deviceWidth/15,
        marginRight: deviceWidth/15,
        textAlign: 'center',
        fontFamily: 'Nunito-Black',
    },
    graphParagraphText: {
        color: 'black',
        fontSize: deviceHeight/25,
        marginTop: deviceHeight/100,
        marginBottom: deviceHeight/20,
        marginLeft: deviceWidth/15,
        marginRight: deviceWidth/15,
        textAlign: 'center',
        fontFamily: 'Nunito-Black',
    },

    paragraphText: {
        color: 'white',
        fontSize: deviceHeight/25,
        marginTop: deviceHeight/100,
        marginBottom: deviceHeight/20,
        marginLeft: deviceWidth/15,
        marginRight: deviceWidth/15,
        textAlign: 'center',
        fontFamily: 'Nunito-Black',
    },
    pictureSub:{
        color: 'white',
        fontSize: 16,
        marginBottom: 15,
        textAlign: 'center',
    },
    imageContainer:{
        height: deviceHeight/3,
        width: "90%",
        margin: deviceWidth/30,
        borderColor: "black",
        borderWidth: 2,
        borderRadius: 10,
    },

});
