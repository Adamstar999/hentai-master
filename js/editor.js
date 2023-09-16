const d = document;
let artistsUrl = "http://localhost:3000/artists";
let currentId;

// DOM Variables
const $artistTemplate = d.getElementById("artist-template").content;
const $artistsFragment = d.createDocumentFragment();
const $form = d.querySelector(".artist-form");

const getArtistsData = async () => {
    try {
        let res = await axios.get(artistsUrl),
            artistsDB = await res.data;

        // Displaying the artists data using the template and inserting it to the fragment
        artistsDB.forEach((artist) => {
            $artistTemplate.querySelector(".artist-name").textContent =
                artist.name;
            $artistTemplate
                .querySelector(".artist-url")
                .setAttribute("href", artist.url);

            artist.categories.forEach((cat) => {
                const $li = d.createElement("li");

                $li.textContent = cat;

                $artistTemplate
                    .querySelector(".artist-categories")
                    .appendChild($li);
            });

            $artistTemplate.querySelector("#artist-edit").dataset.name =
                artist.name;
            $artistTemplate.querySelector("#artist-edit").dataset.url =
                artist.url;
            $artistTemplate.querySelector("#artist-edit").dataset.categories =
                artist.categories.join(", ");
            $artistTemplate.querySelector("#artist-edit").dataset.id =
                artist.id;
            $artistTemplate.querySelector("#artist-delete").dataset.id =
                artist.id;

            let $clone = d.importNode($artistTemplate, true);
            $artistsFragment.appendChild($clone);

            $artistTemplate
                .querySelectorAll(".artist-categories li")
                .forEach((li) => li.parentNode.removeChild(li));
        });

        d.querySelector(".artists").appendChild($artistsFragment);
    } catch (err) {
        console.log("The artists data couldn't be loaded. ", err);
    }
};

d.addEventListener("DOMContentLoaded", async (e) => {
    getArtistsData();
});

d.addEventListener("submit", async (e) => {
    if (e.target === $form) {
        e.preventDefault();
        if (!currentId) {
            // POST
            try {
                let data = {
                    name: e.target.name.value,
                    url: e.target.url.value,
                    categories: e.target.categories.value.split(", "),
                };

                await axios.post(artistsUrl, data);
            } catch (err) {
                console.log("The artists data couldn't be inserted. ", err);
            }
        } else {
            // PUT
            try {
                let data = {
                    name: e.target.name.value,
                    url: e.target.url.value,
                    categories: e.target.categories.value.split(", "),
                };

                await axios.put(`${artistsUrl}/${currentId}`, data);
            } catch (err) {
                console.log("The artists data couldn't be updated. ", err);
            }
        }
    }
});

d.addEventListener("click", async (e) => {
    if (e.target.matches("#artist-edit")) {
        $form.name.value = e.target.dataset.name;
        $form.url.value = e.target.dataset.url;
        $form.categories.value = e.target.dataset.categories;
        currentId = e.target.dataset.id;

        window.scrollTo(0, 0);
    }

    if (e.target.matches("#artist-delete")) {
        let isDelete = confirm("Do you want to delete the artist?");

        if (isDelete) {
            currentId = e.target.dataset.id;
            try {
                await axios.delete(`${artistsUrl}/${currentId}`);
            } catch (err) {
                console.log("The artist couldn't be deleted. ", err);
            }
        }
    }
});
