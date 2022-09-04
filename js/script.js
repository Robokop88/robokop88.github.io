
window.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.menu'),
    menuItem = document.querySelectorAll('.menu_item'),
    hamburger = document.querySelector('.hamburger');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('hamburger_active');
        menu.classList.toggle('menu_active');
    });

    menuItem.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.toggle('hamburger_active');
            menu.classList.toggle('menu_active');
        })
    });

    $(window).scroll(function() {
      if ($(this).scrollTop() > 1600) {
        $('.pageup').fadeIn('slow');
      } else {
        $('.pageup').fadeOut();
      }
    });

    $(function(){
      $('#up').click(function(){
        $('html, body').animate({scrollTop: 0}, 600);
        return false;
      });
    });
    
    
    $('[data-modal=phone]').on('click', function() {
      $('.overlay, #phone').fadeIn('slow');
    });
    $('[data-modal=bid]').on('click', function() {
      $('.overlay, #bid').fadeIn('slow');
    });
  
    $('.modal__close').on('click', function() {
      $('.overlay, #phone, #thanks, #bid').fadeOut('slow');
    });

    function valideForm(form) {
      $(form).validate({
        rules: {
          name: {
            required: true,
            minlength: 2,
            maxlength: 30
          },
          phone: {
            required: true,
            maxlength: 18
          },
          email: {
            required: true,
            maxlength: 30,
            email: true
          }
        },
        messages: {
          name: {
            required: "Пожалуйста, введите свое имя",
            minlength: jQuery.validator.format("Минимальное количество символов = {0}"),
            maxlength: jQuery.validator.format("Максиимальное количество символов = {0}")
          },
          phone: {
            required: "Пожалуйста, введите свой номер телефона",
            maxlength: jQuery.validator.format("Максимальное количество символов = {0}")
          },
          email: {
            required: "Пожалуста введите сою почту",
            email: "Неправильно введен адрес почты",
            maxlength: jQuery.validator.format("Маскимальное количество символов = {0}")
          }
        }
      });
    };
    valideForm("#phons");
    valideForm("#vid");

    $('form').submit(function(e) {
      e.preventDefault();
      if (!$(this).valid()) {
        return;
      }
      $.ajax({
        type: "POST",
        url: "mailer/smart.php", 
        data: $(this).serialize()
      }).done(function() {
          $(this).find("input").val("");
          $('#phone, #bid').fadeOut();
          $('.overlay, #thanks').fadeIn('slow');
          $('form').trigger('reset');
      });
      return false;
    });

    new WOW().init();
});






