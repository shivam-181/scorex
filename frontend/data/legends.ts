export interface Legend {
  id: string;
  name: string;
  fullName: string;
  nationality: string;
  region: 'South America' | 'Europe';
  position: 'Forward' | 'Midfielder' | 'Defender' | 'Goalkeeper';
  image: string;
  coverImage: string;
  era: '1950s' | '1970s' | '1990s' | '2000s' | 'Modern Era';
  stats: {
    goals: number;
    matches: number;
    ballonDOr: number;
    worldCups: number;
    cleanSheets?: number; // Special for GK
    assists?: number;     // Optional but great for playmakers
  };
  clubStats: { club: string; goals: number; matches: number; years: string }[];
  timeline: { year: string; title: string; description: string }[];
  bio: string;
  goldenMoment: {
    title: string;
    description: string;
    year: number;
  };
  achievements: string[];
  quote: string; 
}

export const legends: Legend[] = [
  // --- South America ---
  {
    id: "lionel-messi",
    name: "Lionel Messi",
    fullName: "Lionel Andrés Messi",
    nationality: "Argentina",
    region: 'South America',
    position: "Forward",
    /* [USER UPDATE]: Replace 'image' with your preferred portrait URL */
    image: "https://upload.wikimedia.org/wikipedia/commons/b/b4/Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg",
    /* [USER UPDATE]: Replace 'coverImage' with your preferred hero background URL */
    coverImage: "https://images.unsplash.com/photo-1627521360029-7c010c79373e",
    era: "Modern Era",
    stats: { goals: 821, matches: 1047, ballonDOr: 8, worldCups: 1, assists: 361 },
    clubStats: [
        { club: "FC Barcelona", goals: 672, matches: 778, years: "2004-2021" },
        { club: "Paris Saint-Germain", goals: 32, matches: 75, years: "2021-2023" },
        { club: "Inter Miami", goals: 11, matches: 14, years: "2023-Present" }
    ],
    timeline: [
        { year: "2005", title: "First Senior Goal", description: "Scored his first goal for Barcelona against Albacete via a Ronaldinho assist." },
        { year: "2009", title: "The Sextuple", description: "Led Barcelona to win all six major trophies in a single calendar year." },
        { year: "2012", title: "Year of 91", description: "Broke the world record by scoring 91 goals in a single calendar year." },
        { year: "2021", title: "Copa América Glory", description: "Finally won his first major international trophy with Argentina." },
        { year: "2022", title: "World Cup Champion", description: "Completed football by winning the FIFA World Cup in Qatar." }
    ],
    bio: "Lionel Messi is widely regarded as the greatest footballer of all time. A prodigy from Rosario, he overcame a growth hormone deficiency to conquer the world with FC Barcelona, where he won a club-record 35 trophies. Known for his dribbling, vision, and prolific scoring, Messi's crowning achievement came in 2022, leading Argentina to World Cup glory in Qatar.",
    goldenMoment: { title: "The Lusail Finale", description: "Scoring twice and leading Argentina to World Cup glory in the greatest final ever played.", year: 2022 },
    achievements: ["8x Ballon d'Or", "1x World Cup", "4x Champions League", "10x La Liga", "Copa América Champion"],
    quote: "I prefer to win titles with the team ahead of individual awards or scoring more goals than anyone else."
  },
  {
    id: "pele",
    name: "Pelé",
    fullName: "Edson Arantes do Nascimento",
    nationality: "Brazil",
    region: 'South America',
    position: "Forward",
    /* [USER UPDATE]: Replace 'image' with your preferred portrait URL */
    image: "https://upload.wikimedia.org/wikipedia/commons/f/fe/Pel%C3%A9_%281966%29.jpg",
    /* [USER UPDATE]: Replace 'coverImage' with your preferred hero background URL */
    coverImage: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55",
    era: "1950s",
    stats: { goals: 1281, matches: 1363, ballonDOr: 0, worldCups: 3 },
    clubStats: [
        { club: "Santos", goals: 643, matches: 659, years: "1956-1974" },
        { club: "New York Cosmos", goals: 37, matches: 64, years: "1975-1977" }
    ],
    timeline: [
        { year: "1958", title: "A Star is Born", description: "Won the World Cup at age 17, scoring twice in the final." },
        { year: "1962", title: "Back to Back", description: "Part of the squad that retained the World Cup in Chile." },
        { year: "1969", title: "O Milésimo", description: "Scored his dedicated 1000th career goal at the Maracanã." },
        { year: "1970", title: "The King's Zenith", description: "Led perhaps the greatest team ever to a third World Cup title in Mexico." }
    ],
    bio: "The King. Pelé transformed football into 'The Beautiful Game'. Bursting onto the scene as a 17-year-old at the 1958 World Cup, he remains the only player in history to win three World Cups. A prolific scorer for Santos and Brazil, his athleticism, skill, and joy captivated the world.",
    goldenMoment: { title: "The 1970 Final", description: "Opening the scoring and assisting Carlos Alberto's iconic goal to seal Brazil's third title.", year: 1970 },
    achievements: ["3x World Cup Winner", "FIFA Player of the Century", "2x Copa Libertadores", "Sao Paulo State Champion (10x)"],
    quote: "Success is no accident. It is hard work, perseverance, learning, studying, sacrifice and most of all, love of what you are doing."
  },
  {
    id: "diego-maradona",
    name: "Diego Maradona",
    fullName: "Diego Armando Maradona",
    nationality: "Argentina",
    region: 'South America',
    position: "Midfielder",
    /* [USER UPDATE]: Replace 'image' with your preferred portrait URL */
    image: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Maradona-Mundial_86_con_la_copa.JPG",
    /* [USER UPDATE]: Replace 'coverImage' with your preferred hero background URL */
    coverImage: "https://images.unsplash.com/photo-1551958219-acbc608c6377",
    era: "1970s",
    stats: { goals: 344, matches: 680, ballonDOr: 0, worldCups: 1 },
    clubStats: [
        { club: "Argentinos Juniors", goals: 116, matches: 167, years: "1976-1981" },
        { club: "Boca Juniors", goals: 28, matches: 40, years: "1981-1982" },
        { club: "Barcelona", goals: 38, matches: 58, years: "1982-1984" },
        { club: "Napoli", goals: 115, matches: 259, years: "1984-1991" }
    ],
    timeline: [
        { year: "1976", title: "Professional Debut", description: "Debuted for Argentinos Juniors ten days before his 16th birthday." },
        { year: "1986", title: "World Cup Mastery", description: "Captain of Argentina, scoring the 'Hand of God' and 'Goal of the Century'." },
        { year: "1987", title: "King of Naples", description: "Led Napoli to their first-ever Serie A title, becoming a god in the city." },
        { year: "1990", title: "Heartbreak in Rome", description: "Led Argentina to another final but lost to West Germany." }
    ],
    bio: "El Pibe de Oro ('The Golden Boy'). A genius and a rebel, Maradona possessed possibly the greatest ball control in history. He single-handedly dragged Argentina to World Cup glory in 1986 and achieved god-like status at Napoli by leading the underdogs to two Serie A titles.",
    goldenMoment: { title: "The Goal of the Century", description: "Dribbling past five England players from his own half to score the greatest goal in World Cup history.", year: 1986 },
    achievements: ["1x World Cup Winner", "FIFA Goal of the Century", "2x Serie A Champion", "UEFA Cup Winner"],
    quote: "When you win, you don't get carried away. But if you go step by step, with confidence, you can go far."
  },
  {
    id: "ronaldo-nazario",
    name: "Ronaldo",
    fullName: "Ronaldo Luís Nazário de Lima",
    nationality: "Brazil",
    region: 'South America',
    position: "Forward",
    /* [USER UPDATE]: Replace 'image' with your preferred portrait URL */
    image: "https://upload.wikimedia.org/wikipedia/commons/b/b3/Ronaldo_en_2018.jpeg",
    /* [USER UPDATE]: Replace 'coverImage' with your preferred hero background URL */
    coverImage: "https://images.unsplash.com/photo-1551958219-acbc608c6377",
    era: "1990s",
    stats: { goals: 414, matches: 616, ballonDOr: 2, worldCups: 2 },
    clubStats: [
        { club: "PSV", goals: 54, matches: 58, years: "1994-1996" },
        { club: "Barcelona", goals: 47, matches: 49, years: "1996-1997" },
        { club: "Inter Milan", goals: 59, matches: 99, years: "1997-2002" },
        { club: "Real Madrid", goals: 104, matches: 177, years: "2002-2007" }
    ],
    timeline: [
        { year: "1996", title: "FIFA World Player", description: "Became the youngest ever winner of the award at age 20." },
        { year: "1998", title: "The Convulsion", description: "Suffered a seizure before the World Cup final, playing in a daze as Brazil lost." },
        { year: "2002", title: "The Resurrection", description: "Returned from devastating knee injuries to win the World Cup and the Golden Boot." },
        { year: "2003", title: "Old Trafford Ovation", description: "Scored a hat-trick for Real Madrid against Man Utd, receiving a standing ovation." }
    ],
    bio: "O Fenômeno. Ronaldo redefined the striker position with a terrifying combination of explosive speed, power, and technique. Despite suffering career-threatening knee injuries, he returned to lead Brazil to the 2002 World Cup title. He played for both Barcelona and Real Madrid, as well as Inter and AC Milan.",
    goldenMoment: { title: "The Redemption", description: "Scoring two goals in the 2002 World Cup Final after the heartbreak of 1998.", year: 2002 },
    achievements: ["2x World Cup Winner", "2x Ballon d'Or", "3x FIFA World Player of the Year", "World Cup Golden Boot"],
    quote: "I couldn't have got any fatter; I was running out of clothes."
  },
  {
    id: "ronaldinho",
    name: "Ronaldinho",
    fullName: "Ronaldo de Assis Moreira",
    nationality: "Brazil",
    region: 'South America',
    position: "Midfielder",
    /* [USER UPDATE]: Replace 'image' with your preferred portrait URL */
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Ronaldinho_061115.jpg",
    /* [USER UPDATE]: Replace 'coverImage' with your preferred hero background URL */
    coverImage: "https://images.unsplash.com/photo-1517466787929-bc90951d0974",
    era: "2000s",
    stats: { goals: 266, matches: 719, ballonDOr: 1, worldCups: 1 },
    clubStats: [
        { club: "PSG", goals: 25, matches: 77, years: "2001-2003" },
        { club: "Barcelona", goals: 94, matches: 207, years: "2003-2008" },
        { club: "AC Milan", goals: 26, matches: 95, years: "2008-2011" }
    ],
    timeline: [
        { year: "2002", title: "World Cup Winner", description: "Part of the 'Three Rs' (Ronaldo, Rivaldo, Ronaldinho) that conquered the world." },
        { year: "2005", title: "Ballon d'Or", description: "Crowned the best player in the world after dazzling performances for Barcelona." },
        { year: "2006", title: "Champions League", description: "Led Barcelona to European glory, defeating Arsenal in the final." }
    ],
    bio: "The man who played with a smile. Ronaldinho brought magic back to football. With his no-look passes, elasticos, and free-kicks, he captivated the world at Barcelona. He is one of the few players to receive a standing ovation from Real Madrid fans at the Bernabéu.",
    goldenMoment: { title: "Bernabeu Ovation", description: "Receiving a standing ovation from arch-rivals Real Madrid fans after a virtuoso performance.", year: 2005 },
    achievements: ["1x Ballon d'Or", "1x World Cup", "1x Champions League", "2x FIFA World Player of the Year"],
    quote: "I learned all about life with a ball at my feet."
  },
  {
    id: "neymar-jr",
    name: "Neymar",
    fullName: "Neymar da Silva Santos Júnior",
    nationality: "Brazil",
    region: 'South America',
    position: "Forward",
    /* [USER UPDATE]: Replace 'image' with your preferred portrait URL */
    image: "https://upload.wikimedia.org/wikipedia/commons/6/65/20180610_FIFA_Friendly_Match_Austria_vs._Brazil_Neymar_850_1705.jpg",
    /* [USER UPDATE]: Replace 'coverImage' with your preferred hero background URL */
    coverImage: "https://images.unsplash.com/photo-1562596956-f002cb70387b",
    era: "Modern Era",
    stats: { goals: 436, matches: 708, ballonDOr: 0, worldCups: 0 },
    clubStats: [
        { club: "Santos", goals: 136, matches: 225, years: "2009-2013" },
        { club: "Barcelona", goals: 105, matches: 186, years: "2013-2017" },
        { club: "PSG", goals: 118, matches: 173, years: "2017-2023" }
    ],
    timeline: [
        { year: "2011", title: "Puskás Award", description: "Won the goal of the year for an incredible solo run for Santos." },
        { year: "2015", title: "The Treble", description: "Scored in the CL final as Barcelona won the treble." },
        { year: "2017", title: "World Record Transfer", description: "Moved to PSG for €222m, shattering the transfer record." }
    ],
    bio: "The heir to the Brazilian throne. Neymar burst onto the scene at Santos before forming the deadly MSN trio at Barcelona. Known for his flashy dribbling and playmaking, he is Brazil's all-time top scorer.",
    goldenMoment: { title: "La Remontada", description: "Orchestrating the miraculous 6-1 comeback against PSG in the Champions League.", year: 2017 },
    achievements: ["1x Champions League", "Olympic Gold Medal", "Copa Libertadores"],
    quote: "I'm not a perfect role model... but I'm trying to learn every day."
  },

  // --- Europe ---
  {
    id: "cristiano-ronaldo",
    name: "Cristiano Ronaldo",
    fullName: "Cristiano Ronaldo dos Santos Aveiro",
    nationality: "Portugal",
    region: 'Europe',
    position: "Forward",
    /* [USER UPDATE]: Replace 'image' with your preferred portrait URL */
    image: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg",
    /* [USER UPDATE]: Replace 'coverImage' with your preferred hero background URL */
    coverImage: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6",
    era: "Modern Era",
    stats: { goals: 890, matches: 1200, ballonDOr: 5, worldCups: 0 },
    clubStats: [
        { club: "Man Utd", goals: 145, matches: 346, years: "2003-09, 21-22" },
        { club: "Real Madrid", goals: 450, matches: 438, years: "2009-2018" },
        { club: "Juventus", goals: 101, matches: 134, years: "2018-2021" }
    ],
    timeline: [
        { year: "2008", title: "First Ballon d'Or", description: "Won his first Golden Ball after leading Man Utd to CL glory." },
        { year: "2016", title: "Euro Champion", description: "Captained Portugal to their unlikely and historic victory at Euro 2016." },
        { year: "2017", title: "Back-to-Back CL", description: "Scored twice in the final as Madrid became the first team to retain the modern CL." },
        { year: "2018", title: "The Bicycle Kick", description: "Scored an iconic overhead kick in Turin." }
    ],
    bio: "A relentless machine. Cristiano Ronaldo is the all-time top scorer in professional football history. From a tricky winger at Manchester United to a lethal poacher at Real Madrid, he has dominated European football for two decades. He has won 5 Champions League titles and led Portugal to their first-ever major trophy at Euro 2016.",
    goldenMoment: { title: "Turin Bicycle Kick", description: "Scoring an overhead kick against Juventus that earned a standing ovation from the opposing fans.", year: 2018 },
    achievements: ["5x Ballon d'Or", "5x Champions League", "Euro 2016 Winner", "All-time Top Scorer"],
    quote: "Your love makes me strong. Your hate makes me unstoppable."
  },
  {
    id: "zinedine-zidane",
    name: "Zinedine Zidane",
    fullName: "Zinedine Yazid Zidane",
    nationality: "France",
    region: 'Europe',
    position: "Midfielder",
    /* [USER UPDATE]: Replace 'image' with your preferred portrait URL */
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Zinedine_Zidane_by_Tasnim_03.jpg",
    /* [USER UPDATE]: Replace 'coverImage' with your preferred hero background URL */
    coverImage: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9",
    era: "2000s",
    stats: { goals: 156, matches: 792, ballonDOr: 1, worldCups: 1 },
    clubStats: [
        { club: "Bordeaux", goals: 39, matches: 179, years: "1992-1996" },
        { club: "Juventus", goals: 31, matches: 212, years: "1996-2001" },
        { club: "Real Madrid", goals: 49, matches: 227, years: "2001-2006" }
    ],
    timeline: [
         { year: "1998", title: "World Cup Hero", description: "Scored two headers in the final to win France's first World Cup." },
         { year: "2002", title: "The Volley", description: "Scored the greatest goal in CL final history vs Leverkusen." },
         { year: "2006", title: "The Last Dance", description: "Won the Golden Ball at the World Cup but retired after the infamous headbutt." }
    ],
    bio: "Elegance personified. 'Zizou' was a master of the midfield, possessing incredible touch and vision. He scored two headers in the 1998 World Cup final and scored one of the greatest volleys in history to win the 2002 Champions League. He later became a legendary manager.",
    goldenMoment: { title: "The Glasgow Volley", description: "Striking a perfect left-footed volley to win the 2002 Champions League Final.", year: 2002 },
    achievements: ["1x Ballon d'Or", "1x World Cup Winner", "Euro 2000 Winner", "3x FIFA World Player of the Year"],
    quote: "I once cried because I had no shoes to play soccer, but one day, I met a man who had no feet."
  },
  {
    id: "johan-cruyff",
    name: "Johan Cruyff",
    fullName: "Hendrik Johannes Cruijff",
    nationality: "Netherlands",
    region: 'Europe',
    position: "Forward",
    /* [USER UPDATE]: Replace 'image' with your preferred portrait URL */
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Johan_Cruyff_1974.jpg",
    /* [USER UPDATE]: Replace 'coverImage' with your preferred hero background URL */
    coverImage: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d",
    era: "1970s",
    stats: { goals: 433, matches: 752, ballonDOr: 3, worldCups: 0 },
    clubStats: [
        { club: "Ajax", goals: 257, matches: 369, years: "1964-73, 81-83" },
        { club: "Barcelona", goals: 60, matches: 180, years: "1973-1978" },
        { club: "Feyenoord", goals: 13, matches: 44, years: "1983-1984" }
    ],
    timeline: [
        { year: "1971", title: "European Domination", description: "Won the first of three consecutive European Cups with Ajax." },
        { year: "1974", title: "Total Football", description: "Led the Netherlands to the World Cup final, showcasing a revolutionary style." },
        { year: "1992", title: "The Dream Team", description: "Managed Barcelona to their first European Cup." }
    ],
    bio: "The father of modern football. Cruyff was the on-field conductor of 'Total Football'. He revolutionized Barcelona as both a player and a manager, instilling the philosophy that would later produce Messi, Xavi, and Iniesta.",
    goldenMoment: { title: "The Cruyff Turn", description: "Leaving Swedish defender Jan Olsson for dead with a move never seen before at the 1974 World Cup.", year: 1974 },
    achievements: ["3x Ballon d'Or", "3x European Cup", "La Liga Champion", "European Player of the Century"],
    quote: "Playing football is very simple, but playing simple football is the hardest thing there is."
  },
  {
    id: "franz-beckenbauer",
    name: "Franz Beckenbauer",
    fullName: "Franz Anton Beckenbauer",
    nationality: "Germany",
    region: 'Europe',
    position: "Defender",
    /* [USER UPDATE]: Replace 'image' with your preferred portrait URL */
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e9/Franz_Beckenbauer_1977.jpg",
    /* [USER UPDATE]: Replace 'coverImage' with your preferred hero background URL */
    coverImage: "https://images.unsplash.com/photo-1516567832553-70c3a593796d",
    era: "1970s",
    stats: { goals: 112, matches: 856, ballonDOr: 2, worldCups: 1 },
    clubStats: [
        { club: "Bayern Munich", goals: 74, matches: 582, years: "1964-1977" },
        { club: "NY Cosmos", goals: 23, matches: 105, years: "1977-80" }
    ],
    timeline: [
         { year: "1972", title: "Euro Winner", description: "Captained West Germany to the European Championship title." },
         { year: "1974", title: "World Cup Winner", description: "Led his nation to World Cup glory on home soil." },
         { year: "1990", title: "Managerial Masterclass", description: "Became one of three men to win the World Cup as player and manager." }
    ],
    bio: "Der Kaiser. Beckenbauer invented the modern sweeper (libero) role, controlling the game from the back with grace and authority. He led Bayern Munich to three consecutive European Cups.",
    goldenMoment: { title: "Arm in a Sling", description: "Playing the 'Game of the Century' 1970 semi-final with a dislocated shoulder.", year: 1970 },
    achievements: ["2x Ballon d'Or", "1x World Cup Winner", "3x European Cup", "Euro 1972 Winner"],
    quote: "It is not the strong one that wins, the one that wins is strong."
  },
  {
    id: "paolo-maldini",
    name: "Paolo Maldini",
    fullName: "Paolo Cesare Maldini",
    nationality: "Italy",
    region: 'Europe',
    position: "Defender",
    /* [USER UPDATE]: Replace 'image' with your preferred portrait URL */
    image: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Paolo_Maldini_2018_%28cropped%29.jpg",
    /* [USER UPDATE]: Replace 'coverImage' with your preferred hero background URL */
    coverImage: "https://images.unsplash.com/photo-1524012431247-526047945d7a",
    era: "1990s",
    stats: { goals: 40, matches: 902, ballonDOr: 0, worldCups: 0, cleanSheets: 300 },
    clubStats: [
        { club: "AC Milan", goals: 33, matches: 902, years: "1984-2009" }
    ],
    timeline: [
        { year: "1985", title: "Debut", description: "Made his Serie A debut at age 16 for AC Milan." },
        { year: "1994", title: "The Wall", description: "Anchored the defense that thrashed Barcelona 4-0 in the CL final." },
        { year: "2003", title: "European Captain", description: "Lifted the Champions League trophy as captain 40 years after his father." }
    ],
    bio: "Il Capitano. The ultimate one-club man, Maldini spent 25 seasons at AC Milan, winning 5 Champions League titles. Renowned for his tactical intelligence, he is widely considered the greatest defender ever.",
    goldenMoment: { title: "5th Champions League", description: "Captaining AC Milan to revenge against Liverpool in the 2007 Final at age 38.", year: 2007 },
    achievements: ["5x Champions League", "7x Serie A Champion", "126 Caps for Italy", "Ballon d'Or Dream Team"],
    quote: "If I have to make a tackle then I have already made a mistake."
  },
  {
    id: "andres-iniesta",
    name: "Andrés Iniesta",
    fullName: "Andrés Iniesta Luján",
    nationality: "Spain",
    region: 'Europe',
    position: "Midfielder",
    /* [USER UPDATE]: Replace 'image' with your preferred portrait URL */
    image: "https://upload.wikimedia.org/wikipedia/commons/6/67/Andr%C3%A9s_Iniesta_2012.jpg",
    /* [USER UPDATE]: Replace 'coverImage' with your preferred hero background URL */
    coverImage: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12",
    era: "2000s",
    stats: { goals: 93, matches: 885, ballonDOr: 0, worldCups: 1, assists: 192 },
    clubStats: [
        { club: "Barcelona", goals: 57, matches: 674, years: "2002-2018" },
        { club: "Vissel Kobe", goals: 26, matches: 134, years: "2018-2023" }
    ],
    timeline: [
        { year: "2009", title: "Stamford Bridge", description: "Scored the last-minute screamer to send Barcelona to the CL final." },
        { year: "2010", title: "World Champion", description: "Scored the winning goal in the World Cup final for Spain." },
        { year: "2012", title: "Euros MVP", description: "Named Player of the Tournament as Spain defended their Euro title." }
    ],
    bio: "The Illusionist. A quiet genius, Iniesta formed the heartbeat of the greatest Barcelona and Spain sides. He scored the most important goal in Spanish football history—the winner in the 2010 World Cup Final.",
    goldenMoment: { title: "Johannesburg 116'", description: "Volleying home the World Cup winning goal in extra time against the Netherlands.", year: 2010 },
    achievements: ["1x World Cup Winner", "2x Euro Winner", "4x Champions League", "9x La Liga Champion"],
    quote: "Perfection doesn't exist, but you can get closer to it."
  },
  {
    id: "gianluigi-buffon",
    name: "Gianluigi Buffon",
    fullName: "Gianluigi Buffon",
    nationality: "Italy",
    region: 'Europe',
    position: "Goalkeeper",
    /* [USER UPDATE]: Replace 'image' with your preferred portrait URL */
    image: "https://upload.wikimedia.org/wikipedia/commons/6/67/Buffon_2016.jpg",
    /* [USER UPDATE]: Replace 'coverImage' with your preferred hero background URL */
    coverImage: "https://images.unsplash.com/photo-1511886929837-354d827aae26", 
    era: "2000s",
    stats: { goals: 0, matches: 1151, ballonDOr: 0, worldCups: 1, cleanSheets: 501 },
    clubStats: [
        { club: "Parma", goals: 0, matches: 265, years: "1995-01, 21-23" },
        { club: "Juventus", goals: 0, matches: 685, years: "2001-2018, 19-21" },
        { club: "PSG", goals: 0, matches: 25, years: "2018-2019" }
    ],
    timeline: [
        { year: "1995", title: "Teenage Phenomenon", description: "Kept a clean sheet against mighty AC Milan on his Serie A debut at 17." },
        { year: "2001", title: "Record Transfer", description: "Became the most expensive GK ever with his move to Juventus." },
        { year: "2006", title: "World Cup Glory", description: "Conceded only 2 goals all tournament (one own goal, one penalty) to win the World Cup." }
    ],
    bio: "Superman. Buffon redefined longevity, playing at the highest level into his 40s. He made over 1,100 career appearances and won the 2006 World Cup with Italy, making a crucial save against Zidane in the final.",
    goldenMoment: { title: "The Berlin Save", description: "Denying Zidane's header in extra time of the 2006 World Cup Final to keep Italy in the game.", year: 2006 },
    achievements: ["1x World Cup Winner", "10x Serie A Champion", "Most Caps for Italy (176)", "Serie A Goalkeeper of the Year (12x)"],
    quote: "You score goals as a kid. Then you grow up stupid and become a goalkeeper."
  }
];
