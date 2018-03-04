// JavaScript Document
var is_init = false;
$(window).on('load', function() {
  var odd = true;
  $.each($('.item'), function() {
    var dir = 'left';
    var x = $(this).position();
    var h = $(this).outerHeight();

    if (is_init === false) {
      if (odd === false) {
        dir = 'right';
        odd = true;
      } else {
        odd = false;
      }
    }

    $(this).addClass(dir).attr('data-top', x.top).attr('data-bottom', x.top + h);
  });

  if (is_init === false)
    is_init = true;
});

$(window).on('resize', function() {
  $.each($('.item'), function() {
    var x = $(this).position();
    var h = $(this).outerHeight();

    $(this).attr('data-top', x.top).attr('data-bottom', x.top + h);
  });
});

$(window).on('load resize scroll', function() {
  var offset = 100;
  var tpos = $(document).scrollTop();
  var bpos = tpos + $(window).outerHeight(true);
  var tot = $(document).outerHeight(true) - $(window).outerHeight(true);

  var minpos = 30;
  var maxpos = 70;
  var scrollper = 100 - Math.round((tpos / tot) * 100);
  var earthpos = ((maxpos / 100) * scrollper) + ((minpos / 100) * (100 - scrollper));

  $('#earth').css({
    'top': earthpos + 'vh'
  });

  $.each($('.item'), function() {
    if (bpos - offset > $(this).attr('data-top') && tpos + offset < $(this).attr('data-bottom')) {
      $(this).addClass('show');
    } else if (tpos + offset > $(this).attr('data-bottom') || bpos - offset < $(this).attr('data-top')) {
      $(this).removeClass('show');
    }
  });

  if (tpos >= tot)
    $('#footer').addClass('bottom');
  else
    $('#footer').removeClass('bottom');
});
