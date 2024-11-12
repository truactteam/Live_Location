const express = require("express");
const app = express();
const path = require('path');

const http = require('http');

const socketio = require('socket.io');
const server = http.createServer(app);
const io = socketio(server);
let linkSer = "https://live-location-j139.onrender.com";
var PORT = linkSer ? linkSer : 3000;

io.on("connection", (socket)=>{
    console.log("Socket Connected", socket.id);

    socket.on("send-location", function(data){
        io.emit("receive-location", {id: socket.id, ...data});
    });
    socket.on("disconnect", function(){
        io.emit("user-disconnect", socket.id)
    });
})

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "Public")));

app.get('/',(req, res)=>{
    res.render("index");
})


server.listen(PORT , ()=>{
    console.log(`Server is Running a ${PORT}`);
});