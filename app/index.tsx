import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Keyboard,
} from "react-native";
import Constants from "expo-constants";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ThemedButton } from "@/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useNavigationContainerRef } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useRecipeContext } from "./RecipeContext";
import { MealDisplayBox } from "@/components/MealDisplayBox";

const RecipeSearch = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe[]>([]);
  const [searchQuery, setSearchQuery] = useState(""); // State to hold the search term
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  const { addRecipe } = useRecipeContext();
  const { removeRecipe, recipeSearch } = useRecipeContext();

  const router = useRouter();
  const apiKey = Constants.expoConfig?.extra?.RECIPE_API_KEY;

  const handleSearch = async () => {
    try {
      fetchRecipes(searchQuery);
      Keyboard.dismiss();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchRecipes = async (query: string) => {
    const url = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${apiKey}&addRecipeInformation=true`;

    try {
      setLoading(true); // Start loading
      const response = await fetch(url);
      const data = await response.json();
      setRecipes(data.results); // Update state with fetched recipes
    } catch (err: any) {
      console.error("Error fetching recipes:", err);
      setError(err.message); // Set error message
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <SafeAreaProvider
      style={{ padding: 20, backgroundColor: "rgba(243, 237, 228, 1)" }}
    >
      <SafeAreaView>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              fontFamily: "InterBold",
              fontSize: 24,
              color: "#222222",
              paddingBottom: 10,
            }}
          >
            Recipe Search
          </Text>
          <View style={{ alignItems: "flex-end", flex: 1.5, paddingRight: 8 }}>
            <ThemedButton
              title="Saved"
              bookmark={true}
              onPress={() => router.push({ pathname: "/home" })}
            ></ThemedButton>
          </View>
        </View>
        <View style={styles.input}>
          <TouchableOpacity onPress={handleSearch}>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              color="#222222"
              style={{ margin: 6, marginRight: 6 }}
            ></FontAwesomeIcon>
          </TouchableOpacity>
          <TextInput
            onChangeText={setSearchQuery}
            value={searchQuery}
            onSubmitEditing={handleSearch}
            placeholder="Search for a recipe"
            placeholderTextColor="#555555"
          ></TextInput>
        </View>
        <View style={{ paddingBottom: 25 }}></View>
        <MealDisplayBox recipes={recipes}></MealDisplayBox>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default RecipeSearch;

const styles = StyleSheet.create({
  recipeDisplayContainer: {
    backgroundColor: "rgba(184, 200, 167, 1)",
    flexDirection: "column",
    justifyContent: "space-around",
    //alignItems: "center",
    borderRadius: 16,
    padding: 10,
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
    marginTop: 10,
    fontFamily: "InterLightItalic",
    fontSize: 12,
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
});

interface Recipe {
  id: number;
}
