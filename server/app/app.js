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

    app.use('/public', express.static(path.join(__dirname, '../../public')));
    app.use(express.static(path.join(__dirname, '../../dist')));

    // app.use(express.static('public')); works
    //app.use(express.static('scripts'));

    // app.use(express.static('node_modules'));
    // app.use('/libs', express.static(__dirname + '/node_modules'));

    // other paths go here

    app.get('/missions', (request, response) => {
        const page = +request.query.page;
        return data.getMissions(page)
            .then((missions) => {
                return response.json(missions);
            })
    })

    app.get('/missions/:id', (request, response) => {
        const id = +request.params.id;
        return data.getMissionById(id)
            .then((mission) => {
                return response.json(mission);
            })
    });

    app.get('/photos', (request, response) => {
        const page = +request.query.page;
        return data.getPhotos(page)
            .then((photos) => {
                return response.json(photos);
            })
    })

    app.get('/photo/:id', (request, response) => {
        const id = +request.params.id;
        return data.getPhotoById(id)
            .then((photo) => {
                return response.json(photo);
            })
    });

    app.get('/templates/:name', (request, response) => {
        const name = request.params.name;
        // const template = fs.readFileSync(path.join(__dirname, '../../public/templates/') + name, 'utf-8'); //- LOCALLY
        const template = fs.readFileSync(path.join(__dirname, '../../public/templates/') + name + '.handlebars', 'utf-8'); // HEROKU
        return response.json(template);
    });


    app.get('/', (request, response) => {
        return response.sendFile(path.join(__dirname, '../../public', 'index.html'));
    });

    return Promise.resolve(app);
};

module.exports = { init };