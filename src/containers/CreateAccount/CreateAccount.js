import React, {Component} from 'react';
import classes from './CreateAccount.module.css';
import CreateAccountData from './CreateAccountData/CreateAccountData'

class CreateAccount extends Component{

    state = {

    }

    render(){
        return (
            <div className={classes.wrapperCreate}>
                <CreateAccountData></CreateAccountData>
            </div>
        )
    }
}
export default CreateAccount