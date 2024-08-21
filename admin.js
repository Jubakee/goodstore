document.addEventListener('DOMContentLoaded', () => {
    const employeeList = document.getElementById('employee-list');
    const searchBar = document.getElementById('search-bar');

    function loadEmployeeData() {
        const data = localStorage.getItem('employeeData1');
        if (data) {
            return JSON.parse(data);
        }
        return [];
    }

    function saveEmployeeData(employeeData) {
        localStorage.setItem('employeeData1', JSON.stringify(employeeData));
    }

    function renderAdminList(data, searchQuery = '') {
        employeeList.innerHTML = '';
        searchQuery = searchQuery.toLowerCase();

        data.forEach(employee => {
            const card = document.createElement('div');
            card.className = 'admin-card';
            const statusClass = employee.status === 'IN' ? 'status-in' : 'status-out';
            const name = employee.name.toLowerCase();
            const isHighlighted = searchQuery && name.includes(searchQuery);
            const highlightedName = isHighlighted ?
                `<span class="highlight">${employee.name}</span>` :
                employee.name;

            card.innerHTML = `
                <h3>${highlightedName}</h3>
                <div class="toggle-switch">
                    <label>
                        <input type="checkbox" ${employee.status === 'IN' ? 'checked' : ''} data-name="${employee.name}">
                        <span class="switch"></span>
                        <span class="${statusClass}">${employee.status === 'IN' ? 'IN' : 'OUT'}</span>
                    </label>
                </div>
            `;
            card.querySelector('input[type="checkbox"]').addEventListener('change', handleStatusChange);
            if (isHighlighted) {
                card.style.border = '2px solid red'; // Highlight border if search matches
            }
            employeeList.appendChild(card);
        });
    }

    function handleStatusChange(event) {
        const employeeName = event.target.getAttribute('data-name');
        const newStatus = event.target.checked ? 'IN' : 'OUT';

        const employeeData = loadEmployeeData();
        const employee = employeeData.find(emp => emp.name === employeeName);
        if (employee) {
            employee.status = newStatus;
            saveEmployeeData(employeeData);
            renderAdminList(employeeData, searchBar.value); // Re-render to update text color and search
        }
    }

    function performSearch() {
        const searchQuery = searchBar.value;
        const employeeData = loadEmployeeData();

        console.log('search: ' + searchQuery);
        console.log('data: ', employeeData);
        renderAdminList(employeeData, searchQuery); // Re-render the list with the search query
    }

    searchBar.addEventListener('input', performSearch);

    // Add event listener for the Enter key
    searchBar.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent default form submission if inside a form
            performSearch();
        }
    });

    // Load and render employee data on page load
    const employeeData = loadEmployeeData();
    renderAdminList(employeeData);
});
