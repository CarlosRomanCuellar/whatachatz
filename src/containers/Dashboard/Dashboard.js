import React, { Component } from 'react';

// import Spinner from '../../components/UI/Spinner';
import classes from './Dashboard.module.css'
import Navbar from '../../components/UI/Navbar/Navbar'
import { connect } from 'react-redux'
import Sidebar from '../../components/UI/Sidebar/Sidebar'
import ConversationLayout from '../../components/UI/ConversationLayout/ConversationLayout'
import socketIOClient from 'socket.io-client';

class Dashboard extends Component{

    state = {
        language:localStorage.getItem('WACL'),
        sidebar: null,
        navbar:null,
        converLayout: null,
        response:false
    }

    componentWillReceiveProps(newProps){
        const oldProps = this.props
        if(oldProps !== newProps){
            
        }
    }

    componentDidMount(){
        if(this.props.logedUser === null){
            
            this.props.history.replace('/login') 
        }

        else{
            
            const endpoint = process.env.SOCKET_ENDPOINT
            
            const socket = socketIOClient(endpoint);

            socket.emit('GETARRAYS', this.props.logedUser)
            socket.on('SETARRAYS', (data)=>{
                this.props.onLoadMyArrays(data)
            })
            
            this.setState({
                navbar: <Navbar path={this.props.history} socket={socket} className={classes.Nav} logedUser={this.props.ctr} loingout={this.props.logingout} 
                    showfriendRequest={this.props.showfriendRequest} ></Navbar>,
                sidebar:<Sidebar language={this.state.language} socket={socket} addingContact={this.props.addingConver} logedUser={this.props.ctr} ></Sidebar>,
                converLayout: <ConversationLayout language={this.state.language} socket={socket}></ConversationLayout>
            })
        }

        // if(!localStorage.getItem('WACUser'))
        //     localStorage.setItem('WACUser', this.props)
    }
    
    render(){
        return (
            <div className={classes.Dashboard}>
                {this.state.navbar}
                <div className={classes.Content}>
                    {this.state.sidebar}
                    {this.state.converLayout}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    // console.log(state)
    return {
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
        onLoginHandler: ( value ) => dispatch({ type: 'LOGEDIN' , payload: { user: value} }),
        updateGlobalState: (newState) => dispatch( { type: 'UPDATELOGINDATA' , payload: { newState : newState } } ),
        onLoadMyArrays: ( arrays ) => dispatch({ type: 'LOADMYARRAYS' , payload: arrays })
    };
}

export default connect(mapStateToProps , mapDispatchToProps ) ( Dashboard)