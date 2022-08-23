import React from 'react';
import { StyleSheet, View, Text, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from '@react-native-community/netinfo';
import CustomActions from './CustomActions';
import MapView from 'react-native-maps';

const firebase = require('firebase');
require('firebase/firestore');
require('firebase/auth');

//the application's chat page
export default class Chat extends React.Component {

    constructor() {
        super();
        this.state = {
            messages: [],
            uid: 0,
            loggedInText: 'Please wait, you are getting logged in',
            user: {
                _id: '',
                name: '',
                avatar: '',
            },
            isConnected: false,
            image: null,
            location: null,
        };

        if (!firebase.apps.length) {
            firebase.initializeApp({
                // insert your Firestore database credentials here!
                apiKey: "AIzaSyAcPLbWn-r3j3DeFRH1GcZSSQC0jvJQ_nM",
                authDomain: "chat-app-hoover.firebaseapp.com",
                projectId: "chat-app-hoover",
                storageBucket: "chat-app-hoover.appspot.com",
                messagingSenderId: "36194725420",
                appId: "1:36194725420:web:b821572e04374034296b89",
                measurementId: "G-DP11E8ELL8",
            });
        }
        this.referenceChatMessages = firebase.firestore().collection('messages');
        this.referenceChatUser = null;
    }

    onCollectionUpdate = (querySnapshot) => {
        const messages = [];
        // go through each document
        querySnapshot.forEach((doc) => {
            // get the QueryDocumentSnapshot's data
            let data = doc.data();
            messages.push({
                _id: data._id,
                text: data.text,
                createdAt: data.createdAt.toDate(),
                user: {
                    _id: data.user._id,
                    name: data.user.name,
                    avatar: data.user.avatar,
                },
                image: data.image || null,
                location: data.location || null,
            });
        });
        this.setState({
            messages,
        });
    }

    addMessages = (data) => {
        // add a new list to the collection
        this.referenceChatMessages.add({
            _id: data._id,
            text: data.text || "",
            createdAt: data.createdAt,
            user: data.user,
            image: data.image || null,
            location: data.location || null,
        });
    }

    //get messages from local storage
    async getMessages() {
        let messages = '';
        try {
            messages = await AsyncStorage.getItem('messages') || [];
            this.setState({
                messages: JSON.parse(messages)
            });
        } catch (error) {
            console.log(error.message);
        }
    };

    //save messages to local storage
    async saveMessages() {
        try {
            await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
        } catch (error) {
            console.log(error.message);
        }
    }

    //delete messages from local storage
    async deleteMessages() {
        try {
            await AsyncStorage.removeItem('messages');
            this.setState({
                messages: []
            })
        } catch (error) {
            console.log(error.message);
        }
    }

    componentDidMount() {

        //set the navigation title to name
        let name = this.props.route.params.name;
        this.props.navigation.setOptions({ title: name });
        this.setState({ loggedInText: 'Welcome to the chat room' });

        //check if the user is connected
        NetInfo.fetch().then(connection => {
            if (connection.isConnected) {
                console.log('online');
                this.setState({ isConnected: true });
            } else {
                console.log('offline');
                this.setState({ isConnected: false });
            }

            if (connection.isConnected) {
                // creating a references to messages collection
                this.referenceChatMessages = firebase.firestore().collection('messages');

                // listen to authentication events
                this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
                    if (!user) {
                        await firebase.auth().signInAnonymously();
                    }
                    //update user state with currently active user data
                    this.setState({
                        uid: user.uid,
                        messages: [],
                        user: {
                            _id: user.uid,
                            name: name,
                        },
                    });
                    //connect to firebase by uid
                    this.referenceChatUser = firebase
                        .firestore()
                        .collection("messages")
                        .where("uid", '==', this.state.uid);
                    this.unsubscribe = this.referenceChatMessages
                        .orderBy("createdAt", "desc")
                        .onSnapshot(this.onCollectionUpdate);
                });
                this.saveMessages();
            } else {
                this.getMessages();
            }
        });
    }

    componentWillUnmount() {
        if (this.state.isConnected) {
            // stop listening to authentication
            this.authUnsubscribe();
            // stop listening for changes
            this.unsubscribe();
        }
    }

    //append new messages to previous messages
    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }), () => {
            this.saveMessages();
            if (this.state.isConnected) {
                this.addMessages(this.state.messages[0]);
            }
        });
    }

    //change the styling of the chat bubble
    renderBubble(props) {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#000'
                    }
                }}
            />
        )
    }

    //only display the input toolbar if the user is connected to the internet
    renderInputToolbar(props) {
        if (this.state.isConnected == false) {
        } else {
            return (
                <InputToolbar
                    {...props}
                />
            );
        }
    }

    renderCustomActions = (props) => {
        return <CustomActions {...props} />;
    };

    renderCustomView(props) {
        const { currentMessage } = props;
        if (currentMessage.location) {
            return (
                <MapView
                    style={{
                        width: 150,
                        height: 100,
                        borderRadius: 13,
                        margin: 3
                    }}
                    region={{
                        latitude: currentMessage.location.latitude,
                        longitude: currentMessage.location.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />
            );
        }
        return null;
    }

    render() {
        let chatColor = this.props.route.params.chatColor;

        return (
            <View style={[{ backgroundColor: chatColor }, styles.container]}>
                <Text>{this.state.loggedInText}</Text>
                <GiftedChat
                    renderBubble={this.renderBubble.bind(this)}
                    renderInputToolbar={this.renderInputToolbar.bind(this)}
                    renderActions={this.renderCustomActions}
                    renderCustomView={this.renderCustomView}
                    messages={this.state.messages}
                    onSend={messages => this.onSend(messages)}
                    user={{ _id: this.state.user._id, name: this.state.user.name }}
                />
                {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
            </View>
        );
    };
}

//styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});


