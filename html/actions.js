
const HEADS = `
You flip <b><i>HEADS</i></b>.
<p><img src=assets/heads.png height=200px></p>`

const TAILS = `
You flip <b><i>TAILS</i></b>.
<p><img src=assets/tails.png height=200px></p>`

action.FlipCoin = _ => {
  if (_.line == 'flip coin' || _.line == 'flip') {
    let i = Math.floor(Math.random()*2)
    if (i === 0) print(HEADS) 
    else print(TAILS)
    return true
  }
}
