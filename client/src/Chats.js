import Inferno, { linkEvent } from 'inferno';
import Component from 'inferno-component';

import Service from './Service';
import Chat from './Chat';

function getChat(obj) {
    const id = obj.id;
    const instance = obj.instance;

    instance.setState({
        active: id
    });

    Service.getChat(id)
        .then(
        res => {
            instance.setState({
                messages: res
            });
        },
        error => {
            instance.setState({
                error: error
            });
        });

}

class Chats extends Component {

    constructor() {
        super();

        this.state = {
            chats: []
        };
    }

    componentDidMount() {
        Service.getChats()
            .then(
            res => {
                this.setState({
                    chats: res
                });
            },
            error => {
                this.setState({
                    error: error
                });
            });
    }

    render(children, state) {
        return (
            <div class="container">
        <div class="columns">
            <div class="column is-one-third">
                <nav class="panel">
                    <p class="panel-heading">
                        Chats
                    </p>

                    {
                        state.chats.length > 0 ? (
                            state.chats.map((chat) => (
                                <a 
                                    className={state.active === chat.id ? 'panel-block is-active' : 'panel-block'}
                                    onClick={linkEvent({id: chat.id, instance: this}, getChat)}>
                                    {chat.first_name + ' ' + chat.last_name}
                                </a>
                            ))
                        ) : (
                                <a class="panel-block is-active">
                                    Loading...
                                </a>
                            )
                    }

                </nav>
            </div>
            <div class="column">
                <Chat messages={state.messages} chat={state.active}/>
            </div>
        </div></div>)
    }
}

export default Chats;