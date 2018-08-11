
let part = {}
let response = {}

let state = {
  "line":"",
  "raw":"",
  "current": "Welcome",
  "prompt": ">&nbsp;"
}

const repl = document.querySelector("#repl")
const body = document.querySelector("body")
repl.innerText = repl.innerText.trim()

const prompt = function() {
  repl.innerHTML =  repl.innerHTML + state.prompt
  moveToEndOf(repl)
}

const moveToEndOf = _ => {
    _.focus()
    let range = document.createRange()
    range.selectNodeContents(_)
    range.collapse(false)
    let sel = window.getSelection()
    sel.removeAllRanges()
    sel.addRange(range)
    repl.scrollTop = repl.scrollHeight
    window.scrollTo(0,document.body.scrollHeight)
}

function print(html){
  repl.innerHTML = repl.innerHTML + "<p class=p>" + html + "</p>"
  moveToEndOf(repl)
}

repl.onkeydown = _ => {

  let data = repl.lastChild.data
  let key = _.key

  if (key === "Backspace" && data === ">") {
    _.preventDefault()
    return
  }

  if (key !== "Enter" ) return

  _.preventDefault()

  let raw = data.substring(2)
  state.raw = raw.trim()
  state.line = raw.toLowerCase()

  repl.innerHTML += '<br>'
  
  for (const [name,method] of Object.entries(response)) {
    let response = method(state)
    if (response) {
      print(response)
      prompt()
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

  prompt()
}

repl.onclick = body.onlick = _ => moveToEndOf(repl)

window.onload = e => {
    repl.focus()
    state.current = part[state.current](state)
    prompt()
}
