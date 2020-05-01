import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl"

const controls = [
    {label:"Salad",type:"salad"},
    {label:"Bacon",type:"bacon"},
    {label:"Cheese",type:"cheese"},
    {label:"Meat",type:"meat"},
]
const BuildControls = props => (
    <div className={classes.BuildControls}>
        <p>current Price:<strong>{props.price.toFixed(2)}</strong></p>
         {controls.map(ctrl=>(
             <BuildControl removed={()=> props.ingredientRemove(ctrl.type)} added = {()=> props.ingredientAdded(ctrl.type)}
                key={ctrl.label} label={ctrl.label}
                disabled={props.disabled[ctrl.type]}/>
         ))}
         <button 
         disabled={!props.purchaseable} className={classes.OrderButton}
         onClick={props.ordered}>{props.isAuth ? "ORDER NOW" : "SIGN UP TO ORDER"}</button>
    </div>
);


export default BuildControls