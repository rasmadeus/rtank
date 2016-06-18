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
    return message.user.name + ', ' + message.time;
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

function add_message(message) {
    var messages = document.getElementById('messages');
    clear_messages(messages);
    messages.appendChild(make_message(message));
}

function Chat() {
    this.socket = io();

    this.socket.on('connect', function(){
         socket.emit('connect1', {user: '{{user.name()}}' });
    });

    this.socket.on('message', add_message);
}

Chat.prototype.send = function(user, text) {
    this.socket.emit('message1', {user: user, text: text});
};
