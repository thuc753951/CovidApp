$(document).ready(function(){
    console.log($(document.querySelector("div.featureGrid")));
    $("#leftScroll").click(function(){
        console.log("TEST2");
        $(document.querySelector("div.featureGrid")).animate({
            scrollLeft: "-=200px"
        }, "slow");
    });

    $("#rightScroll").click(function(){
        console.log("TEST3");
        $(document.querySelector("div.featureGrid")).animate({
            scrollLeft: "+=200px"
        }, "slow");
    });

});