const employeeNameInput = document.getElementById('employee-name');
const employeeEmailInput = document.getElementById('employee-email');
const employeePhoneInput = document.getElementById('employee-phoneno');
const employeeJobTitleInput = document.getElementById('employee-job-title');
const employeeSalaryInput = document.getElementById('employee-salary');
const employeePasswordInput = document.getElementById('employee-password');
const addEmployeeForm = document.getElementById('add-employee-form');
const employeesListView = document.getElementById('employees-list-view');
const updateForm = document.getElementById('update-employee-form');
const updatedNameInput = document.getElementById('updated-employee-name');
const updatedEmailInput = document.getElementById('updated-employee-email');
const updatedPhoneInput = document.getElementById('updated-employee-phoneno');
const updatedJobTitleInput = document.getElementById('updated-employee-job-title');
const updatedSalaryInput = document.getElementById('updated-employee-salary');

window.addEventListener('DOMContentLoaded', () => {
    showEmployeesList();
})

addEmployeeForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
        const fileInput = document.getElementById('employee-photo');
        const formData = new FormData();
        const file = fileInput.files[0];
        if(file)
            formData.append('file', file);

        const newEmployee = {
            name: employeeNameInput.value,
            email: employeeEmailInput.value,
            phoneNo: employeePhoneInput.value,
            jobTitle: employeeJobTitleInput.value,
            salary: employeeSalaryInput.value,
            password: employeePasswordInput.value,
        };

        formData.append('employee', JSON.stringify(newEmployee));

        const response = await axiosInstance.post('/admin/add-employee', formData, { headers: { 'Authorization': token } });
        alert(response.data.message);
        addEmployeeForm.reset();
        closeOverlay('overlay-add-employee');   
        showEmployeesList();
    } catch (err) {
        alert(err.response.data.message);
        return;
    }
})

async function showEmployeesList() {
    try {
        employeesListView.innerHTML = '';

        const response = await axiosInstance.get('/admin/all-employees', { headers: { 'Authorization': token } });
        const employees = response.data.employees;

        employees.forEach(employee => {
            const formattedTime = formatTime(employee.last_logged_in);
            employeesListView.innerHTML += `
            <div id="${employee.id}" class="employee-element" class="card">
                <div class="employee-details">
                    <div class="employee-image">
                        <img src="${employee.imageUrl}" alt="">
                    </div>
                    <div>
                        <div>Name: <span>${employee.name}</span></div>
                        <div>Email: <span>${employee.email}</span></div>
                        <div>Job Title: <span>${employee.jobTitle}</span></div>
                        <div>Salary: <span>${employee.salary}</span></div>
                        <div>Last Logged In: <span>${employee.last_logged_in ? formattedTime : 'undefined'}</span></div>
                    </div>
                </div>
                <div class="employee-action">
                    <button id="editbtn-${employee.id}" class="btn" onclick="editEmployee(this.id)">Edit</button>
                    <button id="deletebtn-${employee.id}" class="btn" onclick="deleteEmployee(this.id)">Delete</button>
                </div>
            </div>
            `;
        })
    } catch (err) {
        alert(err);
    }
}

function addEmployee() {
    showOverlay('overlay-add-employee');
    addEmployeeForm.reset();
}

async function editEmployee(btnId) {
    showOverlay('overlay-update-employee');
    
    const employeeId = btnId.substring(btnId.indexOf('-')+1);

    try {
        let response = await axiosInstance.get(`/employee/details/${employeeId}`, { headers: { 'Authorization': token } });
        const employee = response.data.employee;

        employeeNameInput.value = employee.name;
        employeeEmailInput.value = employee.email;
        employeeJobTitleInput.value = employee.jobTitle;
        employeePhoneInput.value = employee.phoneNo;
        employeeSalaryInput.value = employee.salary;
        employeePasswordInput.value = employee.password;

    } catch(err) {
        alert(err.response.data.message);
    }

    updateForm.addEventListener('submit', async (e) => {
        e.preventDefault();
    
        const updatedEmployee = {
            name: updatedNameInput.value,
            email: updatedEmailInput.value,
            phoneNo: updatedPhoneInput.value,
            jobTitle: updatedJobTitleInput.value,
            salary: updatedSalaryInput.value,
        };
    
        try {
            console.log(updatedEmployee);
            const response = await axiosInstance.patch(`/admin/update-employee/${employeeId}`, updatedEmployee, { headers: { 'Authorization': token } });
            alert(response.data.message);
            updateForm.reset();
            closeOverlay('overlay-update-employee');
            showEmployeesList();
        } catch(err) {  
            console.log(err);
            alert(err.response.data.message);
        }  
    })
}

async function deleteEmployee(btnId) {
    const employeeId = btnId.substring(btnId.indexOf('-')+1);

    try {
        const response = await axiosInstance.delete(`/admin/delete-employee/${employeeId}`, { headers: { 'Authorization': token } });
        showEmployeesList();
    } catch(err) {
        alert(err.reponse.data.message);
    }
}

function formatTime(timeString) {
    const dateObject = new Date(timeString);
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const seconds = dateObject.getSeconds();
    
    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    return `${formattedDate} ${formattedTime}`;
}