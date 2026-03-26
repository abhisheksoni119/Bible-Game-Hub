export type Category = "old-testament" | "new-testament" | "general";
export type Difficulty = "easy" | "medium" | "hard";

export interface TriviaQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  category: Category;
  difficulty: Difficulty;
}

export const triviaQuestions: TriviaQuestion[] = [
  // Easy - General
  { id: 1, question: "Who built the ark?", options: ["Moses", "Noah", "Abraham", "David"], correctIndex: 1, category: "general", difficulty: "easy" },
  { id: 2, question: "How many days and nights did it rain during the flood?", options: ["7", "12", "40", "100"], correctIndex: 2, category: "general", difficulty: "easy" },
  { id: 3, question: "Who was the first man created?", options: ["Adam", "Enoch", "Cain", "Seth"], correctIndex: 0, category: "general", difficulty: "easy" },
  { id: 4, question: "Where was Jesus born?", options: ["Jerusalem", "Nazareth", "Bethlehem", "Jericho"], correctIndex: 2, category: "general", difficulty: "easy" },
  
  // Easy - Old Testament
  { id: 5, question: "What did David use to defeat Goliath?", options: ["A sword", "A spear", "A sling and a stone", "A bow and arrow"], correctIndex: 2, category: "old-testament", difficulty: "easy" },
  { id: 6, question: "Who was swallowed by a great fish?", options: ["Peter", "Jonah", "Paul", "Elijah"], correctIndex: 1, category: "old-testament", difficulty: "easy" },
  { id: 7, question: "What sea did the Israelites cross on dry land?", options: ["Dead Sea", "Mediterranean Sea", "Red Sea", "Sea of Galilee"], correctIndex: 2, category: "old-testament", difficulty: "easy" },
  
  // Easy - New Testament
  { id: 8, question: "Who baptized Jesus?", options: ["Peter", "John the Baptist", "James", "Matthew"], correctIndex: 1, category: "new-testament", difficulty: "easy" },
  { id: 9, question: "What was Jesus' earthly father's profession?", options: ["Fisherman", "Shepherd", "Carpenter", "Tax Collector"], correctIndex: 2, category: "new-testament", difficulty: "easy" },
  { id: 10, question: "How many disciples did Jesus choose?", options: ["7", "10", "12", "40"], correctIndex: 2, category: "new-testament", difficulty: "easy" },

  // Medium - General
  { id: 11, question: "Which book is the longest in the Bible?", options: ["Genesis", "Isaiah", "Psalms", "Jeremiah"], correctIndex: 2, category: "general", difficulty: "medium" },
  { id: 12, question: "Who wrote the majority of the New Testament letters?", options: ["Peter", "John", "Luke", "Paul"], correctIndex: 3, category: "general", difficulty: "medium" },
  
  // Medium - Old Testament
  { id: 13, question: "Who was Moses' brother?", options: ["Joshua", "Aaron", "Caleb", "Miriam"], correctIndex: 1, category: "old-testament", difficulty: "medium" },
  { id: 14, question: "What were the first two birds Noah sent out from the ark?", options: ["A raven and a dove", "Two doves", "An eagle and a dove", "A raven and a sparrow"], correctIndex: 0, category: "old-testament", difficulty: "medium" },
  { id: 15, question: "Who interpreted Pharaoh's dreams?", options: ["Daniel", "Jacob", "Joseph", "Moses"], correctIndex: 2, category: "old-testament", difficulty: "medium" },

  // Medium - New Testament
  { id: 16, question: "What was the first miracle Jesus performed?", options: ["Walking on water", "Healing a blind man", "Turning water into wine", "Feeding the 5000"], correctIndex: 2, category: "new-testament", difficulty: "medium" },
  { id: 17, question: "Who was the tax collector that climbed a tree to see Jesus?", options: ["Matthew", "Zacchaeus", "Nicodemus", "Judas"], correctIndex: 1, category: "new-testament", difficulty: "medium" },

  // Hard - General
  { id: 18, question: "What is the shortest verse in the Bible?", options: ["'God is love.'", "'Jesus wept.'", "'Pray continually.'", "'Rejoice always.'"], correctIndex: 1, category: "general", difficulty: "hard" },
  { id: 19, question: "Who was the oldest man mentioned in the Bible?", options: ["Noah", "Adam", "Methuselah", "Enoch"], correctIndex: 2, category: "general", difficulty: "hard" },
  
  // Hard - Old Testament
  { id: 20, question: "Who was the left-handed judge that assassinated King Eglon?", options: ["Gideon", "Samson", "Ehud", "Jephthah"], correctIndex: 2, category: "old-testament", difficulty: "hard" },
  { id: 21, question: "What king of Judah was stricken with leprosy?", options: ["Uzziah", "Hezekiah", "Josiah", "Manasseh"], correctIndex: 0, category: "old-testament", difficulty: "hard" },

  // Hard - New Testament
  { id: 22, question: "On what island was John exiled when he wrote Revelation?", options: ["Malta", "Cyprus", "Patmos", "Crete"], correctIndex: 2, category: "new-testament", difficulty: "hard" },
  { id: 23, question: "Who fell asleep and fell out of a window while Paul was preaching?", options: ["Eutychus", "Trophimus", "Timothy", "Silas"], correctIndex: 0, category: "new-testament", difficulty: "hard" }
];

export const wordSearchWords = ["JESUS", "MOSES", "DAVID", "NOAH", "FAITH", "GRACE", "PRAYER", "BIBLE", "ANGEL", "PSALM"];

export const kidsGameItems = [
  { id: "lion", icon: "🦁", name: "Lion" },
  { id: "dove", icon: "🕊️", name: "Dove" },
  { id: "fish", icon: "🐟", name: "Fish" },
  { id: "lamb", icon: "🐑", name: "Lamb" },
  { id: "snake", icon: "🐍", name: "Snake" },
  { id: "donkey", icon: "🐴", name: "Donkey" },
];

export const homeFAQs = [
  { q: "Are these Bible games completely free?", a: "Yes! All games on Bible Games Online are 100% free to play. There are no hidden fees or subscriptions required." },
  { q: "Do I need to create an account to play?", a: "No account is needed. You can jump right in and start playing immediately without any registration." },
  { q: "Are these games suitable for children?", a: "Absolutely. We have a dedicated Kids Games section with simple, engaging activities, and all our content is family-friendly." },
  { q: "Can I play on my mobile phone?", a: "Yes, our website is fully responsive and designed to work seamlessly on desktops, tablets, and smartphones." },
  { q: "Do you add new questions to the trivia games?", a: "We regularly update our database with new questions across all difficulty levels to keep the challenges fresh." }
];
