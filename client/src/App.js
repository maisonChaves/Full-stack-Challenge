export default function App({ children }) {
    return (
        <div>
            <section class="hero is-dark">
                <div class="hero-body">
                    <div class="container">
                        <h1 class="title">
                            Maison Chaves Bot
                    </h1>
                        <h2 class="subtitle">
                            Welcome to chat bot manager.
                    </h2>
                    </div>
                </div>
            </section>
            {children}
        </div>
    );
}
