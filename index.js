const songs = [
    {
        "name": "Death Bed",
        "artist": "Powfu",
        "artwork": "https://samplesongs.netlify.app/album-arts/death-bed.jpg",
        "url": "https://samplesongs.netlify.app/Death%20Bed.mp3",
        "id": "1",
        "genre": "Jazz"
    },
    {
        "name": "Bad Liar",
        "artist": "Imagine Dragons",
        "artwork": "https://samplesongs.netlify.app/album-arts/bad-liar.jpg",
        "url": "https://samplesongs.netlify.app/Bad%20Liar.mp3",
        "id": "2",
        "genre": "HipHop"
    },
    {
        "name": "Faded",
        "artist": "Alan Walker",
        "artwork": "https://samplesongs.netlify.app/album-arts/faded.jpg",
        "url": "https://samplesongs.netlify.app/Faded.mp3",
        "id": "3",
        "genre": "Rock"
    },
    {
        "name": "Hate Me",
        "artist": "Ellie Goulding",
        "artwork": "https://samplesongs.netlify.app/album-arts/hate-me.jpg",
        "url": "https://samplesongs.netlify.app/Hate%20Me.mp3",
        "id": "4",
        "genre": "HipHop"
    },
    {
        "name": "Solo",
        "artist": "Clean Bandit",
        "artwork": "https://samplesongs.netlify.app/album-arts/solo.jpg",
        "url": "https://samplesongs.netlify.app/Solo.mp3",
        "id": "5",
        "genre": "Jazz"
    },
    {
        "name": "Without Me",
        "artist": "Halsey",
        "artwork": "https://samplesongs.netlify.app/album-arts/without-me.jpg",
        "url": "https://samplesongs.netlify.app/Without%20Me.mp3",
        "id": "6",
        "genre": "Rock"
    }
];


const selectGenre = document.getElementById("genreSelect");
const allSongs = document.querySelector(".allSongsName");

const songCover = document.getElementById("songCover");
const songName = document.getElementById("songName");
const songArtist = document.getElementById("songArtist");
const songPlayer = document.querySelector(".musicPlayer");

const uniqueGenres = [...new Set(songs.map(song => song.genre))];
uniqueGenres.forEach((genre) => {
    var opt = document.createElement("option");
    opt.innerHTML = genre;
    opt.value = genre;
    selectGenre.appendChild(opt);
});

function showSongs() {
    allSongs.innerHTML = "";

    if (selectGenre.value === "select") {
        songs.forEach((song) => {

            let addSong = document.createElement("li");
            addSong.dataset.id = song.id; // Store the song ID in a custom attribute
            addSong.addEventListener("click", renderCurrentSong);
            addSong.innerText = song.name;
            allSongs.appendChild(addSong);

        });
    } else {
        songs.forEach((song) => {

            if (song.genre === selectGenre.value) {
                let addSong = document.createElement("li");
                addSong.dataset.id = song.id; // Store the song ID in a custom attribute
                addSong.addEventListener("click", renderCurrentSong);
                addSong.innerText = song.name;
                allSongs.appendChild(addSong);

            }

        });
    }

}
selectGenre.addEventListener("change", showSongs);

document.addEventListener("DOMContentLoaded", () => {
    showSongs();
    // console.log();
    let song = songs.find(songFind => songFind.id === songs[0].id);
    console.log(song);
    songPlayer.dataset.id = songs[0].id;
    songCover.src = song.artwork;
    songName.innerHTML = song.name;
    songArtist.innerHTML = song.artist;
    songPlayer.src = song.url;
});

function renderCurrentSong(event) {
    let songId = event.target.dataset.id;
    let song = songs.find(songFind => songFind.id === songId);
    songPlayer.dataset.id = songId;
    songCover.src = song.artwork;
    songName.innerHTML = song.name;
    songArtist.innerHTML = song.artist;
    songPlayer.src = song.url;
}

const previousSong = document.getElementById("previousSong");
previousSong.addEventListener("click", function () {
    let songId = parseInt(songPlayer.dataset.id, 10);
    let previousSongId = songId > 1 ? songId - 1 : songs.length;
    const song = songs.find(songFind => parseInt(songFind.id, 10) === previousSongId);

    songCover.src = song.artwork;
    songName.innerHTML = song.name;
    songArtist.innerHTML = song.artist;
    songPlayer.src = song.url;

    songPlayer.dataset.id = previousSongId;
    songPlayer.play();
});

const nextSong = document.getElementById("nextSong");
nextSong.addEventListener("click", function () {
    let songId = parseInt(songPlayer.dataset.id, 10);
    let nextSongId = songId < songs.length ? songId + 1 : 1;
    const song = songs.find(songFind => parseInt(songFind.id, 10) === nextSongId);

    songCover.src = song.artwork;
    songName.innerHTML = song.name;
    songArtist.innerHTML = song.artist;
    songPlayer.src = song.url;

    songPlayer.dataset.id = nextSongId;
    songPlayer.play();
});

const playlistName = document.getElementById("playlistName");
const allPlaylistDiv = document.querySelector(".allPlaylistDiv");
const createPlaylistbutton = document.getElementById("createPlaylist");
const currentPlaylistDiv = document.querySelector(".currentSongs");
const currentPlaylistHeading = document.querySelector(".currentPlaylist h4");
let noSongsMessage = document.createElement("p");
let currentPlaylist = null;
let playlist = {};

createPlaylistbutton.addEventListener("click", function (event) {
    event.preventDefault();
    createPlaylist();
});

function createPlaylist() {
    let playlistVar = playlistName.value.trim();

    if (playlistVar && !playlist[playlistVar]) {
        // Prevent duplicates
        playlist[playlistVar] = [];
        console.log(playlist);

        // Create a new playlist item
        let addPlaylist = document.createElement("li");
        addPlaylist.innerText = playlistVar;
        addPlaylist.classList.add("playlist-item");
        allPlaylistDiv.appendChild(addPlaylist);

        // Add click event to load the playlist
        addPlaylist.addEventListener("click", function () {
            renderPlaylistSong(playlistVar);
        });

        // Clear input field
        playlistName.value = "";
    } else if (playlist[playlistVar]) {
        alert("Playlist with this name already exists!");
    } else {
        alert("Please enter a valid playlist name");
    }
}

function renderPlaylistSong(playlistName) {
    currentPlaylist = playlistName;
    currentPlaylistHeading.innerText = `Current Playlist: ${playlistName.toUpperCase()}`;
    currentPlaylistDiv.innerHTML = "";

    const songsInPlaylist = playlist[playlistName];
    if (songsInPlaylist.length === 0) {
        noSongsMessage.innerHTML = "No songs in this playlist yet.";
        currentPlaylistDiv.appendChild(noSongsMessage);
    } else {
        songsInPlaylist.forEach(song => {
            let songItem = document.createElement("li");
            songItem.innerText = song.name + " - " + song.artist;
            songItem.dataset.id = song.id;

            // Add "Remove" button
            let removeButton = document.createElement("button");
            removeButton.innerText = "X";
            removeButton.title = "Remove Song";
            removeButton.classList.add("remove-song");
            removeButton.addEventListener("click", function () {
                removeSongFromPlaylist(song.id); // Pass the song ID to remove the song
            });

            songItem.appendChild(removeButton);

            // Add click event to play the song
            songItem.addEventListener("click", playSongFromPlaylist);

            currentPlaylistDiv.appendChild(songItem);
        });
    }
}


function addToPlaylist() {
    if (!currentPlaylist) {
        alert("Please select a playlist first!");
        return;
    }

    // Get the currently playing song
    const songId = parseInt(songPlayer.dataset.id, 10);
    const song = songs.find(songFind => songFind.id === songId.toString());

    if (song && !playlist[currentPlaylist].find(s => s.id === song.id)) {
        playlist[currentPlaylist].push(song);

        // Update the Current Playlist display
        let songItem = document.createElement("li");
        songItem.innerText = song.name + " - " + song.artist;
        noSongsMessage.style.display = "none";
        songItem.dataset.id = song.id;

        let removeButton = document.createElement("button");
        removeButton.innerText = "X";
        removeButton.title = "Remove Song";
        removeButton.classList.add("remove-song");
        removeButton.addEventListener("click", function () {
            removeSongFromPlaylist(song.id); // Pass the song ID to remove the song
        });

        songItem.appendChild(removeButton);

        songItem.addEventListener("click", playSongFromPlaylist);
        currentPlaylistDiv.appendChild(songItem);
    } else {
        alert("This song is already in the playlist!");
    }
}
document.querySelector(".addToPlaylist").addEventListener("click", addToPlaylist);

function removeSongFromPlaylist(songId) {
    if (!currentPlaylist || !playlist[currentPlaylist]) {
        alert("Error: No playlist selected!");
        return;
    }

    // Filter out the song by ID from the playlist
    playlist[currentPlaylist] = playlist[currentPlaylist].filter(song => song.id !== songId);

    // Re-render the playlist to reflect the changes
    renderPlaylistSong(currentPlaylist);

    // Optional: Show a message
    alert("Song removed from the playlist!");
}


function playSongFromPlaylist(event) {
    const songId = event.target.dataset.id; // Get the song ID from the clicked element
    const song = songs.find(songFind => songFind.id === songId);

    if (song) {
        // Update song player with the selected song's details
        songPlayer.dataset.id = songId;
        songCover.src = song.artwork;
        songName.innerHTML = song.name;
        songArtist.innerHTML = song.artist;
        songPlayer.src = song.url;

        songPlayer.play(); // Start playing the song
    }
}

const darkModeToggle = document.getElementById("darkmode-toggle");

function toggleTheme() {
    const root = document.documentElement;
    const currentTheme = root.getAttribute("data-theme") || "light";
    const newTheme = currentTheme === "light" ? "dark" : "light";
    root.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
}


darkModeToggle.addEventListener("change", toggleTheme);

document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
    darkModeToggle.checked = savedTheme === "dark";
});

const searchAllSongs = document.querySelector(".searchAllSongs");


// Add event listener to the search input
searchAllSongs.addEventListener("input", searchSong);

function searchSong() {
    // Clear the song list before adding new matches
    allSongs.innerHTML = "";

    // Get the current search value
    const searchValue = searchAllSongs.value.trim().toLowerCase();

    // If search is empty, show all songs
    if (searchValue.length === 0) {
        showSongs();
        return;
    }

    // Filter songs and display matches
    songs.forEach((song) => {
        if (song.name.toLowerCase().includes(searchValue)) {
            // Create a list item for the matching song
            const addSong = document.createElement("li");
            addSong.dataset.id = song.id; // Store the song ID in a custom attribute
            addSong.addEventListener("click", renderCurrentSong);
            addSong.innerText = song.name;
            allSongs.appendChild(addSong);
        }
    });
}


const searchPlaylist = document.querySelector(".searchPlaylist");
// Add event listener to the search input
searchPlaylist.addEventListener("input", filterPlaylists);

function filterPlaylists() {
    // Clear the playlist display
    allPlaylistDiv.innerHTML = "";

    // Get the search input value
    const searchValue = searchPlaylist.value.trim().toLowerCase();

    // If input is empty, show all playlists
    if (searchValue.length === 0) {
        displayAllPlaylists();
        return;
    }

    // Filter and display matching playlists
    Object.keys(playlist).forEach((playlistName) => {
        if (playlistName.toLowerCase().includes(searchValue)) {
            let addPlaylist = document.createElement("li");
            addPlaylist.innerText = playlistName;
            addPlaylist.classList.add("playlist-item");
            allPlaylistDiv.appendChild(addPlaylist);

            // Add click event to load the playlist
            addPlaylist.addEventListener("click", function () {
                renderPlaylistSong(playlistName);
            });
        }
    });
}

function displayAllPlaylists() {
    // Clear the playlist display
    allPlaylistDiv.innerHTML = "";

    // Display all playlists
    Object.keys(playlist).forEach((playlistName) => {
        let addPlaylist = document.createElement("li");
        addPlaylist.innerText = playlistName;
        addPlaylist.classList.add("playlist-item");
        allPlaylistDiv.appendChild(addPlaylist);

        // Add click event to load the playlist
        addPlaylist.addEventListener("click", function () {
            renderPlaylistSong(playlistName);
        });
    });
}


document.addEventListener("DOMContentLoaded", () => {
    displayAllPlaylists();
});

