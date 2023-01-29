// window.addEventListener("",  () => {
const { username, email } = localStorage
if (!email && !username) {
    window.location = "/sign-up.html"
}