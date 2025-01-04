const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const User = require("./models/user");

app.set("view engine", "ejs");
app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//mongoose set
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/perfectresume");
}
main()
    .then(() => {
        console.log("Connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });

//session
const sessionOptions = {
    secret: "mysupersecretcode",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};
app.use(session(sessionOptions));
app.use(flash());

//passport
app.use(passport.initialize());
app.use(passport.session());
// passport.use(
//     new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
//       try {
//         const user = await User.findOne({ email });
//         if (!user) {
//           return done(null, false, { message: 'No user found with this email.' });
//         }
  
//         user.authenticate(password, (err, user, info) => {
//           if (err) return done(err);
//           if (!user) return done(null, false, { message: info.message }); // Use info.message from passport-local-mongoose
//           return done(null, user);
//         });
//       } catch (err) {
//         return done(err);
//       }
//     })
//   );
passport.use(new LocalStrategy({usernameField : "email"},User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//local variables middleware
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

//routes
const userRoute = require("./routes/userRoute");
app.use("/user", userRoute);

//home route
app.get("/home", (req, res) => {
    res.render("home.ejs");
});

//import route
app.get("/home/resume/import", (req, res) => {
    res.render("import.ejs");
});

//edit route
app.get("/home/resume/edit", (req, res) => {
    const data = JSON.parse(req.query.data || "[]"); // Parse data from query string
    res.render("edit.ejs", { data }); // Pass `data` to the view
});

app.post("/upload-data", (req, res) => {
    const modifiedData = req.body; // The modified data sent from the client
    console.log("Received modified data:", modifiedData);

    if (!modifiedData || modifiedData.length === 0) {
        return res.status(400).json({ error: "No data received" }); // Return a 400 error if no data
    }

    // Here you could add logic to process/store the data if needed.

    // Send a proper JSON response with status 200
    res.status(200).json({
        message: "Data received successfully",
        data: modifiedData,
    });
});

app.listen(3000, () => {
    console.log("Server is listening to port 3000");
});
