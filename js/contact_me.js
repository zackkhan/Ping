$.urlParam = function(name){
	var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null) {
        return null
    } else 
    return results[1] || 0;
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

$(document).ready(function() {
    var code = $.urlParam('code');
    if (code){
        localStorage.setItem('code', code);     
        console.log(code)
    }
})

function randomIntFromInterval(min,max) // min and max included
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

$('#arrow').on("click", event => {
  $([document.documentElement, document.body]).animate({
          scrollTop: $("#family").offset().top
      }, 800);    
 })

var superman_array = ["friend", "co-worker", "husband", "wife", "father", "son", "uncle", "human", "aunt"]
var header_array = ["\"Love you\" text to Grandma that will make her day ❤️", "\"Coffee?\" text to your co-worker that will uncover a shared interested in salsa 💃", "\"Movie night?\" text to your old friend that will rekindle past memories 🍿"]
var quoteIndex = 0;
    
function showNextQuote() {
    if (quoteIndex == header_array.length){
        quoteIndex = 0;
    } 
    var header_string =  header_array[quoteIndex]
    $("#header-tag").text(header_string)
    $("#header-tag")
        .fadeIn(2000)
        .delay(1200)
        .fadeOut(2000, showNextQuote);
    quoteIndex++; 
}

showNextQuote();
   
var superman_quote_index = 0;
function showNextSupermanQuote() {

if (superman_quote_index == superman_array.length){
    superman_quote_index = 0;
} 
var superman_string = superman_array[superman_quote_index]
$("#thing").text(superman_string)
$("#thing")
    .fadeIn(1700)
    .delay(1200)
    .fadeOut(1300, showNextSupermanQuote);
    superman_quote_index++; 
}
showNextSupermanQuote();

jQuery.ajaxSetup({
    beforeSend: function() {
        $('#loader').text("Loading...");
       $('#loader').show();
    },
    complete: function(){
       $('#loader').hide();
    },
    success: function() {}
  });

  $("#submit-button").click(function(){
      console.log("button clicked")
      var email = $('#emailblue').val();
      var referrerCode = $.urlParam('code');
      if (validateEmail(email) && referrerCode != null){
        $.ajax({
            type: "POST",
            url: "https://pingpersonal-server.herokuapp.com/referral",
            //"https://pingpersonal-server.herokuapp.com/referral",
            // "https://newfriendserver.herokuapp.com/email",
            data: {referralCode: referrerCode, email: email }, 
            success: function(data){
                console.log("SUCCESSS");
                // debugger;
                $.ajax({
                    type: "POST",
                    url: "https://pingpersonal-server.herokuapp.com/waitlist",
                    // "https://pingpersonal-server.herokuapp.com/waitlist",
                    // "https://newfriendserver.herokuapp.com/email",
                    data: {email: $('#emailblue').val()}, // serializes the form's elements.
                    success: function(data){
                    console.log(data);
                    // debugger;
                    localStorage.setItem('waitlistData', JSON.stringify(data)); 
                        console.log(data);
                        window.location.href = "waitlist.html";           
                    }
                    });        
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log("ERROR");
                // debugger;
                alert("This email is invalid. Please try another email!")
              }
            });
      }  else if (validateEmail(email) && referrerCode == null) {
        $.ajax({
            type: "POST",
            url: "https://pingpersonal-server.herokuapp.com/waitlist",
            // "https://pingpersonal-server.herokuapp.com/waitlist",
            // "https://newfriendserver.herokuapp.com/email",
            data: {email: $('#emailblue').val()}, // serializes the form's elements.
            success: function(data){
            console.log(data);
            // debugger;
            localStorage.setItem('waitlistData', JSON.stringify(data)); 
                console.log(data);
                window.location.href = "waitlist.html";           
            }
            });  
     } else {
          alert("Please enter a valid email address")
      }

  })
$("#email-form").submit(function(e) {
e.preventDefault(); // avoid to execute the actual submit of the form.
});