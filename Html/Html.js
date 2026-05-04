document.addEventListener("DOMContentLoaded", function () {
  const tutorialBtn = document.getElementById("tutorialBtn");
  const referenceBtn = document.getElementById("referenceBtn");
  const exerciseBtn = document.getElementById("exerciseBtn");

  const tutorialsMenu = document.getElementById("tutorials-menu");
  const referencesMenu = document.getElementById("references-menu");
  const exercisesMenu = document.getElementById("exercises-menu");

  const closeBtn = document.getElementById("closeBtn");
  const closeReferenceBtn = document.getElementById("closeReferenceBtn");
  const closeExerciseBtn = document.getElementById("closeExerciseBtn");

  // ✅ FIX: thêm optional chaining
  const tutorialFilter = tutorialsMenu?.querySelector(".filter-container input");
  const referenceFilter = referencesMenu?.querySelector(".filter-container input");
  const exerciseFilter = exercisesMenu?.querySelector(".filter-container input");

  function closeAllMenus() {
    tutorialsMenu?.classList.remove("active");
    referencesMenu?.classList.remove("active");
    exercisesMenu?.classList.remove("active");

    tutorialBtn?.classList.remove("active");
    referenceBtn?.classList.remove("active");
    exerciseBtn?.classList.remove("active");
  }

  // ===== MENU BUTTONS =====
  if (tutorialBtn && tutorialsMenu) {
    tutorialBtn.addEventListener("click", function () {
      const isOpen = tutorialsMenu.classList.contains("active");
      closeAllMenus();
      if (!isOpen) {
        tutorialsMenu.classList.add("active");
        tutorialBtn.classList.add("active");
      }
    });
  }

  if (referenceBtn && referencesMenu) {
    referenceBtn.addEventListener("click", function () {
      const isOpen = referencesMenu.classList.contains("active");
      closeAllMenus();
      if (!isOpen) {
        referencesMenu.classList.add("active");
        referenceBtn.classList.add("active");
      }
    });
  }

  if (exerciseBtn && exercisesMenu) {
    exerciseBtn.addEventListener("click", function () {
      const isOpen = exercisesMenu.classList.contains("active");
      closeAllMenus();
      if (!isOpen) {
        exercisesMenu.classList.add("active");
        exerciseBtn.classList.add("active");
      }
    });
  }

  // ===== CLOSE BUTTON =====
  closeBtn?.addEventListener("click", closeAllMenus);
  closeReferenceBtn?.addEventListener("click", closeAllMenus);
  closeExerciseBtn?.addEventListener("click", closeAllMenus);

  // ===== CLICK OUTSIDE =====
  document.addEventListener("click", function (e) {
    if (
      !tutorialBtn?.contains(e.target) &&
      !referenceBtn?.contains(e.target) &&
      !exerciseBtn?.contains(e.target) &&
      !tutorialsMenu?.contains(e.target) &&
      !referencesMenu?.contains(e.target) &&
      !exercisesMenu?.contains(e.target)
    ) {
      closeAllMenus();
    }
  });

  // ===== FILTER =====
  function setupFilter(input, menu) {
    if (!input || !menu) return; // ✅ FIX

    const links = menu.querySelectorAll(".column a");

    input.addEventListener("keyup", function () {
      const value = input.value.toLowerCase();

      links.forEach(link => {
        const text = link.textContent.toLowerCase();
        link.style.display = text.includes(value) ? "flex" : "none";
      });
    });
  }

  setupFilter(tutorialFilter, tutorialsMenu);
  setupFilter(referenceFilter, referencesMenu);
  setupFilter(exerciseFilter, exercisesMenu);

  // ===== SEARCH =====
  const allMenuLinks = document.querySelectorAll(
    "#tutorials-menu .column a, #references-menu .column a, #exercises-menu .column a"
  );

  function setupSearchSuggestion(inputElement) {
    if (!inputElement) return; // ✅ FIX

    const parent = inputElement.parentElement;

    const suggestionBox = document.createElement("div");
    suggestionBox.className = "search-suggestions";
    parent.appendChild(suggestionBox);

    inputElement.addEventListener("keyup", function () {
      const value = this.value.toLowerCase().trim();
      suggestionBox.innerHTML = "";

      if (value === "") {
        suggestionBox.style.display = "none";
        return;
      }

      let results = [];

      allMenuLinks.forEach(link => {
        const mainText = link.querySelector("b")
          ? link.querySelector("b").textContent.trim()
          : link.textContent.trim();

        const spans = link.querySelectorAll("span");

        if (mainText.toLowerCase().includes(value)) {
          results.push(mainText);
        }

        spans.forEach(span => {
          const combined = `${mainText} ${span.textContent.trim()}`;
          if (combined.toLowerCase().includes(value)) {
            results.push(combined);
          }
        });
      });

      results = [...new Set(results)];

      if (results.length > 0) {
        results.slice(0, 8).forEach(item => {
          const div = document.createElement("div");
          div.textContent = item;
          div.className = "suggestion-item";

          div.addEventListener("click", function () {
            inputElement.value = item;
            suggestionBox.style.display = "none";
          });

          suggestionBox.appendChild(div);
        });

        suggestionBox.style.display = "block";
      } else {
        suggestionBox.style.display = "none";
      }
    });

    document.addEventListener("click", function (e) {
      if (!parent.contains(e.target)) {
        suggestionBox.style.display = "none";
      }
    });
  }

  // ===== LEFT SEARCH =====
  const topSearchInput = document.querySelector(".left-search .search-container input");
  if (topSearchInput) {
    setupSearchSuggestion(topSearchInput);
  }
});
document.querySelectorAll(".menu-title").forEach(item => {
  item.addEventListener("click", function (e) {
    e.preventDefault();
    this.parentElement.classList.toggle("active");
  });
});