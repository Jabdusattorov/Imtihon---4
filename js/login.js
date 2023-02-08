if(localStorage.getItem("token")){
    window.location.replace("./page/index.html")
}

const emailInp = document.querySelector("#email")
const passwordInp = document.querySelector("#password")
const loginBtn = document.querySelector(".login")

const forgot = document.querySelector("#forgot")

loginBtn.addEventListener("click", function () {
    let email = emailInp.value
    let password = passwordInp.value
    console.log(emailInp.value);
    console.log(passwordInp.value);
    login(email, password)
    if(email == "" && password == ""){
        alert("Enter Email and Password")
    }
})

async function login(email, password){
    let responsive = await fetch("https://reqres.in/api/login", {
        method: "POST",
        headers:{
            "Content-type": "application/json ; chrset=UTF-8" 
        },
        body: JSON.stringify({
            email: email,
            password: password,
        })
    })
    let data = await responsive.json()
    console.log(data);
    if(data.token){
        localStorage.setItem("token", JSON.stringify(data.token))
        window.location.replace("./page/index.html")
    }
}

forgot.addEventListener("click", ()=>{
    alert(`
    Email: eve.holt@reqres.in
    Password: cityslicka`)
})

// eve.holt@reqres.in