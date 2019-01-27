var waitlistData = JSON.parse( localStorage.getItem('waitlistData'));
var referrerCode = localStorage.getItem('code');
if (referrerCode != null){
    // $.ajax({
    //     type: "POST",
    //     url: "https://83314d77.ngrok.io/referral",
    //     //"https://pingpersonal-server.herokuapp.com/referral",
    //     // "https://newfriendserver.herokuapp.com/email",
    //     data: {referralCode: referrerCode, email: waitlistData.email }, 
    //     success: function(data){        
    //     }
    //     });
    // increment all positions of people after the referrer
}
console.log("hello");
console.log(waitlistData);
$("#position").text(waitlistData.position.toString());
var link = "https://getping.co/personal?code=" + waitlistData.referralCode;
$("#referralLink").text(link);
$("#referralLink").attr('href', link);
$("#copy").click(function(){
    alert("Copied to clipboard!")
    copyToClipboard("#referralLink");
})


function copyToClipboard(element) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(element).text()).select();
    document.execCommand("copy");
    $temp.remove();
  }

function getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
      if (/windows phone/i.test(userAgent)) {
          return "Windows Phone";
      }
      if (/android/i.test(userAgent)) {
          return "Android";
      }
      if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
          return "iOS";
      }
  
      return "unknown";
}
var mobile_os = getMobileOperatingSystem()

if (mobile_os == "Android"){
    $("#shareMobile").prop('href', "sms:?body=Improve your personal relationships with Ping. Reimagine relationships at " + link);
} else if (mobile_os == "iOS"){
    $("#shareMobile").prop('href', "sms:&body=Improve your personal relationships with Ping. Reimagine relationships at " + link)
}

$(document).ready(function() {
// do the 

})