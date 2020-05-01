import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";


export const addIngredient = name=>{
    return {
        ingredientName:name,
        type:actionTypes.ADD_INGREDIENT
    }
}
export const removeIngredient = name=>{
    return {
        ingredientName:name,
        type:actionTypes.REMOVE_INGREDIENT
    }
}

export const setIngredients = ingredients =>{
    return {
        type:actionTypes.SET_INGREDIENTS,
        ingredients:ingredients
    }
};
export const fetchIngredientsFaild=()=>{
    return {
        type:actionTypes.FETCH_INGREDIENTS_FAILD
    }
}
export const initIngredients = ()=> {
    return dispatch => {
         axios.get("https://react-burger-builder-a235e.firebaseio.com/ingredients.json")
        .then(res=>{
            dispatch(setIngredients(res.data))
        }).catch(error=>{
            dispatch(fetchIngredientsFaild())
        })
    }
}
