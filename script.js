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

// 获取容器
const container = document.getElementById('memoryWrapper')

// 循环生成图片
images.forEach(src => {
  const img = document.createElement('img')
  img.src = src
  img.alt = 'Image'
  container.appendChild(img)
});

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
