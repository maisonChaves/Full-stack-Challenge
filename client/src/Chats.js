import Inferno from 'inferno';
import Component from 'inferno-component';

import Service from './Service';

class Chats extends Component {
//export default function Chats({ children }) {

    constructor() {
        super();

        // Set default loading state to false
        this.state = {
            chats: []
        };
    }

    componentDidMount() {
        // GET list of dinosaurs from API
        Service.getChats()
            .then(
            res => {
                // Set state with fetched dinos list
                this.setState({
                    chats: res
                });
            },
            error => {
                // An error occurred, set state with error
                this.setState({
                    error: error
                });
            });
    }

    render(children, state) {
        return (<div class="columns">
            <div class="column is-one-third">
                <nav class="panel">
                    <p class="panel-heading">
                        Chats
                    </p>

                    {
                        state.chats.length > 0 ? (
                            state.chats.map((chat) => (
                                <a class="panel-block is-active">
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
            <div class="column">{children}</div>
        </div>)
    }
}

export default Chats;