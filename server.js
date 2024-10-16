const express = require("express");
const errorhandler = require("./middleware/errorhandler");
const dotenv = require("dotenv").config();
const contactsRouter = require("./routes/contactRoutes");
const userRouter = require("./routes/userRoutes");
const connectDb = require("./config/dbconnection");

connectDb();  // Ensure the DB connection is working

const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON data
app.use(express.json());

// Test routes
app.use("/api/contacts", contactsRouter);
app.use("/api/users", userRouter);

// Error handler middleware after routes
app.use(errorhandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
