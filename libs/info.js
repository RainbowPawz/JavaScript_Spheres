/**
 * Created with JetBrains WebStorm.
 * User: Heather
 * Date: 3/23/14
 * Time: 3:30 PM
 * To change this template use File | Settings | File Templates.
 */
$(function()
{
    $("#infoBox")
        .css(
        {
            "background":"rgba(255,255,255,0.5)"
        })
        .dialog({ autoOpen: false,
            show: { effect: 'fade', duration: 500 },
            hide: { effect: 'fade', duration: 500 }
        });

    $("#infoButton")
        .text("") // sets text to empty

        .css(
        { "z-index":"2",
            "background":"rgba(0,0,0,0)", "opacity":"0.9",
            "position":"absolute", "top":"4px", "left":"4px"
        }) // adds CSS
        .append("<img width='10' height='10' src='images/icon-info.png'/>")
        .button()
        .click(
        function()
        {
            $("#infoBox").dialog("open");
        });
});