const db = require(`../models`);
const passport = require(`../config/passport`);
const isAuthenticated = require(`../config/middleware/isAuthenticated`);

module.exports = app => {
  // USER ROUTES

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post(`/api/signup`, (req, res) => {
    console.log(req.body);
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(() => {
        res.redirect(307, `/api/login`);
      })
      .catch(err => {
        res.status(422).json(err.errors[0].message);
      });
  });

  // Route for logging user out
  app.get(`/logout`, (req, res) => {
    req.logout();
    res.redirect(`/`);
  });

  // Update their profile (created with signup)
  app.put("/profile", isAuthenticated, (req, res) => {
    db.User.update({
      name: req.body.name,
      nouns: req.body.nouns,
      adjectives: req.body.adjectives,
      verbs: req.body.verbs
    });
  });

  // LONG-TERM GOAL ROUTES
  // Get all long term goals
  app.get(`/api/long-term`, isAuthenticated, (req, res) => {
    db.LongTerm.findAll({
      where: {
        UserId: req.user.id
      }
    }).then(longTermGoals => {
      res.json(longTermGoals);
    });
  });

  // Get a specific long term goal
  app.get(`/api/long-term/:id`, isAuthenticated, (req, res) => {
    db.LongTerm.findOne({
      where: {
        UserId: req.user.id,
        id: req.params.id
      }
    }).then(longTermGoal => {
      res.json(longTermGoal);
    });
  });

  // Create a new long-term goal
  app.post(`/api/long-term`, isAuthenticated, (req, res) => {
    db.LongTerm.create({
      UserId: req.user.id,
      title: req.body.title,
      completedBy: req.body.completedBy,
      description: req.body.description,
      category: req.body.category
    }).then(longTermGoal => {
      res.json(longTermGoal);
    });
  });

  // Update an existing long-term goal
  app.post(`/api/long-term/:id`, isAuthenticated, (req, res) => {
    db.LongTerm.update({
      UserId: req.user.id,
      title: req.body.title,
      completedBy: req.body.completedBy,
      description: req.body.description,
      category: req.body.category
    }, { where: { id: req.params.id } }).then(longTermGoal => {
      res.json(longTermGoal);
    });
  });

  // Delete a long-term goal by id
  app.delete(`/api/long-term/:id`, isAuthenticated, (req, res) => {
    db.LongTerm.destroy({ where: { id: req.params.id } }).then(destroyed => {
      res.json(destroyed);
    });
  });

  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post(`/api/login`, passport.authenticate(`local`), (req, res) => {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.json(`/profile`);
  });
};
