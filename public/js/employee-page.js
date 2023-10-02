
loadProfileDetails();

async function loadProfileDetails() {
    try {
        token = localStorage.getItem('token');
        employee = decodeToken();
        const response = await axiosInstance.get(`/employee/details/${employee.employeeId}`, { headers: { 'Authorization': token } });
        employee = response.data.employee;
        
        showProfile();
    } catch(err) {
        console.log(err);
        alert('Something went worng!');
    }
}

function showProfile() {
    const details = document.getElementById('details');
    details.innerHTML = `
    <div class="img-c">
        <img id="profile-image" src="${employee.imageUrl}" alt="Profile image">
    </div>
    <div id="info" class="info">
        <div class="info-el">Name: <span>${employee.name}</span></div>
        <div class="info-el">Email: <span>${employee.email}</span></div>
        <div class="info-el">Job Title: <span>${employee.jobTitle}</span></div>
        <div class="info-el">Salary: <span>${employee.salary}</span></div>
    </div>
    `;
}