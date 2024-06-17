import express from 'express';
import bodyParser from 'body-parser';
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

function deletePost(index) {
  artList.splice(index, 1);
}

const artList = [];
let currentDate;

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

app.get("/", (req, res) => {
  res.render("index.ejs", { artList: artList, currentDate: currentDate, postId: artList.length });
});

app.get("/write", (req, res) => {
  if (!currentDate) {
    currentDate = new Date().toLocaleString();
  }
  res.render("write-blog.ejs");
});

app.post("/submit", (req, res) => {
  const { atitle, acontent } = req.body;
  const newArt = {
    title: capitalizeFirstLetter(atitle),
    content: capitalizeFirstLetter(acontent),
    date: new Date().toLocaleString(),
    id: artList.length,
  };
  artList.push(newArt);
  res.redirect("/");
});



app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
