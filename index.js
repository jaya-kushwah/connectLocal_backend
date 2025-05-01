const express = require("express");
const app  = express();
const PORT = 8080;
const cors = require('cors');
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// your routes here...

app.use(express.json());  // ✅ Add this
app.use(cors());
var path = require('path');
// app.use("/uploads", express.static("uploads"));  // ✅ Add this
app.use("/event/upload", express.static(path.join(__dirname, 'upload')));
const dbConnection = require("./Database/dbConnection");
const userRouter =  require("./Routes/userRoutes");
const groupRouter =  require("./Routes/groupRoutes");
const eventRouter =  require("./Routes/eventRoutes");
const eventTrendRouter =  require("./Routes/eventTrendRoutes");
const eventCardRouter =  require("./Routes/eventCardRouts");
const adminRoutes = require("./Routes/AdminRoutes");
const AdminUserCrud = require('./Routes/AdminCrud');
const AdminEvent = require("./Routes/AdminEvent");

dbConnection();
app.use("/user",userRouter);
app.use("/group",groupRouter);
app.use("/event",eventRouter);
app.use("/trend",eventTrendRouter);
app.use("/card",eventCardRouter);
app.use("/admin",adminRoutes);
app.use("/adminCrud",AdminUserCrud);
app.use("/adminEvent",AdminEvent)




app.listen(PORT,()=>{
    console.log((`listening on Port:${PORT}`));
    
})