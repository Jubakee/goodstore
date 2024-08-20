document.addEventListener('DOMContentLoaded', () => {
    const employeeGrid = document.getElementById('employee-grid');
    const popupOverlay = document.getElementById('popup-overlay');
    const popupFields = {
        name: document.getElementById('popup-name'),
        team: document.getElementById('popup-team'),
        position: document.getElementById('popup-position'),
        nameKorean: document.getElementById('popup-name-korean'),
        nameEnglish: document.getElementById('popup-name-english'),
        knownAs: document.getElementById('popup-known-as'),
        ird: document.getElementById('popup-ird'),
        dob: document.getElementById('popup-dob'),
        address: document.getElementById('popup-address'),
        mobile: document.getElementById('popup-mobile'),
        emailWork: document.getElementById('popup-email-work'),
        emailPersonal: document.getElementById('popup-email-personal'),
        joiningDate: document.getElementById('popup-start-date'),
        contract: document.getElementById('popup-official-date'),
        kiwisaver: document.getElementById('popup-kiwisaver'),
        visa: document.getElementById('popup-visa'),
        visaExpiry: document.getElementById('popup-visa-expiry'),
        emergencyContact: document.getElementById('popup-emergency'),
        contact: document.getElementById('popup-emergency-contact'),
        relationship: document.getElementById('popup-emergency-relation'),
        company: document.getElementById('popup-business')
    };

    function saveEmployeeData(employeeData) {
        localStorage.setItem('employeeData1', JSON.stringify(employeeData));
        console.log('Data saved to localStorage:', employeeData);
    }

    function loadEmployeeData() {
        const data = localStorage.getItem('employeeData1');
        if (data) {
            console.log('Data loaded from localStorage:', JSON.parse(data));
            return JSON.parse(data);
        }
        return [];
    }

    // Clear localStorage for debugging
    localStorage.clear("employeeData1");

    let employeeData = loadEmployeeData();

    if (employeeData.length === 0) {
        fetch('employee.json')
            .then(response => response.json())
            .then(data => {
                employeeData = data;
                saveEmployeeData(employeeData);
                renderEmployeeList(employeeData);
            })
            .catch(error => console.error('Error loading employee data:', error));
    } else {
        renderEmployeeList(employeeData);
    }

    function renderEmployeeList(data) {
        employeeGrid.innerHTML = '';
        data.forEach(employee => {
            const card = document.createElement('div');
            card.className = 'employee-card';
            card.setAttribute('data-team', employee.team);
            card.setAttribute('data-position', employee.position);
            card.setAttribute('data-title', employee.title);
            card.setAttribute('data-company', employee.company); // Add this line
            card.innerHTML = `
                <h3>${employee.name}</h3>
                <p>${employee.team}</p>
                <p>${employee.title}</p>
                <p><span class="${employee.status === 'IN' ? 'status-in' : 'status-out'}">${employee.status}</span></p>
            `;
            card.addEventListener('click', () => {
                console.log('Employee Data:', employee); // Debugging line
                for (const key in popupFields) {
                    if (popupFields.hasOwnProperty(key) && popupFields[key]) {
                        popupFields[key].textContent = employee[key] || '';
                    }
                }
                popupOverlay.style.display = 'flex'; // Show popup on card click
            });
            employeeGrid.appendChild(card);
        });
    
        populateFilterOptions(data);
    }

    function populateFilterOptions(data) {
        const teamFilter = document.getElementById('team-filter');
        const companyFilter = document.getElementById('company-filter');
        const titleFilter = document.getElementById('title-filter');

        const teams = new Set();
        const companies = new Set();
        const titles = new Set();

        data.forEach(employee => {
            teams.add(employee.team);
            companies.add(employee.company);
            titles.add(employee.title);
        });

        teams.forEach(team => {
            const option = document.createElement('option');
            option.value = team;
            option.textContent = team;
            teamFilter.appendChild(option);
        });

        companies.forEach(company => {
            const option = document.createElement('option');
            option.value = company;
            option.textContent = company;
            companyFilter.appendChild(option);
        });

        titles.forEach(title => {
            const option = document.createElement('option');
            option.value = title;
            option.textContent = title;
            titleFilter.appendChild(option);
        });
    }

    function filterRows() {
        const selectedTeam = document.getElementById('team-filter').value;
        const selectedCompany = document.getElementById('company-filter').value;
        const selectedTitle = document.getElementById('title-filter').value;
        const rows = document.querySelectorAll('#employee-grid .employee-card');

        rows.forEach(row => {
            const team = row.getAttribute('data-team');
            const company = row.getAttribute('data-company');
            const title = row.getAttribute('data-title');

            if ((selectedTeam === '' || team === selectedTeam) &&
                (selectedCompany === '' || company === selectedCompany) &&
                (selectedTitle === '' || title === selectedTitle)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }

    document.getElementById('team-filter').addEventListener('change', filterRows);
    document.getElementById('company-filter').addEventListener('change', filterRows);
    document.getElementById('title-filter').addEventListener('change', filterRows);

    popupOverlay.addEventListener('click', (event) => {
        if (event.target === popupOverlay) {
            popupOverlay.style.display = 'none'; // Hide popup on overlay click
        }
    });

    document.getElementById('admin-access-btn').addEventListener('click', () => {
        window.location.href = 'admin.html';
    });
});
