import React, { Component } from 'react';
import Logo from "../../components/Logo/Logo"
import Spinner from '../../components/UI/Spinner/Spinner'
import classes from './Login.module.css';
import LoginData from './LoginData/LoginData'; 
// import {Route} from 'react-router-dom';
import { connect } from 'react-redux'
// import axios from 'axios'


class Login extends Component{

    state = {
        loaded: false,
        language: 'English'
    };


    componentDidMount(){
        setTimeout( ()=>{
            if(localStorage.getItem('WACUser')){
                this.props.onLoadOldState( (localStorage.getItem('WACUser')))    
                // console.log( localStorage.getItem('WACUser'))
                // // this.props.onLoginHandler()
                this.props.history.push('/dash')
            }
            else
            return this.setState({loaded:true })
        
        } , 250);
        const setLang = (event) =>{
            localStorage.setItem('WACL',event.target.textContent)
            this.setState({language:event.target.textContent})
            // this.forceUpdate()
        }
        this.setState({languages:
            [
                <li key='1' onClick={setLang}>English</li>,
                <li key='2'onClick={setLang}>Español</li>,
                <li key='3'onClick={setLang}>Français</li>,
                <li key='4'onClick={setLang}>中文</li>
            ]
        })    
    }

    componentWillMount(){
    }
    
    render(){
        let local = localStorage.getItem('WACL') || 'English'
        
        let loadedElement = <LoginData lang={this.state.language} loginContinue={this.props.history} ></LoginData>
        let loadedLogo = <Logo pad={this.state.paddingTop} ></Logo>

        
        if(!this.state.loaded){
            loadedElement = <Spinner></Spinner>
        }

        return (
            <>
                <ul className={classes.languageList}>
                    {this.state.languages}
                </ul>
                <div className={classes.Wrapper}>  
                    {loadedLogo}
                    {loadedElement}
                </div>

            </>
        )
    }
}

const mapStateToProps = (state) => {
    // console.log(state)
    return {
        ctr: state.logedUser,
        logedUser: state.logedUser,
        logingout: state.logingout,
        LoginData: state.stateForLoginData,
        showfriendRequest:state.showfriendRequest,
        addingContact: state.addingContact,
        userEmail: state.userEmail,
        creatingGroup: state.creatingGroup,
        contactList: state.contactList,
        groupList:state.groupList,
        friendRequests: state.friendRequests,
        activeConver:state.activeConver,
    };
};

const mapDispatchToProps = ( dispatch , ownprops ) => {
    // console.log(ownprops);
    return {
        onLoginHandler: ( value , list , reqList , groupList) => dispatch({ type: 'LOGEDIN' , payload: { user: value, contactList: list , friendRequests: reqList, groupList} }),
        onLoadOldState: (oldState) => dispatch( {type: 'LOADSTATE' , payload: oldState } )
    };
}

export default connect(mapStateToProps , mapDispatchToProps ) (Login);