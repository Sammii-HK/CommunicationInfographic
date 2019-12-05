console.log('JS loaded 🍇')

const offset = 200
const y = 10
const xAxisValues = []
const axisValues = []
let xAxis
let x
let width
let randomValue
let content
let timeline

function loadData () {
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
  // GET WIDTH OF TIMELINE
  width = timeline.offsetWidth
  console.log('width', width)

  content.map(item => {
    // SAVE CREATE DIV AS VAR
    const square = document.createElement('div')
    // SET BASE CLASSES FOR ITEMS
    square.className = `item ${item.key} ${item.category}`
    square.innerHTML = `${item.title} <br> ${item.year}`
    // PUSH ALL ELEMENTS UP FOR AESTHETICS
    const year = parseInt(item.year) - 1425
    // PLACE ITEMS ON ITEMLINE USING YEAR VALUE AND VALUE SET FOR 'Y'
    const yAxis = parseInt(year * y)
    // SET TRANSFORM
    square.style.setProperty('--transform-y', `${yAxis}px`)
    // PUSH ELEMENTS TO DOM TIMELINE
    timeline.appendChild(square)
    // GET POSITION OF ITEM ON THE X AXIS
    x = window.scrollX + document.querySelector('.item').getBoundingClientRect().left
    // GET RANDOM VALUE TO OFFSET AXIS, WITH FUNCTION
    const randomValue = scatter()
    // MAKE PERCENTAGE OF AXIS VALUE WITH RANDOMNUMBER FUNCTION
    const percentage = (x / randomValue)
    xAxis = x / percentage
    // IF FINAL X AXIS VALUE IS LESS THAN THE BOUNDS OF THE TIMELINE
    if (xAxis <= 0) {
      // MAKE NEW RANDOM NUMBER TO POSITIVE
      xAxis = Math.abs(xAxis)
    } else if (xAxis >= width) { // IF FINAL X AXIS VALUE IS MORE THAN THE BOUNDS OF THE TIMELINE
      // MAKE NEW RANDOM NUMBER TO NEGATIVE
      xAxis -= x
    }
    xAxisValues.push([ yAxis, xAxis ])
    axisValues.push({ xAxis: xAxis, yAxis: yAxis })
    // xValues.push(xAxis)
    // yValues.push(yAxis)
    console.log('*xAxis*', xAxis)
    overlayCheck()
    square.style.setProperty('--transform-x', `${xAxis}px`)
  })
}

const lastValue = axisValues[axisValues.length-1]

const overlayCheck = function() {
  axisValues.map((item, i) => {
    const lastItem = axisValues[ i - 1 ]
    console.log('==========')
    console.log('item', item)
    if (i === 0) return
    if (item.yAxis <= (lastItem.yAxis - 10)) {
      console.log('item', item.yAxis, item.xAxis)
      console.log('lastItem', lastItem.yAxis, lastItem.xAxis)
      if (item.xAxis <= (lastItem.xAxis - 10)) {
        console.log('item', item.xAxis)
        console.log('xAxis', xAxis)
        item.xAxis += 10
        xAxis += 10
        console.log('item', item.xAxis)
        console.log('==xAxis', xAxis)
      }
    }
    console.log('item.yAxis, item.xAxis', item.yAxis, item.xAxis)
  })
  console.log('axisValues', axisValues)
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

// DOM CONTENT LOADED
document.addEventListener('DOMContentLoaded', () => {
  timeline = document.getElementById('timeline')
  // itemContainer = document.getElementById('item')
  loadData()
})
