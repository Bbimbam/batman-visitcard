class MobileMenu {
  constructor() {
    this.menuBtn = document.getElementById("mobileMenuBtn");
    this.navMenu = document.getElementById("navMenu");
    this.searchBtn = document.getElementById("mobileSearchBtn");
    this.searchContainer = document.getElementById("mobileSearch");
    this.isMenuOpen = false;
    this.isSearchOpen = false;

    this.init();
  }

  init() {
    if (!this.menuBtn || !this.navMenu) return;

    // Меню
    this.menuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      this.toggleMenu();
    });

    // Поиск
    if (this.searchBtn && this.searchContainer) {
      this.searchBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.toggleSearch();
      });
    }

    // Закрытие при клике вне
    document.addEventListener("click", (e) => {
      if (
        this.isMenuOpen &&
        !this.navMenu.contains(e.target) &&
        !this.menuBtn.contains(e.target)
      ) {
        this.closeMenu();
      }

      if (
        this.isSearchOpen &&
        !this.searchContainer.contains(e.target) &&
        !this.searchBtn.contains(e.target)
      ) {
        this.closeSearch();
      }
    });

    // Закрытие при ресайзе
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        this.closeMenu();
        this.closeSearch();
      }
    });
  }

  toggleMenu() {
    if (this.isMenuOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  openMenu() {
    this.navMenu.style.display = "flex";
    setTimeout(() => {
      this.navMenu.classList.add("active");
      this.isMenuOpen = true;
    }, 10);

    // Закрываем поиск если открыт
    this.closeSearch();
  }

  closeMenu() {
    this.navMenu.classList.remove("active");
    setTimeout(() => {
      this.navMenu.style.display = "none";
      this.isMenuOpen = false;
    }, 300);
  }

  toggleSearch() {
    if (this.isSearchOpen) {
      this.closeSearch();
    } else {
      this.openSearch();
    }
  }

  openSearch() {
    this.searchContainer.style.display = "block";
    setTimeout(() => {
      this.searchContainer.classList.add("active");
      this.isSearchOpen = true;
    }, 10);

    // Закрываем меню если открыто
    this.closeMenu();
  }

  closeSearch() {
    if (!this.searchContainer) return;

    this.searchContainer.classList.remove("active");
    setTimeout(() => {
      this.searchContainer.style.display = "none";
      this.isSearchOpen = false;
    }, 300);
  }
}

// Автоматическая инициализация при загрузке
document.addEventListener("DOMContentLoaded", () => {
  new MobileMenu();
});
