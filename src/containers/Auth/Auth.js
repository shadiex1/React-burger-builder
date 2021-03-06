import React, { Component} from "react";
 import Input from "../../components/UI/Input/Input";
 import Button from "../../components/UI/Button/Button";
 import classes from "./Auth.module.css";
 import * as actions from "../../store/actions/index";
 import Spinner from "../../components/UI/Spinner/Spinner"
 import {connect} from "react-redux";
 import {Redirect} from "react-router-dom";
 import {updateObject,checkValidity } from "../../shared/utlities"

class Auth extends Component {
    state={
        controls:{
            email:{
                elementType:"input",
                elementConfig:{
                    type:"email",
                    placeholder:"Mail Address"
                },value:"",
                validation:{
                    required:true,
                    isEmail:true
                },valid:false,
                touched:false
    
            },
            password:{
                elementType:"input",
                elementConfig:{
                    type:"password",
                    placeholder:"Password"
                },value:"",
                validation:{
                    required:true,
                    minLength:6
                },valid:false,
                touched:false
    
            }
        },
        isSignup:true
    }

    componentDidMount(){
        if(!this.props.buildingBurger && this.props.authRedirectPath !== `${process.env.PUBLIC_URL + '/'}` ){
            this.props.onSetAuthRedirectPath();
        }
    }

    switchAuthModeHandler=()=>{
        this.setState(prevState => {
            return {isSignup:!prevState.isSignup}
        });
    }
    

    inputChangedhandler=(e,controlName)=>{
        const updatedControls=updateObject(this.state.controls,{
            [controlName]:updateObject(this.state.controls[controlName],{
                value:e.target.value,
                valid:checkValidity(e.target.value,this.state.controls[controlName].validation),
                touched:true
            })
               
        });
        this.setState({controls:updatedControls})
    }

    
    submitHandler = e =>{
        e.preventDefault();
        this.props.onAuth(this.state.controls.email.value ,  
             this.state.controls.password.value,this.state.isSignup) 
        
    }
    render (){
        const formElementsArray=[];
    for (let key in this.state.controls){
        formElementsArray.push({
            id:key,
            config:this.state.controls[key]
        })
    } 
    let form =formElementsArray.map(formElement => (
        <Input key={formElement.id} 
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
         changed={(e)=>this.inputChangedhandler(e,formElement.id)}/>
    ))
        if (this.props.loading){  
            form=<Spinner/>
        }

        let errorMessage=null
    

        if (this.props.error){
            errorMessage=(<p>{this.props.error.message}</p>)
        }
        let authRedirect=null
        if(this.props.isAuthenticated){   
            authRedirect = <Redirect to={this.props.authRedirectPath}/>
        }
        return (     
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success"> SUBMIT</Button>
                </form>
                <Button 
                clicked={this.switchAuthModeHandler}
                btnType="Danger"> {this.state.isSignup ? "SIGNIN" : "SIGNUP"} </Button>
            </div>
        )
    }
}
const mapStatetoProps =state=>{
    return {
        loading:state.auth.loading,
        error:state.auth.error,
        isAuthenticated:state.auth.token !== null,
        buildingBurger:state.burgerBuilder.building,
        authRedirectPath:state.auth.authRedirectPath
    }
}
const mapDispatchToProps =dispatch =>{
    return {
        onAuth:(email,password,isSignup)=>dispatch(actions.auth(email,password,isSignup)),
        onSetAuthRedirectPath:()=>dispatch(actions.setAuthRedirectPath(`${process.env.PUBLIC_URL + '/'}`))
    }
}
export default connect(mapStatetoProps,mapDispatchToProps)(Auth)



