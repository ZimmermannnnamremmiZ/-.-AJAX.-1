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
        article.setAttribute('id', "output")
        title.addEventListener('click', function (e) {
            if (e.currentTarget) {
                function jsonToTable(json) {
                    let cols = Object.keys(json[0]);
                    let headerRow = cols
                        .map(col => `<th>${col}</th>`)
                        .join("");
                        console.log(json)
                    let rows = json
                        .filter(el => e.target.textContent === el.name)
                        .map(row => {
                            let tds = cols.map(col => `<td>${row[col]}</td>`).join("");
                            return `<tr>${tds}</tr>`;
                        })
                        .join("");
                    const table = `
                                    <table>
                                        <thead>
                                                <tr>${headerRow}</tr>
                                         <thead>
                                         <tbody>
                                                ${rows}
                                         <tbody>
                                    <table>`;
                    return table;
                }
                e.target.innerHTML = jsonToTable(responce)
            }
        });
        title.addEventListener('mouseleave', (e) => {
            if (e.currentTarget) {
                e.currentTarget.textContent = users.name;
            }
        });
        cardBody.appendChild(title);
        cardBody.appendChild(article);
        card.appendChild(cardBody);
    fragment.appendChild(card);
    });
    countainer.appendChild(fragment);
}

getUsers(renderUsers);
