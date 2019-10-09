const languageStrings = (option) => {
    switch(option){
        case 'English':{
            return {
                signIn:'Sign In',
                userName:'User Name',
                password:'password',
                createAccount: 'Create account',
                login: 'Login',
                settings: 'Settings',
                language: 'Language',
                logout: 'Logout',
                cancel: 'Cancel',
                send: 'Send',
                addContact: 'Add Contact',
                emailOfNewContact: 'email of new contact',
                
                createGroup:'Create Group',
                groupName: 'Group Name',
                
                writeAMessage: 'write a message',
                searchConversation: 'Search Conversation',
                youHaveNoContacts: 'you have no contacts',
                youHaveNoGroups: 'you have no groups',
                friendRequestSent:'Friend request sent',
                pleaseEnterAValidEmail:'please enter a valid email',
                verifyTheCredentials:'verify the credentials or try checking your connection',
                theAccountHasBeenCreated:'The account has been created',
                emailAlready:'email already in use',
                somethingWentWrong:'Something went wrong',
                back: 'Back',
                email: 'email'
            }
            // break
        }
        case 'Español':{
            return {
                signIn:'iniciar sesión',
                userName:'Nombre de usuario',
                password:'contraseña',
                createAccount: 'Crear una cuenta',
                login: 'iniciar sesión',
                settings: 'Ajustes',
                language: 'Lenguaje',
                logout: 'Cerrar sesión',
                cancel: 'Cancelar',
                send: 'Enviar',
                addContact: 'Agregar contacto',
                emailOfNewContact: 'email del contacto',
                createGroup:'Crear Grupo',
                groupName: 'Nombre del grupo',
                writeAMessage: 'Escribe un mensaje',
                searchConversation: 'Buscar conversación',
                youHaveNoContacts: 'No tienes contactos',
                youHaveNoGroups: 'No tienes ningun grupo',
                friendRequestSent:'Solicitud de amistad enviada',
                pleaseEnterAValidEmail:'Use un email valido',
                verifyTheCredentials:'Verifique sus credenciales o revise su conexión',
                theAccountHasBeenCreated:'La cuenta fue creada',
                emailAlready:'email ya esta en uso',
                somethingWentWrong:'Algo salio mal',
                back: 'Atras',
                email: 'email'
            }
            // break
        }
        case 'Français':{
            return {
                signIn:'commencer la session',
                userName:`Nom d'utilisateur`,
                password:'mot de passe',
                createAccount: 'Créer un compte',
                login: 'commencer la session',
                settings: 'Paramètres',
                language: 'Langue',
                logout: 'Fermer la session',
                cancel: 'Annuler',
                send: 'Envoyer',
                addContact: 'Ajouter un contact',
                emailOfNewContact: 'email de contact',
                createGroup:'Créer un groupe',
                groupName: 'Nom du groupe',
                writeAMessage: 'Écrire un message',
                searchConversation: 'Recherche conversation',
                youHaveNoContacts: `vous n'avez pas de contacts`,
                youHaveNoGroups: `tu n'as pas de groupes`,
                friendRequestSent:`Demande d'ami envoyée`,
                pleaseEnterAValidEmail:'veuillez entrer un email valide',
                verifyTheCredentials:`vérifier les informations d'identification ou essayez de vérifier votre connexion`,
                theAccountHasBeenCreated:`Le compte a été créé`,
                emailAlready:`Email déjà utilisé`,
                somethingWentWrong:"Quelque chose a mal tourné",
                back: 'retourner',
                email: 'email'
            }
            // break
        }
        case '中文':{
            return {
                signIn:'注册',
                userName:'用户名',
                password:'密码',
                createAccount: '创建一个帐号',
                login: '注册',
                settings: '设置',
                language: '语言',
                logout: '登出',
                cancel: '取消',
                send: '发送',
                addContact: '新增联络人',
                emailOfNewContact: '联络电子邮件',
                createGroup:'建立群组',
                groupName: '组名',
                writeAMessage: '写一条消息',
                searchConversation: '搜索对话',
                youHaveNoContacts: '你没有联络人',
                youHaveNoGroups: '你没有团体',
                friendRequestSent:'发送朋友请求',
                pleaseEnterAValidEmail:'请输入有效电子邮件',
                verifyTheCredentials:'验证凭据或尝试检查连接',
                theAccountHasBeenCreated:"帐户已创建",
                emailAlready:'电子邮件已在使用中',
                somethingWentWrong:'出问题了',
                back: '回去',
                email: '电子邮件'
            }
            // break
        }
        default:{
            return {
                signIn:'Sign In',
                userName:'User Name',
                password:'password',
                createAccount: 'Create account',
                login: 'Login',
                settings: 'Settings',
                language: 'Language',
                logout: 'Logout',
                cancel: 'Cancel',
                send: 'Send',
                addContact: 'Add Contact',
                emailOfNewContact: 'email of new contact',
                
                createGroup:'Create Group',
                groupName: 'Group Name',
                
                writeAMessage: 'write a message',
                searchConversation: 'Search Conversation',
                youHaveNoContacts: 'you have no contacts',
                youHaveNoGroups: 'you have no groups',
                friendRequestSent:'Friend request sent',
                pleaseEnterAValidEmail:'please enter a valid email',
                verifyTheCredentials:'verify the credentials or try checking your connection',
                theAccountHasBeenCreated:'The account has been created',
                emailAlready:'email already in use',
                somethingWentWrong:'Something went wrong',
                back: 'back',
                email: 'email'
            }
            // break
        }
    }
}

export default languageStrings