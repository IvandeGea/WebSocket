

import express, { Request, Response, NextFunction} from 'express';
import session from 'express-session';
import passport from 'passport';
import './auth';
import connectDB from './db/dbconfig';
import { router as messageRouter } from './routes';
import cors from "cors"
import cookieParser from 'cookie-parser';
import http from "http";
import { Server as SocketIOServer, Socket } from 'socket.io';
import { isLoggedIn } from './middleware';

const app = express();

const server = http.createServer(app); // Crea un servidor HTTP usando express

const corsOptions = {
  origin: 'http://localhost:5173',  
  credentials: true,
};

const io = new SocketIOServer(server, {
  cors: {
    origin: '*',
    credentials: true,
  },
});

app.use(cors(corsOptions));
app.use(express.json());

connectDB();

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

// app.get('/logout',isLoggedIn,(req: Request, res: Response) => {
//   (req.logout as any)();
//   req.session.destroy(() => {
//     res.send('Goodbye!');
//   });
// });

app.get('/auth/google/failure', (req: Request, res: Response) => {
  res.send('Failed to authenticate..');
});

app.use('/', messageRouter);

app.use((req, res, next) => {
  res.redirect('http://localhost:5173');
});


app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

io.on('connection', (socket: Socket) => {
  console.log('Usuario conectado:', socket.id);

  // Escucha el evento 'message' y emite el mensaje a todos los clientes
  socket.on('message', (data) => {
    console.log('Nuevo mensaje:', data);
    io.emit('message', data); // Aquí envía tanto el texto como el nombre de usuario
  });

  // Maneja la desconexión del usuario
  socket.on('disconnect', () => {
    console.log('Usuario desconectado:', socket.id);
  });
});

server.listen(3001, () => console.log('listening on port: 3001'));

