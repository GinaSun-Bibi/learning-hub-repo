$(document).ready(function(){


 fetch("./api/getuser.php")

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

fetch("./api/getcourselist.php")
.then(function(response)
{
    return response.json();
})
.then(function(data)
{
    const courseLists = data.courses; 

    courseLists.forEach(function(courseList){

         $("#course-option").append(`<option value="${courseList.id}">${courseList.course_name}</option>`); 


    })

   
})
.catch(function(error){
    console.log("Error: " , error); 
})





$("#upload-button").on("click", function(){

    

    const fileName=$("#file-name").val().trim();
    if(fileName==="")
    {
        alert("Please enter your file name!");
        return;
    }
    const fileDescription=$("#file-description").val().trim(); 

    const selectedFile=$("#uploaded-file")[0].files[0];
    if(!selectedFile)
        {
            alert("Please upload your file!");
            return;
        }

    console.log(fileName);
    console.log(fileDescription);
    console.log(selectedFile);

const courseId=$("#course-option").val();
if(!courseId)
    {
        alert("Please select a course!"); 
        return;
    }

const formData= new FormData(); 

formData.append("course_id", courseId);
formData.append("file_name", fileName);
formData.append("file_description", fileDescription); 
formData.append("uploaded_file", selectedFile); 



fetch("./api/upload.php",
    {
       method: "POST",

       body: formData})

    .then(function(response){

            if(!response.ok)
                {
                    throw new Error("Server error: " + response.status); 
                }

            return response.json(); 
        })

        .then(function(data)
        {
            console.log(data);

            if(data.success===false)
                {
                    alert(data.message); 
                    return;
                }

            alert(data.message); 

        
           
        })

        .catch(function(error)
        {
            console.error("could not save the uploaded file!",
            error);


        })

        
    })






});






