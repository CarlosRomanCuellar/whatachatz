import React, {Component} from 'react';
import classes from './Sidebar.module.css';
// import defaultUser from '../../../assets/images/defaultUser.png'
import addContact from '../../../assets/images/Add_Friend.png'
import userDelete from '../../../assets/images/user_delete.png'
import groupIcon from '../../../assets/images/group-icon-chat(2).png'
import Modal from '../Modal/Modal';
import AddContact from '../../addContact/addContact'
import CreateGroup from '../../createGroup/createGroup'
import Contact from '../Contact/Contact'
import { connect } from 'react-redux'
import axios from 'axios';
import langString from'../../../langStrings';


class sidebar extends Component{

    state = {
        ...this.props,
        locale:langString(this.props.language),
        contactList:this.props.contactList,
        contactsArray: null,
        groupList: this.props.groupList,
        groupArray: null
    }

    componentWillReceiveProps(newProps){
        const oldProps = this.props
        if(oldProps.lang !== newProps.lang){
            this.setState({
                locale:langString(localStorage.getItem('WACL')),
            })
        }
        
    }

    componentDidMount(){
        this.props.socket.on('foundGroupConversation' , (data) => {
            this.props.onChangeActiveConver(data.id)
            console.log(data.id)
            //if(!this.props.activeConversation)
            this.props.socket.emit('getLast50' , data.id);
             
        })

        this.props.socket.on('foundConversation' , (data) => {
            this.props.onChangeActiveConver(data.converID)
            this.props.socket.emit('getLast50' , data.converID);

        })

        const selectGroupConversation = (event) => {
            if(event.target.id!=="divGroups"){

                const groupConvers = document.getElementById('divGroups')
                for(let group of groupConvers.childNodes){
                    if(group.style.backgroundColor === 'red'){
                        group.style.backgroundColor = '#0e0e0e'
                    }
                }
    
                event.target.style.backgroundColor='red';
                let converlayout = document.getElementById('converWrapper')
                while(converlayout.childNodes.length > 0){
                    let lastElem = converlayout.childNodes[converlayout.childNodes.length-1]
                    converlayout.removeChild( lastElem )
                }
    
                const convers = document.getElementById('divContacts')
                for(let conver of convers.childNodes){
                    if(conver.style.backgroundColor === 'red'){
                        conver.style.backgroundColor = '#0e0e0e'
                    }
                }
                this.props.socket.emit('getThisGroupConversation', { me:this.props.logedUser , groupName: event.target.textContent } )
            }
            
        }

        
        let newArray = []
        // console.log(this.props.groupList)
        for(let group of this.props.groupList){
            // console.log(group)
            newArray.push(<p key={group.id} style={{fontSize:".6em",margin:'5px' , padding:' 5px 0'}}  >{group.name}</p>)
            // newArray.push(<Contact key={group.id}>{group.name}</Contact>)
        }
        this.setState({groupArray:newArray})
        let x = document.getElementById('divGroups');
        x.onclick = selectGroupConversation
        
    }

    componentWillMount(){
        // this.props.socket.on('foundConversation' , (data) => {
        //     this.props.onChangeActiveConver(data.converID)

        // })

        

        const selectConversation = (event) => {
            
            let converlayout = document.getElementById('converWrapper')
            while(converlayout.childNodes.length > 0 && this.props.activeConversation != null){
                let lastElem = converlayout.childNodes[converlayout.childNodes.length-1]
                converlayout.removeChild( lastElem )
            }
            const groupConvers = document.getElementById('divGroups')
            for(let group of groupConvers.childNodes){
                if(group.style.backgroundColor === 'red'){
                    group.style.backgroundColor = '#0e0e0e'
                }
            }

            const activeConver = event.target.closest('div')
            
            const converList = activeConver.parentElement
            const conversations = converList.querySelectorAll('div')
            for(let elem of conversations){
                elem.style.backgroundColor = '#0e0e0e'
            }

            
            const contact = activeConver.childNodes[1].textContent
            
            activeConver.style.backgroundColor = this.props.activeConversation != null ? "red" : '#0e0e0e';
            this.props.socket.emit('getThisConversation', { me:this.props.logedUser , contact: contact } )
            // console.logs
            
            
        }

        
        let newContactArray = []

        this.props.contactList.map((x)=>{
            const objToSend = { userID: x.contactID }



            // console.log(objToSend)
            axios.post('/getUser',objToSend)
            .then(response => {
                // console.log(response)
                newContactArray.push( <Contact onClick={selectConversation} key={x.contactID} contactname={ response.data.userName } contactimg=''/>)
                return new Promise( (resolve) => {
                    // console.log(newContactArray)
                    resolve(newContactArray)
                });
            }).then(
                response =>  this.setState({contactsArray: response})
            ).catch(error => {
                console.log(error);
            })
            
        })
        console.log(this.props.contactList)
        console.log(this.props.groupList)

        this.props.socket.emit('sendContactList',this.props.contactList);
        this.props.socket.emit('sendGroupList' , this.props.groupList)
    }

    

    render(){
        // console.log(this.state);
        const addContactHandler = () => {
            this.props.onAddContactHandler(true);
        }

        const createGroupHandler = () => {
            this.props.onCreateGroupHandler(true);
        }

        const filterConvers = (event) =>{
            for(let guy of document.getElementById('divContacts').childNodes)
            {
                if(!guy.childNodes[1].textContent.includes(event.target.value)){
                    guy.style.display='none'
                }
                else if(guy.childNodes[1].textContent.includes(event.target.value) ){
                    guy.style.display='flex'
                }
                if( event.target.value.toString() == "" ){
                    guy.style.display='flex'
                }

            }
            for(let group of document.getElementById('divGroups').childNodes){
                if(!group.textContent.includes( event.target.value)){
                    group.style.display='none'
                }
                else if(group.textContent.includes( event.target.value) ){
                    group.style.display='block'
                }
                if( event.target.value.toString() == "" ){
                    group.style.display='flex'
                }

            }
            console.log(event.target.value.toString() == '')
            // console.log(document.getElementById('divContacts').childNodes[0].childNodes[1].textContent)
            // console.log(document.getElementById('divGroups'))

        }

        let contactArray = <p>{this.state.locale.youHaveNoContacts}</p>
        
        if(this.state.contactsArray != null){
            // console.log(this.state.contactsArray[0])
            contactArray=this.state.contactsArray
        }
            
        let groupArrayToDisplay = <p style={{fontSize:".5em"}}>{this.state.locale.youHaveNoGroups}</p>
        // console.log(this.props.groupList)
        if(this.props.groupList.length > 0){
            groupArrayToDisplay=this.state.groupArray
        }

        return(
            
            <div className={classes.Sidebar}>
                
                <Modal show={this.props.addingContact} logedUser={this.props.logedUser} >
                    <AddContact {...this.props}></AddContact>
                </Modal>
                <Modal socket={this.props.socket} show={this.props.creatingGroup} logedUser={this.props.logedUser} bigModal='true'>
                    <CreateGroup>

                    </CreateGroup>
                </Modal>
                <div className={classes.contacts} id='divContacts' >
                    {contactArray}
                </div>
                <div className={classes.groups} id='divGroups'>
                    {groupArrayToDisplay}
                    
                </div>
                
                <div className={classes.chatControls}>
                    <input id='filter' onKeyUp={filterConvers} type='text' placeholder={this.state.locale.searchConversation}></input>
                    <img alt='add' className={classes.imagebtn} src={addContact} onClick={addContactHandler}></img>
                    <img alt='group' className={classes.imagebtn} src={groupIcon} onClick={createGroupHandler}></img>
                    <img alt='delete' className={classes.imagebtn} src={userDelete}></img>
                </div>
            </div>
        )
    }
}
    
const mapStateToProps = (state) => {
    // console.log(state)
    return {
        lang: state.lang,
        logedUser:state.logedUser,
        addingContact: state.addingContact,
        creatingGroup: state.creatingGroup,
        contactList: state.contactList,
        groupList: state.groupList,
        activeConversation: state.activeConver
    };
};

const mapDispatchToProps = ( dispatch , ownprops ) => {
    return {
        onAddContactHandler: ( flag ) => dispatch( {type: 'SHOW-ADDCONTACT-MODAL', payload:{flag: flag} }),
        onChangeActiveConver: ( converID ) => dispatch( {type: 'CHANGEACTIVECONVER' ,  payload: { converID: converID } }),
        onCreateGroupHandler: ( flag ) => dispatch( {type: 'SHOW-CREATEGROUP' , payload: {flag: flag} } )
    };
}

export default  connect(mapStateToProps , mapDispatchToProps )  (sidebar);
