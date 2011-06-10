function onPlayClicked()
{
    var textbox = document.getElementById("nickname");
    
    if(textbox.value.length == 0) {
        alert("You must enter a nickname!");
        return false;
    }
    
    var valid = " abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for(var i = 0; i < textbox.value.length; i++) {
        if(valid.indexOf(textbox.value[i]) == -1) {
            alert("Your nickname contains invalid characters.");
            return false;
        }
    }
    
    var menu = document.getElementById("menuWidget");
    menu.style["visibility"] = "hidden";
    startGame(textbox.value);
    
    return true;
}
