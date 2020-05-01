import React from "react";
import Logo from "../../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems"
import classes from "./SideDrawer.module.css";
import Backdrop from "../../../UI/Backdrop/Backdrop"
const sidedrawer= props=> {
    let attachdClasses=[classes.SideDrawer,classes.Close];
    if(props.open){
        attachdClasses=[classes.SideDrawer,classes.Open];
    }
    
    return (
            <React.Fragment>
        <Backdrop show={props.open} clicked={props.closed}/>
<div className={attachdClasses.join(" ")} onClick={props.closed}>
     <Logo height="11%"/>
            <nav>
                <NavigationItems isAuthenticated={props.isAuth}/>
            </nav>
</div>
</React.Fragment>
    )
}

export default sidedrawer