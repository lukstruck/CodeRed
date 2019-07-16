import React, {Component} from "react";
import {View, TextInput, Button, ScrollView, FlatList, TouchableOpacity, Text, Image} from "react-native";
import {NavigationEvents} from "react-navigation";

export default class DatapackListScreen extends Component {

    static navigationOptions = {
        title: 'Datapacks',
    };

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
        };
    }


    didLoad() {
        let inputText = this.state.fetchURL;
        let inputBgColor = this.state.bgColor;
        let lists = this.state.lists;

        return (
            <View style={styles.container}>
                <NavigationEvents
                    onWillFocus={() => this.loadLists()}
                />
                <Text style={{alignSelf: 'center', fontSize: 35, fontWeight: 'bold', paddingBottom: 20}}>
                    Datapacks
                </Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 5}}>
                    <TextInput
                        value={inputText}
                        style={{
                            backgroundColor: inputBgColor,
                            borderWidth: 0.5,
                            width: "70%"
                        }}
                        placeholder="Type url of info.json"
                        onChangeText={(text) => this.setState({fetchURL: text, bgColor: "white"})}
                        keyboardType="url"
                    />
                    <Button
                        onPress={() => this.addDatapackButtonPressed()}
                        title="Add List"
                    />
                </View>
                <ScrollView style={{flex: 4}}>
                    <FlatList
                        data={lists.map(item => {
                            return {key: item.name, value: item.icon};
                        })}
                        renderItem={({item}) =>
                            <View style={{flex: 1, flexDirection: "row", justifyContent: "space-between"}}>
                                <TouchableOpacity style={{width: "70%"}} onPress={() => this.switchTo(item.key)}>
                                    <View style={styles.button}>
                                        <Text style={styles.buttonText}>... {item.key}</Text>
                                        <Image progress={item.value} style={{width: 20, height: 20}}/>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={{justifyContent: 'center', flexDirection: 'column',}}
                                                  onPress={() => this.deleteList(item.key)}>
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
        if (this.state.loaded) {
            this.check();
            return this.didLoad();
        }
        return this.loading();
    }

}