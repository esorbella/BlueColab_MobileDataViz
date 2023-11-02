import { Dimensions, StyleSheet } from 'react-native';
import Constants from 'expo-constants';



let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;


export default StyleSheet.create({


    container: {
        flex: 1,
        backgroundColor: '#333333',
        alignItems: 'center',
        width: deviceWidth,
        

    },
    mainButton: {
        borderRadius: 8,
        height: deviceHeight / 25, 
        width: deviceWidth / 2,
        alignItems: 'center',
        backgroundColor: '#0096DB',
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
        width: deviceWidth/1.05,
        backgroundColor: '#0E2B58',
        borderColor: '#787878',
        borderRadius: 20,
        borderWidth: 1,
        marginTop: deviceHeight / 50,
        marginBottom: deviceHeight/50,
        
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
    paragraphText: {
        color: 'white',
        fontSize: deviceHeight/25,
        marginTop: deviceHeight/100,
        marginBottom: deviceHeight/20,
        marginLeft: deviceWidth/15,
        marginRight: deviceWidth/15,
        textAlign: 'center',
        fontFamily: 'sans-serif',
    },
    pictureSub:{
        color: 'white',
        fontSize: 16,
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
