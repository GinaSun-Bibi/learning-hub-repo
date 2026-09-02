
$(document).ready(function(){


    let currentRole = "";

    $(".assignment-table").hide();
       $(".assignment-upload-button").on("click", function(){

        

        window.location.href="assignment.html";


    });

    fetch("./api/getcourselist.php")
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log("DATA: " +data);

        if(data.success===false)
            {
                console.log(data.message); 
            }

        const courseList = data.courses;
          

        courseList.forEach(function(eachCourse){

            $("#course-select-for-assignment-dropdown").append(`<option value="${eachCourse.id}">${eachCourse.course_name}</option>`);


        }); 


    })
    .catch(function(err)
    {
        console.error("Error: ", err); 
    }); 

fetch("./api/getuser.php")

.then(function(response)
{
    return response.json();
})

.then(function(data)
{
    console.log(data);

    currentRole=data.role;

    if (data.role === "teacher")
    {
        $(".teacher-only").show();
    }
})

.catch(function(error)
{
    console.error("Error: ", error);
});



 $("#confirm-button").on("click", function(){


    const courseId=$("#course-select-for-assignment-dropdown").val();
    if (!courseId)
    {
        $("#assignment-message").text("Please select a course first.");
        $(".assignment-table").hide();
        return;
    }

    fetch(`./api/getassignment.php?course_id=${courseId}`)
    .then(function(response){
        return response.json();
    })
    .then(function(data)
{
    console.log(data.assignments);

    const assignments = data.assignments;

    $("#uploaded-assignment-table").empty();

    if(assignments.length === 0)
    {
        $("#assignment-message").text(
            "No assignments are available for this course."
        );

        $(".assignment-table").hide();

        return;
    }

        $("#assignment-message").text("");
        $(".assignment-table").show();

        assignments.forEach(function(assignment){

            let submissionAction = "";

            if(currentRole ==="teacher")
                {
                    submissionAction = `
            <a href="submissions.html?assignment_id=${assignment.id}">
                VIEW SUBMISSIONS
            </a>
        `;

                }

            else
                {
                     submissionAction = `
            <a href="student-submit.html?assignment_id=${assignment.id}">
                SUBMIT ASSIGNMENT
            </a>
        `;
    }

                

    $("#uploaded-assignment-table").append(`
    <tr>
        <td>${assignment.assignment_name}</td>

        <td>${assignment.assignment_description || ""}</td>

        <td>
            <a href="/learning_web_design/${assignment.assignment_path}">
                VIEW ASSIGNMENT
            </a>
        </td>

        <td>
                ${submissionAction}
            </td>

    </tr>
`);

        }); 
    })
    .catch(function(error)
    {
        console.error("ERROR: ", error); 
    })


  });
}); 
