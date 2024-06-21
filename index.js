import express from 'express';
import bodyParser from 'body-parser';
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const artList = [];
let currentDate;

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

app.get("/", (req, res) => {
  res.render("index.ejs", { artList: artList, currentDate: currentDate });
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

app.post("/delete", (req, res) => {
  const postToDel = req.body.postId; 
  artList.splice(postToDel, 1);
  res.redirect("/");

});

app.get("/edit/:id", (req, res) => {
  const postId = req.params.id;
  const post = artList[postId];
  res.render("edit-blog.ejs", { post: post, postId: postId });
});

app.post("/edit/:id", (req, res) => {
  const postId = req.params.id;
  const { atitle, acontent } = req.body;
  artList[postId].title = capitalizeFirstLetter(atitle);
  artList[postId].content = capitalizeFirstLetter(acontent);
  artList[postId].date = new Date().toLocaleString();
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);

});
