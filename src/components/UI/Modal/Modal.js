import React from 'react'
import classes from './Modal.module.css'

const modal = (props) => {
    if(props.bigModal==='true'){
        return(
            <div className={classes.Modal2}
                    style={{
                        
                        transform:props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        
                        opacity: props.show ? '1':'0' 
                    }}

                >
                {props.children}
            </div>
        )
    }
    else{
        return(
            <div className={classes.Modal}
                style={{
                    
                    transform:props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    
                    opacity: props.show ? '1':'0' 
                }}

            >
                {props.children}
            </div>
        )
    }
    
}

export default modal;