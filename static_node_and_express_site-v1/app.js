const express = require('express');
const { projects } = require('./data.json');

// Importing http module, help from https://www.geeksforgeeks.org/how-to-change-npm-start-script-of-node-js/
const http = require("http")
  
// Creating Server
const server = http.createServer((req,res)=>{
    req.statusCode=200;
    res.end();
});
  
// Executing the server
server.listen(3000,"localhost",()=>{
    console.log("Server is Running ")
})

app = express();

app.set('view engine', 'pug');

app.use('/static', express.static('public'));

//home page
app.get('/', (req, res) => {
    res.render('index', { projects });
});

//about me page
app.get('/about', (req, res) => {
    res.render('about');
});

//renders project pages using project's id property, serves up error message if project id does not exist
app.get('/projects/:id', (req, res, next) => {
    const projectId = req.params.id;
    const project = projects.find( ({ id }) => id === +projectId );
    
    if (project) {
        res.render('project', { project: projects[req.params.id] });
      } else {
        console.log("project id wrong")
        const err = new Error();
        err.status = 404;
        err.message = 'Looks like the project you requested does not exist'
        next(err);
      }
    
});

//Error handler for requests to undefined routes 
app.use((req, res, next) => {
 
  console.log('404 error handler called');
  res.status(404)
  res.render('not-found')
  });

  //global error handler
app.use((err, req, res, next) => {

  if (err) {
    console.log('Global error handler called', err);
  }
    if(err.status === 404){
      res.status = 404;
      res.render('not-found', { err });
    } 
    else {
      console.log('500 error being handled');
      err.message = err.message || `Oops!  It looks like something went wrong on the server.`
      res.status(err.status || 500);
      res.render('error', { err });
    }
});

app.listen(3000, ()=>{
    console.log('I am running on localhost 3000!')
});