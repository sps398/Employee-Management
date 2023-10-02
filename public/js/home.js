async function loginAdmin() {
    const enteredTitle = document.getElementById('admin-title').value;
    const enteredPassword = document.getElementById('admin-password').value;
    try {
        const response = await axiosInstance.post('/admin/login', { title: enteredTitle, password: enteredPassword });
        localStorage.setItem('token', response.data.token);
        alert(response.data.message);
    } catch(err) {
        alert(err.response.data.message);
        return;
    }
    closeOverlay('overlay-admin-login');
    window.location.href = '../src/admin-page.html';
}

async function loginEmployee() {
    const enteredEmail = document.getElementById('employee-email').value;
    const enteredPassword = document.getElementById('employee-password').value;
    try {
        const response = await axiosInstance.post('/employee/login', { email: enteredEmail, password: enteredPassword });
        localStorage.setItem('token', response.data.token);
        alert(response.data.message);
        closeOverlay('overlay-employee-login');
        window.location.href = '../src/employee-page.html';
    } catch(err) {
        console.log(err);
        alert(err.response.data.message);
        return;
    }
}

document.getElementById('admin-login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    loginAdmin();
})

document.getElementById('employee-login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    loginEmployee();
})