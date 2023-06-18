
let songIndex=0;
let audioElem = new Audio('songs/1.mp3');
let masterPlay = document.getElementById("masterPlay");
let progressBar = document.getElementById("progressBar");
let masterSongN = document.getElementById("masterSongN");
let songItems = Array.from(document.getElementsByClassName("songItem"));

let songs=[
    {songName: "Let me love you- JB", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "24k magic - Bruno", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Cold water- JB", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Attention - paul walker", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Finess - Bruno mars", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Sugar - Maroon 5", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Believer - Imagin Dragons", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Pitches - JB", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Congratulations - Post malon", filePath: "songs/9.mp3",coverPath: "covers/9.jpg"}
];

songItems.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName;
})

//song play
masterPlay.addEventListener("click",()=>{
    if(audioElem.paused || audioElem.currentTime<=0)
    {
        audioElem.play();
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
        masterSongN.innerText = songs[songIndex].songName;
        document.querySelector(".songInfo img").style.opacity="1";
        document.querySelectorAll(".songPlay")[songIndex].classList.remove("fa-circle-play");
        document.querySelectorAll(".songPlay")[songIndex].classList.add("fa-circle-pause");     
    }
    else
    {
        audioElem.pause();
        masterPlay.classList.remove("fa-circle-pause");
        masterPlay.classList.add("fa-circle-play");
        document.querySelector(".songInfo img").style.opacity="0";
        document.querySelectorAll(".songPlay")[0].classList.remove("fa-circle-pause");
        document.querySelectorAll(".songPlay")[0].classList.add("fa-circle-play");   
        document.querySelectorAll(".songPlay")[songIndex].classList.remove("fa-circle-pause");
        document.querySelectorAll(".songPlay")[songIndex].classList.add("fa-circle-play");    
    }   
});

//event listener
audioElem.addEventListener("timeupdate",()=>{
    progress = parseInt((audioElem.currentTime/audioElem.duration)*100);
    progressBar.value = progress;
   if(audioElem.currentTime===audioElem.duration)
   {
    masterPlay.classList.remove("fa-circle-pause");
    masterPlay.classList.add("fa-circle-play");
    document.querySelector(".songInfo img").style.opacity="0";
   }
    });

//event for progrss bar

progressBar.addEventListener("change",()=>{
    audioElem.currentTime = progressBar.value * (audioElem.duration/100);
});


const makeAllPlay = ()=>{
    Array.from(document.getElementsByClassName("songPlay")).forEach((element)=>{
        element.classList.remove("fa-circle-pause");
        element.classList.add("fa-circle-play");
    })   
}

Array.from(document.getElementsByClassName("songPlay")).forEach((element)=>{
    element.addEventListener("click",(e)=>{
        console.log(e);
         makeAllPlay();
         if(audioElem.paused || audioElem.currentTime<=0)
         {
         songIndex = parseInt(e.target.id);
        e.target.classList.remove("fa-circle-play");
        e.target.classList.add("fa-circle-pause");
        audioElem.src = 'songs/'+(songIndex+1)+'.mp3';
        masterSongN.innerText = songs[songIndex].songName;
        audioElem.currentTime=0;
        audioElem.play();
        document.querySelector(".songInfo img").style.opacity="1";
       document.getElementById("masterPlay").classList.remove("fa-circle-play");
       document.getElementById("masterPlay").classList.add("fa-circle-pause");
         }
         else{
            makeAllPlay();
            audioElem.pause();
            document.querySelector(".songInfo img").style.opacity="0";
            document.getElementById("masterPlay").classList.remove("fa-circle-pause");
            document.getElementById("masterPlay").classList.add("fa-circle-play");
         }
    });
})

document.getElementById("next").addEventListener("click",()=>{
    makeAllPlay();
    if(songIndex>=8)
    {
        songIndex=0;
    }
    else{
        songIndex+=1;
    }
    audioElem.src = 'songs/'+(songIndex+1)+'.mp3';
    masterSongN.innerText = songs[songIndex].songName;
        audioElem.currentTime=0;
        audioElem.play();
        document.getElementById(songIndex).classList.remove("fa-circle-play");
        document.getElementById(songIndex).classList.add("fa-circle-pause");
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
        document.querySelector(".songInfo img").style.opacity="1";

})

document.getElementById("prev").addEventListener("click",()=>{
    makeAllPlay();
    if(songIndex<=0)
    {
        songIndex=0;
    }
    else{
        songIndex-=1;
    }
    makeAllPlay();
    audioElem.src = 'songs/'+(songIndex+1)+'.mp3';
    masterSongN.innerText = songs[songIndex].songName;
        audioElem.currentTime=0;
        audioElem.play();
        document.getElementById(songIndex).classList.remove("fa-circle-play");
        document.getElementById(songIndex).classList.add("fa-circle-pause");
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
        document.querySelector(".songInfo img").style.opacity="1";
})


 