/* ═══════════════════════════════════════════════
   NAVBAR — scroll effect + hamburger + active link
═══════════════════════════════════════════════ */
const navbar = document.getElementById("navbar")
const hamburger = document.getElementById("hamburger")
const navLinks = document.getElementById("navLinks")

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 30)
  updateActiveLink()
})

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open")
  navLinks.classList.toggle("open")
})

// fecha menu mobile ao clicar num link
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("open")
    navLinks.classList.remove("open")
  })
})

function updateActiveLink() {
  const sections = document.querySelectorAll("section[id]")
  const scrollY = window.scrollY + 100

  sections.forEach((section) => {
    const top = section.offsetTop
    const height = section.offsetHeight
    const id = section.getAttribute("id")
    const anchor = document.querySelector(`.nav-links a[href="#${id}"]`)

    if (anchor) {
      anchor.classList.toggle(
        "active",
        scrollY >= top && scrollY < top + height,
      )
    }
  })
}

/* ═══════════════════════════════════════════════
   TYPED TEXT — efeito de digitação no hero
═══════════════════════════════════════════════ */
const phrases = [
  "Full Stack Developer",
  "Analista QA",
  "React & Node.js",
  "Apaixonado por código",
]

let phraseIdx = 0
let charIdx = 0
let deleting = false
let pauseTimer = null
const typedEl = document.getElementById("typedText")

function type() {
  const current = phrases[phraseIdx]

  if (!deleting) {
    typedEl.textContent = current.slice(0, ++charIdx)
    if (charIdx === current.length) {
      deleting = true
      pauseTimer = setTimeout(type, 1800)
      return
    }
    setTimeout(type, 80)
  } else {
    typedEl.textContent = current.slice(0, --charIdx)
    if (charIdx === 0) {
      deleting = false
      phraseIdx = (phraseIdx + 1) % phrases.length
      setTimeout(type, 400)
      return
    }
    setTimeout(type, 40)
  }
}

type()

/* ═══════════════════════════════════════════════
   INTERSECTION OBSERVER — fade-in nos cards
═══════════════════════════════════════════════ */
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -40px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const el = entry.target
      const delay = el.dataset.delay ? parseInt(el.dataset.delay) : 0

      setTimeout(() => {
        el.classList.add("visible")
      }, delay)

      observer.unobserve(el)
    }
  })
}, observerOptions)

document.querySelectorAll(".skill-card, .projeto-card").forEach((el) => {
  observer.observe(el)
})

/* delay sequencial para projeto-cards */
document.querySelectorAll(".projeto-card").forEach((card, i) => {
  card.dataset.delay = i * 120
})

/* ═══════════════════════════════════════════════
   SMOOTH SCROLL com offset da navbar
═══════════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"))
    if (!target) return
    e.preventDefault()
    const navH = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue("--nav-h"),
    )
    const top = target.getBoundingClientRect().top + window.scrollY - navH
    window.scrollTo({ top, behavior: "smooth" })
  })
})

/* ═══════════════════════════════════════════════
   i18n — troca de idioma PT ↔ EN
═══════════════════════════════════════════════ */
const translations = {
  pt: {
    "nav.sobre": "Sobre",
    "nav.skills": "Skills",
    "nav.projetos": "Projetos",
    "nav.contato": "Contato",
    "hero.greeting": "Olá, eu sou",
    "hero.desc":
      "Analista QA na <strong>Loy Legal</strong> · Chapecó, SC &mdash; apaixonado por construir aplicações web robustas do front ao back.",
    "hero.btn1": "Ver Projetos",
    "hero.btn2": "Entrar em Contato",
    "sobre.title": "Sobre <span>Mim</span>",
    "sobre.badge": "Full Stack Dev",
    "sobre.p1":
      "Sou <strong>Miguel Marocco De Ré</strong>, atualmente atuando como <strong>Analista QA</strong> na empresa <strong>Loy Legal</strong>, em Chapecó/SC. Minha missão é garantir a qualidade de software enquanto construo minha jornada rumo ao desenvolvimento full stack.",
    "sobre.p2":
      "Tenho paixão por criar soluções completas — desde interfaces intuitivas com <strong>React</strong> e <strong>TypeScript</strong> até APIs robustas com <strong>Node.js</strong> e bancos de dados como <strong>PostgreSQL</strong> e <strong>MongoDB</strong>. Minha experiência em QA me dá uma perspectiva única sobre qualidade e boas práticas de desenvolvimento.",
    "sobre.stat1": "Projetos no GitHub",
    "sobre.stat2": "Tecnologias",
    "sobre.stat3": "Background Profissional",
    "skills.title": "Minhas <span>Skills</span>",
    "skills.sub":
      "Tecnologias que utilizo para construir projetos do início ao fim",
    "projetos.title": "Meus <span>Projetos</span>",
    "projetos.sub": "Alguns dos projetos que desenvolvi por conta própria",
    "proj1.title": "Lista de Compras",
    "proj1.desc":
      "Aplicação web para gerenciamento de lista de supermercado. Permite adicionar, remover e organizar itens de forma simples e intuitiva.",
    "proj2.title": "Conversor de Moedas",
    "proj2.desc":
      "Conversor de moedas funcional desenvolvido em JavaScript puro, sem dependência de API externa — utiliza lógica própria para conversão em tempo real.",
    "proj3.title": "Palácio Imperial do Japão",
    "proj3.desc":
      "Projeto web dedicado ao Palácio Imperial do Japão, explorando HTML e CSS para criar uma página informativa com design temático.",
    "projetos.more": "Ver mais no GitHub",
    "contato.title": "Entre em <span>Contato</span>",
    "contato.sub":
      "Aberto a oportunidades, freelas e colaborações. Me manda uma mensagem!",
    "footer.copy":
      "Desenvolvido por <strong>Miguel Marocco De Ré</strong> &mdash; 2026",
    "footer.sub": 'Feito com <i class="fas fa-heart"></i> e muito café',
  },
  en: {
    "nav.sobre": "About",
    "nav.skills": "Skills",
    "nav.projetos": "Projects",
    "nav.contato": "Contact",
    "hero.greeting": "Hi, I'm",
    "hero.desc":
      "QA Analyst at <strong>Loy Legal</strong> · Chapecó, SC &mdash; passionate about building robust web apps from front to back.",
    "hero.btn1": "View Projects",
    "hero.btn2": "Get in Touch",
    "sobre.title": "About <span>Me</span>",
    "sobre.badge": "Full Stack Dev",
    "sobre.p1":
      "I am <strong>Miguel Marocco De Ré</strong>, currently working as a <strong>QA Analyst</strong> at <strong>Loy Legal</strong>, in Chapecó/SC, Brazil. My mission is to ensure software quality while building my path toward full stack development.",
    "sobre.p2":
      "I am passionate about building complete solutions — from intuitive interfaces with <strong>React</strong> and <strong>TypeScript</strong> to robust APIs with <strong>Node.js</strong> and databases like <strong>PostgreSQL</strong> and <strong>MongoDB</strong>. My QA background gives me a unique perspective on quality and development best practices.",
    "sobre.stat1": "GitHub Projects",
    "sobre.stat2": "Technologies",
    "sobre.stat3": "Professional Background",
    "skills.title": "My <span>Skills</span>",
    "skills.sub": "Technologies I use to build projects from start to finish",
    "projetos.title": "My <span>Projects</span>",
    "projetos.sub": "Some of the projects I built on my own",
    "proj1.title": "Shopping List",
    "proj1.desc":
      "Web app for grocery list management. Allows adding, removing, and organizing items in a simple and intuitive way.",
    "proj2.title": "Currency Converter",
    "proj2.desc":
      "Functional currency converter built in pure JavaScript, without any external API — uses custom logic for real-time conversion.",
    "proj3.title": "Imperial Palace of Japan",
    "proj3.desc":
      "Web project dedicated to the Imperial Palace of Japan, exploring HTML and CSS to create an informative page with a thematic design.",
    "projetos.more": "View more on GitHub",
    "contato.title": "Get in <span>Touch</span>",
    "contato.sub":
      "Open to opportunities, freelance, and collaborations. Send me a message!",
    "footer.copy":
      "Developed by <strong>Miguel Marocco De Ré</strong> &mdash; 2026",
    "footer.sub": 'Made with <i class="fas fa-heart"></i> and lots of coffee',
  },
}

const phrasesMap = {
  pt: [
    "Full Stack Developer",
    "Analista QA",
    "React & Node.js",
    "Apaixonado por código",
  ],
  en: [
    "Full Stack Developer",
    "QA Analyst",
    "React & Node.js",
    "Passionate about code",
  ],
}

let currentLang = "pt"

function applyTranslations(lang) {
  const t = translations[lang]

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n
    if (t[key] !== undefined) el.textContent = t[key]
  })

  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    const key = el.dataset.i18nHtml
    if (t[key] !== undefined) el.innerHTML = t[key]
  })

  // swap typed phrases mid-animation
  phrases.length = 0
  phrasesMap[lang].forEach((p) => phrases.push(p))

  // update lang button label
  document.getElementById("langLabel").textContent = lang === "pt" ? "EN" : "PT"

  // update html lang attribute
  document.documentElement.lang = lang === "pt" ? "pt-BR" : "en"
}

document.getElementById("langBtn").addEventListener("click", () => {
  currentLang = currentLang === "pt" ? "en" : "pt"
  applyTranslations(currentLang)
})
