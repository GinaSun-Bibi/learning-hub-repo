$(document).ready(function(){


fetch("/learning_web_design/api/getcourselist.php")
    .then(function(response)
    {
        return response.json(); 
    })
    .then(function(data)
    {
        console.log(data); 

        const courseLists = data.courses; 

        courseLists.forEach(function(courseList){

            $("#assignment-dropdown").append(`<option value="${courseList.id}"> ${courseList.course_name}</option>`); 


        }); 
    })
    .catch(function(error){


        console.error("Error: ", error);
    })



$("#assignment-button").on("click", function(){

    const assignmentName= $("#assignment-name").val().trim();

    if(assignmentName==="")
        {
            alert("Please enter the name of the assignment!");
            return; 
        }

    const assignmentDescription = $("#assignment-description").val().trim();

    const assignmentUploads= $("#assignment-file-upload")[0].files[0]; 
    if(!assignmentUploads)
        {
            alert("Please upload an file!"); 
            return;
        }

    const courseId = $("#assignment-dropdown").val();

    if(!courseId)
        {
            alert("Please select a course!"); 
            return;
        }

    const formData= new FormData()
    {
        formData.append("course_id",courseId);
        formData.append("assignment_name", assignmentName);
        formData.append("assignment_description", assignmentDescription);
        formData.append("assignment_file", assignmentUploads); 
        


    }

    

    fetch("/learning_web_design/api/assignment.php", {method:"POST", body:formData})
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data); 

        if(data.success === false)
            {
                alert(data.message); 
                return;
            }

        else
            {
                alert(data.message); 
            }
    })
    .catch(function(error){
        console.error("Error: ", error);
    })

    
    


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




})
























})