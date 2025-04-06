import React, { useEffect, useRef, useState } from "react";
import "../Styles/Create.css";
import { useFetch } from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";

export default function Create() {
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [newIngredient, setNewIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const ingredientInput = useRef(null);
  const { postData, data, error } = useFetch(
    "http://localhost:3000/recipes",
    "POST"
  );
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    setCookingTime("");
    setMethod("");
    setTitle("");
    postData({
      title,
      ingredients,
      cookingTime: cookingTime + "minutes",
      method,
    });
  };
  const handleAdd = () => {
    const ing = newIngredient.trim();
    if (ing && !ingredients.includes(ing)) {
      setIngredients((prev) => [...prev, ing]);
    }
    setNewIngredient("");
    ingredientInput.current.focus();
  };
  useEffect(() => {
    if (data) navigate("/");
  }, [data]);
  return (
    <div className="create">
      <h2 className="page-title">Add a New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Recipe title:</span>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>
        <label>
          <span>Recipe ingredients:</span>
          <div className="ingredients">
            <input
              type="text"
              onChange={(e) => setNewIngredient(e.target.value)}
              value={newIngredient}
              ref={ingredientInput}
            />
            <button type="button" className="btn" onClick={handleAdd}>
              {" "}
              add
            </button>
          </div>
        </label>
        <p>
          {" "}
          current ingredients:{" "}
          {ingredients.map((i) => (
            <em key={i} className="ing-name">
              {i},{" "}
            </em>
          ))}
        </p>
        <label>
          <span>Recipe method:</span>
          <textarea
            onChange={(e) => setMethod(e.target.value)}
            value={method}
            required
          />
        </label>
        <label>
          <span>cookingTime (minutes)</span>
          <input
            type="number"
            onChange={(e) => setCookingTime(e.target.value)}
            value={cookingTime}
            required
          />
        </label>
        <button className="btn"> submit</button>
      </form>
    </div>
  );
}
