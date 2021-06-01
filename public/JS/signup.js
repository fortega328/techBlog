const signupButton = document.getElementById('signupButton');

const signup = async (e) => {
    e.preventDefault();


    const first_name = document.getElementById('firstName').value;
    const last_name = document.getElementById('lastName').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;


    if (first_name && last_name && email && password) {

        const response = await fetch('api/users/signup', {
            method: 'POST',
            body: JSON.stringify({ first_name, last_name, email, password }),
            headers: {
                'Content-Type': 'application/json'
            }

        });

        if (response.ok) {
            document.location.replace("/")
        } else {
            console.log("response is not ok");
        }

    } else {
        console.log("error")
    }
}

if (signupButton) signupButton.addEventListener("click", signup);