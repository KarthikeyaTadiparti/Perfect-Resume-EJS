const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Document = require("../models/document");
const passport = require("passport");
const { isLoggedIn } = require("../middleware");

//signup route
router.get("/signup", (req, res) => {
    res.render("user/signup.ejs");
});

router.post("/signup", async (req, res) => {
    let { username, email, password } = req.body;
    let newuser = new User({ email, username });
    let registeredUser = await User.register(newuser, password);
    req.login(registeredUser, (err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "You are registered successfully!");
        res.redirect(`/user/resume`);
    });
});

//login route
router.get("/login", (req, res) => {
    res.render("user/login.ejs");
});

router.post(
    "/login",
    passport.authenticate("local", {
        failureRedirect: "/user/login",
        failureFlash: true,
    }),
    (req, res) => {
        req.flash("success", "You are logged in!");
        res.redirect(`/user/resume`);
    }
);

//logout route
router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("error", "You are Logged out!");
        res.redirect("/home");
    });
});

//resume route
router.get("/resume", isLoggedIn, async (req, res) => {
    let user = res.locals.currUser;
    // console.log(user);
    let populatedUser = await user.populate("documents");
    // console.log(populatedUser);
    // console.log(populatedUser.documents);
    // console.log(populatedUser.documents.length);
    res.render("user/resume.ejs", { user: populatedUser });
});


//new resume 
router.get("/new",(req,res)=>{
    res.render("user/new.ejs");
});
module.exports = router;
