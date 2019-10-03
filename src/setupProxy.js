const proxy = require('http-proxy-middleware');
module.exports = function(app){
    app.use('/users/',proxy({
        target: 'http://localhost:3005',
        changeOrigin: true,
    }));
    app.use('/getUser',proxy({
        target: 'http://localhost:3005',
        changeOrigin: true,
    }));
    app.use('/auth/login',proxy({
        target: 'http://localhost:3007',
        changeOrigin: true,
    }));
    app.use('/create-user/',proxy({
        target: 'http://localhost:3005',
        changeOrigin: true,
    }))
    app.use('')
};