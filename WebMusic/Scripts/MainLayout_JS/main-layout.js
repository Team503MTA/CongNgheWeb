


// #region CLICK CART

$(document).ready(function () {
    $("#Buy-now").click(function () {
        $("#content-wrap").show();
    });

    $("#button-cart-pay").click(function () {

        $.ajax({
            url: '@Url.Action("CartBuy","Cart")',
            dataType: 'json',
            type: 'POST',
            data: JSON.stringify({
                email: $("#cart-pay-email").val(),
                password: $("#cart-pay-password").val(),
                cardNumber: $("#cart-pay-series").val(),
                passwordCard: $("#cart-pay-pass").val()
            }),
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                if (data !== '') {
                    alert("success");
                } else {
                    alert("unsuccess");
                }
            }
    });

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

$(document).ready(function () {
    var playmusic = 0;
    var audio = document.getElementById('myTune');

    function convertTime(timeSecond) {
        var hour = 0;
        var minutes = 0;
        var second = 0;
        var stringTime = "";
        hour = Math.floor(timeSecond / 3600);
        timeSecond = timeSecond - hour * 3600;
        minutes = Math.floor(timeSecond / 60);
        timeSecond = timeSecond - minutes * 60;
        second = Math.floor(timeSecond);
        var correctSecond = "";
        if (second < 10) {
            correctSecond = "0" + second;
        } else {
            correctSecond = second;
        }
        if (hour === 0) {
            stringTime = minutes + ":" + correctSecond;
        } else {
            stringTime = hour + ":" + minutes + ":" + correctSecond;
        }
        return stringTime;
    }

    audio.addEventListener('loadedmetadata', function () {
        var lengaudio = parseInt(audio.duration);
        var lengaudioText = convertTime(lengaudio);
        document.getElementById("playmusic-end").innerHTML = lengaudioText;
        document.getElementById("playmusic-start").innerHTML = "0:00";
    });

    //event end audio
    audio.onended = function () {
        if (audio.loop === false) {
            pauseMusic();
        }
    };

    //function play music
    function playMusic() {
        audio.play();
        playmusic = 1;
        $("#playButton .glyphicon-play").hide();
        $("#playButton .glyphicon-pause").show();
    }

    //function pause music
    function pauseMusic() {
        audio.pause();
        playmusic = 0;
        $("#playButton .glyphicon-pause").hide();
        $("#playButton .glyphicon-play").show();
    }

    //event click loop
    $("#loopButton").click(function () {
        if (audio.loop === false) {
            if (playmusic === 0) {
                playMusic();
            }
            audio.loop = true;
            $("#loopButton").css("color", "#fff");
        } else {
            audio.loop = false;
            $("#loopButton").css("color", "#888");
        }

    });

    var intervalPlayMusic;
    //event click playmusic
    $("#playButton").click(function () {
        if (playmusic === 0) {
            playMusic();
            intervalPlayMusic = setInterval(function () {
                document.getElementById("playmusic-start").innerHTML = convertTime(parseInt(audio.currentTime));
                var currentValuePlayMusic = (audio.currentTime / audio.duration) * 100;
                document.getElementById("playmusic-process").value = currentValuePlayMusic;
            }, 100);
        } else {
            pauseMusic();
            clearInterval(intervalPlayMusic);
        }
    });

    //event click fast forward music
    var playmusicLenPer;
    $("#playmusic-process").click(function (ev) {
        playmusicLenPer = $("#playmusic-process").width() / 100;
        var lenCurrentPlayMusic = ev.clientX - $("#playmusic-process").offset().left;
        var playmusicCurrentPer = lenCurrentPlayMusic / playmusicLenPer;

        document.getElementById("playmusic-process").value = playmusicCurrentPer;
        document.getElementById("myTune").currentTime = (playmusicCurrentPer / 100) * audio.duration;
        document.getElementById("playmusic-start").innerHTML = convertTime(audio.currentTime);
    });

    //volume in progress
    var volumeLenPer;
    $("#volumeProBar").click(function (evVolume) {
        volumeLenPer = $("#volumeProBar").width() / 100;
        var lenCurrentVolume = evVolume.clientX - $("#volumeProBar").offset().left;
        document.getElementById("volumeProBar").value = lenCurrentVolume / volumeLenPer;
        document.getElementById("myTune").volume = document.getElementById("volumeProBar").value / 100;
        if (audio.volume < 0.5) {
            $("#volume .glyphicon-volume-down").show();
            $("#volume .glyphicon-volume-up").hide();
        } else {
            $("#volume .glyphicon-volume-down").hide();
            $("#volume .glyphicon-volume-up").show();
        }
    });

    //volume in icon
    var oldVolume;
    var oldVolumeLength;
    $("#volumeButton").click(function () {
        if (audio.volume > 0) {
            oldVolume = audio.volume;
            oldVolumeLength = document.getElementById("volumeProBar").value;
            document.getElementById("myTune").volume = 0;
            document.getElementById("volumeProBar").value = 0;
            $("#volume .glyphicon-volume-down").hide();
            $("#volume .glyphicon-volume-up").hide();
            $("#volume .glyphicon-volume-off").show();
        } else {
            document.getElementById("myTune").volume = oldVolume;
            document.getElementById("volumeProBar").value = oldVolumeLength;
            $("#volume .glyphicon-volume-off").hide();
            if (audio.volume < 0.5) {
                $("#volume .glyphicon-volume-down").show();
            } else {
                $("#volume .glyphicon-volume-up").show();
            }
        }

    });

});

// #endregion




