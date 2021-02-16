const employeesGrid = document.getElementById('employees');

function generateCard(data){
    data.forEach( person => {
        const section = document.createElement('section');
        section.className = "employee-card";
        employeesGrid.appendChild(section);
        section.innerHTML = `
            <div>
                <img src="${person.picture.medium}">
            </div>
            <div class="person-info">
                <h2>${person.name.first} ${person.name.last}</h2>
                <p>${person.email}</p>
                <p>${person.location.city}</p>
            </div>
        `;
    })
}

fetch('https://randomuser.me/api/?results=12')
    .then(response => response.json())
    .then(data => generateCard(data.results))
    .catch( err => {
        employeesGrid.innerHTML = '<h3>Something went wrong!</h3>';
        console.log(err);
      })




