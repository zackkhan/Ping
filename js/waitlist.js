var waitlistData = JSON.parse( localStorage.getItem('waitlistData'));
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