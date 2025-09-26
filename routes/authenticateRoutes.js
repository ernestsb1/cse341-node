const express = require('express');
const passport = require('passport');
const router = express.Router();

// Start GitHub login flow
router.get('/github', passport.authenticate('github'));

// GitHub OAuth callback URL (must match what you set in GitHub OAuth app settings)
router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    // Successful login
    // You can redirect wherever you want here
    res.redirect('https://cse341-node-ob82.onrender.com/api-docs'); 
  }
);

// Logout route
router.get('/logout', function (req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

module.exports = router;
