/* Template: Sync - Free Mobile App Landing Page HTML Template
   Author: Inovatik
   Created: Dec 2019
   Description: Custom JS file
*/

(function ($) {
  "use strict";
  // Price form
  const calculatePrice = () => {
    const ecoleDirect = $('input#price-ecole-directe').is(':checked'),
              reminder = $('input#price-reminders').is(':checked'),
              students = parseInt($('input#price-students').val()),
              entryPrice = 5000,
              baseStudentPrice = 2,
              ecoleDirectPrice = 1,
              reminderPrice = 0.5
              ;
        
        let pricePerStudent = 2;
        if (ecoleDirect) pricePerStudent += 1;
        if (reminder) pricePerStudent += 0.5;

        const totalFirstPrice = entryPrice + pricePerStudent * students,
              totalSecondPrice = pricePerStudent * students;

        $('#price-student-count').text(students);
        $('.price-base-price').text(`${entryPrice.toFixed(2)} €`);
        $('#price-base-student').text(`${baseStudentPrice.toFixed(2)} €`);
        $('#price-student-ecole-directe').text(`${ecoleDirectPrice.toFixed(2)} €`);
        $('#price-student-reminder').text(`${reminderPrice.toFixed(2)} €`);
        $('#price-per-student').text(`${pricePerStudent.toFixed(2)} €`);
        $('#price-first-year').text(`${totalFirstPrice.toFixed(2)} €`);
        $('#price-second-year').text(`${totalSecondPrice.toFixed(2)} €`);
  }

  
  $("#priceForm")
    .on("input", function() {
        calculatePrice()
    })


  // Email JS
  emailjs.init("user_S4GkrC97lNnQVQomJL9Sq");

  /* Preloader */
  $(window).on("load", function () {
    var preloaderFadeOutTime = 250;
    function hidePreloader() {
      var preloader = $(".spinner-wrapper");
      setTimeout(function () {
        preloader.fadeOut(preloaderFadeOutTime);
      }, 500);
    }
    hidePreloader();
    document
      .getElementById("contact_form")
      .addEventListener("submit", function (event) {
        event.preventDefault();
        // generate the contact number value
        if (grecaptcha.getResponse().length !== 0) {
          // reCAPTCHA success
          this.contact_number.value = (Math.random() * 100000) | 0;
          emailjs.sendForm("poste_io", "avenir_template", this);
          document.getElementById("contact_form").reset();
        } else {
          alert("Vérification anti-robot échouée");
        }
      });

    calculatePrice()
  });

  /* Navbar Scripts */
  // jQuery to collapse the navbar on scroll
  $(window).on("scroll load", function () {
    if ($(".navbar").offset().top > 60) {
      $(".fixed-top").addClass("top-nav-collapse");
    } else {
      $(".fixed-top").removeClass("top-nav-collapse");
    }
  });

  // jQuery for page scrolling feature - requires jQuery Easing plugin
  $(function () {
    $(document).on("click", "a.page-scroll", function (event) {
      var $anchor = $(this);
      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: $($anchor.attr("href")).offset().top - 125,
          },
          600,
          "easeInOutExpo"
        );
      event.preventDefault();
    });
  });

  // closes the responsive menu on menu item click
  $(".navbar-nav li a").on("click", function (event) {
    if (!$(this).parent().hasClass("dropdown"))
      $(".navbar-collapse").collapse("hide");
  });

  /* Image Slider - Swiper */
  var imageSlider = new Swiper(".image-slider", {
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    loop: false,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    spaceBetween: 30,
    slidesPerView: 5,
    breakpoints: {
      // when window is <= 516px
      516: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      // when window is <= 767px
      767: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      // when window is <= 991px
      991: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      // when window is <= 1199px
      1199: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    },
  });

  /* Image Lightbox - Magnific Popup */
  $(".popup-link").magnificPopup({
    removalDelay: 300,
    type: "image",
    callbacks: {
      beforeOpen: function () {
        this.st.image.markup = this.st.image.markup.replace(
          "mfp-figure",
          "mfp-figure " + this.st.el.attr("data-effect")
        );
      },
      beforeClose: function () {
        $(".mfp-figure").addClass("fadeOut");
      },
    },
    gallery: {
      enabled: true, //enable gallery mode
    },
  });

  /* Details Lightbox - Magnific Popup */
  $(".popup-with-move-anim").magnificPopup({
    type: "inline",
    fixedContentPos: false /* keep it false to avoid html tag shift with margin-right: 17px */,
    fixedBgPos: true,
    overflowY: "auto",
    closeBtnInside: true,
    preloader: false,
    midClick: true,
    removalDelay: 300,
    mainClass: "my-mfp-slide-bottom",
  });

  /* Counter - CountTo */
  var a = 0;
  $(window).scroll(function () {
    if ($("#counter").length) {
      // checking if CountTo section exists in the page, if not it will not run the script and avoid errors
      var oTop = $("#counter").offset().top - window.innerHeight;
      if (a == 0 && $(window).scrollTop() > oTop) {
        $(".number-count").each(function () {
          var $this = $(this),
            countTo = $this.attr("data-count");
          $({
            countNum: $this.text(),
          }).animate(
            {
              countNum: countTo,
            },
            {
              duration: 2000,
              easing: "swing",
              step: function () {
                $this.text(Math.floor(this.countNum));
              },
              complete: function () {
                $this.text(this.countNum);
                //alert('finished');
              },
            }
          );
        });
        a = 1;
      }
    }
  });

  /* Move Form Fields Label When User Types */
  // for input and textarea fields
  $("input, textarea").keyup(function () {
    if ($(this).val() != "") {
      $(this).addClass("notEmpty");
    } else {
      $(this).removeClass("notEmpty");
    }
  });

  /* Back To Top Button */
  // create the back to top button
  $("body").prepend(
    '<a href="body" class="back-to-top page-scroll">Back to Top</a>'
  );
  var amountScrolled = 700;
  $(window).scroll(function () {
    if ($(window).scrollTop() > amountScrolled) {
      $("a.back-to-top").fadeIn("500");
    } else {
      $("a.back-to-top").fadeOut("500");
    }
  });

  /* Removes Long Focus On Buttons */
  $(".button, a, button").mouseup(function () {
    $(this).blur();
  });

;
})(jQuery);
