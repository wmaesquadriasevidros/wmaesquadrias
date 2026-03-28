// menu profissional
const header = document.querySelector(".header");
const toggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu-mobile");
const overlay = document.querySelector(".menu-overlay");

let lastScroll = 0;

// ABRIR / FECHAR MENU
toggle.addEventListener("click", () => {
  menu.classList.add("active");
  overlay.classList.add("active");
});

overlay.addEventListener("click", closeMenu);

function closeMenu() {
  menu.classList.remove("active");
  overlay.classList.remove("active");
}

// HEADER INTELIGENTE (SCROLL)
window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > lastScroll && currentScroll > 120) {
    header.classList.add("hide"); // descendo
  } else {
    header.classList.remove("hide"); // subindo
  }

  lastScroll = currentScroll;
});
document
  .getElementById("form-whatsapp-hero")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = this.nome.value.trim();
    const endereco = this.endereco.value.trim();
    const mensagem = this.mensagem.value.trim();

    const texto = `
Olá! Gostaria de solicitar um orçamento.

Nome: ${nome}
Endereço da obra: ${endereco}
Descrição: ${mensagem}

Vim pelo site da WMA Esquadrias e Vidros.
      `.trim();

    const url = `https://wa.me/5531982112125?text=${encodeURIComponent(texto)}`;

    /* Evento GA4 */
    if (typeof gtag === "function") {
      gtag("event", "lead_whatsapp", {
        event_category: "Conversao",
        event_label: "Formulario Hero",
      });
    }

    window.open(url, "_blank");
  });

// lightbox
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".lightbox-close");

document.querySelectorAll(".gallery-item img").forEach((img) => {
  img.addEventListener("click", () => {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  });
});

function closeLightbox() {
  lightbox.classList.remove("active");
  document.body.style.overflow = "";
}

closeBtn.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeLightbox();
  }
});

// faq
document.querySelectorAll(".faq-question").forEach((button) => {
  button.addEventListener("click", () => {
    const faqItem = button.parentElement;
    const answer = faqItem.querySelector(".faq-answer");
    const icon = button.querySelector(".faq-icon");

    const isOpen = faqItem.classList.contains("active");

    document.querySelectorAll(".faq-item").forEach((item) => {
      item.classList.remove("active");
      item.querySelector(".faq-answer").style.maxHeight = null;
      item.querySelector(".faq-icon").textContent = "+";
    });

    if (!isOpen) {
      faqItem.classList.add("active");
      answer.style.maxHeight = answer.scrollHeight + "px";
      icon.textContent = "–";
    }
  });
});

// formulario cta
document.querySelectorAll(".form-whatsapp").forEach((form) => {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const origem = this.dataset.origem || "Formulario";
    const nome = this.querySelector("[name='nome']").value.trim();
    const endereco = this.querySelector("[name='endereco']").value.trim();
    const servico = this.querySelector("[name='servico']")
      ? this.querySelector("[name='servico']").value
      : "";
    const mensagem = this.querySelector("[name='mensagem']").value.trim();

    let texto = `
Olá! Gostaria de solicitar um orçamento.

Nome: ${nome}
Endereço da obra: ${endereco}
      `.trim();

    if (servico) {
      texto += `\nServiço: ${servico}`;
    }

    if (mensagem) {
      texto += `\nDescrição: ${mensagem}`;
    }

    texto += `\n\nVim pelo site da WMA Esquadrias e Vidros.`;

    const url = `https://wa.me/5531982112125?text=${encodeURIComponent(texto)}`;

    /* Evento GA4 */
    if (typeof gtag === "function") {
      gtag("event", "lead_whatsapp", {
        event_category: "Conversao",
        event_label: origem,
      });
    }

    window.open(url, "_blank");
  });
});

// ano atual automatico
document.getElementById("ano").textContent = new Date().getFullYear();
