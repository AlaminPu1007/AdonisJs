'use strict'

//import job model
const Job = use("App/Models/Job");

class JobController {
  ///create a async function where bring all job information on home page
  async home({ view }) {
    /// its give the ability to read wrote on table (job)
    // const job = new Job();

    //// initial home page has nothing to show user, lets create a initial job posts
    /// from out job table we have some table name

    // job.title = "My job title";
    // job.link = "http://google.com";
    // job.description = "My job description";

    /// we need to save this initial data on our database
    // await job.save();

    ///This is our home page view controller,
    //where we show our all user to our all job post from database,
    //so se need to fetch all job post from our database.

    ///fetch method
    //bring all data from database
    const jobs = await Job.all();

    return view.render("index", { jobs: jobs.toJSON() });
  }

  /// this function for only login user all post information
  async userIndex({ auth, view }) {
    // login user information
    // console.log(auth.user);

    ///Fetch All user posting jobs
    ///jobs() from user , where i already relationship user to Job table
    const jobs = await auth.user.jobs().fetch();

    // console.log(jobs);

    return view.render("jobs", { jobs: jobs.toJSON() });
  }

  // Create a job post
  async create({ auth, request, response, session }) {
    ///get all form data from post form
    const job = request.all();

    const posted = await auth.user.jobs().create({
      title: job.title,
      link: job.link,
      description: job.description,
    });

    session.flash({ message: "Your job has been posted!" });
    return response.redirect("back");
  }

  /// Update Function
  async update({ response, request, session, params }) {
    /// get data from user updated
    const { title, link, description } = request.all();
    /// from Job model to find user updated post
    const job = await Job.find(params.id);

    /// put updated value on existing data
    (job.title = title),
      (job.link = link),
      (job.description = description),
      await job.save();

    session.flash({ message: "Your job has been updated. " });
    return response.redirect("/post-a-job");
  }

  /// Edit a job
  async edit({ params, view }) {
    const job = await Job.find(params.id);
    return view.render("edit", { job: job });
  }

  ///Delete a job
  async delete ({ response, session, params }){

    //find deleted job post
    const job = await Job.find(params.id);
    await job.delete();

    session.flash({ message: "Your job has been removed" });
    return response.redirect("back");
  } 
}

module.exports = JobController
