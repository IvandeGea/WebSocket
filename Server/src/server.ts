

import express, { Request, Response, NextFunction } from 'express';
import session from 'express-session';
import passport from 'passport';
import './auth';
import connectDB from './db/dbconfig';
import { router as messageRouter } from './routes';



const app = express();
app.use(express.json());

connectDB();

function isLoggedIn(req: Request, res: Response, next: NextFunction) {
  req.user ? next() : res.sendStatus(401);
}

app.use(
  session({
    secret: 'cats',
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 60000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req: Request, res: Response) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
});

app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/auth/google/failure',
  })
);


app.get('/protected', isLoggedIn, async (req: Request, res: Response) => {});

app.get('/logout', (req: Request, res: Response) => {
  (req.logout as any)();
  req.session.destroy(() => {
    res.send('Goodbye!');
  });
});

app.get('/auth/google/failure', (req: Request, res: Response) => {
  res.send('Failed to authenticate..');
});



app.use('/messages', messageRouter);

app.listen(5173, () => console.log('listening on port: 5173'));


// const express = require('express');
// const session = require('express-session');
// const passport = require('passport');
// require('./auth');
// const connectDB = require('./db/dbconfig')
// const messageRoutes = require('./routes');

// const app = express();
// app.use(express.json());

// connectDB()


// function isLoggedIn(req, res, next) {
//   req.user ? next() : res.sendStatus(401);
// }

// app.use(session({ secret: 'cats', resave: false, saveUninitialized: true, cookie:{
//     secure: false,
//     maxAge: 60000
// }}));

// app.use(passport.initialize());
// app.use(passport.session());

// app.get('/', (req, res) => {
//   res.send('<a href="/auth/google">Authenticate with Google</a>');
// });

// app.get('/auth/google',
//   passport.authenticate('google', { scope: ['email', 'profile'] })
// );

// app.get('/auth/google/callback',
//   passport.authenticate('google', {
//     failureRedirect: '/auth/google/failure',
//   })
// );

// app.get('/protected', isLoggedIn, async (req, res) => {
   
//   });
  

// app.get('/logout', (req, res) => {
//   req.logout();
//   req.session.destroy();
//   res.send('Goodbye!');
// });

// app.get('/auth/google/failure', (req, res) => {
//   res.send('Failed to authenticate..');
// });

// app.use('/messages', messageRoutes);

// app.listen(5000, () => console.log('listening on port: 5000'));