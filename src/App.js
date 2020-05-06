import React, {Component} from 'react';
import Layout from "./hoc/Layout/Layout"
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout"
import {Route , Switch,withRouter,Redirect} from "react-router-dom";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import {connect} from "react-redux";
import * as actions from "./store/actions/index"


class App extends Component {
  
  componentDidMount(){
    this.props.onTryAutoSignup()
  }
  render(){
    let routes = (
      <Switch>
      <Route path="/" exact component={BurgerBuilder}/>
     <Route path = {process.env.PUBLIC_URL + '/auth'}  component={Auth}/>
     <Redirect to = {process.env.PUBLIC_URL + '/'}/>
     </Switch>
     )
    if (this.props.isAuthenticated){
      routes = (
        <Switch>
         <Route path={process.env.PUBLIC_URL + '/checkout'} component={Checkout}/>
         <Route path={process.env.PUBLIC_URL + '/orders'}  component={Orders}/> 
         <Route path={process.env.PUBLIC_URL + '/'} exact component={BurgerBuilder}/>
         <Route path = {process.env.PUBLIC_URL + '/logout'}  component={Logout}/>
         <Route path = {process.env.PUBLIC_URL + '/auth'}  component={Auth}/>
         <Redirect to = {process.env.PUBLIC_URL + '/'}/>

         </Switch>
         )
    }
    return ( 
      <div>
        <Layout>
         
         {routes}
         
        </Layout>
      </div>
    )


  }
}
const mapStatetoProps = state => {
  return {
    isAuthenticated :state.auth.token !== null
  }
}
const mapDispachToProps=disaptch =>{
  return {
    onTryAutoSignup:()=>disaptch(actions.authCheckState())
  }
  
}

export default withRouter(connect(mapStatetoProps,mapDispachToProps)(App));
