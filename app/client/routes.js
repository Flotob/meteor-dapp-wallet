/**
Template Controllers

@module Routes
*/

/**
The app routes

@class App routes
@constructor
*/


// Change the URLS to use #! instead of real paths
// Iron.Location.configure({useHashPaths: true});


// Router defaults
Router.configure({
    layoutTemplate: 'layout_main',
    notFoundTemplate: 'layout_notFound',
    yieldRegions: {
        'layout_header': {to: 'header'}
    }
});

var scrollTop = function(){
    $(window).scrollTop(0);
    this.next();
}

// ROUTES

/**
The receive route, showing the wallet overview

@method dashboard
*/
Router.route('/', {
    template: 'views_dashboard',
    name: 'dashboard',
    onBeforeAction: scrollTop
});


/**
The send route.

@method send
*/
Router.route('/send', {
    template: 'views_send',
    name: 'send',
    onBeforeAction: scrollTop
});


/**
The send route.

@method send
*/
Router.route('/send/:address', {
    template: 'views_send',
    name: 'sendTo',
    onBeforeAction: scrollTop,
    data: function() {
        return this.params;
    }
});

/**
The create account route.

@method send
*/
Router.route('/account/new', {
    template: 'views_account_create',
    name: 'createAccount'
});



/**
The account route.

@method send
*/
Router.route('/account/:address', {
    template: 'views_account',
    name: 'account',
    onBeforeAction: scrollTop,
    data: function() {
        return Accounts.findOne({address: this.params.address});
    }
});




