$(document).ready(function () {

    function changePermission(role)
    {
        if (role==="teacher")
            {
                $(".teacher-only, #create-course-button").show();

            }
        else
            {
                $(".teacher-only, #create-course-button").hide();
            }
    }

    changePermission("student");
    
        $("#role-select").on("change", function(){

            const selectedRole=$(this).val();

            changePermission(selectedRole); 

        })

$("#login-form").on("submit", function(event){

console.log("form submitted");
event.preventDefault();


const userName=$("#user-name-login").val().trim(); 

if (userName==="")
    {
        alert("You must eneter a valid username!");
        return;
    }
const password=$("#user-password").val();

if (password==="")
    {
        alert("Please enter your password!");
        return;
    }




fetch("/learning_web_design/api/login.php", 
    {method: "POST",

    headers:{"Content-Type": "application/json"},
    body: JSON.stringify({
        "username": userName,
        "password": password

    }),
    })


.then(function(response){

    return response.json();
})
.then(function(data){
    console.log(data);


    if(data.success){
        $("#login-result").text("login successfully!"); 
       setTimeout(function(){
        window.location.href="index.html"
       },1000); 

    }
    else
        {
         $("#login-result").text("login failed!")   
        }


    if(data.loggedIn)
        {
            console.log(data.username);
            $("#welcome-message").text(data.username + " , welcome!")
        }
})
.catch(function(error){


    console.error("cannot log you in",error);
})


})


})
