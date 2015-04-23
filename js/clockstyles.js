var tens = $('#countdown').html().substr(0,1);
var ones = $('#countdown').html().substr(1,2);

$('#countdownclock').append("Days to go <span id='tens'>"+tens+"</span><span id='ones'>"+ones+"</span>");