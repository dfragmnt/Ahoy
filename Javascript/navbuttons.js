function showLogin() {
    document.querySelector(".login-container").classList.add("loginActive");
    document.querySelector(".curtain").classList.add("curtainActive");
}

function hideLogin() {
    document.querySelector(".login-container").classList.remove("loginActive");
    document.querySelector(".curtain").classList.remove("curtainActive");
}