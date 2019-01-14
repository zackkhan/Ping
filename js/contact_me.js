function randomIntFromInterval(min,max) // min and max included
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

var superman_array = ["friend", "husband", "wife", "father", "son", "uncle", "human", "aunt"]

  setInterval(function(){
    var superman_string =  superman_array[randomIntFromInterval(0,superman_array.length -1 )]
    $("#thing").text(superman_string)
    $("#superman_text").fadeIn();
   }, 1200);

   $("#email-form").submit(function(e) {
    var form = $(this);
    // var url = form.attr('action');
    $.ajax({
           type: "POST",
           url: "https://newfriendserver.herokuapp.com/email",
           data: {email: $('#email').val()}, // serializes the form's elements.
           success: function(data)
           {
              alert("Your email has been added to the list! We'll reach out when our beta is ready :)"); // show response from the php script.
           }
         });


    e.preventDefault(); // avoid to execute the actual submit of the form.
});