import hentaiData from "./hentai_api.json" assert { "type": "json" };

// Inital Variables
const d = document;

// DOM Variables
const $categoriesFragment = d.createDocumentFragment();
const $categoryFragment = d.createDocumentFragment();
const $categoryTemplate = d.getElementById("category-template").content;

// Choose a random index of an array
const randomArrIndex = (arr) => Math.floor(Math.random() * arr.length);

// Extracts each object property data from an array of objects and deletes duplicates
const extractAllProperties = (arr, objProperty) => {
    const allProperties = new Set();

    arr.forEach((obj) => {
        allProperties.add(...obj[objProperty]);
    });

    return allProperties;
};

// Divides the elements from an array by one type of property
const filterElementsByProperties = (arr, property, allPropertyValues) => {
    const elementsByProperties = {};

    allPropertyValues.forEach((prop) => (elementsByProperties[prop] = []));

    arr.forEach((obj) => elementsByProperties[obj[property]].push(obj));

    return elementsByProperties;
};

// The processed variables
const allCategories = extractAllProperties(hentaiData.artists, "categories");

const artistsByCategory = filterElementsByProperties(
    hentaiData.artists,
    "categories",
    allCategories
);

d.addEventListener("DOMContentLoaded", (e) => {
    // displaying the artists data using the template and inserting it to the categories fragment
    allCategories.forEach((cat) => {
        $categoryTemplate.querySelector(".category-name").textContent =
            cat.toUpperCase();
        $categoryTemplate.querySelector(".category").setAttribute("id", cat);
        $categoryTemplate
            .querySelector(".category-random-btn")
            .setAttribute("data-category", cat);

        artistsByCategory[cat].forEach((artist) => {
            const $li = d.createElement("li");
            const $a = d.createElement("a");

            $a.textContent = artist.name;
            $a.setAttribute("class", "category-link");
            $a.setAttribute("href", artist.url);
            $a.setAttribute("target", "_blank");

            $li.appendChild($a);

            $categoryTemplate
                .querySelector(".category-values")
                .appendChild($li);
        });

        let $clone = d.importNode($categoryTemplate, true);
        $categoriesFragment.appendChild($clone);

        $categoryTemplate
            .querySelectorAll(".category-values li")
            .forEach((li) => li.parentNode.removeChild(li));
    });

    d.querySelector(".categories").appendChild($categoriesFragment);

    d.addEventListener("click", (e) => {
        if (e.target.matches(".category-random-btn")) {
            const $allCategoryArtists = d.querySelectorAll(
                `#${e.target.getAttribute("data-category")} .category-values li`
            );

            $allCategoryArtists.forEach((artist) =>
                artist.classList.remove("category-random-selected")
            );

            $allCategoryArtists[
                randomArrIndex($allCategoryArtists)
            ].classList.add("category-random-selected");
        }
    });
});
