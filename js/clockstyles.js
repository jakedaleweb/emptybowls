var tens = $('#countdown').html().substr(0,1);
var ones = $('#countdown').html().substr(1,2);

$('#countdownclock').append("Days until you can buy a bowl <span class='countdownnum'>"+tens+"</span><span class='countdownnum'>"+ones+"</span>");