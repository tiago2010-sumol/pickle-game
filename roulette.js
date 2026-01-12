let user = localStorage.getItem("currentUser");
if (!user) {
    alert("You are not logged in!");
    window.location.href = "index.html";
}

let balance = parseInt(localStorage.getItem("coins_" + user)) || 0;
document.getElementById("balance").innerText = balance;

const wheel = document.getElementById("wheel");
const betInput = document.getElementById("bet");
const resultDisplay = document.getElementById("result");

let spinning = false;
let currentRotation = 0;

// ALL-IN button
function allIn() {
    betInput.value = balance;
}

function spin(choice) {
    if (spinning) return;

    let b = parseInt(betInput.value);
    if (!b || b <= 0 || b > balance) {
        alert("Invalid bet");
        return;
    }

    spinning = true;
    resultDisplay.innerText = "";

    const spinSound = document.getElementById("spinSound");
    if (spinSound) spinSound.play();

    // Spin: 5 rotations + random 0-360
    let extraRotation = 360 * 5 + Math.random() * 360;
    currentRotation += extraRotation;
    wheel.style.transform = `rotate(${currentRotation}deg)`;

    setTimeout(() => {
        // Pointer at top = 0°
        let pointerAngle = (360 - (currentRotation % 360)) % 360;
        let landedColor = pointerAngle < 180 ? "red" : "black";

        if (choice === landedColor) {
            balance += b;
            resultDisplay.innerText = `You won! (${landedColor.toUpperCase()})`;
            const winSound = document.getElementById("winSound");
            if (winSound) winSound.play();
        } else {
            balance -= b;
            resultDisplay.innerText = `You lost! (${landedColor.toUpperCase()})`;
            const loseSound = document.getElementById("loseSound");
            if (loseSound) loseSound.play();
        }

        document.getElementById("balance").innerText = balance;
        localStorage.setItem("coins_" + user, balance);

        spinning = false;
    }, 4200);
}

function back() {
    window.location.href = "index.html";
}

// Apply Jeff background if owned
let savedBg = localStorage.getItem("bg_" + user);
if (savedBg) {
    document.body.style.backgroundImage = `url("${savedBg}")`;
}
