/* ========================================
   TONGYUAN TECH - 主脚本
   语言切换、移动端菜单、滚动效果
   ======================================== */

(function() {
  "use strict";

  /* --- 语言切换 --- */
  const LANG_KEY = "cablepro_lang";
  let currentLang = localStorage.getItem(LANG_KEY) || "en";

  function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem(LANG_KEY, lang);
    // 更新所有带 data-en / data-zh 属性的元素
    document.querySelectorAll("[data-en]").forEach(function(el) {
      var text = el.getAttribute("data-" + lang);
      if (text !== null) {
        if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
          el.placeholder = text;
        } else {
          el.textContent = text;
        }
      }
    });
    // 更新语言切换按钮状态
    document.querySelectorAll(".lang-btn").forEach(function(btn) {
      btn.classList.toggle("active", btn.dataset.lang === lang);
    });
    // 更新 html lang 属性
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  }

  /* --- Header 滚动效果 --- */
  function initHeaderScroll() {
    var header = document.querySelector(".header");
    if (!header) return;
    window.addEventListener("scroll", function() {
      header.classList.toggle("scrolled", window.scrollY > 50);
    });
    // 初始检查
    header.classList.toggle("scrolled", window.scrollY > 50);
  }

  /* --- 移动端菜单 --- */
  function initMobileMenu() {
    var toggle = document.querySelector(".menu-toggle");
    var mobileNav = document.querySelector(".mobile-nav");
    if (!toggle || !mobileNav) return;

    toggle.addEventListener("click", function() {
      toggle.classList.toggle("active");
      mobileNav.classList.toggle("open");
    });

    // 点击移动端导航链接后关闭菜单
    mobileNav.querySelectorAll(".nav-link").forEach(function(link) {
      link.addEventListener("click", function() {
        toggle.classList.remove("active");
        mobileNav.classList.remove("open");
      });
    });
  }

  /* --- 滚动显示动画 --- */
  function initScrollReveal() {
    var reveals = document.querySelectorAll(".reveal");
    if (!reveals.length) return;

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

    reveals.forEach(function(el) {
      observer.observe(el);
    });
  }

  /* --- 产品筛选（仅产品页） --- */
  function initProductFilter() {
    var filterBtns = document.querySelectorAll(".filter-btn");
    var cards = document.querySelectorAll(".product-card[data-category]");
    if (!filterBtns.length || !cards.length) return;

    filterBtns.forEach(function(btn) {
      btn.addEventListener("click", function() {
        var category = btn.dataset.filter;
        // 更新按钮状态
        filterBtns.forEach(function(b) { b.classList.remove("active"); });
        btn.classList.add("active");
        // 筛选卡片
        cards.forEach(function(card) {
          if (category === "all" || card.dataset.category === category) {
            card.style.display = "";
            // 重新触发动画
            card.classList.remove("visible");
            setTimeout(function() { card.classList.add("visible"); }, 50);
          } else {
            card.style.display = "none";
          }
        });
      });
    });
  }

  /* --- 联系表单提交 --- */
  function initContactForm() {
    var form = document.getElementById("contactForm");
    if (!form) return;

    form.addEventListener("submit", function(e) {
      e.preventDefault();
      // 简单的提交反馈
      var btn = form.querySelector("button[type=submit]");
      var originalText = btn.textContent;
      btn.textContent = currentLang === "zh" ? "已发送!" : "Sent!";
      btn.disabled = true;
      setTimeout(function() {
        btn.textContent = originalText;
        btn.disabled = false;
        form.reset();
      }, 2000);
    });
  }

  /* --- 初始化 --- */
  function init() {
    // 语言切换按钮事件
    document.querySelectorAll(".lang-btn").forEach(function(btn) {
      btn.addEventListener("click", function() {
        setLanguage(btn.dataset.lang);
      });
    });

    // 应用保存的语言
    setLanguage(currentLang);

    // 初始化各功能模块
    initHeaderScroll();
    initMobileMenu();
    initScrollReveal();
    initProductFilter();
    initContactForm();
  }

  // DOM 加载完成后初始化
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
