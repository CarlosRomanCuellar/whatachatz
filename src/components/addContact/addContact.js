import React, { Component } from 'react';
import Button from '../UI/Button/Button'
// import classes from './addContact.module.css'
import Input from '../UI/Input/Input'
import { connect } from 'react-redux'
import axios from 'axios';
import langString from'../../langStrings';


class AddContact extends Component{
    
    state = {
        lang:this.props.lang,
        locale:langString(localStorage.getItem('WACL')),
        value:'',
        validation:{
            required: true,
        },
        touched:false,
        target:''
    }
    componentWillReceiveProps(newProps){
        const oldProps = this.props
        if(oldProps.lang !== newProps.lang){
            this.setState({
                locale:langString(localStorage.getItem('WACL')),
            })
        }
    }
    

    render(){
        const canceladdContactHandler = () => {
            
            const aux = this.state.target
            try{
                aux.value = ''
            }
            catch(e){

            }
            this.props.onAddContactHandler(false)
            this.setState({value:'' , touched:false, target: aux})

        }
    
       
    
        const continueAddContact = () => {
            if ( checkValidity(this.state.value , this.state.validation) ){
                //send to backend ---------------------------------------------------------------------------------------
                const objToSend = { userName: this.props.logedUser, contactToAdd: this.state.value }
                // console.log(objToSend)
                
                axios.post('/addContact/', objToSend )
                .then(response => {
                    alert(this.state.locale.friendRequestSent)
                    canceladdContactHandler()
                    /*
                        SEND SOMETHING TO THE SOCKET SO THE OTHER USER GET NOTIFY
                    */
                    
                }).catch(error => {
                    console.log(error.response.data.error)
                    alert(error.response.data.error)
                });
    
                //-------------------------------------------------------------------------------------------------------
            }
            else{
                alert(this.state.locale.pleaseEnterAValidEmail)
            }
            
        }
    
        const checkValidity = (value, rules) => {
            let isValid = true
            if(rules.required){
                isValid = value.trim() !== '' && isValid
            }
            var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    
            if (reg.test(value) === false) 
            {
                return false;
            }
    
            return isValid;
        }
    
        const txtboxAddChanged = (event) => {
            // console.log(event.target.value);
            this.setState({value:event.target.value , touched:true , target: event.target})
        }

        return (
            <div>
                <h4 style={{margin: '10px auto'}} >{this.state.locale.addContact}</h4>
                <Input 
                    changed={txtboxAddChanged}
                    elementConfig={ {
                        email:{
                            elementType: 'input',
                            elementConfig:{
                                type:'email',
                                placeholder: 'your@email.com'
                            },
                            value:this.state.value,
                            validation:{
                                required: true,
                            },
                            touched:false
                        }
                }} inLineStyle = {{margin:'10px auto'}} placeholder={this.state.locale.emailOfNewContact} elementType="input"></Input>
                <Button btnType='Success' clicked={continueAddContact} >{this.state.locale.addContact}</Button>
                <Button btnType='Cancel' clicked={canceladdContactHandler}>{this.state.locale.cancel}</Button>
            </div>
        )
    }

}

    
const mapStateToProps = (state) => {
    return {
        lang:state.lang,
        addingContact: state.addingContact,
        contactList: state.contactList
    };
};

const mapDispatchToProps = ( dispatch , ownprops ) => {
    return {
        onAddContactHandler: ( flag ) => dispatch( {type: 'SHOW-ADDCONTACT-MODAL', payload:{flag: flag} }),
        updateContactListHandler: (value) => dispatch ( { type: 'UPDATE-CONTACTS' , payload: {value} } )
    };
}
export default connect( mapStateToProps , mapDispatchToProps )  (AddContact);