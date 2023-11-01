const STATIC_CACHE = "static";

const APP_SHELL = ["/", "css/styles.css", "css/editor.css", "css/picker.css"];

// Guarda los archivos del arreglo proporcionado a la cache
self.addEventListener("install", (e) => {
    const cacheStatic = caches
        .open(STATIC_CACHE)
        .then((cache) => cache.addAll(APP_SHELL));

    e.waitUntil(cacheStatic);
});

self.addEventListener("fetch", (e) => {
    console.log(e.request);

    e.respondWith(
        caches
            .match(e.request)
            .then((res) => res || fetch(e.request))
            .catch((err) => console.log(err))
    );
});
