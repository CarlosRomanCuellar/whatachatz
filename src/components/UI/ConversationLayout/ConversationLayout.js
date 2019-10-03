import React, { Component } from 'react';
import classes from './ConversationLayout.module.css'
import imgIcon from '../../../assets/images/imgIcon.png'
import Button from '../Button/Button'
// import socketIOClient from 'socket.io-client';
import { connect } from 'react-redux'
import langString from'../../../langStrings';
import socketIOClient from 'socket.io-client';

class ConversationLayout extends Component{

    state = {
        loading:true,
        lang:this.props.lang,
        locale:langString(this.props.language),
        activeRoom:this.props.activeConver
    }

    componentWillReceiveProps(newProps){
        // this.props.socket.emit('getLast50' , this.props.activeConver);
        // this.props.socket.emit('getLast50' , this.state.activeRoom);
        const oldProps = this.props
        if(oldProps.lang !== newProps.lang){
            this.setState({
                locale:langString(localStorage.getItem('WACL')),
            })
        }
        if(oldProps.activeConver !== newProps.activeConver){
            
            
            console.log('recibio nuevas props')
            this.setState({activeRoom: newProps.activeConver})
            // this.props.activeConver = newProps.activeConver
            // console.log(this.props)
        }
            
    }

    componentWillMount(){
        // console.log(this.props)
        // console.log(this.props.activeConver)
        // console.log(this.props.activeConver)
        // if(this.props.activeConver === null)
        // {
        //     this.setState({activeRoom:})
        // }
    }

    componentDidMount(){

        
        let fragment = document.createDocumentFragment();
        const window = document.getElementById('converWrapper')
        // console.log(this.props.activeConver)
        console.log(this.state.activeRoom)
        
        this.props.socket.on('messageToDisplay' , (message) => {
            console.log(message)
            //create the div and also in the server side save the message
            if(message.conversation === this.state.activeRoom ){
                
                const div = document.createElement('div');
                const div2 = document.createElement('div');
                const owner = document.createElement('h5')
                const p = document.createElement('p');
                
                owner.className=classes.owner
                owner.textContent=message.owner
                owner.style.textAlign='left'
                if(this.state.activeRoom.length < 45){
                    owner.style.display = 'block'
                }
                
                p.textContent = message.value
                div2.appendChild(owner)
                div2.appendChild(p);
                div.appendChild(div2)
                if(message.owner == this.props.logedUser){
                    owner.style.textAlign='right'
                    div.className=classes.myMessage
                }
                else{
                    
                    div.className=classes.othersMessage
                }
                fragment.appendChild(div)
                // console.log()
                window.appendChild(fragment)
            }
            
           else{
            console.log(message)
           }
            
            window.scrollTop = window.scrollHeight;
            
            // else{
            //     window.scrollTop = window.offsetHeight+50;
            // }
        })
        
    }

    render(){

        const sendNewMessage = (event) => {
            const parent = event.target.closest("div")
            const input = parent.childNodes[0]
            // console.log(input.value)
            this.props.socket.emit('newMessage', { value: input.value , converID: this.state.activeRoom , owner: this.props.logedUser} )
            input.value = '';
        }

        return (
            
            <div className={classes.wrapper}>
    
                <div id='converWrapper' className={classes.converwrapp}>
    
                    
                </div>
    
                <div className={classes.messageForm}  >
                    <input type='text' placeholder={this.state.locale.writeAMessage}></input>
                    {/* <Input type="text" placeholder="write a mmesage"></Input> */}
                    <img alt='' src={imgIcon}></img>
                    <Button btnType='Success' clicked={sendNewMessage}>{this.state.locale.send}</Button>
                </div>
                {/* <p style={{color:'aqua', display:'block'}}>{this.state.activeRoom}</p> */}
            </div>
        )
    }
} 

const mapStateToProps = (state) => {
    // console.log(state)
    return {
        lang:state.lang,
        logedUser: state.logedUser,
        activeConver: state.activeConver
    };
};

const mapDispatchToProps = ( dispatch , ownprops ) => {
    // console.log(ownprops);
    return {
        updateGlobalState: (newState) => dispatch( { type: 'UPDATELOGINDATA' , payload: { newState : newState } } )
    };
}

export default connect(mapStateToProps , mapDispatchToProps ) (ConversationLayout);