const logoutBtn = document.getElementById("logoutBtn");

const logout = async () => {
    const response = await fetch('/api/users/logout', {
        method: 'POST'
    });

    if (response.ok) {
        document.location.replace("/");
    } else {
        console.log('error');
    }
}

if (logoutBtn) logoutBtn.addEventListener("click", logout);