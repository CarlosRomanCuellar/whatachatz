import React, {Component} from 'react';
import Input from '../../../components/UI/Input/Input';
import classes from './LoginData.module.css';
import Button from '../../../components/UI/Button/Button'
import axios from 'axios';
import Spinner from '../../../components/UI/Spinner/Spinner'
import { connect } from 'react-redux'
import langStrings from '../../../langStrings'

import langString from'../../../langStrings';
let locale = langString(localStorage.getItem('WACL'))

class LoginData extends Component{
    state = {
        language:locale,
        ...this.props.LoginData,
        loginForm:{
            userName: {
                elementType: 'input',
                elementConfig:{
                    type:'text',
                    placeholder:locale.userName
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            password:  {
                elementType: 'input',
                elementConfig:{
                    type:'password',
                    placeholder:locale.password
                },
                value: '',
                validation: {
                    required: true,
                    minLength:6
                },
                valid: false,
                touched: false
            }
            
        }
    }

    loginHandler = (event) => {
        // console.log(this.props.ctr);

        this.props.updateGlobalState(this.state)

        event.preventDefault();
        this.setState({loading:true});
        const formData = {};

        let formElementIdentifier
        for (formElementIdentifier in this.state.loginForm){
            formData[formElementIdentifier] = this.state.loginForm[formElementIdentifier].value;
        }

        const tryingUser = {
            userName: this.state.loginForm.userName.value,
            password: this.state.loginForm.password.value
        }

        // this.props.tryingUser = tryingUser.userName;
        // console.log(this.props)

        axios.post('/users/login',tryingUser)
        .then(response => {
            // console.log(response)
            this.setState({loading:false})
            try{
                
                this.props.onLoginHandler(this.state.loginForm.userName.value , response.data.user.contactList , response.data.user.friendRequest , response.data.user.groupList);
                
            }
            catch(error){
                console.log(error)
            }
            
            this.loginContinueHandler( );

            // console.log('it work')
            // console.log(this.props.ctr)
            
        }).catch(error => {
            this.setState({loading:false})
            alert(this.state.language.verifyTheCredentials)
            localStorage.removeItem('WACUser')
        });
       
    }

    loginContinueHandler = () => {
        this.props.loginContinue.push('/dash')
    }

    inputChangedHandler = (event , inputIdentifier) => {
        const updatedLoginForm = {
        ...this.state.loginForm
    }

    const updatedLoginElement = {
        ...updatedLoginForm[inputIdentifier]
    }

    updatedLoginElement.value = event.target.value;
    updatedLoginElement.valid = this.checkValidity(updatedLoginElement.value , updatedLoginElement.validation);
    updatedLoginElement.touched = true;
    updatedLoginForm[inputIdentifier] = updatedLoginElement;

    let formIsValid = true;
    for( inputIdentifier in updatedLoginForm){
        formIsValid = updatedLoginForm[inputIdentifier].valid && formIsValid
    }

    this.setState({loginForm: updatedLoginForm , formIsValid: formIsValid})
    // console.log({orderForm:updatedOrderForm})
    }

    checkValidity = (value, rules) => {
        let isValid = true
        if(rules.required){
        isValid = value.trim() !== '' && isValid
        }

        if(rules.minLength){
        isValid = value.length >= rules.minLength && isValid
        }

        if(rules.maxLength){
        isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    componentDidUpdate(){
        if(locale !== localStorage.getItem('WACL')){
            locale = langString(localStorage.getItem('WACL'))
            let form = document.getElementById('LoginForm');
            if(form !== null){
                let tbx1 = form.childNodes[0].childNodes[1]
                let tbx2 = form.childNodes[1].childNodes[1]
                tbx1.placeholder=locale.userName
                tbx2.placeholder=locale.password
            }
        }
        
    }


    render(){
        let locale = langStrings(localStorage.getItem('WACL'))

        // console.log(this.props)
        // langStrings(this.props.language)

        const formElementArray = [];

        let key
        for ( key in this.state.loginForm){
            formElementArray.push({
            id: key,
            config: this.state.loginForm[key]
            });
        }

        let form 
        if(this.state.loading){
            form = <Spinner></Spinner>
        }
        else{
            form = (
                <form onSubmit={this.loginHandler} id='LoginForm'>
                    {formElementArray.map(formElement => (
                        <Input 
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            invalid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}
                            changed={ (event) => this.inputChangedHandler(event , formElement.id)} 
                        ></Input>
                    ))}
                    {/* <Button btnType="Success" disabled={!this.state.formIsValid} >ORDER</Button> */}
                    <a href='/create-account'>{locale.createAccount}</a>
                    <Button btnType='Success' disabled={!this.state.formIsValid}>{locale.login}</Button>
                </form>
            );
        }


        return (
            <div className={classes.ContactData}>
                <h4>{locale.signIn}</h4>
                {form}
            </div>
        );
    };

}


const mapStateToProps = (state) => {
    // console.log(state)
    return {
        ctr: state.logedUser,
        LoginData: state.stateForLoginData,
        language: state.lang
    };
};

const mapDispatchToProps = ( dispatch , ownprops ) => {
    // console.log(ownprops);
    return {
        onLoginHandler: ( value , contactList , friendRequest , groupList ) => dispatch({ type: 'LOGEDIN' , payload: { user: value, contactList , friendRequest , groupList }}),
        updateGlobalState: (newState) => dispatch( { type: 'UPDATELOGINDATA' , payload: { newState : newState } } )
    };
}

export default connect(mapStateToProps , mapDispatchToProps )(LoginData);
