
part.Welcome = _ => { 
    print('Welcome to this story game!')
    print('(Enter to continue)')
    return 'Hello'
}

part.Hello = _ => {
    text = `Hello <b>there</b>`
    text += _.greeted ? ', again.' : '.'
    _.greeted = true
    print(text)
    return 'Field'
}

part.Field = _ => {
    print("You find youself in a field.")
    return 'Hello'
}

