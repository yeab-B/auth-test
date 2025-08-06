const express = require("express");
const app = express();
const userRouters = require("./routes/userRoutes");

app.use(express.json());
app.use("/users", userRouters);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Your app is running on Port: ${PORT}`);
});