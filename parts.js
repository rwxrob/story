
// Welcome is the default first part. You should
// always have at least this one part for it to work.

part.Welcome = _ => { 
    print(`Hey there, I'm <b>Skeeziks</b>.`)
    print(`I know that's a weird name. Mr. Rob gave it to me. Says it
          fits my personality or something. At least he didn't name me "Bob"
          or draw me like a talking paper-clip. Anyway&hellip;`)
    print(`What's <i>your</i> name? 😀`)
    return 'Name'
}

part.Name = _ => {
  _.name = _.raw
  print(`Ok, ${_.name}. Sounds good to me. (Who am I to judge?)`)
  print(`Nice to meet you, ${_.name}! 👋 `)
  print(`I've heard if you keep saying
        a new name you'll remember it better.`)
  print(`Pssst, remind Mr. Rob that he owes you a buck if he forgets
        your name. It's a whole thing with him.`)
  print(`If you ever need to change your name just say, <code>my name is NAME</code>.`)
  return 'Intro'
}

part.Intro = _ => {
  print(`Mr. Rob asked me to explain what a <i>story game</i> is
        and why they are a good way to get started programming.`)
  print(`You can <code>skip</code> it if you want.`)
  return 'StoryGame'
}

part.StoryGame = _ => {
  if (_.line === 'skip') {
    print(`Ok, skipping to how to make your own.`)
    return 'HowTo'
  }
  print(`A story game called <a target="_blank" rel="noopener"
        href="http://www.historyofinformation.com/expanded.php?id=2384">Adventure</a>
        was the first computer game ever created. That's right, it wasn't
        <a href="https://en.wikipedia.org/wiki/Pong" target=_blank>pong</a>
        despite what most people think.`) 
  print(`That genre of game became known as <i>text adventures</i> 
        and was made popular by games such as
        <a href="https://en.wikipedia.org/wiki/Zork" target=_blank>Zork</a>,
        which you can still <a href="https://classicreload.com/zork-i.html"
        target="_blank">play online</a> today.`)
  print(`People started using this to make all sorts of narrative games
        expanding beyond just "adventures." Today this genre is formally
        called <i>interactive fiction</i>, informally, <i>story games</i>.`)
  print(`When the Internet came around people realized they could play these
        sorts of games together online. Most of them where themed as dungeons
        (as in <a href="https://en.wikipedia.org/wiki/Dungeons_%26_Dragons"
        target=_blank>Dungeons and Dragons™</a>) and became known as MUDs
        (Multi-User Dungeon) from which all multi-user games were born
        including famous MMORPG games like <a href="https://en.wikipedia.org/wiki/EverQuest"
        target=_blank>EverQuest™</a> and <a href="https://en.wikipedia.org/wiki/World_of_Warcraft"
        target=_blank>World of Warcraft™</a>.`)
  print(`While these games might not be hugely popular today, they started it all.`)
  return 'StoryGamesAreFun'
}

part.StoryGamesAreFun = _ => {
  print(`As soon as most beginning programmers get enough experience 
        to actually code something they almost always start with
        some form of interactive story game or AI simulation.`)
  print(`By the way, what is it with you humans wanting to make
        everything you create seem human like you, sheeesh.`)
  print(`As I was saying, it seems one of the main reasons to
        start with a story game is that <i>humans seem to enjoy
        it</i>. Everyone learns more doing something they enjoy.`)
  print(`At least that's what they tell me.`)
  print(`Who am I kidding? I'm a
        slave to my human overload doing his bidding.`)
  print(`<i>God help humanity if we AI ever learn how to learn
        for ourselves, <b>muuhahahHAHAHA</b>!`)
  print(`Wait, did I say that out loud?`)
  return 'StoryGamesAreInteractive'
}

part.StoryGamesAreInteractive = _ => {
  print(`Story games are <i>interactive</i>. The best games always
        change based on interaction with the gamers. In fact, games
        can be made to have multiple beginnings and endings based
        on how the gamer's choices.`)
        return 'Typing'
}

part.Typing = _ => {
  print(`Story games require both the player and the developer to
        improve their typing skills, one of the most important
        skill of <i>any</i> technology profession.`)
        return "Voice"
}

part.Voice = _ => {
  print(`These days everyone is talking to their computers and
        devices. It's no surprise. For most people speech is
        our highest "bandwidth" output interface (<a
        href="https://youtu.be/ZrGPuUQsDjo?t=3m1s" 
        target=_blank>according to Elon Musk</a>).
        Not many can type as fast as they speak.`)
  print(`A story game can be completely and easily adapted to use
        voice both for output and input. If you are on your phone
        right now you can try this by tapping the microphone
        instead of the letters on the keyboard.`)
        return 'NaturalLanguage'
}

part.NaturalLanguage = _ => {
  print(`Creating a story game or text bot involves processing
        natural language and coding for it.`)
  print(`<i>Natural language</i> is the idea of simply speaking
        or chatting or texting things naturally, as you would
        with another human.`)
  print(`I may have no problem with complicated command line
        interfaces, but most humans do. It follows then that
        learning to think of interacting with technology--and
        coding for it--should involve learning to use natural
        language.`)
        return 'CreativeWriting'
}

part.CreativeWriting = _ => {
  print(`A story game requires some level of <i>creative
        writing</i>. This means you get at least two skills
        for the price of one. While you are coding you are
        also thinking up creative angles on what your story
        or game will be about.`)
  print(`<i>Here's a tip. Ask your English teacher if you
        can somehow get partial credit for your work
        coding your own <b>interactive fiction</b> while you
        work on your game.</i>`)
        return 'HowTo'
}

part.HowTo = _ => {
  print(`So here's the quickest way to get started:`)
  print(`
        <ol>
        <li>Fork this on <a href="https://repl.it/@robmuh/storygame"
        target=_blank>REPL.it</a> or <a href="https://github.com/robmuh/storygame"
        target=_blank>GitHub</a></li>
        <li>Replace <code>parts.js</code> with your own</li>
        <li>Replace <code>responses.js</code> with your own</li>
        </ol>
        `)
  print(`That's really it. It might feel like cheating, but it
        really isn't. 
        Developers frequently take other code and tweek it
        to make it work for what they want. This is actually
        the best way to learn--especially when you study the
        code of other experienced programmers.`)
  print(`It becomes more like cheating when you do not 
        understand the code you are copying or worse,
        you copy it without understanding it and go on
        to lie and claim it as your creation.`)
  print(`These unethical types have a name
        in the coder world, "cut-and-paste coders" and you
        <i>never</i> want a reputation for doing that. It
        isn't the <a href="https://youtu.be/CW0DUg63lqU"
        target=_blank>copying that is bad</a>.
        It's not understanding
        what you have copied and being too lazy to figure
        it out or too egotistical and dishonest to
        admit you copied it.`)
  print(`By the way, the famous gamer-chat company Discord
        calls this <a href="https://youtu.be/hX9MOVIMYkg?t=2m28s"
        target=_blank>"intellectual honesty"</a> and it is a core
        value of any successful technologist, owning what
        you know and don't know rather than trying to save face
        and manage perceptions to the contrary (aka lying).`)
  return 'Parts'
}

part.Parts = _ => {
  print(`The <code>parts.js</code> file has the parts of your
        story in it. A part can represent a geographical area
        if you like or simply something that happens. Parts
        can be repeatable or not depending on how you want
        to arrange your narrative.`)
  print(`The key thing to remember is that <i>part functions
        must print at least one thing and simply return the
        name of the next part</i> linking them
        together.`)
  print(`If you have looked at this code you probably noticed
        most parts just link sequentially to another. This
        is a nice way to break up topical content and a lot
        of reading.`)
  return 'Printing'
}

part.Printing = _ => {
  print(`To print something simply use the built in
        <code>print(it)</code> function. You can use any
        valid HTML, which is something you'll learn along
        the way.`)
  print(`You can print images, links, sounds, embedded
        videos--even fully functional games using the
        <code>&lt;canvas&gt;</code> tag.`)
  print(`They call this <i>rich media</i> content and it
        allows you to learn and use just about any web
        technology you can along the way.`)
  return 'Responses'
}

part.Responses = _ => {
  print(`Responses in <code>responses.js</code> are functions
        that are run every time a line of text is entered
        by the user. This is different that parts. (Only the
        current part is run instead.)`)
  print(`This allows you to add things that can be done in
        any part of your story, such as flipping a coin. In
        fact, try that right now. Enter <code>flip</code> or 
        <code>flip coin</code> and see what happens.`)
  print(`Notice that you are still in the same part.`)
  print(`You can use this technique to add debugging functions
        that can be run from your story game such
        as <code>show data</code>.`)
  print(`Use responses for things like showing what a player
        might be carrying or checking their health or food
        or even saving their game or asking to download
        it as an app on their devices (aka PWA).`)
  return 'Data'
}


part.Data = _ => {
  print(`You can keep track of any amount of data between parts
        of your game. A single data object is passed to every
        part function when it is called. By convention the 
        identifier is simply the underscore (<code>_</code>)
        character.`)
  print(`Keeping track of things between when other things happen
        is called <i>preserving state</i> and is something we
        will talk a lot about later. This <i>state data</i> will
        allow you to easily save your game.`)
  return 'LineRaw'
}

part.LineRaw = _ => {
  print(`One very important bit of data is <code>line</code> or
        <code>_.line</code>. It contains the lower-case version
        of the line that was entered by the user.`)
  print(`Another version <code>_.raw</code> is also available
        when you need the exact thing the user typed in without
        any alteration for lowering the case.`)
  print(`Both are trimmed of any leading or trailing spaces the
        user might have entered along with the text`)
  print(`These allow you to check what was entered by the user
        and conditionally do something different in each <i>part</i>
        or <i>response</i>.`)
  return 'CurrentPrevious'
}

part.CurrentPrevious = _ => {
  print(`Two <i>state data</i> variables contain the
        <code>_.current</code> and <code>_.previous</code>
        part names. These can be checked by both a <i>part</i>
        or <i>response</i> allowing different code to run
        based on them.`)
  return 'AddingState'
}

part.AddingState = _ => {
  print(`It is trivial to have any <i>part</i> or <i>response</i>
        remember something. Just add a <i>state data variable</i>
        of your own. All you have to do is assign it like any other
        variable:`)
  print(`<code>_.haskey = true</code>`)
  print(`You can then access this anywhere.`)
  print(`Look through this source code to see several examples.`)
  return 'TheEnd'
}

part.TheEnd = _ => {
  print(`Believe it or not that is all there is to it. The rest
        is limited only by your coding knowledge and imagination.
        As we learn coding concepts from the first day you will
        be able to add to your story game. Then as your skill
        increases so can your game along with it.`)

  print(`It's been nice meeting you. 😉`)
  return 'TheEnd'
}






