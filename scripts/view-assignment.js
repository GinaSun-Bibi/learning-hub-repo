$(document).ready(function(){

    let currentRole ="";
    $(".assignment-table").hide();

fetch("/learning_web_design/api/getuser.php")

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

$("#view-assignment-button").on("click",function()
{
    window.location.href="assignment.html";
});

const parm = new URLSearchParams(window.location.search); 

const courseId = parm.get("id"); 


fetch(`/learning_web_design/api/getassignment.php?course_id=${courseId}`)
.then(function(response){
    return response.json();
})
.then(function(data)
{
    console.log(data); 

    const assignments = data.assignments; 

    if(assignments.length===0)
        {
            $("#assignment-message").text(
            "No assignments are available for this course."
        );

        $(".assignment-table").hide();

        return;
        }

    assignments.forEach(function(assignment)

    {

        let submissionAction="";
        if(currentRole === "teacher")
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
    })

    
})

.catch(function(error){
    console.error("Error: ", error)
}); 




});