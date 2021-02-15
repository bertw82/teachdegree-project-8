const employeesGrid = document.getElementById('employees');

generateCard = data => {
    const section = document.createElement('section');
    section.className = "employee-card";
    employeesGrid.appendChild(section);
    section.innerHTML = `
        <img src="${data.picture.medium}">
        <h2>${data.name.first} ${data.name.last}</h2>
        <p>${data.email}</p>
        <p>${data.location.city}</p>
    `;
}

function statusCheck(response){
    if(response.ok){
      return Promise.resolve(response);
    } else {
      return Promise.reject(new Error(response.statusText));
    }
}

function fetchData(url) {
    return fetch(url)
        .then(statusCheck)
        .then(response => response.json())
        .then(data => generateCard(data.results[0]))
}

for (let i = 0; i < 12; i++) {
    fetchData('https://randomuser.me/api/');
}



