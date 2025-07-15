let adminTapCount = 0;
let adminMode = false;

function adminTap() {
  adminTapCount++;
  if (adminTapCount >= 3) {
    document.getElementById("admin-panel").style.display = "block";
  }
}

function enableAdmin() {
  const pass = document.getElementById("admin-pass").value;
  if (pass === "MAHINMESSADMIN99") {
    adminMode = true;
    document.getElementById("notice-text").readOnly = false;
    document.getElementById("message-box").readOnly = false;
    alert("Admin Mode Activated");
  } else {
    alert("Wrong Password");
  }
}

// Firebase sync — READ & WRITE logic (demo)
const db = firebase.database();
const noticeRef = db.ref("notice");
const msgRef = db.ref("message");

// Load
noticeRef.on("value", (snap) => {
  document.getElementById("notice-text").value = snap.val() || "";
});
msgRef.on("value", (snap) => {
  document.getElementById("message-box").value = snap.val() || "";
});

// Save on edit (only if adminMode)
document.getElementById("notice-text").addEventListener("input", () => {
  if (adminMode) noticeRef.set(document.getElementById("notice-text").value);
});
document.getElementById("message-box").addEventListener("input", () => {
  if (adminMode) msgRef.set(document.getElementById("message-box").value);
});