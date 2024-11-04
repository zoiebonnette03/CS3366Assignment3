// RecipeContext.js
import React, { createContext, useState, useContext } from "react";

const RecipeContext = createContext();

export const useRecipeContext = () => {
  return useContext(RecipeContext);
};

export const RecipeProvider = ({ children }) => {
  const [savedRecipes, setSavedRecipes] = useState([]);

  const addRecipe = (recipe) => {
    setSavedRecipes((prev) => [...prev, recipe]);
  };

  const removeRecipe = (recipeId) => {
    setSavedRecipes((prev) => prev.filter((recipe) => recipe.id !== recipeId));
  };

  const recipeSearch = (recipeId) => {
    let save = false;
    const isSaved = savedRecipes.find((saved) => saved.id === recipeId); // Check if saved
    if (isSaved) save = true;
    return save;
  };

  return (
    <RecipeContext.Provider
      value={{ savedRecipes, addRecipe, removeRecipe, recipeSearch }}
    >
      {children}
    </RecipeContext.Provider>
  );
};
