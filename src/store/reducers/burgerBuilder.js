import * as actionTypes from "../actions/actionTypes";
import {updateObject} from "../../shared/utlities"
const initState={
    ingredients:null,
    totalPrice:4,
    error:false,
    building:false
};

const INGREDINET_PRICES = {
    salad:3,
    cheese:2,
    meat:25,
    bacon:5
}

const reducer=(state=initState,action)=>{
switch (action.type){
    case actionTypes.ADD_INGREDIENT :
        const updatedIngredient= { [action.ingredientName]:state.ingredients[action.ingredientName] + 1}
        const updatedIngredients=updateObject(state.ingredients,updatedIngredient)
        const updatedState={
            ingredients:updatedIngredients,
            totalPrice:state.totalPrice + INGREDINET_PRICES[action.ingredientName],
            building:true
        }
        return updateObject(state,updatedState)
            
     case actionTypes.REMOVE_INGREDIENT:
        const updatedIng= { [action.ingredientName]:state.ingredients[action.ingredientName] - 1}
        const updatedIngs=updateObject(state.ingredients,updatedIng)
        const updatedSt={
            ingredients:updatedIngs,
            totalPrice:state.totalPrice + INGREDINET_PRICES[action.ingredientName],
            building:true
        }
        return updateObject(state,updatedSt)
         case actionTypes.SET_INGREDIENTS :
             return updateObject(state,{
                 ingredients:{
                     salad:action.ingredients.salad,
                     bacon:action.ingredients.bacon,
                     cheese:action.ingredients.cheese,
                     meat:action.ingredients.meat
                 },
                 totalPrice:4,
                 error:false
                 ,building:true
             });
             
                 
        case actionTypes.FETCH_INGREDIENTS_FAILD : 
        return updateObject(state,{
            error:true
        })
        
         default : return state
}
}

export default reducer