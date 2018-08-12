
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

