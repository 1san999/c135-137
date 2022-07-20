status1 = "";
objects = [];
video = "";
function setup(){
    canvas = createCanvas(380,480);
    canvas.center();
    video.hide();
}

function preload(){
    video = createVideo('video.mp4');
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}
function modelLoaded(){
    console.log(" model loaded");
    status1 = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
function draw(){
    image(video, 0, 0, 380, 480);
    if (status1 != ""){
        objectDetector.detect(video, gotResult)
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are " + objects.length;
            fill("#8b2138");
            percent = floor(objects[i].confidence*100);
            text(objects[i].label+""+percent+"%", objects[i].x+15, objects[i].y+15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
}
}
function gotResult(error, results){
    if (error){
        console.log(error);
    }
    else {
    console.log(results); 
    objects = results;
    }
}