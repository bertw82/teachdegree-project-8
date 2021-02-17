const employeesGrid = document.getElementById('employees');
let employees = [];
const modalContainer = document.getElementById('myModal');
const input = document.getElementById('myInput');

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
fetch('https://randomuser.me/api/?results=12&nat=us')
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
    <section class="employee-modal" data-index="${index}">
        <span class="close">&times;</span>
        <span class="arrow-right">&#8594;</span>
        <span class="arrow-left">&#8592;</span>
        <div>
            <img src="${person.picture.large}">
        </div>
        <div>
            <h2>${person.name.first} ${person.name.last}</h2>
            <p>${person.email}</p>
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

// navigate left or right in modal window
modalContainer.addEventListener('click', e => {
    const rightArrow = document.querySelector('.arrow-right');
    const leftArrow = document.querySelector('.arrow-left');
    const index = myModal.firstElementChild.getAttribute('data-index');
    const addIndex = parseInt(index) + 1;
    const subtractIndex = parseInt(index) - 1;
    if (e.target === rightArrow && addIndex <= 11) {
        modalDisplay(addIndex);
    } else if (e.target === leftArrow && subtractIndex >= 0) {
        modalDisplay(subtractIndex);
    }
});

// search filter function
function searchFunction() {
    const card = document.querySelectorAll('.employee-card');
    const filter = input.value.toUpperCase();

    for (let i = 0; i < card.length; i++) {
        const h2 = card[i].querySelector('h2');
        const name = h2.textContent;
        if (name.toUpperCase().indexOf(filter) > -1) {
            card[i].style.display = '';
        } else {
            card[i].style.display = 'none';
        }
    }
}

// clear search filter on page refresh
window.onload = () => input.value = '';


