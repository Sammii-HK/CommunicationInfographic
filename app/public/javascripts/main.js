console.log('JS loaded 🍇')

let content
let timeline
let itemContainer
let resData

function loadData() {
  fetch('./data.json')
    .then(response => {
      return response.json()
    })
    .then(data => {
      // Work with JSON data here
      // content = data
      resData = data
      console.log('data 🍍', data)
      content = Object.keys(data).map(i => {
        console.log('i 🌺', i)
        // i.key = i
        data[i].key = i
        // data[key]: i
        return data[i]
      })
      // content = Object.keys(data).map(i => data[i])
      makeTimeline()
    })
    .catch(err => {
      // Do something for an error here
      console.error(`${err}`)
    })
}


// CREATE ITEMS FROM JSON OBJECTS AND PUSH TO DOM
function makeTimeline() {
  console.log('content 🥝', content)
  content.map(item => {
    console.log('item:', item.title)
    console.log('key:', item.key)

    const square = document.createElement('div')
    // square.innerHTML = `${item.title}`

    // square.className = Object.keys(item)

    timeline.appendChild(square)
  })
}


// DOM CONTENT LOADED
document.addEventListener('DOMContentLoaded', () => {
  timeline = document.getElementById('timeline')
  loadData()

})
