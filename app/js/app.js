$("document").ready(function(){

sinchClient = new SinchClient({
    applicationKey: "b73cbeb6-61a1-45e5-80b3-f80c19f5fb92",
    capabilities: {calling: true, video: true},
    supportActiveConnection: true,
    onLogMessage: function(message) {
        console.log(message);
    },
});
var callClient;
var call;

$("#login").on("click", function (event) {
    event.preventDefault();
    var signUpObj = {};
    signUpObj.username = $("input#username").val();
    signUpObj.password = $("input#password").val();
    sinchClient.start(signUpObj, afterStartSinchClient(signUpObj));
});

$("#directsignup").on('click',function(event){
  event.preventDefault();
  $("form#authForm").css("display", "none");
  $("form#createsignup").css("display", "inline");
});

$("#signup").on("click", function (event) {
    event.preventDefault();

    var signUpObj = {};
    signUpObj.username = $("input#createsername").val();
    signUpObj.password = $("input#createpassword").val();
    console.log(signUpObj);
    $("form#createsignup").css("display", "none");
    $("form#authForm").css("display", "inline");
    sinchClient.newUser(signUpObj)
      .then(sinchClient.start.bind(sinchClient))
      .then(() => console.log('hello'))
      .fail(() => console.log('goodbye'))
});

function afterStartSinchClient(currentObj) {
    // hide auth form
    $("form#authForm").css("display", "none");
    $("form#createsignup").css("display", "none");
    // show logged-in view
    $("div#sinch").css("display", "inline");

    console.log(currentObj);
    $('div#sinch').prepend('<p>Welcome! '+currentObj.username+'</p>');
    // start listening for incoming calls
    sinchClient.startActiveConnection();
    // define call client (to handle incoming/outgoing calls)
    callClient = sinchClient.getCallClient();
    //initialize media streams, asks for microphone & video permission
    callClient.initStream();
    //what to do when there is an incoming call
    console.log('incomingCallListener'.incomingCallListener);
    callClient.addEventListener(incomingCallListener);
}
var incomingCallListener = {
    onIncomingCall: function(incomingCall) {
        $("div#status").append("<div>Incoming Call</div>");
        call = incomingCall;
        call.addEventListener(callListeners);
    }
}
var callListeners = {
    //call is "ringing"
    onCallProgressing: function(call) {
        $("div#status").append("<div>Ringing</div>");
    },
    //they picked up the call!
    onCallEstablished: function(call) {
        $("div#status").append("<div>Call established</div>");
        $("video#outgoing").attr("src", call.outgoingStreamURL);
        $("video#incoming").attr("src", call.incomingStreamURL);
    },
    //ended by either party
    onCallEnded: function(call) {
        $("div#status").append("<div>Call ended</div>");
        $("video#outgoing").attr("src", "");
        $("video#incoming").attr("src", "");
        call = null;
    }
}

$("#call").on("click", function (event) {
    event.preventDefault();
    if (!call) {
        usernameToCall = $("input#usernameToCall").val()
        $("div#status").append("<div>Calling " + usernameToCall + "</div>");
        call = callClient.callUser(usernameToCall);
        call.addEventListener(callListeners);
        }
});
$("#answer").click(function(event) {
    event.preventDefault();
    if (call) {
        $("div#status").append("<div>You answered the call</div>");
           call.answer();
    }
});
$("#hangup").click(function(event) {
    event.preventDefault();
    if (call) {
        $("div#status").append("<div>You hung up the call</div>");
        call.hangup();
        call = null
    }
});
});
