import langString from'../langStrings';
let locale = langString(localStorage.getItem('WACL'))

const initialState = {
    lang:'English',
    logedUser: null,
    logingout:false,
    showfriendRequest:false,
    addingContact: false,
    creatingGroup:false,
    contactList:[],
    groupList:[],
    friendRequests: [],
    activeConver:'',
    stateForLoginData:{
        loginForm:{
            userName: {
                elementType: 'input',
                elementConfig:{
                    type:'text',
                    placeholder:locale.userName
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            password:  {
                elementType: 'input',
                elementConfig:{
                    type:'password',
                    placeholder:locale.password
                },
                value: '',
                validation: {
                    required: true,
                    minLength:6
                },
                valid: false,
                touched: false
            }
            
        },
        formIsValid: false,
        loading:false
    }
}

const reducer = (state = initialState, action) => {
    if (action.type === 'LOGEDIN'){
        // console.log(action.payload)
        // console.log(action.payload.groupList)
        const newState = {
            ...initialState,
            logedUser: action.payload.user,
            contactList: action.payload.contactList,
            groupList: action.payload.groupList,
            friendRequests:action.payload.friendRequest,
            activeConver:null
            
        }
        localStorage.setItem('WACUser' , JSON.stringify (newState))
        localStorage.setItem('WACUser2' , 'a')

        // console.log(newState)
        return newState
    }
    if(action.type === 'LOADSTATE'){
        // console.log( localStorage.getItem('WACUser'))
        let z = JSON.parse( localStorage.getItem('WACUser'))
        return z
    }
    else if( action.type === 'CHANGELANGUAGE' ){
        const newState = {
            ...state,
            lang: action.payload
        }
        // console.log(newState.lang)
        localStorage.setItem('WACUser' ,  JSON.stringify (newState))
        return newState
    }
    else if( action.type === 'UPDATELOGINDATA' ){
        const newState =  {
            ...initialState,
            stateForLoginData:{
                ...action.payload.newState
            }
        }
        localStorage.setItem('WACUser' , JSON.stringify (newState))
        return newState
    }
    else if(action.type === 'SHOWLOGOUTMODAL'){
        // console.log( 'recived flag:' + action.payload.flag)
        const newState = {
            ...state,
            logingout:action.payload.flag
        }
        localStorage.setItem('WACUser' ,  JSON.stringify (newState))
        return newState
    }
    else if (action.type === "SHOWFRIENDREQMODAL"){
        const newState = {
            ...state,
            showfriendRequest:action.payload.flag
        }
        localStorage.setItem('WACUser' ,  JSON.stringify (newState))
        return newState
    }
    else if(action.type === 'SHOW-ADDCONTACT-MODAL'){
        const newState = {
            ...state,
            addingContact:action.payload.flag
        }
        localStorage.setItem('WACUser' ,  JSON.stringify (newState))
        return newState
    }
    else if(action.type === 'SHOW-CREATEGROUP'){
        const newState = {
            ...state,
            creatingGroup: action.payload.flag
        }
        localStorage.setItem('WACUser' ,  JSON.stringify (newState))
        return newState
    }
    else if(action.type === 'UPDATE-CONTACTS'){
        let aux = state.contactList;
        aux.push(action.payload.value)
        const newState = {
            ...state,
            contactList:aux
        }
        localStorage.setItem('WACUser' ,  JSON.stringify (newState))
        return newState
    }
    else if(action.type === 'UPDATEGROUPLIST'){
        const newState = {
            ...state,
            groupList:action.payload
        }
        localStorage.setItem('WACUser' ,  JSON.stringify (newState))
        return newState
    }
    else if(action.type === 'UPDATEFRIENDREQUEST'){
        let newState =  {
            ...state,
            friendRequests: action.payload.newArray
        }
        // console.log(newstate);
        localStorage.setItem('WACUser' ,  JSON.stringify (newState))
        return newState

    }
    else if (action.type === 'UPDATEFRIENDS'){
        let newState = {
            ...state,
            contactList: action.payload.newArrays.contactList,
            friendRequests: action.payload.newArrays.reqList
        }
        // console.log(newState)
        localStorage.setItem('WACUser' ,  JSON.stringify (newState))
        return newState
    }
    else if (action.type === 'CHANGEACTIVECONVER'){
        let newState =  {
            ...state,
            activeConver: action.payload.converID
        }
        // console.log(state.activeConver)
        localStorage.setItem('WACUser' ,  JSON.stringify (newState))
        return newState
    }
    else if(action.type === 'LOADMYARRAYS'){
        let newState = {
            ...state,
            contactList:action.payload.contacts,
            groupList: action.payload.groups,
            friendRequests: action.payload.requests
        }
        localStorage.setItem('WACUser' ,  JSON.stringify (newState))
        return newState
    }
 
    return state
}

export default reducer; 