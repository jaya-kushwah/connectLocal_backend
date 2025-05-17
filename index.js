const express = require("express");
const app = express();
const PORT = 8080;
const cors = require('cors');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));


// app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: '*',
    credentials: true
}));
var path = require('path');
app.use("/event/upload", express.static(path.join(__dirname, 'upload')));
app.use("/user/upload", express.static(path.join(__dirname, 'upload')));
const dbConnection = require("./Database/dbConnection");
const userRouter = require("./Routes/userRoutes");
const groupRouter = require("./Routes/groupRoutes");
const eventRouter = require("./Routes/eventRoutes");
const eventTrendRouter = require("./Routes/eventTrendRoutes");
const eventCardRouter = require("./Routes/eventCardRouts");
const adminRoutes = require("./Routes/AdminRoutes");
const AdminUserCrud = require('./Routes/AdminCrud');
const AdminEvent = require("./Routes/AdminEvent");
const newAnnounced = require("./Routes/NewsRoutes");


dbConnection();
app.use("/user", userRouter);
app.use("/group", groupRouter);
app.use("/event", eventRouter);
app.use("/trend", eventTrendRouter);
app.use("/card", eventCardRouter);
app.use("/admin", adminRoutes);
app.use("/adminCrud", AdminUserCrud);
app.use("/adminEvent", AdminEvent)
app.use("/news", newAnnounced)




app.listen(PORT, () => {
    console.log((`listening on Port:${PORT}`));
})