import React, {Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import Contact from '../../components/UI/Contact/Contact'
import classes from './RequestForm.module.css'
import imgcross from '../../assets/images/cross.png'
import imgcheck from '../../assets/images/check.png'


class RequestsForm extends Component{

    state = {
        ...this.props,
        requestArray:null
    }

    

    componentDidMount(){

        const confirmAddContact = (event)=>{
            /*
                axios call, send logedUser and contact name and id to update each other contact lists
                also in the same method create a ROOM that is the conversation, 
                 //RECIVE THE NEW CONTACT ARRAY AND UPDATE THE ONE WE HAVE IN GLOBAL STATE AND RERENDER
            */
           const parent = event.target.closest('div');
           const contact = parent.childNodes[0]
           const whosendRequest = (contact.childNodes[1].textContent)

           const objToSend = {
                user: this.state.ctr,
                whosendRequest:whosendRequest
            }

            axios.post('/acceptFriendRequest',objToSend).then( response => {
                console.log(response)
                parent.style.display = 'none'
                this.props.onUpdateFriends(response.data)
            }).catch(err => console.log(err))
        }
    
        const declineRequest = (event)=>{
            
            const parent = event.target.closest('div');
            const contact = parent.childNodes[0]
            const whosendRequest = (contact.childNodes[1].textContent)

            // console.log(parent.children)
            const objToSend = {
                user: this.state.ctr,
                whosendRequest:whosendRequest
            }
            
            axios.post('/declineFriendRequest',objToSend).then( response => {
                // console.log(response.data)
                parent.style.display = 'none'
                this.setState({reqList:response.data});
                this.props.onUpdateFriendRequest(response.data)
            }).catch(error => console.log(error))
           
            
        }

        let newRequestArray = []
        // console.log(this.props.reqList)
        this.state.reqList.map((x)=>{
            const objToSend = { userID: x }
            axios.post('/getUser',objToSend).then( response => {
                newRequestArray.push( 
                    <div className={classes.request} key={x}>
                        <Contact key={x} contactname={ response.data.userName } contactimg=''/>
                        <img className={classes.iconRequest} alt='add' src={imgcheck} onClick={confirmAddContact}></img>
                        <img className={classes.iconRequest} alt='decline' src={imgcross} onClick={declineRequest}></img>
                    </div>
                )
                return new Promise( (resolve) => {
                    resolve(newRequestArray)
                });
            }).then(
                response=>this.setState({requestArray: response})
            ).catch(error => {
                console.log(error)
            })
        })
    }

    render(){

        let requestToShow = <p>you have no friend requests</p>

        if(this.state.requestArray !== null){
            requestToShow = this.state.requestArray
        }

        return (
            <div>
                {requestToShow}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ctr: state.logedUser,
        reqList: state.friendRequests
    };
};

const mapDispatchToProps = ( dispatch , ownprops ) => {
    return {
        // onLoginHandler: ( value ) => dispatch({ type: 'LOGEDIN' , payload: { user: value} }),
        // updateGlobalState: (newState) => dispatch( { type: 'UPDATELOGINDATA' , payload: { newState : newState } } )
        onLogoutHandler: ( flag ) => dispatch( {type: 'SHOWLOGOUTMODAL', payload:{flag: flag} }),
        onShowFriendRequest: (flag)=>dispatch({type: 'SHOWFRIENDREQMODAL', payload:{flag:flag}}),
        onUpdateFriendRequest: (newArray) => dispatch( {type: 'UPDATEFRIENDREQUEST' , payload: { newArray } }),
        onUpdateFriends:  (newArrays) => dispatch ( { type: 'UPDATEFRIENDS' , payload: { newArrays } } )
    };
}

export default connect(mapStateToProps , mapDispatchToProps ) (RequestsForm)