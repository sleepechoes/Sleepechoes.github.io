const username = "Penguinblade1"; // your Last.fm username
const apiKey = "YOUR_API_KEY";    // replace with your Last.fm API key

async function fetchNowPlaying() {
  try {
    const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json&limit=1`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.recenttracks && data.recenttracks.track.length > 0) {
      const track = data.recenttracks.track[0];
      const name = track.name;
      const artist = track.artist["#text"];
      const art = track.image[2]["#text"] || "https://via.placeholder.com/64";

      document.getElementById("track-name").textContent = name;
      document.getElementById("track-artist").textContent = artist;
      document.getElementById("track-art").src = art;
    }
  } catch (err) {
    console.error("Error fetching Last.fm data", err);
  }
}

// Update every 20 seconds
fetchNowPlaying();
setInterval(fetchNowPlaying, 20000);
