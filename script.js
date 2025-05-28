document.addEventListener("DOMContentLoaded", () => {
  const numbers = document.querySelectorAll(".stat-number");
  let animated = false;

  const animateValue = (el, target, suffix = "", format = "") => {
    const duration = 2000;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentValue = Math.floor(progress * target);

      if (format === "comma") {
        el.textContent = currentValue.toLocaleString() + suffix;
      } else {
        el.textContent = currentValue + suffix;
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animated) {
          numbers.forEach((el) => {
            const target = parseInt(el.dataset.target, 10);
            const suffix = el.dataset.suffix || "";
            const format = el.dataset.format || "";
            animateValue(el, target, suffix, format);
          });
          animated = true; // Prevent it from running again
        }
      });
    },
    {
      threshold: 0.5,
    }
  );

  const section = document.querySelector(".stats-section");
  if (section) observer.observe(section);
});
console.log("Stats section is visible. Starting animation.");




// team section

  const leftArrow = document.querySelector(".arrow.left");
  const rightArrow = document.querySelector(".arrow.right");
  const teamMembers = document.querySelector(".team-members");
  const dots = document.querySelectorAll(".dot");

  let currentIndex = 0;
  const cardWidth = 260; // width + gap
  const visibleCards = Math.floor(document.querySelector(".team-slider-container").offsetWidth / cardWidth);

  function updateSlider() {
    const offset = currentIndex * cardWidth * visibleCards;
    teamMembers.style.transform = `translateX(-${offset}px)`;

    dots.forEach(dot => dot.classList.remove("active"));
    if (dots[currentIndex]) {
      dots[currentIndex].classList.add("active");
    }
  }

  rightArrow.addEventListener("click", () => {
    const maxIndex = Math.ceil(teamMembers.children.length / visibleCards) - 1;
    if (currentIndex < maxIndex) {
      currentIndex++;
      updateSlider();
    }
  });

  leftArrow.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
    }
  });

  dots.forEach(dot => {
    dot.addEventListener("click", () => {
      currentIndex = parseInt(dot.getAttribute("data-index"));
      updateSlider();
    });
  });

  window.addEventListener("resize", () => {
    currentIndex = 0;
    updateSlider();
  });

  updateSlider();






const pricing_cards = document.getElementsByClassName("pricing-card");

// Convert HTMLCollection to Array so we can loop
Array.from(pricing_cards).forEach(card => {
  card.addEventListener('click', function() {
    // Remove 'active' from all cards
    Array.from(pricing_cards).forEach(c => c.classList.remove('active'));
    
    // Add 'active' to the clicked card
    this.classList.add('active');
  });
});


const faq_cards = document.getElementsByClassName("faq-item");

// Convert HTMLCollection to Array so we can loop
Array.from(faq_cards).forEach(card => {
  card.addEventListener('click', function() {
    // Remove 'active' from all cards
    Array.from(faq_cards).forEach(c => c.classList.remove('active'));
    
    // Add 'active' to the clicked card
    this.classList.add('active');
  });
});

// portfolio-filter

  document.getElementById("portfolioFilterSelect").addEventListener("change", function () {
    const value = this.value;
    const items = document.querySelectorAll(".portfolio-item");

    items.forEach(item => {
      if (value === "all" || item.querySelector(".portfolio-tag").textContent.toLowerCase() === value) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });

