const exp = require('express')
const app = exp()
const server = require('http').createServer(app)
const {Server} = require('socket.io')
const io = new Server(server)
const num = 5
io.setMaxListeners(2)

app.set('view engine', 'ejs')
app.use(exp.static(__dirname+'/public'))
app.get('/', (req, res) =>{
    res.render('home.ejs')
})



server.listen(4001, ()=>{
    console.log('http://localhost:4001')
})

// Socket io
io.on('connection', (s)=>{
    console.log('Connected by client..!', s.id)

    let room;
    s.on('roomName', (r)=>{
        s.join(r)
        room = r
        console.log("Room name is ", r)
    })
    
    
    
    s.on("msg", (m)=>{
        s.to(room).emit("msg", m)
    })
    
    
    s.on('disconnect', (e)=>{
        console.log(s.id, e)
    })
})



