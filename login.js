function login() {
    const nameEl = document.duerySelector("#name");
    localStorage.setItem("userName", nameEl.value);
    window.location.href = "play.html";
}