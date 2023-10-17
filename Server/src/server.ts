

import express, { Request, Response, NextFunction } from 'express';
import session from 'express-session';
import passport from 'passport';
import './auth';
import connectDB from './db/dbconfig';
import { router as messageRouter } from './routes';
import cors from "cors"
import cookieParser from 'cookie-parser';


const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

app.use(express.json());

connectDB();

// function isLoggedIn(req: Request, res: Response, next: NextFunction) {
//   req.user ? next() : res.sendStatus(401);
// }

app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(cookieParser());

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
    successRedirect: 'http://localhost:5173/chat',
    failureRedirect: '/auth/google/failure',
  })
);



app.get('/logout', (req: Request, res: Response) => {
  (req.logout as any)();
  req.session.destroy(() => {
    res.send('Goodbye!');
  });
});

app.get('/auth/google/failure', (req: Request, res: Response) => {
  res.send('Failed to authenticate..');
});

app.use('/', messageRouter);

const server= app.listen(3001, () => console.log('listening on port: 3001'));

const io = require('socket.io')(server,{
  pingTimeout: 60000,
  cors: {
    origin: 'http://localhost:3001',
  },
});

io.on('connection', (socket: any) => {
  console.log('Connected to socket.io');
}
);