$(document).ready(function()
{
const chatbotData=[
    
    {
        keywords:["hello", "hi"],
        answer: "Hello! How are you?"
    }, 
    {keywords: ["fine", "good"],
        answer: "Good to hear!"
    },

    {
    keywords:["upload", "file", "document"], 
    answer: "To upload a file, please go to the upload page and select your file."
    },


    {
    keywords:["login", "sign in", "password"], 
    answer: "For login issue, please contact your program administrator."
    },

    {
    keywords:["format", "file type", "type"], 
    answer: "The Learning Hub currently accepts PDF, Word, and image files."
    },
]; 

$("#chatbot-button").on("click", function()
{
    const userQuestions = $("#chatbot-message").val().trim();

    if(userQuestions==="")
        {
            return;
        }
    const botAnswer=findAnswer(userQuestions); 

    function findAnswer(userQuestions)
    {
        const normalizeQuestions= userQuestions.toLowerCase(); 

        let matchedAnswer = null; 

        chatbotData.forEach(function(data)
        {
            const foundKeyWord=data.keywords.some(function(keyword){

                return normalizeQuestions.includes(keyword); 
            }); 

            if(foundKeyWord && matchedAnswer ===null)
                {
                    matchedAnswer= data.answer;
                }
        }); 

        if(matchedAnswer!==null)
            {
                return matchedAnswer;
            }
        else
            {
                return "I don't have the answer to your question, please contact your system admin!"; 
            }
    }

    $("#chatbot-conversation").append(`<div class="chat-message user-message"><img class= "bot-image" src="images/you.jpg">: ${userQuestions}</div>
<div class="chat-message user-message"><img class= "bot-image" src="images/bot.jpg">: ${botAnswer}</div>`); 
    $("#chatbot-message").val(""); 

})

}); 