const audio = document.getElementById("audio");

const playBtn = document.getElementById("playBtn");
const previousBtn = document.getElementById("previousBtn");
const nextBtn = document.getElementById("nextBtn");

const shuffleBtn = document.getElementById("shuffleBtn");
const repeatBtn = document.getElementById("repeatBtn");

const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");

const songTitle = document.getElementById("songTitle");
const songNumber = document.getElementById("songNumber");

const playlist = document.getElementById("playlist");
const search = document.getElementById("search");


// ========================================
// YOUR SONGS
// ========================================

const songs = [
    {
        name: "Song 1",
        file: "music/song1.mp3"
    },

    {
        name: "Song 2",
        file: "music/song2.mp3"
    },

    {
        name: "Song 3",
        file: "music/song3.mp3"
    },

    {
        name: "Song 4",
        file: "music/song4.mp3"
    },

    {
        name: "Song 5",
        file: "music/song5.mp3"
    },

    {
        name: "Song 6",
        file: "music/song6.mp3"
    },

    {
        name: "Song 7",
        file: "music/song7.mp3"
    },

    {
        name: "Song 8",
        file: "music/song8.mp3"
    },

    {
        name: "Song 9",
        file: "music/song9.mp3"
    },

    {
        name: "Song 10",
        file: "music/song10.mp3"
    }
];


// ========================================
// PLAYER VARIABLES
// ========================================

let currentSong = 0;

let isPlaying = false;

let shuffle = false;

let repeat = false;


// ========================================
// CREATE PLAYLIST
// ========================================

function createPlaylist(songList = songs) {

    playlist.innerHTML = "";

    songList.forEach((song) => {

        const originalIndex = songs.indexOf(song);

        const div = document.createElement("div");

        div.classList.add("song");

        if (originalIndex === currentSong) {
            div.classList.add("active");
        }

        div.innerHTML = `
            <div class="song-number">
                ${originalIndex + 1}
            </div>

            <div class="song-info">

                <div class="song-name">
                    ${song.name}
                </div>

                <div class="song-file">
                    ${song.file}
                </div>

            </div>

            <div>
                🎵
            </div>
        `;

        div.addEventListener("click", () => {

            currentSong = originalIndex;

            loadSong();

            playSong();

        });

        playlist.appendChild(div);

    });

}


// ========================================
// LOAD SONG
// ========================================

function loadSong() {

    const song = songs[currentSong];

    audio.src = song.file;

    songTitle.textContent = song.name;

    songNumber.textContent =
        `Track ${currentSong + 1} of ${songs.length}`;

    progress.value = 0;

    createPlaylist();

}


// ========================================
// PLAY
// ========================================

function playSong() {

    audio.play();

    isPlaying = true;

    playBtn.textContent = "⏸️";

}


// ========================================
// PAUSE
// ========================================

function pauseSong() {

    audio.pause();

    isPlaying = false;

    playBtn.textContent = "▶️";

}


// ========================================
// PLAY / PAUSE BUTTON
// ========================================

playBtn.addEventListener("click", () => {

    if (isPlaying) {

        pauseSong();

    } else {

        playSong();

    }

});


// ========================================
// NEXT SONG
// ========================================

function nextSong() {

    if (shuffle) {

        let newSong;

        do {

            newSong =
                Math.floor(Math.random() * songs.length);

        } while (
            newSong === currentSong &&
            songs.length > 1
        );

        currentSong = newSong;

    } else {

        currentSong++;

        if (currentSong >= songs.length) {

            currentSong = 0;

        }

    }

    loadSong();

    playSong();

}

nextBtn.addEventListener("click", nextSong);


// ========================================
// PREVIOUS SONG
// ========================================

previousBtn.addEventListener("click", () => {

    currentSong--;

    if (currentSong < 0) {

        currentSong = songs.length - 1;

    }

    loadSong();

    playSong();

});


// ========================================
// SONG ENDED
// ========================================

audio.addEventListener("ended", () => {

    if (repeat) {

        audio.currentTime = 0;

        playSong();

    } else {

        nextSong();

    }

});


// ========================================
// PROGRESS BAR
// ========================================

audio.addEventListener("timeupdate", () => {

    if (!audio.duration) return;

    const percentage =
        (audio.currentTime / audio.duration) * 100;

    progress.value = percentage;

    currentTime.textContent =
        formatTime(audio.currentTime);

    duration.textContent =
        formatTime(audio.duration);

});


progress.addEventListener("input", () => {

    if (!audio.duration) return;

    audio.currentTime =
        (progress.value / 100) * audio.duration;

});


// ========================================
// FORMAT TIME
// ========================================

function formatTime(seconds) {

    if (isNaN(seconds)) {
        return "0:00";
    }

    const minutes =
        Math.floor(seconds / 60);

    const secs =
        Math.floor(seconds % 60);

    return `${minutes}:${secs
        .toString()
        .padStart(2, "0")}`;

}


// ========================================
// VOLUME
// ========================================

volume.addEventListener("input", () => {

    audio.volume = volume.value;

});

audio.volume = 1;


// ========================================
// SHUFFLE
// ========================================

shuffleBtn.addEventListener("click", () => {

    shuffle = !shuffle;

    if (shuffle) {

        shuffleBtn.style.opacity = "1";

    } else {

        shuffleBtn.style.opacity = "0.5";

    }

});


// ========================================
// REPEAT
// ========================================

repeatBtn.addEventListener("click", () => {

    repeat = !repeat;

    if (repeat) {

        repeatBtn.style.opacity = "1";

    } else {

        repeatBtn.style.opacity = "0.5";

    }

});


// ========================================
// SEARCH
// ========================================

search.addEventListener("input", () => {

    const searchText =
        search.value.toLowerCase();

    const filteredSongs =
        songs.filter(song =>
            song.name
                .toLowerCase()
                .includes(searchText)
        );

    createPlaylist(filteredSongs);

});


// ========================================
// INITIALIZE
// ========================================

createPlaylist();

loadSong();