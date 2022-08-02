import React from 'react';
import { StyleSheet, View, Text, Platform, KeyboardAvoidingView, Button, FlatList } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

const firebase = require('firebase');
require('firebase/firestore');
require('firebase/auth')

//the application's chat page
export default class Chat extends React.Component {

    constructor() {
        super();
        this.state = {
            messages: [],
            loggedInText: 'Please wait, you are getting logged in',
            user: {
                _id: '',
                name: '',
                avatar: '',
            }
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
        this.referenceChatMessages = null;
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
                }
            });
        });
        this.setState({
            messages,
        });
    }

    addMessages(data) {
        // add a new list to the collection
        this.referenceChatMessages.add({
            _id: data._id,
            text: data.text,
            createdAt: data.createdAt.toDate(),
            user: data.user,
            uid: this.state.uid,
        });
    }

    componentDidMount() {

        //set the navigation title to name
        let name = this.props.route.params.name;
        this.props.navigation.setOptions({ title: name });

        // creating a references to messages collection
        this.referenceChatMessages = firebase.firestore().collection('messages');

        // listen to authentication events
        this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (!user) {
                firebase.auth().signInAnonymously();
            }
            //update user state with currently active user data
            this.setState({
                uid: user.uid,
                messages: [],
                loggedInText: 'Welcome to the chat room',
                user: {
                    _id: user.uid,
                    name: name,
                },
            });
            this.unsubscribe = this.referenceChatMessages
                .orderBy("createdAt", "desc")
                .onSnapshot(this.onCollectionUpdate);
        });
    }

    componentWillUnmount() {
        // stop listening to authentication
        this.authUnsubscribe();
        // stop listening for changes
        this.unsubscribe();
    }

    //append new messages to previous messages
    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        })),
            () => {
                this.addMessages(this.state.messages[0]);
            }
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

    render() {
        let chatColor = this.props.route.params.chatColor;

        return (
            <View style={[{ backgroundColor: chatColor }, { flex: 1 }]}>
                <Text>{this.state.loggedInText}</Text>
                <GiftedChat
                    renderBubble={this.renderBubble.bind(this)}
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

});


