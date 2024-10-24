
require('dotenv').config()
const express = require('express')
const http = require('http')
const path = require('path')


const socketio = require('socket.io')

const PORT = process.env.PORT || 8000;
const app = express()

const server = http.createServer(app)

const io = socketio(server)


io.on("connection",function(socket){
    socket.on('send-location', function(data){
        io.emit('receive-location',{id: socket.id, ...data})
    })

    socket.on("disconnect",function(){
        io.emit('user-disconnected', socket.id)
    })
    
})

//ejs
app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "public")))

app.get('/', function (req, res){
    res.render("index")
})


server.listen(PORT, ()=>{
    console.log(`Server is running at ${PORT}`);
    
})