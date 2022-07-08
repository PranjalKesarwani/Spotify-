console.log('Welcome to spotify');

// var audio = new Audio('https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3');
// audio.play();

//Initialize the variable 
let songIndex = 0;
let audioElement = new Audio('songs/Zara_Zara_Touch_Me.mp3');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItem = Array.from(document.getElementsByClassName('songItem'));
let songInfo = document.getElementById('songInfo');
let masterPlay = document.getElementById('masterPlay');
songInfo.innerHTML = 'Zara_Zara_Touch_Me';
let nextPlay = document.getElementById('nextPlay');
let previousPlay = document.getElementById('previousPlay');
let mainTimeStamp = document.getElementById('mainTimeStamp')
mainTimeStamp.innerHTML = '00:00';
// let timeStamp = document.getElementsByClassName('timeStamp');
let timeStamp = Array.from(document.getElementsByClassName('timeStamp'));
let minutes ;
let seconds ;

let songs = [
    { songName: 'Zara_Zara_Touch_Me', filePath: 'songs/Zara_Zara_Touch_Me.mp3', coverPath: 'covers/1.jpg' },
    { songName: 'Wakhra_Swag_ni', filePath: 'songs/Wakhra_Swag.mp3', coverPath: 'covers/2.jpg' },
    { songName: 'Whenever', filePath: 'songs/Whenever.mp3', coverPath: 'covers/3.jpg' },
    { songName: 'WIDY', filePath: 'songs/WIDY.mp3', coverPath: 'covers/4.jpg' },
    { songName: 'Woh chali wo chali', filePath: 'songs/Woh_Chali_woh_Chali.mp3', coverPath: 'covers/5.jpg' },
    { songName: 'Woh_Lamhe-Atif_Aslam', filePath: 'songs/Woh_Lamhe.mp3', coverPath: 'covers/6.jpg' },
    { songName: 'Yaariyan-Sunny Sunny', filePath: 'songs/Yaariyan_Sunny_Sunny.mp3', coverPath: 'covers/7.jpg' },
    { songName: 'Yaz fall apart', filePath: 'songs/Yaz_fall apart.mp3', coverPath: 'covers/8.jpg' },
    { songName: 'Yalgaar ho-Carryminati', filePath: 'songs/YALGAAR.mp3', coverPath: 'covers/9.jpg' },
    { songName: 'Zindagi se churake', filePath: 'songs/Zindagi_Se_Churake.mp3', coverPath: 'covers/10.jpg' },
]

songItem.forEach((element, i) => {
    // console.log(element, i);
    element.getElementsByTagName('img')[0].src = songs[i]['coverPath'];
    element.getElementsByTagName('span')[0].innerHTML = songs[i]['songName'];
})

audioElement.addEventListener('timeupdate', () => {
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100)
    myProgressBar.value = progress;
    // console.log('This is current time: ', parseInt(audioElement.currentTime));
    
   let updatingTime = parseInt(audioElement.currentTime);
   
  console.log(updatingTime);
    if(updatingTime < 60){
       seconds = updatingTime;
       seconds = (seconds < 10? '0':'') + seconds;
       minutes = '00';
       
    }
    else if(updatingTime === 60 || updatingTime ===120|| updatingTime ===180|| updatingTime ===240|| updatingTime ===300){
        seconds = 0;
        seconds = (seconds < 10? '0':'') + seconds;
        minutes = minutes + 1;
        minutes = (minutes < 10? '0':'') + minutes;
    }
    else if(updatingTime > 60){
     seconds = updatingTime - 60;
     seconds = (seconds < 10? '0':'') + seconds;
     updatingTime = 0;
    }
    mainTimeStamp.innerHTML = `${minutes}:${seconds}`;

});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

let iconBtn = Array.from(document.getElementsByClassName('iconBtn'));
//Ek baat dhyaan rkhna hmko unhi elements ka icon change krna hai jo pehle se pause icon show kr rhe the...agar sabke change kroge toh jo pehle se play me the unki class me fa-play-circle add ho jaega
const makeAllPlays = (e) => {
    iconBtn.forEach((element) => {
        element.className = 'far fa-2x fa-play-circle iconBtn';
        e.target.className = 'far fa-2x fa-pause-circle iconBtn';
    })
}


iconBtn.forEach((element, i) => {
    // console.log(i);
    element.addEventListener('click', (e) => {
        audioElement.src = songs[i]['filePath'];
        audioElement.setAttribute('id', i);

        songIndex = i;

        if (e.target.className === 'far fa-2x fa-play-circle iconBtn') {
            makeAllPlays(e);
            audioElement.play();
            songInfo.innerHTML = songs[i]['songName'];
            gif.style.opacity = 1;
            masterPlay.className = 'far fa-3x fa-pause-circle';


        }
        else if (e.target.className === 'far fa-2x fa-pause-circle iconBtn') {
            // makeAllPlays(e);
            e.target.className = 'far fa-2x fa-play-circle iconBtn';
            // console.log(audioElement);

            audioElement.pause();
            // console.log('else is working')
            gif.style.opacity = 0;
            // console.log('else if');
            masterPlay.className = 'far fa-3x fa-play-circle';
        }
    })
})


masterPlay.addEventListener('click', (e) => {
    if (audioElement.paused || audioElement.currentTime <= 0) {   //paused ko mai abhi jana ye pre defined javascript property hai, also for current time
        audioElement.play()
        masterPlay.className = 'far fa-3x fa-pause-circle';
        gif.style.opacity = 1;
        iconBtn[songIndex].className = 'far fa-2x fa-pause-circle iconBtn';

    }
    else {
        audioElement.pause();
        masterPlay.className = 'far fa-3x fa-play-circle';
        iconBtn[songIndex].className = 'far fa-2x fa-play-circle iconBtn';

        gif.style.opacity = 0;
    }
})

nextPlay.addEventListener('click', (e) => {
    // console.log('nextPlay working');
    if (songIndex >= 9) {
        songIndex = 0
    }
    else {
        songIndex += 1;
    }
    // console.log(songIndex);
    audioElement.src = songs[songIndex]['filePath'];
    audioElement.currentTime = 0;
    audioElement.play();
    songInfo.innerHTML = songs[songIndex]['songName'];
    iconBtn.forEach((element) => {
        element.className = 'far fa-2x fa-play-circle iconBtn'
    })
    iconBtn[songIndex].className = 'far fa-2x fa-pause-circle iconBtn';
    masterPlay.className = 'far fa-3x fa-pause-circle';
})

previousPlay.addEventListener('click', () => {
    // console.log('previousPlay working');
    if (songIndex <= 0) {
        songIndex = 9
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = songs[songIndex]['filePath'];
    audioElement.currentTime = 0;
    audioElement.play();
    songInfo.innerHTML = songs[songIndex]['songName'];
    iconBtn.forEach((element) => {
        element.className = 'far fa-2x fa-play-circle iconBtn'
    });
    iconBtn[songIndex].className = 'far fa-2x fa-pause-circle iconBtn';
    masterPlay.className = 'far fa-3x fa-pause-circle';
})


// const fruits = ["Banana", "Orange", "Lemon", "Apple", "Mango"];
// const citrus = fruits.slice(1, 3);
// console.log('First slice',citrus);

// const fruits2 = ["Banana", "Orange", "Lemon", "Apple", "Mango"];
// const citrus2 = fruits.slice(-5,-2);
// console.log('Second slice',citrus2);

// const fruits3 = ["Banana", "Orange", "Lemon", "Apple", "Mango"];
// const citrus3 = fruits.slice(-3, -1);
// console.log('Third slice',citrus3);

// const fruits4 = ["Banana", "Orange", "Lemon", "Apple", "Mango"];
// const citrus4 = fruits.slice(2);
// console.log('Fourth slice',citrus4);
// const fruits5 = ["Banana", "Orange", "Lemon", "Apple", "Mango"];
// const citrus5 = fruits.slice(-3);
// console.log('Fifth slice',citrus5);

