// JavaScript Document


var current_word_index = 0;
var count = 0;
var current_word = "Welcome!";
var current_word_and_definition = "Welcome!";
var words = new Array();
//var mytable = "<table cellpadding=\"5em\" cellspacing=\"1\"><tbody><tr><th><td>Guessed Word&nbsp;</td><td>Actual Word&nbsp;</td><td>Correct/Incorrect&nbsp;</td></tr>";
var totalGuesses =0;
var correctAnswers =0;
var guessedWord="";
var filePath = "beginner.txt";
var mytable = "<table cellpadding=\"5em\" cellspacing=\"1\"><tbody><tr><th>Correct Word&nbsp;</th><th>Guessed Word&nbsp;</th><th>Outcome&nbsp;</th></tr>";

function html5_audio() {
    var a = document.createElement('audio');
    return !!(a.canPlayType && a.canPlayType('audio/mpeg;').replace(/no/, ''));
}
 
var play_html5_audio = false;
if(html5_audio()) {play_html5_audio = true};
 
function play_sound(url){
    if(play_html5_audio){
        var snd = new Audio(url);
        snd.load();
        snd.play();
    }else{
        $("#sound").remove();
        var sound = $("<embed id='sound' type='audio/mpeg' />");
        sound.attr('src', url);
        sound.attr('loop', false);
        sound.attr('hidden', true);
        sound.attr('autostart', true);
        $('body').append(sound);
    }
}
function readme(txt){
    //play_sound("http://translate.google.com/translate_tts?ie=UTF-8&q="+encodeURIComponent(txt)+"&tl=en&total=1&idx=0prev=input");
    var msg = new SpeechSynthesisUtterance(txt);
    window.speechSynthesis.speak(msg);           
}


$(function(){
  
    $('#btnRead').click(function(){
        readme(current_word_and_definition);
        $("#inp").focus();
    });

    $('#btnBeg').click(function(){
        filePath = "beginner.txt";
    });

    $('#btnInt').click(function(){
        filePath = "intermediate.txt";
    });

    $('#btnAdv').click(function(){
        filePath = "advanced.txt";
    });

    $('#btnNext').click(function(){
        xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET",filePath,false);
        xmlhttp.send(null);
        var fileContent = xmlhttp.responseText;
        words = fileContent.split('\n');
        current_word_index = parseInt(Math.random() * words.length);
        current_word_and_definition = words[current_word_index];
        var singleLine = current_word_and_definition.split(" ");
        current_word = singleLine[0];
        readme(current_word_and_definition);
        $("#inp").val();
        $("#inp").focus();
        document.getElementById("btnNext").disabled = true; 
        

    });

    $('#btnCheck').click(function(){
        guessedWord = $("#inp").val();
        if(guessedWord==""){
            readme("Please take a guess!");
        } else if(guessedWord.toLowerCase() == current_word.toLowerCase()){
            readme("Correct!");
            correctAnswers++;
            totalGuesses++;
            $("#inp").val("");
            $("#answers").val("Score: " + correctAnswers + "/" + totalGuesses);
            mytable += "<tr><td>" + current_word + "</td><td>" + guessedWord + "</td><td>Correct</td></tr>";
            document.getElementById("resultsTable").innerHTML=myTable; 
        }else{
            readme("Incorrect!");
            totalGuesses++;
            $("#inp").val("");
            $("#answers").val("Score: " + correctAnswers + "/" + totalGuesses);
            mytable += "<tr><td>" + current_word + "</td><td>" + guessedWord + "</td><td>Correct</td></tr>";
            document.getElementById("resultsTable").innerHTML=mytable; 
        }
        document.getElementById("btnNext").disabled = false;
        guessedWord="";
    });
});


$(function(){
  
    $('#btnListen').click(function(){
    	current_word = $("#inp").val();
    	if(current_word == ""){
    		current_word="Please enter a word or sentence.";
    	}
		readme(current_word);
    });
});