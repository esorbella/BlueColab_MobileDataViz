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
        height: 1.55*deviceHeight,
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
        right: 0
    },
    mainButtonText: {
        color: 'black',
    },
    buttonContainer: {
        width: deviceWidth / 1.05,
        borderColor: '#787878',
        borderWidth: 1,
        marginTop: deviceHeight / 20,
        height: deviceHeight / 3,
        position: 'relative'
    }
});