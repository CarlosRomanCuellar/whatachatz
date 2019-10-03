import React, {Component} from 'react';
import classes from './Navbar.module.css';
import Logo from '../../../assets/images/whac.png'
import Settings from '../../../assets/images/settings-icon.png'
import defaultUser from '../../../assets/images/defaultUser.png'
import { connect } from 'react-redux'
import Modal from '../Modal/Modal'
import SettingsForm from '../../Settings/Settings'
import noti from '../../../assets/images/notification2.png'
import RequestsForm from '../../../containers/RequestsForm/RequestForm'
import Button from '../Button/Button';

class Navbar extends Component{
    state = {
        ...this.props
    }

    componentDidUpdate(){
        // console.log('oh jesus this shit work')
    }

    componentDidMount(){
        let newState = { ...this.props }
        if(newState !== this.state){
            this.setState({...newState})
        }
    }

    render(){

        const logouthandler = () => {
            // console.log('log out')
            this.props.onLogoutHandler(true);
            
        }

        const friendRequestHandler = () => {
            // console.log(this.state.showfriendRequest)
            this.props.onShowFriendRequest(true)
        }
        const closefriendRequestHandler = () => {
            // console.log(this.state.showfriendRequest)
            this.props.onShowFriendRequest(false)
        }
        
        return(
            <nav  className={this.props.className}>
                 <Modal show={this.props.logingout}>
                    <SettingsForm  {...this.props}></SettingsForm>
                </Modal>
                <Modal show={this.props.showfriendRequest}>
                    <RequestsForm {...this.props}></RequestsForm>
                    <Button btnType='Success' clicked={closefriendRequestHandler} >close</Button>
                </Modal>
                <ul>
                    <li><h6>What A Chat</h6></li>
                    <li><img src={Logo} alt=''></img></li>
                    <li onClick={friendRequestHandler} className={classes.notification}><img src={noti} alt='notification' ></img> {this.props.reqList.length}</li>
                    <li className={classes.profile}>
                        <div className={classes.myProfile}>
                            <img alt=''  className={classes.profileImg} src={defaultUser}></img>
                            {this.props.ctr}
                            
                        </div>
                    </li>
                    <li className={classes.Settings}><img src={Settings} alt='' onClick={logouthandler}></img></li>
                </ul>
            </nav>
        )
    }
} 

const mapStateToProps = (state) => {
    return {
        ctr: state.logedUser,
        logingout: state.logingout,
        showfriendRequest:state.showfriendRequest,
        reqList: state.friendRequests
    };
};

const mapDispatchToProps = ( dispatch , ownprops ) => {
    return {
        // onLoginHandler: ( value ) => dispatch({ type: 'LOGEDIN' , payload: { user: value} }),
        // updateGlobalState: (newState) => dispatch( { type: 'UPDATELOGINDATA' , payload: { newState : newState } } )
        onLogoutHandler: ( flag ) => dispatch( {type: 'SHOWLOGOUTMODAL', payload:{flag: flag} }),
        onShowFriendRequest: (flag)=>dispatch({type: 'SHOWFRIENDREQMODAL', payload:{flag:flag}})
    };
}

export default connect(mapStateToProps , mapDispatchToProps )(Navbar)