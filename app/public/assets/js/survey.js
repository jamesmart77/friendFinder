$(document).ready(function () {

    var name = sessionStorage.getItem("userName");
    var photo = sessionStorage.getItem("photoURL");

    $("#name").val(name);
    $("#photo").val(photo);
    var modal = document.getElementById('resultsModal'); // Get the modal

    $("#submit").on("click", function (e) {
        // prevent page refresh
        e.preventDefault();

        // form validation function (below)
        var isValid = validate_form();

        //assess returned value
        if (!isValid) {
            alert("Please fill in all fields before submitting.");
            //exit submit click function
            exit();
        }

        // collect and sum question entries
        var userScores = parseInt($("#q1").val()) + parseInt($("#q2").val()) + parseInt($("#q3").val()) +
            parseInt($("#q4").val()) + parseInt($("#q5").val()) + parseInt($("#q6").val()) + parseInt($("#q7").val()) +
            parseInt($("#q8").val()) + parseInt($("#q9").val()) + parseInt($("#q10").val())


        // assign user entry values to object
        var userResponse = {
            name: $("#name").val(),
            photo: $("#photo").val(),
            score: userScores
        };

        // current '/survey' url address
        var currentURL = window.location.origin;

        // post request for user entries
        $.post(currentURL + "/api/friends", userResponse, function (response) {
            //populate modal with best match
            // alert(response);
            let modalHeader = document.getElementById("matchName"); //get modal header class
            var modalImg = document.getElementById('matchImg'); //get modal img ID

            modalHeader.innerHTML = response.name;
            modalImg.src = response.photo;

            // When the user clicks on the button, open the modal 
            modal.style.display = "block";
            modal.style.opacity = 1;

            // reset form entry fields
            document.getElementById("entryForm").reset()
        });
    });

    //looping through form fields to check if value is present
    function validate_form() {
        //default, assumption
        valid = true;

        //name and photo fields
        if ((document.form_entry.user_name.value == "") || (document.form_entry.user_photo.value == "")) {
            valid = false;
        }

        //all dropdown menus
        var $selects = $('#q1, #q2, #q3, #q4, #q5, #q6, #q7, #q8, #q9, #q10'),
            $selected = $selects.filter(function () {
                //return dropdown count of non-blank
                return this.value != ''
            });

        //if count < 10, at least one drop down is blank     
        if ($selected.length < 10) {
            valid = false;
        }

        return valid;
    }

    //=== MODAL FUNCTIONS ===================================================

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // close model if button clicked
    $("#closeBtn").on("click", function (e) {
        modal.style.display = "none";
    })

    // display alert if 'Let's Connect' link is clicked in modal
    $(".connection").on("click", function (e) {
        alert(
            "This functionality is still under construction at this time.\n\nHowever, if it did work, you might be able to make a friend, but since it's not you can't; sad day. GET OUT THERE AND MAKE SOME FRIENDS THE OLD FASHIONED WAY :)"
        );
    })

    //========================================================================
});