$(document).ready(function()
{

    function changePermission(selectedRole)
    {

 if (selectedRole === "teacher") {
       $(".teacher-only").show();
        $("#create-course-button").show();
    } else {
        $(".teacher-only").hide();
        $("#create-course-button").hide();
    }



    }
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
    
     


    



    

    let courseList =[] ;

    function displayCourses(courses)


    {
        $("#class-list").empty();

        if(courses.length=== 0)
            {
                $("#class-list").text("No Courses Found!"); 
                return; 
            }


            


        courses.forEach(function(course, index)

        {
        
            const imageNumber=(index%7)+1; 

            
            $("#class-list").append(`
    <article class="course-card">

    <img
            src="images/${imageNumber}.jpg"
            alt="${course.course_name}"
            class="course-image"
            >

        <h2>${course.course_name}</h2>

        <p>
            ${course.course_description || ""}
        </p>

        <a href="resources.html?id=${course.id}">
            VIEW COURSE
        </a>

        <p><a href="view-assignment.html?id=${course.id}">
            VIEW ASSIGNMENTS
        </a></p>

    </article>
    `);

            });
        };




    $("#create-course-button").on("click", function(){

        window.location.href="createcourse.html"; 

    })

    fetch("/learning_web_design/api/getcourselist.php")
    .then(function(response)
    {
        return response.json(); 
    })
    .then(function(data)
    {
        console.log(data); 

        if (!data.success)
            {
                $("#class-list").text(data.message); 
                return;
            }

            courseList=data.courses; 

            displayCourses(courseList); 



    })

    .catch(function(error)
    {
        console.error("Error: ",error); 
    })



    $("#search-button").on("click", function(){

        const searchContent= $("#search-content").val().trim().toLowerCase();


        const filterCourse=courseList.filter(function(course)
        {
            const courseName= course.course_name.toLowerCase();
            const courseDescription = (course.course_description ||"").toLowerCase(); 

            return(courseName.includes(searchContent) || courseDescription.includes(searchContent)); 
        }); 

        displayCourses(filterCourse); 

        $("#go-back-button").show();
        


       
        $("#go-back-button").on("click", function(){
            displayCourses(courseList); 

            $("#search-content").val("");

            $("#go-back-button").hide();


        })



    }); 

});