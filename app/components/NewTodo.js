import React from 'react';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Octicons';
import {StyleSheet, Text, View, TouchableOpacity, ScrollView, RefreshControl, TextInput  } from 'react-native';


import {createTodo} from '../actions';

var TodoList = React.createClass({
    getInitialState() {
        return {
            newTodoText: undefined,
            loading: false
        }
    },
    onBack() {
      this.props.navigator.pop();  
    },
    addNewTodo() {
        var {newTodoText} = this.state;
        var {dispatch} = this.props
        if (newTodoText && newTodoText != "") {
            this.setState({loading: true}); 
            dispatch(createTodo(newTodoText)).then(() => {
                this.setState({loading: false});
                this.props.navigator.pop();
            })   
        }
    },
    render() {
        var renderScrollViewOrLoading = () => {
            if (this.state.loading) {
                return (
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text>
                            Creating TODO...
                        </Text>
                    </View>
                )
            } else {
                return (
                    <ScrollView 
                    automaticallyAdjustContentInsets={false}
                    contentContainerStyle={styles.scrollViewContainer}
                    > 
                    <View style={styles.inputContainer}>
                        <TextInput onChangeText={(newTodoText)=> {
                        this.setState({newTodoText})

                    }}
                    placeholder="NEW TO-DO TEXT"
                    style={styles.input}></TextInput>
                    </View>
                </ScrollView>
                )
            }
        }
        return (
            <View style={styles.container}>
                <View style={styles.topBar}>
                <TouchableOpacity onPress={this.onBack}>
                    <Icon name="chevron-left" size={20} color="white" ></Icon>
                </TouchableOpacity>
                    <Text style={styles.title}>
                        New Todo
                    </Text>
                    
                    <TouchableOpacity onPress={this.addNewTodo}>
                          <Icon name="check" size={20} color="white" ></Icon>
                    </TouchableOpacity>
                </View>
                {renderScrollViewOrLoading()}
               
            </View>

        )
    }
});


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: '#F5FCFF'
    },
    topBar: {
        padding: 16,
        paddingTop: 28,
        paddingBottom: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#2ecc71' 
    },
    title: {
        color: 'white',
        fontSize: 20

    },
    inputContainer: {
        padding: 5,
        paddingLeft: 10,
        margin: 10,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: "#2ecc71" 
    },
    input: {
        height: 26
    }
});

var mapStateToProps = (state) => {
    return {
        todos: state.todos
    }
}

module.exports = connect(mapStateToProps)(TodoList);