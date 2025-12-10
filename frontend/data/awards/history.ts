export interface WinnerProfile {
    name: string;
    id?: string; // Links to existing legend ID if available
    country: string; // Country Code (e.g., 'AR', 'PT', 'FR') or Name
    countryFlag?: string;
    club: string;
    clubLogo?: string;
    image: string; // Specific image from that year
    imagePosition?: string; // CSS object-position (e.g. 'center top')
    stats: {
        goals?: number;
        assists?: number;
        matches?: number;
        trophies: string[];
    };
}

export interface ShortProfile {
    name: string;
    country: string;
    club: string;
}

export interface YearEntry {
    year: number;
    winner: WinnerProfile;
    runnerUp: ShortProfile;
    thirdPlace: ShortProfile;
    nominees: string[];
}

export interface AwardHistory {
    awardId: string; // Matches collection.ts id
    years: YearEntry[];
}

// Initial Data: Ballon d'Or History (Recent Era)
export const ballonDorHistory: AwardHistory = {
    awardId: 'ballon-dor',
    years: [
        {
            year: 2023,
            winner: {
                name: "Lionel Messi",
                id: "lionel-messi",
                country: "Argentina",
                club: "Inter Miami / PSG",
                image: "https://media.gettyimages.com/id/1754445816/photo/topshot-fbl-award-ballon-dor-2023.jpg?s=2048x2048&w=gi&k=20&c=YAWuBoZp02vRtE9mwSHJiH6xFzOogS-qjExQxaWNyXE=",
                imagePosition: "center 25%",
                stats: { goals: 38, assists: 25, trophies: ["World Cup", "Ligue 1"] }
            },
            runnerUp: { name: "Erling Haaland", country: "Norway", club: "Man City" },
            thirdPlace: { name: "Kylian Mbappé", country: "France", club: "PSG" },
            nominees: ["Kevin De Bruyne", "Rodri", "Vinicius Jr", "Julian Alvarez", "Victor Osimhen", "Bernardo Silva", "Luka Modric"]
        },
        {
            year: 2022,
            winner: {
                name: "Karim Benzema",
                country: "France",
                club: "Real Madrid",
                image: "https://media.gettyimages.com/id/1435682850/photo/real-madrid-cf-v-sevilla-fc-laliga-santander.jpg?s=2048x2048&w=gi&k=20&c=qNEprkvzh2sOMuShskAjWyRgLludWym4Z0qj00Y9HCY=",
                imagePosition: "center 25%",
                stats: { goals: 44, assists: 15, trophies: ["Champions League", "La Liga", "Nations League"] }
            },
            runnerUp: { name: "Sadio Mané", country: "Senegal", club: "Liverpool/Bayern" },
            thirdPlace: { name: "Kevin De Bruyne", country: "Belgium", club: "Man City" },
            nominees: ["Robert Lewandowski", "Mohamed Salah", "Kylian Mbappé", "Thibaut Courtois", "Vinicius Jr", "Luka Modric", "Erling Haaland"]
        },
        {
            year: 2021,
            winner: {
                name: "Lionel Messi",
                id: "lionel-messi",
                country: "Argentina",
                club: "PSG / Barcelona",
                image: "https://media.gettyimages.com/id/1356249176/photo/ceremony-at-theatre-du-chatelet-in-paris.jpg?s=2048x2048&w=gi&k=20&c=W-N30PAxOaHgpVPrJ6FEPRfbsp4oBXtlT0Wc72SB5tg=",
                imagePosition: "center 25%",
                stats: { goals: 41, assists: 17, trophies: ["Copa América", "Copa del Rey"] }
            },
            runnerUp: { name: "Robert Lewandowski", country: "Poland", club: "Bayern Munich" },
            thirdPlace: { name: "Jorginho", country: "Italy", club: "Chelsea" },
            nominees: ["Karim Benzema", "N'Golo Kanté", "Cristiano Ronaldo", "Mohamed Salah", "Kevin De Bruyne", "Kylian Mbappé", "Gianluigi Donnarumma"]
        },

        {
            year: 2019,
            winner: {
                name: "Lionel Messi",
                id: "lionel-messi",
                country: "Argentina",
                club: "Barcelona",
                image: "https://media.gettyimages.com/id/1186208145/photo/fbl-ballon-dor-2019-award.jpg?s=2048x2048&w=gi&k=20&c=aLiENWPPrGMQQPoah0bhpeJNt0zFDGn9sVRPb5knv7c=",
                imagePosition: "center 25%",
                stats: { goals: 51, assists: 22, trophies: ["La Liga"] }
            },
            runnerUp: { name: "Virgil van Dijk", country: "Netherlands", club: "Liverpool" },
            thirdPlace: { name: "Cristiano Ronaldo", country: "Portugal", club: "Juventus" },
            nominees: ["Sadio Mané", "Mohamed Salah", "Kylian Mbappé", "Alisson", "Robert Lewandowski", "Bernardo Silva", "Riyad Mahrez"]
        },
        {
            year: 2018,
            winner: {
                name: "Luka Modrić",
                country: "Croatia",
                club: "Real Madrid",
                image: "https://media.gettyimages.com/id/1068076806/photo/topshot-fbl-fra-ballondor-gala.jpg?s=2048x2048&w=gi&k=20&c=FCswzojop77fMDnFFfXZjYGHNzNYHlv3B_dBVJxhUvo=",
                imagePosition: "center 25%",
                stats: { goals: 2, assists: 11, trophies: ["Champions League", "World Cup Runner-up"] }
            },
            runnerUp: { name: "Cristiano Ronaldo", country: "Portugal", club: "Real Madrid/Juventus" },
            thirdPlace: { name: "Antoine Griezmann", country: "France", club: "Atletico Madrid" },
            nominees: ["Kylian Mbappé", "Lionel Messi", "Mohamed Salah", "Raphael Varane", "Eden Hazard", "Kevin De Bruyne", "Harry Kane"]
        },
        {
            year: 2017,
            winner: {
                name: "Cristiano Ronaldo",
                id: "cristiano-ronaldo",
                country: "Portugal",
                club: "Real Madrid",
                image: "https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/12/08/07/cristiano-ronaldo.jpg",
                imagePosition: "center 25%",
                stats: { goals: 53, assists: 13, trophies: ["Champions League", "La Liga", "CWC", "Super Cup"] }
            },
            runnerUp: { name: "Lionel Messi", country: "Argentina", club: "Barcelona" },
            thirdPlace: { name: "Neymar", country: "Brazil", club: "Barcelona/PSG" },
            nominees: ["Gianluigi Buffon", "Luka Modric", "Sergio Ramos", "Kylian Mbappé", "N'Golo Kanté", "Robert Lewandowski", "Harry Kane"]
        },
        {
            year: 2016,
            winner: {
                name: "Cristiano Ronaldo",
                id: "cristiano-ronaldo",
                country: "Portugal",
                club: "Real Madrid",
                image: "https://media.gettyimages.com/id/629473660/photo/cristiano-ronaldo-announced-as-winner-of-the-ballon-dor-2016.jpg?s=2048x2048&w=gi&k=20&c=wIQJBQrokCLCzrcQrTG8VxVXjTl0UTR06EKRfdkvPmA=",
                imagePosition: "center 25%",
                stats: { goals: 55, assists: 16, trophies: ["Euro 2016", "Champions League", "CWC"] }
            },
            runnerUp: { name: "Lionel Messi", country: "Argentina", club: "Barcelona" },
            thirdPlace: { name: "Antoine Griezmann", country: "France", club: "Atletico Madrid" },
            nominees: ["Luis Suarez", "Neymar", "Gareth Bale", "Riyad Mahrez", "Jamie Vardy", "Pepe", "Gianluigi Buffon"]
        },
        {
            year: 2015,
            winner: {
                name: "Lionel Messi",
                id: "lionel-messi",
                country: "Argentina",
                club: "Barcelona",
                image: "https://media.gettyimages.com/id/504563316/photo/topshot-fbl-fifa-ballondor-gala.jpg?s=2048x2048&w=gi&k=20&c=ZsxxczKnsei2dH0pffQNFFnlJCzZVlqJBPX2v4Mb-n0=",
                imagePosition: "center 25%",
                stats: { goals: 52, assists: 26, trophies: ["Champions League", "La Liga", "Copa del Rey (Treble)"] }
            },
            runnerUp: { name: "Cristiano Ronaldo", country: "Portugal", club: "Real Madrid" },
            thirdPlace: { name: "Neymar", country: "Brazil", club: "Barcelona" },
            nominees: ["Robert Lewandowski", "Luis Suarez", "Thomas Muller", "Manuel Neuer", "Eden Hazard", "Andres Iniesta", "Alexis Sanchez"]
        },
         {
            year: 2014,
            winner: {
                name: "Cristiano Ronaldo",
                id: "cristiano-ronaldo",
                country: "Portugal",
                club: "Real Madrid",
                image: "https://media.gettyimages.com/id/461443228/photo/fifa-ballon-dor-gala-2014.jpg?s=2048x2048&w=gi&k=20&c=FkrWVipgosJeUV1Ivwh5syK-cu5HVWaNL6ODr840au8=",
                imagePosition: "center 25%",
                stats: { goals: 61, assists: 22, trophies: ["Champions League", "Copa del Rey", "UEFA Super Cup"] }
            },
            runnerUp: { name: "Lionel Messi", country: "Argentina", club: "Barcelona" },
            thirdPlace: { name: "Manuel Neuer", country: "Germany", club: "Bayern Munich" },
            nominees: ["Arjen Robben", "Thomas Muller", "Philipp Lahm", "Neymar", "James Rodriguez", "Toni Kroos", "Angel Di Maria"]
        }
    ]
};

// Aggregated export
export const allAwardHistories: Record<string, AwardHistory> = {
    'ballon-dor': ballonDorHistory
};
