$(document).ready(function(){

function changePermission(selectedRole)
    {

 if (selectedRole === "teacher") {
       $(".teacher-only").show();

    } else {
        $(".teacher-only").hide();
        
    }



    }
    fetch("./api/getuser.php")

    .then(function(response)
    {
        return response.json();
    })

    .then(function(data)
    {
        console.log(data); 

        {
            if (data.role==="teacher")
                {
       $(".teacher-only").show();
        
    } else 
        
        {
        $(".teacher-only").hide();
       
    }
        }; 

    
    })
    .catch(function(error)
    {
        console.error("Error: ", error); 
    })


    $("#role-selector").on("change", function(){


            const selectedRole=$(this).val();
            changePermission(selectedRole);

    })




    $("#new-course-submit-button").on("click", function()
    {
    
        const newCourseName=$("#new-course-name").val().trim();

        console.log(newCourseName);
        const newCourseDescription= $("#new-course-description").val().trim(); 
        console.log(newCourseDescription);

        if(newCourseName==="")
            {
                alert("Please enter a valid course name!"); 
                return;
            }

        fetch("./api/createcourse.php", 
            
            {method:"POST",
            headers: {"Content-Type":"application/json"},
            body:JSON.stringify ({
                "course name": newCourseName,
                "course description": newCourseDescription
            })
            })
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data)

            if(data.success)
                {
                     $("#create-result").text("Course Created Successfully!");
                    setTimeout(function(){
                     window.location.href="index.html";

                    },2000)   
                  
                }
            else
                {
                    $("#create-result").text("Course Created Failed!");
                }
        })
        .catch(function(error){

            console.error("Error: ",error); 
        })

    })


})
