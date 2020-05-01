import * as actionTypes from "../actions/actionTypes";
import {updateObject}  from "../../shared/utlities"


const initState = {
    orders:[],
    loading:false,
    purchased:false
}
const reducer = (state=initState,action)=>{
    switch (action.type){
         case actionTypes.PURCHASE_INIT : 
          return updateObject(state,{purchased:false})
        case actionTypes.PURCHASE_BURGER_SUCCES : 
        const newOrder = updateObject(action.orderDate,{id:action.orderId})
             return updateObject(state,{
                 loading:false,
                 purchased:true,
                 orders:state.orders.concat(newOrder)
             })
        case actionTypes.PURCHASE_BURGER_FAIL :
            return updateObject(state,{loading:false})
        case actionTypes.PURCHASE_BURGER_START :
           return updateObject(state,{loading:true})
        case actionTypes.FETCH_ORDERS_START:
             return updateObject(state,{loading:true})

        case actionTypes.FETCH_ORDERS_SUCCESS:
            return updateObject(state,{
                orders:action.orders,
                loading:false
            })
        case actionTypes.FETCH_ORDERS_FAIL:
            return updateObject(state,{
                loading:false
            })
        default: 
            return state;
    }

};

export default reducer