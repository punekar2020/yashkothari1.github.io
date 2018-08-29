var str = "This is some sample text. This sentence was supposed to wrap to the next line. I'm glad to know it did!";

var correct = document.getElementById("correct");
var wrong = document.getElementById("wrong");
var remaining = document.getElementById("remaining");
var WPMdisplay = document.getElementById("wpm-val");

var iNext = 0;
var wrongCount = 0;
var typeStatus = 0;
var startTime, endTime;
var WPM;

WPMdisplay.textContent = "press a key to start the timer.";
updatePage();

var dots = 0;
var dotInterval;

document.addEventListener('keydown', function(event){
    if( typeStatus==2 ) 
    	return; 
   	else if( typeStatus==0 ){
    	if(event.key.length==1){ 
    		typeStatus = 1;
    		updateDots();
    		dotInterval = setInterval(updateDots,500);
    		startTime = new Date();
    	}
    	else return;
    }

	if( event.key!="Backspace" && event.key.length>1 ) return;
	if(wrongCount==0){
	    if( event.key=="Backspace" ){
	    	if(iNext>0)
	    		iNext--;	
	    }
	    else if( event.key==str[iNext] ){
	    	iNext++;
	    	if(iNext==str.length){
	    		endTime = new Date();
	    		typeStatus = 2;
	    		clearInterval(dotInterval);
	    		calcWPM();
	    	}
	    }
	    else{
	    	if(wrongCount<str.length-iNext)
	    		wrongCount++;
	    }
    }

    else{
    	if( event.key=="Backspace" ){
	    	wrongCount--;	
	    }
	    else{
	    	if(wrongCount<str.length-iNext)
	    		wrongCount++;
	    }
    }
	updatePage();
} );

function updatePage(){
	var str1, str2, str3, temp;
	str1 = str.substring(0,iNext);
	str2 = str.substr(iNext,wrongCount);
	str3 = str.substring(iNext+wrongCount, str.length);
	correct.innerHTML = addBreaks(str1);
	wrong.innerHTML = addBreaks(str2);
	remaining.innerHTML = addBreaks(str3);
}

function addBreaks(textStr){
	var res = "";
	for(var i=0; i<textStr.length; i++){
		if(textStr[i]==" ")
			res += "&nbsp;<wbr>";
		else 
			res += textStr[i];
	}
	return res;
}

function calcWPM(){
	var T_min = ( endTime - startTime ) / ( 1000 * 60 );
	WPM =  ( str.length/5 ) / T_min;
	WPM = Math.floor(WPM);
	WPMdisplay.textContent = WPM;
}

function updateDots(){
	var disp = "";
	dots = (dots+1)%4;
	for(var i=0; i<dots; i++)
		disp += ". ";
	WPMdisplay.textContent = disp;
}