const container = document.getElementById('container')
const audio = document.getElementById('audio')
const cover = document.getElementById('cover')
const title = document.getElementById('title')
const start = document.getElementById('start')
const end = document.getElementById('end')
const progressContainer = document.getElementById('progress-container')
const progress = document.getElementById('progress')
const inpCharge = document.getElementById('cowbell')


// btn
const prevBtn = document.getElementById('prev')
const playBtn = document.getElementById('play')
const nextBtn = document.getElementById('next')

// music names
const songs = [
    'Ending - Isak Danielson',
    'Heather - Conan Gray',
    'Osmonlarda - Xamdam Sobirov', 
    'U okna - HammAli & Navai',
]

// songIndex

let songIndex = 0

loadSong(songs[songIndex])


// functions
function loadSong(song) {
    title.textContent = song
    audio.src = `musics/${song}.mp3`
    cover.src = `album/${song}.jpg`
}

function play() {
    const isPlaying = container.classList.contains('play')
    // console.log(isPlaying);

    if(isPlaying) {
        pauseSong()
    } else {
        playSong()
    }
}

function playSong () {
    container.classList.add('play')
    playBtn.innerHTML = `<i class="fas fa-pause"></i>`
    audio.play()
}

function pauseSong () {
    container.classList.remove('play')
    playBtn.innerHTML = `<i class="fas fa-play"></i>`
    audio.pause()
}

function next() {
    songIndex++
    if (songIndex > songs.length - 1) {
        songIndex = 0
    }
    loadSong(songs[songIndex])
    audio.play()
}

function prev() {
    songIndex--
    if(songIndex < 0) {
        songIndex = songs.length - 1
    }
    loadSong(songs[songIndex])
    audio.play()
}

function setProgress(e) {
    const duration = e.srcElement.duration
    const curTime = e.srcElement.currentTime   
    const shareWidth = (curTime / duration) * 100 
    progress.style.width = `${shareWidth}%`

    // end time
    let endMin = Math.floor(duration / 60)
    let endSec = Math.floor(duration % 60)
    end.textContent = `${(endMin = endMin < 10 ? '0' + endMin : endMin)}:${(endSec = endSec < 10 ? '0' + endSec : endSec)}`

    // start time
    let curMin = Math.floor(curTime / 60)
    let curSec = Math.floor(curTime % 60)
    start.textContent = `${(curMin = curMin < 10 ? '0' + curMin : curMin)}:${(curSec = curSec < 10 ? '0' + curSec : curSec)}`
}

function progess(e) {
    const width = this.clientWidth
    const widthX = e.offsetX
    const duration = audio.duration
    audio.currentTime = (widthX / width) * duration 
}

function changeVol(e) {
    const volumeMusic = +inpCharge.value / +inpCharge.max
    audio.volume = volumeMusic
}
// events
playBtn.addEventListener('click', play)
nextBtn.addEventListener('click', next) 
prevBtn.addEventListener('click', prev)
audio.addEventListener('timeupdate', setProgress)
audio.addEventListener('ended', next)
progressContainer.addEventListener('click', progess)
inpCharge.addEventListener('change', changeVol)
