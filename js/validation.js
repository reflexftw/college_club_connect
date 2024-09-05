const form = document.getElementById('form');
const emailEl = document.getElementById('email');
const passEl = document.getElementById('password');
const siginBtn = document.getElementById('btn_signin');
const emailErrMsg = document.getElementById('email-msg')
const passErrMsg = document.getElementById('pw-msg');
const cpassEl = document.getElementById('cpassword');
let isValid = true;


// form.addEventListener('submit',(e)=>{
//     // console.log(emailEl.value);
//     if(validation()){
//         form.submit();
//     }else{

//         e.preventDefault();
//     }
// });

emailEl.addEventListener('input', function(){
    emailValidation();
});

cpassEl.addEventListener('input', ()=>passwordValidation())
const validation =()=>{

    //email validation
    emailValidation();
    
    passwordValidation();
}


function emailValidation(){
    const emailPattern = /^[A-Za-z0-9._%+-]+@eemc\.edu\.np$/;
    const email = emailEl.value.trim();
    if(!email.match(emailPattern)){
        emailEl.style.border = '2px solid red'
        emailErrMsg.innerHTML = 'Please enter a valid email'
        emailErrMsg.style.cssText = `
            color: red;
            font-size: 14;
            font-style: italic;
        ` 
        isValid = false;
    }
    else{
        emailEl.style.border ='2px solid green';
        emailErrMsg.innerHTML = '';

    }
    return isValid;
}

function passwordValidation(){
    const password = passEl.value;
    const cpassword = cpassEl.value;

    if (password === "") {
        isValid= false;
    } else if (cpassword === "") {
        isValid = false;
    } else if (password!==cpassword) {
        cpassEl.style.border ='2px solid red';
        isValid = false
    }
    else{
        passEl.style.border ='2px solid green';
        cpassEl.style.border ='2px solid green';

    }
    return isValid;
}
