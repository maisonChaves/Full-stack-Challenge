import Component from 'inferno-component';

class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.FB = props.fb;

        this.state = {
            message: "",
            value: ""
        };

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.FB.Event.subscribe('auth.logout',
            this.onLogout.bind(this));
        this.FB.Event.subscribe('auth.statusChange',
            this.onStatusChange.bind(this));
    }

    onStatusChange(response) {
        console.log(response);
        var self = this;

        if (response.status === "connected") {
            this.FB.api('/me', function (response) {
                var message = "Welcome " + response.name;
                self.setState({
                    message: message
                });
            })
        }
    }

    onLogout(response) {
        this.setState({
            message: ""
        });
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
        console.log(event.target.value);
    }

    render(props) {
        return (<div class="columns">
            <form class="column is-offset-one-third is-one-third box">
                <div class="field">
                    <label class="label">E-mail</label>
                    <p class="control">
                        <input class="input" type="email" value={this.state.value} onInput={this.handleChange} placeholder="E-mail" />
                    </p>
                </div>
                <div class="field">
                    <label class="label">Password</label>
                    <p class="control">
                        <input class="input" type="password" placeholder="Password" />
                    </p>
                </div>
                {!this.state.message &&
                    <div class="fb-login-button is-fullwidth" data-max-rows="1" data-size="large" data-button-type="continue_with" data-show-faces="false" data-auto-logout-link="false" data-use-continue-as="true"></div>
                }
                <div>{this.state.message}</div>
            </form>
        </div>);
    }
}

export default LoginForm;