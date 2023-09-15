import artists from "./artists.js";

const categoryObjects = [];

const urlGuide = {
    rule34: (name) =>
        `https://rule34.xxx/index.php?page=post&s=list&tags=${name}`,
    nhentai: (name) => `https://nhentai.net/artist/${name}/`,
};

artists.doujin.forEach((artist) => {
    categoryObjects.push({
        name: artist,
        url: urlGuide.nhentai(artist),
        categories: ["videos & images"],
    });
});

// console.log(JSON.stringify(categoryObjects));
