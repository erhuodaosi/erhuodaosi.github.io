// 图片数组
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
]

const slideshowImage = document.getElementById('slideshowImage')
let currentIndex = 0
let currentArticleIndex = 0
let isPlaying = true
const musicPlayer = document.getElementById('musicPlayer')
const musicIcon = document.querySelector('.music-icon')
const startDate = new Date('2024-02-16T20:13:00')

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
  console.log({ isPlaying })
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

// 页面加载时的默认设置
document.addEventListener('DOMContentLoaded', () => {
  showTab('tab1')
  showArticle(0)
  updateLoveTime()
  setInterval(updateLoveTime, 1000)
  initSlideshow()
})
