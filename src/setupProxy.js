const proxy = require('http-proxy-middleware');
module.exports = function(app){
    app.use('/chat/users/',proxy({
        target: 'http://localhost:3005',
        changeOrigin: true,
    }));
    app.use('/chat/getUser',proxy({
        target: 'http://localhost:3005',
        changeOrigin: true,
    }));
    app.use('/authser/auth/login',proxy({
        target: 'http://localhost:3007',
        changeOrigin: true,
    }));
    app.use('/chat/create-user/',proxy({
        target: 'http://localhost:3005',
        changeOrigin: true,
    }))
    app.use('/authser/auth/create' , proxy({
        target: 'http://localhost:3007',
        changeOrigin: true,
    }))
};