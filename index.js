// Get current user
let currentUser = localStorage.getItem("currentUser");

// Modal login handling
const loginModal = document.getElementById("loginModal");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginMessage = document.getElementById("loginMessage");
const userDisplay = document.getElementById("userDisplay");
const balanceDisplay = document.getElementById("balance");

// Check login state
if (currentUser) {
    loginModal.style.display = "none";
    showBank();
} else {
    loginModal.style.display = "flex";
}

function login() {
    const u = usernameInput.value.trim();
    const p = passwordInput.value.trim();

    if (!u || !p) {
        loginMessage.innerText = "Please fill in both fields";
        return;
    }

    const storedPass = localStorage.getItem("user_" + u);

    if (storedPass) {
        if (storedPass === p) {
            localStorage.setItem("currentUser", u);
            loginModal.style.display = "none";
            showBank();
        } else {
            loginMessage.innerText = "Wrong password!";
        }
    } else {
        // Create new account
        localStorage.setItem("user_" + u, p);
        localStorage.setItem("currentUser", u);
        loginModal.style.display = "none";
        showBank();
    }
}

function showBank() {
    currentUser = localStorage.getItem("currentUser");
    userDisplay.innerText = currentUser;

    let bal = parseInt(localStorage.getItem("coins_" + currentUser)) || 0;
    balanceDisplay.innerText = bal;

    // Apply Jeff background if owned
    let savedBg = localStorage.getItem("bg_" + currentUser);
    if (savedBg) {
        document.body.style.backgroundImage = `url("${savedBg}")`;
    }
}

function addCoins() {
    let bal = parseInt(balanceDisplay.innerText);
    bal += 10;
    balanceDisplay.innerText = bal;
    localStorage.setItem("coins_" + currentUser, bal);
}

function goRoulette() {
    window.location.href = "roulette.html";
}

function goShop() {
    window.location.href = "shop.html";
}

function logout() {
    localStorage.removeItem("currentUser");
    location.reload();
}
