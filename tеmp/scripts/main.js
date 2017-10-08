"use strict";

// Requester

function request(url, type, body, headers) {
    var promise = new Promise(function (resolve, reject) {
        return $.ajax({
            url: url,
            method: type,
            data: body,
            headers: headers,
            contentType: 'application/json',
            success: resolve,
            error: reject
        });
    });
    return promise;
}

function getRequest(url) {
    var headers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return request(url, "GET", "", headers);
}

function postRequest(url, body) {
    var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    return request(url, 'POST', JSON.stringify(body), headers);
}

function putRequest(url, body) {
    var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    return request(url, 'PUT', JSON.stringify(body), headers);
}

function delRequest(url, body) {
    var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    return request(url, "DELETE", JSON.stringify(body), headers);
}

// get template


var getTemplate = function getTemplate(name) {
    var url = 'http://localhost:3000/templates/' + name; // LOCALLY
    // const url = 'https://gooddoers.herokuapp.com/templates/' + name;
    return getRequest(url).then(function (template) {
        return Promise.resolve(template);
    });
};

var getPage = function getPage() {
    var url = window.location.href;
    url = url.split('page=');
    url.shift();
    url = url.join('');
    url.split('&');
    var page = url[0];
    return +page;
};

var nextPage = function nextPage() {
    var currentPage = getPage();
    var newPage = currentPage + 1;
    updateQueryStringParameter(window.location.href, 'page', newPage);
};

var prevPage = function prevPage() {
    var currentPage = getPage();
    var newPage = currentPage - 1;
    if (currentPage > 1) {
        updateQueryStringParameter(window.location.href, 'page', newPage);
    }
};

// Sammy

$(document).ready(function () {
    var app = Sammy('#content', function (router) {

        router.get('#/', function (data) {
            var rawTemplate = void 0;
            getTemplate('home').then(function (template) {
                rawTemplate = template;
                var compiledTemplate = Handlebars.compile(rawTemplate);
                $('#content').html(compiledTemplate());
            });
        });

        router.get('#/home', function (data) {
            var rawTemplate = void 0;
            getTemplate('home').then(function (template) {
                rawTemplate = template;
                var compiledTemplate = Handlebars.compile(rawTemplate);
                $('#content').html(compiledTemplate());
            });
        });

        router.get('#/about', function (data) {
            var rawTemplate = void 0;
            getTemplate('about').then(function (template) {
                rawTemplate = template;
                var compiledTemplate = Handlebars.compile(rawTemplate);
                $('#content').html(compiledTemplate());
            });
        });

        router.get('#/login', function (data) {
            var rawTemplate = void 0;
            getTemplate('login').then(function (template) {
                rawTemplate = template;
                var compiledTemplate = Handlebars.compile(rawTemplate);
                $('#content').html(compiledTemplate());
            });
        });

        router.get('#/register', function (data) {
            var rawTemplate = void 0;
            getTemplate('register').then(function (template) {
                rawTemplate = template;
                var compiledTemplate = Handlebars.compile(rawTemplate);
                $('#content').html(compiledTemplate());
            });
        });

        router.get('#/profile', function (data) {
            var rawTemplate = void 0;
            getTemplate('profile').then(function (template) {
                rawTemplate = template;
                var compiledTemplate = Handlebars.compile(rawTemplate);
                $('#content').html(compiledTemplate());
            });
        });

        router.get('#/portfolio', function (data) {
            var rawTemplate = void 0;
            getTemplate('portfolio').then(function (template) {
                rawTemplate = template;
                var compiledTemplate = Handlebars.compile(rawTemplate);
                $('#content').html(compiledTemplate());
            });
        });

        router.get('#/missions', function (data) {
            var page = +data.params.page;
            if (!page) {
                data.redirect('#/missions?page=1');
            } else {
                var rawTemplate = void 0;
                getTemplate('missions').then(function (template) {
                    rawTemplate = template;
                    // return getRequest('http://localhost:3000/missions?page=' + page); LOCALLY
                    return getRequest('https://gooddoers.herokuapp.com/missions?page=' + page);
                }).then(function (dataObj) {
                    var compiledTemplate = Handlebars.compile(rawTemplate);
                    var pages = [];
                    for (var i = 1, len = dataObj.maxPage; i <= len; i++) {
                        pages.push(i);
                        // pages.slice(0, 5);
                    }
                    var canNext = getPage() < dataObj.maxPage;
                    var canPrev = getPage() > 1;
                    pages = pages.slice(0, 5);
                    console.log(dataObj);
                    $('#content').html(compiledTemplate({
                        missions: dataObj,
                        pages: pages,
                        canNext: canNext,
                        canPrev: canPrev
                    }));
                });
            }
        });

        // Selected mission

        router.get('#/missions/:id', function (data) {
            var id = +data.params.id;
            var rawTemplate = void 0;

            getTemplate('missiondetails').then(function (template) {
                rawTemplate = template;
                return getRequest('https://gooddoers.herokuapp.com/missions/' + id);
            }).then(function (mission) {

                var compiledTemplate = Handlebars.compile(rawTemplate);
                $('#content').html(compiledTemplate({
                    mission: mission
                }));
            });
        });
    });
    app.run('#/');
});