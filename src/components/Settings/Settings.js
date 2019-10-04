import React, { Component } from 'react';
import Button from '../UI/Button/Button'
import classes from './Settings.module.css'
import { connect } from 'react-redux'
import langString from'../../langStrings';



const settings = (props) => {
    let locale = langString(localStorage.getItem('WACL'))

    let langOtions = ['English','Español', 'Français', '中文'];

    const cancelLogout = () => {
        props.onLogoutHandler(false);
    }
    const continueLogOut=()=>{
        props.socket.emit('LOGOUT')
        localStorage.removeItem('WACUser');
        props.path.push('/login')
    }

    const changeLanguage = (event) => {
        // console.log(event.target.value)
        props.changeLanguageHandler(event.target.value)
        localStorage.setItem('WACL', event.target.value)
        
    }

    return(
        <div className={classes.Settings}>
            <h3>{locale.settings}</h3>
            <label htmlFor='languageSelect'>{locale.language}:</label>
            <select name="languageSelect" onChange={changeLanguage} >
                {
                    langOtions.map( option => (
                        <option key={option} value={option} selected={localStorage.getItem('WACL') === option}>
                        {option}
                    </option>
                    ))
                }
                    
            </select>
            <div>
                <Button btnType='Success' clicked={continueLogOut}>{locale.logout}</Button>
                <Button btnType='Cancel' clicked={cancelLogout}>{locale.cancel}</Button>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        language: state.lang
    };
};

const mapDispatchToProps = ( dispatch , ownprops ) => {
    return {
        onLogoutHandler: ( flag ) => dispatch( {type: 'SHOWLOGOUTMODAL', payload:{flag: flag} }),
        changeLanguageHandler: ( value ) => dispatch( { type: 'CHANGELANGUAGE' , payload: value } )

    };
}

export default connect(mapStateToProps , mapDispatchToProps ) (settings);