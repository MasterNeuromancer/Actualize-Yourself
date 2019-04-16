const fs = require("fs");
const db = require("../models");
const moment = require("moment");
const isAuthenticated = require("../config/middleware/isAuthenticated");

// Two helper functions, comparing dates for the timeline
const findFarthestDate = function(datedArray) {
  let farthestOut = moment();
  datedArray.forEach(element => {
    // If farthest isn't after this date, then this date is farther
    if(!farthestOut.isAfter(element.date)) {
      farthestOut = moment(element.date);
    }
  });
  console.log(farthestOut);
  return farthestOut;
}

const percentOfFarthest = function(farthestOut, item) {
  const today = moment();
  let daysOut;
  if(today.isAfter(item.date)) {
    return 0;
  } else {
    daysOut = moment(item.date).diff(today, 'days');
  }
  // Goals to be completed at the past are shown at 0
  return (daysOut < 0) ? 0 : daysOut / farthestOut;
}

module.exports = app => {
  // Home page
  app.get("/", isAuthenticated, (req, res) => {
    db.Users.findOne({
      where: {
        id: req.user.id
      },
      include: [db.LongTerms]
    }).then(dbUser => {
      // console.log(dbUser);
      const farthestOut = findFarthestDate(dbUser.LongTerms);
      let newNodes = dbUser.LongTerms.map(item => {
        item.percent = percentOfFarthest(farthestOut, item);
        return item;
      });
      var nodeData = JSON.stringify({nodes: newNodes});
      fs.writeFile("./public/js/data2.json", nodeData, err => {
        if (err) {
          throw err;
        }
        // console.log(nodeData);
        res.render("home", { user: dbUser, tasks: dbUser.LongTerms });
      });
    });
  });

  // Load signup page
  app.get("/signup", (req, res) => res.render("signup"));

  // Load login page
  app.get("/login", (req, res) => res.render("login"));

  // Load profile page
  app.get("/profile", isAuthenticated, (req, res) => {
    db.Users.findOne({
      where: {
        id: req.user.id
      },
      include: [db.LongTerms]
    }).then(dbUser => {
      res.render("profile", { user: dbUser });
    });
  });

  // Get form for creating a long-term goal
  app.get("/long-term", isAuthenticated, (req, res) => {
    res.render("long-term");
  });

  // Get form for updating a long-term goal
  app.get("/long-term/:nodeId", isAuthenticated, (req, res) => {
    db.LongTerms.findOne({ where: { nodeId: req.params.nodeId } }).then(longTerm => {
      res.render("long-term", {
        longterm: longTerm
      });
    });
  });

  // Useful links for self-actualizers
  app.get("/resources", (req, res) => res.render("resources"));

  // Render 404 page for any unmatched routes
  app.get("*", (req, res) => res.render("404"));
};
