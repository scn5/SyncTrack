// Spotify login
document.getElementById('spotify-login-btn').addEventListener('click', function() {
    window.location.href = 'http://localhost:3000/spotify-login';
  });
  
  // YouTube login
  document.getElementById('youtube-login-btn').addEventListener('click', function() {
    window.location.href = 'http://localhost:3000/youtube-login';
  });
  
  // Fetch Spotify playlists
  function fetchSpotifyPlaylists(access_token) {
    fetch(`http://localhost:3000/spotify/playlists?access_token=${access_token}`)
      .then(response => response.json())
      .then(data => {
        console.log("Spotify Playlists:", data);
      })
      .catch(error => console.error("Error fetching Spotify playlists:", error));
  }
  
  // Create a YouTube playlist
  function createYouTubePlaylist(access_token) {
    fetch(`http://localhost:3000/youtube/create-playlist?access_token=${access_token}`, {
      method: 'POST',
    })
      .then(response => response.json())
      .then(data => {
        console.log("YouTube Playlist Created:", data);
      })
      .catch(error => console.error("Error creating YouTube playlist:", error));
  }
  