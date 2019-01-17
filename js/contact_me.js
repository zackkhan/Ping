function randomIntFromInterval(min,max) // min and max included
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

$('#arrow').on("click", event => {
  $([document.documentElement, document.body]).animate({
          scrollTop: $("#family").offset().top
      }, 800);    
 })

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
           url: "https://pingpersonal-server.herokuapp.com/waitlist",
           // "https://newfriendserver.herokuapp.com/email",
           data: {email: $('#email').val()}, // serializes the form's elements.
           success: function(data){
            localStorage.setItem('waitlistData', JSON.stringify(data)); 
              console.log(data);
              window.location.href = "waitlist.html";           
          }
         });


    e.preventDefault(); // avoid to execute the actual submit of the form.
});