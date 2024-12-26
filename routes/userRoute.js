const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");

//signup route
router.get("/signup", (req, res) => {
    res.render("user/signup.ejs");
});

router.post("/signup", async (req, res) => {
    let { username, email, password } = req.body;
    let newuser = new User({ email, username });
    let registeredUser = await User.register(newuser, password);
    req.flash("success", "You are registered successfully!");
    res.redirect(`/user/${registeredUser._id}/resume`);
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
        res.locals.currUser = req.user;
        const id = res.locals.currUser._id;
        req.flash("success", "You are logged in!");
        res.redirect(`/user/${id}/resume`);
    }
);

//resume route
router.get("/:id/resume", (req, res) => {
    res.render("user/resume.ejs");
});
module.exports = router;
