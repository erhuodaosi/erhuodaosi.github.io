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

const slideshowImage = document.getElementById('slideshowImage');
let currentIndex = 0;

function preloadImage(index) {
  const img = new Image();
  img.src = images[index];
}

function showImage(index) {
  setTimeout(() => {
    slideshowImage.src = images[index];
  }, 1000); // 等待当前图片淡出
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % images.length;
  showImage(currentIndex);
}

// 预加载所有图片
images.forEach((_, index) => preloadImage(index));

// 初始化加载第一张图片
showImage(currentIndex);
setInterval(nextSlide, 2000); // 控制图片切换的时间

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
