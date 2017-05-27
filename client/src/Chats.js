export default function Chats({ children }) {
    return (
        <div class="columns">
            <div class="column is-one-third">
                <nav class="panel">
                    <p class="panel-heading">
                        Chats
                    </p>
                    <a class="panel-block is-active">
                        <span class="panel-icon">
                            <i class="fa fa-book"></i>
                        </span>
                        bulma
                    </a>
                    <a class="panel-block is-active">
                        <span class="panel-icon">
                            <i class="fa fa-book"></i>
                        </span>
                        bulma
                    </a>
                </nav>
            </div>
            <div class="column">{children}</div>
        </div>
    );
}
