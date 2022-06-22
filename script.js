
(function ($) {
    $(function () {
  
  
      if (!('ontouchstart' in window)) {
        const videoPropCont = document.querySelectorAll('.js-create_video');
  
        videoPropCont.forEach(function (item) {
          item.addEventListener('mouseenter', function () {
            var video = this.querySelector('video');
  
            if(!item.classList.contains('js-active')){
  
              item.classList.add('js-active');
  
              video.play();
              video.loop = false;
  
              video.addEventListener('ended', function () {
                item.classList.remove('js-active');
                item.classList.remove('js-video-end');
                item.classList.remove('js-video-pause');
              });
  
              video.addEventListener('timeupdate', function () {
                if((video.currentTime >= 2) && !item.classList.contains('js-video-end')) {
                  video.pause();
                  item.classList.add('js-video-pause');
                }
              });
            }
          });
  
          item.addEventListener('mouseleave', function () {
            var video = this.querySelector('video');
  
            if(item.classList.contains('js-active')) {
              if(item.classList.contains('js-video-pause')){
                item.classList.add('js-video-end');
                video.play()
              } else {
                item.classList.add('js-video-end');
              }
            }
  
          });
  
        });
      }
  
  
    });
  })(jQuery);



  const slider = document.querySelector('.gallery');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', e => {
  isDown = true;
  slider.classList.add('active');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});
slider.addEventListener('mouseleave', _ => {
  isDown = false;
  slider.classList.remove('active');
});
slider.addEventListener('mouseup', _ => {
  isDown = false;
  slider.classList.remove('active');
});
slider.addEventListener('mousemove', e => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const SCROLL_SPEED = 3;
  const walk = (x - startX) * SCROLL_SPEED;
  slider.scrollLeft = scrollLeft - walk;
});

$.fn.boom = function(e) {
	var colors = [
		'#ffb3f6',
		'#7aa0ff',
		'#333',
		// '#FFD100',
		// '#FF9300',
		// '#FF7FA4'
	];
	var shapes = [
		'<polygon class="star" points="21,0,28.053423027509677,11.29179606750063,40.97218684219823,14.510643118126104,32.412678195541844,24.70820393249937,33.34349029814194,37.989356881873896,21,33,8.656509701858067,37.989356881873896,9.587321804458158,24.70820393249937,1.0278131578017735,14.510643118126108,13.94657697249032,11.291796067500632"></polygon>', 
		// '<path class="circle" d="m 20 1 a 1 1 0 0 0 0 25 a 1 1 0 0 0 0 -25"></path>',
		'<polygon class="other-star" points="18,0,22.242640687119284,13.757359312880714,36,18,22.242640687119284,22.242640687119284,18.000000000000004,36,13.757359312880716,22.242640687119284,0,18.000000000000004,13.757359312880714,13.757359312880716"></polygon>',
		'<polygon class="diamond" points="18,0,27.192388155425117,8.80761184457488,36,18,27.19238815542512,27.192388155425117,18.000000000000004,36,8.807611844574883,27.19238815542512,0,18.000000000000004,8.80761184457488,8.807611844574884"></polygon>'
	];

	var btn = $(this);
	var group = [];
	var num = Math.floor(Math.random() * 50) + 30;

	for(i = 0; i < num; i++) {
		var randBG = Math.floor(Math.random() * colors.length);
		var getShape = Math.floor(Math.random() * shapes.length);
		var c = Math.floor(Math.random() * 10) + 5;
		var scale = Math.floor(Math.random() * (8 - 4 + 1)) + 4;
		var x = Math.floor(Math.random() * (150 + 100)) - 100;
		var y = Math.floor(Math.random() * (150 + 100)) - 100;
		var sec = Math.floor(Math.random() * 1700) + 1000;
		var cir = $('<div class="cir"></div>');
		var shape = $('<svg class="shape">'+shapes[getShape]+'</svg>');
		
		shape.css({
			top: e.pageY - btn.offset().top + 20,
			left: e.pageX - btn.offset().left + 40,
			'transform': 'scale(0.'+scale+')',
			'transition': sec + 'ms',
			'fill': colors[randBG]
		});

		btn.siblings('.btn-particles').append(shape);

		group.push({shape: shape, x: x, y: y});
	}
	
	for (var a = 0; a < group.length; a++) {
		var shape = group[a].shape;
		var x = group[a].x, y = group[a].y;
		shape.css({
			left: x + 50,
			top: y + 15,
			'transform': 'scale(0)'
		});
	}
	
	setTimeout(function() {
		for (var b = 0; b < group.length; b++) {
			var shape = group[b].shape;
			shape.remove();
		}
		group = [];
	}, 2000);

}	

$(function() {
	$(document).on('click', '.btn', function(e) {
		$(this).boom(e);
	});

});


$(function() {

	$(".prev").on('click', function(event) {
		event.preventDefault();
		prevSlide();
	});

	$(".next").on('click', function(event) {
		event.preventDefault();
		nextSlide();
	});

	if ($(".item").length <= 1) {
		$(".next").addClass('hide-nav');
	}

	$(".prev").addClass('hide-nav');

	function nextSlide() {
		var atual = $(".cd-slider").find('.current'),
			next = atual.next();

		next.addClass('current').removeClass('prev_slide').siblings().removeClass('current');
		next.prevAll().addClass('prev_slide');

		if (next.index() > 0) {
			$(".prev").removeClass('hide-nav');
		}
		if (next.index() == $(".item").last().index()) {
			$(".next").addClass('hide-nav');
		}
	}

	function prevSlide() {
		var atual = $(".cd-slider").find('.current'),
			prev = atual.prev();

		prev.addClass('current').removeClass('prev_slide').siblings().removeClass('current');

		if (prev.index() !== $(".item").last().index()) {
			$(".next").removeClass('hide-nav');
		} 
		if (prev.index() == 0) {
			$(".prev").addClass('hide-nav');
		}
	}

});

const img = document.getElementById('carousel');
const rightBtn = document.getElementById('right-btn');
const leftBtn = document.getElementById('left-btn');

// Images are from unsplash
let pictures = ['https://images.unsplash.com/photo-1537000092872-06bbf7b64f60?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=14d2fe1244b43a1841569da918066fc4&auto=format&fit=crop&w=1050&q=80', 'https://images.unsplash.com/photo-1537005081207-04f90e3ba640?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ffb71f2a2843e802e238c5ff8e4bbb8c&auto=format&fit=crop&w=764&q=80', 'https://images.unsplash.com/photo-1536873602512-8e88cc8398b1?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=60a351868d0839e686c8c5a286265f8d&auto=format&fit=crop&w=1050&q=80'];

img.src = pictures[0];
let position = 0;

const moveRight = () => {
    if (position >= pictures.length - 1) {
        position = 0
        img.src = pictures[position];
        return;
    }
    img.src = pictures[position + 1];
    position++;
}

const moveLeft = () => {
    if (position < 1) {
        position = pictures.length - 1;
        img.src = pictures[position];
        return;
    }
    img.src = pictures[position - 1];
    position--;
}

rightBtn.addEventListener("click", moveRight);
leftBtn.addEventListener("click", moveLeft);

$(document).ready(function(){

    $( ".scroll-me" ).click(function() {
        var x = $(window).scrollTop();
         $('html, body').animate({ scrollTop: x + 1000 }) 
      });



});