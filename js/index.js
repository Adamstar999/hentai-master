// Preparing the service workers
let swLocation = "sw.js";

if (navigator.serviceWorker) {
    navigator.serviceWorker.register(swLocation);
}

// Hentai Artists Api
export let artistsURL = "https://hentai-db.onrender.com/artists";
