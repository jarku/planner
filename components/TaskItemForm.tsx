import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import SegmentedControl from '@react-native-segmented-control/segmented-control';

interface TaskItemT { id: string, name: string, description: string }
const defaultItem: TaskItemT = { id: '1234', name: '', description: '' }

export default function TaskItemForm() {
  const [item, setItem] = useState<TaskItemT>(defaultItem);
  const [itemType, setItemType] = useState("");
  const [selectedItemTypeIndex, setSelectedItemTypeIndex] = useState(0);
  const itemTypes = ['Task', 'Break'];

  const handleAddTask = () => {

  };

  function Form() {
    switch (selectedItemTypeIndex) {
      case 0:
        return (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={item.name}
              onChangeText={(text) => setItem({ ...item, name: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Description"
              value={item.name}
              onChangeText={(text) => setItem({ ...item, name: text })}
            />
          </View>
        );
      case 1:
        return (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Duration"
              value={item.name}
              onChangeText={(text) => setItem({ ...item, name: text })}
            />
          </View>
        );
    }

  }

  return (
    <View style={styles.container}>
      <SegmentedControl
        values={itemTypes}
        selectedIndex={selectedItemTypeIndex}
        onChange={(event) => {
          setSelectedItemTypeIndex(event.nativeEvent.selectedSegmentIndex);
        }}
      />
      <Form />
      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddTask}>
        <Text style={styles.addButtonText}>
          Add
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
}); 