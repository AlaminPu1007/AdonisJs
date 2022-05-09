'use strict'

///bring user model
const User = use("App/Models/User");

class UserController {
  //Create a Async function
  async create({ request, response, auth }) {

    ///create a user, don't need to use save method
    // console.log( request.all() );

    const { username, email, password } = request.all();
    //return 1;
    // const user = await User.create(
    //   request.only(["username", "email", "password"])
    // );

    //create user another way
    const user = User.create({  username, email, password });

    // save register user as a login user//login is a function
    await auth.login(user);

    ///after create a user(click on submit) it will redirect home page automatically 
    return response.redirect('/');
  }

  ///Login function
  async login({ request, response, auth, session }){

    try{

       const { email, password } = request.all();
       await auth.attempt(email, password);

       return response.redirect("/");

      //  console.log(response);

    }catch(err){
      session.flash({ loginError: "These credentials do not work." });
      return response.redirect("/login");
    }

  }
}

module.exports = UserController
