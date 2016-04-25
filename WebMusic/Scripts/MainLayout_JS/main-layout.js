


// #region CLICK CART

$(document).ready(function () {
    $("#Buy-now").click(function () {
        $("#content-wrap").show();

    });

});

// #endregion


// #region LOGIN

$(document).ready(function () {
    $("#login-button").click(function () {
        $("#login-form").show();
        $(".extra").show();
    });

    $("#button-me-cancel").click(function () {
        $("#login-form").hide();
        $(".extra").hide();
    });

    $("#closeNotiForm").click(function () {
        $("#noti-form").hide();
        $(".extra").hide();
    });

});

// #endregion


// #region SHORT STRING

$(document).ready(function () {
    var stringFull = $("#short-text-content").text();

    function displayShortString() {
        var lenStringFull = 0;
        lenStringFull = $("#short-text-content").text().length;
        if (lenStringFull > 20) {
            $("#short-text-content").text($("#short-text-content").text().substr(0, 250) + '...');
        }
    }

    function displayMoreString() {
        $("#short-text-content").text(stringFull);
    }

    displayShortString();

    $(".short-text-content-more").click(function () {
        displayMoreString();
        $(this).hide();
        $(".short-text-content-less").show();
    });

    $(".short-text-content-less").click(function () {
        displayShortString();
        $(this).hide();
        $(".short-text-content-more").show();
    });

});

// #endregion


// #region REGISTER

$(document).ready(function () {
    $("#register-button").click(function () {
        $(".register-form").show();
        $(".extra").show();
    });
    $("#register-form-button-cancel").click(function () {
        $(".register-form").hide();
        $(".extra").hide();
    });
});

// #endregion


// #region GENRES

$(document).ready(function () {
    var displaygenres = 0;
    $("#genres-button").click(function () {
        if (displaygenres === 0) {
            $("#genres-detail").show();
            $(this).css("background", "#eee");
            displaygenres = 1;
        } else {
            $("#genres-detail").hide();
            $(this).css("background", "transparent");
            displaygenres = 0;
        }
    });
});

// #endregion


// #region TAG PLAY MUSIC



// #endregion
