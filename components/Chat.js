import React from 'react';
import { StyleSheet, View, Text, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

//the application's chat page
export default class Chat extends React.Component {

    constructor() {
        super();
        this.state = {
            messages: [],
        }
    }

    componentDidMount() {

        let name = this.props.route.params.name;

        //set the initial chat message and system message
        this.setState({
            messages: [
                {
                    _id: 1,
                    text: 'Hello' + name,
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        avatar: 'https://placeimg.com/140/140/any',
                    },
                },
                {
                    _id: 2,
                    text: name + 'has entered the chat',
                    createdAt: new Date(),
                    system: true,
                },
            ],
        })
    }

    //append new messages to previous messages
    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }))
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
        let name = this.props.route.params.name;
        let chatColor = this.props.route.params.chatColor;

        //set the navigation title to name
        this.props.navigation.setOptions({ title: name });

        return (
            <View style={{ backgroundColor: chatColor, flex: 1 }}>
                <GiftedChat
                    renderBubble={this.renderBubble.bind(this)}
                    messages={this.state.messages}
                    onSend={messages => this.onSend(messages)}
                    user={{
                        _id: 1,
                    }}
                />
                {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
            </View>
        );
    };
}

//styles
const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // backgroundColor: chatColor,
    },
});


