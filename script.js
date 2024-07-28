// 图片数组
const images = [
  './images/1.jpg',
  './images/2.jpg',
  './images/3.jpg',
  './images/4.jpg',
  './images/5.jpg'
]

const slideshowImage = document.getElementById('slideshowImage')
let currentIndex = 0
let currentArticleIndex = 0
let isPlaying = true
const musicPlayer = document.getElementById('musicPlayer')
const musicIcon = document.querySelector('.music-icon')
const startDate = new Date('2024-02-15T20:13:00')

const canvas = document.getElementById('heartCanvas')
const ctx = canvas.getContext('2d')
const particles = []
const heartContainer = document.querySelector('.heart-container')
const heartText = document.querySelector('.heart-text')

let heartCenterX, heartCenterY, heartSize

// 获取当前时间
function getCurrentTime() {
  return new Date();
}

// 获取单个 DOM 元素的助手函数
function getElement(selector) {
  return document.querySelector(selector)
}

// 获取所有 DOM 元素的助手函数
function getElements(selector) {
  return document.querySelectorAll(selector)
}

// 显示图片
function showImage(index) {
  slideshowImage.src = images[index]
}

// 切换到下一张图片
function nextSlide() {
  currentIndex = (currentIndex + 1) % images.length
  showImage(currentIndex)
}

// 初始化图片展示
function initSlideshow() {
  showImage(currentIndex)
  slideshowImage.onload = () => setTimeout(nextSlide, 2000)
}

// 创建心形动画
function createHeart() {
  const heart = document.createElement('div')
  heart.className = 'heart'
  heart.style.left = `${Math.random() * 100}%`
  heart.style.animationDuration = `${Math.random() * 2 + 3}s`
  document.body.appendChild(heart)
  setTimeout(() => heart.remove(), 5000)
}

// 设置定时创建心形动画
setInterval(createHeart, 500)

// 显示选项卡
function showTab(tabId) {
  getElements('.tab-content').forEach(tab => {
    tab.style.display = tab.id === tabId ? 'block' : 'none'
  })

  getElements('.bottom-nav button').forEach(button => {
    button.classList.toggle('active', button.getAttribute('onclick').includes(tabId))
  })
}

// 显示文章
function showArticle(index) {
  getElements('.article').forEach((article, i) => {
    article.style.display = i === index ? 'block' : 'none'
  })
  currentArticleIndex = index
  checkButtonStatus()
}

// 显示上一篇文章
function showPreviousArticle() {
  if (currentArticleIndex == 1) alert('相见恨晚，爱意永恒')
  if (currentArticleIndex >= 0) showArticle(currentArticleIndex - 1)
}

// 显示下一篇文章
function showNextArticle() {
  const total = getElements('.article').length
  if (currentArticleIndex == total - 2) alert('情话道不尽，余生只与你诉说。')
  if (currentArticleIndex <= total - 1) showArticle(currentArticleIndex + 1)
}

// 检查按钮状态并更新
function checkButtonStatus() {
  const prevButton = getElement('.prev-btn')
  const nextButton = getElement('.next-btn')

  prevButton.disabled = currentArticleIndex === 0
  nextButton.disabled = currentArticleIndex >= getElements('.article').length - 1
}

function toggleMusicPlayer() {
  if (isPlaying) {
      musicPlayer.pause()
      musicIcon.classList.remove('rotate') // 停止旋转
  } else {
      musicPlayer.play()
      musicIcon.classList.add('rotate')  // 开始旋转
  }
  isPlaying = !isPlaying
}

// 计算相爱时间
function calculateLoveTime(startDate, now) {
  const timeDiff = now - startDate // 时间差（毫秒）

  // 将时间差转换为天、小时、分钟和秒
  const seconds = Math.floor(timeDiff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  // 格式化时间
  return `${days}天 ${hours % 24}小时 ${minutes % 60}分钟 ${seconds % 60}秒`
}

// 更新页面上的时间显示
function updateLoveTime() {
  const loveTimeElement = document.getElementById('loveTime')
  const now = getCurrentTime()
  loveTimeElement.textContent = calculateLoveTime(startDate, now)
}

function resizeCanvas() {
  canvas.width = 300
  canvas.height = 300
  heartCenterX = canvas.width / 2
  heartCenterY = canvas.height / 2
  heartSize = canvas.width * 0.3
  particles.length = 0
  createHeartParticles()
}

function heartShape(t) {
  const x = 16 * Math.pow(Math.sin(t), 3)
  const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)
  return { x, y }
}

function createHeartParticles() {
  const numParticles = 80
  for (let i = 0; i < numParticles; i++) {
    const t = Math.random() * Math.PI * 2
    const heart = heartShape(t)
    const x = heartCenterX + heart.x * heartSize / 16
    const y = heartCenterY - heart.y * heartSize / 16
    particles.push({
      x: x,
      y: y,
      initialX: x,
      initialY: y,
      angle: Math.random() * 2 * Math.PI,
      speed: Math.random() + 1,
      size: Math.random() * 4 + 2,
      life: Math.random() * 60 + 60,
      offsetX: (Math.random() - 0.5) * 2,
      offsetY: (Math.random() - 0.5) * 2
    })
  }
}

function drawHeartParticles() {
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i]
    ctx.save()
    ctx.translate(p.x + p.offsetX, p.y + p.offsetY)
    ctx.rotate(45 * Math.PI / 180)
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.bezierCurveTo(p.size / 2, -p.size / 2, p.size * 1.5, p.size / 3, 0, p.size)
    ctx.bezierCurveTo(-p.size * 1.5, p.size / 3, -p.size / 2, -p.size / 2, 0, 0)
    ctx.closePath()
    ctx.fillStyle = 'pink'
    // ctx.shadowBlur = 10
    // ctx.shadowColor = 'pink'
    ctx.fill()
    ctx.restore()

    const dx = p.x - heartCenterX
    const dy = p.y - heartCenterY
    const distance = Math.sqrt(dx * dx + dy * dy)
    const speedX = p.speed * (dx / distance)
    const speedY = p.speed * (dy / distance)
    p.x += speedX
    p.y += speedY
    p.life--

    p.offsetX += (Math.random() - 0.5) * 0.2
    p.offsetY += (Math.random() - 0.5) * 0.2

    if (p.life <= 0) {
      particles.splice(i, 1)
      i--
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  const time = Date.now() % 2000
  const scale = time < 1000 ? 1 : 1.333
  heartText.style.transform = `translate(-50%, -50%) scale(${scale})`
  heartSize = canvas.width * (0.2 + 0.1 * scale)

  drawHeartParticles()

  if (particles.length < 80) {
    createHeartParticles()
  }

  requestAnimationFrame(animate)
}

// 页面加载时的默认设置
document.addEventListener('DOMContentLoaded', () => {
  showTab('tab1')
  showArticle(0)
  updateLoveTime()
  setInterval(updateLoveTime, 1000)
  initSlideshow()
  resizeCanvas()
  animate()
})
