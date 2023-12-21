const helpers = {};
const handlebars = require("handlebars");
const handlebarsHelpers = require("handlebars-helpers");

helpers.isAuthenticated = (req, res, next) => {
  //console.log(req.user)
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error_msg', 'Por favor, ingrese con su usuario');
  res.redirect('/users/signin');
};

handlebarsHelpers({handlebars});

module.exports = helpers;
