// Initialize Firebase
var config = {
    apiKey: "AIzaSyCZeJxfEtNYoFftiwMbWAU_88acO3OP0lY",
    authDomain: "friendconnection-82d07.firebaseapp.com",
    databaseURL: "https://friendconnection-82d07.firebaseio.com",
    projectId: "friendconnection-82d07",
    storageBucket: "friendconnection-82d07.appspot.com",
    messagingSenderId: "902948237808"
};
firebase.initializeApp(config);

function googleAuth() {
    var provider = new firebase.auth.GoogleAuthProvider();

    console.log("google auth begun...")
    firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;

        // console.log("USER: " + JSON.stringify(user));

        var name = user.displayName;
        var photoURL = user.photoURL;

        sessionStorage.setItem("userName", name)
        sessionStorage.setItem("photoURL", photoURL)

        console.log("userName: " + name);
        console.log("photoURL: " + photoURL);

        // redirect to survey page
        toSurvey();
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;

        console.log("ERROR\n")
        console.log("Error Message\n" + errorMessage + "\n\n")
        console.log("Error Code\n" + errorCode + "\n\n")
        console.log("Error Email\n" + email + "\n\n")
        console.log("Error Credential\n" + credential + "\n\n")

        // $("#login-error").show();
        // ...
    });
}

function facebookAuth() {
    var provider = new firebase.auth.FacebookAuthProvider();

    console.log("google auth begun...")
    firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;

        // console.log("USER: " + JSON.stringify(user));

        var name = user.displayName;
        var photoURL = user.photoURL;

        sessionStorage.setItem("userName", name)
        sessionStorage.setItem("photoURL", photoURL)

        console.log("userName: " + name);
        console.log("photoURL: " + photoURL);

        // redirect to survey page
        toSurvey();
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;

        console.log("ERROR\n")
        console.log("Error Message\n" + errorMessage + "\n\n")
        console.log("Error Code\n" + errorCode + "\n\n")
        console.log("Error Email\n" + email + "\n\n")
        console.log("Error Credential\n" + credential + "\n\n")

        // $("#login-error").show();
        // ...
    });
}

function toSurvey(){
    window.location.href = "/survey";
}