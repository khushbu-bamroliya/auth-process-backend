
import User from "./model/user.js"
import {Strategy as GoogleStrategy} from 'passport-google-oauth20'

function InitializingPassport(passport) {

    passport.serializeUser((user,done)=>{
        done(null,user.id)
    })

    passport.deserializeUser((id,done)=>{
        User.findById(id).then((user)=>{
            done(null,user)
        })
    })

    passport.use(new GoogleStrategy({
        clientID: "215950262724-otb5brjq9au76f9gigg222sf1m53scfn.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "/auth/google/callback"
    },
        function (accessToken, refreshToken, profile, done) {
            console.log('**',profile._json)
            User.findOne({googleId:profile.id})
            .then((existingUser)=>{
                if(existingUser){
                    done(null,existingUser)
                }else{
                    new User({googleId:profile.id,
                        name:profile.displayName,
                        email:profile._json.email
                    }).save()
                    .then((user)=>{
                        done(null,user)
                    })
                }
            })

           

            // User.findOrCreate({ googleId: profile.id }, function (err, user) {
            //     return cb(err, user);
            // });
        }
    ));

}
export default InitializingPassport