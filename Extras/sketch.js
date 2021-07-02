let fotoClassifier;
let video;
let woord;
let mijnIndex = 0;
let speeltSpel = false;
const woorden = ['hair spray', 'umbrella', 'shoe', 'book', 'phone', 'lighter', 'wallet', 'comic book', 'mouse'];
// dit zorgt dat de p5.speech bepaalde woorden kan uitseprekn
const praten = new p5.Speech();

function setup() {
    noCanvas();
    //webcam laten werken
    video = createCapture(VIDEO);
    //Laat de MobileNet/ml5 classiefier werken
    fotoClassifier = ml5.imageClassifier('MobileNet', video, modelReady);

    //beginnen
    select('#start').mousePressed(function () {
        VolgendWoord();
    });

    //volgendwoord
    select('#next').mousePressed(function () {
        mijnIndex++;
        if (mijnIndex >= woorden.length) {
            mijnIndex = 0;
        }
        VolgendWoord();
    });

    praten.onEnd = stopPraten;
}

function VolgendWoord() {
    speeltSpel = true;
    woord = woorden[mijnIndex];
    select('#instruction').html(`Go find ${woord}!`);
    //begin foto classification
    fotoClassificationVideo();
}

function modelReady() {
    // model gaat van wacht ff naar je kan app gebruiken
    select('#status').html('Model Loaded');
}

// krijg een resultaat
function fotoClassificationVideo() {
    fotoClassifier.classify(gotResult);
}

// eyy je hebt een resultaat
function gotResult(error, results) {
    // check 1e resultaat
    const result = results[0].label;
    // kies 1 woord
    const oneWoord = result.split(',')[0];
    //pakt de beste opties
    const top3 = results.map(r => r.label);
    // checked of woord goed is
    const Gevonden = top3.find(r => r.includes(woord))
    if (Gevonden) {
        //als je item hebt gevonden game stopt
        speeltSpel = false;
        select('#message').html(`You found ${woord}!`);
        praten.speak(`You found ${woord}!`);
    } else {
        select('#message').html(`I see ${oneWoord}`);
        praten.speak(`I see ${oneWoord}`);
    }
}

function stopPraten() {
    if (speeltSpel) fotoClassificationVideo();
}
