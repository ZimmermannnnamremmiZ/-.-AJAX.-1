const countainer = document.createElement('div');
document.querySelector('body').appendChild(countainer);

function getUsers(callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://jsonplaceholder.typicode.com/users")
    xhr.addEventListener("load", () => {
        const responce = JSON.parse(xhr.responseText);
        callback(responce)
    });
    xhr.addEventListener("error", () => {
        console.log('error')
    })
    xhr.send();
}



function renderUsers(responce) {
    const fragment = document.createDocumentFragment();
    responce.forEach(users => {
        const card = document.createElement("div");
        card.classList.add("card");
        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        const title = document.createElement("h5");
        title.classList.add("card-title");
        title.textContent = users.name;
        const article = document.createElement("p");
        article.classList.add("card-text");
        title.addEventListener('mouseenter', (e) => {
            if (e.target) {
                article.textContent = JSON.stringify(users);
            } else {article.textContent = ''}
        });
        title.addEventListener('mouseleave', (e) => {
            if (e.target) {
                article.textContent = '';
        }});
        cardBody.appendChild(title);
        cardBody.appendChild(article);
        card.appendChild(cardBody);
        fragment.appendChild(card);
    });
    countainer.appendChild(fragment);
}

getUsers(renderUsers);

// https://www.encodedna.com/javascript/populate-json-data-to-html-table-using-javascript.htm