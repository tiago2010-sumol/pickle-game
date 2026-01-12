let user = localStorage.getItem("currentUser");
if (!user) {
    alert("You are not logged in!");
    window.location.href = "index.html";
}

// Load balance
let balance = parseInt(localStorage.getItem("coins_" + user)) || 0;
document.getElementById("balance").innerText = balance;

// Check Jeff ownership
let hasJeff = localStorage.getItem("owned_Jeff_" + user) === "true";

function buyJeff() {
    if (hasJeff) {
        alert("You already own Jeff the Pickle!");
        return;
    }

    if (balance < 100000) {
        alert("Not enough coins!");
        return;
    }

    balance -= 100000;
    localStorage.setItem("coins_" + user, balance);
    document.getElementById("balance").innerText = balance;

    // Mark Jeff as purchased
    localStorage.setItem("owned_Jeff_" + user, "true");
    localStorage.setItem("bg_" + user, "https://imgs.search.brave.com/dxocm5szZcsFE-AJpla97ZOThbQbHvoSbHTLrxHE6WY/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzE1LzM5LzYyLzYy/LzM2MF9GXzE1Mzk2/MjYyNDRfMkh6ODBH/Q1ZnVmQ5eG4yeU9W/WTFqNnkwWTNCYXdx/OGcuanBn");

    document.body.style.backgroundImage = `url("${localStorage.getItem("bg_" + user)}")`;

    hasJeff = true;
    alert("Congratulations! Jeff the Pickle is yours. Background updated!");
}

function back() {
    window.location.href = "index.html";
}

// Apply Jeff background if already owned
let savedBg = localStorage.getItem("bg_" + user);
if (savedBg) {
    document.body.style.backgroundImage = `url("${savedBg}")`;
}
