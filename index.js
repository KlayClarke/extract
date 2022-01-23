if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const ejsMate = require("ejs-mate");
const path = require("path");
const axios = require("axios").default;
const app = express();

const apiHost = process.env.YTMP3APIHOST;
const apiKey = process.env.YTMP3APIKEY;

console.log(apiHost);
console.log(apiKey);

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("home");
});

app.post("/convert", (req, res) => {
  const { id } = req.body;
  const options = {
    method: "GET",
    url: "https://youtube-to-mp32.p.rapidapi.com/api/yt_to_mp3",
    params: { video_id: id },
    headers: {
      "x-rapidapi-host": process.env.YTMP3APIHOST,
      "x-rapidapi-key": process.env.YTMP3APIKEY,
    },
  };

  axios
    .request(options)
    .then(function (response) {
      const { data, status } = response;
      if (status === 200) {
        return res.render("response", {
          success: true,
          message: "Audio Successfully Extracted",
          title: data.Title,
          link: data.Download_url,
        });
      } else {
        return res.render("response", {
          success: false,
          message: "Audio Extraction Error - Please Try Again",
        });
      }
    })
    .catch(function (error) {
      console.error(error);
    });
});

app.listen(3000, () => {
  console.log("Serving on Port 3000");
});
