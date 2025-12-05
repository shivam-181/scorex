// Hardcoded "Real" Lineups for Major Teams (2024/25 Season approximation)
// Used when API data is missing to ensure users see real names.

export const REAL_LINEUPS: Record<string, any[]> = {
  "Manchester City": [
    { name: "Ederson", number: 31, position: "GK", image: "https://resources.premierleague.com/premierleague/photos/players/250x250/p121160.png" },
    { name: "Kyle Walker", number: 2, position: "DF", image: "https://resources.premierleague.com/premierleague/photos/players/250x250/p58621.png" },
    { name: "Ruben Dias", number: 3, position: "DF", image: "https://resources.premierleague.com/premierleague/photos/players/250x250/p171314.png" },
    { name: "Manuel Akanji", number: 25, position: "DF", image: "https://resources.premierleague.com/premierleague/photos/players/250x250/p220566.png" },
    { name: "Josko Gvardiol", number: 24, position: "DF", image: "https://resources.premierleague.com/premierleague/photos/players/250x250/p477424.png" },
    { name: "Rodri", number: 16, position: "MF", image: "https://resources.premierleague.com/premierleague/photos/players/250x250/p220566.png" },
    { name: "Kevin De Bruyne", number: 17, position: "MF", image: "https://resources.premierleague.com/premierleague/photos/players/250x250/p61366.png" },
    { name: "Bernardo Silva", number: 20, position: "MF", image: "https://resources.premierleague.com/premierleague/photos/players/250x250/p165809.png" },
    { name: "Phil Foden", number: 47, position: "FW", image: "https://resources.premierleague.com/premierleague/photos/players/250x250/p209244.png" },
    { name: "Erling Haaland", number: 9, position: "FW", image: "https://resources.premierleague.com/premierleague/photos/players/250x250/p223094.png" },
    { name: "Jeremy Doku", number: 11, position: "FW", image: "https://resources.premierleague.com/premierleague/photos/players/250x250/p223340.png" }
  ],
  "Arsenal": [
    { name: "David Raya", number: 22, position: "GK" },
    { name: "Ben White", number: 4, position: "DF" },
    { name: "William Saliba", number: 2, position: "DF" },
    { name: "Gabriel Magalhaes", number: 6, position: "DF" },
    { name: "Oleksandr Zinchenko", number: 35, position: "DF" },
    { name: "Declan Rice", number: 41, position: "MF" },
    { name: "Martin Odegaard", number: 8, position: "MF" },
    { name: "Kai Havertz", number: 29, position: "MF" },
    { name: "Bukayo Saka", number: 7, position: "FW" },
    { name: "Gabriel Jesus", number: 9, position: "FW" },
    { name: "Gabriel Martinelli", number: 11, position: "FW" }
  ],
  "Liverpool": [
    { name: "Alisson Becker", number: 1, position: "GK" },
    { name: "Trent Alexander-Arnold", number: 66, position: "DF" },
    { name: "Virgil van Dijk", number: 4, position: "DF" },
    { name: "Ibrahima Konate", number: 5, position: "DF" },
    { name: "Andrew Robertson", number: 26, position: "DF" },
    { name: "Alexis Mac Allister", number: 10, position: "MF" },
    { name: "Dominik Szoboszlai", number: 8, position: "MF" },
    { name: "Wataru Endo", number: 3, position: "MF" },
    { name: "Mohamed Salah", number: 11, position: "FW" },
    { name: "Darwin Nunez", number: 9, position: "FW" },
    { name: "Luis Diaz", number: 7, position: "FW" }
  ],
  "Manchester United": [
    { name: "Andre Onana", number: 24, position: "GK" },
    { name: "Diogo Dalot", number: 20, position: "DF" },
    { name: "Harry Maguire", number: 5, position: "DF" },
    { name: "Lisandro Martinez", number: 6, position: "DF" },
    { name: "Luke Shaw", number: 23, position: "DF" },
    { name: "Casemiro", number: 18, position: "MF" },
    { name: "Kobbie Mainoo", number: 37, position: "MF" },
    { name: "Bruno Fernandes", number: 8, position: "MF" },
    { name: "Alejandro Garnacho", number: 17, position: "FW" },
    { name: "Rasmus Hojlund", number: 11, position: "FW" },
    { name: "Marcus Rashford", number: 10, position: "FW" }
  ],
  "Chelsea": [
    { name: "Robert Sanchez", number: 1, position: "GK" },
    { name: "Reece James", number: 24, position: "DF" },
    { name: "Axel Disasi", number: 2, position: "DF" },
    { name: "Levi Colwill", number: 26, position: "DF" },
    { name: "Ben Chilwell", number: 21, position: "DF" },
    { name: "Moises Caicedo", number: 25, position: "MF" },
    { name: "Enzo Fernandez", number: 8, position: "MF" },
    { name: "Conor Gallagher", number: 23, position: "MF" },
    { name: "Cole Palmer", number: 20, position: "FW" },
    { name: "Nicolas Jackson", number: 15, position: "FW" },
    { name: "Raheem Sterling", number: 7, position: "FW" }
  ],
  "Real Madrid": [
    { name: "Thibaut Courtois", number: 1, position: "GK" },
    { name: "Dani Carvajal", number: 2, position: "DF" },
    { name: "Eder Militao", number: 3, position: "DF" },
    { name: "Antonio Rudiger", number: 22, position: "DF" },
    { name: "Ferland Mendy", number: 23, position: "DF" },
    { name: "Aurelien Tchouameni", number: 18, position: "MF" },
    { name: "Federico Valverde", number: 15, position: "MF" },
    { name: "Jude Bellingham", number: 5, position: "MF" },
    { name: "Rodrygo", number: 11, position: "FW" },
    { name: "Kylian Mbappe", number: 9, position: "FW" },
    { name: "Vinicius Junior", number: 7, position: "FW" }
  ],
  "FC Barcelona": [
    { name: "Marc-Andre ter Stegen", number: 1, position: "GK" },
    { name: "Jules Kounde", number: 23, position: "DF" },
    { name: "Ronald Araujo", number: 4, position: "DF" },
    { name: "Pau Cubarsi", number: 33, position: "DF" },
    { name: "Joao Cancelo", number: 2, position: "DF" },
    { name: "Ilkay Gundogan", number: 22, position: "MF" },
    { name: "Frenkie de Jong", number: 21, position: "MF" },
    { name: "Pedri", number: 8, position: "MF" },
    { name: "Lamine Yamal", number: 27, position: "FW" },
    { name: "Robert Lewandowski", number: 9, position: "FW" },
    { name: "Raphinha", number: 11, position: "FW" }
  ],
  "Bayern Munich": [
    { name: "Manuel Neuer", number: 1, position: "GK" },
    { name: "Joshua Kimmich", number: 6, position: "DF" },
    { name: "Dayot Upamecano", number: 2, position: "DF" },
    { name: "Kim Min-jae", number: 3, position: "DF" },
    { name: "Alphonso Davies", number: 19, position: "DF" },
    { name: "Leon Goretzka", number: 8, position: "MF" },
    { name: "Konrad Laimer", number: 27, position: "MF" },
    { name: "Jamal Musiala", number: 42, position: "MF" },
    { name: "Leroy Sane", number: 10, position: "FW" },
    { name: "Harry Kane", number: 9, position: "FW" },
    { name: "Kingsley Coman", number: 11, position: "FW" }
  ],
  "Paris Saint-Germain": [
    { name: "Gianluigi Donnarumma", number: 99, position: "GK" },
    { name: "Achraf Hakimi", number: 2, position: "DF" },
    { name: "Marquinhos", number: 5, position: "DF" },
    { name: "Lucas Hernandez", number: 21, position: "DF" },
    { name: "Nuno Mendes", number: 25, position: "DF" },
    { name: "Warren Zaire-Emery", number: 33, position: "MF" },
    { name: "Vitinha", number: 17, position: "MF" },
    { name: "Fabian Ruiz", number: 8, position: "MF" },
    { name: "Ousmane Dembele", number: 10, position: "FW" },
    { name: "Goncalo Ramos", number: 9, position: "FW" },
    { name: "Bradley Barcola", number: 29, position: "FW" }
  ],
  "Inter Milan": [
    { name: "Yann Sommer", number: 1, position: "GK" },
    { name: "Benjamin Pavard", number: 28, position: "DF" },
    { name: "Francesco Acerbi", number: 15, position: "DF" },
    { name: "Alessandro Bastoni", number: 95, position: "DF" },
    { name: "Denzel Dumfries", number: 2, position: "MF" },
    { name: "Nicolo Barella", number: 23, position: "MF" },
    { name: "Hakan Calhanoglu", number: 20, position: "MF" },
    { name: "Henrikh Mkhitaryan", number: 22, position: "MF" },
    { name: "Federico Dimarco", number: 32, position: "MF" },
    { name: "Marcus Thuram", number: 9, position: "FW" },
    { name: "Lautaro Martinez", number: 10, position: "FW" }
  ],
  "Fulham": [
    { name: "Bernd Leno", number: 17, position: "GK" },
    { name: "Timothy Castagne", number: 21, position: "DF" },
    { name: "Tosin Adarabioyo", number: 4, position: "DF" },
    { name: "Calvin Bassey", number: 3, position: "DF" },
    { name: "Antonee Robinson", number: 33, position: "DF" },
    { name: "Joao Palhinha", number: 26, position: "MF" },
    { name: "Tom Cairney", number: 10, position: "MF" },
    { name: "Andreas Pereira", number: 18, position: "MF" },
    { name: "Alex Iwobi", number: 17, position: "FW" },
    { name: "Rodrigo Muniz", number: 19, position: "FW" },
    { name: "Willian", number: 20, position: "FW" }
  ]
};

export const getHardcodedLineup = (teamName: string) => {
  if (!teamName) return null;
  
  // Helper to clean name
  const cleanName = (name: string) => {
    return name.toLowerCase()
      .replace(/ fc/g, '')
      .replace(/ afc/g, '')
      .replace(/ cf/g, '')
      .trim();
  };

  const originalLower = teamName.toLowerCase().trim();
  const cleaned = cleanName(teamName);
  
  console.log(`RealLineups: Looking for "${teamName}" (Cleaned: "${cleaned}")`);

  // 1. Direct match (Case Insensitive) on Original or Cleaned
  const directKey = Object.keys(REAL_LINEUPS).find(k => {
    const kLower = k.toLowerCase();
    return kLower === originalLower || cleanName(k) === cleaned;
  });
  
  if (directKey) {
    console.log(`RealLineups: Found direct/clean match -> ${directKey}`);
    return REAL_LINEUPS[directKey];
  }

  // 2. Partial match
  const partialKey = Object.keys(REAL_LINEUPS).find(k => {
    const kClean = cleanName(k);
    return kClean.includes(cleaned) || cleaned.includes(kClean);
  });
  
  if (partialKey) {
    console.log(`RealLineups: Found partial match -> ${partialKey}`);
    return REAL_LINEUPS[partialKey];
  }
  
  // 3. Special Aliases
  const aliases: Record<string, string> = {
    "man city": "Manchester City",
    "manchester city fc": "Manchester City", // Explicit
    "man utd": "Manchester United",
    "spurs": "Tottenham Hotspur",
    "real madrid": "Real Madrid",
    "barca": "FC Barcelona",
    "psg": "Paris Saint-Germain",
    "bayern": "Bayern Munich",
    "inter": "Inter Milan"
  };
  
  for (const [alias, target] of Object.entries(aliases)) {
    if (cleaned.includes(cleanName(alias)) || cleanName(alias).includes(cleaned)) {
       console.log(`RealLineups: Found alias match "${alias}" -> ${target}`);
       return REAL_LINEUPS[target];
    }
  }

  console.log(`RealLineups: No match found for "${teamName}"`);
  return null;
};
