$(document).ready(function(){

  fetch("/learning_web_design/api/getuser.php")

.then(function(response)
{
    return response.json();
})

.then(function(data)
{
    console.log(data);

    if (data.role === "teacher")
    {
        $(".teacher-only").show();
    }
})

.catch(function(error)
{
    console.error("Error: ", error);
});

    $("#role-selector").on("change", function(){


            const selectedRole=$(this).val();
            changePermission(selectedRole);

    })
    
    
     

 const parm=new URLSearchParams(window.location.search); 

 const courseId = parm.get("id"); 


 if(!courseId)
    {
        $("#uploaded-file-list").text("Please select a course!"); 

        return;
    }
fetch("/learning_web_design/api/getList.php?course_id=" + courseId)
.then(function(response){

    return response.json();
})

.then(function(data){
    console.log(data);

     if (!data.success) 
        {
        
            return;
        }

    const uploads= data.uploads;

      if (uploads.length === 0) 
        {
            $(".content-table").text(
                "No files are available for this course."
            );
            return;
        }

    uploads.forEach(function(upload)
    {
        $("#uploaded-content-list").append(`
                
                <tr>
                <td>${upload.file_name}</td>
                <td>${upload.file_description || ""}</td>
                <td>
                   <a href="/learning_web_design/${upload.file_path}">VIEW CONTENT</a>
                </td>
                </tr>
                
                `);
    }); 

})
.catch(function(error)
{
    console.error("Error: ", error); 
})





$("#content-button").on("click", function(){

    
window.location.href="upload.html"; });




















    $("#logout-button").on("click", function(){
        fetch("learning_web_design/api/logout.php")
        .then(function(response){

            return response.json(); 
        })

        .then(function(data){
            console.log(data);

            if(data.success){
                window.location.href="login.html"; 

            }

            else
                {
                    alert("Cannot log you out now!")
                }

        })

        .catch(function(error){

            console.error("Error: ", error); 
        })
    })






})