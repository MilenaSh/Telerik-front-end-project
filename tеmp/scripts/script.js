'use strict';

var templates = function (params) {
    function get(name) {
        var promise = new Promise(function (resolve, reject) {
            var url = 'templates/' + name + '.handlebars';
            $.get(url, function (html) {
                var template = Handlebars.compile(html);
                resolve(template);
            });
        });
        return promise;
    }
    return {
        get: get
    };
}();

var homeController = function () {
    $('#link-logout').hide();

    function all(context) {
        templates.get('home').then(function (template) {
            context.$element().html(template());
        });
    }

    return {
        all: all
    };
}();

var aboutController = function () {
    function all(context) {
        templates.get('about').then(function (template) {
            context.$element().html(template());
        });
    }

    return {
        all: all
    };
}();

var loginController = function () {
    function all(context) {
        templates.get('login').then(function (template) {
            context.$element().html(template());
        });
    }

    return {
        all: all
    };
}();

var registerController = function () {
    function all(context) {
        templates.get('register').then(function (template) {
            context.$element().html(template());
        });
    }

    return {
        all: all
    };
}();

var profileController = function () {
    function all(context) {
        templates.get('profile').then(function (template) {
            context.$element().html(template());
        });
    }

    return {
        all: all
    };
}();

var missionsController = function () {
    function all(context) {
        templates.get('missions').then(function (template) {
            context.$element().html(template());
        });
    };

    return {
        all: all
    };
}();

var missiondetailsController = function () {
    function all(context) {
        templates.get('missiondetails').then(function (template) {
            context.$element().html(template());
        });
    }

    return {
        all: all
    };
}();

var portfolioController = function () {
    function all(context) {
        templates.get('portfolio').then(function (template) {
            context.$element().html(template());
        });
    }

    return {
        all: all
    };
}();

(function () {
    var sammyApp = Sammy('#content', function () {
        this.get('#/', function () {
            this.redirect('#/home');
        });
        this.get('#/home', homeController.all);
        this.get('#/about', aboutController.all);
        this.get('#/login', loginController.all);
        this.get('#/register', registerController.all);
        this.get('#/profile', profileController.all);
        this.get('#/missions', missionsController.all);
        this.get('#/details', missiondetailsController.all);
        this.get('#/portfolio', portfolioController.all);
    });
    $(function () {
        sammyApp.run('#/');
    });
})();