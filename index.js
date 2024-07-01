var container = document.getElementById('container');
const registerBtn = document.getElementById('register');

const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click',()=>{
    container.classList.add("active");
});
loginBtn.addEventListener('click',()=>{
    container.classList.remove("active");
});


//-------------------------------------------------------------------

var rName = document.getElementById("rName");
var rEmail = document.getElementById("rEmail");
var rPassword = document.getElementById("rPassword");

var signUpBtn = document.getElementById("sign-up");
var signInBtn = document.getElementById("sign-in");

var passwordAlert = document.getElementById("passwordAlert")
var nameAlert = document.getElementById("nameAlert")
var emailAlert = document.getElementById("emailAlert")
var loginAlert = document.getElementById("loginAlert")

var rNameAlert = document.getElementById("rNameAlert")
var rEmailAlert = document.getElementById("rEmailAlert")

var lEmail = document.getElementById("lEmail");
var lPassword = document.getElementById("lPassword");

let users = JSON.parse(localStorage.getItem("users")) || [];


signUpBtn.addEventListener('click',()=>{
    if(validate(rName,nameAlert)&&validate(rEmail,emailAlert)&&validate(rPassword,passwordAlert)){
        if (checkForRepeatedUser(rName,rNameAlert,"userName")&&checkForRepeatedUser(rEmail,rEmailAlert,"userEmail")) {
            var user = {
                userName: rName.value,
                userEmail: rEmail.value,
                userPassword: rPassword.value,
            }
            users.push(user);
            localStorage.setItem("users",JSON.stringify(users));
            resetFormRegister();
            rName.classList.remove("is-valid");
            rPassword.classList.remove("is-valid");
            rEmail.classList.remove("is-valid");
    
            swal({
                icon: "success",
                text: "Registered Successfully!",
    
            });
            container.classList.remove("active");
    
    
        }

    }



});
rName.addEventListener('input', () => validate(rName, nameAlert) && checkForRepeatedUser(rName, rNameAlert, 'userName'));
rEmail.addEventListener('input', () => validate(rEmail, emailAlert) && checkForRepeatedUser(rEmail, rEmailAlert, 'userEmail'));
lEmail.addEventListener('input', () => validate(lEmail, emailAlert));
rPassword.addEventListener('input', () => validate(rPassword,passwordAlert));



function resetFormRegister(){
    rName.value = "";
    rEmail.value = "";
    rPassword.value = "";
}
function resetFormLogin(){
    lEmail.value = "";
    lPassword.value = "";
}

function checkForRepeatedUser(input,alert,field){
    var isDuplicate = users.some(user => user[field] === input.value);

    if (isDuplicate) {
        if (alert) {
            alert.hidden = false;
            input.classList.add("is-invalid")
            input.classList.remove("is-valid")

        }
        return false;
    } else {
        if (alert) {
            alert.hidden = true;

        }
        input.classList.add("is-valid")
        input.classList.remove("is-invalid")

        return true;
    }

}
function validate(input , alert){
    var regex = {
        rName: /^[a-bA-z]{3,}[^\n\s]$/g,
        rEmail: /^[a-zA-z0-9]{3,}@{1}(gmail|yahoo){1}\.(com){1}$/,
        lEmail: /^[a-zA-z0-9]{3,}@{1}(gmail|yahoo){1}\.(com){1}$/,
        rPassword: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};:'",.<>?/\\|`~]).+$/
    }
    if(regex[input.id].test(input.value)){
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");

        if (alert) {
            alert.hidden = true;
        
        }

        return true;
    }else{

        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
        if (alert) {
            alert.hidden = false;
            setTimeout(() => {
                alert.hidden = true;
            }, 3000);
        }
        return false;
    }
    
}
//------------------------------
signInBtn.addEventListener("click",()=>logIn());
function logIn(){
    if(validate(lEmail)){
        var isExist = users.some((user => user["userEmail"] === lEmail.value && user["userPassword"] === lPassword.value));
        if (isExist) {
            swal({
                icon: "success",
                text: "logged in successfully"
            });
            
            resetFormLogin();
            window.open("./home.html",'_self');
            loginAlert.hidden = true;
        }else{
            loginAlert.hidden = false;
        }
    }

}
var toggleLoginPassword = document.querySelector("#toggleLoginPassword");
var toggleRegisterPassword =  document.querySelector("#toggleRegisterPassword"); 

toggleLoginPassword.addEventListener("click" , ()=>{
    if (lPassword.type == "password") {
        toggleLoginPassword.classList.remove("fa-eye-slash");
        toggleLoginPassword.classList.add("fa-eye");
        lPassword.type = "text";
    }else{
        toggleLoginPassword.classList.add("fa-eye-slash");
        toggleLoginPassword.classList.remove("fa-eye");
        lPassword.type = "password";
    }

});

toggleRegisterPassword.addEventListener("click" , ()=>{
    if (rPassword.type == "password") {
        toggleRegisterPassword.classList.remove("fa-eye-slash");
        toggleRegisterPassword.classList.add("fa-eye");
        rPassword.type = "text";
    }else{
        toggleRegisterPassword.classList.add("fa-eye-slash");
        toggleRegisterPassword.classList.remove("fa-eye");
        rPassword.type = "password";
    }

});


