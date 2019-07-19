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
        this.loadDatapacks().then(() => {
            this.setState({
                loaded: true
            });
        });
    }

    loadDatapacks() {
        return ResourceStorage.getResourcePackList().then(async (datapackNames) => {
            console.log("[ResourcepackListScreen.loadDatapacks] datapacks " + JSON.stringify(datapackNames));
            return await Promise.all(datapackNames.map(name => {
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

    addDatapackButtonPressed() {
        this.props.navigation.push("AddResourcePack", {url: this.state.fetchURL});
    }

    deleteDatapack(name: String) {
        return ResourceStorage.removeResourcePack(name).then(() => {
            console.log("[ResourcepackListScreen.deleteDatapack] removed " + name);
            return this.loadDatapacks();
        });
    }

    switchTo(name: String) {
        // TODO show datapack structure, that's kinda low prio
    }

    didLoad() {
        let inputText = this.state.fetchURL;
        let inputBgColor = this.state.bgColor;
        let resourcepacks = this.state.resourcepacks;

        return (
            <View style={styles.container}>
                <NavigationEvents
                    onWillFocus={() => this.loadDatapacks()}
                />
                <View style={{
                    paddingLeft: 5,
                    paddingBottom: 5,
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
                        onSubmitEditing={() => this.addDatapackButtonPressed()}
                    />
                    <Icon.Button
                        name="playlist-add"
                        backgroundColor={'#ffffff'}
                        color={'#000000'}
                        onPress={() => this.addDatapackButtonPressed()}
                        style={{
                            padding: 5,
                        }}
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
                                                  onPress={() => this.deleteDatapack(item.key)}>
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
        paddingTop: 30,
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
