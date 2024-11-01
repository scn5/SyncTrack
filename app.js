// Spotify login button click handler
document.getElementById('spotify-login-btn').addEventListener('click', function() {
  // Redirects to the Spotify login endpoint on the server
  window.location.href = 'http://localhost:3000/spotify-login';
});

// YouTube login button click handler
document.getElementById('youtube-login-btn').addEventListener('click', function() {
  // Redirects to the YouTube login endpoint on the server
  window.location.href = 'http://localhost:3000/youtube-login';
});

/**
* Fetch Spotify playlists
* @param {string} access_token - The access token obtained after Spotify login
*/
function fetchSpotifyPlaylists(access_token) {
  // Makes an HTTP GET request to the server to fetch Spotify playlists
  fetch(`http://localhost:3000/spotify/playlists?access_token=${access_token}`)
      .then(response => response.json()) // Parses the JSON response
      .then(data => {
          // Logs the playlist data to the console for debugging
          console.log("Spotify Playlists:", data);
      })
      .catch(error => console.error("Error fetching Spotify playlists:", error)); // Error handling
}

/**
* Create a YouTube playlist
* @param {string} access_token - The access token obtained after YouTube login
*/
function createYouTubePlaylist(access_token) {
  // Makes an HTTP POST request to the server to create a new YouTube playlist
  fetch(`http://localhost:3000/youtube/create-playlist?access_token=${access_token}`, {
      method: 'POST', // Sets the request method to POST for creating a resource
  })
      .then(response => response.json()) // Parses the JSON response
      .then(data => {
          // Logs the created playlist data to the console for debugging
          console.log("YouTube Playlist Created:", data);
      })
      .catch(error => console.error("Error creating YouTube playlist:", error)); // Error handling
}


// Key Components Explanation:
// Spotify Login Button Event Listener:

// When the spotify-login-btn button is clicked, the browser is redirected to the server endpoint for Spotify login (http://localhost:3000/spotify-login).
// YouTube Login Button Event Listener:

// When the youtube-login-btn button is clicked, the browser redirects to the server endpoint for YouTube login (http://localhost:3000/youtube-login).
// fetchSpotifyPlaylists Function:

// Takes an access_token as an argument, which is required to authenticate the request.
// Sends a GET request to the server endpoint to fetch the user's Spotify playlists.
// Uses fetch() to retrieve data from the server and then() to parse the response as JSON.
// Logs the playlist data in the console for debugging or further processing.
// Catches and logs any errors that occur during the request.
// createYouTubePlaylist Function:

// Also takes an access_token for authentication.
// Sends a POST request to the server endpoint to create a new YouTube playlist.
// Uses fetch() with the POST method to create a new playlist on YouTube.
// Logs the newly created playlist data in the console for debugging.
// Catches and logs any errors that may occur during the request.
// These functions enable login and playlist management for Spotify and YouTube. They communicate with a backend server to handle authentication and manage playlists.