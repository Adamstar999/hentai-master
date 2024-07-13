// Preparing the service workers
let swLocation = "sw.js";

if (navigator.serviceWorker) {
    navigator.serviceWorker.register(swLocation);
}

// Hentai Artists Api
export let artistsURL = "https://hentaimaster.adamaliweb.com/js/hentaiDB.json";
