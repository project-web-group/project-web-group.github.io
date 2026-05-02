    const slider = document.querySelector('.slider-container');
    const slides = document.querySelectorAll('.slide');
    let index = 0;

    document.querySelector('.next').addEventListener('click', () => {
      index = (index + 1) % slides.length;
      slider.style.transform = `translateX(-${index * 100}%)`;
    });

    document.querySelector('.prev').addEventListener('click', () => {
      index = (index - 1 + slides.length) % slides.length;
      slider.style.transform = `translateX(-${index * 100}%)`;
    });

    function changeQty(val) {
      const qtyEl = document.getElementById('quantity');
      let qty = parseInt(qtyEl.value) + val;
      if (qty < 1) qty = 1;
      qtyEl.value = qty;
    }

    function showTab(tab) {
      document.getElementById('info').style.display = (tab === 'info') ? 'block' : 'none';
      document.getElementById('comment').style.display = (tab === 'comment') ? 'block' : 'none';
      document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
      event.target.classList.add('active');
    }

    function changePrice(size) {
      const priceEl = document.getElementById('price');
      if (size === '30ml') priceEl.textContent = '152.000đ';
      else if (size === '100ml') priceEl.textContent = '399.000đ';

      document.querySelectorAll('.variant-btn').forEach(btn => btn.classList.remove('active'));
      event.target.classList.add('active');
    }

    function showSlide(i) {
      index = i;
      slider.style.transform = `translateX(-${index * 100}%)`;

      document.querySelectorAll('.thumbnails img').forEach(img => img.classList.remove('active'));
      document.querySelectorAll('.thumbnails img')[i].classList.add('active');
    }

    const reviewList = document.querySelector('.review-list');
    let reviewIndex = 0;

    document.querySelector('.next-review').addEventListener('click', () => {
      reviewIndex = (reviewIndex + 1) % reviewList.children.length;
      reviewList.style.transform = `translateX(-${reviewIndex * 100}%)`;
    });

    document.querySelector('.prev-review').addEventListener('click', () => {
      reviewIndex = (reviewIndex - 1 + reviewList.children.length) % reviewList.children.length;
      reviewList.style.transform = `translateX(-${reviewIndex * 100}%)`;
    });

    const btnBuy = document.querySelector('.btn-buy');

// --- QUẢN LÝ GIỎ HÀNG ---
let cart = JSON.parse(localStorage.getItem('cocoon_cart')) || [];

function formatPrice(price) {
  return price.toLocaleString('vi-VN') + 'đ';
}

function updateCartUI() {
  const cartCountEls = document.querySelectorAll('.cart-count');
  const miniCartItems = document.getElementById('mini-cart-items');
  const miniTotalPrice = document.getElementById('mini-total-price');
  
  let totalQty = 0;
  let totalPrice = 0;
  let miniCartHTML = '';

  cart.forEach((item, index) => {
    totalQty += item.quantity;
    totalPrice += item.price * item.quantity;
    
    miniCartHTML += `
      <div class="mini-cart-item">
        <img src="${item.image}" alt="${item.name}">
        <div class="mini-cart-info">
          <h4>${item.name}</h4>
          <p>${item.size}</p>
          <p style="color:#4a3c2a; font-weight:bold;">${item.quantity} x ${formatPrice(item.price)}</p>
        </div>
        <button class="remove-item" onclick="removeFromCart(${index})">×</button>
      </div>
    `;
  });

  cartCountEls.forEach(el => el.textContent = totalQty);
  if(miniCartItems) miniCartItems.innerHTML = miniCartHTML || '<p style="text-align:center; padding: 20px 0; color: #c28a4e;">Giỏ hàng trống</p>';
  if(miniTotalPrice) miniTotalPrice.textContent = formatPrice(totalPrice);
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem('cocoon_cart', JSON.stringify(cart));
  updateCartUI();
  
  if (cart.length === 0) {
    closeCartModal();
  } else {
    renderModalCart(); 
  }
}

function renderModalCart() {
  const modalCartItems = document.getElementById('modal-cart-items');
  const modalTotalSum = document.getElementById('modal-total-sum');
  const modalCartCount = document.getElementById('modal-cart-count');
  
  let totalQty = 0;
  let totalPrice = 0;
  let modalHTML = '';

  cart.forEach((item, index) => {
    totalQty += item.quantity;
    const itemTotal = item.price * item.quantity;
    totalPrice += itemTotal;

    modalHTML += `
      <tr>
        <td>
          <div class="modal-item-flex">
            <img src="${item.image}" alt="${item.name}">
            <div class="modal-item-info">
              <p>${item.name}</p>
              <small>Phân loại: ${item.size}</small><br>
              <small>Thương hiệu: Cocoon</small>
            </div>
          </div>
        </td>
        <td style="font-weight: 500;">${formatPrice(item.price)}</td>
        <td style="text-align: center;">${item.quantity}</td>
        <td style="font-weight: bold; color: #c28a4e;">${formatPrice(itemTotal)}</td>
        <td style="text-align: center;">
          <button class="remove-modal-btn" onclick="removeFromCart(${index})" title="Xóa sản phẩm">
            <i class="fas fa-trash-alt"></i>
          </button>
        </td>
      </tr>
    `;
  });

  modalCartItems.innerHTML = modalHTML;
  modalTotalSum.textContent = formatPrice(totalPrice);
  modalCartCount.textContent = totalQty;
}

const btnBuyCart = document.querySelector('.btn-buy');
if (btnBuyCart) {
  btnBuyCart.addEventListener('click', function() {
    const activeSizeBtn = document.querySelector('.variant-btn.active');
    if (!activeSizeBtn) {
      alert('Vui lòng chọn dung tích trước khi thêm vào giỏ hàng!');
      return;
    }

    const size = activeSizeBtn.textContent;
    const priceText = document.getElementById('price').textContent;
    const price = parseInt(priceText.replace(/\./g, '').replace('đ', ''));
    const quantity = parseInt(document.getElementById('quantity').value);
    const name = document.querySelector('.product-right h2').textContent;
    const image = document.querySelector('.slide img').src;

    const existingItemIndex = cart.findIndex(item => item.name === name && item.size === size);
    if (existingItemIndex > -1) {
      cart[existingItemIndex].quantity += quantity;
    } else {
      cart.push({ name, size, price, quantity, image });
    }

    localStorage.setItem('cocoon_cart', JSON.stringify(cart));
    updateCartUI();
    renderModalCart();
    document.getElementById('cart-modal').classList.add('show');
  });
}

function closeCartModal() {
  document.getElementById('cart-modal').classList.remove('show');
}

document.addEventListener('DOMContentLoaded', updateCartUI);