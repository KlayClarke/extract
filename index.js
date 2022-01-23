if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const fs = require("fs");
const express = require("express");
const ejsMate = require("ejs-mate");
const cloudinary = require("cloudinary").v2;
const cors = require("cors");
const path = require("path");
const ytdl = require("ytdl-core");
const ffmpeg = require("ffmpeg");
const app = express();

// app.use(cors());

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

app.get("/", async (req, res) => {
  res.render("home");
});

app.post("/convert", cors(), (req, res) => {
  const { url, filename } = req.body;
  try {
    ytdl(url).pipe(fs.createWriteStream(`${filename}.mp4`));
    res.render("response", {
      success: true,
      message: "Extraction Successful",
      title: "title",
      link: "link",
    });
  } catch (e) {
    res.render("response", {
      success: false,
      message: "Extraction Failed",
    });
  }
});

app.listen(3000, () => {
  console.log("Serving on Port 3000");
});
