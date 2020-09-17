$('.post-wrapper').slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    nextArrow: $('.next'),
    prevArrow: $('.prev'),
    responsive: [
        {
          breakpoint: 1180,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: true,
            dots: false,
          }
        },
        {
          breakpoint: 700,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
          }
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ]
  });

  $('.post-wrapper2').slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    nextArrow: $('.next2'),
    prevArrow: $('.prev2'),
    responsive: [
        {
          breakpoint: 1180,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: true,
            dots: false,
          }
        },
        {
          breakpoint: 700,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            dots: false,
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
          }
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ]
  });