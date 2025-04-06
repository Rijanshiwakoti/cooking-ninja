import React from "react";
import { useLoaderData } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import "../Styles/Recipe.css";

export const loader = async ({ params }) => {
  const { id } = params;
  return id;
};
export default function Recipe(props) {
  const id = useLoaderData();
  const { data, error, isPending } = useFetch(
    `http://localhost:3000/recipes/${id}`
  );

  return (
    <div className="recipe">
      {error && <p className="error">{}error</p>}
      {isPending && <p className="pending">Loading...</p>}
      {data && (
        <>
          <h1 className="page-title">{data.title}</h1>
          <p>takes {data.cookingTime}</p>
          <ul>
            {data.ingredients.map((ing, index) => {
              return <li key={index}>{ing}</li>;
            })}
          </ul>
          <p className="method">{data.method}</p>
        </>
      )}
    </div>
  );
}
