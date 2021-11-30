// Instantiate and setup Express app
const express = require("express");
const app = express();
const PORT = 5000;
app.use(express.json());
app.set("json spaces", 2);
app.use(express.static(__dirname + "/public")); // index.html is sent by default


// Start server once connected to database
const mongoose = require("mongoose");
const dbURI = "mongodb://localhost:27017/x_swim_team_db";
getConnection = async () => {
    try {
        await mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true});
        console.log("Connected to db...");
        app.listen(PORT, () => {
            console.log(`Server is listening on http://localhost:${PORT} ...`);
        });
    } catch (err) {
        console.log(err);
    }
};

getConnection();


// Import and setup middleware
const logger = require("./middleware/logger");
const authorize = require("./middleware/authorize");

app.use("/api", [logger, authorize]);


// Import and setup routes
const swimmer_routes = require("./routes/v1/swimmers/swimmers");
const coach_routes = require("./routes/v1/coaches/coaches");
const event_routes = require("./routes/v1/events/events")

app.use("/api/v1/swimmers", swimmer_routes);
app.use("/api/v1/coaches", coach_routes);
app.use("/api/v1/events", event_routes);
