const toggleBtn = document.getElementById("theme-toggle");
const sunIcon = document.getElementById("sun");
const moonIcon = document.getElementById("moon");

// // Check saved preference OR system preference
// const savedTheme = localStorage.getItem("theme");
// const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    document.body.classList.remove("light");
    sunIcon.style.display = "block";  // show sun (light available)
    moonIcon.style.display = "none";
} else {
    document.body.classList.add("light");
    sunIcon.style.display = "none";
    moonIcon.style.display = "block"; // show moon (dark available)
}

toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");

    if (document.body.classList.contains("light")) {
        localStorage.setItem("theme", "light");
        sunIcon.style.display = "none";
        moonIcon.style.display = "block";
    } else {
        localStorage.setItem("theme", "dark");
        sunIcon.style.display = "block";
        moonIcon.style.display = "none";
    }
});