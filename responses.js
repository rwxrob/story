
response.Name = _ => {
  if (_.line.startsWith('my name is')) {
    _.name = _.raw.substring(11).trim()
    return `Ok, changed your name to ${_.name}.`
  }
}

response.Wow = _ => {
  if (_.line.match(/^(wow|cool|sick|awesome|radical|rad|phat)$/)) {
    return `I <i>know</i> right?!`
  }
}

response.Life = _ => _.line.includes('meaning of life') ? "42" : ""

response.End = _ => _.previous === 'TheEnd' ? `Zzzzzz.` : ''

response.FlipCoin = _ => {
  if (_.line.match(/(flip(\s+a)?\s+)?coin/)) {
    let i = Math.floor(Math.random()*2)
    if (i === 0) {
      return `You flip <b><i>HEADS</i></b>. <p><img src=assets/heads.png height=220px></p>`
    } else {
      return `You flip <b><i>TAILS</i></b>.<p><img src=assets/tails.png height=220px></p>`
    }
  }
}