const express = require("express");
const { connect } = require("mongoose");
const app = express();

app.use(express.json());

connect(
  "mongodb+srv://rohit_sonawane:SuperSu@cluster0.e9hjfiy.mongodb.net/assignmentAgri"
)
  .then(() => console.log("MONGODB connected"))
  .catch((err) => console.log(err));
app.get("/", (req, res) => {
  res.json({ message: "hii" });
});

const port = 8000;
app.listen(port, () => console.log(`listning on port ${port}`));
