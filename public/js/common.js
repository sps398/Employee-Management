const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/'
});

function showOverlay(overlay) {
    document.getElementById(overlay).style.display = 'block';
}

function closeOverlay(overlay) {
    document.getElementById(overlay).style.display = 'none';
}
