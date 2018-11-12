import React, {Component} from 'react'
import ReactNative,{View, Text, StyleSheet, TextInput, ScrollView, FlatList, Keyboard, KeyboardAvoidingView, Animated} from 'react-native'

let dataSources;

export default class ChatInput extends Component{

    constructor(props) {
        super(props);

        dataSources = this.generateBig();
    }


    _renderItem = ({item}) => (
        <View style={{justifyContent: 'center'}}>
            <Text style={styles.renderItem}>{item}</Text>
        </View>
    );

    generateBig(){
        var str = [];
        for(var i=65;i<91;i++){
            str.push(String.fromCharCode(i));
        }
        return str;
    }

    componentWillMount () {
        this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
        this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
    }

    componentWillUnmount() {
        this.keyboardWillShowSub.remove();
        this.keyboardWillHideSub.remove();
    }

    keyboardWillShow = (event) => {
        this.refs.flatList.scrollToIndex({animated: true, index: this.generateBig().length-1, viewPosition: 0.5});
    };

    keyboardWillHide = (event) => {
        this.refs.flatList.scrollToIndex({animated: true, index: this.generateBig().length-1, viewPosition: 1.9})
    }

    render () {
        return (
            <KeyboardAvoidingView
                style={styles.container}
                behavior="padding"
            >
                <FlatList
                    ref={'flatList'}
                    data={dataSources}
                    renderItem={this._renderItem}
                    // ItemSeparatorComponent={ItemDivideComponent}
                />
                <TextInput
                    style={styles.inputView}
                    returnKeyType="search"
                    placeholder="请输入消息"
                />
                <View style={{height: 20}}></View>
            </KeyboardAvoidingView>
        )
    }

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'flex-end',
        backgroundColor: '#F5FCFF',
        flexDirection: 'column'
    },
    list: {
        marginTop: 30,
    },
    inputView: {
        height: 45,
        borderWidth: 1,
        marginLeft: 5,
        marginRight: 5,
        paddingLeft: 5,
        borderColor: '#ccc',
        borderRadius: 4,
    },
    renderItem: {
        height: 44,
        marginLeft: 20,
    }
});

class ItemDivideComponent extends Component {
    render() {
        return (
            <View style={{height: 1, backgroundColor: 'skyblue'}}/>
        );
    }
}