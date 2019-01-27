var waitlistData = null;
$("#shareMobile").hide();
$.urlParam = function(name){
	var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null) {
        return null
    } else 
    return results[1] || 0;
}

function setPage() {
    $("#position").text(waitlistData.position.toString());
    var link = "https://getping.co/?code=" + waitlistData.referralCode;
    $("#referralLink").text(link);
    $("#referralLink").attr('href', link);
    $("#copy").click(function(){
        alert("Copied to clipboard!")
        copyToClipboard("#referralLink");
    })
    $("#facebook_url").attr("href", `https://www.facebook.com/sharer/sharer.php?u=https%3A//getping.co/` + '?code=' + waitlistData.referralCode)
    $("#linkedin_url").attr("href", `https://www.linkedin.com/shareArticle?mini=true&url=https%3A//getping.co/&title=Improve%20your%20relationships&summary=Ping%20helps%20you%20manage%20your%20relationships!%20Sign%20up%20at%20https%3A//getping.co/` + '?code=' + waitlistData.referralCode)
    $("#twitter_url").attr("href", `https://twitter.com/home?status=Improve%20your%20relationships%20with%20Ping!%20%0ASign%20up%20at%20https%3A//getping.co/` + '?code=' + waitlistData.referralCode)
    $("#email_url").attr("href", `mailto:?&subject=Check out Ping!&body=Ping%20helps%20you%20manage%20your%20relationships!%20Sign%20up%20at%20https%3A//getping.co/`+ '?code=' + waitlistData.referralCode)
    
    var mobile_os = getMobileOperatingSystem()
    if (mobile_os == "Android"){
        $("#shareMobile").show();
        $("#shareMobile").prop('href', "sms:?body=Improve your personal relationships with Ping. Reimagine relationships at " + link);
    } else if (mobile_os == "iOS"){
        $("#shareMobile").show();
        $("#shareMobile").prop('href', "sms:&body=Improve your personal relationships with Ping. Reimagine relationships at " + link)
    } else {
    }
}

var code = $.urlParam('code')
if (code != null){
    // console.log(code);
$.ajax({
        type: "POST",
        url: "https://pingpersonal-server.herokuapp.com/getwaitlist",
        //"https://pingpersonal-server.herokuapp.com/referral",
        // "https://newfriendserver.herokuapp.com/email",
        data: {referralCode: code }, 
        success: function(data){ 
            // console.log(data);   
            waitlistData = data;
            setPage();
        }, 
        error: function (xhr, ajaxOptions, thrownError) {
            alert("This code is invalid. Please check the code again!")
          }
        });
    
} else {
    waitlistData = JSON.parse( localStorage.getItem('waitlistData'));
    setPage();
}
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
// console.log("hello");
// console.log(waitlistData);

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




