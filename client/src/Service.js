const API = 'http://localhost:3000/';

function getChats() {
    return fetch(`${API}chats`)
        .then(_verifyResponse, _handleError);
}

function getChat(id) {
    return fetch(`${API}chat/${id}`)
        .then(_verifyResponse, _handleError);
}

function sendMessage(message) {

    var post = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
    };

    return fetch(`${API}sendMessage`, post)
        .then(_verifyResponse, _handleError);
}

function _verifyResponse(res) {
    let contentType = res.headers.get('content-type');

    if (contentType && contentType.indexOf('application/json') !== -1) {
        return res.json();
    } else {
        _handleError({
            message: 'Response was not JSON'
        });
    }
}

function _handleError(error) {
    console.error('An error occurred:', error);
    throw error;
}

const ApiService = {
    getChats,
    getChat, 
    sendMessage
};
export default ApiService;