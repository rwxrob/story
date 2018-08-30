if ( 'serviceWorker' in navigator ) navigator.serviceWorker.register('/sw.js')

let part = {}
let response = {}
let curinput = null
let voices
let voiceNames
let voiceNamesString

const defaultState = () => JSON.parse(JSON.stringify({
  line: "",
  page: 0,
  raw: "",
  current: "Welcome", 
  previous: "Welcome",
  voice: {
    on: false,
    name: "Google US English",
    pitch: 1,        // 0 to 2
    rate: 1,         // 0.1 to 10
    volume: 1.0,       // 0 to 1
    lang: 'en-US',
  }
}))

let state

const reset = () => state = defaultState()

const loadLocalStorage = () => {
  let s = localStorage.getItem('state')
  if (s) state = JSON.parse(s)
  else reset()
}

const repl = document.querySelector("#repl")
const body = document.querySelector("body")

const promptForInput = _ => {
  repl.innerHTML =  repl.innerHTML + "<span class=prompt>&gt;&nbsp</span>"
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

const save = () => {
  localStorage.setItem('state',JSON.stringify(state))
}

const say = _ => {
  speechSynthesis.cancel()
  let m = new SpeechSynthesisUtterance()
  m.voice = voices.filter(_ => _.name === state.voice.name)[0]
  m.volume = state.voice.volume || 1
  m.pitch = state.voice.pitch || 1
  m.rate = state.voice.rate || 1
  m.lang = state.voice.lang || 'en-US'
  m.text = _
  speechSynthesis.speak(m)
}

const print = _ => {
  if ( _ instanceof Array && state.page < _.length ) {
    repl.innerHTML = "<p class=p>" + _[state.page] + "</p>"
    if (state.voice.on) say(repl.innerText)
    state.page++
    if (state.page == _.length) {
      state.page = 0
      return false
    } else {
      return true
    }
  } else {
    repl.innerHTML = "<p class=p>" + _ + "</p>"
    if (state.voice.on) say(repl.innerText)
  }
  focusLastInput()
  return false
}

// ---------------------------------------------------------

response.Restart = _ => {
  if (_.line === 'restart') {
    speechSynthesis.cancel()
    reset()
    return 'Restarting.'
  }
}

response.ReadAloud = _ => {
  if ( _.line.match(/(read\s+)?(a|out\s+)loud|say\s+something|talk to me/) ) {
    _.voice.on = true
    return "Ok, I'll start talking now. Tell me to be quiet to stop."
  }
  if ( _.line.match(/be\s*quiet|shut\s*up/) ) {
    say('')
    _.voice.on = false
    return "Ok, I'll be quiet."
  }
}

response.AreYouSure = _ => {
  if (_.line.match(/are\s+you\s+sure/)) {
    return "Of course I'm sure."
  }
}

response.Talking = _ => {
  let prev = state.voice.name
  let m = _.line.match(/talk(?:ing)?\s+like\s+(an?\s+)?(\S.+)/)
  if (m !== null) {
    let voice = m[2]
    state.voice.on = true
    switch (voice) {
      case 'girl':
      case 'chick':
      case 'woman':
        state.voice.name = 'Google US English'
        state.voice.rate = 1.01
        state.voice.pitch = 1.1
        break
      case 'boy':
      case 'dude':
      case 'guy':
      case 'man':
        if (navigator.appVersion.match(/mac/i)) {
          state.voice.name = 'Daniel'
        } else {
          state.voice.name = 'English United Kingdom'
        }
        state.rate = 1.0
        state.pitch = 1 
        break
      case 'alien':
      case 'robot':
      case 'bot':
        if (navigator.appVersion.match(/mac/i)) {
          state.voice.name = 'Zarvox'
          break
        }
      default:
        let v = voices.filter( _ => {
          if (_.name !== undefined) {
            if (_.name.toLowerCase().includes(voice)) {
              return _
            }
          }
        })[0]
        state.voice.name = v ? v.name : state.voice.name
    }
    if (state.voice.name === prev) {
      return `Can't find a voice for ${voice}. Sorry.`
    } else {
      return `Ok, I'll start talking like ${m[1]===undefined?'':m[1]}${state.voice.name}. Tell me to be quiet to stop.`
    }
  }
}

response.Voices = _ => {
  if (_.line.match(/((^(show).+)|^)voices$/)) {
    alert(voiceNamesString)
    return ''
  }
}

// ---------------------------------------------------------

repl.onkeydown = _ => {

  let data = (curinput) ? curinput.textContent: ""
  let key = _.key

  //console.log(key)

  // add typing speed detection

  // only a single line of input allowed

  if (key !== "Enter" ) return

  _.preventDefault()

  state.raw = data.trim()
  state.line = state.raw.toLowerCase()

  // TODO: add sudo support

  // catch any responses that have priority over
  // the current part handler, use this for actions
  // such as flipping a coin or showing inventory
  
  for (const [name,method] of Object.entries(response)) {
    let response = method(state)
    if (response) {
      print(response)
      state.current = state.previous
      save()
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
          not defined in the parts file.</i>`)
    return
  } else {
    let c = p(state)
    if (c) {
      state.current = c
      state.previous = previous
    }
    save()
  }

  promptForInput()
}

const triggerEnter = _ => 
  repl.onkeydown(new KeyboardEvent('keypress',{'key':'Enter'}))

window.onclick = _ => focusLastInput()

window.onload = _ => {
  loadLocalStorage()
  triggerEnter()
}

window.speechSynthesis.onvoiceschanged = _ => {
  voices = speechSynthesis.getVoices()
  voiceNames = voices.map( _ => _.name )
  voiceNamesString = voiceNames.join(', ')
}

window.speechSynthesis.getVoices()
