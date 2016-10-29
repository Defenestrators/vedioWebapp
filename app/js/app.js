$("document").ready(function(){

sinchClient = new SinchClient({
    applicationKey: "b73cbeb6-61a1-45e5-80b3-f80c19f5fb92",
    capabilities: {calling: true, video: true},
    supportActiveConnection: true,
    onLogMessage: function(message) {
        console.log(message.message);
    },
});


var callClient;
var call;

$("#login").on("click", function (event) {
    event.preventDefault();
    var signUpObj = {};
    signUpObj.username = $("input#username").val();
    signUpObj.password = $("input#password").val();
    sinchClient.start(signUpObj, afterStartSinchClient());          
});




});