


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

$(document).ready(function () {
    var playmusic = 0;
    var audio = document.getElementById('myTune');
    var volumeLenPer = $("#volumeProBar").width() / 100;
    var all_valueProgressVolumn = $("#volumeProBar").width();
    var all_valueAudioVolumn = 1.0;
    var loopAudioCurrent = false;

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

    audio.addEventListener('loadedmetadata', function audioLoad() {
        var lengaudio = parseInt(audio.duration);
        var lengaudioText = convertTime(lengaudio);
        document.getElementById("playmusic-end").innerHTML = lengaudioText;
        document.getElementById("playmusic-start").innerHTML = "0:00";
    });

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

    var intervalPlayMusic;
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
    var playmusicLenPer;
    $("#playmusic-process").click(function TuaTagAudio(ev) {
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
        all_valueProgressVolumn = lenCurrentVolume / volumeLenPer;
        document.getElementById("volumeProBar").value = all_valueProgressVolumn;
        all_valueAudioVolumn = document.getElementById("volumeProBar").value / 100;
        document.getElementById("myTune").volume = all_valueAudioVolumn;
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
    var oldVolume;
    var oldVolumeLength;
    $("#volumeButton").click(function editByIconVolumn() {
        if (audio.volume > 0) {
            oldVolume = audio.volume;
            oldVolumeLength = document.getElementById("volumeProBar").value;
            document.getElementById("myTune").volume = 0;
            document.getElementById("volumeProBar").value = 0;
            all_valueProgressVolumn = 0;
            $("#volume .glyphicon-volume-down").hide();
            $("#volume .glyphicon-volume-up").hide();
            $("#volume .glyphicon-volume-off").show();
        } else {
            document.getElementById("myTune").volume = oldVolume;
            document.getElementById("volumeProBar").value = oldVolumeLength;
            all_valueProgressVolumn = oldVolumeLength;
            $("#volume .glyphicon-volume-off").hide();
            if (audio.volume < 0.5) {
                $("#volume .glyphicon-volume-down").show();
            } else {
                $("#volume .glyphicon-volume-up").show();
            }
        }
    });

    //select audio
    $("#clickChangeMusicHide").click(function () {
        //document.getElementById("myTune").addEventListener("loadedmetadata", audioLoad);
        //document.getElementById("myTune").addEventListener("ended", endedAudio);
        //document.getElementById("loopButton").addEventListener("click", loopAudio);
        //document.getElementById("playButton").addEventListener("click", playTagAudio);
        //document.getElementById("playmusic-process").addEventListener("click", TuaTagAudio);
        //document.getElementById("volumeProBar").addEventListener("click", editVolumnAudio);
        //document.getElementById("volumeButton").addEventListener("click", editByIconVolumn);
        clearInterval(intervalPlayMusic);
        var playmusic1 = 0;
        var audio1 = document.getElementById('myTune');
        //get loop audio prev
        audio1.loop = loopAudioCurrent;
        if (loopAudioCurrent) {
            $("#loopButton").css("color", "#fff");
        }
        //get volumn audio prev
        if (all_valueProgressVolumn === 0) {
            document.getElementById("myTune").volume = 0;
            document.getElementById("volumeProBar").value = 0;
            $("#volume .glyphicon-volume-down").hide();
            $("#volume .glyphicon-volume-up").hide();
            $("#volume .glyphicon-volume-off").show();
        } else {
            document.getElementById("volumeProBar").value = all_valueProgressVolumn;
            document.getElementById("myTune").volume = all_valueAudioVolumn;
        }

        function convertTime1(timeSecond) {
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

        audio1.addEventListener('loadedmetadata', function audioLoad1() {
            var lengaudio = parseInt(audio1.duration);
            var lengaudioText = convertTime1(lengaudio);
            document.getElementById("playmusic-end").innerHTML = lengaudioText;
            document.getElementById("playmusic-start").innerHTML = "0:00";
        });

        //event end audio
        audio1.onended = function endedAudio1() {
            if (audio1.loop === false) {
                pauseMusic1();
            }
        };

        //function play music
        function playMusic1() {
            audio1.play();
            playmusic1 = 1;
            $("#playButton .glyphicon-play").hide();
            $("#playButton .glyphicon-pause").show();
        }

        //function pause music
        function pauseMusic1() {
            audio1.pause();
            playmusic1 = 0;
            $("#playButton .glyphicon-pause").hide();
            $("#playButton .glyphicon-play").show();
        }

        //event click loop
        $("#loopButton").click(function loopAudio1() {
            if (audio1.loop === false) {
                loopAudioCurrent = true;
                audio1.loop = true;
                $("#loopButton").css("color", "#fff");
            } else {
                audio1.loop = false;
                loopAudioCurrent = false;
                $("#loopButton").css("color", "#888");
            }

        });

        //event click playmusic
        $("#playButton").click(function playTagAudio1() {
            if (playmusic1 === 0) {
                playMusic1();
                intervalPlayMusic = setInterval(function () {
                    if (document.getElementById("playmusic-start")) {
                        document.getElementById("playmusic-start").innerHTML = convertTime1(parseInt(audio1.currentTime));
                    }
                    var currentValuePlayMusic = (audio1.currentTime / audio1.duration) * 100;
                    if (document.getElementById("playmusic-process")) {
                        document.getElementById("playmusic-process").value = currentValuePlayMusic;
                    }
                }, 100);
            } else {
                pauseMusic1();
                clearInterval(intervalPlayMusic);
            }
        });

        //event click fast forward music
        var playmusicLenPer1;
        $("#playmusic-process").click(function TuaTagAudio1(ev) {
            playmusicLenPer1 = $("#playmusic-process").width() / 100;
            var lenCurrentPlayMusic = ev.clientX - $("#playmusic-process").offset().left;
            var playmusicCurrentPer = lenCurrentPlayMusic / playmusicLenPer1;

            document.getElementById("playmusic-process").value = playmusicCurrentPer;
            document.getElementById("myTune").currentTime = (playmusicCurrentPer / 100) * audio1.duration;
            document.getElementById("playmusic-start").innerHTML = convertTime1(audio1.currentTime);
        });

        //volume in progress
        $("#volumeProBar").click(function editVolumnAudio1(evVolume) {
            var lenCurrentVolume = evVolume.clientX - $("#volumeProBar").offset().left;
            all_valueProgressVolumn = lenCurrentVolume / volumeLenPer;
            document.getElementById("volumeProBar").value = all_valueProgressVolumn;
            all_valueAudioVolumn = document.getElementById("volumeProBar").value / 100;
            document.getElementById("myTune").volume = all_valueAudioVolumn;

            if (audio1.volume < 0.5) {
                $("#volume .glyphicon-volume-down").show();
                $("#volume .glyphicon-volume-up").hide();
            } else {
                $("#volume .glyphicon-volume-down").hide();
                $("#volume .glyphicon-volume-up").show();
            }
            $("#volume .glyphicon-volume-off").hide();
        });

        //volume in icon
        $("#volumeButton").click(function editByIconVolumn1() {
            if (audio1.volume > 0) {
                oldVolume = audio1.volume;
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
                if (audio1.volume < 0.5) {
                    $("#volume .glyphicon-volume-down").show();
                } else {
                    $("#volume .glyphicon-volume-up").show();
                }
            }

        });
    });
});

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

    $(".all-playmusic").click(function () {
        var audioDelete = document.getElementById("myTune");
        document.getElementById("myTune").innerHTML = '';
        delete audioDelete;
        document.getElementById("all-tagMusicBottom").innerHTML = '';
        var id = $(this).attr("sttID");
        var type = $(this).attr("sttType");

        $.ajax({
            url: '@Url.Action("GetMusic", "PlayMusic")',
            dataType: 'json',
            type: 'POST',
            data: JSON.stringify({
                id: id,
                type: type
            }),
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                if (data !== '') {
                    var tempData = '';
                    tempData = tempData + '<audio id="myTune" controls>';
                    tempData = tempData + '<source src="' + data.link + '">';
                    tempData = tempData + '</audio>';
                    tempData = tempData + '<div class="playmusic-info" id="all-playmusic-change">';
                    tempData = tempData + '<div class="imgPlayMusic">';
                    tempData = tempData + '<img src="' + data.link_Img + '" />';
                    tempData = tempData + '</div>';
                    tempData = tempData + '<div class="textPlayMusic">';
                    tempData = tempData + '<a href="#" class="playmusic-name">' + data.name + '</a>';
                    $.each(data.artist, function (i, item) {
                        tempData = tempData + '<a href="#" class="playmusic-artist">' + item + '</a>';
                    });
                    tempData = tempData + '</div>';
                    tempData = tempData + '</div>';
                    tempData = tempData + '<div class="playmusic-time">';
                    tempData = tempData + '<label id="playmusic-start"></label>';
                    tempData = tempData + '<progress id="playmusic-process" value="0" max="100"></progress>';
                    tempData = tempData + '<label id="playmusic-end"></label>';
                    tempData = tempData + '</div>';
                    tempData = tempData + '<div class="playmusic-button">';
                    tempData = tempData + '<button id="playmusic-prev">';
                    tempData = tempData + '<i class="glyphicon glyphicon-backward"></i>';
                    tempData = tempData + '</button>';
                    tempData = tempData + '<button id="playButton">';
                    tempData = tempData + '<i class="glyphicon glyphicon-play"></i>';
                    tempData = tempData + '<i class="glyphicon glyphicon-pause"></i>';
                    tempData = tempData + '</button>';
                    tempData = tempData + '<button id="playmusic-next">';
                    tempData = tempData + '<i class="glyphicon glyphicon-forward"></i>';
                    tempData = tempData + '</button>';
                    tempData = tempData + '<button id="loopButton">';
                    tempData = tempData + '<i class="glyphicon glyphicon-repeat"></i>';
                    tempData = tempData + '</button>';
                    tempData = tempData + '<div id="volume">';
                    tempData = tempData + '<button id="volumeButton">';
                    tempData = tempData + '<i class="glyphicon glyphicon-volume-down"></i>';
                    tempData = tempData + '<i class="glyphicon glyphicon-volume-up"></i>';
                    tempData = tempData + '<i class="glyphicon glyphicon-volume-off"></i>';
                    tempData = tempData + '</button>';
                    tempData = tempData + '<progress id="volumeProBar" value="100" max="100"></progress>';
                    tempData = tempData + '</div>';
                    tempData = tempData + '</div>';

                    document.getElementById("all-tagMusicBottom").innerHTML = tempData;

                    document.getElementById("clickChangeMusicHide").click();
                    document.getElementById("playButton").click();
                } else {
                    alert("unsuccess");
                }

            }
        });
    });
});

// #endregion



