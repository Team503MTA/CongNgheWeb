

// short string
$(document).ready(function () {
    var string_Full = $("#detail-label-descrip-content").text();

    function Display_Short_String() {
        var len_String_Full = 0;
        len_String_Full = $("#detail-label-descrip-content").text().length;
        if (len_String_Full > 20) {
            $("#detail-label-descrip-content").text($("#detail-label-descrip-content").text().substr(0, 250) + '...');
        }
    }

    function Display_More_String() {
        $("#detail-label-descrip-content").text(string_Full);
    }

    Display_Short_String();

    $(".detail-label-more").click(function () {
        Display_More_String();
        $(this).hide();
        $(".detail-label-descrip-content-less").show();
    });

    $(".detail-label-less").click(function () {
        Display_Short_String();
        $(this).hide();
        $(".detail-label-descrip-content-more").show();
    });

});
// end short string

$(document).ready(function () {

    alert("Df");

    $(".detail-label-artist-info").each(function () {
        if ($(this).attr("stt") === 0) {
            alert(stt);
            $(this).css("display", "inline-block");
        }
    });
});

