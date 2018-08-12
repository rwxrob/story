let part = {}
let response = {}
let curinput = null

let state = {
  "line":"",
  "raw":"",
  "current": "Welcome",
  "prompt": "&gt;&nbsp"
}

const repl = document.querySelector("#repl")

const input = _ => {
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

  let data = curinput.textContent
  let key = _.key

  if (key !== "Enter" ) return

  _.preventDefault()

  state.raw = data.trim()
  state.line = data.toLowerCase()

  repl.innerHTML += '<br>'
  
  for (const [name,method] of Object.entries(response)) {
    let response = method(state)
    if (response) {
      print(response)
      input()
      return
    }
  }

  let previous = state.current
  p = part[state.current]
  if (!p) {
    print(`That part (${p}) does not seem to be available.`)
  } else {
    c = p(state)
    if (c) state.current = c
  }

  input()
}

repl.onclick = _ => focusLastInput()

window.onload = _ => {
    repl.focus()
    state.current = part[state.current](state)
    input()
}
