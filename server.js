const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
require("./routes/apiRoutes.js")(app);
require("./routes/htmlRoutes.js")(app);

// Sets up the Express app to handle data parsing


app.listen(PORT, () => {
  console.log("App listening on PORT " + PORT);
});