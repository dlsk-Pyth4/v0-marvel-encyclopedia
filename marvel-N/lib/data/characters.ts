export interface ComicAppearance {
  first: string
  comic: string
  year: number
}

export interface MCUAppearance {
  first: string
  firstFilm: string
  last?: string
  lastFilm?: string
}

export interface Character {
  id: string
  name: string
  realName: string
  team: "Avengers" | "X-Men" | "Gardiens" | "Vilains" | "Autres"
  description: string
  biography: string
  powers: string[]
  power_level: number
  image_url: string
  connections: string[]
  comicAppearance: ComicAppearance
  mcuAppearance?: MCUAppearance
}

export const characters: Character[] = [
  {
    id: "iron-man",
    name: "Iron Man",
    realName: "Tony Stark",
    team: "Avengers",
    description: "Génie, milliardaire, playboy, philanthrope. Tony Stark est l'inventeur de l'armure Iron Man.",
    biography: "Anthony Edward Stark, dit Tony Stark, est un industriel milliardaire américain, inventeur et ingénieur de génie. Après avoir été capturé par des terroristes et grièvement blessé, il construit une armure technologique avancée pour s'échapper et devient le super-héros Iron Man. Fondateur des Avengers, il utilise son intelligence et ses ressources pour protéger le monde.",
    powers: ["Armure haute technologie", "Vol supersonique", "Rayons répulseurs", "Intelligence surhumaine", "Arsenal d'armes avancées"],
    power_level: 85,
    image_url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-4lN2UmBtydOqshW5oyTzO9HkUJ2IH7.png",
    connections: ["captain-america", "thor", "hulk", "spider-man", "doctor-strange"],
    comicAppearance: {
      first: "Mars 1963",
      comic: "Tales of Suspense #39",
      year: 1963
    },
    mcuAppearance: {
      first: "2008",
      firstFilm: "Iron Man",
      last: "2019",
      lastFilm: "Avengers: Endgame"
    }
  },
  {
    id: "captain-america",
    name: "Captain America",
    realName: "Steve Rogers",
    team: "Avengers",
    description: "Le premier Avenger. Steve Rogers incarne les valeurs de courage, d'honneur et de justice.",
    biography: "Steve Rogers était un jeune homme frêle de Brooklyn qui, grâce au sérum du Super-Soldat, est devenu le parfait spécimen humain pendant la Seconde Guerre mondiale. Congelé pendant des décennies, il s'est réveillé dans le monde moderne pour continuer à défendre la liberté en tant que leader des Avengers.",
    powers: ["Force surhumaine", "Endurance exceptionnelle", "Maître tacticien", "Bouclier en vibranium", "Guérison accélérée"],
    power_level: 75,
    image_url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-lYQouY9fidSQ702Dn6BebDgNr9i2Ly.png",
    connections: ["iron-man", "thor", "black-widow", "black-panther"],
    comicAppearance: {
      first: "Mars 1941",
      comic: "Captain America Comics #1",
      year: 1941
    },
    mcuAppearance: {
      first: "2011",
      firstFilm: "Captain America: First Avenger",
      last: "2019",
      lastFilm: "Avengers: Endgame"
    }
  },
  {
    id: "thor",
    name: "Thor",
    realName: "Thor Odinson",
    team: "Avengers",
    description: "Le Dieu du Tonnerre d'Asgard, porteur du marteau enchanté Mjolnir.",
    biography: "Thor Odinson est le prince héritier d'Asgard, fils d'Odin le Père de Toutes Choses. Dieu nordique du tonnerre, il manie Mjolnir, un marteau enchanté qui lui confère le pouvoir de contrôler la foudre. Banni sur Terre pour son arrogance, il a appris l'humilité et est devenu l'un des plus puissants Avengers.",
    powers: ["Contrôle de la foudre", "Force divine", "Vol avec Mjolnir", "Longévité asgardienne", "Résistance surhumaine"],
    power_level: 95,
    image_url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-SyYc8NkCWVGOoLEo84fRdflXewKnMM.png",
    connections: ["iron-man", "captain-america", "hulk", "loki"],
    comicAppearance: {
      first: "Août 1962",
      comic: "Journey into Mystery #83",
      year: 1962
    },
    mcuAppearance: {
      first: "2011",
      firstFilm: "Thor",
      last: "2022",
      lastFilm: "Thor: Love and Thunder"
    }
  },
  {
    id: "hulk",
    name: "Hulk",
    realName: "Bruce Banner",
    team: "Avengers",
    description: "Bruce Banner, scientifique brillant, se transforme en géant vert indestructible.",
    biography: "Le Dr Bruce Banner est un physicien nucléaire de génie qui, suite à une exposition massive aux rayons gamma, se transforme en une créature massive et verte appelée Hulk lorsqu'il est en colère. Plus Hulk est en colère, plus il devient fort, faisant de lui l'un des êtres les plus puissants de l'univers.",
    powers: ["Force illimitée", "Régénération instantanée", "Résistance quasi-invulnérable", "Sauts immenses", "Adaptation environnementale"],
    power_level: 98,
    image_url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-GkshVEMJwswQfzIYojGDbuLG2Ef0z2.png",
    connections: ["iron-man", "thor", "black-widow"],
    comicAppearance: {
      first: "Mai 1962",
      comic: "The Incredible Hulk #1",
      year: 1962
    },
    mcuAppearance: {
      first: "2008",
      firstFilm: "The Incredible Hulk",
      last: "2024",
      lastFilm: "Captain America: Brave New World"
    }
  },
  {
    id: "black-widow",
    name: "Black Widow",
    realName: "Natasha Romanoff",
    team: "Avengers",
    description: "Natasha Romanoff, espionne d'élite et maître assassin reconvertie en héroïne.",
    biography: "Natasha Romanoff a été entraînée dès l'enfance dans le programme Red Room pour devenir la parfaite espionne et assassin. Après avoir fait défection vers le SHIELD, elle utilise ses compétences exceptionnelles pour protéger le monde en tant que membre fondateur des Avengers.",
    powers: ["Arts martiaux maîtrisés", "Espionnage expert", "Acrobaties avancées", "Résistance au vieillissement", "Stratège tactique"],
    power_level: 65,
    image_url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-NoKEnUSsZYwO00DPiMqCQbkQ8QnW4V.png",
    connections: ["captain-america", "hulk", "iron-man", "hawkeye"],
    comicAppearance: {
      first: "Avril 1964",
      comic: "Tales of Suspense #52",
      year: 1964
    },
    mcuAppearance: {
      first: "2010",
      firstFilm: "Iron Man 2",
      last: "2021",
      lastFilm: "Black Widow"
    }
  },
  {
    id: "spider-man",
    name: "Spider-Man",
    realName: "Peter Parker",
    team: "Avengers",
    description: "Peter Parker, lycéen de Queens mordu par une araignée radioactive.",
    biography: "Peter Parker était un adolescent ordinaire de Queens jusqu'à ce qu'une araignée radioactive le morde lors d'une sortie scolaire. Doté de pouvoirs d'araignée et d'un sens de l'araignée qui l'avertit du danger, il devient Spider-Man, le héros amical du quartier, guidé par la maxime : avec un grand pouvoir viennent de grandes responsabilités.",
    powers: ["Sens d'araignée", "Adhérence aux murs", "Force proportionnelle d'araignée", "Agilité surhumaine", "Lance-toiles"],
    power_level: 78,
    image_url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Capture%20d%27%C3%A9cran%202026-05-03%20020902-2cjOglb1gyrhNggOGGB7fbgozPInzp.png",
    connections: ["iron-man", "doctor-strange", "miles-morales"],
    comicAppearance: {
      first: "Août 1962",
      comic: "Amazing Fantasy #15",
      year: 1962
    },
    mcuAppearance: {
      first: "2016",
      firstFilm: "Captain America: Civil War",
      last: "2024",
      lastFilm: "Deadpool & Wolverine (caméo)"
    }
  },
  {
    id: "doctor-strange",
    name: "Doctor Strange",
    realName: "Stephen Strange",
    team: "Avengers",
    description: "Stephen Strange, ancien chirurgien devenu Sorcier Suprême et protecteur de la réalité.",
    biography: "Le Dr Stephen Strange était un chirurgien arrogant dont la carrière a pris fin après un accident de voiture qui a détruit ses mains. Sa quête de guérison l'a mené à Kamar-Taj où il a appris les arts mystiques et est devenu le Sorcier Suprême, gardien de la Terre contre les menaces dimensionnelles.",
    powers: ["Magie des arts mystiques", "Manipulation du temps", "Voyage dimensionnel", "Boucliers mystiques", "Œil d'Agamotto"],
    power_level: 92,
    image_url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Capture%20d%27%C3%A9cran%202026-05-03%20020915-GMYHNN5kvXsqozjiiDoKnMK5GxO0Mu.png",
    connections: ["spider-man", "scarlet-witch", "iron-man", "thor"],
    comicAppearance: {
      first: "Juillet 1963",
      comic: "Strange Tales #110",
      year: 1963
    },
    mcuAppearance: {
      first: "2016",
      firstFilm: "Doctor Strange",
      last: "2022",
      lastFilm: "Doctor Strange in the Multiverse of Madness"
    }
  },
  {
    id: "scarlet-witch",
    name: "Scarlet Witch",
    realName: "Wanda Maximoff",
    team: "Avengers",
    description: "Wanda Maximoff possède le pouvoir de manipuler la magie du chaos et la réalité.",
    biography: "Wanda Maximoff a grandi en Sokovie avec son frère jumeau Pietro. Exposée à la Pierre de l'Esprit, elle a développé des pouvoirs de manipulation de la réalité d'une puissance inimaginable. Après avoir été une antagoniste des Avengers, elle est devenue l'une de leurs membres les plus puissants.",
    powers: ["Magie du chaos", "Manipulation de la réalité", "Télékinésie", "Hypnose mentale", "Projection d'énergie"],
    power_level: 99,
    image_url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-4tiPLarZ5r2RhJe5kpGLVEpd4Gm8iO.png",
    connections: ["doctor-strange", "iron-man", "captain-america"],
    comicAppearance: {
      first: "Mars 1964",
      comic: "X-Men #4",
      year: 1964
    },
    mcuAppearance: {
      first: "2014",
      firstFilm: "Captain America: The Winter Soldier (post-générique)",
      last: "2022",
      lastFilm: "Doctor Strange in the Multiverse of Madness"
    }
  },
  {
    id: "wolverine",
    name: "Wolverine",
    realName: "James Howlett / Logan",
    team: "X-Men",
    description: "Logan, mutant centenaire doté de griffes en adamantium et d'une régénération instantanée.",
    biography: "James Howlett, connu sous le nom de Logan ou Wolverine, est un mutant né au 19ème siècle dont le squelette a été recouvert d'adamantium indestructible par le programme Weapon X. Ses griffes rétractables et son facteur de guérison en font l'un des mutants les plus redoutables.",
    powers: ["Griffes en adamantium", "Régénération instantanée", "Sens surhumains", "Immortalité pratique", "Squelette indestructible"],
    power_level: 88,
    image_url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-yMBpiUnECNGLPMys9cbq8ghXklf9DF.png",
    connections: ["professor-x", "jean-grey", "cyclops", "storm"],
    comicAppearance: {
      first: "Octobre 1974",
      comic: "The Incredible Hulk #180",
      year: 1974
    },
    mcuAppearance: {
      first: "2024",
      firstFilm: "Deadpool & Wolverine",
      last: "2024",
      lastFilm: "Deadpool & Wolverine"
    }
  },
  {
    id: "professor-x",
    name: "Professeur X",
    realName: "Charles Francis Xavier",
    team: "X-Men",
    description: "Charles Xavier, le plus puissant télépathe au monde et fondateur des X-Men.",
    biography: "Le Professeur Charles Francis Xavier est le plus puissant télépathe de la planète. Rêvant d'un monde où humains et mutants coexistent en paix, il a fondé l'Institut Xavier pour Jeunes Surdoués et les X-Men pour protéger un monde qui les craint et les rejette.",
    powers: ["Télépathie de niveau Oméga", "Contrôle mental", "Projection astrale", "Détection de mutants", "Génie intellectuel"],
    power_level: 94,
    image_url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-cW8O5r33SkFog3r6lISkxCwuCm1d9s.png",
    connections: ["wolverine", "jean-grey", "cyclops", "storm"],
    comicAppearance: {
      first: "Septembre 1963",
      comic: "X-Men #1",
      year: 1963
    },
    mcuAppearance: {
      first: "2022",
      firstFilm: "Doctor Strange in the Multiverse of Madness",
      last: "2022",
      lastFilm: "Doctor Strange in the Multiverse of Madness"
    }
  },
  {
    id: "cyclops",
    name: "Cyclops",
    realName: "Scott Summers",
    team: "X-Men",
    description: "Scott Summers projette des rayons optiques dévastateurs et dirige les X-Men sur le terrain.",
    biography: "Scott Summers a découvert ses pouvoirs mutants à l'adolescence lorsque des rayons optiques incontrôlables ont jailli de ses yeux. Incapable de les contrôler sans ses lunettes en quartz rubis, il est devenu le premier élève de Charles Xavier et le leader tactique des X-Men.",
    powers: ["Rayons optiques concussifs", "Immunité à ses propres rayons", "Leadership tactique", "Résistance psychique", "Combattant expert"],
    power_level: 80,
    image_url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZhlJ0BJmRHdT12pKDZa7Ck1N0GBtAu.png",
    connections: ["professor-x", "wolverine", "jean-grey", "storm"],
    comicAppearance: {
      first: "Septembre 1963",
      comic: "X-Men #1",
      year: 1963
    }
  },
  {
    id: "jean-grey",
    name: "Jean Grey",
    realName: "Jean Elaine Grey",
    team: "X-Men",
    description: "Mutante de niveau Oméga avec des pouvoirs télépathiques et télékinétiques, hôte du Phoenix.",
    biography: "Jean Grey est l'une des premières élèves de Charles Xavier et l'une des mutantes les plus puissantes jamais nées. Ses pouvoirs télépathiques et télékinétiques sont amplifiés de façon cosmique lorsqu'elle devient l'hôte de la Force Phoenix, une entité cosmique de création et destruction.",
    powers: ["Télépathie de niveau Oméga", "Télékinésie cosmique", "Force Phoenix", "Manipulation moléculaire", "Résurrection"],
    power_level: 100,
    image_url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-TaixL1m2aMuk3f9wlrX3RgYdf0ZaNM.png",
    connections: ["professor-x", "wolverine", "cyclops", "storm"],
    comicAppearance: {
      first: "Septembre 1963",
      comic: "X-Men #1",
      year: 1963
    }
  },
  {
    id: "storm",
    name: "Storm",
    realName: "Ororo Munroe",
    team: "X-Men",
    description: "Ororo Munroe contrôle les éléments météorologiques avec une puissance divine.",
    biography: "Ororo Munroe, née au Kenya et élevée au Caire, a été vénérée comme une déesse en Afrique avant de rejoindre les X-Men. Son contrôle absolu sur les phénomènes météorologiques fait d'elle l'une des mutantes les plus puissantes et respectées au monde.",
    powers: ["Contrôle météorologique", "Vol atmosphérique", "Manipulation de la foudre", "Contrôle du vent", "Immunité aux températures extrêmes"],
    power_level: 90,
    image_url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Z0rdXscUE65viHQGIXpJ8QLXlQQ8Dm.png",
    connections: ["professor-x", "wolverine", "black-panther", "jean-grey", "cyclops"],
    comicAppearance: {
      first: "Mai 1975",
      comic: "Giant-Size X-Men #1",
      year: 1975
    }
  },
  {
    id: "miles-morales",
    name: "Spider-Man",
    realName: "Miles Morales",
    team: "Autres",
    description: "Miles Morales, le nouveau Spider-Man de Brooklyn avec des pouvoirs uniques.",
    biography: "Miles Morales est un adolescent afro-latino de Brooklyn qui a obtenu des pouvoirs d'araignée similaires à ceux de Peter Parker, mais avec des capacités supplémentaires comme le camouflage et les décharges bioélectriques. Il reprend le flambeau de Spider-Man tout en développant sa propre identité de héros.",
    powers: ["Pouvoirs d'araignée", "Camouflage", "Décharge bioélectrique (Venom Blast)", "Sens d'araignée", "Adhérence aux surfaces"],
    power_level: 82,
    image_url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-o3HvV5uFdDkpAFhlPtJg5J0rnUwitv.png",
    connections: ["spider-man"],
    comicAppearance: {
      first: "Août 2011",
      comic: "Ultimate Fallout #4",
      year: 2011
    }
  },
  {
    id: "star-lord",
    name: "Star-Lord",
    realName: "Peter Quill",
    team: "Gardiens",
    description: "Peter Quill, mi-humain mi-Céleste, leader charismatique des Gardiens de la Galaxie.",
    biography: "Peter Quill a été enlevé de la Terre enfant par les Ravageurs après la mort de sa mère. Découvrant plus tard que son père était le Céleste Ego, il a embrassé son héritage cosmique tout en restant fidèle à son humanité en tant que leader des Gardiens de la Galaxie.",
    powers: ["Tactique de combat", "Pilotage expert", "Armes à énergie", "Héritage Céleste", "Charisme de leader"],
    power_level: 60,
    image_url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-MgLE17BbGuiwPbOLiNitdB3TIDCxPN.png",
    connections: ["gamora", "groot", "rocket", "drax", "thanos"],
    comicAppearance: {
      first: "Janvier 1976",
      comic: "Marvel Preview #4",
      year: 1976
    },
    mcuAppearance: {
      first: "2014",
      firstFilm: "Guardians of the Galaxy",
      last: "2023",
      lastFilm: "Guardians of the Galaxy Vol. 3"
    }
  },
  {
    id: "gamora",
    name: "Gamora",
    realName: "Gamora Zen Whoberi Ben Titan",
    team: "Gardiens",
    description: "La femme la plus dangereuse de la galaxie, fille adoptive de Thanos.",
    biography: "Gamora est la dernière survivante de son espèce, adoptée et entraînée par Thanos pour devenir une arme vivante parfaite. Après avoir trahi son père adoptif, elle rejoint les Gardiens de la Galaxie pour racheter ses crimes passés.",
    powers: ["Arts martiaux avancés", "Force surhumaine", "Agilité exceptionnelle", "Assassin expert", "Résistance améliorée"],
    power_level: 72,
    image_url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-N3aIlffEz0UNU09kihEZbQyFuEpkyQ.png",
    connections: ["star-lord", "groot", "rocket", "drax", "thanos"],
    comicAppearance: {
      first: "Juin 1975",
      comic: "Strange Tales #180",
      year: 1975
    },
    mcuAppearance: {
      first: "2014",
      firstFilm: "Guardians of the Galaxy",
      last: "2023",
      lastFilm: "Guardians of the Galaxy Vol. 3"
    }
  },
  {
    id: "groot",
    name: "Groot",
    realName: "Groot",
    team: "Gardiens",
    description: "Être végétal sensible et loyal compagnon de Rocket Raccoon.",
    biography: "Groot est un colosse de la planète X, un être végétal intelligent qui ne peut prononcer que les mots 'Je s'appelle Groot'. Malgré cette limitation, il communique des émotions complexes et a prouvé être l'un des membres les plus courageux et loyaux des Gardiens.",
    powers: ["Régénération végétale", "Manipulation corporelle", "Force immense", "Extension des membres", "Communication végétale"],
    power_level: 70,
    image_url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-bX0X0p1x6uFRSMy56eVqWJ5hPxWLjm.png",
    connections: ["star-lord", "gamora", "rocket", "drax"],
    comicAppearance: {
      first: "Novembre 1960",
      comic: "Tales to Astonish #13",
      year: 1960
    },
    mcuAppearance: {
      first: "2014",
      firstFilm: "Guardians of the Galaxy",
      last: "2023",
      lastFilm: "Guardians of the Galaxy Vol. 3"
    }
  },
  {
    id: "thanos",
    name: "Thanos",
    realName: "Thanos",
    team: "Vilains",
    description: "Le Titan Fou, obsédé par l'équilibre universel et les Pierres d'Infinité.",
    biography: "Thanos de Titan est l'un des êtres les plus puissants et redoutés de l'univers. Obsédé par l'idée que la surpopulation mène à l'extinction, il a rassemblé les six Pierres d'Infinité pour éliminer la moitié de toute vie dans l'univers d'un claquement de doigts.",
    powers: ["Force cosmique", "Durabilité quasi-invulnérable", "Intelligence stratégique", "Maîtrise du combat", "Gantelet d'Infinité"],
    power_level: 100,
    image_url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Capture%20d%27%C3%A9cran%202026-05-03%20020654-XXBZ08eWHGSLhSZmA6Knu9LSeTpImi.png",
    connections: ["gamora", "loki", "iron-man", "captain-america", "thor"],
    comicAppearance: {
      first: "Février 1973",
      comic: "Iron Man #55",
      year: 1973
    },
    mcuAppearance: {
      first: "2012",
      firstFilm: "The Avengers (post-générique)",
      last: "2019",
      lastFilm: "Avengers: Endgame"
    }
  },
  {
    id: "loki",
    name: "Loki",
    realName: "Loki Laufeyson",
    team: "Vilains",
    description: "Le Dieu de la Malice, frère adoptif de Thor et maître de la tromperie.",
    biography: "Loki Laufeyson, prince des Géants de Glace, a été adopté par Odin et élevé comme prince d'Asgard aux côtés de Thor. Maître de la magie et de l'illusion, ses motivations oscillent constamment entre la vilenie, l'anti-héroïsme et parfois même l'héroïsme.",
    powers: ["Magie d'illusion", "Métamorphose", "Super force asgardienne", "Manipulation mentale", "Longévité divine"],
    power_level: 82,
    image_url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Capture%20d%27%C3%A9cran%202026-05-03%20020707-jfUeHvI7IhxYlFTGAbxnAdVX7lGbjX.png",
    connections: ["thor", "thanos"],
    comicAppearance: {
      first: "Août 1962",
      comic: "Journey into Mystery #85",
      year: 1962
    },
    mcuAppearance: {
      first: "2011",
      firstFilm: "Thor",
      last: "2023",
      lastFilm: "Loki (Saison 2)"
    }
  },
  {
    id: "doctor-doom",
    name: "Doctor Doom",
    realName: "Victor Von Doom",
    team: "Vilains",
    description: "Victor Von Doom, génie scientifique et sorcier, monarque absolu de Latvérie.",
    biography: "Victor Von Doom est le dirigeant souverain de Latvérie et l'un des plus grands ennemis des Fantastic Four. Génie rival de Reed Richards, il combine une maîtrise technologique avancée avec les arts occultes, portant une armure qui en fait l'un des êtres les plus puissants de la Terre.",
    powers: ["Génie scientifique", "Magie occulte", "Armure technologique", "Diplomatie et stratégie", "Ressources d'un pays"],
    power_level: 95,
    image_url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-MOLzBJU80LWi5dpwdlNdxGTdgkgJgi.png",
    connections: ["iron-man", "doctor-strange", "thanos"],
    comicAppearance: {
      first: "Juillet 1962",
      comic: "Fantastic Four #5",
      year: 1962
    },
    mcuAppearance: {
      first: "2026",
      firstFilm: "Avengers: Doomsday (à venir)"
    }
  },
  {
    id: "black-panther",
    name: "Black Panther",
    realName: "T'Challa",
    team: "Avengers",
    description: "T'Challa, roi du Wakanda et protecteur de la nation la plus avancée technologiquement.",
    biography: "T'Challa est le roi du Wakanda, une nation africaine secrètement ultra-avancée grâce au vibranium. En tant que Black Panther, il possède des capacités surhumaines conférées par l'Herbe en Forme de Cœur et utilise la technologie wakandaise la plus sophistiquée pour protéger son peuple et le monde.",
    powers: ["Sens surhumains", "Force et agilité améliorées", "Costume en vibranium", "Arts martiaux maîtrisés", "Technologie wakandaise"],
    power_level: 80,
    image_url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-sqpykfUVXaJBVg1JB1fqtLxHZ6JWNu.png",
    connections: ["storm", "captain-america", "iron-man"],
    comicAppearance: {
      first: "Juillet 1966",
      comic: "Fantastic Four #52",
      year: 1966
    },
    mcuAppearance: {
      first: "2016",
      firstFilm: "Captain America: Civil War",
      last: "2022",
      lastFilm: "Black Panther: Wakanda Forever"
    }
  },
  {
    id: "hawkeye",
    name: "Hawkeye",
    realName: "Clint Barton",
    team: "Avengers",
    description: "Clint Barton, archer d'élite et agent du SHIELD, membre fondateur des Avengers.",
    biography: "Clint Barton a grandi dans un cirque où il a perfectionné ses talents de tireur d'élite jusqu'à devenir le meilleur archer du monde. Recruté par le SHIELD, il est devenu un agent d'élite avant de rejoindre les Avengers. Sans super-pouvoirs, il compense par une précision parfaite et un courage sans faille.",
    powers: ["Archerie parfaite", "Flèches spécialisées", "Combat au corps à corps", "Tactique de combat", "Acrobaties avancées"],
    power_level: 55,
    image_url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-vdg4kdOJ6p5B7Wj0UUpAQAEg3yYq6q.png",
    connections: ["black-widow", "captain-america", "iron-man"],
    comicAppearance: {
      first: "Septembre 1964",
      comic: "Tales of Suspense #57",
      year: 1964
    },
    mcuAppearance: {
      first: "2011",
      firstFilm: "Thor (caméo)",
      last: "2021",
      lastFilm: "Hawkeye (série Disney+)"
    }
  },
  {
    id: "drax",
    name: "Drax le Destructeur",
    realName: "Arthur Douglas",
    team: "Gardiens",
    description: "Guerrier vengeur dont la famille a été tuée par Thanos, membre des Gardiens de la Galaxie.",
    biography: "Arthur Douglas était un humain dont la famille a été massacrée par Thanos. Ressuscité par les êtres cosmiques Kronos et Mentor dans un nouveau corps puissant, il est devenu Drax le Destructeur, jurant de tuer le Titan Fou. Il a trouvé une nouvelle famille avec les Gardiens de la Galaxie.",
    powers: ["Force surhumaine", "Durabilité améliorée", "Maître des lames", "Régénération", "Sens améliorés"],
    power_level: 75,
    image_url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-hmA50pfZoR4tpo6NSiZlUWJ451gyWe.png",
    connections: ["star-lord", "gamora", "groot", "rocket", "thanos"],
    comicAppearance: {
      first: "Décembre 1973",
      comic: "Iron Man #55",
      year: 1973
    },
    mcuAppearance: {
      first: "2014",
      firstFilm: "Guardians of the Galaxy",
      last: "2023",
      lastFilm: "Guardians of the Galaxy Vol. 3"
    }
  },
  {
    id: "rocket",
    name: "Rocket Raccoon",
    realName: "89P13",
    team: "Gardiens",
    description: "Raton laveur génétiquement modifié, expert en armes et pilote des Gardiens de la Galaxie.",
    biography: "Rocket est le résultat d'expériences génétiques illégales qui l'ont transformé en être sensible avec une intelligence supérieure. Expert en armes et tactiques, c'est aussi un pilote et mécanicien de génie. Derrière son attitude abrasive se cache un cœur loyal, surtout envers son meilleur ami Groot.",
    powers: ["Génie tactique", "Expert en armement", "Pilote d'élite", "Ingénierie avancée", "Sens améliorés"],
    power_level: 58,
    image_url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-k3HBS0XkkMAuPo8Sovtg7OBxOXuy2S.png",
    connections: ["groot", "star-lord", "gamora", "drax"],
    comicAppearance: {
      first: "Été 1976",
      comic: "Marvel Preview #7",
      year: 1976
    },
    mcuAppearance: {
      first: "2014",
      firstFilm: "Guardians of the Galaxy",
      last: "2023",
      lastFilm: "Guardians of the Galaxy Vol. 3"
    }
  }
]

export const teams = ["Tous", "Avengers", "X-Men", "Gardiens", "Vilains", "Autres"] as const
export type Team = typeof teams[number]
