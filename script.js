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
document.addEventListener('DOMContentLoaded', function() {
    const teamMembers = document.querySelector('.team-members');
    const members = document.querySelectorAll('.team-member');
    const prevBtn = document.querySelector('.arrow.left');
    const nextBtn = document.querySelector('.arrow.right');
    const dots = document.querySelectorAll('.dot');
    
    let currentIndex = 0;
    const memberWidth = members[0].offsetWidth + 30; // width + gap
    const visibleMembers = Math.min(4, Math.floor(window.innerWidth / memberWidth));
    const totalSlides = Math.ceil(members.length / visibleMembers);
    
    // Initialize carousel
    function initCarousel() {
        teamMembers.style.transform = `translateX(0)`;
        updateDots();
        updateArrows();
    }
    
    // Move to specific slide
    function goToSlide(index) {
        if (index < 0 || index >= totalSlides) return;
        
        currentIndex = index;
        const translateX = -currentIndex * visibleMembers * memberWidth;
        teamMembers.style.transition = 'transform 0.5s ease';
        teamMembers.style.transform = `translateX(${translateX}px)`;
        
        updateDots();
        updateArrows();
    }
    
    // Update dot indicators
    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Update arrow buttons state
    function updateArrows() {
        prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
        prevBtn.style.cursor = currentIndex === 0 ? 'not-allowed' : 'pointer';
        
        nextBtn.style.opacity = currentIndex >= totalSlides - 1 ? '0.5' : '1';
        nextBtn.style.cursor = currentIndex >= totalSlides - 1 ? 'not-allowed' : 'pointer';
    }
    
    // Event listeners
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            goToSlide(currentIndex - 1);
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentIndex < totalSlides - 1) {
            goToSlide(currentIndex + 1);
        }
    });
    
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.getAttribute('data-index'));
            goToSlide(index);
        });
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        const newVisibleMembers = Math.min(4, Math.floor(window.innerWidth / memberWidth));
        if (newVisibleMembers !== visibleMembers) {
            initCarousel();
        }
    });
    
    // Initialize on load
    initCarousel();
});