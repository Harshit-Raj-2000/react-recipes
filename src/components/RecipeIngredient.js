import React from 'react'

export default function RecipeIngredient(props) {
    const { ingredient,
            handleIngredientChange,
            handleIngredientDelete
        } = props

    function handleChange(change){
        handleIngredientChange(ingredient.id, {...ingredient, ...change})
    }
    return (
        <>
           <input className="recipe-edit__input" type="text" onChange={e => handleChange({name : e.target.value})} value={ingredient.name} />
           <input className="recipe-edit__input" type="text" onChange={e => handleChange({amount : e.target.value})} value={ingredient.amount} />
            <button 
                className="btn btn--danger" 
                onClick={() => handleIngredientDelete(ingredient.id)}>&times;</button>
        </>
    )
}

