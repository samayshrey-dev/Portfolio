(() => {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {
    // Core Elements
    const body = document.body;
    const panels = Array.from(document.querySelectorAll(".panel"));
    const navButtons = Array.from(document.querySelectorAll(".site-nav [data-target]"));
    const homeMark = document.querySelector(".home-mark");
    const menuToggle = document.querySelector(".menu-toggle");
    const menuBackdrop = document.querySelector(".menu-backdrop");
    const nextButtons = Array.from(document.querySelectorAll("[data-next]"));
    const previousButton = document.querySelector("[data-previous]");
    const progressBar = document.querySelector(".section-progress span");
    const currentSlideLabel = document.getElementById("current-slide");
    const heroWords = Array.from(document.querySelectorAll(".hero-word"));
    
    // Background Stages
    const stageA = document.getElementById("background-stage-a");
    const stageB = document.getElementById("background-stage-b");
    let activeStageIndex = 0;

    // Preloader Elements
    const preloader = document.querySelector(".preloader");
    const loadPercentage = document.getElementById("load-percentage");
    const vuTrack = document.getElementById("vu-track");
    const vuNeedle = document.getElementById("vu-needle");
    
    // Custom Cursor
    const scrollCursor = document.querySelector(".scroll-cursor");

    // State Management
    const state = {
      activeIndex: 0,
      totalPanels: panels.length,
      isTransitioning: false,
      heroWordIndex: 0,
      menuOpen: false,
      contactOpen: false,
      preloaderDone: false
    };

    // Poster Map per section index
    const posterMap = [
      "assets/images/samayshrey.jpg",
      "assets/posters/projects.jpg",
      "assets/posters/projects.jpg",
      "assets/posters/competitions.jpg",
      "assets/images/samayshrey.jpg"
    ];


    // Section names
    const sectionNames = ["Intro", "Full-Stack Development", "Projects & Internships", "Hackathons & Certifications", "Education & Personal"];

    /* ----------------------------------------------------
     * 1. VU-Meter Preloader Animation
     * ---------------------------------------------------- */
    const segmentCount = 20;
    const segments = [];

    if (vuTrack) {
      vuTrack.innerHTML = "";
      for (let i = 0; i < segmentCount; i++) {
        const seg = document.createElement("div");
        seg.className = "vu-segment";
        if (((i + 1) / segmentCount) * 100 >= 85) {
          seg.classList.add("is-danger");
        }
        vuTrack.appendChild(seg);
        segments.push(seg);
      }
    }

    function initPreloader() {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 12) + 8;
        if (progress > 100) progress = 100;

        // Update Percentage Label
        if (loadPercentage) loadPercentage.textContent = `${progress}%`;

        // Update VU Segments
        const activeSegs = Math.floor((progress / 100) * segmentCount);
        segments.forEach((seg, idx) => {
          if (idx < activeSegs) {
            seg.classList.add("is-active");
          } else {
            seg.classList.remove("is-active");
          }
        });

        // Update Needle Angle (-45deg to +45deg)
        if (vuNeedle) {
          const angle = -45 + (progress / 100) * 90;
          vuNeedle.style.transform = `rotate(${angle}deg)`;
        }

        if (progress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            state.preloaderDone = true;
            body.classList.remove("is-loading");
          }, 300);
        }
      }, 50);
    }

    initPreloader();

    /* ----------------------------------------------------
     * 2. Hero Title Word Switcher
     * ---------------------------------------------------- */
    if (heroWords.length > 1) {
      setInterval(() => {
        const currentWord = heroWords[state.heroWordIndex];
        currentWord.classList.remove("is-current");

        state.heroWordIndex = (state.heroWordIndex + 1) % heroWords.length;
        const nextWord = heroWords[state.heroWordIndex];
        nextWord.classList.add("is-current");
      }, 2500);
    }

    /* ----------------------------------------------------
     * 3. Section Navigation Engine
     * ---------------------------------------------------- */
    function goToSection(targetIndex) {
      if (targetIndex < 0 || targetIndex >= state.totalPanels) return;
      if (state.activeIndex === targetIndex && state.preloaderDone) return;

      state.isTransitioning = true;
      state.activeIndex = targetIndex;

      // 1. Update Active Panel Visibility
      panels.forEach((panel, idx) => {
        if (idx === targetIndex) {
          panel.classList.add("is-active");
          panel.setAttribute("aria-hidden", "false");
          // Reset scroll of newly activated panel to top
          const copy = panel.querySelector(".panel-copy");
          if (copy) copy.scrollTop = 0;
        } else {
          panel.classList.remove("is-active");
          panel.setAttribute("aria-hidden", "true");
        }
      });

      // 2. Update Body Section Attribute
      const activePanelId = panels[targetIndex].id;
      body.setAttribute("data-section", activePanelId);

      // 3. Update Nav Links Active State
      navButtons.forEach((btn) => {
        const btnTarget = btn.getAttribute("data-target");
        if (btnTarget === activePanelId) {
          btn.classList.add("is-active");
        } else {
          btn.classList.remove("is-active");
        }
      });

      // 4. Update Progress Bar & Counter
      if (progressBar) {
        const pct = targetIndex === 0 ? 0 : ((targetIndex) / (state.totalPanels - 1)) * 100;
        progressBar.style.width = `${Math.max(15, pct)}%`;
      }

      if (currentSlideLabel) {
        currentSlideLabel.textContent = String(targetIndex).padStart(2, "0");
      }

      // 5. Dual Background Stage Crossfade
      const newPoster = posterMap[targetIndex] || posterMap[0];
      const activeStage = activeStageIndex === 0 ? stageA : stageB;
      const nextStage = activeStageIndex === 0 ? stageB : stageA;

      nextStage.style.backgroundImage = `url('${newPoster}')`;
      nextStage.classList.add("is-active");
      activeStage.classList.remove("is-active");
      activeStageIndex = activeStageIndex === 0 ? 1 : 0;

      // Close mobile menu if open
      if (state.menuOpen) {
        toggleMenu(false);
      }

      setTimeout(() => {
        state.isTransitioning = false;
      }, 500);
    }

    // Nav Button Clicks
    document.addEventListener("click", (e) => {
      const targetBtn = e.target.closest("[data-target]");
      if (targetBtn) {
        e.preventDefault();
        const targetId = targetBtn.getAttribute("data-target");
        const foundIdx = panels.findIndex((p) => p.id === targetId);
        if (foundIdx !== -1) {
          goToSection(foundIdx);
        }
      }
    });

    // Home Mark Logo Click
    if (homeMark) {
      homeMark.addEventListener("click", (e) => {
        e.preventDefault();
        goToSection(0);
      });
    }

    // Prev / Next Button Controls
    nextButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (state.activeIndex < state.totalPanels - 1) {
          goToSection(state.activeIndex + 1);
        } else {
          goToSection(0);
        }
      });
    });

    if (previousButton) {
      previousButton.addEventListener("click", () => {
        if (state.activeIndex > 0) {
          goToSection(state.activeIndex - 1);
        }
      });
    }

    /* ----------------------------------------------------
     * 4. Wheel & Touch Scroll Handler
     * ---------------------------------------------------- */
    let wheelLock = false;

    window.addEventListener("wheel", (e) => {
      if (body.classList.contains("is-loading") || state.menuOpen || state.contactOpen) return;

      const activePanelCopy = panels[state.activeIndex]?.querySelector(".panel-copy");
      if (activePanelCopy) {
        const scrollHeight = activePanelCopy.scrollHeight;
        const clientHeight = activePanelCopy.clientHeight;
        const isScrollable = scrollHeight > clientHeight + 4;

        if (isScrollable) {
          const atTop = activePanelCopy.scrollTop <= 2;
          const atBottom = Math.ceil(activePanelCopy.scrollTop + clientHeight) >= scrollHeight - 2;

          // If user scrolls inside panel and hasn't hit edge, let native scroll happen
          if (e.deltaY < 0 && !atTop) return;
          if (e.deltaY > 0 && !atBottom) return;
        }
      }

      if (wheelLock || Math.abs(e.deltaY) < 15) return;

      wheelLock = true;
      if (e.deltaY > 0 && state.activeIndex < state.totalPanels - 1) {
        goToSection(state.activeIndex + 1);
      } else if (e.deltaY < 0 && state.activeIndex > 0) {
        goToSection(state.activeIndex - 1);
      }

      setTimeout(() => {
        wheelLock = false;
      }, 550);
    }, { passive: true });

    // Touch Swipe Gesture Detection
    let touchStartY = 0;
    let touchStartedAtTop = false;
    let touchStartedAtBottom = false;
    let touchScrollArea = null;

    window.addEventListener("touchstart", (e) => {
      touchStartY = e.touches[0].clientY;
      const targetPanelCopy = e.target.closest(".panel-copy");
      if (targetPanelCopy && targetPanelCopy.scrollHeight > targetPanelCopy.clientHeight + 4) {
        touchScrollArea = targetPanelCopy;
        touchStartedAtTop = targetPanelCopy.scrollTop <= 2;
        touchStartedAtBottom = Math.ceil(targetPanelCopy.scrollTop + targetPanelCopy.clientHeight) >= targetPanelCopy.scrollHeight - 2;
      } else {
        touchScrollArea = null;
        touchStartedAtTop = false;
        touchStartedAtBottom = false;
      }
    }, { passive: true });

    window.addEventListener("touchend", (e) => {
      if (body.classList.contains("is-loading") || state.menuOpen || state.contactOpen) return;
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY - touchEndY;

      if (Math.abs(deltaY) < 40) return;

      if (touchScrollArea) {
        if (deltaY > 0 && !touchStartedAtBottom) return;
        if (deltaY < 0 && !touchStartedAtTop) return;
      }

      if (wheelLock) return;
      wheelLock = true;

      if (deltaY > 0 && state.activeIndex < state.totalPanels - 1) {
        goToSection(state.activeIndex + 1);
      } else if (deltaY < 0 && state.activeIndex > 0) {
        goToSection(state.activeIndex - 1);
      }

      setTimeout(() => {
        wheelLock = false;
      }, 550);
    }, { passive: true });

    // Keyboard Navigation
    window.addEventListener("keydown", (e) => {
      if (body.classList.contains("is-loading") || state.contactOpen) return;
      if (["ArrowDown", "PageDown", "j"].includes(e.key)) {
        if (state.activeIndex < state.totalPanels - 1) {
          goToSection(state.activeIndex + 1);
        }
      } else if (["ArrowUp", "PageUp", "k"].includes(e.key)) {
        if (state.activeIndex > 0) {
          goToSection(state.activeIndex - 1);
        }
      }
    });

    /* ----------------------------------------------------
     * 5. Mobile Navigation Drawer Toggle
     * ---------------------------------------------------- */
    function toggleMenu(open) {
      state.menuOpen = open;
      body.classList.toggle("menu-open", open);
      if (menuToggle) menuToggle.setAttribute("aria-expanded", String(open));
    }

    if (menuToggle) {
      menuToggle.addEventListener("click", () => {
        toggleMenu(!state.menuOpen);
      });
    }

    if (menuBackdrop) {
      menuBackdrop.addEventListener("click", () => {
        toggleMenu(false);
      });
    }

    /* ----------------------------------------------------
     * 6. Contact Modal Controller
     * ---------------------------------------------------- */
    const contactModal = document.getElementById("contact-modal");
    const openContactBtns = Array.from(document.querySelectorAll("[data-open-contact]"));
    const closeContactBtns = Array.from(document.querySelectorAll("[data-close-contact]"));

    function toggleContactModal(open) {
      if (!contactModal) return;
      state.contactOpen = open;
      if (open) {
        contactModal.classList.add("is-open");
        contactModal.setAttribute("aria-hidden", "false");
        if (state.menuOpen) toggleMenu(false);
      } else {
        contactModal.classList.remove("is-open");
        contactModal.setAttribute("aria-hidden", "true");
      }
    }

    openContactBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        toggleContactModal(true);
      });
    });

    closeContactBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        toggleContactModal(false);
      });
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && contactModal?.classList.contains("is-open")) {
        toggleContactModal(false);
      }
    });

    /* ----------------------------------------------------
     * 7. Custom Cursor Interactivity
     * ---------------------------------------------------- */
    if (scrollCursor && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      let targetX = -100;
      let targetY = -100;
      let currentX = -100;
      let currentY = -100;

      window.addEventListener("pointermove", (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
        body.classList.add("cursor-ready");
      }, { passive: true });

      function animateCursor() {
        currentX += (targetX - currentX) * 0.25;
        currentY += (targetY - currentY) * 0.25;
        scrollCursor.style.setProperty("--cursor-x", `${currentX}px`);
        scrollCursor.style.setProperty("--cursor-y", `${currentY}px`);
        requestAnimationFrame(animateCursor);
      }

      requestAnimationFrame(animateCursor);

      const interactiveSelector = "a, button, input, select, textarea, .project-card, .skill-category";
      document.addEventListener("pointerover", (e) => {
        if (e.target.closest(interactiveSelector)) {
          body.classList.add("cursor-link");
        }
      }, { passive: true });

      document.addEventListener("pointerout", (e) => {
        if (e.target.closest(interactiveSelector)) {
          body.classList.remove("cursor-link");
        }
      }, { passive: true });
    }

    /* ----------------------------------------------------
     * 8. 3D Tilt Parallax on Portrait Card
     * ---------------------------------------------------- */
    const portraitCard = document.querySelector(".portrait-card");
    if (portraitCard && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      portraitCard.addEventListener("mousemove", (e) => {
        const rect = portraitCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -12;
        const rotateY = ((x - centerX) / centerX) * 12;

        portraitCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;
      });

      portraitCard.addEventListener("mouseleave", () => {
        portraitCard.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
      });
    }
  });
})();

