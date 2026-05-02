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
      if (size === '310ml') priceEl.textContent = '299.000đ';

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

    btnBuy.addEventListener('click', function(e) {
      const isSizeSelected = document.querySelector('.variant-btn.active');
      
      if (!isSizeSelected) {
        alert('Vui lòng chọn dung tích trước khi thêm vào giỏ hàng!');
        return; 
      }
      
      const cartCountEl = document.querySelector('.cart-count');
      let currentCartCount = parseInt(cartCountEl.textContent) || 0;
      const cartIcon = document.querySelector('.fa-shopping-bag');
      const productImage = document.querySelector('.slide img'); 
    });