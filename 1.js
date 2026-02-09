//alert("welcome to appify this is only for personal use of ARPITA");

let songindex = 0;
let audioelement = new Audio('audioelement');
let masterplay = document.getElementById('masterplay');
let myprogressbar = document.getElementById('progressbar');
let gif = document.getElementById('gif');
let mastersong = document.getElementById('mastersong');
let songitem = Array.from(document.getElementsByClassName('songitem'));


let song = [
    {songname : "1", filepath : "songs/1.mp3", coverpath : "covers/1.jpg"},
    {songname : "2", filepath : "songs/2.mp3", coverpath : "covers/2.jpg"},
    {songname : "3", filepath : "songs/3.mp3", coverpath : "covers/3.jpg"},
    {songname : "4", filepath : "songs/4.mp3", coverpath : "covers/4.jpg"},
    {songname : "5", filepath : "songs/5.mp3", coverpath : "covers/5.jpg"},
    {songname : "6", filepath : "songs/6.mp3", coverpath : "covers/6.jpg"},
    {songname : "7", filepath : "songs/7.mp3", coverpath : "covers/7.jpg"},
    {songname : "8", filepath : "songs/8.mp3", coverpath : "covers/8.jpg"},
    {songname : "9", filepath : "songs/9.mp3", coverpath : "covers/9.jpg"},
    {songname : "10", filepath : "songs/10.mp3", coverpath : "covers/10.jpg"},
    {songname : "11", filepath : "songs/11.mp3", coverpath : "covers/11.jpg"},
    {songname : "12", filepath : "songs/12.mp3", coverpath : "covers/12.jpg"}
]

songitem.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = song[i].coverpath;
    element.getElementsByClassName('songname')[0].src = song[i].currentTime;
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
        audioelement.src = "songs/"+ (songindex+1) +".mp3";
        mastersong.innerText = song[songindex].songname;
        audioelement.currentTime = 0;
        audioelement.play();
        gif.style.opacity = 1;
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songindex>9){
        songindex = 0;
    }
    else{
        songindex = songindex+1;
    }
    audioelement.src = "songs/"+ (songindex+1) +".mp3";
    audioelement.currentTime = 0;
    audioelement.play();
    masterplay.classList.remove('fa-circle-play');
    masterplay.classList.add('fa-circle-pause');
    mastersong.innerText = song[songindex].songname;
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songindex<=0){
        songindex = 0;
    }
    else{
        songindex = songindex-1;
    }
    audioelement.src = "songs/"+ (songindex+1) +".mp3";
        audioelement.currentTime = 0;
        audioelement.play();
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
        mastersong.innerText = song[songindex-1].songname;
})
