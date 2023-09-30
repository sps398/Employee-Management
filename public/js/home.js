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
}

function loginEmployee() {
    closeOverlay('overlay-employee-login');
    alert('Logged In successfully!');
}

document.getElementById('admin-login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    loginAdmin();
})

document.getElementById('employee-login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    loginEmployee();
})