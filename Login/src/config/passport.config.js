import passport from 'passport';
import local from 'passport-local';
import userModel from '../daos/models/user.model.js';
import hashBcrypt from '../utils/hashBcrypt.js';

import GithubStrategy from 'passport-github2'

const { createHash, isValidPassword } = hashBcrypt;


const LocalStrategy = local.Strategy;

const initializePassport = () => {
    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    }, async (req, username, password, done) => {
        const { first_name, last_name, email } = req.body;
        try {
            let user = await userModel.findOne({ email });

            if (user) return done(null, false);

            let newUser = {
                first_name,
                last_name,
                email,
                password: createHash(password)
            };

            let result = await userModel.create(newUser);

            return done(null, result);
        } catch (error) {
            return done(error);
        }

    }));

    passport.use('login', new LocalStrategy({
        usernameField: 'email'
    }, async (username, password, done) => {
        try {
            const user = await userModel.findOne({ email: username });
            if (!user) {
                console.log('user no encontrado');
                return done(null, false);
            }
            if (!isValidPassword(password, user.password)) return done(null, false);
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });
    passport.deserializeUser(async (id, done) => {
        let user = await userModel.findById({ _id: id });
        done(null, user);
    });




    passport.use('github', new GithubStrategy({
        clientID:'Iv1.694d43cd849336ab',
        clientSecret: '1f8a7c0d4f39bf908dc2c21058bae18e3f5f8527',
        callbackURL: 'http://localhost:8080/api/sessions/githubcallback'
    }, async (accessToken, refreshToken, profile, done)=>{
        console.log('profile: ', profile)
        try {
                let user = await userModel.findOne({email: profile._json.email})
                if (!user) {
                    let newUser = {
                        first_name: profile._json.name,
                        last_name: profile._json.name,
                        email: profile._json.email,
                        password: ''
                    }

                    let result = await userModel.create(newUser)
                    return done(null, result)
                }

                return done(null, user)
        } catch (error) {
            done(error)
        }
    }));



};

export default initializePassport;