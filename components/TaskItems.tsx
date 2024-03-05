import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Switch
} from "react-native";

interface TaskItemT {type: string, id: string, name: string, description: string, time?: number}

const intialItems: TaskItemT[] = [{type: 'text', id: '1234', name: 'Podejdz do drzwi', description: 'hehe'}]
const defaultItem: TaskItemT = {type: 'text', id: '1234', name: '', description: ''}

export default function TaskItems() {
  const [item, setItem] = useState<TaskItemT>(defaultItem);
  const [items, setItems] = useState<TaskItemT[]>(intialItems);
  const [editIndex, setEditIndex] = useState(-1);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const handleAddTask = () => {
    if (item) {
      if (editIndex !== -1) {
        // Edit existing item 
        const updatedTasks = [...items];
        updatedTasks[editIndex] = item;
        setItems(updatedTasks);
        setEditIndex(-1);
      } else {
        // Add new item 
        setItems([...items, item]);
      }
      setItem(defaultItem)
    }
  };

  const handleEditTask = (index: number) => {
    const itemToEdit = items[index];
    setItem(itemToEdit);
    setEditIndex(index);
  };

  const handleDeleteTask = (index: number) => {
    const updatedTasks = [...items];
    updatedTasks.splice(index, 1);
    setItems(updatedTasks);
  };

  const renderItem = ({ item, index }: {item: TaskItemT, index: number}) => (
    <View style={styles.item}>
      <Text
        style={styles.itemList}>{item.name}</Text>
        {isEditMode &&
      <View
      style={styles.itemButtons}>
      <TouchableOpacity
        onPress={() => handleEditTask(index)}>
        <Text
          style={styles.editButton}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleDeleteTask(index)}>
        <Text
          style={styles.deleteButton}>Delete</Text>
      </TouchableOpacity>
    </View>
      }
    </View>
  );

  return (
    <View style={styles.container}>
      <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={isEditMode ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={() => setIsEditMode(!isEditMode)}
        value={isEditMode}
      />
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter item name"
        value={item.name}
        onChangeText={(text) => setItem({...item, name: text})}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddTask}>
        <Text style={styles.addButtonText}>
          {editIndex !== -1 ? "Update Task" : "Add Task"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    flex: 1,
    padding: 40,
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 7,
    color: "green",
  },
  input: {
    borderWidth: 3,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 18,
    color: 'white'
  },
  addButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    padding: 10,
    backgroundColor: "grey",
    fontSize: 24,
    width: '100%'
  },
  itemList: {
    fontSize: 19,
    color: 'white'
  },
  itemButtons: {
    flexDirection: "row",
  },
  editButton: {
    marginRight: 10,
    color: "green",
    fontWeight: "bold",
    fontSize: 18,
  },
  deleteButton: {
    color: "red",
    fontWeight: "bold",
    fontSize: 18,
  },
}); 