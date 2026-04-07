document.addEventListener("DOMContentLoaded", function(){

const gallery = document.getElementById("portfolio-gallery");
const prevBtn = document.getElementById("portfolio-prev");
const nextBtn = document.getElementById("portfolio-next");
const dotsContainer = document.getElementById("portfolio-dots");

let currentPage = 1;
const perPage = 15;
let currentFilter = "all";

/* SAMPLE IMAGES */
const images = Array.from({length:30},(_,i)=>({
  src:`https://picsum.photos/800/600?random=${i+1}`,
  category: i%2===0 ? "wedding" : "portrait"
}));

function getFiltered(){
  if(currentFilter==="all") return images;
  return images.filter(img=>img.category===currentFilter);
}

function renderGallery(){
  const filtered = getFiltered();
  const totalPages = Math.ceil(filtered.length/perPage);

  gallery.innerHTML="";
  dotsContainer.innerHTML="";

  let start=(currentPage-1)*perPage;
  let pageImages=filtered.slice(start,start+perPage);

  pageImages.forEach((img)=>{
    const div=document.createElement("div");
    div.className="portfolio-card";
    div.innerHTML=`<img src="${img.src}">`;
    gallery.appendChild(div);
  });

  /* DOTS */
  for(let i=1;i<=totalPages;i++){
    const dot=document.createElement("span");
    if(i===currentPage) dot.classList.add("active");
    dot.addEventListener("click",()=>{
      currentPage=i;
      renderGallery();
    });
    dotsContainer.appendChild(dot);
  }

  prevBtn.style.display=currentPage===1?"none":"block";
  nextBtn.style.display=currentPage===totalPages?"none":"block";

  activateLightbox();
}

/* PAGINATION */

nextBtn.onclick=()=>{
  currentPage++;
  renderGallery();
};

prevBtn.onclick=()=>{
  currentPage--;
  renderGallery();
};

/* FILTER */

document.querySelectorAll(".portfolio-btn").forEach(btn=>{
  btn.onclick=()=>{
    document.querySelectorAll(".portfolio-btn").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter=btn.dataset.filter;
    currentPage=1;
    renderGallery();
  };
});

/* LIGHTBOX */
function activateLightbox(){

  const cards=document.querySelectorAll(".portfolio-card img");
  const lightbox=document.getElementById("portfolioLightbox");
  const lightboxImg=document.getElementById("portfolioLightboxImg");
  const close=document.getElementById("portfolioClose");
  const next=document.getElementById("portfolioLbNext");
  const prev=document.getElementById("portfolioLbPrev");

  let index=0;
  const srcs=Array.from(cards).map(c=>c.src);

  cards.forEach((img,i)=>{
    img.onclick=()=>{
      index=i;
      lightboxImg.src=srcs[index];
      lightbox.style.display="flex";
    };
  });

  close.onclick=()=>lightbox.style.display="none";

  next.onclick=()=>{
    index=(index+1)%srcs.length;
    lightboxImg.src=srcs[index];
  };

  prev.onclick=()=>{
    index=(index-1+srcs.length)%srcs.length;
    lightboxImg.src=srcs[index];
  };
}