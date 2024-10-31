// // server.js

// const express = require('express');
// const axios = require('axios');
// const bodyParser = require('body-parser');
// const querystring = require('querystring');
// require('dotenv').config();


// const app = express();
// const PORT = process.env.PORT || 3000;
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // Test if environment variables are loaded correctly
// const clientId = process.env.SPOTIFY_CLIENT_ID || SPOTIFY_CLIENT_ID;//"5ee6ff8a3e0648ab978234f839131649";
// const redirectUri = process.env.SPOTIFY_REDIRECT_URI || SPOTIFY_REDIRECT_URI;//"http://localhost:3000/spotify/callback";
// console.log("Spotify Client ID:", clientId);
// console.log("Spotify Redirect URI:", redirectUri);

// // Define a route for the root URL
// app.get('/', (req, res) => {
//     const spotifyToken = req.query.spotify_token; // Extract the token from the query parameters
//     res.send(`
//         <h1>Welcome to the Spotify and YouTube OAuth App</h1>
//         <a href="/spotify-login">Login to Spotify</a><br>
//         <a href="/youtube-login">Login to YouTube Music</a><br>
//         ${spotifyToken ? `<p>Your Spotify Token: ${spotifyToken}</p>` : ''}
//     `);
// });


// // Spotify login route
// app.get('/spotify-login', (req, res) => {
//     const scope = 'playlist-read-private';
//     const url = `https://accounts.spotify.com/authorize?${querystring.stringify({
//         client_id: process.env.SPOTIFY_CLIENT_ID,
//         response_type: 'code',
//         redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
//         scope: scope
//     })}`;
//     console.log('Spotify Authorization URL:', url); // Log the URL
//     res.redirect(url);
// });



// // Callback route for Spotify
// app.get('/spotify/callback', async (req, res) => {
//     console.log('Spotify Client ID:', process.env.SPOTIFY_CLIENT_ID);
//     console.log('Spotify Redirect URI:', process.env.SPOTIFY_REDIRECT_URI);

//     const code = req.query.code;
    
//     // Check if the code is present
//     if (!code) {
//         console.error('Authorization code not received');
//         return res.status(400).send("Authorization code not received");
//     }

//     try {
//         const response = await axios.post('https://accounts.spotify.com/api/token', querystring.stringify({
//             grant_type: 'authorization_code',
//             code: code,
//             redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
//             client_id: process.env.SPOTIFY_CLIENT_ID,
//             client_secret: process.env.SPOTIFY_CLIENT_SECRET
//         }), {
//             headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
//         });

//         const access_token = response.data.access_token;

//         // Fetch playlists after getting access token
//         const playlistsResponse = await axios.get('https://api.spotify.com/v1/me/playlists', {
//             headers: { Authorization: `Bearer ${access_token}` }
//         });

//         // Render the playlists on the web page
//         res.send(`
//             <h1>Your Playlists</h1>
//             <ul>
//                 ${playlistsResponse.data.items.map(playlist => `
//                     <li>
//                         <a href="#" onclick="alert('Selected playlist: ${playlist.name}')">
//                             ${playlist.name}
//                         </a>
//                     </li>
//                 `).join('')}
//             </ul>
//             <a href="/">Go Back</a>
//         `);
//     } catch (error) {
//         console.error('Error exchanging code for Spotify token:', error.response ? error.response.data : error.message);
//         res.status(500).send("Error exchanging code for Spotify token");
//     }
// });

// // Example route to fetch playlists using the access token
// app.get('/playlists', async (req, res) => {
//     const spotifyToken = req.query.spotify_token; // Get the token from the query parameters

//     console.log('Received Spotify Token:', spotifyToken); // Log the received token

//     try {
//         const response = await axios.get('https://api.spotify.com/v1/me/playlists', {
//             headers: {
//                 'Authorization': `Bearer ${spotifyToken}`
//             }
//         });

//         console.log('Playlists Response:', response.data); // Log the response from Spotify

//         const playlists = response.data.items.map(playlist => `
//             <li>
//                 <a href="${playlist.external_urls.spotify}" target="_blank">${playlist.name}</a>
//                 <p>${playlist.description || 'No description'}</p>
//             </li>
//         `).join('');

//         res.send(`
//             <h1>Your Playlists</h1>
//             <ul>
//                 ${playlists || '<li>No playlists found</li>'} <!-- Handle empty playlists -->
//             </ul>
//             <a href="/">Go Back</a>
//         `);
//     } catch (error) {
//         console.error('Error fetching playlists:', error.response ? error.response.data : error.message); // Log the error response
//         const errorMessage = error.response && error.response.data && error.response.data.error 
//             ? error.response.data.error.message 
//             : "An unexpected error occurred";

//         res.status(500).send("Error fetching playlists: " + errorMessage);
//     }
// });






// // YouTube login route
// app.get('/youtube-login', (req, res) => {
//     const scope = 'https://www.googleapis.com/auth/youtube';
//     const url = `https://accounts.google.com/o/oauth2/auth?${querystring.stringify({
//         client_id: process.env.YOUTUBE_CLIENT_ID,
//         redirect_uri: process.env.YOUTUBE_REDIRECT_URI,
//         response_type: 'code',
//         scope: scope,
//         access_type: 'offline'
//     })}`;
//     res.redirect(url);
// });
  
// // Callback route for YouTube
// app.get('/youtube/callback', async (req, res) => {
//     const code = req.query.code;

//     try {
//         const response = await axios.post('https://oauth2.googleapis.com/token', querystring.stringify({
//             code: code,
//             client_id: process.env.YOUTUBE_CLIENT_ID,
//             client_secret: process.env.YOUTUBE_CLIENT_SECRET,
//             redirect_uri: process.env.YOUTUBE_REDIRECT_URI,
//             grant_type: 'authorization_code'
//         }), {
//             headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
//         });

//         const access_token = response.data.access_token;
//         res.redirect(`/?youtube_token=${access_token}`);
//     } catch (error) {
//         console.error('Error exchanging code for YouTube token:', error);
//         res.status(500).send("Error exchanging code for YouTube token");
//     }
// });



// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });





//    CODE - 1 ENDS!!!!!!!!!!!!!!!!!!!!





//    CODE - 2 STARTS!!!!!!!!!!!!!!!!!!!!!!!!




// // Import required libraries
// const express = require('express'); // Web server framework
// const axios = require('axios'); // HTTP client for making requests
// const bodyParser = require('body-parser'); // Parses incoming request bodies
// const querystring = require('querystring'); // Helps construct URL query strings
// require('dotenv').config(); // Loads environment variables from .env file

// // Initialize Express app and define port
// const app = express();
// const PORT = process.env.PORT || 3000;

// // Use body-parser to handle JSON and URL-encoded data
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // Define Spotify credentials from environment variables
// const clientId = process.env.SPOTIFY_CLIENT_ID;
// const redirectUri = process.env.SPOTIFY_REDIRECT_URI;

// // Print to console to confirm environment variables are loaded
// console.log("Spotify Client ID:", clientId);
// console.log("Spotify Redirect URI:", redirectUri);

// // Root route to display a basic HTML page with login links for Spotify and YouTube
// app.get('/', (req, res) => {
//     const spotifyToken = req.query.spotify_token;
//     res.send(`
//         <h1>Welcome to the Spotify and YouTube OAuth App</h1>
//         <a href="/spotify-login">Login to Spotify</a><br>
//         <a href="/youtube-login">Login to YouTube Music</a><br>
//         ${spotifyToken ? `<p>Your Spotify Token: ${spotifyToken}</p>` : ''}
//     `);
// });

// // Route for Spotify login
// app.get('/spotify-login', (req, res) => {
//     // Define the permissions scope for Spotify
//     const scope = 'playlist-read-private';

//     // Create the Spotify authorization URL
//     const url = `https://accounts.spotify.com/authorize?${querystring.stringify({
//         client_id: process.env.SPOTIFY_CLIENT_ID,
//         response_type: 'code',
//         redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
//         scope: scope
//     })}`;

//     // Redirect the user to the Spotify authorization page
//     res.redirect(url);
// });

// // Callback route for handling Spotify's response
// app.get('/spotify/callback', async (req, res) => {
//     const code = req.query.code;

//     // Check if authorization code is received
//     if (!code) return res.status(400).send("Authorization code not received");

//     // Exchange authorization code for access token
//     try {
//         const response = await axios.post('https://accounts.spotify.com/api/token', querystring.stringify({
//             grant_type: 'authorization_code',
//             code: code,
//             redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
//             client_id: process.env.SPOTIFY_CLIENT_ID,
//             client_secret: process.env.SPOTIFY_CLIENT_SECRET
//         }), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });

//         // Store the access token
//         const access_token = response.data.access_token;
//         res.redirect(`/?spotify_token=${access_token}`);
//     } catch (error) {
//         res.status(500).send("Error exchanging code for Spotify token");
//     }
// });

// // Fetch and sort playlist data using custom data structures
// app.get('/sorted-playlist', async (req, res) => {
//     const spotifyToken = req.query.spotify_token;

//     try {
//         // Fetch user playlists from Spotify
//         const playlistResponse = await axios.get('https://api.spotify.com/v1/me/playlists', {
//             headers: { 'Authorization': `Bearer ${spotifyToken}` }
//         });

//         const playlistData = playlistResponse.data.items; // Retrieve playlist items
//         const songList = getSongDataFromPlaylist(playlistData); // Generate song data list
//         quickSort(songList, 0, songList.length - 1); // Sort songs by play count

//         // Insert sorted songs into a Max-Heap
//         const maxHeap = new MaxHeap();
//         songList.forEach(song => maxHeap.insert(song));

//         // Extract songs from Max-Heap to display in descending order
//         let sortedSongs = [];
//         while (maxHeap.heap.length) sortedSongs.push(maxHeap.extractMax());

//         // Display sorted songs
//         res.send(`
//             <h1>Sorted Playlist by Play Count</h1>
//             <ul>${sortedSongs.map(song => `<li>${song.name} - Plays: ${song.playCount}</li>`).join('')}</ul>
//             <a href="/">Go Back</a>
//         `);
//     } catch (error) {
//         res.status(500).send("Error sorting playlist by play count");
//     }
// });

// // YouTube login route
// app.get('/youtube-login', (req, res) => {
//     const scope = 'https://www.googleapis.com/auth/youtube';
//     const url = `https://accounts.google.com/o/oauth2/auth?${querystring.stringify({
//         client_id: process.env.YOUTUBE_CLIENT_ID,
//         redirect_uri: process.env.YOUTUBE_REDIRECT_URI,
//         response_type: 'code',
//         scope: scope,
//         access_type: 'offline'
//     })}`;
//     res.redirect(url);
// });

// // Callback route for YouTube authentication
// app.get('/youtube/callback', async (req, res) => {
//     const code = req.query.code;

//     try {
//         const response = await axios.post('https://oauth2.googleapis.com/token', querystring.stringify({
//             code: code,
//             client_id: process.env.YOUTUBE_CLIENT_ID,
//             client_secret: process.env.YOUTUBE_CLIENT_SECRET,
//             redirect_uri: process.env.YOUTUBE_REDIRECT_URI,
//             grant_type: 'authorization_code'
//         }), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });

//         const access_token = response.data.access_token;
//         res.redirect(`/?youtube_token=${access_token}`);
//     } catch (error) {
//         res.status(500).send("Error exchanging code for YouTube token");
//     }
// });

// // Custom data structures and sorting functions

// /**
//  * Helper function to parse playlist data into an array of song objects.
//  * Each song object contains a name and playCount.
//  */
// function getSongDataFromPlaylist(playlistData) {
//     let songList = [];
//     playlistData.forEach(song => {
//         let playCount = song.play_count || Math.floor(Math.random() * 100); // Random play count for example purposes
//         songList.push({ name: song.name, playCount: playCount });
//     });
//     return songList;
// }

// // QuickSort algorithm to sort songs based on play count in descending order
// function quickSort(arr, left, right) {
//     if (left < right) {
//         const pivotIndex = partition(arr, left, right);
//         quickSort(arr, left, pivotIndex - 1);
//         quickSort(arr, pivotIndex + 1, right);
//     }
// }

// // Partition function for QuickSort, rearranges elements based on pivot
// function partition(arr, left, right) {
//     const pivotValue = arr[right].playCount;
//     let i = left;
//     for (let j = left; j < right; j++) {
//         if (arr[j].playCount > pivotValue) {
//             [arr[i], arr[j]] = [arr[j], arr[i]];
//             i++;
//         }
//     }
//     [arr[i], arr[right]] = [arr[right], arr[i]];
//     return i;
// }

// // MaxHeap class for retrieving songs in sorted order of play counts
// class MaxHeap {
//     constructor() {
//         this.heap = [];
//     }

//     // Inserts a new song into the heap
//     insert(song) {
//         this.heap.push(song);
//         this.bubbleUp(this.heap.length - 1);
//     }

//     // Moves the new element up to its correct position
//     bubbleUp(index) {
//         while (index > 0) {
//             let parentIndex = Math.floor((index - 1) / 2);
//             if (this.heap[index].playCount <= this.heap[parentIndex].playCount) break;
//             [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
//             index = parentIndex;
//         }
//     }

//     // Removes and returns the element with the highest play count
//     extractMax() {
//         if (this.heap.length === 0) return null;
//         if (this.heap.length === 1) return this.heap.pop();
//         const max = this.heap[0];
//         this.heap[0] = this.heap.pop();
//         this.bubbleDown(0);
//         return max;
//     }

//     // Moves the root element down to its correct position
//     bubbleDown(index) {
//         const length = this.heap.length;
//         const element = this.heap[index];
//         while (true) {
//             let leftChildIdx = 2 * index + 1;
//             let rightChildIdx = 2 * index + 2;
//             let swap = null;

//             if (leftChildIdx < length) {
//                 if (this.heap[leftChildIdx].playCount > element.playCount) swap = leftChildIdx;
//             }
//             if (rightChildIdx < length) {
//                 if (this.heap[rightChildIdx].playCount > (swap === null ? element.playCount : this.heap[leftChildIdx].playCount)) {
//                     swap = rightChildIdx;
//                 }
//             }
//             if (swap === null) break;
//             this.heap[index] = this.heap[swap];
//             this.heap[swap] = element;
//             index = swap;
//         }
//     }
// }

// // Start the server and listen on specified PORT
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });


//    CODE - 2 ENDS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1




//    CODE - 3 STARTS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// // server.js

// const express = require('express');
// const axios = require('axios');
// const bodyParser = require('body-parser');
// const querystring = require('querystring');
// require('dotenv').config();

// const app = express();
// const PORT = process.env.PORT || 3000;
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // Environment Variables
// const clientId = process.env.SPOTIFY_CLIENT_ID;
// const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
// const redirectUri = process.env.SPOTIFY_REDIRECT_URI;
// const youtubeClientId = process.env.YOUTUBE_CLIENT_ID;
// const youtubeClientSecret = process.env.YOUTUBE_CLIENT_SECRET;
// const youtubeRedirectUri = process.env.YOUTUBE_REDIRECT_URI;

// // Home Route
// app.get('/', (req, res) => {
//     res.send(`
//         <h1>Welcome to the Spotify and YouTube OAuth App</h1>
//         <a href="/spotify-login">Login to Spotify</a><br>
//         <a href="/youtube-login">Login to YouTube Music</a>
//     `);
// });

// // Spotify Login
// app.get('/spotify-login', (req, res) => {
//     const scope = 'playlist-read-private';
//     const url = `https://accounts.spotify.com/authorize?${querystring.stringify({
//         client_id: clientId,
//         response_type: 'code',
//         redirect_uri: redirectUri,
//         scope: scope
//     })}`;
//     res.redirect(url);
// });

// // Spotify Callback and Playlist Processing
// app.get('/spotify/callback', async (req, res) => {
//     const code = req.query.code;
//     try {
//         const response = await axios.post('https://accounts.spotify.com/api/token', querystring.stringify({
//             grant_type: 'authorization_code',
//             code: code,
//             redirect_uri: redirectUri,
//             client_id: clientId,
//             client_secret: clientSecret
//         }), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });

//         const access_token = response.data.access_token;

//         // Fetch Spotify Playlists
//         const playlistsResponse = await axios.get('https://api.spotify.com/v1/me/playlists', {
//             headers: { Authorization: `Bearer ${access_token}` }
//         });

//         // Parse playlists and apply data structures and sorting
//         const songFrequency = new Map(); // Hash map for play counts

//         for (const playlist of playlistsResponse.data.items) {
//             const tracksResponse = await axios.get(playlist.tracks.href, {
//                 headers: { Authorization: `Bearer ${access_token}` }
//             });
//             for (const item of tracksResponse.data.items) {
//                 const songName = item.track.name;
//                 songFrequency.set(songName, (songFrequency.get(songName) || 0) + 1);
//             }
//         }

//         // Convert map to array and sort using max-heap for play count order
//         const songArray = Array.from(songFrequency.entries());
//         songArray.sort((a, b) => b[1] - a[1]);

//         // Render the sorted playlist on the page
//         res.send(`
//             <h1>Sorted Playlist by Play Count</h1>
//             <ul>
//                 ${songArray.map(([song, count]) => `<li>${song} - ${count} plays</li>`).join('')}
//             </ul>
//             <a href="/">Go Back</a>
//         `);
//     } catch (error) {
//         console.error('Error exchanging code for Spotify token or fetching playlists:', error.response?.data || error.message);
//         res.status(500).send("Error processing Spotify data");
//     }
// });

// // YouTube Login
// app.get('/youtube-login', (req, res) => {
//     const scope = 'https://www.googleapis.com/auth/youtube';
//     const url =  'https://accounts.google.com/o/oauth2/auth?client_id=315084889925-fsq0aib3htq26j18li7sbtl8ihm8tj5e.apps.googleusercontent.com&redirect_uri=http://localhost:3000/youtube/callback&response_type=code&scope=https://www.googleapis.com/auth/youtube&access_type=offline&prompt=consent'
//     // `https://accounts.google.com/o/oauth2/auth?${querystring.stringify({
//     //     client_id: youtubeClientId,
//     //     redirect_uri: youtubeRedirectUri,
//     //     response_type: 'code',
//     //     scope: scope,
//     //     access_type: 'offline',
//     //     prompt: 'consent'
//     // })}`;
//     res.redirect(url);
// });

// // YouTube Callback
// app.get('/youtube/callback', async (req, res) => {
//     const code = req.query.code;
//     try {
//         const response = await axios.post('https://oauth2.googleapis.com/token', querystring.stringify({
//             code: code,
//             client_id: youtubeClientId,
//             client_secret: youtubeClientSecret,
//             redirect_uri: youtubeRedirectUri,
//             grant_type: 'authorization_code'
//         }), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });

//         const access_token = response.data.access_token;

//         // You could add YouTube playlist creation or management functionality here
//         res.send(`
//             <h1>YouTube OAuth Success</h1>
//             <p>Your YouTube access token has been successfully acquired.</p>
//             <a href="/">Go Back</a>
//         `);
//     } catch (error) {
//         console.error('Error exchanging code for YouTube token:', error.response?.data || error.message);
//         res.status(500).send("Error processing YouTube data");
//     }
// });

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });



// CODE 3 ENDS!!!!!!!!!!!!!!!!!!!!


//  CODE 4 STARTS!!!!!!!!!!!!!!!!!!!!!!!!!!



// // server.js

// const express = require('express');
// const axios = require('axios');
// const bodyParser = require('body-parser');
// const querystring = require('querystring');
// require('dotenv').config();

// const app = express();
// const PORT = process.env.PORT || 3000;
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // Environment Variables
// const clientId = process.env.SPOTIFY_CLIENT_ID;
// const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
// const redirectUri = process.env.SPOTIFY_REDIRECT_URI;
// const youtubeClientId = process.env.YOUTUBE_CLIENT_ID;
// const youtubeClientSecret = process.env.YOUTUBE_CLIENT_SECRET;
// const youtubeRedirectUri = process.env.YOUTUBE_REDIRECT_URI;

// // Home Route
// app.get('/', (req, res) => {
//     res.send(`
//         <h1>Welcome to the Spotify and YouTube OAuth App</h1>
//         <a href="/spotify-login">Login to Spotify</a><br>
//         <a href="/youtube-login">Login to YouTube Music</a>
//     `);
// });

// // Spotify Login
// app.get('/spotify-login', (req, res) => {
//     const scope = 'playlist-read-private';
//     const url = `https://accounts.spotify.com/authorize?${querystring.stringify({
//         client_id: clientId,
//         response_type: 'code',
//         redirect_uri: redirectUri,
//         scope: scope
//     })}`;
//     res.redirect(url);
// });

// // Spotify Callback and Playlist Processing
// app.get('/spotify/callback', async (req, res) => {
//     const code = req.query.code;
//     try {
//         const response = await axios.post('https://accounts.spotify.com/api/token', querystring.stringify({
//             grant_type: 'authorization_code',
//             code: code,
//             redirect_uri: redirectUri,
//             client_id: clientId,
//             client_secret: clientSecret
//         }), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });

//         const access_token = response.data.access_token;

//         // Fetch Spotify Playlists
//         const playlistsResponse = await axios.get('https://api.spotify.com/v1/me/playlists', {
//             headers: { Authorization: `Bearer ${access_token}` }
//         });

//         // Render playlists in a dropdown
//         const playlists = playlistsResponse.data.items;
//         res.send(`
//             <h1>Select a Playlist</h1>
//             <form action="/spotify/playlist" method="get">
//                 <select name="playlistId">
//                     ${playlists.map(playlist => `<option value="${playlist.id}">${playlist.name}</option>`).join('')}
//                 </select>
//                 <button type="submit">View Playlist Songs</button>
//             </form>
//             <a href="/">Go Back</a>
//         `);
//     } catch (error) {
//         console.error('Error exchanging code for Spotify token or fetching playlists:', error.response?.data || error.message);
//         res.status(500).send("Error processing Spotify data");
//     }
// });

// // Spotify Playlist Songs Endpoint
// app.get('/spotify/playlist', async (req, res) => {
//     const playlistId = req.query.playlistId;
//     try {
//         const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
//             headers: { Authorization: `Bearer ${clientId}` }
//         });

//         const songFrequency = new Map();

//         response.data.items.forEach(item => {
//             const songName = item.track.name;
//             songFrequency.set(songName, (songFrequency.get(songName) || 0) + 1);
//         });

//         // Sort songs by play count using max-heap logic
//         const songArray = Array.from(songFrequency.entries());
//         songArray.sort((a, b) => b[1] - a[1]);

//         // Display sorted songs
//         res.send(`
//             <h1>Sorted Songs by Play Count</h1>
//             <ul>
//                 ${songArray.map(([song, count]) => `<li>${song} - ${count} plays</li>`).join('')}
//             </ul>
//             <a href="/">Go Back</a>
//         `);
//     } catch (error) {
//         console.error('Error fetching playlist tracks:', error.response?.data || error.message);
//         res.status(500).send("Error processing playlist data");
//     }
// });

// // YouTube Login
// app.get('/youtube-login', (req, res) => {
//     const scope = 'https://www.googleapis.com/auth/youtube';
//     const url = `https://accounts.google.com/o/oauth2/auth?${querystring.stringify({
//         client_id: youtubeClientId,
//         redirect_uri: youtubeRedirectUri,
//         response_type: 'code',
//         scope: scope,
//         access_type: 'offline',
//         prompt: 'consent'
//     })}`;
//     res.redirect(url);
// });

// // YouTube Callback
// app.get('/youtube/callback', async (req, res) => {
//     const code = req.query.code;
//     try {
//         const response = await axios.post('https://oauth2.googleapis.com/token', querystring.stringify({
//             code: code,
//             client_id: youtubeClientId,
//             client_secret: youtubeClientSecret,
//             redirect_uri: youtubeRedirectUri,
//             grant_type: 'authorization_code'
//         }), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });

//         const access_token = response.data.access_token;

//         res.send(`
//             <h1>YouTube OAuth Success</h1>
//             <p>Your YouTube access token has been successfully acquired.</p>
//             <a href="/">Go Back</a>
//         `);
//     } catch (error) {
//         console.error('Error exchanging code for YouTube token:', error.response?.data || error.message);
//         res.status(500).send("Error processing YouTube data");
//     }
// });

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });




//   CODE 4 ENDS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


//    CODE 5 STARTS!!!!!!!!!!!!!!!!!!!!!!!!!!!



// // server.js

// const express = require('express');
// const axios = require('axios');
// const bodyParser = require('body-parser');
// const querystring = require('querystring');
// require('dotenv').config();

// const app = express();
// const PORT = process.env.PORT || 3000;
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // Environment Variables
// const clientId = process.env.SPOTIFY_CLIENT_ID;
// const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
// const redirectUri = process.env.SPOTIFY_REDIRECT_URI;
// const youtubeClientId = process.env.YOUTUBE_CLIENT_ID;
// const youtubeClientSecret = process.env.YOUTUBE_CLIENT_SECRET;
// const youtubeRedirectUri = process.env.YOUTUBE_REDIRECT_URI;

// // Home Route
// app.get('/', (req, res) => {
//     res.send(`
//         <h1>Welcome to the Spotify and YouTube OAuth App</h1>
//         <a href="/spotify-login">Login to Spotify</a><br>
//         <a href="/youtube-login">Login to YouTube Music</a>
//     `);
// });

// // Spotify Login
// app.get('/spotify-login', (req, res) => {
//     const scope = 'playlist-read-private user-library-read';
//     const url = `https://accounts.spotify.com/authorize?${querystring.stringify({
//         client_id: clientId,
//         response_type: 'code',
//         redirect_uri: redirectUri,
//         scope: scope
//     })}`;
//     res.redirect(url);
// });

// // Spotify Callback and Playlist Processing
// app.get('/spotify/callback', async (req, res) => {
//     const code = req.query.code;
//     try {
//         const response = await axios.post('https://accounts.spotify.com/api/token', querystring.stringify({
//             grant_type: 'authorization_code',
//             code: code,
//             redirect_uri: redirectUri,
//             client_id: clientId,
//             client_secret: clientSecret
//         }), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });

//         const access_token = response.data.access_token;

//         // Function to fetch playlists with pagination
//         async function fetchAllPlaylists() {
//             let allPlaylists = [];
//             let offset = 0;
//             let limit = 20;
//             let total;

//             do {
//                 const playlistsResponse = await axios.get(`https://api.spotify.com/v1/me/playlists?limit=${limit}&offset=${offset}`, {
//                     headers: { Authorization: `Bearer ${access_token}` }
//                 });
//                 allPlaylists = allPlaylists.concat(playlistsResponse.data.items);
//                 total = playlistsResponse.data.total;
//                 offset += limit;
//             } while (offset < total);

//             return allPlaylists;
//         }

//         // Fetch all playlists
//         const playlists = await fetchAllPlaylists();

//         // Fetch Liked Songs separately
//         playlists.unshift({ name: "Liked Songs", id: "liked_songs" });

//         // Render playlists in a dropdown
//         res.send(`
//             <h1>Select a Playlist</h1>
//             <form action="/spotify/playlist" method="get">
//                 <input type="hidden" name="access_token" value="${access_token}">
//                 <select name="playlistId">
//                     ${playlists.map(playlist => `<option value="${playlist.id}">${playlist.name}</option>`).join('')}
//                 </select>
//                 <button type="submit">View Playlist Songs</button>
//             </form>
//             <a href="/">Go Back</a>
//         `);
//     } catch (error) {
//         console.error('Error exchanging code for Spotify token or fetching playlists:', error.response?.data || error.message);
//         res.status(500).send("Error processing Spotify data");
//     }
// });

// // Spotify Playlist Songs Endpoint
// app.get('/spotify/playlist', async (req, res) => {
//     const playlistId = req.query.playlistId;
//     const access_token = req.query.access_token;

//     try {
//         let tracks;

//         if (playlistId === "liked_songs") {
//             // Fetch Liked Songs if selected
//             const likedSongsResponse = await axios.get('https://api.spotify.com/v1/me/tracks', {
//                 headers: { Authorization: `Bearer ${access_token}` }
//             });
//             tracks = likedSongsResponse.data.items.map(item => item.track.name);
//         } else {
//             // Fetch tracks from the selected playlist
//             const tracksResponse = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
//                 headers: { Authorization: `Bearer ${access_token}` }
//             });
//             tracks = tracksResponse.data.items.map(item => item.track.name);
//         }

//         // Count song occurrences
//         const songFrequency = new Map();
//         tracks.forEach(songName => {
//             songFrequency.set(songName, (songFrequency.get(songName) || 0) + 1);
//         });

//         // Sort songs by play count
//         const songArray = Array.from(songFrequency.entries()).sort((a, b) => b[1] - a[1]);

//         // Display sorted songs
//         res.send(`
//             <h1>Sorted Songs by Play Count</h1>
//             <ul>
//                 ${songArray.map(([song, count]) => `<li>${song} - ${count} plays</li>`).join('')}
//             </ul>
//             <a href="/">Go Back</a>
//         `);
//     } catch (error) {
//         console.error('Error fetching playlist tracks:', error.response?.data || error.message);
//         res.status(500).send("Error processing playlist data");
//     }
// });

// // YouTube Login
// app.get('/youtube-login', (req, res) => {
//     const scope = 'https://www.googleapis.com/auth/youtube';
//     const url = `https://accounts.google.com/o/oauth2/auth?${querystring.stringify({
//          client_id: youtubeClientId,
//          redirect_uri: youtubeRedirectUri,
//          response_type: 'code',
//          scope: scope,
//          access_type: 'offline',
//          prompt: 'consent'
//      })}`;
//     res.redirect(url);
// });

// // YouTube Callback
// app.get('/youtube/callback', async (req, res) => {
//     const code = req.query.code;
//     try {
//         const response = await axios.post('https://oauth2.googleapis.com/token', querystring.stringify({
//             code: code,
//             client_id: youtubeClientId,
//             client_secret: youtubeClientSecret,
//             redirect_uri: youtubeRedirectUri,
//             grant_type: 'authorization_code'
//         }), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });

//         const access_token = response.data.access_token;

//         // You could add YouTube playlist creation or management functionality here
//         res.send(`
//             <h1>YouTube OAuth Success</h1>
//             <p>Your YouTube access token has been successfully acquired.</p>
//             <a href="/">Go Back</a>
//         `);
//     } catch (error) {
//         console.error('Error exchanging code for YouTube token:', error.response?.data || error.message);
//         res.status(500).send("Error processing YouTube data");
//     }
// });

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });


//    CODE 5 ENDS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


//    CODE 6 STARTS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


// // server.js

// const express = require('express');
// const axios = require('axios');
// const bodyParser = require('body-parser');
// const querystring = require('querystring');
// require('dotenv').config();

// const app = express();
// const PORT = process.env.PORT || 3000;
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // Environment Variables
// const clientId = process.env.SPOTIFY_CLIENT_ID;
// const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
// const redirectUri = process.env.SPOTIFY_REDIRECT_URI;
// const youtubeClientId = process.env.YOUTUBE_CLIENT_ID;
// const youtubeClientSecret = process.env.YOUTUBE_CLIENT_SECRET;
// const youtubeRedirectUri = process.env.YOUTUBE_REDIRECT_URI;

// let youtubeAccessToken = ""; // Store YouTube access token

// // Home Route
// app.get('/', (req, res) => {
//     res.send(`
//         <h1>Welcome to the Spotify and YouTube OAuth App</h1>
//         <a href="/spotify-login">Login to Spotify</a><br>
//         <a href="/youtube-login">Login to YouTube Music</a>
//     `);
// });

// // Spotify Login
// app.get('/spotify-login', (req, res) => {
//     const scope = 'playlist-read-private user-library-read';
//     const url = `https://accounts.spotify.com/authorize?${querystring.stringify({
//         client_id: clientId,
//         response_type: 'code',
//         redirect_uri: redirectUri,
//         scope: scope
//     })}`;
//     res.redirect(url);
// });

// // Spotify Callback and Playlist Processing
// app.get('/spotify/callback', async (req, res) => {
//     const code = req.query.code;
//     try {
//         const response = await axios.post('https://accounts.spotify.com/api/token', querystring.stringify({
//             grant_type: 'authorization_code',
//             code: code,
//             redirect_uri: redirectUri,
//             client_id: clientId,
//             client_secret: clientSecret
//         }), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });

//         const access_token = response.data.access_token;

//         // Function to fetch playlists with pagination
//         async function fetchAllPlaylists() {
//             let allPlaylists = [];
//             let offset = 0;
//             let limit = 20;
//             let total;

//             do {
//                 const playlistsResponse = await axios.get(`https://api.spotify.com/v1/me/playlists?limit=${limit}&offset=${offset}`, {
//                     headers: { Authorization: `Bearer ${access_token}` }
//                 });
//                 allPlaylists = allPlaylists.concat(playlistsResponse.data.items);
//                 total = playlistsResponse.data.total;
//                 offset += limit;
//             } while (offset < total);

//             return allPlaylists;
//         }

//         // Fetch all playlists
//         const playlists = await fetchAllPlaylists();

//         // Render playlists in a dropdown for transfer
//         res.send(`
//             <h1>Select a Playlist to Transfer</h1>
//             <form action="/transfer-playlist" method="get">
//                 <input type="hidden" name="access_token" value="${access_token}">
//                 <select name="playlistId">
//                     ${playlists.map(playlist => `<option value="${playlist.id}">${playlist.name}</option>`).join('')}
//                 </select>
//                 <button type="submit">Transfer to YouTube</button>
//             </form>
//             <a href="/">Go Back</a>
//         `);
//     } catch (error) {
//         console.error('Error exchanging code for Spotify token or fetching playlists:', error.response?.data || error.message);
//         res.status(500).send("Error processing Spotify data");
//     }
// });

// // YouTube Login
// app.get('/youtube-login', (req, res) => {
//     const scope = 'https://www.googleapis.com/auth/youtube';
//     const url = `https://accounts.google.com/o/oauth2/auth?${querystring.stringify({
//          client_id: youtubeClientId,
//          redirect_uri: youtubeRedirectUri,
//          response_type: 'code',
//          scope: scope,
//          access_type: 'offline',
//          prompt: 'consent'
//      })}`;
//     res.redirect(url);
// });

// // YouTube Callback
// app.get('/youtube/callback', async (req, res) => {
//     const code = req.query.code;
//     try {
//         const response = await axios.post('https://oauth2.googleapis.com/token', querystring.stringify({
//             code: code,
//             client_id: youtubeClientId,
//             client_secret: youtubeClientSecret,
//             redirect_uri: youtubeRedirectUri,
//             grant_type: 'authorization_code'
//         }), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });

//         youtubeAccessToken = response.data.access_token;

//         res.send(`
//             <h1>YouTube OAuth Success</h1>
//             <p>Your YouTube access token has been successfully acquired.</p>
//             <a href="/">Go Back</a>
//         `);
//     } catch (error) {
//         console.error('Error exchanging code for YouTube token:', error.response?.data || error.message);
//         res.status(500).send("Error processing YouTube data");
//     }
// });

// // Transfer Playlist from Spotify to YouTube
// app.get('/transfer-playlist', async (req, res) => {
//     const playlistId = req.query.playlistId;
//     const spotifyAccessToken = req.query.access_token;

//     try {
//         // Fetch Spotify playlist tracks
//         const tracksResponse = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
//             headers: { Authorization: `Bearer ${spotifyAccessToken}` }
//         });
//         const tracks = tracksResponse.data.items.map(item => item.track.name);

//         // Create a new YouTube playlist
//         const playlistCreateResponse = await axios.post('https://www.googleapis.com/youtube/v3/playlists?part=snippet', {
//             snippet: {
//                 title: 'Transferred Playlist from Spotify',
//                 description: 'Playlist transferred from Spotify to YouTube'
//             }
//         }, { headers: { Authorization: `Bearer ${youtubeAccessToken}` } });

//         const youtubePlaylistId = playlistCreateResponse.data.id;

//         // Add each song to YouTube playlist
//         for (const song of tracks) {
//             // Search for the song on YouTube
//             const searchResponse = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(song)}&type=video&maxResults=1`, {
//                 headers: { Authorization: `Bearer ${youtubeAccessToken}` }
//             });
//             const videoId = searchResponse.data.items[0]?.id?.videoId;

//             // Add video to YouTube playlist if found
//             if (videoId) {
//                 await axios.post('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet', {
//                     snippet: {
//                         playlistId: youtubePlaylistId,
//                         resourceId: {
//                             kind: "youtube#video",
//                             videoId: videoId
//                         }
//                     }
//                 }, { headers: { Authorization: `Bearer ${youtubeAccessToken}` } });
//             }
//         }

//         res.send(`<h1>Playlist successfully transferred to YouTube!</h1><a href="/">Go Back</a>`);
//     } catch (error) {
//         console.error('Error transferring playlist:', error.response?.data || error.message);
//         res.status(500).send("Error transferring playlist to YouTube");
//     }
// });

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });



//     CODE 6 ENDS!!!!!!!!!!!!!!!!!!!!!!!!!!!


//     CODE 7 STARTS!!!!!!!!!!!!!!!!!!!!!!!!!!!


// server.js

const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const querystring = require('querystring');
const session = require('express-session');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize session
app.use(session({
    secret: 'abcdef', // Replace with a secure secret
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

// Environment Variables
const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const redirectUri = process.env.SPOTIFY_REDIRECT_URI;
const youtubeClientId = process.env.YOUTUBE_CLIENT_ID;
const youtubeClientSecret = process.env.YOUTUBE_CLIENT_SECRET;
const youtubeRedirectUri = process.env.YOUTUBE_REDIRECT_URI;

// Home Route
app.get('/', (req, res) => {
    res.send(`
        <h1>Welcome to the Spotify and YouTube OAuth App</h1>
        <a href="/spotify-login">Login to Spotify</a><br>
        <a href="/youtube-login">Login to YouTube Music</a>
    `);
});

// Spotify Login
app.get('/spotify-login', (req, res) => {
    const scope = 'playlist-read-private user-library-read';
    const url = `https://accounts.spotify.com/authorize?${querystring.stringify({
        client_id: clientId,
        response_type: 'code',
        redirect_uri: redirectUri,
        scope: scope
    })}`;
    res.redirect(url);
});

// Spotify Callback and Playlist Processing
app.get('/spotify/callback', async (req, res) => {
    const code = req.query.code;
    try {
        const response = await axios.post('https://accounts.spotify.com/api/token', querystring.stringify({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: redirectUri,
            client_id: clientId,
            client_secret: clientSecret
        }), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });

        const access_token = response.data.access_token;

        // Function to fetch playlists with pagination
        async function fetchAllPlaylists() {
            let allPlaylists = [];
            let offset = 0;
            let limit = 20;
            let total;

            do {
                const playlistsResponse = await axios.get(`https://api.spotify.com/v1/me/playlists?limit=${limit}&offset=${offset}`, {
                    headers: { Authorization: `Bearer ${access_token}` }
                });
                allPlaylists = allPlaylists.concat(playlistsResponse.data.items);
                total = playlistsResponse.data.total;
                offset += limit;
            } while (offset < total);

            return allPlaylists;
        }

        // Fetch all playlists
        const playlists = await fetchAllPlaylists();

        // Fetch Liked Songs separately
        playlists.unshift({ name: "Liked Songs", id: "liked_songs" });

        // Render playlists in a dropdown
        res.send(`
            <h1>Select a Playlist</h1>
            <form action="/spotify/playlist" method="get">
                <input type="hidden" name="access_token" value="${access_token}">
                <select name="playlistId">
                    ${playlists.map(playlist => `<option value="${playlist.id}">${playlist.name}</option>`).join('')}
                </select>
                <button type="submit">View Playlist Songs</button>
            </form>
            <a href="/">Go Back</a>
        `);
    } catch (error) {
        console.error('Error exchanging code for Spotify token or fetching playlists:', error.response?.data || error.message);
        res.status(500).send("Error processing Spotify data");
    }
});

// Spotify Playlist Songs Endpoint
app.get('/spotify/playlist', async (req, res) => {
    const playlistId = req.query.playlistId;
    const access_token = req.query.access_token;

    try {
        let tracks;

        if (playlistId === "liked_songs") {
            // Fetch Liked Songs if selected
            const likedSongsResponse = await axios.get('https://api.spotify.com/v1/me/tracks', {
                headers: { Authorization: `Bearer ${access_token}` }
            });
            tracks = likedSongsResponse.data.items.map(item => item.track.name);
        } else {
            // Fetch tracks from the selected playlist
            const tracksResponse = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                headers: { Authorization: `Bearer ${access_token}` }
            });
            tracks = tracksResponse.data.items.map(item => item.track.name);
        }

        // Count song occurrences
        const songFrequency = new Map();
        tracks.forEach(songName => {
            songFrequency.set(songName, (songFrequency.get(songName) || 0) + 1);
        });

        // Convert Map to Array and Sort Songs by Play Count Using Quick Sort
        const songArray = Array.from(songFrequency.entries());

        // Custom Quick Sort function to sort by play count
        function quickSort(arr, left = 0, right = arr.length - 1) {
            if (left < right) {
                const pivotIndex = partition(arr, left, right);
                quickSort(arr, left, pivotIndex - 1);
                quickSort(arr, pivotIndex + 1, right);
            }
            return arr;
        }

        // Partition function for Quick Sort
        function partition(arr, left, right) {
            const pivot = arr[right][1]; // Use the play count as the pivot
            let i = left - 1;
            
            for (let j = left; j < right; j++) {
                if (arr[j][1] > pivot) { // Sort in descending order by play count
                    i++;
                    [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
                }
            }
            [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]]; // Place pivot in correct position
            return i + 1;
        }

        // Sort the songs by play count using quickSort
        const sortedSongs = quickSort(songArray);

        // Render the sorted songs with a Transfer to YouTube button
        res.send(`
            <h1>Sorted Songs by Play Count</h1>
            <ul>
                ${sortedSongs.map(([song, count]) => `<li>${song} - ${count} plays</li>`).join('')}
            </ul>
            <form action="/transfer-to-youtube" method="post">
                <input type="hidden" name="sortedSongs" value='${JSON.stringify(sortedSongs)}'>
                <button type="submit">Transfer to YouTube</button>
            </form>
            <a href="/">Go Back</a>
        `);
    } catch (error) {
        console.error('Error fetching playlist tracks:', error.response?.data || error.message);
        res.status(500).send("Error processing playlist data");
    }
});

// YouTube Login
app.get('/youtube-login', (req, res) => {
    const scope = 'https://www.googleapis.com/auth/youtube';
    const url = `https://accounts.google.com/o/oauth2/auth?${querystring.stringify({
        client_id: youtubeClientId,
        redirect_uri: youtubeRedirectUri,
        response_type: 'code',
        scope: scope,
        access_type: 'offline',
        prompt: 'consent'
    })}`;
    res.redirect(url);
});

// YouTube Callback
app.get('/youtube/callback', async (req, res) => {
    const code = req.query.code;
    try {
        const response = await axios.post('https://oauth2.googleapis.com/token', querystring.stringify({
            code: code,
            client_id: youtubeClientId,
            client_secret: youtubeClientSecret,
            redirect_uri: youtubeRedirectUri,
            grant_type: 'authorization_code'
        }), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });

        const access_token = response.data.access_token;
        req.session.youtubeAccessToken = access_token;

        res.send(`
            <h1>YouTube OAuth Success</h1>
            <p>Your YouTube access token has been successfully acquired.</p>
            <a href="/">Go Back</a>
        `);
    } catch (error) {
        console.error('Error exchanging code for YouTube token:', error.response?.data || error.message);
        res.status(500).send("Error processing YouTube data");
    }
});

// Transfer to YouTube Endpoint
app.post('/transfer-to-youtube', async (req, res) => {
    const sortedSongs = JSON.parse(req.body.sortedSongs);
    const youtubeAccessToken = req.session.youtubeAccessToken;

    try {
        // Create a new YouTube playlist
        const playlistResponse = await axios.post('https://www.googleapis.com/youtube/v3/playlists?part=snippet',
            {
                snippet: {
                    title: 'Transferred Playlist',
                    description: 'Playlist transferred from Spotify',
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${youtubeAccessToken}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        const playlistId = playlistResponse.data.id;

        // Add each song to the playlist
        for (const [songName] of sortedSongs) {
            // Search for the song on YouTube
            const searchResponse = await axios.get('https://www.googleapis.com/youtube/v3/search', {
            params: {
            part: 'snippet',
            q: songName,
            type: 'video',
                },
        headers: {
        Authorization: `Bearer ${youtubeAccessToken}`
        }
    });


            const videoId = searchResponse.data.items[0]?.id?.videoId; // Get the first result

            if (videoId) {
                await axios.post('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet', {
                    snippet: {
                        playlistId: playlistId,
                        resourceId: {
                            kind: 'youtube#video',
                            videoId: videoId
                        }
                    }
                }, {
                    headers: {
                        Authorization: `Bearer ${youtubeAccessToken}`,
                        'Content-Type': 'application/json'
                    }
                });
            }
        }

        res.send(`
            <h1>Transfer Successful</h1>
            <p>Songs have been transferred to YouTube.</p>
            <a href="/">Go Back</a>
        `);
    } catch (error) {
        console.error('Error transferring songs to YouTube:', error.response?.data || error.message);
        res.status(500).send("Error transferring songs to YouTube");
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


