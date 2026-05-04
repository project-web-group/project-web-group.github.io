const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const dashboard = document.getElementById("dashboard");


const userText = document.getElementById("user");


function showRegister() {
  loginForm.classList.add("hidden");
  registerForm.classList.remove("hidden");
}


function showLogin() {
  registerForm.classList.add("hidden");
  loginForm.classList.remove("hidden");
}


function togglePassword(id) {
  const input = document.getElementById(id);
  input.type = input.type === "password" ? "text" : "password";
}


function register() {
  const email = document.getElementById("regEmail").value.trim();
  const pass = document.getElementById("regPass").value.trim();


  if (!email || !pass) {
    alert("Nhập đầy đủ!");
    return;
  }


  let users = JSON.parse(localStorage.getItem("users")) || [];


  if (users.find(u => u.email === email)) {
    alert("Email đã tồn tại!");
    return;
  }


  users.push({ email, pass });
  localStorage.setItem("users", JSON.stringify(users));


  alert("Đăng ký thành công!");
  showLogin();
}


function login() {
  const email = document.getElementById("loginEmail").value.trim();
  const pass = document.getElementById("loginPass").value.trim();
  const remember = document.getElementById("remember").checked;


  let users = JSON.parse(localStorage.getItem("users")) || [];


  const user = users.find(u => u.email === email && u.pass === pass);


  if (!user) {
    alert("Sai tài khoản!");
    return;
  }


  if (remember) {
    localStorage.setItem("loggedIn", email);
  } else {
    sessionStorage.setItem("loggedIn", email);
  }


  showDashboard();
}


function showDashboard() {
  loginForm.classList.add("hidden");
  registerForm.classList.add("hidden");
  dashboard.classList.remove("hidden");


  const email =
    localStorage.getItem("loggedIn") ||
    sessionStorage.getItem("loggedIn");


  userText.innerText = "Email: " + email;
}


function logout() {
  localStorage.removeItem("loggedIn");
  sessionStorage.removeItem("loggedIn");
  location.reload();
}

function forgot() {
  alert("Chức năng này chưa làm ");
}


window.onload = () => {
  if (
    localStorage.getItem("loggedIn") ||
    sessionStorage.getItem("loggedIn")
  ) {
    showDashboard();
  }
}
