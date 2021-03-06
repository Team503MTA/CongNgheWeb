﻿
// #region Load Function Ajax Request

$(document).ready(function() {

});

// #endregion


// #region CLICK CART

$(document).ready(function () {

    $("#Buy-now").click(function () {
        $("#content-wrap").show();

    });

});

// #endregion


// #region NotiForm

function close_NotiForm () {
    $("#noti-form").hide();
    $(".extra").hide();
}

function noti_Fun(text) {
    $(".extra").show();
    document.getElementById("notiForm").innerHTML = text;
    $("#noti-form").show();
}

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

    var playmusic = 0;
    var audio;
    var volumeLenPer = $("#volumeProBar").width() / 100;
    var allValueProgressVolumn = $("#volumeProBar").width();
    var allValueAudioVolumn = 1.0;
    var loopAudioCurrent = false;

    var intervalPlayMusic;
    var playmusicLenPer;
    var oldVolume;
    var oldVolumeLength;
    var checkDetailPage = false;

    function checkDetailPage_fun() {
        checkDetailPage = true;
    }

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
    
    

    function audioLoad() {
        if (!intervalPlayMusic) {
            intervalPlayMusic = null;
        }
        audio = document.getElementById('myTune');

        var lengaudio = parseInt(audio.duration);
        var lengaudioText = convertTime(lengaudio);
        document.getElementById("playmusic-end").innerHTML = lengaudioText;
        document.getElementById("playmusic-start").innerHTML = "0:00";


        //event end audio
        audio.onended = function endedAudio() {
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
        $("#loopButton").click(function loopAudio() {
            if (audio.loop === false) {
                loopAudioCurrent = true;
                audio.loop = true;
                $("#loopButton").css("color", "#fff");
            } else {
                audio.loop = false;
                loopAudioCurrent = false;
                $("#loopButton").css("color", "#888");
            }
        });

        //event click playmusic
        $("#playButton").click(function playTagAudio() {
            if (playmusic === 0) {
                playMusic();
                intervalPlayMusic = setInterval(function () {
                    if (document.getElementById("playmusic-start")) {
                        document.getElementById("playmusic-start").innerHTML = convertTime(parseInt(audio.currentTime));
                    }
                    var currentValuePlayMusic = (audio.currentTime / audio.duration) * 100;
                    if (document.getElementById("playmusic-process")) {
                        document.getElementById("playmusic-process").value = currentValuePlayMusic;
                    }
                }, 100);
            } else {
                pauseMusic();
                clearInterval(intervalPlayMusic);
            }
        });

        //event click fast forward music
        $("#playmusic-process").click(function tuaTagAudio(ev) {
            playmusicLenPer = $("#playmusic-process").width() / 100;
            var lenCurrentPlayMusic = ev.clientX - $("#playmusic-process").offset().left;
            var playmusicCurrentPer = lenCurrentPlayMusic / playmusicLenPer;

            document.getElementById("playmusic-process").value = playmusicCurrentPer;
            document.getElementById("myTune").currentTime = (playmusicCurrentPer / 100) * audio.duration;
            document.getElementById("playmusic-start").innerHTML = convertTime(audio.currentTime);
        });

        //volume in progress
        $("#volumeProBar").click(function editVolumnAudio(evVolume) {
            var lenCurrentVolume = evVolume.clientX - $("#volumeProBar").offset().left;
            allValueProgressVolumn = lenCurrentVolume / volumeLenPer;
            document.getElementById("volumeProBar").value = allValueProgressVolumn;
            allValueAudioVolumn = document.getElementById("volumeProBar").value / 100;
            document.getElementById("myTune").volume = allValueAudioVolumn;
            if (audio.volume < 0.5) {
                $("#volume .glyphicon-volume-down").show();
                $("#volume .glyphicon-volume-up").hide();
            } else {
                $("#volume .glyphicon-volume-down").hide();
                $("#volume .glyphicon-volume-up").show();
            }
            $("#volume .glyphicon-volume-off").hide();
        });

        //volume in icon
        $("#volumeButton").click(function editByIconVolumn() {
            if (audio.volume > 0) {
                oldVolume = audio.volume;
                oldVolumeLength = document.getElementById("volumeProBar").value;
                document.getElementById("myTune").volume = 0;
                document.getElementById("volumeProBar").value = 0;
                allValueProgressVolumn = 0;
                allValueAudioVolumn = 0;
                $("#volume .glyphicon-volume-down").hide();
                $("#volume .glyphicon-volume-up").hide();
                $("#volume .glyphicon-volume-off").show();
            } else {
                document.getElementById("myTune").volume = oldVolume;
                document.getElementById("volumeProBar").value = oldVolumeLength;
                allValueProgressVolumn = oldVolumeLength;
                $("#volume .glyphicon-volume-off").hide();
                if (audio.volume < 0.5) {
                    $("#volume .glyphicon-volume-down").show();
                } else {
                    $("#volume .glyphicon-volume-up").show();
                }
            }
        });

        var canvas, ctx, source, context, analyser, fbc_array, bars, bar_x, bar_width, bar_height;
        function initMp3Player() {
            context = new window.webkitAudioContext(); // AudioContext object instance
            analyser = context.createAnalyser(); // AnalyserNode method
            canvas = document.getElementById('analyser_render');
            ctx = canvas.getContext('2d');
            // Re-route audio playback into the processing graph of the AudioContext
            source = context.createMediaElementSource(audio);
            source.connect(analyser);
            analyser.connect(context.destination);
            frameLooper();
        }
        // frameLooper() animates any style of graphics you wish to the audio frequency
        // Looping at the default frame rate that the browser provides(approx. 60 FPS)
        function frameLooper() {
            window.webkitRequestAnimationFrame(frameLooper);
            fbc_array = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(fbc_array);
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
            ctx.fillStyle = '#a0a'; // Color of the bars
            bars = 200;
            for (var i = 0; i < bars; i++) {
                bar_x = i * 2;
                bar_width = 1;
                bar_height = -(fbc_array[i] /2);
                //  fillRect( x, y, width, height ) // Explanation of the parameters below
                ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);
            }
        }

        if (checkDetailPage) {
            initMp3Player();
            checkDetailPage = false;
        }

        //thuc thi neu da su dung
        if (playmusic === 1) {
            playmusic = 0;
            document.getElementById("playButton").click();
        } else {
            playmusic = 1;
            document.getElementById("playButton").click();
        }
        if (loopAudioCurrent) {
            document.getElementById("loopButton").click();
        }
        //reset probar
        document.getElementById("playmusic-process").value = 0;
        //lay gia tri am thanh cu
        document.getElementById("volumeProBar").value = allValueProgressVolumn;
        document.getElementById("myTune").volume = allValueAudioVolumn;
        if (audio.volume < 0.5) {
            $("#volume .glyphicon-volume-down").show();
            $("#volume .glyphicon-volume-up").hide();
        } else {
            $("#volume .glyphicon-volume-down").hide();
            $("#volume .glyphicon-volume-up").show();
        }
        $("#volume .glyphicon-volume-off").hide();
        //lay gia tri mute cu
        if (audio.volume === 0) {
            $("#volume .glyphicon-volume-down").hide();
            $("#volume .glyphicon-volume-up").hide();
            $("#volume .glyphicon-volume-off").show();
        }
    }
    
    

// #endregion


// #region GIO HANG

$(document).ready(function () {

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
                    $("#total_Debt_Menu").text('$0');
                } else {
                    alert("unsuccess");
                }
            }
        });
    });

    $("#logoCartMenu").click(function () {
        $.ajax({
            url: '@Url.Action("CartDetail", "Cart")',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                if (data !== null) {
                    document.getElementById("MainContent").innerHTML = '';
                    $("#content1").show();

                    document.getElementById("content1-cartDetail").innerHTML = '';
                    var stringData = '';
                    var totalMoney = 0;
                    $.each(data, function (i, item) {
                        totalMoney += parseFloat(item.cost.toString());

                        stringData = stringData + '<div class="row">';
                        stringData = stringData + '<div class="col-sm-4 cart-row cart-name">';
                        stringData = stringData + '<a href="#">' + item.name + '</a>';
                        stringData = stringData + '</div>';
                        stringData = stringData + '<div class="col-sm-3 cart-row cart-artist">';
                        $.each(item.artist, function (j, tempArtist) {
                            stringData = stringData + '<a href ="#">' + tempArtist + '</a>';
                        });
                        stringData = stringData + '</div>';
                        stringData = stringData + '<div class="col-sm-2 cart-row cart-label">';
                        $.each(item.label, function (j, tempLabel) {
                            {
                                stringData = stringData + '<a href="#">' + tempLabel + '</a>';
                            }
                        });
                        stringData = stringData + '</div>';
                        stringData = stringData + '<div class="col-sm-1 cart-row cart-cost">$' + item.cost + '</div>';
                        stringData = stringData + '<div class="col-sm-1 cart-row cart-sale">' + item.sale + '%</div>';
                        stringData = stringData + '<div class="col-sm-1 cart-row cart-delete">';
                        stringData = stringData + '<a href="#">Delete</a>';
                        stringData = stringData + '</div>';
                        stringData = stringData + '</div>';
                    });
                    document.getElementById("content1-cartDetail").innerHTML = stringData;
                    $("#TotalMoney").text('$' + totalMoney);

                } else {
                    alert("unsuccess");
                }
            }
        });
    });

});

// #endregion



