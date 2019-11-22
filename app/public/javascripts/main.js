console.log('JS loaded 🍇')

const offset = 500
const y = 10
let x
let width
let randomValue
let content
let timeline
let itemContainer

function loadData() {
  fetch('./data.json')
    .then(response => {
      return response.json()
    })
    .then(data => {
      content = Object.keys(data).map(i => {
        data[i].key = i
        return data[i]
      })
      makeTimeline()
    })
    .catch(err => {
      console.error(`${err}`)
    })
}


// CREATE ITEMS FROM JSON OBJECTS AND PUSH TO DOM
function makeTimeline() {
  console.log('content 🥝', content)
  content.map(item => {
    const square = document.createElement('div')
    // PUSH ALL ELEMENTS UP FOR AESTHETICS
    const year = item.year - 1425
    // PLACE ITEMS ON ITEMLINE USING YEAR VALUE AND VALUE SET FOR 'Y'
    const yAxis = parseInt(year * y)
    // SET TRANSFORM
    square.style.setProperty('--transform-y', `${yAxis}px`)
    // SET BASE CLASSES FOR ITEMS
    square.className = `item ${item.key} ${item.category}`
    square.innerHTML = `${item.title} ${item.year}`
    // PUSH ELEMENTS TO DOM TIMELINE
    timeline.appendChild(square)

    // GET POSITION OF ITEM ON THE X AXIS
    x = window.scrollX + document.querySelector('.item').getBoundingClientRect().left
    // console.log('x', item.key, x)

    // get percentage of width with randomValue



    // GET RANDOM VALUE TO OFFSET AXIS, WITH FUNCTION
    let offsetAxis = offsetAxisValue()
    // GET THE FINAL X AXIS VALUE = THE INITIAL VALUE + RANDOM OFFSET VALUE
    let xAxisValue = x + offsetAxis
    // IF FINAL X AXIS VALUE LESS OR MORE THAN THE BOUNDS OF THE TIMELINE
    if (offsetAxis <= 0 || offsetAxis >= width) {

      // offsetAxisValue()
      while (offsetAxis <= 0 || offsetAxis >= width) {
        offsetAxis = offsetAxisValue()
        console.log(offsetAxis)
        return offsetAxis
      }
      square.style.setProperty('--transform-x', `${offsetAxis}px`)
    } else if (offsetAxis >= 0 || offsetAxis <= width) square.style.setProperty('--transform-x', `${offsetAxis}px`)


    // square.style.setProperty('--transform-x', `${randomNumber}px`)




    // const randomNumber = scatter()
    // console.log('randomNumber', randomNumber)
    // width = timeline.offsetWidth
    // randomNumber = ()
    // if offset.min + randomNumber || offset.max + randomNumber
    // const offsetAxisValue = width + randomNumber
    // console.log('offsetAxisValue', offsetAxisValue)
  })
}

const scatter = function() {
  // MAKE POSITIVE OR NEGATIVE NUMBER
  const posOrNeg = Math.random() < 0.5 ? -1 : 1
  // MAKE A RANDOM VALUE
  randomValue = Math.round(Math.random() * offset - 1)
  // RANDOMLY MAKE THE VALUE POSITIVE OR NEGATIVE
  randomValue = randomValue * posOrNeg
  return randomValue
}

const offsetAxisValue = function() {
  console.log('=====')
  // GET RANDOM POSITIVE OR NEGATIVE VALUE
  const randomNumber = scatter()
  console.log('randomNumber', randomNumber)
  // GET WIDTH OF THE TIMELINE ELEMENT
  width = timeline.offsetWidth
  console.log('width', width)
  // GET PERCENTAGE OF WIDTH USING RANDOM VALUE
  const offsetAxisValue = (width / randomNumber) * 100
  // const offsetAxisValue = width + randomNumber
  console.log('offsetAxisValue', offsetAxisValue)
  return offsetAxisValue
}

// DOM CONTENT LOADED
document.addEventListener('DOMContentLoaded', () => {
  timeline = document.getElementById('timeline')
  itemContainer = document.getElementById('item')
  loadData()
  console.log('scatter()', scatter())
})
