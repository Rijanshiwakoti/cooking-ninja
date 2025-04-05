import RecipeList from "../Components/RecipeList";
import "../Styles/Landing.css";
import { useFetch } from "../hooks/useFetch";
export default function Landing() {
  const { data, isPending, error } = useFetch("http://localhost:3000/recipes");
  console.log(data, isPending, error);

  return (
    <div className="home">
      {error && <p className="error">{}error</p>}
      {isPending && <p className="pending">Loading...</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  );
}
