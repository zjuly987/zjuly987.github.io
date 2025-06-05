
// Mảng để lưu tour trong giỏ hàng (chỉ lưu key của tour)
let cartItems = [];

// Hàm định dạng số tiền (thêm dấu phân cách hàng nghìn)
function formatPrice(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " VNĐ";
}

// Hàm thêm tour vào giỏ hàng
function addToCart(tourKey) {
  if (dataTour[tourKey] && !cartItems.includes(tourKey)) {
    cartItems.push(tourKey);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }
}

// Hiển thị dropdown khi nhấp vào giỏ hàng
document.getElementById('cartLink').addEventListener('click', function(e) {
  e.preventDefault();
  const cartDropdown = document.getElementById('cartDropdown');
  const cartItemsDiv = document.getElementById('cartItems');

  // Lấy dữ liệu từ localStorage
  cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  // Hiển thị các tour trong dropdown
  cartItemsDiv.innerHTML = '';
  if (cartItems.length === 0) {
    cartItemsDiv.innerHTML = '<p style="text-align: center;">Giỏ hàng trống</p>';
  } else {
    cartItems.forEach(tourKey => {
      const tour = dataTour[tourKey];
      if (tour) {
        cartItemsDiv.innerHTML += `
          <div class="cart-item-details" onclick="goToCheckout('${tourKey}')">
            <img src="${tour.image}" alt="${tour.name}" style="width: 50px; height: 50px; object-fit: cover; margin-right: 10px;">
            <div>
              <p style="font-weight: bold;">${tour.name}</p>
              <p>Giá: ${formatPrice(tour.price)}</p>
              <p>Thời gian: ${tour.duration}</p>
              <p>Phương tiện: ${tour.transport}</p>
            </div>
          </div>
        `;
      }
    });
  }

  // Toggle hiển thị dropdown
  cartDropdown.style.display = cartDropdown.style.display === 'none' ? 'block' : 'none';
});

// Chuyển đến trang thanh toán khi nhấp vào tour trong giỏ hàng
function goToCheckout(tourKey) {
  localStorage.setItem('selectedTour', tourKey);
  window.location.href = '../Thanh Toán/thanhtoan.html';
}

// Ẩn dropdown khi nhấp ra ngoài
document.addEventListener('click', function(e) {
  const cartDropdown = document.getElementById('cartDropdown');
  const cartLink = document.getElementById('cartLink');
  if (!cartDropdown.contains(e.target) && e.target !== cartLink) {
    cartDropdown.style.display = 'none';
  }
});

// Cập nhật padding cho phần nội dung dưới header
function updateMainPadding() {
  const header = document.querySelector("header");
  const main = document.querySelector(".main-content");
  if (header && main) {
    main.style.paddingTop = header.offsetHeight + "px";
  }
}

window.addEventListener("load", updateMainPadding);
window.addEventListener("resize", updateMainPadding);

// Ẩn hiện header khi cuộn
let lastScrollTop = 0;

window.addEventListener('scroll', function () {
  const header = document.querySelector('header');
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const documentHeight = document.documentElement.scrollHeight;
  const windowHeight = window.innerHeight;
  const distanceToBottom = documentHeight - (scrollTop + windowHeight);

  if (distanceToBottom < 300) {
    header.style.top = "-300px";
  } else {
    if (scrollTop > lastScrollTop) {
      header.style.top = "-80px";
    } else {
      header.style.top = "0";
    }
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Carousel
document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll('.underbanner-slide');
const slideContainer = document.querySelector('.underbanner-slides-wrapper');
  let currentIndex = 0;

  function showSlide(index) {
    const offset = -index * 100;
    slideContainer.style.transform = `translateX(${offset}%)`;
  }

document.querySelector('.underbanner-next').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
});

document.querySelector('.underbanner-prev').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  showSlide(currentIndex);
});


  // Auto-slide every 5 seconds
  setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }, 5000);
});

// Search
document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('searchInput');

  if (searchInput) {
    searchInput.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        const keyword = searchInput.value.trim().toLowerCase();
        const tourItems = document.querySelectorAll('.tour-item');

        tourItems.forEach(item => {
          const title = item.querySelector('h3')?.textContent.toLowerCase() || "";
          const itinerary = item.querySelector('.itinerary')?.textContent.toLowerCase() || "";

          if (title.includes(keyword) || itinerary.includes(keyword)) {
            item.style.display = "block";
          } else {
            item.style.display = "none";
          }
        });
      }
    });
  }
});

// Slider for tours
let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const slider = document.querySelector('.slider');
const slidesPerView = 4;

function moveSlide(direction) {
  currentIndex += direction;

  if (currentIndex < 0) {
    currentIndex = totalSlides - slidesPerView;
  } else if (currentIndex > totalSlides - slidesPerView) {
    currentIndex = 0;
  }

  const offset = -currentIndex * 25;
  slider.style.transform = `translateX(${offset}%)`;
}

// Hot sale slider
let hotSaleIndex = 0;
const hotSaleSlides = document.querySelectorAll('.hot-sale-slider .slide');
const hotSaleSlider = document.querySelector('.hot-sale-slider .slider');
const slidesPerViewHotSale = 4;

function moveHotSaleSlide(direction) {
  hotSaleIndex += direction;

  if (hotSaleIndex < 0) {
    hotSaleIndex = hotSaleSlides.length - slidesPerViewHotSale;
  } else if (hotSaleIndex > hotSaleSlides.length - slidesPerViewHotSale) {
    hotSaleIndex = 0;
  }

  const offset = -hotSaleIndex * 25;
  hotSaleSlider.style.transform = `translateX(${offset}%)`;
}

window.addEventListener('load', () => {
  moveHotSaleSlide(0);
});

// News slider
let newsSlideIndex = 0;
const newsSlides = document.querySelectorAll('.news-slide');
const totalNewsSlides = newsSlides.length;
const newsSlider = document.querySelector('.news-slider');
const slidesPerView1 = 4;

function moveNewsSlide(direction) {
  newsSlideIndex += direction;

  if (newsSlideIndex < 0) {
    newsSlideIndex = totalNewsSlides - slidesPerView1;
  } else if (newsSlideIndex > totalNewsSlides - slidesPerView1) {
    newsSlideIndex = 0;
  }

  const offset = -newsSlideIndex * (100 / slidesPerView1);
  newsSlider.style.transform = `translateX(${offset}%)`;
}

window.addEventListener('load', () => {
  moveNewsSlide(0);
});

// Modal handling
function openModal(modalId) {
  document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = 'none';
}

window.onclick = function (event) {
  const loginModal = document.getElementById('login-modal');
  const registerModal = document.getElementById('register-modal');

  if (event.target === loginModal) {
    loginModal.style.display = "none";
  } else if (event.target === registerModal) {
    registerModal.style.display = "none";
  }
};

// Reveal review items
function revealReviewItems() {
  const reviewItems = document.querySelectorAll('.review-item');
  const triggerBottom = window.innerHeight * 0.9;

  reviewItems.forEach((item, index) => {
    const boxTop = item.getBoundingClientRect().top;

    if (boxTop < triggerBottom) {
      setTimeout(() => {
        item.classList.add('active');
      }, index * 200);
    }
  });
}

window.addEventListener('scroll', revealReviewItems);
window.addEventListener('load', revealReviewItems);

// Back to top button
window.onscroll = function () {
  const btn = document.getElementById("backToTopBtn");
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    btn.style.display = "block";
  } else {
    btn.style.display = "none";
  }
};

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// slideshow sau header
// Slideshow dưới header
let underbannerIndex = 0;
const underbannerSlides = document.querySelectorAll('.underbanner-slide');

function showUnderbannerSlide(index) {
  underbannerSlides.forEach((slide, i) => {
    slide.classList.remove('active');
    if (i === index) {
      slide.classList.add('active');
    }
  });
}

function plusUnderbannerSlides(n) {
  underbannerIndex += n;
  if (underbannerIndex >= underbannerSlides.length) {
    underbannerIndex = 0;
  } else if (underbannerIndex < 0) {
    underbannerIndex = underbannerSlides.length - 1;
  }
  showUnderbannerSlide(underbannerIndex);
}

// Tự động chuyển slide mỗi 5 giây
setInterval(() => {
  plusUnderbannerSlides(1);
}, 5000);

// Hiển thị slide đầu tiên khi load
document.addEventListener('DOMContentLoaded', () => {
  showUnderbannerSlide(underbannerIndex);
});

