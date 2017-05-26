function LoginForm() {
    return <div class="columns">
            <form class="column is-offset-one-third is-one-third box">
                <div class="field">
                    <label class="label">E-mail</label>
                    <p class="control">
                        <input class="input" type="email" placeholder="E-mail" />
                    </p>
                </div>
                <div class="field">
                    <label class="label">Password</label>
                    <p class="control">
                        <input class="input" type="password" placeholder="Password" />
                    </p>
                </div>
                <p class="control">
                    <button class="button is-dark is-fullwidth">Login</button>
                </p>
            </form>
        </div>;
}

export default LoginForm;