import express from 'express';

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));


app.listen(port, (err) => {
    if (err) console.log(err);
    console.log(`Listening on port ${port}`);
  });