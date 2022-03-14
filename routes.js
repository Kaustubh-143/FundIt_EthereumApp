const routes = require('next-routes')() ; // this require statement returns a function and placing a set of paranthesis after that invokes the function right after the require is run

routes
.add('/campaigns/new', '/campaigns/new')
.add('/campaigns/:token', '/campaigns/show') 
.add('/campaigns/:token/requests','/campaigns/requests/index') 
.add('/campaigns/:token/requests/new','/campaigns/requests/new')
//here we are adding a new route with the name of first argument and second argument is what will be opened when someone access that

module.exports = routes; //this export statement is what going to export some helper functions that is going to allow us to automatically navigate users around our application