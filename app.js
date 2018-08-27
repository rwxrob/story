if ( 'serviceWorker' in navigator ) navigator.serviceWorker.register('/sw.js')


let part = {}
let response = {}
let curinput = null

let state = {
  "line":"",
  "raw":"",
  "current": "Welcome", // the default
  "previous": "Welcome", // the default
  "prompt": "&gt;&nbsp"
}

const repl = document.querySelector("#repl")
const body = document.querySelector("body")

const promptForInput = _ => {
  repl.innerHTML =  repl.innerHTML + "<span class=prompt>" + state.prompt + "</span>"
    + "<span class=input contenteditable></span>"
  focusLastInput()
}

const lastInput = _ => { 
  let inputs = document.getElementsByClassName('input')
  return inputs[inputs.length-1]
}

const focusLastInput = _ => {
    let last = lastInput()
    if (!last) return
    curinput = last
    last.focus()
    let range = document.createRange()
    range.selectNodeContents(last)
    range.collapse(false)
    let sel = window.getSelection()
    sel.removeAllRanges()
    sel.addRange(range)
    repl.scrollTop = repl.scrollHeight
    window.scrollTo(0,document.body.scrollHeight)
}

const print = _ => {
  repl.innerHTML = repl.innerHTML + "<p class=p>" + _ + "</p>"
  focusLastInput()
}

repl.onkeydown = _ => {

  let data = (curinput) ? curinput.textContent: ""
  let key = _.key

  //console.log(key)

  // only a single line of input allowed

  if (key !== "Enter" ) return

  _.preventDefault()

  state.raw = data.trim()
  state.line = state.raw.toLowerCase()

  // catch any responses that have priority over
  // the current part handler, use this for actions
  // such as flipping a coin or showing inventory
  
  for (const [name,method] of Object.entries(response)) {
    let response = method(state)
    if (response) {
      print(response)
      promptForInput()
      return
    }
  }

  // now hand off the input to the current part
  
  let previous = state.current
  p = part[state.current]
  if (!p) {
    print(`Part Unavailable<br>
          <i class=small>Contact the author to let them know. It could
          be that this is the default part and it is
          not defined in the parts.js file.</i>`)
    return
  } else {
    c = p(state)
    if (c) {
      state.current = c
      state.previous = previous
    }
  }

  promptForInput()
}

const triggerEnter = _ => 
  repl.onkeydown(new KeyboardEvent('keypress',{'key':'Enter'}))

window.onclick = _ => focusLastInput()
window.onload = _ => triggerEnter()
