import React from "react";
import "../Styles/RecipeList.css";
import { Link } from "react-router-dom";

export default function RecipeList({ recipes }) {
  return (
    <div className="recipe-list">
      {recipes.map((recipe) => {
        return (
          <div className="card" key={recipe.id}>
            <h3>{recipe.title}</h3>
            <p>{recipe.cookingTime} to make</p>
            <div>{recipe.method.substring(0, 100)}...</div>
            <Link to={`/recipes/${recipe.id}`}>Cook This</Link>
          </div>
        );
      })}
    </div>
  );
}
