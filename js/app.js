const employeesGrid = document.getElementById('employees');
let employees = [];
const modalContainer = document.getElementById('myModal');

// re-format birthdate 
function birthday(bday) {
    const date = bday;
    const day = date.slice(5,7);
    const month = date.slice(8, 10);
    const year = date.slice(0,4);
    return `${day}/${month}/${year}`;
};

// generate an employee card
function generateCard(data){
    employees = data;
    employees.forEach((person, index) => {
        const section = document.createElement('section');
        section.className = "employee-card";
        section.dataset.index = index;
        employeesGrid.appendChild(section);
        section.innerHTML = `
            <div>
                <img src="${person.picture.medium}">
            </div>
            <div>
                <h2>${person.name.first} ${person.name.last}</h2>
                <p>${person.email}</p>
                <p>${person.location.city}</p>
            </div>
        `;
    })
}

// fetch functionality
fetch('https://randomuser.me/api/?results=12')
    .then(response => response.json())
    .then(data => generateCard(data.results))
    .catch( err => {
        employeesGrid.innerHTML = '<h3>Something went wrong!</h3>';
        console.log(err);
      })

// create modal window
function modalDisplay(index) {
    const person = employees[index];
    const modalHTML = `
    <section class="employee-modal">
        <span class="close">&times;</span>
        <div>
            <img src="${person.picture.large}">
        </div>
        <div>
            <h2>${person.name.first} ${person.name.last}</h2>
            <p>${person.email}</p>
            <p>${person.location.city}</p>
        </div>
        <div class="address">
            <p>${person.phone}</p>
            <p>${person.location.street.number} ${person.location.street.name}, ${person.location.city}, ${person.location.state}, ${person.location.postcode}</p>
            <p>Birthday: ${birthday(person.dob.date)}</p>
        </div>
    </section>
    `;
    modalContainer.classList.remove('hide');
    modalContainer.innerHTML = modalHTML;
}

// click on employee card to open modal window
employeesGrid.addEventListener('click', e => {
    if (e.target !== employeesGrid) {
        const employeeCard = e.target.closest(".employee-card");
        const index = employeeCard.getAttribute('data-index');
        modalDisplay(index);
    }
});

// click on close button to close modal
modalContainer.addEventListener('click', e => {
    const closeButton = document.querySelector('.close');
    if (e.target === closeButton) {
        modalContainer.classList.add('hide');
    }
});


