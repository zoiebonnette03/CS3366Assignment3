import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  TextInput,
  Keyboard,
  ScrollView,
} from "react-native";
import { GlobalText } from "@/components/GlobalText";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import {
  faCircle as faCircleFill,
  faCross,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { RecipeProvider } from "./RecipeContext";
type GroceryItem = {
  id: string;
  name: string;
  isEdit: boolean;
  isCrossOut: boolean;
};

export default function Home() {
  const [groceryItem, setGroceryItem] = useState("");
  const [groceryList, setGroceryList] = useState<GroceryItem[]>([]);

  // Function to add an item to the list
  const handleAddItem = () => {
    // Add a new empty item at the end of the list for editing
    setGroceryList([
      ...groceryList,
      { id: Date.now().toString(), name: "", isEdit: true, isCrossOut: false },
    ]);
  };

  const handleSaveItem = (id: string) => {
    // Set isEditing to false to finalize the item
    setGroceryList((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, isEdit: false } : item
      )
    );
  };
  const handleUpdateItem = (id: string, text: any) => {
    // Update the name temporarily without saving
    setGroceryList((prevList) =>
      prevList.map((item) => (item.id === id ? { ...item, name: text } : item))
    );
  };
  // Function to toggle completion state
  const toggleCompletion = (id: string) => {
    setGroceryList(
      groceryList.map((item) =>
        item.id === id ? { ...item, isCrossOut: !item.isCrossOut } : item
      )
    );
  };

  // Function to remove an item from the list
  const removeGroceryItem = (id: string) => {
    setGroceryList(groceryList.filter((item) => item.id !== id));
  };
  const handleBlur = (id: string) => {
    setGroceryList((prevList) =>
      prevList.filter((item) => item.id !== id || item.name.trim() !== "")
    );
  };

  const renderItem = ({ item }: { item: GroceryItem }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={() => toggleCompletion(item.id)}>
        {item.isCrossOut ? (
          <FontAwesomeIcon
            icon={faCircleFill}
            size={20}
            style={{ color: "#3B4937" }}
          />
        ) : (
          <View>
            <FontAwesomeIcon
              icon={faCircle}
              size={20}
              style={{ color: "#3B4937" }}
            ></FontAwesomeIcon>
            <View style={styles.opaqueCenter}></View>
          </View>
        )}
      </TouchableOpacity>
      {item.isEdit ? (
        <TextInput
          style={styles.input}
          placeholder="Enter item name"
          value={item.name}
          onChangeText={(text) => handleUpdateItem(item.id, text)}
          onSubmitEditing={() => handleSaveItem(item.id)}
          onBlur={() => handleBlur(item.id)}
          autoFocus
        />
      ) : (
        <Text
          style={[styles.itemText, item.isCrossOut && styles.completedText]}
        >
          {item.name}
        </Text>
      )}
      <TouchableOpacity onPress={() => removeGroceryItem(item.id)}>
        <FontAwesomeIcon
          icon={faX}
          size={12}
          style={{ color: "#222222" }}
        ></FontAwesomeIcon>
      </TouchableOpacity>
    </View>
  );

  return (
    <RecipeProvider children={undefined}>
      <SafeAreaProvider
        style={{
          padding: 20,
          paddingTop: 63,
          backgroundColor: "rgba(243, 237, 228, 1)",
        }}
      >
        <SafeAreaView>
          <Text
            style={{
              fontFamily: "InterBold",
              fontSize: 24,
              color: "#222222",
              paddingBottom: 10,
            }}
          >
            Shopping List
          </Text>
          <ScrollView style={styles.ingredientContainer}>
            <View style={{ flexDirection: "column", padding: 12 }}>
              <FlatList
                data={groceryList}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                ListFooterComponent={
                  <TouchableOpacity
                    style={styles.button}
                    onPress={handleAddItem}
                  >
                    <Text style={styles.buttonText}>+ Add</Text>
                  </TouchableOpacity>
                }
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    </RecipeProvider>
  );
}

const styles = StyleSheet.create({
  recipeDisplayContainer: {
    backgroundColor: "rgba(184, 200, 167, 1)",
    flexDirection: "column",
    justifyContent: "space-around",
    //alignItems: "center",
    borderRadius: 16,
    padding: 10,
  },
  ingredientContainer: {
    borderRadius: 16,
    backgroundColor: "#b8c8a7",
    //width: 342,
    height: 1091,
  },
  image: {
    width: 130,
    height: 96,
    marginTop: 4,
    borderRadius: 10,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  recipeTitle: {
    flexShrink: 0,
    textAlign: "left",
    color: "rgba(34, 34, 34, 1)",
    fontFamily: "InterMedium",
    fontSize: 16,
    padding: 4,
    maxWidth: "90%",
  },
  recipeSubtext1: {
    textAlign: "left",
    color: "rgba(34, 34, 34, 1)",
    fontFamily: "InterLightItalic",
    fontSize: 14,
  },
  recipeSubtext2: {
    textAlign: "left",
    color: "rgba(34, 34, 34, 1)",
    fontFamily: "InterLightItalic",
    fontSize: 12,
    marginTop: 4,
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: "#b8c8a7",
    flexDirection: "row",
    fontFamily: "InterMedium",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 4,
  },
  itemText: {
    paddingLeft: 4,
    paddingBottom: 4,
    flex: 1,
    fontSize: 18,
    fontFamily: "InterRegular",
  },
  button: {
    width: 70,
    height: 30,
    borderRadius: 100,
    borderColor: "#3B4937",
    borderWidth: 1.75,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  buttonText: {
    textAlign: "center",
    color: "#222222",
    fontFamily: "InterMedium",
    fontSize: 16,
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#555",
  },
  completedDot: {
    backgroundColor: "green", // Change color when completed
  },

  completedText: {
    textDecorationLine: "line-through",
    color: "gray",
  },
  opaqueCenter: {
    position: "absolute",
    top: 1.75,
    left: 1.5,
    height: 17,
    width: 17,
    backgroundColor: "rgba(59,77,50,.30)",
    borderRadius: 50,
  },
});
