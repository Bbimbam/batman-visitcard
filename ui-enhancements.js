class UIEnhancements {
  constructor() {
    this.init();
  }

  init() {
    this.enhanceButtons();
    this.enhanceForms();
    this.enhanceNavigation();
    this.setupKeyboardShortcuts();
  }

  enhanceButtons() {
    // Добавляем эффект нажатия для всех кнопок
    document
      .querySelectorAll(
        ".btn, .generate-btn, .filter-btn, .page-btn, .table-action-btn, .card-btn"
      )
      .forEach((btn) => {
        btn.addEventListener("mousedown", (e) => {
          e.currentTarget.style.transform = "scale(0.95)";
        });

        btn.addEventListener("mouseup", (e) => {
          e.currentTarget.style.transform = "";
        });

        btn.addEventListener("mouseleave", (e) => {
          e.currentTarget.style.transform = "";
        });

        // Добавляем атрибуты доступности
        if (!btn.hasAttribute("aria-label")) {
          const text =
            btn.textContent.trim() || btn.getAttribute("title") || "";
          if (text) {
            btn.setAttribute("aria-label", text);
          }
        }
      });

    // Кнопки с загрузкой
    document.querySelectorAll("[data-loading]").forEach((btn) => {
      btn.addEventListener("click", function () {
        if (this.classList.contains("btn-loading")) return;

        const originalText = this.innerHTML;
        this.classList.add("btn-loading");
        this.innerHTML = "";

        // Симуляция загрузки (в реальном приложении убирается после завершения операции)
        setTimeout(() => {
          this.classList.remove("btn-loading");
          this.innerHTML = originalText;
        }, 2000);
      });
    });
  }

  enhanceForms() {
    // Улучшаем поля ввода
    document.querySelectorAll("input, textarea, select").forEach((input) => {
      // Добавляем класс при фокусе
      input.addEventListener("focus", function () {
        this.parentElement.classList.add("focused");
      });

      input.addEventListener("blur", function () {
        this.parentElement.classList.remove("focused");
      });

      // Валидация в реальном времени
      if (input.hasAttribute("pattern") || input.type === "email") {
        input.addEventListener("input", function () {
          this.classList.remove("valid", "invalid");

          if (this.value.trim() === "") return;

          if (this.checkValidity()) {
            this.classList.add("valid");
          } else {
            this.classList.add("invalid");
          }
        });
      }
    });
  }

  enhanceNavigation() {
    // Плавная прокрутка для якорных ссылок
    document
      .querySelectorAll('a[href^="#"]:not([href="#"])')
      .forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
          e.preventDefault();

          const targetId = this.getAttribute("href");
          if (!targetId) return;

          const targetElement = document.querySelector(targetId);
          if (!targetElement) return;

          const headerHeight =
            document.querySelector(".wiki-nav")?.offsetHeight || 80;
          const targetPosition =
            targetElement.getBoundingClientRect().top +
            window.pageYOffset -
            headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });

          // Обновляем URL без перезагрузки
          history.pushState(null, null, targetId);
        });
      });

    // Подсветка активного раздела при скролле
    const sections = document.querySelectorAll("section[id], article[id]");
    const navLinks = document.querySelectorAll(
      '.sidebar-nav-item, .nav-menu a[href^="#"]'
    );

    const highlightOnScroll = () => {
      let current = "";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const headerHeight =
          document.querySelector(".wiki-nav")?.offsetHeight || 80;

        if (scrollY >= sectionTop - headerHeight - 100) {
          current = section.getAttribute("id");
        }
      });

      navLinks.forEach((link) => {
        link.classList.remove("active");
        const href = link.getAttribute("href");
        if (href && href.includes(current)) {
          link.classList.add("active");
        }
      });
    };

    window.addEventListener("scroll", highlightOnScroll);
  }

  setupKeyboardShortcuts() {
    document.addEventListener("keydown", (e) => {
      // Ctrl/Cmd + K для поиска
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        const searchInput =
          document.querySelector(".nav-search input") ||
          document.querySelector("#mobileSearch input");
        if (searchInput) {
          searchInput.focus();
        }
      }

      // Escape для закрытия модальных окон
      if (e.key === "Escape") {
        const modals = document.querySelectorAll(
          ".modal, .character-modal, .info-panel.active"
        );
        modals.forEach((modal) => {
          modal.style.display = "none";
        });

        // Закрываем выпадающие меню
        document.querySelectorAll(".dropdown.active").forEach((dropdown) => {
          dropdown.classList.remove("active");
        });
      }
    });
  }
}

// Инициализация при загрузке
document.addEventListener("DOMContentLoaded", () => {
  new UIEnhancements();
});
