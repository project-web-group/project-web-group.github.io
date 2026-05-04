function closeModal() {
  document.querySelector(".modal").style.display = "none";
}

/* ===== VALIDATE ===== */
function send() {
  const ids = ["name", "phone", "email", "message"];
  let valid = true;

  ids.forEach(id => {
    const input = document.getElementById(id);
    const field = input.parentElement;

    if (!input.value.trim()) {
      field.classList.add("error"); // chỉ thêm khi bấm nút
      valid = false;
    }
  });

  if (!valid) return;

  alert("Gửi thành công 🎉");
}

/* ===== XOÁ LỖI KHI GÕ ===== */
["name", "phone", "email", "message"].forEach(id => {
  const input = document.getElementById(id);

  input.addEventListener("input", () => {
    if (input.value.trim()) {
      input.parentElement.classList.remove("error");
    }
  });
});

/* gọi */
function call() {
  alert("Đang gọi 📞");
}
function call() {
  window.location.href = "support.html";
}