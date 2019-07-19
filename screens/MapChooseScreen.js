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
import Icon from 'react-native-vector-icons/MaterialIcons';


export default class MapChooseScreen extends Component {

    static navigationOptions = {
        title: 'Choose a map',
    };

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            maps: [],
        };
    }


    componentDidMount() {
        this.init();
    }

    init() {
        this.loadMaps().then(() => {
            this.setState({
                loaded: true
            });
        });
    }

    loadMaps() {
        return ResourceStorage.getAllResourceType('maps').then(async maps => {
            return await Promise.all(maps.map(async map => {
                map.assets.image = await IconStore.getIcon(map.assets.image);
                map.assets.icon = await IconStore.getIcon(map.assets.icon);
                return map;
            }));
        }).then(maps => {
            return this.setState({maps: maps.flat()});
        });
    }

    showGameModes(mapName: String) {

    }

    didLoad() {

        const windowWidth = Dimensions.get('window').width;
        let maps = this.state.maps;

        return (
            <View style={styles.container}>
                <NavigationEvents style={{height: 0}}
                                  onWillFocus={() => this.loadMaps()}
                />
                <ScrollView style={{flex: 4}}>
                    <FlatList
                        data={maps.map(item => {
                            return {key: item.name, value: item.assets.icon};
                        })}
                        renderItem={({item}) =>
                            <View style={{flex: 1, flexDirection: "row"}}>
                                <TouchableOpacity onPress={() => this.showGameModes(item.key)}>
                                    <View style={styles.button}>
                                        <Image source={{uri: item.value}} style={{width: windowWidth / 2- 50, height: windowWidth / 2- 50}}/>
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
