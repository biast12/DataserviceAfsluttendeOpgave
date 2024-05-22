const express = require("express");
const app = express();
require("dotenv").config();

// APP
const cors = require("cors");
app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static("public"));

// DB Mongo and Mongoose
const mongoose = require("mongoose");

// Get username and password from command line arguments
// let username = process.argv[2];
// let password = process.argv[3];

// Connect to the database and start the server when the connection is established
mongoose
  // "mongodb+srv://<username>:<password>@<username>.qy2fjmj.mongodb.net/dataserviceDB"
  // `mongodb+srv://${username}:${password}@${username}.${process.env.DB_CODE}.mongodb.net/${process.env.DB_NAME}`
  // `mongosh "mongodb+srv://${username}.${process.env.DB_CODE}.mongodb.net/" --apiVersion 1 --username ${username}`
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () => {
      console.clear();
      console.log(`Server running on: http://localhost:${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Server endpoint: http://localhost:8081
app.get("/", async (req, res) => {
  console.log("GET request to the server endpoint");
  res.status(200).json({
    message: "Velkommen til serverens endpoint",
  });
});

//  ROUTES -------------------------------------------
app.use("/aboutus", require("./routes/aboutus.routes"));
app.use("/contacts", require("./routes/contact.routes"));
app.use("/reviews", require("./routes/reviews.routes"));
app.use("/services", require("./routes/services.routes"));
app.use("/galleryitems", require("./routes/galleryitems.routes"));
app.use("/toast", require("./routes/toast.routes"));
app.use("/contactform", require("./routes/contactform.routes"));
app.use("/login", require("./routes/login.routes"));
app.use("/users", require("./routes/users.routes"));

// Error
app.use((req, res) => {
  res.status(404).json({
    ERROR: "Page Not Found - 404",
  });
});
