function make_item(tag, styleName, content) {
    var item = document.createElement(tag);
    if (styleName.length > 0)
        item.className = styleName;
    if (content.length > 0)
        item.innerHTML = content;
    return item;
}

function make_media_body(header, text) {
    var mediaBody = make_item('div', 'media-body', '');
    mediaBody.appendChild(make_item('h4', 'media-heading', header));
    mediaBody.appendChild(make_item('span', '', text));
    return mediaBody;
}

function make_avatar(user) {
    var avatar = make_item('div', 'media-left media-middle', '');
    var image = make_item('img', 'img-circle media-object', '');
    image.src = user.avatar;
    image.alt = user.name;
    avatar.appendChild(image);
    return avatar;
}

function make_header(message) {
    return message.user.name + ', ' + new Date().toLocaleTimeString();
}

function make_message(message) {
    var item = make_item('div', 'media chat_message', '');
    item.appendChild(make_avatar(message.user));
    item.appendChild(make_media_body(make_header(message), message.text));
    return item;
}

function clear_messages(messages) {
    var maximumMessages = 20;
    if (messages.childElementCount > maximumMessages)
        messages.removeChild(messages.childNodes[0]);
}

function Chat(user) {
    var user = user;
    var socket = io();

    socket.on('connect', function(){
        socket.emit('user_connected', {user: user});
    });

    socket.on('message', function(message) {
        var messages = document.getElementById('messages');
        clear_messages(messages);
        messages.appendChild(make_message(message));
        window.scrollTo(0, document.body.scrollHeight);
    });

    this.send = function(text) {
        socket.emit('user_send_message', {user: user, text: text});
    };
}