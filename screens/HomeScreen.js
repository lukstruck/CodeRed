import React from 'react';
import {Image, Text, View, ScrollView, Dimensions, Button, TouchableOpacity} from 'react-native';
import {AppLoading} from 'expo';

export default class App extends React.Component {
    state = {
        isReady: false,
    };

    switchTo(screenName) {
        this.props.navigation.navigate(screenName);
    }

    render() {
        if (!this.state.isReady) {
            return (
                <AppLoading
                    startAsync={this._cacheResourcesAsync}
                    onFinish={() => this.setState({isReady: true})}
                    onError={console.warn}
                />
            );
        }

        const windowWidth = Dimensions.get('window').width;
        const bannerRatio = 284 / 820;
        // const bannerHeight = 284;
        const bannerHeight = windowWidth * bannerRatio;

        return (
            <View style={{flex: 1, justifyContent: 'space-between'}}>
                <Image source={require("../assets/banner.png")} style={{width: windowWidth, height: bannerHeight}}/>
                {/*<View>*/}
                <TouchableOpacity onPress={() => this.switchTo("ResourcepackList")}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Manage Datapacks</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.switchTo("Game")}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Play</Text>
                    </View>
                </TouchableOpacity>
                {/*</View>*/}
                <View/>
            </View>
        );
    }

    async _cacheResourcesAsync() {
    }
}


const styles = {
    main: {
        padding: 25,
        paddingTop: 20,
        flexDirection: 'column',
        flex: 1,
    },
    text: {
        paddingTop: 10,
        fontSize: 20,
    },
    header: {
        alignSelf: 'center',
        fontSize: 40,
        fontWeight: 'bold',
    },
    button: {
        alignItems: 'center',
        paddingBottom: 20,
    },
    buttonText: {
        padding: 5,
        color: '#007aff',
        fontSize: 30,
    },
};