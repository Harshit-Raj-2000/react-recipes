import React, {useState, useEffect} from 'react'
import RecipeList from './RecipeList';
import RecipeEdit from './RecipeEdit';
import '../css/app.css'
import {v4 as uuidv4} from 'uuid'

export const RecipeContext = React.createContext()
const LOCAL_STORAGE_KEY = 'cookingWithReact.recipes'

function App() {

  const [recipes, setRecipes] = useState(sampleRecipes)
  const [selectedRecipeID, setSelectedRecipeID] = useState()
  const selectedRecipe = recipes.find(recipe => recipe.id === selectedRecipeID)


  useEffect(() =>{
    const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (recipeJSON != null) setRecipes(JSON.parse(recipeJSON))
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes))
  }, [recipes])

  const recipeContextValue = {
    handleRecipeAdd,
    handleRecipeDelete,
    handleRecipeSelect,
    handleRecipeChange
  }

  function handleRecipeSelect(id){
    setSelectedRecipeID(id)
  }

  function handleRecipeAdd() {
    const newRecipe = {
      id: uuidv4(),
      name: '',
      servings: 1,
      cookTime: '',
      instructions: '',
      ingredients: [
        {
          id: uuidv4(),
          name: '',
          amount: ''
        },
      ]
    }
    
    setSelectedRecipeID(newRecipe.id)
    setRecipes([...recipes, newRecipe])
  }

  function handleRecipeChange(id, recipe){
    const newRecipes = [...recipes]
    const index = newRecipes.findIndex(r =>  r.id === id)
    newRecipes[index] = recipe
    setRecipes(newRecipes)
  }

  function handleRecipeDelete(id){
    if (selectedRecipeID !== null && selectedRecipeID === id){
      setSelectedRecipeID(undefined)
    }
    setRecipes(recipes.filter(recipe => recipe.id !== id))
  }



  return (
    <RecipeContext.Provider value={recipeContextValue} >
        <RecipeList recipes={recipes}/>
        {selectedRecipe && <RecipeEdit recipe={selectedRecipe} /> }
    </RecipeContext.Provider>
  )

} 




const sampleRecipes = [
  {
    id: 1,
    name: 'Plain Chick-Peas',
    servings: 3,
    cookTime: '1:45',
    instructions: "1. Put salt on chick-peas\n2. Put chick-peas in oven\n3. Eat chick-peas",
    ingredients: [
      {
        id: 1,
        name: 'Chick-peas',
        amount: '2 Kgs'
      },
      {
        id: 2,
        name: 'Salt',
        amount: '1 Tbs'
      }
    ]
  },
  {
    id: 2,
    name: 'Plain Paneer',
    servings: 5,
    cookTime: '5:45',
    instructions: "1. Put paprika on Paneer\n2. Put Paneer in Oven\n3. Eat Paneer",
    ingredients: [
      {
        id: 1,
        name: 'Paneer',
        amount: '3 Kgs'
      },
      {
        id: 2,
        name: 'Paprika',
        amount: '2 Tbs'
      }
    ]
  }
]

export default App;
