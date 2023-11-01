let swLocation = "sw.js";

if (navigator.serviceWorker) {
    navigator.serviceWorker.register(swLocation);
}

export let artistsURL = "https://hentai-db.onrender.com/artists";
