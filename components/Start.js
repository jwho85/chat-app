import React from 'react';
import { ImageBackground, StyleSheet, View, Text, Button, TextInput, TouchableOpacity } from 'react-native';
import BackgroundImage from "../assets/background-image.png";

//the application's homepage
export default class Start extends React.Component {

    //set initial states
    constructor(props) {
        super(props);
        this.state = { name: '' };
        this.state = { chatColor: '' };
    }

    //when you press a color button, this sets chatColor to the new color
    changeBackgroundColor = (newColor) => {
        this.setState({ chatColor: newColor });
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={BackgroundImage} resizeMode="cover" style={styles.backgroundImage}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.appTitle}>Chat App</Text>
                    </View>
                    <View style={styles.blankBox}></View>
                    <View style={styles.whiteBox}>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={(name) => this.setState({ name })}
                            value={this.state.name}
                            placeholder='Your Name'
                        />
                        <View style={styles.colorContainer}>
                            <Text style={styles.chooseBackground}>Choose Background Color:</Text>
                            <View style={styles.colorChildContainer}>
                                <TouchableOpacity
                                    style={styles.blackButton}
                                    onPress={() => this.changeBackgroundColor('#474056')}
                                ></TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.purpleButton}
                                    onPress={() => this.changeBackgroundColor('#090C08')}
                                ></TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.blueButton}
                                    onPress={() => this.changeBackgroundColor('#8A95A5')}
                                ></TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.greenButton}
                                    onPress={() => this.changeBackgroundColor('#B9C6AE')}
                                ></TouchableOpacity>
                            </View>
                        </View>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => this.props.navigation.navigate('Chat', {
                                name: this.state.name,
                                chatColor: this.state.chatColor,
                            })}
                        >
                            <Text style={styles.buttonText}>Start chatting!</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundImage: {
        flex: 1,
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
    },
    appTitle: {
        fontSize: 45,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    textInput: {
        height: 50,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        fontSize: 16,
        fontWeight: '300',
        color: '#757083',
        opacity: 0.5,
        padding: '2%',
    },
    button: {
        backgroundColor: '#757083',
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF'
    },
    whiteBox: {
        height: 265,
        backgroundColor: '#FFFFFF',
        padding: '3%',
        width: '90%',
    },
    titleContainer: {
        height: '50%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 100,
    },
    blankBox: {
        height: '0%',
    },
    chooseBackground: {
        fontSize: 16,
        fontWeight: '300',
        color: '#757083',
        opacity: 1,
        marginBottom: 10,
    },
    blackButton: {
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        backgroundColor: '#474056',
    },
    purpleButton: {
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        backgroundColor: '#090C08',
    },
    blueButton: {
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        backgroundColor: '#8A95A5',
    },
    greenButton: {
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        backgroundColor: '#B9C6AE',
    },
    colorContainer: {
        height: 140,
        justifyContent: 'center',
    },
    colorChildContainer: {
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        flexDirection: 'row',
        width: '80%',
        justifyContent: "space-between",
    },
});

