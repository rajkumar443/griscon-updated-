/**
* Template Name: Dewi
* Template URL: https://bootstrapmade.com/dewi-free-multi-purpose-html-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function () {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function () {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function (filters) {
      filters.addEventListener('click', function () {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();














jQuery(function ($) {
  'use strict';

  /* ----------------------------------------------------------- */
  /*  Fixed header
  /* ----------------------------------------------------------- */
  $(window).on('scroll', function () {

    // fixedHeader on scroll
    function fixedHeader() {
      var headerTopBar = $('.top-bar').outerHeight();
      var headerOneTopSpace = $('.header-one .logo-area').outerHeight();

      var headerOneELement = $('.header-one .site-navigation');
      var headerTwoELement = $('.header-two .site-navigation');

      if ($(window).scrollTop() > headerTopBar + headerOneTopSpace) {
        $(headerOneELement).addClass('navbar-fixed');
        $('.header-one').css('margin-bottom', headerOneELement.outerHeight());
      } else {
        $(headerOneELement).removeClass('navbar-fixed');
        $('.header-one').css('margin-bottom', 0);
      }
      if ($(window).scrollTop() > headerTopBar) {
        $(headerTwoELement).addClass('navbar-fixed');
        $('.header-two').css('margin-bottom', headerTwoELement.outerHeight());
      } else {
        $(headerTwoELement).removeClass('navbar-fixed');
        $('.header-two').css('margin-bottom', 0);
      }
    }
    fixedHeader();


    // Count Up
    function counter() {
      var oTop;
      if ($('.counterUp').length !== 0) {
        oTop = $('.counterUp').offset().top - window.innerHeight;
      }
      if ($(window).scrollTop() > oTop) {
        $('.counterUp').each(function () {
          var $this = $(this),
            countTo = $this.attr('data-count');
          $({
            countNum: $this.text()
          }).animate({
            countNum: countTo
          }, {
            duration: 1000,
            easing: 'swing',
            step: function () {
              $this.text(Math.floor(this.countNum));
            },
            complete: function () {
              $this.text(this.countNum);
            }
          });
        });
      }
    }
    counter();


    // scroll to top btn show/hide
    function scrollTopBtn() {
      var scrollToTop = $('#back-to-top'),
        scroll = $(window).scrollTop();
      if (scroll >= 50) {
        scrollToTop.fadeIn();
      } else {
        scrollToTop.fadeOut();
      }
    }
    scrollTopBtn();
  });


  $(document).ready(function () {

    // navSearch show/hide
    function navSearch() {
      $('.nav-search').on('click', function () {
        $('.search-block').fadeIn(350);
      });
      $('.search-close').on('click', function () {
        $('.search-block').fadeOut(350);
      });
    }
    navSearch();

    // navbarDropdown
    function navbarDropdown() {
      if ($(window).width() < 992) {
        $('.site-navigation .dropdown-toggle').on('click', function () {
          $(this).siblings('.dropdown-menu').animate({
            height: 'toggle'
          }, 300);
        });

        var navbarHeight = $('.site-navigation').outerHeight();
        $('.site-navigation .navbar-collapse').css('max-height', 'calc(100vh - ' + navbarHeight + 'px)');
      }
    }
    navbarDropdown();


    // back to top
    function backToTop() {
      $('#back-to-top').on('click', function () {
        $('#back-to-top').tooltip('hide');
        $('body,html').animate({
          scrollTop: 0
        }, 800);
        return false;
      });
    }
    backToTop();


    // banner-carousel
    function bannerCarouselOne() {
      $('.banner-carousel.banner-carousel-1').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        dots: true,
        speed: 600,
        arrows: true,
        prevArrow: '<button type="button" class="carousel-control left" aria-label="carousel-control"><i class="fas fa-chevron-left"></i></button>',
        nextArrow: '<button type="button" class="carousel-control right" aria-label="carousel-control"><i class="fas fa-chevron-right"></i></button>'
      });
      $('.banner-carousel.banner-carousel-1').slickAnimation();
    }
    bannerCarouselOne();


    // banner Carousel Two
    function bannerCarouselTwo() {
      $('.banner-carousel.banner-carousel-2').slick({
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        dots: false,
        speed: 600,
        arrows: true,
        prevArrow: '<button type="button" class="carousel-control left" aria-label="carousel-control"><i class="fas fa-chevron-left"></i></button>',
        nextArrow: '<button type="button" class="carousel-control right" aria-label="carousel-control"><i class="fas fa-chevron-right"></i></button>'
      });
    }
    bannerCarouselTwo();


    // pageSlider
    function pageSlider() {
      $('.page-slider').slick({
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        dots: false,
        speed: 600,
        arrows: true,
        prevArrow: '<button type="button" class="carousel-control left" aria-label="carousel-control"><i class="fas fa-chevron-left"></i></button>',
        nextArrow: '<button type="button" class="carousel-control right" aria-label="carousel-control"><i class="fas fa-chevron-right"></i></button>'
      });
    }
    pageSlider();


    // Shuffle js filter and masonry
    function projectShuffle() {
      if ($('.shuffle-wrapper').length !== 0) {
        var Shuffle = window.Shuffle;
        var myShuffle = new Shuffle(document.querySelector('.shuffle-wrapper'), {
          itemSelector: '.shuffle-item',
          sizer: '.shuffle-sizer',
          buffer: 1
        });
        $('input[name="shuffle-filter"]').on('change', function (evt) {
          var input = evt.currentTarget;
          if (input.checked) {
            myShuffle.filter(input.value);
          }
        });
        $('.shuffle-btn-group label').on('click', function () {
          $('.shuffle-btn-group label').removeClass('active');
          $(this).addClass('active');
        });
      }
    }
    projectShuffle();


    // testimonial carousel
    function testimonialCarousel() {
      $('.testimonial-slide').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        speed: 600,
        arrows: false
      });
    }
    testimonialCarousel();


    // team carousel
    function teamCarousel() {
      $('.team-slide').slick({
        dots: false,
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 2,
        arrows: true,
        prevArrow: '<button type="button" class="carousel-control left" aria-label="carousel-control"><i class="fas fa-chevron-left"></i></button>',
        nextArrow: '<button type="button" class="carousel-control right" aria-label="carousel-control"><i class="fas fa-chevron-right"></i></button>',
        responsive: [{
          breakpoint: 992,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 481,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
        ]
      });
    }
    teamCarousel();


    // media popup
    function mediaPopup() {
      $('.gallery-popup').colorbox({
        rel: 'gallery-popup',
        transition: 'slideshow',
        innerHeight: '500'
      });
      $('.popup').colorbox({
        iframe: true,
        innerWidth: 600,
        innerHeight: 400
      });
    }
    mediaPopup();

  });


});