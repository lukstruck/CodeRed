import React from 'react';
import { Image, Text, View } from 'react-native';
import { AppLoading } from 'expo';

export default class App extends React.Component {
    state = {
        isReady: false,
    };

    render() {
        if (!this.state.isReady) {
            return (
                <AppLoading
                    startAsync={this._cacheResourcesAsync}
                    onFinish={() => this.setState({ isReady: true })}
                    onError={console.warn}
                />
            ); }

        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text>Loaded app</Text>
            </View>
        );
    }

    async _cacheResourcesAsync() {
    }
}