const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.engine("ejs", ejsMate);

//home route
app.get("/home",(req,res)=>{
    res.render("home.ejs");
});

//resume route
app.get("/home/resume",(req,res)=>{
    res.render("resume.ejs");
});

//import route
app.get("/home/resume/import",(req,res)=>{
    res.render("import.ejs");
});

//edit route
app.get("/home/resume/edit", (req, res) => {
    const data = JSON.parse(req.query.data || "[]"); // Parse data from query string
    res.render("edit.ejs", { data }); // Pass `data` to the view
});

app.post('/upload-data', (req, res) => {
    const modifiedData = req.body; // The modified data sent from the client
    console.log("Received modified data:", modifiedData);

    if (!modifiedData || modifiedData.length === 0) {
        return res.status(400).json({ error: 'No data received' }); // Return a 400 error if no data
    }

    // Here you could add logic to process/store the data if needed.

    // Send a proper JSON response with status 200
    res.status(200).json({
        message: 'Data received successfully',
        data: modifiedData
    });
});


app.listen(3000,()=>{
    console.log("Server is listening to port 3000");
});