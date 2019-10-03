import React from 'react';
import classes from './Contact.module.css'
import defaultUser from '../../../assets/images/defaultUser.png'

const contact = (props) => {

    // <div className={classes.activeConver}>
    //     <img  alt='' className={classes.profileImg} src={defaultUser}></img>
    //     <h6>Someone Name</h6>
    // </div>



    return (
        <div {...props} className={classes.notActiveConver}>
            <img  alt='' className={classes.profileImg} src={defaultUser}></img>
            <h6>{props.contactname}</h6>
        </div>
    )
} 

export default contact