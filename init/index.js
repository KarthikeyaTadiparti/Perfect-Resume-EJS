const mongoose = require("mongoose");
const data = require("./data.js");
const Document = require("../models/document.js");
const User = require("../models/user.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/perfectresume";

main()
    .then(() => {
        console.log("connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}

async function initData() {
    // console.log(data.data);
    // await Document.insertMany(data.data);

    let resume1 = await Document.findById('6778de0973b59f07aa0e53d3');
    console.log(resume1);
    let resume2 = await Document.findById('6778de0973b59f07aa0e53d4');
    console.log(resume2);

    const userId = '6778f56d940f85225219addd';
    const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
            $set: { documents: [resume1._id,resume2._id] },
        },
        { new: true } 
    );
    console.log("Updated User:", updatedUser);
}

initData();
