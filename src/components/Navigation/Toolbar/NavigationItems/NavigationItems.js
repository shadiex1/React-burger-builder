import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NaviagtionItem/NaviagtionItem"

const naviagtionItems = (props)=>(
    <ul className={classes.NavigationItems}>
        <NavigationItem exact link={process.env.PUBLIC_URL + '/'} >Burger Builder</NavigationItem>
        {props.isAuthenticated ? <NavigationItem link={process.env.PUBLIC_URL + '/orders'}>Orders</NavigationItem> : null}
        {!props.isAuthenticated 
        ? <NavigationItem link={process.env.PUBLIC_URL + '/auth'}>Authenticate</NavigationItem>:<NavigationItem link={process.env.PUBLIC_URL + '/logout'}>Logout</NavigationItem>}
    </ul>
)

export default naviagtionItems