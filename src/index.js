
import 'swiper/swiper-bundle.css';
import './utils/swiper-animate/animate.min.css';
import './style.css';
import Swiper, {Pagination} from 'swiper';
// import Swiper from 'swiper/bundle';
import { swiperAnimateCache, swiperAnimate, clearSwiperAnimate } from './utils/swiper-animate/swiper.animate1.0.2.min';

import {loadFrames, loadScript} from './utils/utils';
import music from './assets/music.mp3';

var context = require.context('./photos', false, /.jpg/);
// var frames = requireMulti('./photos', false, /.jpg/);
var frames = loadFrames(context);

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

function createSlideBaby(father, imgUrl) {
    var dom = document.createElement('div');
    dom.classList.add('slide-baby');
    dom.style.backgroundImage = 'url(' + imgUrl + ')';
    father.appendChild(dom);
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
        // if (copy) {
        createSlideBaby(copy ? copy : slide, frames[index].default)
            // copy.style.backgroundImage = 'url(' + frames[index].default + ')';
        // }
        // else {
        //     slide.style.backgroundImage = 'url(' + frames[index].default + ')';
        // }
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
        // preloadImages: true,
        // lazyLoading : false,
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

// function initWx() {
//     // var  document.createElement('script');
//     loadScript('/jweixin-1.6.0.js', function() {
//         console.log('wxready?');
//         wx.config({
//             debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
//             appId: 'wx2f89fc7edb35efb6', // 必填，公众号的唯一标识
//             timestamp: '', // 必填，生成签名的时间戳
//             nonceStr: '', // 必填，生成签名的随机串
//             signature: '',// 必填，签名
//             jsApiList: [] // 必填，需要使用的JS接口列表
//           });
//     });

// }
// initWx();
initAudio();
addImages(initSwiper);
