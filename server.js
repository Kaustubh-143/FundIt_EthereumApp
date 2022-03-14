// this file is here to boot up the next app and 
// copy paste from docuumentation

const { createServer } = require('http') ;

const next = require('next') ;

const app = next({
    dev: process.env.NODE_ENV !== 'production'
});

const routes = require('./routes')
const handler = routes.getRequestHandler(app)

app.prepare().then(() => {
    createServer(handler).listen(3000, (err) => {
        if(err) throw err;
        console.log(`Ready on http://localhost:3000`);
    })
  })  

  // all of the code is from next-routes documentation github