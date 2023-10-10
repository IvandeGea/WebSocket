const express = require('express');
const session = require('express-session');
const passport = require('passport');
require('./auth');
const User = require('./db/userSchema');

const app = express();

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/protected',
    failureRedirect: '/auth/google/failure'
  }),
  (req, res) => {
    // Crear un nuevo usuario y guardarlo en MongoDB
    const newUser = new User({
      googleId: req.user.id,
      displayName: req.user.displayName,
      // Otros campos según necesidades
    });

    newUser.save((err) => {
      if (err) {
        console.error('Error al guardar el usuario en MongoDB:', err);
      } else {
        console.log('Usuario guardado correctamente en MongoDB');
      }
    });

    // Redirigir a la página principal u otra página
    res.redirect('/');
  }
);

app.get('/protected', isLoggedIn, (req, res) => {
  res.send(`Hello ${req.user.displayName}~${req.user.id}`);
});

app.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('Goodbye!');
});

app.get('/auth/google/failure', (req, res) => {
  res.send('Failed to authenticate..');
});

app.listen(5000, () => console.log('listening on port: 5000'));
