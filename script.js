const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')
const tracker = new tracking.ObjectTracker('face')
const download = document.getElementById('download')

const flowerCrown = new Image()
flowerCrown.src = 'flower-crown.png'

tracker.setInitialScale(4)
tracker.setStepSize(2)
tracker.setEdgesDensity(0.1)
tracking.track('#video', tracker, { camera: true })

tracker.on('track', event => {
  context.clearRect(0, 0, canvas.width, canvas.height)
  event.data.forEach(rect => {
    context.drawImage(flowerCrown, rect.x, rect.y - 70, rect.width + 5, rect.height)
  })
})

download.addEventListener('click', () => {
  console.log(this, 'hello world')
  this.href = canvas.toDataURL()
  this.download = 'test.png'
})
