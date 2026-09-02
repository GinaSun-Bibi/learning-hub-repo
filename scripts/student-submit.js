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

$("#submit-button").on("click", function(){

    const submitName = $("#submit-name").val().trim(); 

    if(submitName==="")
        {
            alert("Please enter your assignment name!");
            return;
        }


    const uploadedSubmit = $("#assignment-submit-upload")[0].files[0]; 

    if(!uploadedSubmit)
        {
            alert("please submit a file!"); 
            return;
        }

    const params= new URLSearchParams(window.location.search); 

    const assignmentId = params.get("assignment_id"); 

        const formData = new FormData();
        

        formData.append("submit_name", submitName); 
        formData.append("submit_upload", uploadedSubmit); 
        formData.append("assignment_id", assignmentId); 


        




 fetch("./api/student-submit.php",

 {
       method: "POST",

       body: formData
    
})

.then(function(response){
    console.log("response status:", response.status);
    return response.json();
})
.then(function(data){

    console.log(data);
    if(data.success===false)
        {
            console.log(data.message); 
            return;
        }
    else
        {
            alert("Your assingmnet is submitted successfully!");
        }
})
.catch(function(error){
    console.error("Error: ", error); 
})



});


})

