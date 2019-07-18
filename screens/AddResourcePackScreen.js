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
import ResourcePackFetcher from "../fetcher/ResourcePackFetcher";
import ResourcePackParser from "../fetcher/ResourcePackParser";


export default class AddResourcePackScreen extends Component {

    state = {
        errors: [],
        images: [],
        loadedImages: false
    };


    async componentDidMount(): void {
        this.windowWidth = Dimensions.get('window').width;
        let url = this.props.navigation.getParam('url');
        let json = await ResourcePackFetcher.getResourcePack(url).catch(() => {
            alert("url not valid json");
        });
        if (json) {
            await Promise.all(ResourcePackParser.parseImages(json, (key, value) => {
                if (value.substring(0, 10) === "data:text/") { // 404 Error
                    let errors = this.state.errors;
                    errors.push({key: "could not fetch " + key});
                    this.setState({errors: errors});
                } else {
                    let images = this.state.images;
                    images.push({key: key, value: value});
                    this.setState({images: images});
                }
            }));
        }
        this.setState({loadedImages: true});
        // Store json in asyncstorage
    }

    canAddResourcepack(){
        return this.loaded && this.state.errors.length === 0;
    }

    render() {
        let addButtonEnabled = this.canAddResourcepack();
        let buttonColor = addButtonEnabled ? '#007aff' : '#888888';

        return (
            <View style={{flex: 1}}>
                <FlatList
                    data={this.state.images}
                    renderItem={(item) => { // item.item for whatever reason
                        return (<Image source={{uri: item.item.value}} style={{
                            width: this.windowWidth / 5 - 20,
                            height: this.windowWidth / 5 - 20,
                            margin: 10
                        }}/>);
                    }}
                    style={{height: "70%"}}
                    numColumns={5}
                />

                <FlatList
                    data={this.state.errors}
                    renderItem={(item) => <Text style={{paddingLeft: 10, paddingRight: 10, paddingBottom: 5, color: 'red'}}>{item.item.key}</Text>}
                    style={{height: "30%"}}
                />
                <TouchableOpacity style={{alignContent: 'center'}} disabled={!addButtonEnabled}>
                    <View style={styles.button}>
                        <Text style={[styles.buttonText, {color: buttonColor}]}>Add Resourcepack</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
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
        fontSize: 30,
    },
};