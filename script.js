const images = [
  './images/1.png',
  './images/2.png',
  './images/3.png',
  './images/4.png',
  './images/5.png',
  './images/6.png',
  './images/7.png',
  './images/8.png',
  './images/9.png'
];

const memoryWrapper = document.getElementById('memoryWrapper');
let currentIndex = 0;

function preloadImage(index) {
  const img = new Image();
  img.src = images[index];
  img.onload = () => {
    memoryWrapper.appendChild(img);
    setTimeout(() => {
    }, 3000); // 控制每张图片显示的时间
  };
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % images.length;
  preloadImage(currentIndex);
}

setInterval(nextSlide, 4000); // 控制图片切换的时间

// 初始化加载第一张图片
preloadImage(currentIndex);
function createHeart() {
  const heart = document.createElement('div')
  heart.className = 'heart'
  heart.style.left = `${Math.random() * 100}%`
  heart.style.animationDuration = `${Math.random() * 2 + 3}s`
  document.body.appendChild(heart)
  setTimeout(() => {
    heart.remove()
  }, 5000)
}

setInterval(createHeart, 500);
