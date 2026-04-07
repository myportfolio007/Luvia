/* ============================= */
/* NAVBAR — SCROLL + HAMBURGER  */
/* ============================= */

const navbar    = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
const navLinks  = document.getElementById("navLinks");

// Scroll: add .scrolled class
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 30);
});

// Hamburger toggle
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  navLinks.classList.toggle("open");
});

// Close menu on link click
navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("open");
    navLinks.classList.remove("open");
  });
});

/* ============================= */
/* SWIPE GESTURE — PORTFOLIO    */
/* ============================= */

(function(){
  let touchStartX = 0;
  let touchEndX   = 0;

  const gallery = document.getElementById("portfolio-gallery");
  if(!gallery) return;

  gallery.addEventListener("touchstart", e => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  gallery.addEventListener("touchend", e => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;

    if(Math.abs(diff) > 50){
      const btn = diff > 0
        ? document.getElementById("portfolio-next")
        : document.getElementById("portfolio-prev");
      if(btn && btn.style.display !== "none") btn.click();
    }
  }, { passive: true });
})();
const cards = document.querySelectorAll(".info-card");

function revealCards(){
  const trigger = window.innerHeight * 0.85;

  cards.forEach(card=>{
    const top = card.getBoundingClientRect().top;
    if(top < trigger){
      card.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealCards);
revealCards();


/* WORKFLOW STEP STAGGER ANIMATION */

const steps = document.querySelectorAll('.step');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){

      steps.forEach((step, index) => {
        setTimeout(() => {
          step.classList.add('show');
        }, index * 120);
      });

      observer.unobserve(entry.target); // stop observing after trigger
    }
  });
}, { threshold: 0.2 });

observer.observe(document.querySelector('.workflow'));



const phItems = document.querySelectorAll(".ph-item");

const phObserver = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      phItems.forEach((item,index)=>{
        setTimeout(()=>{
          item.style.opacity="1";
          item.style.transform="translateY(0)";
        }, index*150);
      });
      phObserver.unobserve(entry.target);
    }
  });
},{threshold:0.2});

phItems.forEach(item=>{
  item.style.opacity="0";
  item.style.transform="translateY(40px)";
  item.style.transition="0.6s ease";
});

phObserver.observe(document.querySelector(".ph-core"));











/* SAMPLE IMAGES */
/* ============================= */
/* CURATED EXECUTIVE PORTFOLIO */
/* ============================= */
document.addEventListener("DOMContentLoaded", function(){

/* ============================= */
/* ELEMENT SELECT */
/* ============================= */

const gallery = document.getElementById("portfolio-gallery");
const prevBtn = document.getElementById("portfolio-prev");
const nextBtn = document.getElementById("portfolio-next");
const dotsContainer = document.getElementById("portfolio-dots");

const lightbox = document.getElementById("portfolioLightbox");
const lightboxImg = document.getElementById("portfolioLightboxImg");
const closeBtn = document.getElementById("portfolioClose");
const lbNext = document.getElementById("portfolioLbNext");
const lbPrev = document.getElementById("portfolioLbPrev");

let currentFilter = "wedding";
let currentPage = 1;
let currentImages = [];
let currentIndex = 0;

/* ============================= */
/* IMAGE DATA */
/* ============================= */

const images = Array.from({length:36}, (_, i) => ({
  src: `https://picsum.photos/800/800?random=${i+1}`,
  category: i < 12 ? "wedding" :
            i < 24 ? "highlight" :
                     "editorial"
}));

/* ============================= */
/* RESPONSIVE COUNT */
/* ============================= */

function getPerPage(){
  const w = window.innerWidth;
  if(w >= 2500) return 12;   // 4K
  if(w >= 1200) return 9;    // Desktop
  return 6;                  // Tablet + Mobile
}

/* ============================= */
/* FILTER FUNCTION */
/* ============================= */

function getFiltered(){
  return images.filter(img => img.category === currentFilter);
}

/* ============================= */
/* RENDER GALLERY */
/* ============================= */

function renderGallery(){

  const perPage = getPerPage();
  const filtered = getFiltered();

  gallery.innerHTML = "";
  dotsContainer.innerHTML = "";

  const totalPages = Math.ceil(filtered.length / perPage);
  const start = (currentPage - 1) * perPage;
  const pageImages = filtered.slice(start, start + perPage);

  currentImages = pageImages;

  pageImages.forEach((img, index)=>{
    const div = document.createElement("div");
    div.className = "portfolio-card";
    div.innerHTML = `<img src="${img.src}" alt="">`;

    div.querySelector("img").addEventListener("click", ()=>{
      currentIndex = index;
      openLightbox();
    });

    gallery.appendChild(div);
  });

  /* DOTS */
  for(let i=1;i<=totalPages;i++){
    const dot = document.createElement("span");
    if(i === currentPage) dot.classList.add("active");

    dot.addEventListener("click", ()=>{
      currentPage = i;
      renderGallery();
    });

    dotsContainer.appendChild(dot);
  }

  prevBtn.style.display = currentPage === 1 ? "none" : "block";
  nextBtn.style.display = currentPage === totalPages ? "none" : "block";
}

/* ============================= */
/* PAGINATION */
/* ============================= */

if(nextBtn){
  nextBtn.onclick = ()=>{
    currentPage++;
    renderGallery();
  };
}

if(prevBtn){
  prevBtn.onclick = ()=>{
    currentPage--;
    renderGallery();
  };
}

/* ============================= */
/* FILTER BUTTON */
/* ============================= */

document.querySelectorAll(".portfolio-btn").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    document.querySelectorAll(".portfolio-btn")
      .forEach(b => b.classList.remove("active"));

    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    currentPage = 1;
    renderGallery();
  });
});

/* ============================= */
/* LIGHTBOX */
/* ============================= */

function openLightbox(){
  lightboxImg.src = currentImages[currentIndex].src;
  lightbox.style.display = "flex";
}

function closeLightbox(){
  lightbox.style.display = "none";
}

if(closeBtn){
  closeBtn.onclick = closeLightbox;
}

if(lbNext){
  lbNext.onclick = ()=>{
    currentIndex = (currentIndex + 1) % currentImages.length;
    openLightbox();
  };
}

if(lbPrev){
  lbPrev.onclick = ()=>{
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    openLightbox();
  };
}

/* ESC KEY CLOSE */

document.addEventListener("keydown", (e)=>{
  if(e.key === "Escape") closeLightbox();
});

/* LIGHTBOX SWIPE GESTURE */
(function(){
  let lbTouchStartX = 0;
  let lbTouchStartY = 0;

  lightbox.addEventListener("touchstart", e => {
    lbTouchStartX = e.changedTouches[0].screenX;
    lbTouchStartY = e.changedTouches[0].screenY;
  }, { passive: true });

  lightbox.addEventListener("touchend", e => {
    const dx = lbTouchStartX - e.changedTouches[0].screenX;
    const dy = lbTouchStartY - e.changedTouches[0].screenY;

    if(Math.abs(dy) > Math.abs(dx) && dy < -80){
      // swipe down → close
      closeLightbox();
    } else if(Math.abs(dx) > 50){
      // swipe left/right → navigate
      if(dx > 0){
        currentIndex = (currentIndex + 1) % currentImages.length;
      } else {
        currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
      }
      openLightbox();
    }
  }, { passive: true });
})();

/* RESPONSIVE RERENDER */

window.addEventListener("resize", ()=>{
  currentPage = 1;
  renderGallery();
});

/* INITIAL LOAD */

renderGallery();

});


/* ============================= */
/* CONTACT FORM — EMAILJS        */
/* ============================= */

const contactForm = document.getElementById("contactForm");
const submitBtn   = document.getElementById("submitBtn");

if(contactForm){
  contactForm.addEventListener("submit", function(e){
    e.preventDefault();

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    const formData = {
      studio_name:       contactForm.querySelector('[name="studio_name"]').value,
      contact_person:    contactForm.querySelector('[name="contact_person"]').value,
      reply_email:       contactForm.querySelector('[name="reply_email"]').value,
      monthly_volume:    contactForm.querySelector('[name="monthly_volume"]').value,
      delivery_timeline: contactForm.querySelector('[name="delivery_timeline"]').value,
      notes:             contactForm.querySelector('[name="notes"]').value,
    };

    emailjs.send("service_hqt3pbh", "template_daow4tq", formData, "Ri2TXOFvcBqR0Hta-")
      .then(() => {
        submitBtn.textContent = "Message Sent ✓";
        submitBtn.style.background = "#22c55e";
        contactForm.reset();
        setTimeout(() => {
          submitBtn.textContent = "Request Workflow Discussion";
          submitBtn.style.background = "";
          submitBtn.disabled = false;
        }, 4000);
      })
      .catch((err) => {
        console.error("EmailJS error:", err);
        submitBtn.textContent = "Failed. Try Again.";
        submitBtn.style.background = "#ef4444";
        submitBtn.disabled = false;
        setTimeout(() => {
          submitBtn.textContent = "Request Workflow Discussion";
          submitBtn.style.background = "";
        }, 3000);
      });
  });
}
