//alert("welcome to appify this is only for personal use of SUBHAM");

let songindex = 0;
let audioelement = new Audio();
let masterplay = document.getElementById('masterplay');
let myprogressbar = document.getElementById('progressbar');
let gif = document.getElementById('gif');
let mastersong = document.getElementById('mastersong');
let songitem = Array.from(document.getElementsByClassName('songitem'));
let timespan = document.getElementsByClassName('timespan');


let song = [
    {songname : "", filepath : "", coverpath : ""},
    {songname : "Arz kiya hai", filepath : "songs/1.mp3", coverpath : "covers/1.jpg"},
    {songname : "Kashish", filepath : "songs/2.mp3", coverpath : "covers/2.jpg"},
    {songname : "Saiyaara", filepath : "songs/3.mp3", coverpath : "covers/3.jpg"},
    {songname : "Saiyyan", filepath : "songs/4.mp3", coverpath : "covers/4.jpg"},
    {songname : "Brooklyn Baby", filepath : "songs/5.mp3", coverpath : "covers/5.jpg"},
    {songname : "O Rangrez", filepath : "songs/6.mp3", coverpath : "covers/6.jpg"},
    {songname : "Greedy", filepath : "songs/7.mp3", coverpath : "covers/7.jpg"},
    {songname : "eyes don't lie", filepath : "songs/8.mp3", coverpath : "covers/8.jpg"},
    {songname : "make you mine", filepath : "songs/9.mp3", coverpath : "covers/9.jpg"},
    {songname : "Blinding Lights", filepath : "songs/10.mp3", coverpath : "covers/10.jpg"},
    {songname : "Starboy", filepath : "songs/11.mp3", coverpath : "covers/11.jpg"},
    {songname : "Teri Jhuki Nazar", filepath : "songs/12.mp3", coverpath : "covers/12.jpg"},
    {songname : "Die With A Smile", filepath : "songs/13.mp3", coverpath : "covers/13.jpg"},
    {songname : "Ye Tune Kya Kiya", filepath : "songs/14.mp3", coverpath : "covers/14.jpg"},
    {songname : "O Re Piya", filepath : "songs/15.mp3", coverpath : "covers/15.jpg"},
    {songname : "Chura Liya Hai", filepath : "songs/16.mp3", coverpath : "covers/16.jpg"},
    {songname : "Chahun Main Ya Naa", filepath : "songs/17.mp3", coverpath : "covers/17.jpg"},
    {songname : "Humsafar", filepath : "songs/18.mp3", coverpath : "covers/18.jpg"},
    {songname : "Him And I", filepath : "songs/19.mp3", coverpath : "covers/19.jpg"},
    {songname : "Moral Of The Story", filepath : "songs/20.mp3", coverpath : "covers/20.jpg"},
]

songitem.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = song[i+1].coverpath;
    element.getElementsByClassName('songname')[0].src = song[i].songname;
});

masterplay.addEventListener('click', ()=>{
    if(audioelement.paused || audioelement.currentTime<=0){
        audioelement.play();
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else{
        audioelement.pause();
        masterplay.classList.remove('fa-circle-pause');
        masterplay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})

audioelement.addEventListener('timeupdate', ()=>{
    progress = parseInt((audioelement.currentTime/audioelement.duration)*100);
    console.log(progress);
    myprogressbar.value = progress;
})

myprogressbar.addEventListener("change", ()=>{
    audioelement.currentTime = myprogressbar.value*audioelement.duration/100;
})

const makeallplays = ()=>{
    Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeallplays();
        songindex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioelement.src = "songs/"+ (songindex) +".mp3";
        mastersong.innerText = song[songindex].songname;
        audioelement.currentTime = 0;
        audioelement.play();
        gif.style.opacity = 1;
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songindex>songindex.length){
        songindex = 1;
    }
    else{
        songindex ++;
    }
    audioelement.src = "songs/"+ (songindex) +".mp3";
    audioelement.currentTime = 0;
    audioelement.play();
    masterplay.classList.remove('fa-circle-play');
    masterplay.classList.add('fa-circle-pause');
    mastersong.innerText = song[songindex].songname;

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songindex<=1){
        songindex = 1;
    }
    else{
        songindex --;
    }
    audioelement.src = "songs/"+ (songindex) +".mp3";
        audioelement.currentTime = 0;
        audioelement.play();
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
        mastersong.innerText = song[songindex].songname;
})

// AUTO PLAY NEXT SONG WHEN CURRENT SONG ENDS
audioelement.addEventListener("ended", () => {

    // move to next song
    if(songindex >= song.length - 1){
        songindex = 1;   // restart playlist (because index 0 is empty in your array)
    } else {
        songindex++;
    }

    // load and play next song
    audioelement.src = "songs/" + songindex + ".mp3";
    mastersong.innerText = song[songindex].songname;
    audioelement.currentTime = 0;
    audioelement.play();

    // update UI
    masterplay.classList.remove('fa-circle-play');
    masterplay.classList.add('fa-circle-pause');
    gif.style.opacity = 1;
});

// SHOW CURRENT TIME + TOTAL DURATION
audioelement.addEventListener("timeupdate", () => {

    if(audioelement.duration){

        let currentMinutes = Math.floor(audioelement.currentTime / 60);
        let currentSeconds = Math.floor(audioelement.currentTime % 60);

        let totalMinutes = Math.floor(audioelement.duration / 60);
        let totalSeconds = Math.floor(audioelement.duration % 60);

        // add 0 before seconds (2:05 format)
        if(currentSeconds < 10) currentSeconds = "0" + currentSeconds;
        if(totalSeconds < 10) totalSeconds = "0" + totalSeconds;

        // if you have one time span
        document.querySelector(".timespan").textContent =
            currentMinutes + ":" + currentSeconds +
            " / " +
            totalMinutes + ":" + totalSeconds;
    }
});


