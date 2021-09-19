var prediction1="";
var prediction2="";

Webcam.set({
    width:330,
    height:295,
    image_format:'png',
    png_quality:90
}) ;

camera=document.getElementById("camera");
Webcam.attach("#camera");

function snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML="<img id='resultimg' src='"+data_uri+"'/>";
    });
}

console.log("ml5 version:",ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/JjSPlgeEG/model.json",modelLoaded);

function modelLoaded() {
    console.log("WOOHOO! MODEL IS LOADED! TIME TO TEST IT OUT! YAAAAAAAAAAAAAAAAY!");
}

function speak() {
    var synth=window.speechSynthesis;
    var speakdata1="Prediction one is (drumroll)"+prediction1+"WoooHooo!";
    var speakdata2="Prediction two is (drumroll)"+prediction2+"TADA!";
    var speech=new SpeechSynthesisUtterance(speakdata1+speakdata2);
    synth.speak(speech)
}

function check() {
    var img=document.getElementById("resultimg")
    classifier.classify(img,gotResult);
}

function gotResult(error,results) {
    if (error) {
        console.error(error);
    } 
    else {
    console.log(results);  
    document.getElementById("emotionname").innerHTML=results[0].label;
    document.getElementById("emotionname1").innerHTML=results[1].label;
    prediction1=results[0].label;
    prediction2=results[1].label;
    speak();  
    if (results[0].label=="Happy") {
        document.getElementById("emoji").innerHTML="&#128522;";
    }
    if (results[0].label=="Sad") {
        document.getElementById("emoji").innerHTML="&#128549;";
    }
    if (results[0].label=="Angry") {
        document.getElementById("emoji").innerHTML="&#x1F620;";
    }
    if (results[1].label=="Happy") {
        document.getElementById("emoji1").innerHTML="&#128522;";
    }
    if (results[1].label=="Sad") {
        document.getElementById("emoji1").innerHTML="&#128549;";
    }
    if (results[1].label=="Angry") {
        document.getElementById("emoji1").innerHTML="&#x1F620;";
    }
    }    
}