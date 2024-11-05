import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { GlobalText } from "@/components/GlobalText";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { faCircle as faCircleFill } from "@fortawesome/free-solid-svg-icons";
import { RecipeProvider } from "./RecipeContext";
type GroceryItem = {
  id: string;
  name: string;
};

export default function Home() {
  const [groceryItem, setGroceryItem] = useState("");
  const [groceryList, setGroceryList] = useState<GroceryItem[]>([]);

  // Function to add an item to the list
  const addGroceryItem = () => {
    if (groceryItem.trim()) {
      // Ensure item is not empty
      setGroceryList([
        ...groceryList,
        { id: Date.now().toString(), name: groceryItem },
      ]);
      setGroceryItem("");
    }
  };

  // Function to remove an item from the list
  const removeGroceryItem = (id: string) => {
    setGroceryList(groceryList.filter((item) => item.id !== id));
  };
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
          <View style={styles.ingredientContainer}>
            <View style={{ flexDirection: "column", padding: 12 }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <FontAwesomeIcon
                  icon={faCircle}
                  style={{ color: "#3B4937" }}
                ></FontAwesomeIcon>
                <Text style={styles.recipeTitle}>Chicken Breast -</Text>
                <Text style={styles.recipeSubtext1}>1.5 oz, unfrozen</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <FontAwesomeIcon
                  icon={faCircleFill}
                  style={{ color: "#3B4937" }}
                ></FontAwesomeIcon>
                <Text style={styles.recipeTitle}>Pesto -</Text>
                <Text style={styles.recipeSubtext1}>
                  5 oz, basil pesto sauce
                </Text>
              </View>
              <View style={{ padding: 4 }}>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>+ Add</Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* <FlatList
            data={groceryList}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View>
                <Text style={styles.itemText}>sample item</Text>
                <TouchableOpacity onPress={() => removeGroceryItem(item.id)}>
                  <Text style={styles.removeButton}>Remove</Text>
                </TouchableOpacity>
              </View>
            )}
          /> */}
          </View>
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
    padding: 10,
    backgroundColor: "rgba(212, 206, 195, 1)",
    borderRadius: 24,
    flexDirection: "row",
    fontFamily: "InterRegular",
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderRadius: 5,
    backgroundColor: "#e0e0e0",
    marginBottom: 10,
  },
  itemText: {
    fontSize: 18,
  },
  removeButton: {
    color: "red",
    fontSize: 16,
  },
  button: {
    width: 78,
    height: 30,
    borderRadius: 100,
    borderColor: "#3B4937",
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    textAlign: "center",
    color: "#222222",
    fontFamily: "InterMedium",
    fontSize: 14,
  },
});
