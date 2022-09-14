let tedhena;
let personal;
let device = "pc"

function setmobile (){
    if (document.getElementById("bt").checked){
        device = "mobile"
    }
}



function clearHtml(){
    document.getElementById("username").remove()
    document.getElementById("password").remove()
    document.getElementById("response").remove()
    document.getElementById("btn").remove()
    document.getElementById("login").remove()
    document.getElementById("a").remove()
    document.getElementById("bt").remove()
    document.getElementById("box").remove()
}
async function login(){
    if (document.getElementById("username").value == "" || document.getElementById("password").value == ""){
        return
    }
    const data = {
        username:document.getElementById("username").value,
    password:document.getElementById("password").value
}
    
    
    document.getElementById("username").value = ""
    document.getElementById("password").value = ""
    let options = {
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    }
    let response = await fetch("/login",options)
    const info = await response.json()
    if(info.message === "Wrong username or password"){
    document.getElementById("response").style.color = "red"
    document.getElementById("response").innerHTML = info.message

}
else{
    personal = data    
    document.getElementById("response").style.color = "green"
    document.getElementById("response").innerHTML = info.message
    if(info.condition){
        tedhena = info
        setmobile()
        setTimeout(clearHtml,1000)
        setTimeout(startGame,1000)
    }
}
}





async function send(object){
        let options = {
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(object)
        }
        let response = await fetch("/score",options)
        const info = await response.json()
        console.log(info.message)
}




function startGame(){
document.body.style.backgroundColor = "grey"
let canvas = document.getElementById("canvas")
canvas.style.backgroundColor = "black"
let c = canvas.getContext("2d")
const gamewidth = 495
const gameheight = 495
let score = 0;
let highscore = 0;
if (tedhena != null){
highscore = tedhena.score
}
let tail = []
let len = tail.length
let dong = ""
let tempx;
let tempy;
let have_lost = false
function cube (px,py){
    this.px = px 
    this.py = py
    this.r = 20
    this.temppx;
    this.temppy
    this.color="green"
    this.show = function(){
        c.beginPath()
        c.fillStyle = this.color
        c.fillRect(this.px,this.py,this.r,this.r)
        c.stroke()
        c.closePath()
    }  
    this.followHead = function(){
        this.px = tempx
        this.py = tempy
    }
    this.point = function(){
        this.temppx = this.px
        this.temppy = this.py
    }
    

}

class Snake{
    constructor(px,py){
        this.px = px
        this.py =py 
        this.r = 20
        this.xvel = 0
        this.yvel = 0
        this.d = "none"
    }
    show(){
        c.beginPath()
        c.fillStyle = tedhena.color
        c.fillRect(this.px,this.py,this.r,this.r)
        c.stroke()
        c.closePath()
    }
    move(){
this.px += this.xvel
this.py += this.yvel
    }
    grow(){
       if(dong == "right"){
        tail.push(new cube (me.px-25,me.py))
       }
       else if(dong == "left"){
        tail.push(new cube (me.px+25,me.py))
       }
       else if(dong == "up"){
        tail.push(new cube (me.px,me.py+25))
    }
    else if(dong == "down"){
        tail.push(new cube (me.px,me.py-25))
    }

    }
    dir(direction){
        if(direction == "left" ){
            this.d = "left"
            this.xvel = -25
            this.yvel = 0
        }
        else if(direction == "up"){
            this.d = "up"
            this.yvel =-25
            this.xvel = 0
        }
        else if(direction == "right"){
            this.d = "right"
            this.xvel =25
            this.yvel = 0
        }
        else if(direction == "down"){
            this.d = "down"
            this.yvel =25
            this.xvel = 0
        }
        else {
            this.xvel = 0
            this.yvel = 0
        }

    }
}


let me = new Snake(0,0)
tail.push(me)
let food  = {
px: parseInt(Math.random()*10)*50,
py :parseInt(Math.random()*10)*50,
r: 20,

show:function(){
        c.beginPath()
        c.fillStyle = "blue"
        c.fillRect(this.px,this.py,this.r,this.r)
        c.stroke()
        c.closePath()
},
movefood:function(){
    for (let j = 1;j<len+1;j++){
        try{
            while (true){
            if (tail[j].px == this.px && tail[j].py == this.py){
                this.px = parseInt(Math.random()*10)*50
                this.py = parseInt(Math.random()*10)*50
            }
            else {
                break
            }
            }
        }
        catch{
        }
    }
},
eaten:function(){
if(this.px == me.px&& this.py == me.py){
this.px = parseInt(Math.random()*10)*50
this.py = parseInt(Math.random()*10)*50
score++
if(score == 2){
    me.grow()
}
this.movefood()
me.grow()
}
},
}
len = tail.length
console.log(len)


function cover_me(){
    if(len >= 2 ){
    tempx = me.px
    tempy = me.py 
    }
}

function restart (){
for (var o = 0 ;o<len-1;o++){
    tail.pop()
}
len = tail.length
me.px = 0
me.py = 0
me.dir("")
if(score > highscore ){
highscore = score
personal.score  = highscore 
send(personal)
}
score = 0
have_lost = true
me.d = ""
//c.fillText("Game Over",230,230)

}
function showall(){
    for (let j = 1;j<len+1;j++){  
        try {
         tail[j].show()
         tail[1].followHead()
         tail[j].point()
         for(let y = 1 ;y<len;y++){
             try{
                 if(me.px == tail[j].px&&me.py == tail[j].py){
                     console.log(me.px)
                     console.log(me.py)
                     console.log(tail[j].px)
                     console.log(tail[j].py)

                     restart()
                 }
             }
             catch{}
         }
        
        len = tail.length

        }
        catch{}
    }
}
function chase (){
    for(let i = 1;i<len;i++){
        len = tail.length
        try{
        tail[i+1].px = tail[i].temppx
        tail[i+1].py = tail[i].temppy
        }
        catch{}

}
}


function out_of_grid(){
    if(me.px <0){
        me.px = 475
        
    }
else if( me.px + me.r >gamewidth){
me.px = 0

}
else if(me.py < 0){
    me.py = 475
    
}
else if(me.py+me.r > gameheight){
    me.py = 0

}

}



function display_text(){
    if(have_lost == true&&me.d == "" ){
        c.beginPath()
        c.font = "30px Arial"
        c.fillText("Game Over",170,230)
        c.closePath()
    }
}


if(device == "mobile"){
    d1 = document.createElement("div")
    d2 = document.createElement("div")
    d3 = document.createElement("div")
    d1.style.backgroundColor = "grey"
    d2.style.backgroundColor = "green"
    d3.style.backgroundColor = "red"
    d1.innerHTML = "UP"
    d2.innerHTML = "LEFT                    RIGHT"
    d3.innerHTML = "DOWN"
    document.getElementById("all").appendChild(d1)
    document.getElementById("all").appendChild(d2)
    document.getElementById("all").appendChild(d3)
    d1.style.height = "150px"
    d2.style.height = "150px"
    d3.style.height = "150px"
    d1.addEventListener("touchstart",e=>{
        me.dir("up")
        dong = "up"
    })
    d2.addEventListener("touchstart",e=>{
    
    if(e.touches[0].clientX < innerWidth/2){
        me.dir("left")
        dong = "left"
    }
    else{
        me.dir("right")
        dong = "right"   
    }
    
    })
    d3.addEventListener("touchstart",e=>{
        me.dir("down")
        dong = "down"
    })
}


function loop(){
    
 c.clearRect(0,0,gamewidth,gameheight) 
 document.getElementById("score").innerHTML = "Score : "+score
 document.getElementById("highscore").innerHTML = "HighScore : "+highscore
 me.show()  
 me.move()
food.show()
chase()
showall()
out_of_grid()
cover_me()
food.eaten()
display_text()

}
document.addEventListener("keydown",function(key){
    if (key.keyCode == 37){
        me.dir("left")
        dong = "left"
    }
    else if (key.keyCode == 38){
        me.dir("up")
        dong = "up"
    }
    else if (key.keyCode == 39){
        me.dir("right")
        dong = "right"
    }
    else if (key.keyCode == 40){
        me.dir("down")
        dong = "down"
    }
},true)
setInterval(loop,1000/10)
}