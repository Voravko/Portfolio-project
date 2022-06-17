
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

