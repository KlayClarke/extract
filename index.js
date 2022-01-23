if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const ejsMate = require("ejs-mate");
const path = require("path");
const axios = require("axios").default;
const app = express();

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("home");
});

app.post("/convert", (req, res) => {
  const options = {
    method: "GET",
    url: "https://youtube-to-mp32.p.rapidapi.com/api/yt_to_mp3",
    params: { video_id: "edPREMPZ5RA" },
    headers: {
      "x-rapidapi-host": process.env.YTMP3APIHOST,
      "x-rapidapi-key": process.env.YTMP3APIKEYgit,
    },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
});

app.listen(3000, () => {
  console.log("Serving on Port 3000");
});
