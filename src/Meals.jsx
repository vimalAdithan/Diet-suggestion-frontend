import { useState,useContext, useEffect } from "react";
import { Food } from "./Food";
import { Piechart } from "./Pie";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import {apiContext} from "./App.jsx"

export function Meals() {
  const navigate=useNavigate()
  const {url,setUrl}=useContext(apiContext);
  const [foods, setFoods] = useState([]
//     {
//     meals: [
//       {
//         id: 655219,
//         title: "Peanut Butter And Chocolate Oatmeal",
//         imageType: "jpg",
//         readyInMinutes: 45,
//         servings: 1,
//         sourceUrl:
//           "https://spoonacular.com/recipes/peanut-butter-and-chocolate-oatmeal-655219",
//       },
//       {
//         id: 649931,
//         title: "Lentil Salad With Vegetables",
//         imageType: "jpg",
//         readyInMinutes: 45,
//         servings: 4,
//         sourceUrl:
//           "https://spoonacular.com/recipes/lentil-salad-with-vegetables-649931",
//       },
//       {
//         id: 632854,
//         title: "Asian Noodles",
//         imageType: "jpg",
//         readyInMinutes: 45,
//         servings: 4,
//         sourceUrl: "https://spoonacular.com/recipes/asian-noodles-632854",
//       },
//     ],
    
// "nutrients": {
//   "calories": 347.54,
//   "protein": 40.08,
//   "fat": 8.75,
//   "carbohydrates": 27.41
//   }
  
//   }
  );
  const getCard = () => {
    {
      fetch(
        url
        // `https://api.spoonacular.com/mealplanner/generate?apiKey=a13ff03924494e43b63e233c5aa0dedd&timeFrame=day&targetCalories=200&diet=Paleo`
      )
        .then((data) => data.json())
        .then((crd) => setFoods(crd));
    }
  };
  useEffect(() => getCard(), []);
  return (
    <section>
       <nav>
        <ul className="home-nav">
          <li style={{ marginRight: "auto" }}>
            <p>DayDiet</p>
          </li>
          <li>
            <Avatar alt="Travis Howard" src="/_MG_7281.jpg" />
          </li>
          <li>
            <p>user name</p>
          </li>
        </ul>
      </nav>
      <div className="food-list">
        {foods.meals ? (
          foods.meals.map((usr, index) => (
            <Food key={index} user={usr} id={index} />
          ))
        ) : (
          <p>loading</p>
        )}
      </div>
      <div>
      {foods.nutrients ? 
          <Piechart values={foods.nutrients} />:<p></p>}
      </div>
      <div>
        <Button variant="outlined" color="error" onClick={() => navigate("/user")}>
          Back
        </Button>
      </div>
    </section>
  );
}
