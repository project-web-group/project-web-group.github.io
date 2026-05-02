function formatPrice(price) {
  return price.toLocaleString('vi-VN') + 'đ';
}

const slider = document.querySelector('.slider-container');
const slides = document.querySelectorAll('.slide');
let index = 0;

if (document.querySelector('.next')) {
  document.querySelector('.next').addEventListener('click', () => {
    index = (index + 1) % slides.length;
    slider.style.transform = `translateX(-${index * 100}%)`;
    updateThumbnails(index);
  });
}
if (document.querySelector('.prev')) {
  document.querySelector('.prev').addEventListener('click', () => {
    index = (index - 1 + slides.length) % slides.length;
    slider.style.transform = `translateX(-${index * 100}%)`;
    updateThumbnails(index);
  });
}

function showSlide(i) {
  if(!slider) return;
  index = i;
  slider.style.transform = `translateX(-${index * 100}%)`;
  updateThumbnails(index);
}

function updateThumbnails(idx) {
  const thumbnails = document.querySelectorAll('.thumbnails img');
  thumbnails.forEach(img => img.classList.remove('active'));
  if (thumbnails[idx]) thumbnails[idx].classList.add('active');
}

const reviewList = document.querySelector('.review-list');
let reviewIndex = 0;
if (document.querySelector('.next-review')) {
  document.querySelector('.next-review').addEventListener('click', () => {
    reviewIndex = (reviewIndex + 1) % reviewList.children.length;
    reviewList.style.transform = `translateX(-${reviewIndex * 100}%)`;
  });
}
if (document.querySelector('.prev-review')) {
  document.querySelector('.prev-review').addEventListener('click', () => {
    reviewIndex = (reviewIndex - 1 + reviewList.children.length) % reviewList.children.length;
    reviewList.style.transform = `translateX(-${reviewIndex * 100}%)`;
  });
}
function showTab(tab) {
  const infoTab = document.getElementById('info');
  const commentTab = document.getElementById('comment');
  if(infoTab) infoTab.style.display = (tab === 'info') ? 'block' : 'none';
  if(commentTab) commentTab.style.display = (tab === 'comment') ? 'block' : 'none';
  
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
}

function changeQty(val) {
  const qtyEl = document.getElementById('quantity');
  if (qtyEl) {
    let qty = parseInt(qtyEl.value) + val;
    if (qty < 1) qty = 1;
    qtyEl.value = qty;
  }
}

const variantBtns = document.querySelectorAll('.variant-btn');
const priceDisplay = document.getElementById('price');

if (variantBtns.length > 0 && priceDisplay) {
  variantBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      variantBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const newPrice = parseInt(this.getAttribute('data-price'));
      priceDisplay.textContent = formatPrice(newPrice);
    });
  });

  const activeInitBtn = document.querySelector('.variant-btn.active');
  if (activeInitBtn) {
    priceDisplay.textContent = formatPrice(parseInt(activeInitBtn.getAttribute('data-price')));
  }
}

let cart = JSON.parse(localStorage.getItem('cocoon_cart')) || [];

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
  
  if (typeof renderPageCart === 'function') renderPageCart();
  
  const modal = document.getElementById('cart-modal');
  if (modal && modal.classList.contains('show')) {
    if (cart.length === 0) closeCartModal();
    else renderModalCart();
  }
}

function renderModalCart() {
  const modalCartItems = document.getElementById('modal-cart-items');
  const modalTotalSum = document.getElementById('modal-total-sum');
  const modalCartCount = document.getElementById('modal-cart-count');
  
  if(!modalCartItems) return;

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
              <small>Phân loại: ${item.size}</small>
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
      alert('Vui lòng chọn phân loại sản phẩm!');
      return;
    }

    const size = activeSizeBtn.getAttribute('data-size');
    const price = parseInt(activeAttribute = activeSizeBtn.getAttribute('data-price'));
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
    
    const modal = document.getElementById('cart-modal');
    if(modal) modal.classList.add('show');
  });
}

function closeCartModal() {
  const modal = document.getElementById('cart-modal');
  if(modal) modal.classList.remove('show');
}

document.addEventListener('DOMContentLoaded', updateCartUI);