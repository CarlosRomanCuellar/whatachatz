import React from 'react';
import whatachat from '../../assets/images/whatachat2.png'
import classes from './Logo.module.css';

const logo = (props) => (
    <div className={classes.Logo} style={{paddingTop:props.pad}} >
        <img src={whatachat} alt="What A Chat"></img>
    </div>
)
 
export default logo;