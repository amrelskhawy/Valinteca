
const username = document.getElementById("username").value,
    email = document.getElementById("email").value,
    password = document.getElementById("password").value,
    password_confirmation = document.getElementById("confirm_password").value,
    submitBtn = document.getElementById("submitBtn"),
    errHolder = document.querySelector('.err-msg')




const Error = '';

const handleSubmit = (e) => {
    e.preventDefault()
    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }

    async function postData(url = '', data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(data)
        });
        return response
    }

    function isNumber(str) {
        return /\d/.test(str);
    }
    function isValidUserName(username) {
        if (
            (!isNumber(username.substr(0, 1)) && !isNumber(username.substr(-1, 1)))
            && username.length >= 5 && username.length <= 15) {
            return true
        }
        return false
    }


    if (!isValidUserName(username)) {
        setErr("Username doesn't meet out requirments")

    } else if (!isValidEmail(email)) {
        setErr("Username doesn't meet out requirments")

    }
    else if (!password && !password_confirmation) {
        setErr("You Should Enter The Password")
    } else if (password.length < 8 && password_confirmation.length < 8) {
        setErr("Password should be at least 8 characters")
    }

    else if (password !== password_confirmation) {
        setErr("Passwords Should be Matched !!")
    }

    else {
        postData('https://goldblv.com/api/hiring/tasks/register', formData)
            .then((data) => {
                console.log(data)
                if (data.statusText === "OK" &&
                    data.status === 200) {

                    setLoading(false)
                    window.location = "/home"

                    localStorage.setItem("username",
                        formData.username)

                    localStorage.setItem("email",
                        formData.email)

                } else {
                    alert("Can't Regeister !!")
                }
            });

    }
}

function setErr(err) {
    errHolder.textContent = err
}

submitBtn.addEventListener("click", handleSubmit)