/* MIPA 2 — THE MEMORY BOOK | Optimized interactions */
"use strict";

// DATA 34 ANGGOTA — nama, kelompok, dan lokasi foto dipertahankan.
const members = [
  {name:"RAIS",group:"boys",photo:"assets/images/members/1.JPG"},
  {name:"ALDHO",group:"boys",photo:"assets/images/members/2.JPG"},
  {name:"NAKHWA",group:"girls",photo:"assets/images/members/3.JPG"},
  {name:"NEYSA",group:"girls",photo:"assets/images/members/4.JPG"},
  {name:"ANNISA",group:"girls",photo:"assets/images/members/5.JPG"},
  {name:"WINDA",group:"girls",photo:"assets/images/members/6.JPG"},
  {name:"YOLA",group:"girls",photo:"assets/images/members/7.JPG"},
  {name:"RARA",group:"girls",photo:"assets/images/members/8.JPG"},
  {name:"DILA",group:"girls",photo:"assets/images/members/9.JPG"},
  {name:"DIVA",group:"girls",photo:"assets/images/members/10.JPG"},
  {name:"AIDA",group:"girls",photo:"assets/images/members/11.JPG"},
  {name:"RASYA",group:"boys",photo:"assets/images/members/12.JPG"},
  {name:"KEISYA",group:"girls",photo:"assets/images/members/13.JPG"},
  {name:"SYIFA",group:"girls",photo:"assets/images/members/14.JPG"},
  {name:"KIA",group:"girls",photo:"assets/images/members/15.JPG"},
  {name:"NABILA",group:"girls",photo:"assets/images/members/16.JPG"},
  {name:"VYONA",group:"girls",photo:"assets/images/members/17.JPG"},
  {name:"MUTIA",group:"girls",photo:"assets/images/members/18.JPG"},
  {name:"ZIDAN",group:"boys",photo:"assets/images/members/19.JPG"},
  {name:"ANDRY",group:"boys",photo:"assets/images/members/20.JPG"},
  {name:"ICHA",group:"girls",photo:"assets/images/members/21.JPG"},
  {name:"HARUM",group:"girls",photo:"assets/images/members/22.JPG"},
  {name:"BABUL",group:"boys",photo:"assets/images/members/23.JPG"},
  {name:"NOFAL",group:"boys",photo:"assets/images/members/24.JPG"},
  {name:"ARIL",group:"boys",photo:"assets/images/members/25.JPG"},
  {name:"OBIN",group:"boys",photo:"assets/images/members/26.JPG"},
  {name:"IKHSAN",group:"boys",photo:"assets/images/members/27.JPG"},
  {name:"WANDA",group:"boys",photo:"assets/images/members/28.JPG"},
  {name:"FAYAD",group:"boys",photo:"assets/images/members/29.JPG"},
  {name:"AWA",group:"girls",photo:"assets/images/members/30.JPG"},
  {name:"DINI",group:"girls",photo:"assets/images/members/31.JPG"},
  {name:"RIO",group:"boys",photo:"assets/images/members/32.JPG"},
  {name:"BIMA",group:"boys",photo:"assets/images/members/33.JPG"},
  {name:"SEHA",group:"girls",photo:"assets/images/members/34.JPG"}
];

const $ = (selector, parent=document) => parent.querySelector(selector);
const $$ = (selector, parent=document) => [...parent.querySelectorAll(selector)];

const cover = $("#bookCover");
const openBook = $("#openBook");
if (cover && openBook) {
  openBook.addEventListener("click", () => {
    cover.classList.add("is-opening");
    document.body.classList.remove("cover-locked");
    window.setTimeout(() => cover.remove(), 650);
  });
}


const memberGrid = $("#memberGrid");
const memberCount = $("#memberCount");

function addFallback(img, fallbackUrl) {
  img.addEventListener("error", () => {
    if (img.dataset.fallbackApplied) return;
    img.dataset.fallbackApplied = "true";
    img.src = fallbackUrl;
  }, {once:true});
}

function renderMembers(group="all") {
  if (!memberGrid || !memberCount) return;
  const shown = members.filter(member => group==="all" || member.group===group);
  memberGrid.innerHTML = shown.map(member => {
    const index = members.indexOf(member);
    const number = String(index+1).padStart(2,"0");
    const fallback = `https://placehold.co/500x500/e0d5c5/45382e?text=MEMBER+${number}`;
    return `<article class="member-card" style="--tilt:${index%2?1.2:-1.2}deg">
      <span class="member-number">NO. ${number}</span>
      <img src="${member.photo}" alt="Foto ${member.name}" width="500" height="500"
        loading="lazy" decoding="async" fetchpriority="low" data-fallback="${fallback}">
      <h4>${member.name}</h4><span>${member.group.toUpperCase()} · MIPA 2</span>
    </article>`;
  }).join("");
  $$("img[data-fallback]",memberGrid).forEach(img=>addFallback(img,img.dataset.fallback));
  memberCount.textContent = `${shown.length} MEMBERS`;
}
renderMembers();

$$(".member-tab").forEach(button => button.addEventListener("click", () => {
  $$(".member-tab").forEach(tab=>tab.classList.toggle("active",tab===button));
  renderMembers(button.dataset.group);
}));

function applyGalleryFilter(year) {
  $$(".filter-btn").forEach(btn=>btn.classList.toggle("active",btn.dataset.filter===year));
  $$(".gallery-item").forEach(item=>{
    item.hidden = !(year==="all" || item.dataset.year===year || item.dataset.year==="all");
  });
}
$$(".filter-btn").forEach(button=>button.addEventListener("click",()=>applyGalleryFilter(button.dataset.filter)));
$$("[data-year-link]").forEach(link=>link.addEventListener("click",()=>applyGalleryFilter(link.dataset.yearLink)));

// Menu mobile: tutup setelah link dipilih dan saat Escape ditekan.
const menuToggle = $(".menu-toggle");
const navLinks = $(".nav-links");
if(menuToggle && navLinks){
  menuToggle.addEventListener("click",()=>{
    const opened=navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded",String(opened));
  });
  $$("a",navLinks).forEach(link=>link.addEventListener("click",()=>{
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded","false");
  }));
}

// Lightbox: gunakan currentSrc dan tunggu gambar besar selesai dimuat.
const lightbox=$("#lightbox");
const lightboxImg=$("figure img",lightbox);
const lightboxCaption=$("figcaption",lightbox);
let currentImages=[];
let currentIndex=0;
function visibleGalleryItems(){return $$(".gallery-item").filter(item=>!item.hidden)}
function showLightbox(index){
  currentImages=visibleGalleryItems();
  if(!currentImages.length)return;
  currentIndex=(index+currentImages.length)%currentImages.length;
  const item=currentImages[currentIndex];
  const source=item.querySelector("img");
  lightboxImg.src=source.currentSrc||source.src;
  lightboxImg.alt=source.alt;
  lightboxCaption.textContent=item.dataset.caption||"";
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden","false");
  document.body.classList.add("locked");
  $(".lightbox-close",lightbox)?.focus();
}
function closeLightbox(){
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden","true");
  document.body.classList.remove("locked");
}
$$(".gallery-item").forEach(item=>item.addEventListener("click",()=>{
  showLightbox(visibleGalleryItems().indexOf(item));
}));
$(".lightbox-close",lightbox)?.addEventListener("click",closeLightbox);
$(".lightbox-prev",lightbox)?.addEventListener("click",()=>showLightbox(currentIndex-1));
$(".lightbox-next",lightbox)?.addEventListener("click",()=>showLightbox(currentIndex+1));
lightbox?.addEventListener("click",event=>{if(event.target===lightbox)closeLightbox()});
document.addEventListener("keydown",event=>{
  if(event.key==="Escape"){
    if(lightbox?.classList.contains("open"))closeLightbox();
    navLinks?.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded","false");
  }
  if(!lightbox?.classList.contains("open"))return;
  if(event.key==="ArrowRight")showLightbox(currentIndex+1);
  if(event.key==="ArrowLeft")showLightbox(currentIndex-1);
});

// Reveal saat elemen mendekati viewport. Fallback: tampilkan semua jika browser tidak mendukung.
const revealTargets=$$(".section-kicker,.intro-grid,.quote-strip,.section-title-row,.year-note,.gallery-item,.people-intro,.member-card,.duo-card,.final-inner");
if("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches){
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },{threshold:0.06,rootMargin:"0px 0px 60px 0px"});
  revealTargets.forEach(element=>{element.classList.add("reveal");observer.observe(element)});
}else{
  revealTargets.forEach(element=>element.classList.add("visible"));
}
