import React from "react";
import { Text, View, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useWindowDimensions } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { complete, deleteTodo } from "../Redux/slices/todoSlice";
import styles from "../Styles/styles";

export default function TODO({ navigation }) {
  const dispatch = useDispatch();
  const incompleteTodos = useSelector((state) =>
    state.todo.todos.filter((todo) => !todo.completed)
  );
  const { width } = useWindowDimensions();

  const handleDelete = (todoId) => {
    dispatch(deleteTodo(todoId));
  };

  const handlecomplete = (todoId) => {
    dispatch(complete(todoId));
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.taskList}
        data={incompleteTodos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("ToDoDetails", {
                  details: item,
                });
              }}
              style={{ flex: 1 }}
            >
              <Text style={styles.taskTitle}>{item.title}</Text>
              <Text>{item.description}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleDelete(item.id)}>
              <Ionicons name="trash-bin" size={24} color="#791dc9" />
            </TouchableOpacity>

            <TouchableOpacity
              style={{ paddingLeft: width * 0.05 }}
              onPress={() => handlecomplete(item.id)}
            >
              <Ionicons
                name={item.completed ? "checkbox" : "square-outline"}
                size={24}
                color="#791dc9"
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
