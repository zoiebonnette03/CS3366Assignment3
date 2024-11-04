// import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
// import Constants from "expo-constants";
// import { useState } from "react";
// import { TextInput, TouchableOpacity, View } from "react-native";

// export function SearchBar() {
//     const [searchQuery, setSearchQuery] = useState(""); // State to hold the search term
//     const handleSearch = async () => {
//         try {
//           fetchRecipes(searchQuery);
//           Keyboard.dismiss();
//         } catch (error) {
//           console.error("Error fetching data:", error);
//         }
//       };

//       const fetchRecipes = async (query: string) => {
//         console.log(Constants.expoConfig?.extra?.RECIPE_API_KEY);
//         const url = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${apiKey}&addRecipeInformation=true`;

//         try {
//           setLoading(true); // Start loading
//           const response = await fetch(url);
//           const data = await response.json();
//           setRecipes(data.results); // Update state with fetched recipes
//         } catch (err: any) {
//           console.error("Error fetching recipes:", err);
//           setError(err.message); // Set error message
//         } finally {
//           setLoading(false); // Stop loading
//         }
//       };
//     return (
//         <View style={styles.input}>
//           <TouchableOpacity onPress={handleSearch}>
//             <FontAwesomeIcon
//               icon={faMagnifyingGlass}
//               color="#222222"
//               style={{ padding: 4, paddingRight: 6 }}
//             ></FontAwesomeIcon>
//           </TouchableOpacity>
//           <TextInput
//             onChangeText={setSearchQuery}
//             value={searchQuery}
//             onSubmitEditing={handleSearch}
//             placeholder="Search for a recipe"
//             placeholderTextColor="#555555"
//           ></TextInput>
//         </View>
//     )
// }
