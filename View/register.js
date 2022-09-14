function Ispartof(colors,color){
    for(let i = 0;i<colors.length;i++){
        if(color == colors[i]){
            return true;
        }
    }
    return false;
}

async function register(){
    let a = document.getElementById("username").value
    let b = document.getElementById("password").value
    if (a == "" || b == ""){
        document.getElementById("response").innerHTML = "Not valid username or password"
        document.getElementById("username").value = ""
    document.getElementById("password").value = ""
        return
    }
    if(a.length < 3 || a.length > 25 ||b.length < 3 || b.length > 25){
        document.getElementById("response").innerHTML = "Username or password is too short or too long limit : 3-25 characters"
        document.getElementById("username").value = ""
    document.getElementById("password").value = ""
        return
    }
    let colors = ["red","blue","green","yellow","orange","grey","white","purple","brown","cornflowerblue"]
    let color = document.getElementById("color").value
    if(!Ispartof(colors,color)){
        color = "red"
    }

    const data = {
        username:document.getElementById("username").value,
    password:document.getElementById("password").value,
    color:color
}
    
    
    document.getElementById("username").value = ""
    document.getElementById("password").value = ""
    document.getElementById("color").value = ""
    let options = {
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    }
    let response = await fetch("/register",options)
    const info = await response.json()
    document.getElementById("response").innerHTML = info.message
}
