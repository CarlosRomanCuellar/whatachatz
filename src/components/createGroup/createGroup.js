import React, { Component } from 'react';
import Button from '../UI/Button/Button'
import classes from './createGroup.module.css'
import Input from '../UI/Input/Input'
import { connect } from 'react-redux'
import Contact from '../UI/Contact/Contact'
import socketIOClient from 'socket.io-client';
// import classes from '*.module.css';
import langString from'../../langStrings';

class CreateGroup extends Component{

    state = {
        locale:langString(localStorage.getItem('WACL')),
        ...this.props,
        groupName:'',
        contactsArray: [],
        socket: this.props.socket
    }


    componentWillReceiveProps(newProps){
        const oldProps = this.props
        if(oldProps.lang !== newProps.lang){
            this.setState({
                locale:langString(localStorage.getItem('WACL')),
            })
        }
    }

    componentWillMount(){ 
        for(let contact of this.props.contactList){
            this.state.socket.emit("getUser",contact.contactID);
        }

        const selectParticipant = (event) => {
            const contact = event.target.closest('div');
            contact.style.backgroundColor='red'
            // console.log(contact)
            // console.log(contact.style)
        }


        this.state.socket.on('contactForGroupCreate', (user) => {
            let auxArray = this.state.contactsArray;
            auxArray.push(
                <Contact key={user.id} contactname={user.userName} contactimg={user.profilePic} style={{width:'250px'}} onClick={selectParticipant}></Contact>
            )
            this.setState({contactsArray:auxArray})
            
        })

        this.state.socket.on('updateGroups' , (data) => {
            if(this.props.groupList != undefined){
                let newGroupList = this.props.groupList
                newGroupList.push(data)
                this.props.onUpdateGroupList(newGroupList)
            }
            else{
                let newGroupList = []
                newGroupList.push(data)
                this.props.onUpdateGroupList(newGroupList)
            }
        })
        // socket.disconnect();
    }
    
    render(){ 
        const cancelCreateGroup = () => {
            this.props.onCreateGroupHandler(false);
            let contactsToGroup = document.querySelector('#contactsToGroupList')
            for(let contact of contactsToGroup.childNodes){
                if(contact.style.backgroundColor === 'red')
                    contact.style.backgroundColor = ''
            }

        }
        const continueCreateGroup = () => {
            let personsINtheGroup = [this.props.logedUser]
            let contactsToGroup = document.querySelector('#contactsToGroupList')
            for(let contact of contactsToGroup.childNodes){
                if(contact.style.backgroundColor === 'red')
                    personsINtheGroup.push (contact.childNodes[1].textContent)
            }
            this.state.socket.emit('CREATEGROUP', {groupName: this.state.groupName ,  listOfParticipants: personsINtheGroup})
            cancelCreateGroup();
            this.setState({groupName:''})
            let aux = document.getElementById('groupNameInput')
            aux.value=''
            
        }
        
        const groupNameChange = (event) => {
            this.setState({groupName:event.target.value})
        }

        // console.log(this.props.contactList)
        return(
            <div>
                <h4 style={{margin: '10px auto'}} >{this.state.locale.createGroup}</h4>
                <Input 
                    elementConfig={ {
                        name:{
                            elementType: 'input',
                            elementConfig:{
                                type:'text',
                                placeholder: 'Group Name'
                            },
                            value:this.state.groupName,
                            validation:{
                                required: true,
                            },
                            touched:false
                        }
                }} inLineStyle = {{margin:'10px auto'}} placeholder={this.state.locale.groupName} elementType="input" id='groupNameInput' changed={groupNameChange}></Input>
                <div id='contactsToGroupList' className={classes.contactsToGroup}>
                    {/* <Contact contactname='example' contactimg='' style={{width:'250px'}} onClick={selectParticipant}></Contact> */}
                    {this.state.contactsArray}
                </div>
                <Button btnType='Success' clicked={continueCreateGroup} >{this.state.locale.createGroup}</Button>
                <Button btnType='Cancel' clicked={cancelCreateGroup}>{this.state.locale.cancel}</Button>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    // console.log(state)
    return {
        lang:state.lang,
        logedUser:state.logedUser,
        creatingGroup: state.creatingGroup,
        contactList: state.contactList,
        groupList: state.groupList
    };
};

const mapDispatchToProps = ( dispatch , ownprops ) => {
    return {
        onCreateGroupHandler: ( flag ) => dispatch( {type: 'SHOW-CREATEGROUP' , payload: {flag: flag} } ),
        onUpdateGroupList: (array) => dispatch({ type: 'UPDATEGROUPLIST' , payload: array })
    };
}

export default  connect(mapStateToProps , mapDispatchToProps )  (CreateGroup);
