import User from "../models/userSchema.js";

import bcrypt from 'bcryptjs'

export const getSignUp = async (req, res) => {
    res.render('register')

}

export const postSignup = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
        req.flash('error','Fill all fields');
        res.redirect('/signup')
    }

    const existingEmail = await User.findOne({ email: email });

    if (existingEmail) {
        req.flash('error','user already exist with this email');
        res.redirect('/signup')
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
        firstName,
        email,
        lastName,
        password: hashedPassword
    });

    await user.save();

    res.redirect('/')
   

}

export const getLogin = (req, res) => {
    res.render('login')
}

export const postLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        req.flash('error','Fill all fields');
        res.redirect('/login')
    }

    const user = await User.findOne({ email: email });

    if (!user) {
        req.flash('error', 'user not available');
        res.redirect('/login')
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword) {
     req.flash('error', 'Invalid credentials');
     return res.redirect('/login')
    }
    req.session.user = user;
    res.locals.isLoggedIn = true;
    req.flash('msg','Login successfull');
    res.redirect('/')
}


export const isLoggedout = async(req,res,)=>{
    res.locals.isLoggedin = false;
    req.session.user='';
    req.flash('error', 'user logout')
    res.redirect('/login')
}




