
const HEADS = `
You flip <b><i>HEADS</i></b>.
<p><img src=assets/heads.png height=200px></p>`

const TAILS = `
You flip <b><i>TAILS</i></b>.
<p><img src=assets/tails.png height=200px></p>`

response.FlipCoin = _ => {
  if (_.line == 'flip coin' || _.line == 'flip') {
    let i = Math.floor(Math.random()*2)
    if (i === 0) return HEADS
    return TAILS
  }
}

response.Life = _ => _.line.includes('meaning of life?') ? "42" : ""

response.Name = _ => {
  if (_.line.startsWith('my name is')) {
    _.name = _.raw.substring(11).trim()
    return `Ok, changed your name to ${_.name}.`
  }
}

response.Wow = _ => _.line.startsWith('wow') ? `I <i>know</i> right?!` : ''

response.End = _ => _.previous === 'TheEnd' ? `Zzzzzz.` : ''

response.Restart = _ => {
  if (_.line === 'restart') {
    _.current = 'Welcome'
    return 'Restarting.'
  }
}

response.ShowData = _ => {
  if (_.line === 'show data') {
    return '<pre>'+JSON.stringify(_,null,2)+'</pre>'
  }
}
