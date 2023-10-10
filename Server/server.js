const express = require('express');
const session = require('express-session');
const passport = require('passport');
require('./auth');
const User = require('./db/userSchema');
const connectDB = require('./db/dbconfig')

const app = express();
connectDB()

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
  })
);

app.get('/protected', isLoggedIn, (req, res) => {
    // Imprime el objeto completo del usuario en la consola
    console.log('Usuario autenticado en /protected:', req.user);
  
    // Verifica si la propiedad 'email' existe en el objeto 'req.user'
    if (req.user && req.user.email) {
      // Accede a la dirección de correo electrónico
      const userEmail = req.user.email;
      res.send(`Hello ${req.user.displayName}~${userEmail}`);
    } else {
      console.error('No se puede obtener la dirección de correo electrónico del perfil de Google');
      // Redirige a una página de error o de solicitud de correo electrónico
      res.redirect('/auth/email-required');
    }
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
