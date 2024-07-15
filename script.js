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

function showImage(index) {
  setTimeout(() => {
    slideshowImage.src = images[index]
  }, 1000) // 等待当前图片淡出
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % images.length
  showImage(currentIndex)
}

// 初始化加载第一张图片
showImage(currentIndex)

slideshowImage.onload = () => {
  setTimeout(() => {
    nextSlide()
  }, 2000)
}

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

setInterval(createHeart, 500)

function showTab(tabId) {
  const tabs = document.querySelectorAll('.tab-content')
  const buttons = document.querySelectorAll('.bottom-nav button')

  tabs.forEach(tab => {
    tab.style.display = tab.id === tabId ? 'block ' : 'none'
  })

  buttons.forEach(button => {
    button.classList.remove('active')
    if (button.getAttribute('onclick').includes(tabId)) {
      button.classList.add('active')
    }
  })
}

showTab('tab1')

const articleIds = ['article1', 'article2', 'article3', 'article4']
let currentArticleIndex = 0

function showArticle(index) {
  const articles = document.querySelectorAll('.article')

  articles.forEach((article, i) => {
    article.style.display = i === index ? 'block' : 'none'
  })

  currentArticleIndex = index
}

function showPreviousArticle() {
  if (currentArticleIndex > 0) {
    showArticle(currentArticleIndex - 1)
  }
}

function showNextArticle() {
  if (currentArticleIndex < articleIds.length - 1) {
    showArticle(currentArticleIndex + 1)
  }
}

// 页面加载时默认显示第一篇文章
document.addEventListener('DOMContentLoaded', () => {
  showArticle(0)
})
