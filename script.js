const menuItems = [
  { href: "/#anasayfa", label: "Anasayfa" },
  { href: "/#hizmetler", label: "Hizmetler" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/iletisim", label: "İletişim" }
];

document.querySelectorAll(".topbar").forEach((topbar) => {
  if (topbar.querySelector(".site-menu")) {
    return;
  }

  const brand = topbar.querySelector(".brand");
  if (!brand) {
    return;
  }

  const main = document.createElement("div");
  main.className = "topbar-main";

  const menu = document.createElement("nav");
  menu.className = "site-menu";
  menu.setAttribute("aria-label", "Site menüsü");

  menuItems.forEach(({ href, label }) => {
    const link = document.createElement("a");
    link.className = "menu-link";
    link.href = href;
    link.textContent = label;
    menu.appendChild(link);
  });

  brand.parentNode.insertBefore(main, brand);
  main.appendChild(brand);
  main.appendChild(menu);
  topbar.classList.add("has-site-menu");
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const targetId = anchor.getAttribute("href");
    if (!targetId || targetId === "#") {
      return;
    }

    const target = document.querySelector(targetId);
    if (!target) {
      return;
    }

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

const trackedActions = [
  { selector: "#call-hero", action: "call_click", location: "hero" },
  { selector: "#call-contact", action: "call_click", location: "contact" },
  { selector: "#call-footer", action: "call_click", location: "footer" },
  { selector: "#whatsapp-hero", action: "whatsapp_click", location: "hero" },
  { selector: "#whatsapp-contact", action: "whatsapp_click", location: "contact" },
  { selector: "#whatsapp-footer", action: "whatsapp_click", location: "footer" }
];

trackedActions.forEach(({ selector, action, location }) => {
  const element = document.querySelector(selector);
  if (!element) {
    return;
  }

  element.addEventListener("click", () => {
    if (typeof window.gtag === "function") {
      window.gtag("event", action, {
        event_category: "lead",
        event_label: location
      });
    }

    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: action,
        event_category: "lead",
        event_label: location
      });
    }
  });
});
