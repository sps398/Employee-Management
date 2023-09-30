const employeeNameInput = document.getElementById('employee-name');
const employeeEmailInput = document.getElementById('employee-email');
const employeeJobTitleInput = document.getElementById('employee-job-title');
const employeeSalaryInput = document.getElementById('employee-salary');
const employeePasswordInput = document.getElementById('employee-password');

document.getElementById('add-employee-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
        const newEmployee = {
            name: employeeNameInput.ariaValueMax,
            email: employeeEmailInput.value,
            jobTitle: employeeJobTitleInput.value,
            salary: employeeSalaryInput.value,
            password: employeePasswordInput.value
        };
        const response = await axiosInstance.post('/employee/insert', newEmployee, { headers: { 'Authorization': token } });
    } catch(err) {
        alert(err.response.data.message);
        return;
    }
})