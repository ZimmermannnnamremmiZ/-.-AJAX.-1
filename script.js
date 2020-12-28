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
        title.addEventListener('mouseenter', (e) => {
            if (e.target) {
                let data = responce;

                function json2Table(json) {
                    let cols = Object.keys(json[0]);
                    let headerRow = cols
                        .map(col => `<th>${col}</th>`)
                        .join("");
                    let rows = json
                        .map(row => {
                            let tds = cols.map(col => `<td>${row[col]}</td>`).join("");
                            return `<tr>${tds}</tr>`;
                        })
                        .join("");

                    //build the table
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
                output = document.getElementById('output')
                e.target.innerHTML = json2Table(data)
            }
        });
        title.addEventListener('mouseleave', (e) => {
            if (e.target) {
                e.target.textContent = users.name;
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