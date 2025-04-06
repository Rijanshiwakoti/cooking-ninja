import React, { useState } from "react";
import "../Styles/Create.css";

export default function Create() {
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [cookingTime, setCookingTime] = useState("");

  return (
    <div className="create">
      <h2 className="page-title">Add a New Recipe</h2>
    </div>
  );
}
