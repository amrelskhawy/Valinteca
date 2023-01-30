
const username = document.getElementById("username").value,
    email = document.getElementById("email").value,
    password = document.getElementById("password").value,
    confirm_password = document.getElementById("confirm_password").value,
    submitBtn = document.getElementById("submitBtn"),
    errHolder = document.querySelector('.err-msg')

let formData = {
    username,
    email,
    password,
    confirm_password
}

const handleChange = (e) => {
    const { name, value } = e.target
    formData[name] = value
    document.getElementById(name).value = value
    errHolder.textContent = ''
}


const Error = ''

let loading = false;

const handleSubmit = (e) => {
    e.preventDefault()
    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }

    const {username, email,password,confirm_password} = formData

    async function postData(url = '', data = {}) {
        loading = true;
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
    else if (!password && !confirm_password) {
        setErr("You Should Enter The Password")
        
    } else if (password.length < 8 && confirm_password.length < 8) {
        setErr("Password should be at least 8 characters")
    }

    else if (password !== confirm_password) {
        setErr("Passwords Should be Matched !!")
    }

    else {
        postData('https://goldblv.com/api/hiring/tasks/register', formData)
            .then((data) => {
                if (data.statusText === "OK" &&
                    data.status === 200) {

                    window.location = "/home.html"

                    localStorage.setItem("username",
                        formData.username)

                    localStorage.setItem("email",
                        formData.email)

                } else {
                    alert("Can't Regeister !!")
                }
            }).catch(error => alert(error))

    }
}

function setErr(err) {
    errHolder.textContent = err
}

// Events 
submitBtn.addEventListener("click", handleSubmit)
document.getElementById('username').addEventListener('keyup', handleChange)
document.getElementById('email').addEventListener('keyup', handleChange)
document.getElementById('password').addEventListener('keyup', handleChange)
document.getElementById('confirm_password').addEventListener('keyup', handleChange)