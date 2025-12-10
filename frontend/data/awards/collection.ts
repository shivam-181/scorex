export interface Award {
    id: string;
    name: string;
    category: 'Global' | 'Europe' | 'FIFA' | 'UEFA' | 'Youth' | 'Goalkeeper' | 'Special';
    established: number;
    description: string;
    image: string; // Trophy image
    logo: string; // Official logo
    logoPosition?: string; // CSS object-position value (e.g. 'center top')
    colorTheme: string; // Tailwind class for text
    colorCode: string; // Hex code for shadows/glows
}

export const awards: Award[] = [
    {
        id: "ballon-dor",
        name: "Ballon d'Or",
        category: "Global",
        established: 1956,
        description: "The most prestigious individual award in football, presented annually by France Football to the best player in the world.",
        image: "https://media.gettyimages.com/id/1244039852/photo/fbl-award-ballon-dor-2022.jpg?s=2048x2048&w=gi&k=20&c=C9E6-V_TkiDeZH_oJbP7Gb2CrPqaegBnbsek-lshcDQ=",
        logo: "https://i.pinimg.com/1200x/cb/12/f8/cb12f84bf6ac2bc52758388b1035c7c9.jpg",
        colorTheme: "text-yellow-500",
        colorCode: "#EAB308"
    },
    // ... (lines omitted)
// ...
    {
        id: "yashin-trophy",
        name: "Yachine Trophy",
        category: "Goalkeeper",
        established: 2019,
        description: "Presented annually by France Football to the best performing goalkeeper.",
        image: "https://pictures.tribuna.com/image/fda59c32-630b-4a7b-bcee-ed80d428d4d7",
        logo: "https://i.namu.wiki/i/-4aFfhBwdrTvfv9mCGxQ3_PVOhDgHJ6Za71zsHwn9uBZhiLAKUPIyYn85j4OlvCR8FOE0cGfRbDb6C4N1eU0Kw.webp",
        logoPosition: "center 25%",
        colorTheme: "text-orange-400",
        colorCode: "#FB923C"
    },
    {
        id: "fifa-the-best-men",
        name: "FIFA The Best",
        category: "FIFA",
        established: 2016,
        description: "Awarded by FIFA to the best men's player of the year, decided by votes from captains, coaches, media, and fans.",
        image: "https://media.gettyimages.com/id/865509906/photo/the-best-fifa-football-awards-show.jpg?s=2048x2048&w=gi&k=20&c=tfxc8fPL6jeO3osv9xs46sQQ0YDCl-GOnEPv2uE3ZWk=",
        logo: "https://www.icons.com/media/catalog/category/The_Best_FIFA_Football_Awards_4.png",
        colorTheme: "text-emerald-400",
        colorCode: "#34D399"
    },
    {
        id: "uefa-mens-player",
        name: "UEFA Men's Player of the Year",
        category: "UEFA",
        established: 2011,
        description: "Recognizes the best player playing for a football club in Europe, based on performances in all competitions.",
        image: "https://media.gettyimages.com/id/1649045485/photo/portraits-session-2023-24-european-club-football-season-kick-off.jpg?s=2048x2048&w=gi&k=20&c=qUKOHiLqHbNuLQMDIdvE6OKGZBw-0a5q7edMc_0Pu70=",
        logo: "https://editorial.uefa.com/resources/0254-0e99d68cb151-6fb9a729767e-1000/the_uefa_men_s_player_of_the_year_award_trophy.jpeg",
        colorTheme: "text-blue-400",
        colorCode: "#60A5FA"
    },
    {
        id: "golden-boot",
        name: "European Golden Shoe",
        category: "Europe",
        established: 1968,
        description: "Awarded to the leading goalscorer in league matches from the top division of a European national league.",
        image: "https://media.gettyimages.com/id/1936793726/photo/soccer-antwerp-golden-shoe-celebration.jpg?s=2048x2048&w=gi&k=20&c=y--aFXs0a7hGQn3W4xAhUAGUa8sQPOOajyQLdtr4L30=",
        logo: "https://upload.wikimedia.org/wikipedia/en/2/2b/Golden_Shoe%2C_Lionel_Messi_2012-2013.jpg",
        colorTheme: "text-amber-600",
        colorCode: "#D97706"
    },
    {
        id: "puskas-award",
        name: "FIFA Puskás Award",
        category: "FIFA",
        established: 2009,
        description: "Awarded to the male or female player judge to have scored the most aesthetically significant goal of the year.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/FIFA_Puskas_Award_2009_CR7_Museum.jpg/1200px-FIFA_Puskas_Award_2009_CR7_Museum.jpg",
        logo: "https://m.media-amazon.com/images/M/MV5BM2RjYjU2YzMtYzkyMy00OTk1LTgxMmItMjA1YWI4Y2IxMjA4XkEyXkFqcGc@._V1_.jpg",
        colorTheme: "text-purple-400",
        colorCode: "#A78BFA"
    },
    {
        id: "golden-boy",
        name: "Golden Boy",
        category: "Youth",
        established: 2003,
        description: "Given by sports journalists to a young footballer playing in Europe perceived to have been the most impressive during a calendar year.",
        image: "https://media.gettyimages.com/id/1237319214/photo/fc-barcelona-v-elche-cf-la-liga-santander.jpg?s=2048x2048&w=gi&k=20&c=p6RC_RbjNoeQehQhS7taoSyJsFnk8bjanMKwPYkgcgs=",
        logo: "https://pbs.twimg.com/media/FflWTKsWAAEyMyH.jpg",
        colorTheme: "text-yellow-600",
        colorCode: "#CA8A04"
    },

    {
        id: "world-cup-golden-ball",
        name: "World Cup Golden Ball",
        category: "Global",
        established: 1982,
        description: "Presented to the best player at each FIFA World Cup finals, with a shortlist drawn up by the FIFA technical committee.",
        image: "https://media.gettyimages.com/id/1450123724/photo/final-fifa-world-cup-qatar-2022.jpg?s=2048x2048&w=gi&k=20&c=jlKkms6kWStNE1zfF_rxZ4QcQYJxYr_TydQTNV0AAyk=",
        logo: "https://bsg-i.nbxc.com/product/03/c3/3b/3062fd64440f4d316adb1b94db.png",
        colorTheme: "text-yellow-400",
        colorCode: "#FACC15"
    }
];
