


//login

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

//end login

// short string
$(document).ready(function () {
    var string_Full = $("#short-text-content").text();

    function Display_Short_String() {
        var len_String_Full = 0;
        len_String_Full = $("#short-text-content").text().length;
        if (len_String_Full > 20) {
            $("#short-text-content").text($("#short-text-content").text().substr(0, 250) + '...');
        }
    }

    function Display_More_String() {
        $("#short-text-content").text(string_Full);
    }

    Display_Short_String();

    $(".short-text-content-more").click(function () {
        Display_More_String();
        $(this).hide();
        $(".short-text-content-less").show();
    });

    $(".short-text-content-less").click(function () {
        Display_Short_String();
        $(this).hide();
        $(".short-text-content-more").show();
    });

});
// end short string


//register

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

//end register


// genres

$(document).ready(function () {
    var displaygenres = 0;
    $("#genres-button").click(function () {
        if (displaygenres == 0) {
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

// end genres




//event tag play music

$(document).ready(function () {
    var playmusic = 0;
    var audio = document.getElementById('myTune');

    function ConvertTime(timeSecond) {
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
        if (hour == 0) {
            stringTime = minutes + ":" + correctSecond;
        } else {
            stringTime = hour + ":" + minutes + ":" + correctSecond;
        }
        return stringTime;
    }

    audio.addEventListener('loadedmetadata', function () {
        var lengaudio = parseInt(audio.duration);
        var lengaudioText = ConvertTime(lengaudio);
        document.getElementById("playmusic-end").innerHTML = lengaudioText;
        document.getElementById("playmusic-start").innerHTML = "0:00";
    });

    //event end audio
    audio.onended = function () {
        if (audio.loop == false) {
            PauseMusic();
        }
    };

    //function play music
    function PlayMusic() {
        audio.play();
        playmusic = 1;
        $("#playButton .glyphicon-play").hide();
        $("#playButton .glyphicon-pause").show();
    }

    //function pause music
    function PauseMusic() {
        audio.pause();
        playmusic = 0;
        $("#playButton .glyphicon-pause").hide();
        $("#playButton .glyphicon-play").show();
    }

    //event click loop
    $("#loopButton").click(function () {
        if (audio.loop == false) {
            if (playmusic == 0) {
                PlayMusic();
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
        if (playmusic == 0) {
            PlayMusic();
            intervalPlayMusic = setInterval(function () {
                document.getElementById("playmusic-start").innerHTML = ConvertTime(parseInt(audio.currentTime));
                currentValuePlayMusic = (audio.currentTime / audio.duration) * 100;
                document.getElementById("playmusic-process").value = currentValuePlayMusic;
            }, 100);
        } else {
            PauseMusic();
            clearInterval(intervalPlayMusic);
        }
    });

    //event click fast forward music
    var playmusicLenPer;
    $("#playmusic-process").click(function (ev) {
        playmusicLenPer = $("#playmusic-process").width() / 100;
        var lenCurrent_playMusic = ev.clientX - $("#playmusic-process").offset().left;
        var Playmusic_currentPer = lenCurrent_playMusic / playmusicLenPer;

        document.getElementById("playmusic-process").value = Playmusic_currentPer;
        document.getElementById("myTune").currentTime = (Playmusic_currentPer / 100) * audio.duration;
        document.getElementById("playmusic-start").innerHTML = ConvertTime(audio.currentTime);
    });
    
    //volume in progress
    var volumeLenPer;
    $("#volumeProBar").click(function (ev_volume) {
        volumeLenPer = $("#volumeProBar").width() / 100;
        var lenCurrent_volume = ev_volume.clientX - $("#volumeProBar").offset().left;
        document.getElementById("volumeProBar").value = lenCurrent_volume / volumeLenPer;
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







//slider
$(document).ready(function(){

    var stt = 0;
    var firstImg = $(".slider-img:first").attr("stt");
    var endImg = $(".slider-img:last").attr("stt");
    
    $(".slider-img").each(function(){
       if($(this).is(':visible')){
           stt = $(this).attr("stt");
       } 
    });

    function sliderNext(){
        stt++;
        if(stt > endImg){
            stt = firstImg;
        }
        $(".slider-img").hide();
        $(".slider-img").eq(stt).show();
        $(".slider-button").removeClass("slider-button-active");
        $(".slider-button").eq(stt).addClass("slider-button-active");
    }
    
    function sliderPrev(){
        stt--;
        if(stt < firstImg){
            stt = endImg;
        }
        $(".slider-img").hide();
        $(".slider-img").eq(stt).show();
        $(".slider-button").removeClass("slider-button-active");
        $(".slider-button").eq(stt).addClass("slider-button-active");
    }
    
    var interval_Slider = setInterval(function(){
        sliderNext();
    },3000);
    
    $(".slider-img").on("mouseover", function () {
        clearInterval(interval_Slider);
    });

    $(".slider-img").on("mouseout", function () {
        interval_Slider = setInterval(function () {
            sliderNext();
        }, 3000);
    });

    $(".slider-button").on("click", function () {

        var sttSelect = $(this).attr("stt");
        $(".slider-button").removeClass('slider-button-active');
        $(".slider-button").eq(sttSelect).addClass('slider-button-active');
        $(".slider-img").hide();
        $(".slider-img").eq(sttSelect).show();
        stt = sttSelect;
    });
    
});
//end slider



//slider not auto
$(document).ready(function () {
    var stt = 0;
    var firstImg = $(".slider-na-img:first").attr("stt");
    var endImg = $(".slider-na-img:last").attr("stt");
    $(".slider-na-img").each(function () {
        if ($(this).is(':visible')) {
            stt = $(this).attr("stt");
        }
    });

    function sliderNext() {
        stt++;
        if (stt > endImg) {
            stt = firstImg;
        }
        $(".slider-na-img").hide();
        $(".slider-na-img").eq(stt).show();
        $(".slider-na-button").removeClass("slider-na-button-active");
        $(".slider-na-button").eq(stt).addClass("slider-na-button-active");
    }

    function sliderPrev() {
        stt--;
        if (stt < firstImg) {
            stt = endImg;
        }
        $(".slider-na-img").hide();
        $(".slider-na-img").eq(stt).show();
        $(".slider-na-button").removeClass("slider-na-button-active");
        $(".slider-na-button").eq(stt).addClass("slider-na-button-active");
    }

    $(".slider-na-button").on("click", function () {
        var sttSelect = $(this).attr("stt");
        $(".slider-na-button").removeClass('slider-na-button-active');
        $(".slider-na-button").eq(sttSelect).addClass('slider-na-button-active');
        $(".slider-na-img").hide();
        $(".slider-na-img").eq(sttSelect).show();
        stt = sttSelect;
    });
});
// end slider-2 not auto


