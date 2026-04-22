
        let slides = document.querySelectorAll('.slide');
        let dots = document.querySelectorAll('.dot');
        let currentIndex = 0;
        let slideInterval;

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
            currentIndex = index;
        }

        function nextSlide() {
            let newIndex = (currentIndex + 1) % slides.length;
            showSlide(newIndex);
        }

        function prevSlide() {
            let newIndex = (currentIndex - 1 + slides.length) % slides.length;
            showSlide(newIndex);
        }

        window.changeSlide = function(direction) {
            if (direction === 1) nextSlide();
            else prevSlide();
            resetInterval();
        };

        window.currentSlide = function(index) {
            showSlide(index);
            resetInterval();
        };

        function resetInterval() {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 5000);
        }

        slideInterval = setInterval(nextSlide, 5000);

        // Add to cart alert
        document.querySelectorAll('.add-to-cart, .see-more-btn, .btn-primary, .btn-secondary').forEach(btn => {
            btn.addEventListener('click', (e) => {
                if(btn.classList.contains('add-to-cart')) alert('✅ Đã thêm sản phẩm vào giỏ hàng!');
                else alert('📞 Cảm ơn bạn, chúng tôi sẽ liên hệ sớm!');
            });
        });