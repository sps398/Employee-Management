const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/'
});

function showOverlay(overlay) {
    document.getElementById(overlay).style.display = 'block';
}

function closeOverlay(overlay) {
    document.getElementById(overlay).style.display = 'none';
}

function logout() {
    localStorage.removeItem('token');
    window.location.href = '../src/home.html';
}
function decodeToken() {
    token = localStorage.getItem('token');
    if(!token) {
        alert('Please login to continue!');
        window.location.href = './home.html';
    }
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}