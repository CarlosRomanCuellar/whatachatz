import React, {Component} from 'react';
import './App.css';
import Login from './containers/Login/Login'
// import Input from './components/UI/Input/Input'
import { BrowserRouter } from 'react-router-dom';
import {Route} from 'react-router-dom';
import CreateAccount from './containers/CreateAccount/CreateAccount'
import Dashboard from './containers/Dashboard/Dashboard'
// import socketIOClient from 'socket.io-client';

class App extends Component{

  constructor(){
    super();
    this.state = {
      // response:false,
      // endpoint: "http://127.0.0.1:3005"
    }
  }

  componentDidMount(){
    // const {endpoint} = this.state;
    // const socket = socketIOClient(endpoint);
    // socket.on('event',data => this.setState({response:data}))
  }



  render() {
    // console.log(this.props)
    return(
      <BrowserRouter>
        <div className="App">
          <Route path='/create-account'component={CreateAccount}></Route>
          <Route path='/dash' component={Dashboard}></Route>
          <Route path='/login' exact component={Login}></Route>
          <Route path='/' exact component={Dashboard}></Route>

         
          
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
