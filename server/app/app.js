const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const fs = require('fs');

const init = (data) => {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    // We want to be able to parse nested objects
    app.use(cookieParser());

    app.use(function(req, res, next) {
        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
        res.header('Access-Control-Allow-Headers', 'appid, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
        next();
    });

    // TODO

    app.use(express.static('public'));

    // other paths go here

    app.get('/templates/:name', (request, response) => {
        const name = request.params.name;
        const template = fs.readFileSync(path.join(__dirname, '../../public/templates/') + name + '.handlebars', 'utf-8');
        return response.json(template);
    });


    app.get('/', (request, response) => {
        return response.sendFile(path.join(__dirname, '../../public', 'index.html'));
    });

    return Promise.resolve(app);
};

module.exports = { init };
