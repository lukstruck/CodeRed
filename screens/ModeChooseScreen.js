import React, {Component} from "react";
import {
    View,
    TextInput,
    Button,
    ScrollView,
    FlatList,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet,
    Dimensions
} from "react-native";
import {NavigationEvents} from "react-navigation";
import ResourceStorage from "../storage/ResourceStorage";
import IconStore from "../storage/IconStore";
import {Resource} from "../resourcePackStructure/Resourcepack";


export default class ModeChooseScreen extends Component {

    static navigationOptions = {
        title: 'Choose a Mode',
    };

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            modes: [],
        };
    }


    componentDidMount() {
        this.init();
    }

    init() {
        this.loadModes().then(() => {
            this.setState({
                loaded: true
            });
        });
    }

    loadModes() {
        return ResourceStorage.getAllResourceType(Resource.MODES).then(async modes => {
            return await Promise.all(modes.map(async mode => {
                mode.assets.icon = await IconStore.getIcon(mode.assets.icon);
                return mode;
            }));
        }).then(modes => {
            return this.setState({modes: modes.flat()});
        });
    }

    showGame(mode: String) {
        this.props.navigation.navigate("Game", {map: this.props.navigation.getParam('map'), mode: mode});
    }

    didLoad() {

        const windowWidth = Dimensions.get('window').width;
        let modes = this.state.modes;

        return (
            <View style={styles.container}>
                <NavigationEvents style={{height: 0}}
                                  onWillFocus={() => this.loadModes()}
                />
                <ScrollView style={{flex: 4}}>
                    <FlatList
                        data={modes.map(item => {
                            return {key: item.name, value: item.assets.icon};
                        })}
                        renderItem={({item}) =>
                            <View style={{flex: 1, flexDirection: "row"}}>
                                <TouchableOpacity onPress={() => this.showGame(item.key)}>
                                    <View style={styles.button}>
                                        <Image source={{uri: item.value}}
                                               style={{width: windowWidth / 2 - 50, height: windowWidth / 2 - 50}}/>
                                        <Text style={styles.buttonText}>{item.key}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        }
                        numColumns={2}
                    />
                </ScrollView>
            </View>
        );
    }

    loading() {
        return (
            <View/>
        );
    }

    check() {

    }

    render() {
        if (this.state.loaded) {
            this.check();
            return this.didLoad();
        }
        return this.loading();
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        padding: 20,
        flexDirection: "column",
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
        color: "black",
    },
    delete: {
        color: "red",
        fontSize: 20,

    },
    button: {
        alignItems: 'center',
        flex: 1,
    },
    buttonText: {
        padding: 5,
        color: '#007aff',
        fontSize: 30,
    }
});
