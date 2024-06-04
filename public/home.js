
const btn = document.querySelector('button')
const cont = document.querySelector('.content')
const inp = document.querySelector('input')
const room = prompt("Enter room name")
const sock = io();
sock.emit("roomName", room)

sock.on('connect', ()=>{
    console.log("Server is online!")
})


sock.on('disconnect', ()=>{
    console.log("Server is offline!")
})

sock.on("msg", (m)=>{
    const newEle = document.createElement('div')
    newEle.classList.add('reciver')
    newEle.innerText = m
    cont.append(newEle)
})


// Webpage functionalities
function addSender()
{
    const newEle = document.createElement('div')
    newEle.classList.add('send')
    newEle.innerText = inp.value
    cont.append(newEle)
    sock.emit('msg', inp.value)
    inp.value = ''
    document.querySelector('.content').scrollTo(0, document.querySelector('.content').scrollHeight)
}

function enter(e)
{
    if(e.key == 'Enter')
        {
            if(inp.value != ''| inp.value != ' ')
            {
                addSender()
                inp.value = ''        
            }
        }
}


document.querySelector('#menu').addEventListener('click', ()=>{
    const mb = document.querySelector('.menuBar')
    console.log("Rakesh")

    gsap.to(".menuBar", {
        x: 0, 
        opacity: 1
    })

    
})

document.querySelector(".mclose").addEventListener("click", ()=>{
    gsap.to(".menuBar", {
        x: 200,
        opacity: 0
    })
})