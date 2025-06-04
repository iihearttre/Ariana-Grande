// Product List (dummy example)
const products = [
  { name: "Star Corset", price: 10.00, image: "starcorset.jpg" },
  { name: "Heart Hoodie", price: 15.54, image: "hoodie.jpg" },
  { name: "Flare Jeans", price: 19.99, image: "flare.jpg" },
];

// Display Products
function displayProducts() {
  const container = document.getElementById("products");
  container.innerHTML = "";
  products.forEach(p => {
    container.innerHTML += `
      <div class="col-md-4 mb-4">
        <div class="card">
          <img src="${p.image}" class="card-img-top" alt="${p.name}">
          <div class="card-body">
            <h5 class="card-title">${p.name}</h5>
            <p class="card-text">$${p.price.toFixed(2)}</p>
            <button class="btn btn-primary">Add to Cart</button>
          </div>
        </div>
      </div>
    `;
  });
}
displayProducts();

// Product Search
function searchProducts() {
  const query = document.getElementById("searchBox").value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(query));
  const container = document.getElementById("products");
  container.innerHTML = "";
  filtered.forEach(p => {
    container.innerHTML += `
      <div class="col-md-4 mb-4">
        <div class="card">
          <img src="${p.image}" class="card-img-top" alt="${p.name}">
          <div class="card-body">
            <h5 class="card-title">${p.name}</h5>
            <p class="card-text">$${p.price.toFixed(2)}</p>
            <button class="btn btn-primary">Add to Cart</button>
          </div>
        </div>
      </div>
    `;
  });
}

// Music Player
const songs = [
  { title: "Pink XOXO", file: "pink-xoxo.mp3", lyrics: "Lyrics for Pink XOXO..." },
  { title: "June Gloom", file: "june-gloom.mp3", lyrics: "Lyrics for June Gloom..." },
  { title: "Supernatural", file: "supernatural-Lyric.mp3", lyrics: "Lyrics for Supernatural..." },
];
let currentIndex = 0;
let isLooping = false;

const audio = document.getElementById("bg-music");
const currentSongTitle = document.getElementById("currentSongTitle");
const playlist = document.getElementById("playlist");
const lyricsBox = document.getElementById("lyrics");
const loopStatus = document.getElementById("loopStatus");

function loadSong(index) {
  const song = songs[index];
  audio.src = song.file;
  currentSongTitle.textContent = song.title;
  lyricsBox.textContent = song.lyrics;
  updatePlaylistUI(index);
  audio.play();
}

function updatePlaylistUI(activeIndex) {
  playlist.innerHTML = "";
  songs.forEach((song, i) => {
    const li = document.createElement("li");
    li.textContent = song.title;
    li.className = "list-group-item";
    if (i === activeIndex) li.classList.add("active");
    li.onclick = () => {
      currentIndex = i;
      loadSong(currentIndex);
    };
    playlist.appendChild(li);
  });
}

function togglePlayPause() {
  audio.paused ? audio.play() : audio.pause();
}

function skipSong() {
  currentIndex = (currentIndex + 1) % songs.length;
  loadSong(currentIndex);
}

function toggleLoop() {
  isLooping = !isLooping;
  loopStatus.textContent = isLooping ? "On" : "Off";
  audio.loop = isLooping;
}

audio.addEventListener("ended", () => {
  if (!isLooping) skipSong();
});

loadSong(currentIndex);

// Auth UI (just UI toggles, not real auth)
document.querySelector(".btn-primary").onclick = () => alert("Sign Up clicked!");
document.querySelector(".btn-success").onclick = () => alert("Login clicked!");
document.querySelector(".btn-danger").onclick = () => alert("Logout clicked!");

// Fake Feedback System (Local Storage)
document.querySelector(".btn-warning").onclick = () => {
  const feedback = document.getElementById("feedback").value;
  if (feedback) {
    const list = JSON.parse(localStorage.getItem("feedbacks") || "[]");
    list.push(feedback);
    localStorage.setItem("feedbacks", JSON.stringify(list));
    document.getElementById("feedback").value = "";
    loadFeedbacks();
  }
};

function loadFeedbacks() {
  const ul = document.getElementById("feedbackList");
  ul.innerHTML = "";
  const list = JSON.parse(localStorage.getItem("feedbacks") || "[]");
  list.forEach(f => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.textContent = f;
    ul.appendChild(li);
  });
}
loadFeedbacks();

// Fake Upload
document.querySelector(".btn-info").onclick = () => {
  const fileInput = document.getElementById("fileInput");
  if (fileInput.files.length > 0) {
    alert(`Pretending to upload: ${fileInput.files[0].name}`);
    fileInput.value = "";
  }
};
