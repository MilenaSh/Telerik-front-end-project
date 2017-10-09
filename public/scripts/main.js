// Requester


function request(url, type, body, headers) {
    let promise = new Promise((resolve, reject) => $.ajax({
        url: url,
        method: type,
        data: body,
        headers: headers,
        contentType: 'application/json',
        success: resolve,
        error: reject
    }));
    return promise;
}

function getRequest(url, headers = {}) {
    return request(url, "GET", "", headers);
}

function postRequest(url, body, headers = {}) {
    return request(url, 'POST', JSON.stringify(body), headers);
}

function putRequest(url, body, headers = {}) {
    return request(url, 'PUT', JSON.stringify(body), headers);
}

function delRequest(url, body, headers = {}) {
    return request(url, "DELETE", JSON.stringify(body), headers);
}

// get template


const getTemplate = (name) => {
    const url = 'http://localhost:3000/templates/' + name;  //LOCALLY
   //  const url = 'https://gooddoers.herokuapp.com/templates/' + name; //HEROKU
    return getRequest(url)
        .then((template) => {
            return Promise.resolve(template);
        })
};


const getPage = () => {
    let url = window.location.href;
    url = url.split('page=');
    url.shift();
    url = url.join('');
    url.split('&');
    const page = url[0];
    return +page;
}


const nextPage = () => {
    const currentPage = getPage();
    let newPage = currentPage + 1;
    updateQueryStringParameter(window.location.href, 'page', newPage);
};

const prevPage = () => {
    const currentPage = getPage();
    let newPage = currentPage - 1;
    if (currentPage > 1) {
        updateQueryStringParameter(window.location.href, 'page', newPage);
    }
};

// Sammy

$(document).ready(() => {
    const app = Sammy('#content', (router) => {

        router.get('#/', (data) => {
            let rawTemplate;
            getTemplate('home')
                .then((template) => {
                    rawTemplate = template;
                    const compiledTemplate = Handlebars.compile(rawTemplate);
                    $('#content').html(compiledTemplate());
                })
        })

        router.get('#/home', (data) => {
            let rawTemplate;
            getTemplate('home')
                .then((template) => {
                    rawTemplate = template;
                    const compiledTemplate = Handlebars.compile(rawTemplate);
                    $('#content').html(compiledTemplate());
                })
        })

        router.get('#/about', (data) => {
            let rawTemplate;
            getTemplate('about')
                .then((template) => {
                    rawTemplate = template;
                    const compiledTemplate = Handlebars.compile(rawTemplate);
                    $('#content').html(compiledTemplate());
                })
        })


        router.get('#/login', (data) => {
            let rawTemplate;
            getTemplate('login')
                .then((template) => {
                    rawTemplate = template;
                    const compiledTemplate = Handlebars.compile(rawTemplate);
                    $('#content').html(compiledTemplate());
                })
        })

        router.get('#/register', (data) => {
            let rawTemplate;
            getTemplate('register')
                .then((template) => {
                    rawTemplate = template;
                    const compiledTemplate = Handlebars.compile(rawTemplate);
                    $('#content').html(compiledTemplate());
                })
        })

        router.get('#/profile', (data) => {
            let rawTemplate;
            getTemplate('profile')
                .then((template) => {
                    rawTemplate = template;
                    const compiledTemplate = Handlebars.compile(rawTemplate);
                    $('#content').html(compiledTemplate());
                })
        })

        // router.get('#/portfolio', (data) => {
        //     let rawTemplate;
        //     getTemplate('portfolio')
        //         .then((template) => {
        //             rawTemplate = template;
        //             const compiledTemplate = Handlebars.compile(rawTemplate);
        //             $('#content').html(compiledTemplate());
        //         })
        // })

        router.get('#/photos', (data) => {
            const page = +data.params.page;
            if (!page) {
                data.redirect('#/photos?page=1');
            } else {
                let rawTemplate;
                getTemplate('portfolio')
                    .then((template) => {
                        rawTemplate = template;
                        return getRequest('http://localhost:3000/photos?page=' + page); // LOCALLY
                        // return getRequest('https://gooddoers.herokuapp.com/photos?page=' + page); // HEROKU
                    })
                    .then((dataObj) => {
                        const compiledTemplate = Handlebars.compile(rawTemplate);
                        let pages = [];
                        for (let i = 1, len = dataObj.maxPage; i <= len; i++) {
                            pages.push(i);
                            // pages.slice(0, 5);
                        }
                        const canNext = getPage() < dataObj.maxPage;
                        const canPrev = getPage() > 1;
                        pages = pages.slice(0, 5);
                        console.log(dataObj);
                        $('#content').html(compiledTemplate({
                            photos: dataObj,
                            pages: pages,
                            canNext: canNext,
                            canPrev: canPrev
                        }));

                    });
            }
        });


        router.get('#/missions', (data) => {
            const page = +data.params.page;
            if (!page) {
                data.redirect('#/missions?page=1');
            } else {
                let rawTemplate;
                getTemplate('missions')
                    .then((template) => {
                        rawTemplate = template;
                        return getRequest('http://localhost:3000/missions?page=' + page); // LOCALLY
                        //return getRequest('https://gooddoers.herokuapp.com/missions?page=' + page); // HEROKU
                    })
                    .then((dataObj) => {
                        const compiledTemplate = Handlebars.compile(rawTemplate);
                        let pages = [];
                        for (let i = 1, len = dataObj.maxPage; i <= len; i++) {
                            pages.push(i);
                            // pages.slice(0, 5);
                        }
                        const canNext = getPage() < dataObj.maxPage;
                        const canPrev = getPage() > 1;
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

        router.get('#/missions/:id', (data) => {
            const id = +data.params.id;
            let rawTemplate;

            getTemplate('missiondetails')
                .then((template) => {
                    rawTemplate = template;
                    return getRequest('https://gooddoers.herokuapp.com/missions/' + id);
                })
                .then((mission) => {

                    const compiledTemplate = Handlebars.compile(rawTemplate);
                    $('#content').html(compiledTemplate({
                        mission: mission
                    }));
                });
        });
    });
    app.run('#/');
});