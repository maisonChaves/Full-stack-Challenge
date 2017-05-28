const API = 'http://localhost:3000/';

function getChats() {
    return fetch(`${API}chats`)
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
    getChats
};
export default ApiService;