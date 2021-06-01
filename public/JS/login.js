const loginButton = document.getElementById("loginButton");

const login = async (e) => {
    e.preventDefault();

    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;

    if (email && password) {
        const response = await fetch('api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.replace("/");
        } else {
            document.getElementById('passwordInput').setAttribute('class', 'input is-danger');
            document.getElementById('invalidPassword').setAttribute('class', 'has-text-danger');
        }

    } else {
        console.log("error");
    }
}

loginButton.addEventListener("click", login);