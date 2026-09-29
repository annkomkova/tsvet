// Цветочный — скрипты главной страницы
// Сверху вызываем функции, ниже описываем их

burgerMenu()
headerScroll()
splitText()
showOnScroll()
hoverLetters()
heroParallax()
heroScroll()
moveMarquee()
highlightWords()
countNumbers()
changeTheme()
tiltCard()
showPreview()
scrollUp()
setYear()
moveCursor()
magneticButtons()
loadPage()

// 1.4 Бургер и мобильное меню
function burgerMenu() {
  let burger = document.querySelector('.burger')
  let menu = document.querySelector('.menu')
  let header = document.querySelector('.header')
  let links = document.querySelectorAll('.menu__link')

  burger.addEventListener('click', () => {
    burger.classList.toggle('burger--open')
    menu.classList.toggle('menu--open')
    header.classList.toggle('header--menu')
    document.body.classList.toggle('page--locked')
  })

  links.forEach((link) => {
    link.addEventListener('click', () => {
      burger.classList.remove('burger--open')
      menu.classList.remove('menu--open')
      header.classList.remove('header--menu')
      document.body.classList.remove('page--locked')
    })
  })
}

// 1.5 Шапка при скролле
function headerScroll() {
  let header = document.querySelector('.header')
  let lastScroll = 0

  window.addEventListener('scroll', () => {
    let scroll = window.scrollY

    if (scroll > 20) {
      header.classList.add('header--scrolled')
    } else {
      header.classList.remove('header--scrolled')
    }

    if (scroll > 160 && scroll > lastScroll && !header.classList.contains('header--menu')) {
      header.classList.add('header--hidden')
    } else {
      header.classList.remove('header--hidden')
    }

    lastScroll = scroll
  })
}

// 2.2 Разбиваем текст на буквы и слова
function splitText() {
  let elements = document.querySelectorAll('.split')

  elements.forEach((element) => {
    let words = element.innerText.split(' ')
    let html = ''
    let index = 0
    let delay = 0

    if (element.classList.contains('split--delay')) {
      delay = 300
    }

    words.forEach((word) => {
      html += '<span class="split__word">'

      if (element.classList.contains('split--chars')) {
        for (let i = 0; i < word.length; i++) {
          html += `<span class="split__item" style="transition-delay: ${delay + index * 45}ms">${word[i]}</span>`
          index++
        }
      } else {
        html += `<span class="split__item" style="transition-delay: ${delay + index * 45}ms">${word}</span>`
        index++
      }

      html += '</span> '
    })

    element.innerHTML = html
  })
}

// 2.2 Показываем элементы, когда они появляются на экране
function showOnScroll() {
  checkElements()
  window.addEventListener('scroll', checkElements)
}

function checkElements() {
  if (!document.body.classList.contains('page--loading')) {
    let elements = document.querySelectorAll('.split, .reveal, .fade')

    elements.forEach((element) => {
      let rect = element.getBoundingClientRect()

      if (rect.top < window.innerHeight * 0.9) {
        if (element.classList.contains('split')) {
          element.classList.add('split--visible')
        }
        if (element.classList.contains('reveal')) {
          element.classList.add('reveal--visible')
        }
        if (element.classList.contains('fade')) {
          element.classList.add('fade--visible')
        }
      }
    })
  }
}

// 2.2 Буквы подпрыгивают при наведении
function hoverLetters() {
  let letters = document.querySelectorAll('.split--hover .split__item')

  letters.forEach((letter) => {
    letter.addEventListener('mouseover', () => {
      letter.classList.add('split__item--bounce')

      setTimeout(() => {
        letter.classList.remove('split__item--bounce')
      }, 700)
    })
  })
}

// 2.4 Параллакс цветов за мышью
function heroParallax() {
  let blob = document.querySelector('.hero__blob')
  let bigFlower = document.querySelector('.hero__flower--big')
  let smallFlower = document.querySelector('.hero__flower--small')

  document.addEventListener('mousemove', (event) => {
    let x = event.clientX - window.innerWidth / 2
    let y = event.clientY - window.innerHeight / 2

    blob.style.transform = `translate(${x * 0.04}px, ${y * 0.04}px)`
    bigFlower.style.transform = `translate(${x * -0.06}px, ${y * -0.06}px)`
    smallFlower.style.transform = `translate(${x * 0.09}px, ${y * 0.09}px)`
  })
}

// 2.4 Первый экран уезжает медленнее скролла и растворяется
function heroScroll() {
  let inner = document.querySelector('.hero__inner')

  window.addEventListener('scroll', () => {
    let scroll = window.scrollY

    if (scroll < window.innerHeight) {
      inner.style.transform = `translateY(${scroll * 0.25}px)`
      inner.style.opacity = 1 - scroll / (window.innerHeight * 0.9)
    }
  })
}

// 3. Бегущая строка
function moveMarquee() {
  let marquee = document.querySelector('.marquee')
  let rows = document.querySelectorAll('.marquee__row')
  let position = 0
  let direction = 1
  let speed = 1
  let lastScroll = window.scrollY
  let timer

  window.addEventListener('scroll', () => {
    let delta = window.scrollY - lastScroll
    lastScroll = window.scrollY

    if (delta > 0) {
      direction = 1
    } else if (delta < 0) {
      direction = -1
    }

    speed = 1 + Math.min(Math.abs(delta) / 10, 4)

    let skew = Math.max(-8, Math.min(8, delta * 0.3))
    marquee.style.transform = `skewX(${skew}deg)`

    clearTimeout(timer)
    timer = setTimeout(() => {
      marquee.style.transform = 'skewX(0deg)'
      speed = 1
    }, 150)
  })

  setInterval(() => {
    position = position - 0.05 * speed * direction

    if (position < -100) {
      position = position + 100
    }
    if (position > 0) {
      position = position - 100
    }

    rows.forEach((row) => {
      let tracks = row.querySelectorAll('.marquee__track')
      let x = position

      if (row.classList.contains('marquee__row--reverse')) {
        x = -100 - position
      }

      tracks.forEach((track) => {
        track.style.transform = `translateX(${x}%)`
      })
    })
  }, 16)
}

// 4.2 Подсветка слов при скролле
function highlightWords() {
  let lead = document.querySelector('.about__lead')
  let words = lead.innerText.split(' ')
  let html = ''

  words.forEach((word) => {
    if (word.toLowerCase().includes('цветоч')) {
      html += `<span class="about__word about__word--accent">${word}</span> `
    } else {
      html += `<span class="about__word">${word}</span> `
    }
  })

  lead.innerHTML = html

  let spans = document.querySelectorAll('.about__word')

  window.addEventListener('scroll', () => {
    let rect = lead.getBoundingClientRect()
    let progress = (window.innerHeight * 0.85 - rect.top) / (rect.height + window.innerHeight * 0.3)
    let p = Math.max(0, Math.min(1, progress))
    let activeCount = Math.round(p * spans.length)

    spans.forEach((span, index) => {
      if (index < activeCount) {
        span.classList.add('about__word--active')
      } else {
        span.classList.remove('about__word--active')
      }
    })
  })
}

// 4.3 Счётчики
function countNumbers() {
  let numbers = document.querySelectorAll('.about__number')

  numbers.forEach((number) => {
    let target = parseInt(number.innerText)
    let started = false
    number.innerText = 0

    window.addEventListener('scroll', () => {
      let rect = number.getBoundingClientRect()

      if (rect.top < window.innerHeight * 0.8 && !started) {
        started = true

        let current = 0
        let step = Math.ceil(target / 60)

        let interval = setInterval(() => {
          current = current + step

          if (current >= target) {
            current = target
            clearInterval(interval)
          }

          number.innerText = current
        }, 25)
      }
    })
  })
}

// 5.1 Смена темы страницы по секциям
function changeTheme() {
  let sections = document.querySelectorAll('.theme')

  window.addEventListener('scroll', () => {
    let middle = window.innerHeight / 2

    sections.forEach((section) => {
      let rect = section.getBoundingClientRect()

      if (rect.top < middle && rect.bottom > middle) {
        document.body.classList.remove('page--dark', 'page--pink')

        if (section.classList.contains('theme--dark')) {
          document.body.classList.add('page--dark')
        }
        if (section.classList.contains('theme--pink')) {
          document.body.classList.add('page--pink')
        }
      }
    })
  })
}

// 5.2 3D-наклон карточки за мышью
function tiltCard() {
  let link = document.querySelector('.card__link')
  let media = document.querySelector('.card__media')

  link.addEventListener('mousemove', (event) => {
    let rect = media.getBoundingClientRect()
    let x = (event.clientX - rect.left) / rect.width - 0.5
    let y = (event.clientY - rect.top) / rect.height - 0.5

    media.style.transform = `perspective(1000px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg)`
  })

  link.addEventListener('mouseleave', () => {
    media.style.transform = ''
  })
}

// 5.4 Пятно-превью за курсором
function showPreview() {
  let preview = document.querySelector('.preview')
  let items = document.querySelectorAll('.soon__item')
  let colors = ['pink', 'lilac', 'lime', 'peach']

  document.addEventListener('mousemove', (event) => {
    preview.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`
  })

  items.forEach((item, index) => {
    item.addEventListener('mouseenter', () => {
      preview.className = `preview preview--active preview--${colors[index]}`
    })

    item.addEventListener('mouseleave', () => {
      preview.classList.remove('preview--active')
    })
  })
}

// 7. Кнопка «наверх»
function scrollUp() {
  let button = document.querySelector('.footer__up')

  button.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })
}

// 8. Текущий год в копирайте
function setYear() {
  let year = document.querySelector('.footer__year')
  year.innerText = new Date().getFullYear()
}

// 9.1 Курсор с подписями
function moveCursor() {
  let cursor = document.querySelector('.cursor')
  let label = document.querySelector('.cursor__label')
  let links = document.querySelectorAll('a, button, label')

  document.addEventListener('mousemove', (event) => {
    cursor.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`
  })

  links.forEach((link) => {
    link.addEventListener('mouseover', () => {
      cursor.classList.add('cursor--hover')
    })
    link.addEventListener('mouseout', () => {
      cursor.classList.remove('cursor--hover')
    })
  })

  addCursorLabel('.card__link', 'Читать')
  addCursorLabel('.badge', 'Скоро!')
  addCursorLabel('.soon__item', 'Скоро')

  function addCursorLabel(selector, text) {
    let elements = document.querySelectorAll(selector)

    elements.forEach((element) => {
      element.addEventListener('mouseover', () => {
        label.innerText = text
        cursor.classList.add('cursor--label')
      })
      element.addEventListener('mouseout', () => {
        cursor.classList.remove('cursor--label')
      })
    })
  }
}

// 9.2 Магнитные кнопки
function magneticButtons() {
  let buttons = document.querySelectorAll('.magnetic')

  buttons.forEach((button) => {
    button.addEventListener('mousemove', (event) => {
      let rect = button.getBoundingClientRect()
      let x = event.clientX - (rect.left + rect.width / 2)
      let y = event.clientY - (rect.top + rect.height / 2)

      button.style.transform = `translate(${x * 0.3}px, ${y * 0.4}px)`
    })

    button.addEventListener('mouseleave', () => {
      button.style.transform = ''
    })
  })
}

// 10. Прелоадер
function loadPage() {
  let loader = document.querySelector('.loader')
  let value = document.querySelector('.loader__value')
  let percent = 0

  let interval = setInterval(() => {
    percent++
    value.innerText = percent

    if (percent == 100) {
      clearInterval(interval)

      loader.classList.add('loader--done')
      document.body.classList.remove('page--loading')
      checkElements()

      setTimeout(() => {
        loader.classList.add('loader--hidden')
      }, 1200)
    }
  }, 18)
}
