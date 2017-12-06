const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')
const tracker = new tracking.ObjectTracker('face')
const flowerCrownButton = document.getElementById('flower-crown')
const bunnyEarsButton = document.getElementById('bunny-ears')

const img = new Image()
let filterX = 0
let filterY = 0
let filterWidth = 0
let filterHeight = 0

function changePic (x, y, width, height, src) {
  img.src = src
  filterX = x
  filterY = y
  filterWidth = width
  filterHeight = height
}

function flowerCrown () {
  changePic(0, -0.5, 1, 1, 'flower-crown.png')
}

flowerCrown()

flowerCrownButton.addEventListener('click', flowerCrown)

bunnyEarsButton.addEventListener('click', () => {
  changePic(-0.5, -0.9, 2, 2, 'bunny-ears.png')
})

tracker.setInitialScale(4)
tracker.setStepSize(2)
tracker.setEdgesDensity(0.1)
tracking.track('#video', tracker, { camera: true })

tracker.on('track', event => {
  context.clearRect(0, 0, canvas.width, canvas.height)
  event.data.forEach(rect => {
    context.drawImage(img, rect.x + (filterX * rect.width),
    rect.y + (filterY * rect.height),
    rect.width * filterWidth,
    rect.height * filterHeight
  )
  })
})
