import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

//the application's chat page
export default class Chat extends React.Component {

    render() {
        let name = this.props.route.params.name;
        let chatColor = this.props.route.params.chatColor;

        //set the navigation title to name
        this.props.navigation.setOptions({ title: name });

        return (
            <View style={{ backgroundColor: chatColor }}>
                {/* Rest of the UI */}
            </View>
        );
    };
}
