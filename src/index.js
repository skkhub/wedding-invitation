
import 'swiper/swiper-bundle.css';
import './swiper-animate/animate.min.css';
import './style.css';
import Swiper, {Pagination } from 'swiper';
// import Swiper from 'swiper/bundle';
import { swiperAnimateCache, swiperAnimate, clearSwiperAnimate } from './swiper-animate';
import utils from './utils';
import music from './assets/music.mp3';

var context = require.context('./photos', false, /.jpg/);
var frames = utils.loadFrames(context);

var swiperSlides = document.getElementsByClassName('swiper-slide');
var btnPlayMusic = document.getElementsByClassName('btn-music')[0];
var audio = new Audio();
function initAudio() {
    audio.src = music;
    audio.loop = true;
    audio.autoplay = true;
    document.addEventListener('WeixinJSBridgeReady', function () {
        audio.play();
        btnPlayMusic.classList.add('playing');
    });

    btnPlayMusic.onclick = function () {
        console.log('click', audio.paused);
        if (audio.paused) {
            audio.play();
            btnPlayMusic.classList.add('playing');
        }
        else {
            audio.pause();
            btnPlayMusic.classList.remove('playing');
        }
    }
    if (!audio.paused) {
        btnPlayMusic.classList.add('playing');
    }
}

function addImages(cb) {
    var len = frames.length;
    [].slice.call(swiperSlides).forEach(function (slide, i) {
        var copy = slide.getElementsByClassName('swiper-slide-copy')[0];

        var index = (function fn(i) {
            if (i >= len) {
                return fn(i - len);
            }
            else {
                return i;
            }
        })(i);
        if (copy) {
            copy.style.backgroundImage = 'url(' + frames[index].default + ')';
        }
        else {
            slide.style.backgroundImage = 'url(' + frames[index].default + ')';
        }
    });

    if (typeof cb === 'function') {
        setTimeout(cb);
    }
}
function initSwiper() {
    // configure Swiper to use modules
    Swiper.use([Pagination]);
    var mySwiper = new Swiper('.swiper-container', {
        direction: 'vertical', // 垂直切换选项
        // loop: false, // 循环模式选项

        // 如果需要分页器
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },

        // 如果需要前进后退按钮
        // navigation: {
        //     nextEl: '.swiper-button-next',
        //     prevEl: '.swiper-button-prev',
        // },

        // 如果需要滚动条
        // scrollbar: {
        //     el: '.swiper-scrollbar',
        // }
        effect: 'fade',
        fadeEffect: {
            crossFade: true,
        },

        on: {
            init: function () {
                swiperAnimateCache(this); //隐藏动画元素 
                swiperAnimate(this); //初始化完成开始动画
            },
            slideChangeTransitionEnd: function () {
                swiperAnimate(this); //每个slide切换结束时也运行当前slide动画
                //this.slides.eq(this.activeIndex).find('.ani').removeClass('ani'); 动画只展现一次，去除ani类名
            }
        }
    });
}

initAudio();
addImages(initSwiper);
