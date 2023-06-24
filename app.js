import express from 'express';

const app = express();

import dotenv from 'dotenv';

import User from './models/userSchema.js';

import flash from 'connect-flash'

dotenv.config();

import { connectDB } from './config/db.js';

connectDB();

import session from 'express-session'

import MongoStore from 'connect-mongo';

app.use(flash())
//middleware
app.use(session({
    secret: 'foo',
    store: MongoStore.create({
        mongoUrl : 'mongodb://127.0.0.1:27017/blog',
        collectionName  : 'sessions'
    })
}));

app.use((req, res, next) => {
    res.locals.error = req.flash('error');
    res.locals.msg = req.flash('msg');
    next()
})

//middleware
app.use(async (req, res, next) => {
    if(!req.session.user){
        res.locals.isLoggedIn = false
        next();
    }else{
      const user = await User.findById({_id : req.session.user._id});
      req.session.user = user;
      res.locals.isLoggedIn = true
      next();
    }
});

import UserRoutes from './routes/userRoutes.js';

import BlogRoutes from './routes/blogRoutes.js'

app.use(express.json());

app.use(express.urlencoded());

app.set('view engine', "ejs");

const PORT = process.env.PORT || 8080;

app.use(UserRoutes);

app.use(BlogRoutes);

app.listen(PORT, () => {
    console.log(`server is runing on port ${PORT}`);
})

