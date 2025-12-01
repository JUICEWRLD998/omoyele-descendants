export interface FamilyMember {
  id: string
  name: string
  dateOfBirth: string
  dateOfDeath?: string
  bio: string
  photo?: string
  generation: number
  parentIds: string[]
  childrenIds: string[]
}

// Sample family data
export const familyMembers: FamilyMember[] = [
  {
    id: "john-sr",
    name: "John Smith Sr.",
    dateOfBirth: "1935-03-15",
    dateOfDeath: "2010-07-22",
    bio: "Founder of the family legacy. A remarkable entrepreneur and loving grandfather.",
    photo: "/elder-man-portrait.jpg",
    generation: 0,
    parentIds: [],
    childrenIds: ["john-jr", "mary"],
  },
  {
    id: "margaret",
    name: "Margaret Smith",
    dateOfBirth: "1937-06-20",
    dateOfDeath: "2015-11-10",
    bio: "The heart of our family. Known for her warmth, wisdom, and delicious recipes.",
    photo: "/elder-woman-portrait.jpg",
    generation: 0,
    parentIds: [],
    childrenIds: ["john-jr", "mary"],
  },
  {
    id: "john-jr",
    name: "John Smith Jr.",
    dateOfBirth: "1960-01-10",
    bio: "Carried on the family business with innovation and heart.",
    photo: "/middle-aged-man-portrait.jpg",
    generation: 1,
    parentIds: ["john-sr", "margaret"],
    childrenIds: ["sarah", "michael", "emma"],
  },
  {
    id: "mary",
    name: "Mary Johnson",
    dateOfBirth: "1963-08-25",
    bio: "Artist and educator, brought creativity to the family.",
    photo: "/middle-aged-woman-portrait.png",
    generation: 1,
    parentIds: ["john-sr", "margaret"],
    childrenIds: ["david", "susan"],
  },
  {
    id: "sarah",
    name: "Sarah Smith",
    dateOfBirth: "1985-05-12",
    bio: "Medical professional dedicated to helping others.",
    photo: "/young-woman-portrait.png",
    generation: 2,
    parentIds: ["john-jr"],
    childrenIds: [],
  },
  {
    id: "michael",
    name: "Michael Smith",
    dateOfBirth: "1988-09-03",
    bio: "Software engineer and tech enthusiast exploring new frontiers.",
    photo: "/young-man-portrait.png",
    generation: 2,
    parentIds: ["john-jr"],
    childrenIds: ["thomas"],
  },
  {
    id: "emma",
    name: "Emma Smith",
    dateOfBirth: "1992-02-18",
    bio: "Musician and environmentalist passionate about sustainable living.",
    photo: "/young-woman-musician.jpg",
    generation: 2,
    parentIds: ["john-jr"],
    childrenIds: [],
  },
  {
    id: "david",
    name: "David Johnson",
    dateOfBirth: "1987-11-30",
    bio: "Architect designing beautiful spaces and buildings.",
    photo: "/young-man-architect.jpg",
    generation: 2,
    parentIds: ["mary"],
    childrenIds: [],
  },
  {
    id: "susan",
    name: "Susan Johnson",
    dateOfBirth: "1990-04-14",
    bio: "Teacher inspiring the next generation of minds.",
    photo: "/young-woman-teacher.jpg",
    generation: 2,
    parentIds: ["mary"],
    childrenIds: [],
  },
  {
    id: "thomas",
    name: "Thomas Smith",
    dateOfBirth: "2015-08-22",
    bio: "The newest member of our family, full of joy and promise.",
    photo: "/young-child-portrait.jpg",
    generation: 3,
    parentIds: ["michael"],
    childrenIds: [],
  },
]

export function getFamilyMemberById(id: string): FamilyMember | undefined {
  return familyMembers.find((member) => member.id === id)
}

export function getGenerationMembers(generation: number): FamilyMember[] {
  return familyMembers.filter((member) => member.generation === generation)
}
