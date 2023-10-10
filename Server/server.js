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
    successRedirect: '/process-authentication',
    failureRedirect: '/auth/google/failure'
  })
);

app.get('/process-authentication', isLoggedIn, (req, res) => {
    // Imprimir el objeto de perfil de Google en la consola
    console.log('Perfil de Google:', req.user);
  
    // Verificar si la propiedad 'emails' existe y tiene elementos
    if (req.user && req.user.emails && req.user.emails.length > 0) {
      // Crear un nuevo usuario y guardarlo en MongoDB
      const newUser = new User({
        googleId: req.user.id,
        displayName: req.user.displayName,
        email: req.user.email,
        // Otros campos según necesidades
      });
  
      newUser.save()
        .then(() => {
          console.log('Usuario guardado correctamente en MongoDB');
          // Redirigir a la página principal u otra página
          res.redirect('/');
        })
        .catch((err) => {
          console.error('Error al guardar el usuario en MongoDB:', err);
          // Redirigir a una página de error
          res.redirect('/error');
        });
    } else {
      console.error('No se puede obtener la dirección de correo electrónico del perfil de Google');
      // Redirigir a una página de error o de solicitud de correo electrónico
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
