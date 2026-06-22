const menuButton = document.querySelector("[data-menu-button]");
const menu = document.querySelector("[data-menu]");
const navLinks = document.querySelectorAll(".site-nav__link");
const sections = document.querySelectorAll("main section[id]");
const revealElements = document.querySelectorAll(".reveal");
const faqButtons = document.querySelectorAll(".faq-item__button");

if (menuButton && menu) {
  const mobileQuery = window.matchMedia("(max-width: 860px)");

  const setMenuState = () => {
    if (mobileQuery.matches) {
      menu.hidden = true;
      menuButton.setAttribute("aria-expanded", "false");
    } else {
      menu.hidden = false;
      menuButton.setAttribute("aria-expanded", "false");
    }
  };

  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";

    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menu.hidden = isOpen;
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (mobileQuery.matches) {
        menu.hidden = true;
        menuButton.setAttribute("aria-expanded", "false");
      }
    });
  });

  mobileQuery.addEventListener("change", setMenuState);
  setMenuState();
}

if (sections.length && navLinks.length) {
  const setActiveLink = () => {
    const scrollPosition = window.scrollY + 160;
    let activeId = sections[0].id;

    sections.forEach((section) => {
      if (section.offsetTop <= scrollPosition) {
        activeId = section.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${activeId}`);
    });
  };

  window.addEventListener("scroll", setActiveLink, { passive: true });
  setActiveLink();
}

if ("IntersectionObserver" in window && revealElements.length) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

faqButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const panel = button.nextElementSibling;
    const isOpen = button.getAttribute("aria-expanded") === "true";

    if (!panel) {
      return;
    }

    button.setAttribute("aria-expanded", String(!isOpen));
    panel.hidden = isOpen;
  });
});
