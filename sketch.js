let classifier;
let video;
let currentWord;
let currentIndex = 0;
let isPlaying = false;
const words = ['banana', 'watch', 'shoe', 'book', 'phone', 'keyboard', 'shirt', 'pants', 'cup'];
// Create a new p5.speech object/word
const myVoice = new p5.Speech();



function setup() {
    noCanvas();
    // Cam input
    video = createCapture(VIDEO);
    // Initialize the Image Classifier method with MobileNet and the video as the second argument
    classifier = ml5.imageClassifier('MobileNet', video, modelReady);

    select('#start').mousePressed(function () {
        playNextWord();
    });

    select('#next').mousePressed(function () {
        currentIndex++;
        if (currentIndex >= words.length) {
            currentIndex = 0;
        }
        playNextWord();
    });

    myVoice.onEnd = speechEnded;
}

function playNextWord() {
    isPlaying = true;
    currentWord = words[currentIndex];
    select('#instruction').html(`Go find ${currentWord}!`);
    // start classify the video
    classifyVideo();
}

function modelReady() {
    // Change the state
    select('#status').html('Model Loaded');
}

// Get a prediction for the current video frame
function classifyVideo() {
    classifier.classify(gotResult);
}

// When we get a result
function gotResult(err, results) {
    // The results are in an array ordered by confidence.
    // Get the first result string
    const result = results[0].label;
    // Split the first result string by coma and get the first word
    const oneWordRes = result.split(',')[0];
    // Get the top 3 results as strings in an array
    // Read more about map function here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
    const top3Res = results.map(r => r.label);
    // Find if any of the top 3 result strings includes the current word
    // Read more about find function here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
    const ifFound = top3Res.find(r => r.includes(currentWord))
    if (ifFound) {
        // If top 3 results includes the current word
        isPlaying = false;
        select('#message').html(`You found ${currentWord}!`);
        myVoice.speak(`You found ${currentWord}!`);
    } else {
        select('#message').html(`I see ${oneWordRes}`);
        myVoice.speak(`I see ${oneWordRes}`);
    }
}

function speechEnded() {
    if (isPlaying) classifyVideo();
}
