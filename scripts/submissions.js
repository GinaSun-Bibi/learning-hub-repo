$(document).ready(function()
{
    const params = new URLSearchParams(window.location.search);

    const assignmentId = params.get("assignment_id");

    $(".assignment-table").hide();

    if (!assignmentId)
    {
        $("#submission-message").text("Invalid assignment.");
        return;
    }

    fetch(`./api/getsubmissions.php?assignment_id=${assignmentId}`)

    .then(function(response)
    {
        return response.json();
    })

    .then(function(data)
    {
        console.log(data);

        if (data.success === false)
        {
            $("#submission-message").text(data.message);
            return;
        }

        const submissions = data.submissions;

        if (submissions.length === 0)
        {
            $("#submission-message").text(
                "No student submissions are available for this assignment."
            );

            return;
        }

        $("#submission-message").text("");

        $(".assignment-table").show();

        submissions.forEach(function(submission)
        {
            $("#submission-table-body").append(`
                <tr>

                    <td>${submission.username}</td>

                    <td>${submission.assignment_name_submit}</td>

                    <td>
                        <a href="/learning_web_design/${submission.submit_path}">
                            VIEW SUBMISSION
                        </a>
                    </td>

                </tr>
            `);
        });
    })

    .catch(function(error)
    {
        console.error("ERROR: ", error);
    });

});
