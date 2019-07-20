import React, {Component} from "react";
import {View, TextInput, Button, ScrollView, FlatList, TouchableOpacity, Text, Image, StyleSheet} from "react-native";
import {NavigationEvents} from "react-navigation";
import ResourceStorage from "../storage/ResourceStorage";
import IconStore from "../storage/IconStore";
import Icon from 'react-native-vector-icons/MaterialIcons';


export default class ResourcepackListScreen extends Component {

    static navigationOptions = {
        title: 'Resourcepacks',
    };

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            resourcepacks: [],
            bgColor: "white",
        };
    }


    componentDidMount() {
        this.init();
    }

    init() {
        this.loadResourcepacks().then(() => {
            this.setState({
                loaded: true
            });
        });
    }

    loadResourcepacks() {
        return ResourceStorage.getResourcePackList().then(async (resourcepackNames) => {
            console.log("[ResourcepackListScreen.loadResourcepacks] resourcepacks " + JSON.stringify(resourcepackNames));
            return await Promise.all(resourcepackNames.map(name => {
                return ResourceStorage.getResourcePackInfo(name);
            })).then(async info => {
                return await Promise.all(info.map(async item => {
                    item.icon = await IconStore.getIcon(item.icon);
                    return item;
                }));
            }).then(info => {
                return this.setState({resourcepacks: info});
            });
        });
    }

    addResourcepackButtonPressed() {
        this.props.navigation.push("AddResourcePack", {url: this.state.fetchURL});
    }

    deleteResourcepack(name: String) {
        return ResourceStorage.removeResourcePack(name).then(() => {
            console.log("[ResourcepackListScreen.deleteResourcepack] removed " + name);
            return this.loadResourcepacks();
        });
    }

    switchTo(name: String) {
        // TODO show resourcepack structure, that's kinda low prio
    }

    didLoad() {
        let inputText = this.state.fetchURL;
        let inputBgColor = this.state.bgColor;
        let resourcepacks = this.state.resourcepacks;

        return (
            <View style={styles.container}>
                <NavigationEvents style={{height: 0}}
                    onWillFocus={() => this.loadResourcepacks()}
                />
                <View style={{
                    paddingLeft: 5,
                    paddingBottom: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    borderBottomWidth: 2,
                }}>
                    <TextInput
                        value={inputText}
                        style={{
                            backgroundColor: inputBgColor,
                            borderWidth: 0.5,
                            flex: 2,
                            height: 40,
                            paddingRight: 5,
                        }}
                        placeholder="Type url of info.json"
                        onChangeText={(text) => this.setState({fetchURL: text, bgColor: "white"})}
                        keyboardType="url"
                        onSubmitEditing={() => this.addResourcepackButtonPressed()}
                    />
                    <Icon.Button
                        name="playlist-add"
                        backgroundColor={'#ffffff'}
                        color={'#000000'}
                        onPress={() => this.addResourcepackButtonPressed()}
                        size={25}
                        style={{height: 40}}
                        iconStyle={{marginRight: 0}}
                    />
                </View>
                <ScrollView style={{flex: 4}}>
                    <FlatList
                        data={resourcepacks.map(item => {
                            return {key: item.name, value: item.icon};
                        })}
                        renderItem={({item}) =>
                            <View style={{flex: 1, flexDirection: "row", justifyContent: "space-between"}}>
                                <TouchableOpacity style={{width: "70%"}} onPress={() => this.switchTo(item.key)}>
                                    <View style={styles.button}>
                                        <Text style={styles.buttonText}>{item.key}</Text>
                                        <Image source={{uri: item.value}} style={{width: 60, height: 60}}/>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={{justifyContent: 'center', flexDirection: 'column',}}
                                                  onPress={() => this.deleteResourcepack(item.key)}>
                                    <View style={styles.button}>
                                        <Text style={[styles.buttonText, styles.delete]}>delete</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        }
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
        //if (this.state.loaded) {
        //     this.check();
        return this.didLoad();
        // }
        // return this.loading();
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
        justifyContent: 'space-between',
        flexDirection: 'row',
        flex: 1,
    },
    buttonText: {
        padding: 5,
        color: '#007aff',
        fontSize: 30,
    }
});
