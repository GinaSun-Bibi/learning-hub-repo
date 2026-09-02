$(document).ready(function(){
$(".content-table").hide();
$("#content-button").on("click", function(){
    window.location.href="upload.html";
})

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
    console.log(data);

    const courseList = data.courses; 

    courseList.forEach(function(eachCourse){

        $("#course-select-for-content-dropdown").append(`<option value="${eachCourse.id}">${eachCourse.course_name}</option>`); 

    })
})
.catch(function(error){
    console.error("Error: ", error); 
})





$("#confirm-button").on("click", function(){

    const courseId = $("#course-select-for-content-dropdown").val();

    if (!courseId)
    {
        $("#content-message").text("Please select a course first.");
        $(".content-table").hide();
        return;
    }
    console.log(courseId); 

    fetch(`./api/getlist.php?course_id=${courseId}`)
    .then(function(response){
        return response.json();
    })
    .then(function(data)
    {
        if(data.success ===false)
            {
                console.log(data.message); 
                return;
            }



        const contents= data.uploads; 
  $("#uploaded-content-list").empty();
        if(contents.length === 0)
            {
                $("#content-message").text("No files are available for this course."); 
                $(".content-table").hide();

                return;
            }

$("#content-message").text("");
        $(".content-table").show();
    
       

        contents.forEach(function(content)
        {
            $("#uploaded-content-list").append(`
                
                <tr>
                <td>${content.file_name}</td>
                <td>${content.file_description || ""}</td>
                <td>
                   <a href="/learning_web_design/${content.file_path}">VIEW CONTENT</a>
                </td>
                </tr>
                
                `);
        });



    })







})



})
