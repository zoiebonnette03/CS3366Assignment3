import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

// Define the type for a grocery item
type GroceryItem = {
  id: string;
  name: string;
  completed: boolean;
};

const GroceryListApp = () => {
  const [groceryItem, setGroceryItem] = useState("");
  const [groceryList, setGroceryList] = useState<GroceryItem[]>([]);

  // Function to add a new grocery item
  const addGroceryItem = () => {
    if (groceryItem.trim()) {
      setGroceryList([
        ...groceryList,
        { id: Date.now().toString(), name: groceryItem, completed: false },
      ]);
      setGroceryItem("");
    }
  };

  // Function to toggle completion state
  const toggleCompletion = (id: string) => {
    setGroceryList(
      groceryList.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  // Function to remove an item from the list
  const removeGroceryItem = (id: string) => {
    setGroceryList(groceryList.filter((item) => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Grocery List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new item"
          value={groceryItem}
          onChangeText={setGroceryItem}
        />
        <Button title="Add" onPress={addGroceryItem} />
      </View>
      <FlatList
        data={groceryList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <TouchableOpacity onPress={() => toggleCompletion(item.id)}>
              <View
                style={[styles.dot, item.completed && styles.completedDot]}
              />
            </TouchableOpacity>
            <Text
              style={[styles.itemText, item.completed && styles.completedText]}
            >
              {item.name}
            </Text>
            <TouchableOpacity onPress={() => removeGroceryItem(item.id)}>
              <Text style={styles.removeButton}>X</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    borderRadius: 5,
    backgroundColor: "#e0e0e0",
    marginBottom: 10,
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#555",
    marginRight: 10,
  },
  completedDot: {
    backgroundColor: "green", // Change color when completed
  },
  itemText: {
    fontSize: 18,
    flex: 1,
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "gray",
  },
  removeButton: {
    color: "red",
    fontSize: 16,
  },
});

export default GroceryListApp;
