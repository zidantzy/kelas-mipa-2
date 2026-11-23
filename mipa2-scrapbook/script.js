/* EDIT DATA ANGGOTA DI BAGIAN INI */
const members = [
  // THE BOYS
  { name: "RAIS", group: "boys", photo: "assets/images/members/1.JPG" },
  { name: "ALDHO", group: "boys", photo: "assets/images/members/2.JPG" },

  // THE GIRLS
  { name: "NAKHWA", group: "girls", photo: "assets/images/members/3.JPG" },
  { name: "NEYSA", group: "girls", photo: "assets/images/members/4.JPG" },
  { name: "ANNISA", group: "girls", photo: "assets/images/members/5.JPG" },
  { name: "WINDA", group: "girls", photo: "assets/images/members/6.JPG" },
  { name: "YOLA", group: "girls", photo: "assets/images/members/7.JPG" },
  { name: "RARA", group: "girls", photo: "assets/images/members/8.JPG" },
  { name: "DILA", group: "girls", photo: "assets/images/members/9.JPG" },
  { name: "DIVA", group: "girls", photo: "assets/images/members/10.JPG" },
  { name: "AIDA", group: "girls", photo: "assets/images/members/11.JPG" },

  // THE BOYS
  { name: "RASYA", group: "boys", photo: "assets/images/members/12.JPG" },

  // THE GIRLS
  { name: "KEISYA", group: "girls", photo: "assets/images/members/13.JPG" },
  { name: "SYIFA", group: "girls", photo: "assets/images/members/14.JPG" },
  { name: "KIA", group: "girls", photo: "assets/images/members/15.JPG" },
  { name: "NABILA", group: "girls", photo: "assets/images/members/16.JPG" },
  { name: "VYONA", group: "girls", photo: "assets/images/members/17.JPG" },
  { name: "MUTIA", group: "girls", photo: "assets/images/members/18.JPG" },

  // THE BOYS
  { name: "ZIDAN", group: "boys", photo: "assets/images/members/19.JPG" },
  { name: "ANDRY", group: "boys", photo: "assets/images/members/20.JPG" },

  // THE GIRLS
  { name: "ICHA", group: "girls", photo: "assets/images/members/21.JPG" },
  { name: "HARUM", group: "girls", photo: "assets/images/members/22.JPG" },

  // THE BOYS
  { name: "BABUL", group: "boys", photo: "assets/images/members/23.JPG" },
  { name: "NOFAL", group: "boys", photo: "assets/images/members/24.JPG" },
  { name: "ARIL", group: "boys", photo: "assets/images/members/25.JPG" },

  // THE GIRLS
  { name: "OBIN", group: "boys", photo: "assets/images/members/26.JPG" },

  // THE BOYS
  { name: "IKHSAN", group: "boys", photo: "assets/images/members/27.JPG" },
  { name: "WANDA", group: "boys", photo: "assets/images/members/28.JPG" },
  { name: "FAYAD", group: "boys", photo: "assets/images/members/29.JPG" },

  // THE GIRLS
  { name: "AWA", group: "girls", photo: "assets/images/members/30.JPG" },
  { name: "DINI", group: "girls", photo: "assets/images/members/31.JPG" },

  // THE BOYS
  { name: "RIO", group: "boys", photo: "assets/images/members/32.JPG" },
  { name: "BIMA", group: "boys", photo: "assets/images/members/33.JPG" },
  { name: "SEHA", group: "girls", photo: "assets/images/members/34.JPG" },
  
];

const memberGrid = document.querySelector("#memberGrid");
const memberCount = document.querySelector("#memberCount");

function renderMembers(group = "all") {
  const shown = members.filter(member => group === "all" || member.group === group);
  memberGrid.innerHTML = shown.map(member => {
    const number = String(members.indexOf(member) + 1).padStart(2, "0");
    const fallback = `https://placehold.co/500x550/e0d5c5/45382e?text=MEMBER+${number}`;
    return `
      <article class="member-card" style="--tilt:${(members.indexOf(member) % 2 ? 1.2 : -1.2)}deg">
        <span class="member-number">NO. ${number}</span>
        <img src="${member.photo}" alt="${member.name}" loading="lazy"
             onerror="this.onerror=null;this.src='${fallback}'">
        <h4>${member.name}</h4>
        <span>${member.group.toUpperCase()} · MIPA 2</span>
      </article>`;
  }).join("");
  memberCount.textContent = `${shown.length} MEMBERS`;
}
renderMembers();

document.querySelectorAll(".member-tab").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelector(".member-tab.active")?.classList.remove("active");
    button.classList.add("active");
    renderMembers(button.dataset.group);
  });
});

// Filter galeri berdasarkan tahun
document.querySelectorAll(".filter-btn").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelector(".filter-btn.active")?.classList.remove("active");
    button.classList.add("active");
    const filter = button.dataset.filter;
    document.querySelectorAll(".gallery-item").forEach(item => {
      item.hidden = !(filter === "all" || item.dataset.year === filter || item.dataset.year === "all");
    });
  });
});

// Tombol timeline langsung memilih tahun pada galeri
document.querySelectorAll("[data-year-link]").forEach(link => {
  link.addEventListener("click", () => {
    const year = link.dataset.yearLink;
    document.querySelectorAll(".filter-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.filter === year);
    });
    document.querySelectorAll(".gallery-item").forEach(item => {
      item.hidden = !(item.dataset.year === year || item.dataset.year === "all");
    });
  });
});

// Mobile navigation
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
menuToggle.addEventListener("click", () => {
  const opened = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(opened));
});
navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

// Lightbox gallery
const lightbox = document.querySelector("#lightbox");
const lightboxImg = lightbox.querySelector("img");
const lightboxCaption = lightbox.querySelector("figcaption");
let currentImages = [];
let currentIndex = 0;

function visibleGalleryItems() {
  return [...document.querySelectorAll(".gallery-item")].filter(item => !item.hidden);
}
function showLightbox(index) {
  currentImages = visibleGalleryItems();
  currentIndex = (index + currentImages.length) % currentImages.length;
  const item = currentImages[currentIndex];
  lightboxImg.src = item.querySelector("img").src;
  lightboxImg.alt = item.querySelector("img").alt;
  lightboxCaption.textContent = item.dataset.caption || "";
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("locked");
}
function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("locked");
}
document.querySelectorAll(".gallery-item").forEach(item => {
  item.addEventListener("click", () => showLightbox(visibleGalleryItems().indexOf(item)));
});
lightbox.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
lightbox.querySelector(".lightbox-prev").addEventListener("click", () => showLightbox(currentIndex - 1));
lightbox.querySelector(".lightbox-next").addEventListener("click", () => showLightbox(currentIndex + 1));
lightbox.addEventListener("click", event => { if (event.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", event => {
  if (!lightbox.classList.contains("open")) return;
  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowRight") showLightbox(currentIndex + 1);
  if (event.key === "ArrowLeft") showLightbox(currentIndex - 1);
});

// Soft reveal on scroll
const revealTargets = document.querySelectorAll(
  ".section-kicker,.intro-grid,.quote-strip,.section-title-row,.year-note,.gallery-item,.people-intro,.member-card,.duo-card,.final-inner"
);
revealTargets.forEach(element => element.classList.add("reveal"));
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  revealTargets.forEach(element => observer.observe(element));
} else {
  revealTargets.forEach(element => element.classList.add("visible"));
}
