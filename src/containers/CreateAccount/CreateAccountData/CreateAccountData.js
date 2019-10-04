import React, {Component} from 'react';
import Input from '../../../components/UI/Input/Input';
import classes from './CreateAccountData.module.css';
import Button from '../../../components/UI/Button/Button'
// import axios from '../../../axios-orders';
import axios from 'axios';
import Spinner from '../../../components/UI/Spinner/Spinner'
import langString from '../../../langStrings'
import socketIOClient from 'socket.io-client';


class CreateAccountData extends Component{
    state = {
        locale: langString(localStorage.getItem('WACL')),
        createForm: {
            userName: {
                elementType: 'input',
                elementConfig:{
                    type:'text',
                    placeholder: langString(localStorage.getItem('WACL')).userName
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
                    placeholder:langString(localStorage.getItem('WACL')).password
                },
                value: '',
                validation: {
                    required: true,
                    minLength:7
                },
                valid: false,
                touched: false
            },
            email:{
                elementType: 'input',
                elementConfig:{
                    type:'email',
                    placeholder: langString(localStorage.getItem('WACL')).email
                },
                value:'',
                validation:{
                    required: true,
                },
                touched:false
            }
        },
        formIsValid: false,
        loading: false
    } 

    createHandler = (event) => {
        event.preventDefault();
        this.setState({loading:true});
        const formData = {};

        let formElementIdentifier
        for (formElementIdentifier in this.state.loginForm){
            formData[formElementIdentifier] = this.state.loginForm[formElementIdentifier].value;
        }

        const newUser = {
            userName:this.state.createForm.userName.value,
            password: this.state.createForm.password.value,
            email: this.state.createForm.email.value
        }

        // axios.post('/', {}).then( res => {
        //     console.log('working connection')
        // }).catch( error => console.log('Error connection not working'));
        
        // fetch('/', {
        //     method:'POST'
        // }).then( res => {
        //     console.log(res)
        // })
        

        axios.post('/auth/create', newUser )
        .then(response => {
            // axios.post('/auth/create' , newUser)
            this.setState({loading:false}) 
            alert(this.state.locale.theAccountHasBeenCreated)
        }).catch(error => {
            this.setState({loading:false})
            console.log('ERROR code: ' + error.response.status)
            if(error.response.status === 400){
                alert(this.state.locale.emailAlready)
            }
            else{
                alert(this.state.locale.somethingWentWrong)
            }
        });
    }

    makePostRequest = async function () {

        const myApi = axios.create({
            timeout: 10000,
            withCredentials: true,
            transformRequest: [(data) => JSON.stringify(data.data)],
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            }
        });

        const test = { userName: 'test', password: '1234567' , email: 'c.roman.5458@gmail.com' }
        let response = await myApi.post('http://localhost:3006/create-user', test);

        console.log(response.data);
    }

    inputChangedHandler = (event , inputIdentifier) => {
        const updatedcreateForm = {
            ...this.state.createForm
        }

        const updatedCreateElement = {
            ...updatedcreateForm[inputIdentifier]
        }

        updatedCreateElement.value = event.target.value;
        updatedCreateElement.valid = this.checkValidity(updatedCreateElement.value , updatedCreateElement.validation);
        updatedCreateElement.touched = true;
        updatedcreateForm[inputIdentifier] = updatedCreateElement;

        let formIsValid = true;
        
        for( inputIdentifier in updatedcreateForm){
            formIsValid = updatedcreateForm[inputIdentifier].valid && formIsValid
        }

        this.setState({createForm: updatedcreateForm , formIsValid: formIsValid})
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

    

    render(){

        const formElementArray = [];
        let key
        for (key in this.state.createForm){
            formElementArray.push({
                id: key,
                config: this.state.createForm[key]
            });
        }

        let form

        if(this.state.loading){
            form = <Spinner></Spinner>
        }
        else {
            form = (
                <form onSubmit={this.createHandler}>
                    {formElementArray.map(formElement => ( 
                            
                            <Input 
                                key={formElement.id}
                                name={formElement.id}
                                elementType={formElement.config.elementType}
                                elementConfig={formElement.config.elementConfig}
                                value={formElement.config.value}
                                invalid={!formElement.config.valid}
                                shouldValidate={formElement.config.validation}
                                touched={formElement.config.touched}
                                changed={ (event) => this.inputChangedHandler(event , formElement.id)}
                            ></Input>
                        
                    ))}
                    <div className={classes.controlsData}>
                        <Button  btnType='Success' disabled={!this.state.formIsValid}>{this.state.locale.createAccount}</Button>
                        <a href='/' >{this.state.locale.back}</a>
                    </div>
                </form>
            )
        }
        
        return(
            <div className={classes.wrapperCreateForm}>
                <h2>{this.state.locale.createAccount}</h2>
                {form}
            </div>
        )

    }

}

export default CreateAccountData