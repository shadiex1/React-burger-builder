import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary"
import {Route,Redirect} from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import {connect} from "react-redux";
class Checkout extends Component{
   

    
     checkoutCancelledHandler=()=>{
        this.props.history.goBack();
    }
    checkoutContinuedHandler=()=>{
        this.props.history.replace(`${process.env.PUBLIC_URL + '/checkout/contact-data'}`);
    }
    render(){
        let summary = <Redirect to={process.env.PUBLIC_URL + '/'}/>
        
        if(this.props.ings){
            const purchasedRedirect= this.props.purchased ?<Redirect to= {process.env.PUBLIC_URL + '/'}/> : null
            summary = (<div>
                {purchasedRedirect}
                <CheckoutSummary
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                 ingredients={this.props.ings}/>
                 <Route path={process.env.PUBLIC_URL + '/checkout/contact-data'} 
                 component={ContactData}/> </div>)
             
        }
        return summary
     
    }
}

const mapStateToProps= state => {
    return {
        ings:state.burgerBuilder.ingredients,
        purchased:state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout)