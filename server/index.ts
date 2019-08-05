import express from "express";

const app = express();
const PORT = 3000;
app.get("/api/hello", (req, res) => {
  console.log(`req recieved: ${req.url}`);
  res.send("hello");
});
app.listen(PORT, () => {
  console.log(`now listening on port ${PORT}`);
});
