const photoPaths = [
  "Fotos/20200906_074418.jpg",
  "Fotos/20220101_152152.jpg",
  "Fotos/20220514_191026.jpg",
  "Fotos/20230218_094108.jpg",
  "Fotos/20230218_094716.jpg",
  "Fotos/20230701_203003.jpg",
  "Fotos/20231231_211828.jpg",
  "Fotos/20240106_173724.jpg",
  "Fotos/20240317_004557.jpg",
  "Fotos/20240414_103235.jpg",
  "Fotos/20240915_121221.jpg",
  "Fotos/20241110_105832.jpg",
  "Fotos/20241118_171851.jpg",
  "Fotos/20241204_102701.jpg",
  "Fotos/20241204_102716.jpg",
  "Fotos/CERIMÔNIA (678).jpg",
  "Fotos/CERIMÔNIA (681).jpg",
  "Fotos/CERIMÔNIA (721).jpg",
  "Fotos/CERIMÔNIA (897).jpg",
  "Fotos/CERIMÔNIA (944).jpg",
  "Fotos/DSC05748.jpg",
  "Fotos/DSC05836.jpg",
  "Fotos/DSC05982.jpg",
  "Fotos/DSC06034.jpg",
  "Fotos/IMG-20201101-WA0011.jpg",
  "Fotos/IMG-20201101-WA0012.jpg",
  "Fotos/IMG_0121.jpg",
  "Fotos/PRÉVIA (17).jpg",
  "Fotos/PRÉVIA (20).jpg",
  "Fotos/PRÉVIA (22).jpg",
  "Fotos/PRÉVIA (25).jpg"
].map((path) => encodeURI(path));

const declaration = `
Desde 07/10/2016, eu descobri que o amor verdadeiro também sabe ser leve.
Eu descobri que ele pode começar num sorriso e continuar por anos, como uma casa acesa por dentro.
Eu descobri que, ao seu lado, até os dias comuns ganham alma.
Você chegou como quem não faz barulho, mas muda tudo.
Chegou com a delicadeza de quem toca o mundo sem ferir.
E ficou.
Ficou no meu pensamento, na minha rotina, no jeito como eu entendo o futuro.
Ficou no meu coração como aquilo que nunca mais eu quis perder.
Você é a mulher que eu admiro quando a vida pesa.
É a coragem que eu vejo quando você segue em frente.
É a ternura que me ensina, todos os dias, a amar melhor.
Eu amo a forma como você transforma esforço em cuidado.
Eu amo a forma como você faz o ordinário parecer precioso.
Eu amo a sua presença porque ela não apenas ocupa espaço.
Ela faz morada.
Ao seu lado, eu aprendi que companheirismo não é só andar junto.
É escolher o mesmo lado da história, mesmo quando o vento muda.
É dividir silêncio, risada, planos e também os dias em que o coração precisa de colo.
É saber que eu posso descansar porque você existe.
Eu sou grato por cada lembrança que construímos.
Sou grato pelos detalhes pequenos que só o amor percebe.
Sou grato pelos dias em que a sua mão encontrou a minha.
Sou grato pelas conversas, pelos olhares e pelas certezas que nasceram devagar.
Sou grato porque você é resposta.
Resposta de uma oração que eu fiz a Deus.
Eu pedi alguém especial para dividir os dias comigo, e Ele me enviou você.
E desde então eu entendi que algumas bênçãos chegam com nome, rosto e abraço.
No dia 07/12/2024, quando dissemos sim no casamento, meu coração teve a prova mais bonita da própria vida.
Mas a verdade é que o meu sim já vinha acontecendo muito antes.
Ele vinha acontecendo desde o primeiro cuidado.
Desde o primeiro gesto.
Desde o instante em que eu percebi que a felicidade podia ter o seu nome.
Eu amo a mulher que você é.
A mulher firme.
A mulher doce.
A mulher que acolhe sem perder a força.
A mulher que faz o amor parecer algo concreto, vivo, possível.
Com você, eu sonho sem medo.
Sonho com uma casa cheia de paz.
Sonho com mesas simples e risadas sinceras.
Sonho com viagens, vitórias, recomeços e amanheceres que a gente ainda vai chamar de nossos.
Sonho com uma vida longa ao seu lado.
Uma vida onde cada capítulo tenha o calor da sua companhia.
Se hoje é Dia dos Namorados, eu quero celebrar mais do que uma data.
Quero celebrar a sorte de amar você.
Quero celebrar o privilégio de ser amado por você.
Quero celebrar tudo aquilo que fomos, tudo o que somos e tudo o que ainda vamos construir.
Você é o meu cuidado preferido.
Minha alegria mais serena.
Meu abrigo mais bonito.
Meu amor mais verdadeiro.
E, se eu pudesse resumir a minha vida com você em uma só certeza, eu diria isto:
ao seu lado, até o tempo aprende a ser gentil.
`.trim();

const elements = {
  hero: document.getElementById("hero"),
  startButton: document.getElementById("start-button"),
  musicButton: document.getElementById("music-button"),
  gallerySection: document.getElementById("gallery-section"),
  galleryFrame: document.getElementById("gallery-frame"),
  galleryImage: document.getElementById("gallery-image"),
  photoText: document.getElementById("photo-text"),
  photoCounter: document.getElementById("photo-counter"),
  prevButton: document.getElementById("prev-button"),
  nextButton: document.getElementById("next-button"),
  dots: document.getElementById("dots"),
  sparkles: document.getElementById("sparkles"),
  heartRain: document.getElementById("heart-rain"),
  cursorHearts: document.getElementById("cursor-hearts"),
  mosaic: document.getElementById("mosaic"),
  music: document.getElementById("background-music"),
};

document.documentElement.classList.add("js");

const sentenceChunks = splitSentences(declaration);
const loveChunks = splitIntoChunks(sentenceChunks, photoPaths.length);

let currentIndex = 0;
let autoplayTimer = null;
let sparkleTimer = null;
let rainTimer = null;
let cursorCooldown = 0;
let musicEnabled = false;
let swipeStartX = 0;
let swipeStartY = 0;
let swipeActive = false;

function splitSentences(text) {
  return text
    .replace(/\s+/g, " ")
    .match(/[^.!?]+[.!?]?/g)
    ?.map((chunk) => chunk.trim())
    .filter(Boolean) ?? [];
}

function splitIntoChunks(items, count) {
  const chunks = [];
  const base = Math.floor(items.length / count);
  const extra = items.length % count;
  let cursor = 0;

  for (let index = 0; index < count; index += 1) {
    const size = base + (index < extra ? 1 : 0);
    chunks.push(items.slice(cursor, cursor + Math.max(size, 1)).join(" "));
    cursor += Math.max(size, 1);
  }

  return chunks.map((chunk, index) => {
    if (index < items.length) return chunk;
    return items[items.length - 1] ?? "";
  });
}

function formatCounter(index, total) {
  return `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
}

function renderDots() {
  elements.dots.innerHTML = "";
  photoPaths.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.className = "dot";
    dot.type = "button";
    dot.setAttribute("aria-label", `Ir para a foto ${index + 1}`);
    dot.addEventListener("click", () => goToSlide(index, true));
    elements.dots.appendChild(dot);
  });
}

function updateDots() {
  [...elements.dots.children].forEach((dot, index) => {
    dot.classList.toggle("active", index === currentIndex);
  });
}

function goToSlide(index, userAction = false) {
  currentIndex = (index + photoPaths.length) % photoPaths.length;
  const imagePath = photoPaths[currentIndex];
  const caption = loveChunks[currentIndex] ?? "";

  elements.galleryFrame.classList.add("is-transitioning");
  const nextImage = new Image();
  nextImage.onload = () => {
    elements.galleryImage.src = imagePath;
    elements.galleryImage.alt = `Momento ${currentIndex + 1} de nós`;
    elements.photoText.textContent = caption;
    elements.photoCounter.textContent = formatCounter(currentIndex, photoPaths.length);
    updateDots();
    elements.galleryFrame.classList.remove("is-transitioning");
  };
  nextImage.src = imagePath;

  if (userAction) restartAutoplay();
}

function restartAutoplay() {
  clearInterval(autoplayTimer);
  const delay = window.matchMedia("(max-width: 640px)").matches ? 9000 : 6500;
  autoplayTimer = setInterval(() => goToSlide(currentIndex + 1), delay);
}

function createMosaic() {
  const shuffled = [...photoPaths].sort(() => Math.random() - 0.5).slice(0, 9);
  elements.mosaic.innerHTML = "";

  shuffled.forEach((path, index) => {
    const template = document.getElementById("mosaic-item-template");
    const item = template.content.firstElementChild.cloneNode(true);
    const image = item.querySelector("img");
    image.src = path;
    image.alt = `Memória compartilhada ${index + 1}`;
    elements.mosaic.appendChild(item);
  });
}

function spawnSparkle() {
  const sparkle = document.createElement("span");
  sparkle.className = `sparkle ${Math.random() > 0.7 ? "heart" : ""}`;
  const size = 5 + Math.random() * 7;
  sparkle.style.width = `${size}px`;
  sparkle.style.height = `${size}px`;
  sparkle.style.left = `${Math.random() * 100}vw`;
  sparkle.style.top = `${100 + Math.random() * 20}vh`;
  sparkle.style.animationDuration = `${7 + Math.random() * 7}s`;
  sparkle.style.opacity = String(0.35 + Math.random() * 0.55);
  elements.sparkles.appendChild(sparkle);
  setTimeout(() => sparkle.remove(), 15000);
}

function spawnHeartRain() {
  const heart = document.createElement("span");
  heart.className = "rain-heart";
  heart.textContent = "❤";
  heart.style.left = `${Math.random() * 100}vw`;
  heart.style.fontSize = `${0.75 + Math.random() * 1.3}rem`;
  heart.style.animationDuration = `${7 + Math.random() * 6}s`;
  heart.style.setProperty("--drift", `${-80 + Math.random() * 160}px`);
  elements.heartRain.appendChild(heart);
  setTimeout(() => heart.remove(), 14000);
}

function spawnCursorHeart(x, y) {
  const heart = document.createElement("span");
  heart.className = "cursor-heart";
  heart.textContent = "❤";
  heart.style.left = `${x}px`;
  heart.style.top = `${y}px`;
  heart.style.fontSize = `${0.8 + Math.random() * 0.8}rem`;
  heart.style.animationDuration = `${1.5 + Math.random()}s`;
  elements.cursorHearts.appendChild(heart);
  setTimeout(() => heart.remove(), 1800);
}

function setupAmbientEffects() {
  sparkleTimer = setInterval(spawnSparkle, 240);
  rainTimer = setInterval(spawnHeartRain, 620);

  window.addEventListener("pointermove", (event) => {
    if (Date.now() - cursorCooldown < 45) return;
    cursorCooldown = Date.now();
    spawnCursorHeart(event.clientX, event.clientY);
  });
}

function startMusic() {
  if (!elements.music) return Promise.reject(new Error("Música não encontrada."));
  elements.music.currentTime = 0;
  elements.music.volume = 0.75;
  return elements.music.play();
}

function stopMusic() {
  if (!elements.music) return;
  elements.music.pause();
  elements.music.currentTime = 0;
}

function setMusicState(enabled) {
  musicEnabled = enabled;
  elements.musicButton.textContent = `Música: ${enabled ? "ligada" : "desligada"}`;
  if (enabled) {
    startMusic().catch(() => {
      musicEnabled = false;
      elements.musicButton.textContent = "Música: desligada";
      alert("Não consegui iniciar a música. Tente novamente ou verifique se o arquivo 1.mp3 está acessível.");
    });
  } else {
    stopMusic();
  }
}

function revealOnScroll() {
  if (!("IntersectionObserver" in window)) {
    document.querySelectorAll(".reveal").forEach((item) => item.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.18 }
  );

  document.querySelectorAll(".reveal").forEach((item) => observer.observe(item));
}

function init() {
  renderDots();
  createMosaic();
  revealOnScroll();
  setupAmbientEffects();
  goToSlide(0);
  restartAutoplay();

  elements.prevButton.addEventListener("click", () => goToSlide(currentIndex - 1, true));
  elements.nextButton.addEventListener("click", () => goToSlide(currentIndex + 1, true));

  elements.startButton.addEventListener("click", () => {
    document.querySelector("#gallery-section").scrollIntoView({ behavior: "smooth" });
  });

  elements.musicButton.addEventListener("click", async () => {
    setMusicState(!musicEnabled);
    if (musicEnabled && audioContext?.state === "suspended") {
      await audioContext.resume();
    }
  });

  const getPoint = (event) => {
    if (event.touches && event.touches[0]) return event.touches[0];
    if (event.changedTouches && event.changedTouches[0]) return event.changedTouches[0];
    return event;
  };

  const startSwipe = (event) => {
    const point = getPoint(event);
    swipeStartX = point.clientX;
    swipeStartY = point.clientY;
    swipeActive = true;
  };

  const moveSwipe = (event) => {
    if (!swipeActive) return;
    const point = getPoint(event);
    const deltaX = point.clientX - swipeStartX;
    const deltaY = point.clientY - swipeStartY;
    if (Math.abs(deltaX) > 12 && Math.abs(deltaX) > Math.abs(deltaY)) {
      elements.galleryFrame.style.transform = `translateX(${deltaX * 0.03}px)`;
    }
  };

  const finishSwipe = (event) => {
    if (!swipeActive) return;
    const point = getPoint(event);
    swipeActive = false;
    elements.galleryFrame.style.transform = "";
    const deltaX = point.clientX - swipeStartX;
    const deltaY = point.clientY - swipeStartY;
    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) goToSlide(currentIndex + 1, true);
      else goToSlide(currentIndex - 1, true);
    }
  };

  elements.galleryFrame.addEventListener("pointerdown", startSwipe);
  elements.galleryFrame.addEventListener("pointermove", moveSwipe);
  elements.galleryFrame.addEventListener("pointerup", finishSwipe);
  elements.galleryFrame.addEventListener("pointercancel", () => {
    swipeActive = false;
    elements.galleryFrame.style.transform = "";
  });
  elements.galleryFrame.addEventListener("pointerleave", () => {
    swipeActive = false;
    elements.galleryFrame.style.transform = "";
  });

  elements.galleryFrame.addEventListener("touchstart", startSwipe, { passive: true });
  elements.galleryFrame.addEventListener("touchmove", moveSwipe, { passive: true });
  elements.galleryFrame.addEventListener("touchend", finishSwipe);
  elements.galleryFrame.addEventListener("touchcancel", () => {
    swipeActive = false;
    elements.galleryFrame.style.transform = "";
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") goToSlide(currentIndex + 1, true);
    if (event.key === "ArrowLeft") goToSlide(currentIndex - 1, true);
  });
}

init();
