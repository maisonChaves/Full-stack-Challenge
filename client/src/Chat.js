import Component from 'inferno-component';

import Service from './Service';

class Chat extends Component {

    constructor(props) {
        super(props);

        this.state = {
            text: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ chat: nextProps.chat });
        this.setState({ messages: nextProps.messages });
    }

    handleChange(event) {
        this.setState({ text: event.target.value });
    }

    handleSubmit(event) {
        
        var message = {
            "chat_id": this.state.chat,
            "text": this.state.text
        }

        Service.sendMessage(message)
        .then(
        res => {
            this.state.messages.push(res);
            this.setState({text: ""});
        },
        error => {
            this.setState({
                error: error
            });
        });

        event.preventDefault();
    }

    render(props) {
        //let messages = props.messages;
        var chatClass = 'chat box column is-two-thirds';
        return (
            <div>
                <div div class="columns is-multiline">
                    {
                        this.state.messages &&
                        this.state.messages.map((message) => (
                            <div className={message.from.username ? chatClass + ' has-text-right is-offset-one-third' : chatClass}>
                                <strong>{message.from.username ? message.from.username : message.from.first_name + ' ' + message.from.last_name} </strong>
                                <br />
                                {' ' + message.text}
                            </div>
                        ))
                    }
                </div>
                {
                    this.state.messages &&
                    <footer class="footer is-fullwidth">
                        <form onSubmit={this.handleSubmit}>
                            <div class="field">
                                <p class="control">
                                    <textarea
                                        class="textarea"
                                        placeholder="Type your message here..."
                                        value={this.state.text}
                                        onInput={this.handleChange}
                                    ></textarea>
                                </p>
                            </div>
                            <div class="field is-grouped">
                                <p class="control">
                                    <input class="button is-primary" type="submit" value="Submit" />
                                </p>
                            </div>
                        </form>
                    </footer>}
            </div>);
    }
}

export default Chat;