function HomePage() {
    const featuredContent = [
        {
            id: 1,
            title: "Top 10 Film del Momento",
            description: "Esplora i film più amati e discussi del momento. Non perderti i titoli che stanno facendo la storia!",
            emoji: "🔥",
        },
        {
            id: 2,
            title: "Serie TV da Non Perdere",
            description: "Immergiti nelle serie TV più seguite e apprezzate dagli spettatori di tutto il mondo.",
            emoji: "📺",
        },
        {
            id: 3,
            title: "Classici del Cinema",
            description: "Riscopri i capolavori intramontabili che hanno definito il cinema come lo conosciamo oggi.",
            emoji: "🎥",
        },
    ];

    return (
        <main>
            {/* Hero Section */}
            <div id="home_page_banner">
                <h1>🎬 Benvenuto su IMDBoo!</h1>
                <p>
                    Un luogo per celebrare le grendi opere Cinatografiche
                </p>
                <p>
                    Usa la <span className="highlight_text">sezione Movies</span> per vedere il nostro <span className="lowlight_text">s</span>folt<span className="lowlight_text">it</span>o catalogo, in seguito guarda le <span className="highlight_text">recensioni</span> dei nostri più cari utenti!
                </p>

                <p>
                    Entra nella nostra community, e <span className="highlight_text"> raccontaci delle tue  avventure </span> <span className="lowlight_text"> (o disavventure) </span> <span className="highlight_text"> cinematografiche</span>, oppure cerca un nuovo Grande Capolavoro da guardare!
                </p>

                <p className="fst-italic">
                    "Il cinema è la scrittura moderna il cui inchiostro è la luce." – Jean Cocteau
                </p>
            </div>

            {/* Featured Content Cards */}
            <div className="homepage-card-container">
                {featuredContent.map((item) => (
                    <div className="homepage-card" key={item.id}>
                        <h2>
                            {item.emoji} {item.title}
                        </h2>
                        <p>{item.description}</p>
                    </div>
                ))}
            </div>
        </main>
    );
}

export default HomePage;



