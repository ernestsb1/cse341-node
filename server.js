require('dotenv').config(); // Load .env variables
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const authenticateRoutes = require('./routes/authenticateRoutes');
const GitHubStrategy = require('passport-github2').Strategy;
const { isAuthenticated } = require('./middleware/authenticate');
require('./auth/passport'); // Passport configuration

const contactRouter = require('./routes/contactRoutes');
const templeRouter = require('./routes/templeRoutes');
const bookRouter = require('./routes/bookRoutes');

const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('json spaces', 2);

// Session and Passport setup
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  }
}));

app.use(passport.initialize());
app.use(passport.session());

// CORS middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_ORIGIN || 'http://localhost:8080');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, z-Key, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  next();
});

app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:8080',
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT'],
  credentials: true
}));

// Passport GitHub strategy setup
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL,
}, function (accessToken, refreshToken, profile, done) {
  return done(null, profile);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// Auth routes
app.use('/auth', authenticateRoutes);

app.get('/login', (req, res) => {
  if (req.isAuthenticated()) {
    res.send(`Logged in as ${req.user.displayName}`);
  } else {
    res.send('Logged out');
  }
});

app.get('/github', passport.authenticate('github'));

app.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect('/api-docs');
  }
);

app.get('/logout', (req, res, next) => {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

app.get('/', (req, res) => {
  console.log('Session user:', req.user);
  res.send(req.user ? `Logged in as ${req.user.displayName}` : 'Logged out');
});


// Swagger docs (protected for some methods)
app.use('/api-docs', (req, res, next) => {
  const protectedMethods = ['POST', 'PUT', 'DELETE'];
  if (protectedMethods.includes(req.method)) {
    return isAuthenticated(req, res, next);
  }
  next();
}, swaggerUi.serve, swaggerUi.setup(swaggerFile));

// API routes
app.use('/api/temples', templeRouter);
app.use('/api/contacts', contactRouter);
app.use('/api/books', bookRouter);



// Connect to MongoDB and start server
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas');
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });


  // 404 fallback
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});