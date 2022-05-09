'use strict'

const JobController = require('../app/Controllers/Http/JobController');

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

/* for initial render its bring all data from our jobController*/
Route.get("/", "JobController.home");

//  create login and signup route
//'on' method, because we don't need to pass any data on (login & signUp ) page 
Route.on("/signup").render("auth.signup");///this route for user html view
/// this for, post method where data
//bring from signup.edge file
Route.post("/signup", "UserController.create").validator('CreateUser'); 


Route.on("/login").render("auth.login");
/// this for, post method where data
//bring from login.edge file
Route.post("/login", "UserController.login").validator("LoginUser");

//logout 
Route.get("/logout", async({ auth, response })=>{
  await auth.logout();
  return response.redirect('/');
});

/// Route for do all job stuff
Route.get("/post-a-job", "JobController.userIndex");
Route.post("/post-a-job", "JobController.create").validator("CreateJob");

Route.group(()=>{

  Route.get("/delete/:id", "JobController.delete");
  Route.get("/edit/:id", "JobController.edit");
  Route.post("/update/:id", "JobController.update").validator(
    "CreateJob"
  );

}).prefix('/post-a-job');


