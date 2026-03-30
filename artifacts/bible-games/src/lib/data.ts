export type Category = "old-testament" | "new-testament" | "general";
export type Difficulty = "easy" | "medium" | "hard";

export interface TriviaQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  category: Category;
  difficulty: Difficulty;
  explanation: string;
}

export const triviaQuestions: TriviaQuestion[] = [

  // ══════════════════════════════════════════════════════════════════════════
  // EASY · GENERAL
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 1, question: "Who built the ark?",
    options: ["Moses", "Noah", "Abraham", "David"], correctIndex: 1,
    category: "general", difficulty: "easy",
    explanation: "God commanded Noah to build the ark to save his family and two of every creature from the great flood (Genesis 6–7).",
  },
  {
    id: 2, question: "How many days and nights did it rain during the flood?",
    options: ["7", "12", "40", "100"], correctIndex: 2,
    category: "general", difficulty: "easy",
    explanation: "Rain fell for 40 days and 40 nights, flooding the entire earth (Genesis 7:12).",
  },
  {
    id: 3, question: "Who was the first man created by God?",
    options: ["Adam", "Enoch", "Cain", "Seth"], correctIndex: 0,
    category: "general", difficulty: "easy",
    explanation: "God formed Adam from the dust of the ground and breathed life into him (Genesis 2:7).",
  },
  {
    id: 4, question: "Where was Jesus born?",
    options: ["Jerusalem", "Nazareth", "Bethlehem", "Jericho"], correctIndex: 2,
    category: "general", difficulty: "easy",
    explanation: "Jesus was born in Bethlehem of Judea, fulfilling the prophecy in Micah 5:2 (Luke 2:4–7).",
  },
  {
    id: 5, question: "How many books are in the Bible?",
    options: ["52", "60", "66", "73"], correctIndex: 2,
    category: "general", difficulty: "easy",
    explanation: "The Protestant Bible contains 66 books — 39 in the Old Testament and 27 in the New Testament.",
  },
  {
    id: 6, question: "What is the first book of the Bible?",
    options: ["Exodus", "Psalms", "Genesis", "Numbers"], correctIndex: 2,
    category: "general", difficulty: "easy",
    explanation: "Genesis is the first book of the Bible. Its name means 'beginning' or 'origin.'",
  },
  {
    id: 7, question: "What is the last book of the Bible?",
    options: ["Jude", "Hebrews", "Acts", "Revelation"], correctIndex: 3,
    category: "general", difficulty: "easy",
    explanation: "Revelation is the final book of the New Testament and of the entire Bible.",
  },
  {
    id: 8, question: "What does the word 'Gospel' mean?",
    options: ["Sacred law", "Good news", "Holy word", "Ancient story"], correctIndex: 1,
    category: "general", difficulty: "easy",
    explanation: "'Gospel' translates the Greek word 'euangelion,' meaning 'good news' — referring to the message of Jesus Christ.",
  },
  {
    id: 9, question: "What animal carried Jesus into Jerusalem on Palm Sunday?",
    options: ["Horse", "Camel", "Donkey", "Ox"], correctIndex: 2,
    category: "general", difficulty: "easy",
    explanation: "Jesus rode a young donkey (colt) into Jerusalem, fulfilling Zechariah 9:9 (Matthew 21:5–7).",
  },
  {
    id: 10, question: "On which day did God rest after the six days of creation?",
    options: ["Fifth day", "Sixth day", "Seventh day", "Eighth day"], correctIndex: 2,
    category: "general", difficulty: "easy",
    explanation: "God rested on the seventh day and made it holy — the origin of the Sabbath (Genesis 2:2–3).",
  },
  {
    id: 11, question: "What does 'Emmanuel' (Immanuel) mean?",
    options: ["Son of God", "God with us", "God saves", "Praise God"], correctIndex: 1,
    category: "general", difficulty: "easy",
    explanation: "'Immanuel' is Hebrew for 'God with us.' Isaiah prophesied this name (Isaiah 7:14), fulfilled in Jesus (Matthew 1:23).",
  },
  {
    id: 12, question: "Which angel announced Jesus' birth to Mary?",
    options: ["Michael", "Raphael", "Gabriel", "Uriel"], correctIndex: 2,
    category: "general", difficulty: "easy",
    explanation: "The angel Gabriel appeared to Mary in Nazareth and announced she would conceive and bear the Son of God (Luke 1:26–33).",
  },
  {
    id: 13, question: "What did the dove bring back to Noah after the flood?",
    options: ["A fig leaf", "An olive branch", "A flower", "A palm branch"], correctIndex: 1,
    category: "general", difficulty: "easy",
    explanation: "The dove returned with a freshly plucked olive leaf, signaling that the floodwaters had receded (Genesis 8:11).",
  },
  {
    id: 14, question: "Who were the first two sons of Adam and Eve?",
    options: ["Isaac and Ishmael", "Cain and Abel", "Jacob and Esau", "Moses and Aaron"], correctIndex: 1,
    category: "general", difficulty: "easy",
    explanation: "Cain and Abel were the first two sons of Adam and Eve. Cain killed Abel out of jealousy (Genesis 4:1–8).",
  },
  {
    id: 15, question: "What is the first of the Ten Commandments?",
    options: ["You shall not murder", "You shall have no other gods before me", "Remember the Sabbath", "Honor your father and mother"], correctIndex: 1,
    category: "general", difficulty: "easy",
    explanation: "The first commandment prohibits worshipping any god other than the Lord God (Exodus 20:3).",
  },
  {
    id: 16, question: "How many commandments did God give Moses on Mount Sinai?",
    options: ["5", "7", "10", "12"], correctIndex: 2,
    category: "general", difficulty: "easy",
    explanation: "God gave Moses the Ten Commandments (Decalogue) written on two stone tablets (Exodus 20; Deuteronomy 5).",
  },
  {
    id: 17, question: "What prayer did Jesus teach his disciples?",
    options: ["The Beatitudes", "The Lord's Prayer", "The Great Commission", "The Doxology"], correctIndex: 1,
    category: "general", difficulty: "easy",
    explanation: "Jesus taught his disciples a model prayer beginning 'Our Father in heaven...' commonly called the Lord's Prayer (Matthew 6:9–13).",
  },
  {
    id: 18, question: "Who was Moses' older sister?",
    options: ["Rahab", "Miriam", "Naomi", "Deborah"], correctIndex: 1,
    category: "general", difficulty: "easy",
    explanation: "Miriam was Moses' older sister. She watched over baby Moses in his basket and later led Israel's women in song after crossing the Red Sea (Exodus 15:20–21).",
  },
  {
    id: 19, question: "What does 'Hallelujah' mean?",
    options: ["Praise God alone", "Praise the Lord", "God is holy", "Blessed be God"], correctIndex: 1,
    category: "general", difficulty: "easy",
    explanation: "'Hallelujah' comes from Hebrew 'halelu Yah' — 'praise Yah (the Lord).' It appears frequently in the Psalms as a call to worship.",
  },
  {
    id: 20, question: "How many Gospels are in the New Testament?",
    options: ["2", "3", "4", "5"], correctIndex: 2,
    category: "general", difficulty: "easy",
    explanation: "There are four Gospels: Matthew, Mark, Luke, and John — each giving an account of Jesus' life, death, and resurrection.",
  },
  {
    id: 21, question: "What does the name 'Jesus' mean?",
    options: ["King of kings", "The Lord saves", "Lamb of God", "Light of the world"], correctIndex: 1,
    category: "general", difficulty: "easy",
    explanation: "The name 'Jesus' comes from the Greek form of the Hebrew 'Yeshua,' meaning 'the Lord saves' or 'God is salvation' (Matthew 1:21).",
  },
  {
    id: 22, question: "Who was Adam's wife?",
    options: ["Miriam", "Rebekah", "Eve", "Leah"], correctIndex: 2,
    category: "general", difficulty: "easy",
    explanation: "God created Eve from Adam's rib as a companion and helper. Adam named her 'Eve' because she would be the mother of all the living (Genesis 2:22; 3:20).",
  },
  {
    id: 23, question: "What was Jesus' hometown?",
    options: ["Bethlehem", "Jerusalem", "Jericho", "Nazareth"], correctIndex: 3,
    category: "general", difficulty: "easy",
    explanation: "Jesus grew up in Nazareth in Galilee, which is why he was called 'Jesus of Nazareth' (Luke 2:51; Matthew 2:23).",
  },
  {
    id: 24, question: "Which tree in the Garden of Eden was forbidden to Adam and Eve?",
    options: ["The tree of life", "The fig tree", "The tree of the knowledge of good and evil", "The cedar tree"], correctIndex: 2,
    category: "general", difficulty: "easy",
    explanation: "God told Adam not to eat from the tree of the knowledge of good and evil. Eating it would result in death (Genesis 2:17).",
  },
  {
    id: 25, question: "Who was the first person to see Jesus after his resurrection?",
    options: ["Mary the mother of Jesus", "Peter", "Mary Magdalene", "John"], correctIndex: 2,
    category: "general", difficulty: "easy",
    explanation: "Mary Magdalene was the first to see the risen Jesus outside the tomb on the morning of the resurrection (John 20:14–16; Mark 16:9).",
  },
  {
    id: 26, question: "What does John 3:16 say God gave because he loved the world?",
    options: ["The Ten Commandments", "His one and only Son", "The Promised Land", "Eternal peace"], correctIndex: 1,
    category: "general", difficulty: "easy",
    explanation: "John 3:16 says, 'For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.'",
  },
  {
    id: 27, question: "What did Jesus say is the second greatest commandment?",
    options: ["Keep the Sabbath holy", "Do not murder", "Love your neighbor as yourself", "Honor your parents"], correctIndex: 2,
    category: "general", difficulty: "easy",
    explanation: "Jesus said the second greatest commandment is 'Love your neighbor as yourself.' Together with loving God, these two commands summarize the whole Law (Matthew 22:39).",
  },

  // ══════════════════════════════════════════════════════════════════════════
  // EASY · OLD TESTAMENT
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 28, question: "What did David use to defeat Goliath?",
    options: ["A sword", "A spear", "A sling and a stone", "A bow and arrow"], correctIndex: 2,
    category: "old-testament", difficulty: "easy",
    explanation: "David struck Goliath in the forehead with a stone from his sling, killing the Philistine giant (1 Samuel 17:49).",
  },
  {
    id: 29, question: "Who was swallowed by a great fish?",
    options: ["Peter", "Jonah", "Paul", "Elijah"], correctIndex: 1,
    category: "old-testament", difficulty: "easy",
    explanation: "Jonah was swallowed by a great fish after he fled from God's command to go to Nineveh. He remained inside three days and three nights (Jonah 1:17).",
  },
  {
    id: 30, question: "What body of water did the Israelites cross on dry land?",
    options: ["Dead Sea", "Mediterranean Sea", "Red Sea", "Sea of Galilee"], correctIndex: 2,
    category: "old-testament", difficulty: "easy",
    explanation: "God parted the Red Sea for Moses and the Israelites as they escaped from Pharaoh's army (Exodus 14).",
  },
  {
    id: 31, question: "What garden did Adam and Eve live in?",
    options: ["Garden of Gethsemane", "Garden of Eden", "Garden of Olives", "Garden of Sinai"], correctIndex: 1,
    category: "old-testament", difficulty: "easy",
    explanation: "God planted the Garden of Eden in the east and placed Adam there to tend and keep it (Genesis 2:8–15).",
  },
  {
    id: 32, question: "How many sons did Jacob have?",
    options: ["10", "11", "12", "14"], correctIndex: 2,
    category: "old-testament", difficulty: "easy",
    explanation: "Jacob had 12 sons who became the ancestors of the 12 tribes of Israel (Genesis 35:22–26).",
  },
  {
    id: 33, question: "Who led the Israelites out of Egypt?",
    options: ["Joshua", "Aaron", "Moses", "Abraham"], correctIndex: 2,
    category: "old-testament", difficulty: "easy",
    explanation: "God chose Moses to lead the Israelites out of slavery in Egypt during the Exodus (Exodus 3–14).",
  },
  {
    id: 34, question: "Who was Abraham's wife?",
    options: ["Rebekah", "Rachel", "Sarah", "Leah"], correctIndex: 2,
    category: "old-testament", difficulty: "easy",
    explanation: "Sarah was Abraham's wife. God promised she would bear a son in her old age, and she gave birth to Isaac at age 90 (Genesis 17:15–19; 21:1–3).",
  },
  {
    id: 35, question: "What food did God send from heaven to feed the Israelites in the desert?",
    options: ["Bread and fish", "Quail alone", "Manna", "Dates and honey"], correctIndex: 2,
    category: "old-testament", difficulty: "easy",
    explanation: "God sent manna — a flake-like substance that appeared on the ground each morning — to feed Israel in the wilderness (Exodus 16:14–15).",
  },
  {
    id: 36, question: "Who was sold into slavery by his brothers?",
    options: ["Benjamin", "Reuben", "Joseph", "Simeon"], correctIndex: 2,
    category: "old-testament", difficulty: "easy",
    explanation: "Joseph's brothers were jealous of his special coat and their father's favoritism. They sold him to Ishmaelite traders who took him to Egypt (Genesis 37:28).",
  },
  {
    id: 37, question: "What did Abraham almost sacrifice on the mountain?",
    options: ["A lamb", "His servant", "His son Isaac", "His son Ishmael"], correctIndex: 2,
    category: "old-testament", difficulty: "easy",
    explanation: "God tested Abraham by commanding him to sacrifice Isaac. At the last moment, God provided a ram and spared Isaac (Genesis 22:1–14).",
  },
  {
    id: 38, question: "What city did Jonah sail away from when he ran from God?",
    options: ["Joppa", "Nineveh", "Jericho", "Bethel"], correctIndex: 0,
    category: "old-testament", difficulty: "easy",
    explanation: "Jonah boarded a ship at Joppa (modern Jaffa) heading to Tarshish to flee from God's command to preach in Nineveh (Jonah 1:3).",
  },
  {
    id: 39, question: "Who was thrown into a den of lions?",
    options: ["Shadrach", "Ezra", "Daniel", "Nehemiah"], correctIndex: 2,
    category: "old-testament", difficulty: "easy",
    explanation: "Daniel was thrown into a lions' den for continuing to pray to God despite King Darius's decree. God shut the lions' mouths (Daniel 6).",
  },
  {
    id: 40, question: "What animal spoke to Balaam on the road?",
    options: ["A raven", "A donkey", "A serpent", "A camel"], correctIndex: 1,
    category: "old-testament", difficulty: "easy",
    explanation: "God opened the mouth of Balaam's donkey to speak after the animal saw the angel of the Lord blocking their path (Numbers 22:28–30).",
  },
  {
    id: 41, question: "Where did God give Moses the Ten Commandments?",
    options: ["Mount Carmel", "Mount Hermon", "Mount Sinai", "Mount of Olives"], correctIndex: 2,
    category: "old-testament", difficulty: "easy",
    explanation: "God appeared to Moses on Mount Sinai (also called Horeb) and gave him the Ten Commandments on two stone tablets (Exodus 19–20).",
  },
  {
    id: 42, question: "What special garment did Jacob give his son Joseph?",
    options: ["A golden crown", "A coat of many colors", "A priestly robe", "A silk cloak"], correctIndex: 1,
    category: "old-testament", difficulty: "easy",
    explanation: "Jacob gave Joseph an ornate robe (coat of many colors) as a sign of favor, which stirred his brothers' jealousy (Genesis 37:3).",
  },
  {
    id: 43, question: "What occupation did Moses have before leading Israel?",
    options: ["Carpenter", "Soldier", "Shepherd", "Priest"], correctIndex: 2,
    category: "old-testament", difficulty: "easy",
    explanation: "After fleeing Egypt, Moses became a shepherd for his father-in-law Jethro in the land of Midian (Exodus 3:1).",
  },
  {
    id: 44, question: "How many days was Jonah inside the great fish?",
    options: ["1 day", "3 days and 3 nights", "7 days", "40 days"], correctIndex: 1,
    category: "old-testament", difficulty: "easy",
    explanation: "Jonah was inside the fish for three days and three nights before it vomited him onto dry land (Jonah 1:17). Jesus used this as a sign of his own burial and resurrection.",
  },
  {
    id: 45, question: "What mountain did Noah's ark come to rest on?",
    options: ["Mount Sinai", "Mount Hermon", "Mount Ararat", "Mount Carmel"], correctIndex: 2,
    category: "old-testament", difficulty: "easy",
    explanation: "On the seventeenth day of the seventh month, the ark came to rest on the mountains of Ararat (Genesis 8:4).",
  },
  {
    id: 46, question: "In what country were the Israelites enslaved before the Exodus?",
    options: ["Babylon", "Assyria", "Egypt", "Persia"], correctIndex: 2,
    category: "old-testament", difficulty: "easy",
    explanation: "The Israelites were enslaved in Egypt for 400 years before God sent Moses to lead them out (Genesis 15:13; Exodus 12:40).",
  },
  {
    id: 47, question: "What new name did God give to Jacob?",
    options: ["Abraham", "Israel", "Joseph", "Judah"], correctIndex: 1,
    category: "old-testament", difficulty: "easy",
    explanation: "God changed Jacob's name to 'Israel' after he wrestled with God through the night. Israel means 'he who struggles with God' (Genesis 32:28).",
  },
  {
    id: 48, question: "Who was the first woman created?",
    options: ["Miriam", "Sarah", "Leah", "Eve"], correctIndex: 3,
    category: "old-testament", difficulty: "easy",
    explanation: "God created Eve from Adam's rib to be his companion. Adam named her 'Eve,' meaning 'living,' because she would be the mother of all the living (Genesis 2:22; 3:20).",
  },
  {
    id: 49, question: "What was burning but not consumed when God spoke to Moses?",
    options: ["A candle", "A bush", "A torch", "An altar fire"], correctIndex: 1,
    category: "old-testament", difficulty: "easy",
    explanation: "God appeared to Moses in a flame of fire from within a bush. The bush was on fire but did not burn up (Exodus 3:2).",
  },
  {
    id: 50, question: "What name was Abraham known by before God changed it?",
    options: ["Abner", "Abram", "Abel", "Amos"], correctIndex: 1,
    category: "old-testament", difficulty: "easy",
    explanation: "God changed Abram's name to Abraham, meaning 'father of many nations,' when he made a covenant with him (Genesis 17:5).",
  },
  {
    id: 51, question: "Where did the Israelites receive the law and covenant in the wilderness?",
    options: ["Mount Carmel", "Mount Sinai", "Mount Zion", "Mount Nebo"], correctIndex: 1,
    category: "old-testament", difficulty: "easy",
    explanation: "God met with Israel at Mount Sinai, where he gave the law and established his covenant with the nation (Exodus 19–24).",
  },
  {
    id: 52, question: "What did God use to write the Ten Commandments?",
    options: ["A quill pen", "His own finger", "A burning coal", "A stylus in clay"], correctIndex: 1,
    category: "old-testament", difficulty: "easy",
    explanation: "The tablets of the covenant were the work of God — written with the finger of God on stone (Exodus 31:18; Deuteronomy 9:10).",
  },
  {
    id: 53, question: "Which Israelite judge defeated the Philistine giant Goliath?",
    options: ["Samson", "Gideon", "David", "Jonathan"], correctIndex: 2,
    category: "old-testament", difficulty: "easy",
    explanation: "David, though just a young shepherd at the time, trusted in God and defeated Goliath with a single stone from his sling (1 Samuel 17).",
  },
  {
    id: 54, question: "What city's walls fell down after the Israelites marched around it?",
    options: ["Jerusalem", "Ai", "Jericho", "Bethlehem"], correctIndex: 2,
    category: "old-testament", difficulty: "easy",
    explanation: "By God's command, Joshua had the Israelites march around Jericho for seven days. On the seventh day the walls collapsed (Joshua 6).",
  },

  // ══════════════════════════════════════════════════════════════════════════
  // EASY · NEW TESTAMENT
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 55, question: "Who baptized Jesus?",
    options: ["Peter", "John the Baptist", "James", "Matthew"], correctIndex: 1,
    category: "new-testament", difficulty: "easy",
    explanation: "John the Baptist baptized Jesus in the Jordan River. The Holy Spirit descended like a dove and a voice from heaven said, 'This is my Son' (Matthew 3:13–17).",
  },
  {
    id: 56, question: "What was Joseph's (Jesus' earthly father's) profession?",
    options: ["Fisherman", "Shepherd", "Carpenter", "Tax Collector"], correctIndex: 2,
    category: "new-testament", difficulty: "easy",
    explanation: "Joseph was a carpenter. The people of Nazareth referred to Jesus as 'the carpenter's son' (Matthew 13:55).",
  },
  {
    id: 57, question: "How many disciples did Jesus choose?",
    options: ["7", "10", "12", "40"], correctIndex: 2,
    category: "new-testament", difficulty: "easy",
    explanation: "Jesus chose 12 disciples (apostles) who traveled with him and were commissioned to spread the gospel (Matthew 10:1–4).",
  },
  {
    id: 58, question: "Who denied knowing Jesus three times before the rooster crowed?",
    options: ["James", "John", "Judas", "Peter"], correctIndex: 3,
    category: "new-testament", difficulty: "easy",
    explanation: "Peter denied knowing Jesus three times the night of Jesus' arrest, just as Jesus had predicted (Matthew 26:69–75).",
  },
  {
    id: 59, question: "What did Jesus turn water into at the wedding in Cana?",
    options: ["Milk", "Honey", "Wine", "Oil"], correctIndex: 2,
    category: "new-testament", difficulty: "easy",
    explanation: "Jesus' first recorded miracle was turning water into wine at a wedding feast in Cana of Galilee (John 2:1–11).",
  },
  {
    id: 60, question: "Who was the mother of Jesus?",
    options: ["Elizabeth", "Martha", "Mary", "Salome"], correctIndex: 2,
    category: "new-testament", difficulty: "easy",
    explanation: "The angel Gabriel appeared to Mary and announced that she would conceive and give birth to the Son of God (Luke 1:26–31).",
  },
  {
    id: 61, question: "Who betrayed Jesus to the chief priests?",
    options: ["Thomas", "Peter", "Judas Iscariot", "James"], correctIndex: 2,
    category: "new-testament", difficulty: "easy",
    explanation: "Judas Iscariot betrayed Jesus for 30 pieces of silver, identifying him to the soldiers in Gethsemane with a kiss (Matthew 26:14–16; 26:47–50).",
  },
  {
    id: 62, question: "What did Jesus use to feed more than 5,000 people?",
    options: ["Ten loaves and five fish", "Five loaves and two fish", "Seven loaves and three fish", "Manna from heaven"], correctIndex: 1,
    category: "new-testament", difficulty: "easy",
    explanation: "Jesus multiplied five loaves of bread and two fish to feed over 5,000 people, with 12 baskets of leftovers (Matthew 14:17–21).",
  },
  {
    id: 63, question: "In which river was Jesus baptized?",
    options: ["Nile River", "Euphrates River", "Jordan River", "Sea of Galilee"], correctIndex: 2,
    category: "new-testament", difficulty: "easy",
    explanation: "Jesus was baptized by John in the Jordan River (Matthew 3:13; Mark 1:9).",
  },
  {
    id: 64, question: "Who wrote the book of Revelation?",
    options: ["Paul", "Luke", "Peter", "John"], correctIndex: 3,
    category: "new-testament", difficulty: "easy",
    explanation: "The apostle John wrote Revelation while exiled on the island of Patmos. He addressed it to seven churches in Asia Minor (Revelation 1:1,9).",
  },
  {
    id: 65, question: "What did John the Baptist eat in the wilderness?",
    options: ["Bread and olives", "Fish and figs", "Locusts and wild honey", "Dates and milk"], correctIndex: 2,
    category: "new-testament", difficulty: "easy",
    explanation: "John the Baptist lived an austere life in the wilderness, wearing camel's hair and eating locusts and wild honey (Matthew 3:4; Mark 1:6).",
  },
  {
    id: 66, question: "Who helped Jesus carry his cross to Golgotha?",
    options: ["John", "Nicodemus", "Simon of Cyrene", "Barabbas"], correctIndex: 2,
    category: "new-testament", difficulty: "easy",
    explanation: "The soldiers forced Simon of Cyrene, who was coming in from the country, to carry Jesus' cross (Mark 15:21; Luke 23:26).",
  },
  {
    id: 67, question: "How many days after his death did Jesus rise?",
    options: ["One day", "Two days", "Three days", "Seven days"], correctIndex: 2,
    category: "new-testament", difficulty: "easy",
    explanation: "Jesus rose from the dead on the third day, fulfilling the scriptures (1 Corinthians 15:4; Luke 24:7).",
  },
  {
    id: 68, question: "What was the payment Judas received for betraying Jesus?",
    options: ["10 pieces of silver", "20 pieces of silver", "30 pieces of silver", "50 pieces of silver"], correctIndex: 2,
    category: "new-testament", difficulty: "easy",
    explanation: "Judas was paid 30 pieces of silver for betraying Jesus — the price of a slave under Old Testament law (Matthew 26:15; Exodus 21:32).",
  },
  {
    id: 69, question: "Which disciple walked on water toward Jesus?",
    options: ["James", "John", "Andrew", "Peter"], correctIndex: 3,
    category: "new-testament", difficulty: "easy",
    explanation: "Peter got out of the boat and walked on the water toward Jesus, but began to sink when he looked at the wind. Jesus caught him (Matthew 14:29–31).",
  },
  {
    id: 70, question: "Who preached the first sermon at Pentecost?",
    options: ["Paul", "James", "Peter", "John"], correctIndex: 2,
    category: "new-testament", difficulty: "easy",
    explanation: "Peter stood up and preached boldly on the Day of Pentecost. About 3,000 people believed and were baptized that day (Acts 2:14–41).",
  },
  {
    id: 71, question: "Who was the first Christian martyr, stoned to death for his faith?",
    options: ["James", "Philip", "Stephen", "Barnabas"], correctIndex: 2,
    category: "new-testament", difficulty: "easy",
    explanation: "Stephen, a man full of faith and the Holy Spirit, was stoned to death by the religious council for preaching about Jesus (Acts 7:54–60).",
  },
  {
    id: 72, question: "What sea did Jesus calm during a storm?",
    options: ["Mediterranean Sea", "Dead Sea", "Red Sea", "Sea of Galilee"], correctIndex: 3,
    category: "new-testament", difficulty: "easy",
    explanation: "Jesus rebuked the wind and said 'Peace, be still!' to the Sea of Galilee during a storm, and the lake became completely calm (Mark 4:39).",
  },
  {
    id: 73, question: "What is the Great Commission Jesus gave to his disciples?",
    options: ["Feed the hungry", "Heal the sick", "Go and make disciples of all nations", "Build churches everywhere"], correctIndex: 2,
    category: "new-testament", difficulty: "easy",
    explanation: "The Great Commission: 'Go and make disciples of all nations, baptizing them...and teaching them to obey everything I have commanded you' (Matthew 28:19–20).",
  },
  {
    id: 74, question: "Who donated his tomb for Jesus to be buried in?",
    options: ["Nicodemus", "Lazarus", "Joseph of Arimathea", "Simon of Cyrene"], correctIndex: 2,
    category: "new-testament", difficulty: "easy",
    explanation: "Joseph of Arimathea, a rich man and secret disciple, asked Pilate for Jesus' body and placed it in his own new tomb (Matthew 27:57–60).",
  },
  {
    id: 75, question: "What happened to Judas Iscariot after he betrayed Jesus?",
    options: ["He fled to Rome", "He became a disciple again", "He died by hanging himself", "He was imprisoned"], correctIndex: 2,
    category: "new-testament", difficulty: "easy",
    explanation: "Filled with remorse, Judas threw the 30 silver coins into the temple and went out and hanged himself (Matthew 27:3–5).",
  },
  {
    id: 76, question: "What was the Garden called where Jesus prayed before his arrest?",
    options: ["Garden of Eden", "Garden of Gethsemane", "Garden of the Lord", "Garden of Olives"], correctIndex: 1,
    category: "new-testament", difficulty: "easy",
    explanation: "Jesus went with his disciples to the Garden of Gethsemane on the Mount of Olives to pray on the night of his arrest (Matthew 26:36).",
  },
  {
    id: 77, question: "Who raised Lazarus from the dead?",
    options: ["Peter", "Paul", "John", "Jesus"], correctIndex: 3,
    category: "new-testament", difficulty: "easy",
    explanation: "Jesus raised Lazarus from the dead four days after he had been buried in Bethany, calling him to come out of the tomb (John 11:38–44).",
  },
  {
    id: 78, question: "What city did Jesus enter on a donkey as crowds cheered with palm branches?",
    options: ["Bethlehem", "Nazareth", "Capernaum", "Jerusalem"], correctIndex: 3,
    category: "new-testament", difficulty: "easy",
    explanation: "Jesus' triumphal entry into Jerusalem (Palm Sunday) fulfilled Zechariah's prophecy. Crowds spread cloaks and palm branches shouting 'Hosanna!' (Matthew 21:1–11).",
  },
  {
    id: 79, question: "What is the first book of the New Testament?",
    options: ["Mark", "Luke", "Matthew", "John"], correctIndex: 2,
    category: "new-testament", difficulty: "easy",
    explanation: "Matthew is the first book of the New Testament. It was written primarily for a Jewish audience, showing how Jesus fulfilled Old Testament prophecy.",
  },
  {
    id: 80, question: "In which city was Jesus presented in the temple as a baby?",
    options: ["Bethlehem", "Nazareth", "Jericho", "Jerusalem"], correctIndex: 3,
    category: "new-testament", difficulty: "easy",
    explanation: "Mary and Joseph brought Jesus to the temple in Jerusalem to present him to the Lord and offer a sacrifice, as required by the Law of Moses (Luke 2:22–24).",
  },
  {
    id: 81, question: "What last words did Jesus say on the cross according to John 19:30?",
    options: ["'Father, forgive them'", "'My God, why have you forsaken me?'", "'It is finished'", "'Into your hands I commit my spirit'"], correctIndex: 2,
    category: "new-testament", difficulty: "easy",
    explanation: "Jesus' final words in John's Gospel are 'It is finished' (tetelestai in Greek), meaning the work of redemption was complete (John 19:30).",
  },

  // ══════════════════════════════════════════════════════════════════════════
  // MEDIUM · GENERAL
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 82, question: "Which book is the longest in the Bible?",
    options: ["Genesis", "Isaiah", "Psalms", "Jeremiah"], correctIndex: 2,
    category: "general", difficulty: "medium",
    explanation: "Psalms is the longest book with 150 chapters. It also contains the longest chapter (Psalm 119) and the shortest (Psalm 117).",
  },
  {
    id: 83, question: "Who wrote the majority of the New Testament letters?",
    options: ["Peter", "John", "Luke", "Paul"], correctIndex: 3,
    category: "general", difficulty: "medium",
    explanation: "Paul authored at least 13 letters in the New Testament, from Romans to Philemon, making him the most prolific New Testament writer.",
  },
  {
    id: 84, question: "What language was the New Testament originally written in?",
    options: ["Latin", "Hebrew", "Aramaic", "Greek"], correctIndex: 3,
    category: "general", difficulty: "medium",
    explanation: "The New Testament was written in Koine Greek — the common Greek dialect spoken throughout the Roman Empire in the first century AD.",
  },
  {
    id: 85, question: "Who was the first king of Israel?",
    options: ["David", "Solomon", "Saul", "Jeroboam"], correctIndex: 2,
    category: "general", difficulty: "medium",
    explanation: "Saul was anointed by Samuel and became Israel's first king. He reigned for 40 years before being succeeded by David (1 Samuel 10:24).",
  },
  {
    id: 86, question: "In which city was the early church first established after Pentecost?",
    options: ["Antioch", "Rome", "Jerusalem", "Corinth"], correctIndex: 2,
    category: "general", difficulty: "medium",
    explanation: "The first church was established in Jerusalem. Three thousand people were added in a single day when Peter preached at Pentecost (Acts 2).",
  },
  {
    id: 87, question: "What does the Hebrew word 'Amen' mean?",
    options: ["Praise God", "Hallelujah", "So be it / Truly", "Blessed"], correctIndex: 2,
    category: "general", difficulty: "medium",
    explanation: "'Amen' comes from a Hebrew root meaning 'firm' or 'certain.' Used to affirm a statement as true — essentially 'so be it' or 'truly.'",
  },
  {
    id: 88, question: "What language was the Old Testament primarily written in?",
    options: ["Aramaic", "Latin", "Greek", "Hebrew"], correctIndex: 3,
    category: "general", difficulty: "medium",
    explanation: "The Old Testament was written primarily in Hebrew, with a few portions in Aramaic (parts of Daniel, Ezra, and Jeremiah).",
  },
  {
    id: 89, question: "What does the title 'Messiah' mean?",
    options: ["Son of David", "Anointed One", "Savior of the world", "Prince of Peace"], correctIndex: 1,
    category: "general", difficulty: "medium",
    explanation: "'Messiah' is Hebrew for 'Anointed One,' equivalent to the Greek 'Christ.' Both titles refer to Jesus as the promised deliverer (John 1:41).",
  },
  {
    id: 90, question: "Who wrote the majority of the book of Psalms?",
    options: ["Moses", "Solomon", "David", "Asaph"], correctIndex: 2,
    category: "general", difficulty: "medium",
    explanation: "David is credited with writing 73 of the 150 psalms, making him the primary author — though psalms were also written by Moses, Solomon, Asaph, and others.",
  },
  {
    id: 91, question: "What does 'Abba' mean?",
    options: ["Lord", "Father", "Holy One", "Savior"], correctIndex: 1,
    category: "general", difficulty: "medium",
    explanation: "'Abba' is an intimate Aramaic word for 'Father.' Jesus used it in prayer (Mark 14:36), and Paul says believers can cry 'Abba, Father' to God (Romans 8:15).",
  },
  {
    id: 92, question: "What is the Hebrew word for 'peace'?",
    options: ["Chesed", "Torah", "Shalom", "Kabod"], correctIndex: 2,
    category: "general", difficulty: "medium",
    explanation: "'Shalom' (שָׁלוֹם) means peace, wholeness, and well-being. It is used as both a greeting and farewell and appears over 200 times in the Old Testament.",
  },
  {
    id: 93, question: "Which two books of the Protestant Bible never mention God by name?",
    options: ["Ruth and Jonah", "Esther and Song of Solomon", "Proverbs and Ecclesiastes", "Ezra and Nehemiah"], correctIndex: 1,
    category: "general", difficulty: "medium",
    explanation: "Esther and Song of Solomon (Song of Songs) are the only two books in the Protestant Old Testament that do not explicitly name God.",
  },
  {
    id: 94, question: "Who wrote the book of Acts?",
    options: ["Matthew", "Paul", "Luke", "Peter"], correctIndex: 2,
    category: "general", difficulty: "medium",
    explanation: "Luke, the physician and companion of Paul, wrote both the Gospel of Luke and the Acts of the Apostles as a two-part historical account (Luke 1:1–4; Acts 1:1–2).",
  },
  {
    id: 95, question: "What is the opening section of the Sermon on the Mount called?",
    options: ["The Golden Rules", "The Ten Commandments", "The Beatitudes", "The Lord's Prayer"], correctIndex: 2,
    category: "general", difficulty: "medium",
    explanation: "The Beatitudes are the eight blessings Jesus pronounced at the start of the Sermon on the Mount, each beginning 'Blessed are...' (Matthew 5:3–10).",
  },
  {
    id: 96, question: "How many books are in the New Testament?",
    options: ["23", "25", "27", "30"], correctIndex: 2,
    category: "general", difficulty: "medium",
    explanation: "The New Testament contains 27 books — four Gospels, Acts, 21 epistles (letters), and Revelation.",
  },
  {
    id: 97, question: "What does 'Selah' indicate in the Psalms?",
    options: ["A joyful refrain", "A musical pause or interlude", "A prayer for mercy", "The end of a section"], correctIndex: 1,
    category: "general", difficulty: "medium",
    explanation: "'Selah' appears 71 times in Psalms and 3 times in Habakkuk. Its exact meaning is uncertain, but it is widely understood as a musical pause or interlude during worship.",
  },
  {
    id: 98, question: "What is the 'Shema' in Judaism?",
    options: ["The first five books of Moses", "The confession of faith from Deuteronomy 6:4", "The daily prayer at sunrise", "The priestly blessing in Numbers 6"], correctIndex: 1,
    category: "general", difficulty: "medium",
    explanation: "The Shema is Judaism's central declaration of faith: 'Hear, O Israel: The Lord our God, the Lord is one' (Deuteronomy 6:4). Jesus quoted it as the greatest commandment.",
  },
  {
    id: 99, question: "What apostle was also called 'the Rock' by Jesus?",
    options: ["James", "John", "Andrew", "Peter"], correctIndex: 3,
    category: "general", difficulty: "medium",
    explanation: "Jesus renamed Simon as 'Peter' (Greek: Petros) meaning 'rock,' and said upon this rock he would build his church (Matthew 16:18).",
  },
  {
    id: 100, question: "In which New Testament book is the 'armor of God' described?",
    options: ["Romans", "Ephesians", "Galatians", "Colossians"], correctIndex: 1,
    category: "general", difficulty: "medium",
    explanation: "Paul describes the full armor of God in Ephesians 6:10–18 — including the belt of truth, breastplate of righteousness, shield of faith, and helmet of salvation.",
  },
  {
    id: 101, question: "What does the name 'Israel' mean?",
    options: ["God's chosen people", "He who struggles with God", "Land of promise", "Son of righteousness"], correctIndex: 1,
    category: "general", difficulty: "medium",
    explanation: "After Jacob wrestled with God all night, God said his name would no longer be Jacob but Israel — meaning 'he who struggles (or strives) with God' (Genesis 32:28).",
  },
  {
    id: 102, question: "Who are the four Gospel writers?",
    options: ["Matthew, Mark, Luke, Paul", "Matthew, Mark, John, Peter", "Mark, Luke, John, James", "Matthew, Mark, Luke, John"], correctIndex: 3,
    category: "general", difficulty: "medium",
    explanation: "The four Gospels were written by Matthew (an apostle), Mark (companion of Peter), Luke (physician and companion of Paul), and John (the apostle).",
  },
  {
    id: 103, question: "What is 'Pentecost'?",
    options: ["The 40-day fast before Easter", "The Jewish harvest festival when the Holy Spirit came upon the disciples", "The day Jesus was baptized", "The celebration of Moses receiving the law"], correctIndex: 1,
    category: "general", difficulty: "medium",
    explanation: "Pentecost (Greek for 'fiftieth') was a Jewish harvest festival celebrated 50 days after Passover. The Holy Spirit descended on the disciples during this feast (Acts 2).",
  },
  {
    id: 104, question: "In which book of the Bible is the 'Valley of Dry Bones' vision?",
    options: ["Isaiah", "Daniel", "Jeremiah", "Ezekiel"], correctIndex: 3,
    category: "general", difficulty: "medium",
    explanation: "Ezekiel's vision of the valley of dry bones coming to life symbolizes the restoration of Israel (Ezekiel 37:1–14).",
  },
  {
    id: 105, question: "What does the word 'Apostle' literally mean?",
    options: ["One who teaches", "One who is sent", "One who follows", "One who heals"], correctIndex: 1,
    category: "general", difficulty: "medium",
    explanation: "'Apostle' comes from the Greek 'apostolos' meaning 'one who is sent.' Jesus commissioned his apostles to be his messengers and representatives.",
  },
  {
    id: 106, question: "Which of these is NOT one of the four Gospels?",
    options: ["Matthew", "Luke", "Acts", "Mark"], correctIndex: 2,
    category: "general", difficulty: "medium",
    explanation: "Acts is the fifth book of the New Testament, not a Gospel. It records the history of the early church and Paul's missionary journeys.",
  },
  {
    id: 107, question: "What are the first five books of the Bible collectively called?",
    options: ["The Apocrypha", "The Prophets", "The Torah (Pentateuch)", "The Historical Books"], correctIndex: 2,
    category: "general", difficulty: "medium",
    explanation: "The first five books — Genesis, Exodus, Leviticus, Numbers, and Deuteronomy — are called the Torah (Hebrew) or Pentateuch (Greek), traditionally attributed to Moses.",
  },
  {
    id: 108, question: "What is the Septuagint?",
    options: ["The Hebrew pronunciation of God's name", "The Greek translation of the Old Testament", "The 70 elders who helped Moses govern", "The first Christian council"], correctIndex: 1,
    category: "general", difficulty: "medium",
    explanation: "The Septuagint (abbreviated LXX) is the Greek translation of the Old Testament, completed around 200 BC. It is the version most quoted in the New Testament.",
  },

  // ══════════════════════════════════════════════════════════════════════════
  // MEDIUM · OLD TESTAMENT
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 109, question: "Who was Moses' brother?",
    options: ["Joshua", "Aaron", "Caleb", "Miriam"], correctIndex: 1,
    category: "old-testament", difficulty: "medium",
    explanation: "Aaron was Moses' older brother. God appointed Aaron to be Moses' spokesman before Pharaoh (Exodus 4:14–16).",
  },
  {
    id: 110, question: "What were the first two birds Noah sent from the ark to find dry land?",
    options: ["A raven and a dove", "Two doves", "An eagle and a dove", "A raven and a sparrow"], correctIndex: 0,
    category: "old-testament", difficulty: "medium",
    explanation: "Noah first sent out a raven, then a dove. The dove returned with an olive branch on its second flight, signaling the waters had receded (Genesis 8:6–11).",
  },
  {
    id: 111, question: "Who interpreted Pharaoh's dreams about seven fat and seven thin cows?",
    options: ["Daniel", "Jacob", "Joseph", "Moses"], correctIndex: 2,
    category: "old-testament", difficulty: "medium",
    explanation: "Joseph interpreted Pharaoh's dreams as seven years of abundance followed by seven years of famine, leading to his appointment over Egypt (Genesis 41).",
  },
  {
    id: 112, question: "Which judge of Israel was known for his extraordinary physical strength?",
    options: ["Gideon", "Samson", "Jephthah", "Othniel"], correctIndex: 1,
    category: "old-testament", difficulty: "medium",
    explanation: "Samson was empowered by God's Spirit and performed great feats of strength, including tearing a lion apart with his bare hands (Judges 14–16).",
  },
  {
    id: 113, question: "Whose city walls fell down after the Israelites marched around them?",
    options: ["Ai", "Jericho", "Hebron", "Gaza"], correctIndex: 1,
    category: "old-testament", difficulty: "medium",
    explanation: "God commanded Joshua to march the Israelites around Jericho for seven days. On the seventh day the walls collapsed and the city fell (Joshua 6).",
  },
  {
    id: 114, question: "Who anointed Saul as the first king of Israel?",
    options: ["Elijah", "Nathan", "Samuel", "Eli"], correctIndex: 2,
    category: "old-testament", difficulty: "medium",
    explanation: "The prophet Samuel anointed Saul with oil and declared him king over Israel as God had instructed him (1 Samuel 10:1).",
  },
  {
    id: 115, question: "Which king built the first temple in Jerusalem?",
    options: ["David", "Solomon", "Hezekiah", "Josiah"], correctIndex: 1,
    category: "old-testament", difficulty: "medium",
    explanation: "Solomon built the first temple in Jerusalem, completing it in the fourth year of his reign. It took seven years to build (1 Kings 6:1,38).",
  },
  {
    id: 116, question: "Which prophet confronted King David about his sin with Bathsheba?",
    options: ["Elijah", "Isaiah", "Nathan", "Gad"], correctIndex: 2,
    category: "old-testament", difficulty: "medium",
    explanation: "God sent the prophet Nathan to David with a parable about a stolen lamb. When David condemned the rich man in the story, Nathan said, 'You are the man!' (2 Samuel 12:1–7).",
  },
  {
    id: 117, question: "What was the sign of God's covenant with Noah?",
    options: ["A star in the sky", "A rainbow", "A burning altar", "Two stone tablets"], correctIndex: 1,
    category: "old-testament", difficulty: "medium",
    explanation: "God set a rainbow in the clouds as a sign of his covenant that he would never again destroy all life with a flood (Genesis 9:13–15).",
  },
  {
    id: 118, question: "Who was King Saul's son who became David's closest friend?",
    options: ["Abner", "Ish-bosheth", "Mephibosheth", "Jonathan"], correctIndex: 3,
    category: "old-testament", difficulty: "medium",
    explanation: "Jonathan and David made a covenant of deep friendship. Jonathan gave David his robe and weapons as tokens of love, even protecting David from Saul (1 Samuel 18:1–4).",
  },
  {
    id: 119, question: "How many years did the Israelites wander in the desert?",
    options: ["20 years", "30 years", "40 years", "50 years"], correctIndex: 2,
    category: "old-testament", difficulty: "medium",
    explanation: "The Israelites wandered in the wilderness for 40 years as a consequence of their unbelief and refusal to enter the Promised Land (Numbers 14:33–34).",
  },
  {
    id: 120, question: "What did Elijah call down from heaven on Mount Carmel?",
    options: ["A rainstorm", "Fire", "Angels", "Locusts"], correctIndex: 1,
    category: "old-testament", difficulty: "medium",
    explanation: "On Mount Carmel, Elijah prayed and fire fell from heaven, consuming the sacrifice, the altar, and even the water in the trench — proving God over the prophets of Baal (1 Kings 18:38).",
  },
  {
    id: 121, question: "What was special about Enoch that set him apart from all others?",
    options: ["He lived 969 years", "He never died — God took him", "He parted the Red Sea", "He built the first city"], correctIndex: 1,
    category: "old-testament", difficulty: "medium",
    explanation: "Enoch walked faithfully with God; then he was no more, because God took him away (Genesis 5:24). He is one of only two people in the Bible who did not die.",
  },
  {
    id: 122, question: "Where were Shadrach, Meshach, and Abednego thrown for refusing to worship an idol?",
    options: ["A lions' den", "A fiery furnace", "A pit", "A dungeon"], correctIndex: 1,
    category: "old-testament", difficulty: "medium",
    explanation: "King Nebuchadnezzar threw the three men into a furnace heated seven times hotter than usual. God protected them and a fourth figure appeared walking with them in the fire (Daniel 3).",
  },
  {
    id: 123, question: "Who was Ruth's mother-in-law who returned with her to Bethlehem?",
    options: ["Orpah", "Naomi", "Hannah", "Miriam"], correctIndex: 1,
    category: "old-testament", difficulty: "medium",
    explanation: "After her husband died in Moab, Naomi decided to return to Bethlehem. Ruth refused to leave her, saying 'Where you go I will go' (Ruth 1:16).",
  },
  {
    id: 124, question: "Who was David's son who rebelled and tried to seize the throne?",
    options: ["Amnon", "Solomon", "Absalom", "Adonijah"], correctIndex: 2,
    category: "old-testament", difficulty: "medium",
    explanation: "Absalom, known for his remarkable beauty, organized a rebellion against his father David and temporarily took Jerusalem before being defeated and killed by Joab (2 Samuel 15–18).",
  },
  {
    id: 125, question: "Who was the wisest king of Israel, renowned throughout the ancient world?",
    options: ["David", "Solomon", "Hezekiah", "Josiah"], correctIndex: 1,
    category: "old-testament", difficulty: "medium",
    explanation: "God gave Solomon wisdom beyond any who came before or after him. The Queen of Sheba traveled to test his wisdom and was overwhelmed (1 Kings 4:29–34; 10:1–9).",
  },
  {
    id: 126, question: "How old was Abraham when his son Isaac was born?",
    options: ["70 years old", "85 years old", "100 years old", "120 years old"], correctIndex: 2,
    category: "old-testament", difficulty: "medium",
    explanation: "Abraham was 100 years old when Isaac was born, fulfilling God's promise that he and Sarah would have a son in their old age (Genesis 21:5).",
  },
  {
    id: 127, question: "Who hid the two Israelite spies sent to scout Jericho?",
    options: ["Zipporah", "Deborah", "Rahab", "Miriam"], correctIndex: 2,
    category: "old-testament", difficulty: "medium",
    explanation: "Rahab, a prostitute in Jericho, hid Joshua's two spies under stalks of flax on her roof and helped them escape. In return, her family was spared when Jericho fell (Joshua 2).",
  },
  {
    id: 128, question: "What did Moses do to the golden calf that the Israelites worshipped?",
    options: ["Hid it in the tabernacle", "Buried it in the desert", "Burned it and ground it into powder", "Threw it into the sea"], correctIndex: 2,
    category: "old-testament", difficulty: "medium",
    explanation: "Moses burned the calf, ground it to powder, scattered it on water, and made the Israelites drink it as a sign of their guilt (Exodus 32:20).",
  },
  {
    id: 129, question: "What was the first high priest of Israel?",
    options: ["Moses", "Levi", "Aaron", "Eleazar"], correctIndex: 2,
    category: "old-testament", difficulty: "medium",
    explanation: "Aaron, Moses' brother, was consecrated as Israel's first high priest. He and his sons served as priests of the Lord (Exodus 28:1; Leviticus 8–9).",
  },
  {
    id: 130, question: "What tribe of Israel was David from?",
    options: ["Levi", "Ephraim", "Benjamin", "Judah"], correctIndex: 3,
    category: "old-testament", difficulty: "medium",
    explanation: "David was from the tribe of Judah. Jesse, David's father, was from Bethlehem in Judah (1 Samuel 17:12). Jesus also descended through this royal tribe.",
  },
  {
    id: 131, question: "Who was Bathsheba's husband that David had killed?",
    options: ["Abner", "Joab", "Uriah the Hittite", "Ahithophel"], correctIndex: 2,
    category: "old-testament", difficulty: "medium",
    explanation: "David arranged for Uriah the Hittite, one of his own mighty warriors, to be placed at the front of the battle so he would be killed, covering David's adultery with Bathsheba (2 Samuel 11).",
  },
  {
    id: 132, question: "How did God appear to the Israelites during the night as they traveled in the wilderness?",
    options: ["As a bright star", "As an angel walking beside them", "As a pillar of fire", "As a shining cloud"], correctIndex: 2,
    category: "old-testament", difficulty: "medium",
    explanation: "By day God led Israel in a pillar of cloud and by night in a pillar of fire, so they could travel day or night (Exodus 13:21–22).",
  },
  {
    id: 133, question: "What did Elisha ask from Elijah before Elijah was taken to heaven?",
    options: ["His mantle (cloak)", "A double portion of his spirit", "The gift of prophecy", "Authority over Israel"], correctIndex: 1,
    category: "old-testament", difficulty: "medium",
    explanation: "Elisha asked for a double portion of Elijah's spirit — a request like that of the firstborn son's inheritance. Elijah said it was a difficult request but granted if Elisha saw him taken up (2 Kings 2:9–10).",
  },
  {
    id: 134, question: "What is the prophecy about a 'virgin' conceiving found in the book of Isaiah?",
    options: ["Isaiah 7:14", "Isaiah 9:6", "Isaiah 53:5", "Isaiah 40:3"], correctIndex: 0,
    category: "old-testament", difficulty: "medium",
    explanation: "'The virgin will conceive and give birth to a son, and will call him Immanuel' (Isaiah 7:14). Matthew quotes this as fulfilled in Jesus' birth (Matthew 1:22–23).",
  },
  {
    id: 135, question: "Who was the Babylonian king who destroyed Jerusalem and the first temple?",
    options: ["Cyrus", "Darius", "Nebuchadnezzar", "Sennacherib"], correctIndex: 2,
    category: "old-testament", difficulty: "medium",
    explanation: "King Nebuchadnezzar of Babylon destroyed Jerusalem, burned the temple, and carried the people into exile in 586 BC (2 Kings 25; Daniel 1).",
  },

  // ══════════════════════════════════════════════════════════════════════════
  // MEDIUM · NEW TESTAMENT
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 136, question: "What was the first miracle Jesus performed?",
    options: ["Walking on water", "Healing a blind man", "Turning water into wine", "Feeding the 5,000"], correctIndex: 2,
    category: "new-testament", difficulty: "medium",
    explanation: "Jesus' first recorded miracle was turning water into wine at a wedding in Cana of Galilee (John 2:1–11).",
  },
  {
    id: 137, question: "Who was the tax collector who climbed a tree to see Jesus?",
    options: ["Matthew", "Zacchaeus", "Nicodemus", "Judas"], correctIndex: 1,
    category: "new-testament", difficulty: "medium",
    explanation: "Zacchaeus, a chief tax collector in Jericho, climbed a sycamore tree to see Jesus over the crowd. Jesus invited himself to Zacchaeus' home (Luke 19:1–10).",
  },
  {
    id: 138, question: "On which day of the week did Jesus rise from the dead?",
    options: ["Friday", "Saturday", "Sunday", "Monday"], correctIndex: 2,
    category: "new-testament", difficulty: "medium",
    explanation: "Jesus rose from the dead on the first day of the week (Sunday). This is why Christians gather to worship on Sundays (Matthew 28:1; Mark 16:2).",
  },
  {
    id: 139, question: "Who was chosen to replace Judas Iscariot as the twelfth apostle?",
    options: ["Stephen", "Barnabas", "Matthias", "Silas"], correctIndex: 2,
    category: "new-testament", difficulty: "medium",
    explanation: "After Judas died, the apostles cast lots and Matthias was chosen to take his place among the Twelve (Acts 1:26).",
  },
  {
    id: 140, question: "What was Jesus doing when the storm arose on the Sea of Galilee?",
    options: ["Praying on the shore", "Walking on the water", "Sleeping in the boat", "Teaching the disciples"], correctIndex: 2,
    category: "new-testament", difficulty: "medium",
    explanation: "Jesus was asleep on a cushion in the stern when a fierce storm hit. The disciples woke him and he rebuked the wind and waves (Mark 4:37–39).",
  },
  {
    id: 141, question: "In the parable of the Prodigal Son, what did the younger son ask his father for before leaving?",
    options: ["His father's blessing", "His share of the inheritance", "A new robe", "Permission to travel"], correctIndex: 1,
    category: "new-testament", difficulty: "medium",
    explanation: "The younger son asked for his share of the estate early, then squandered it in a far country (Luke 15:12–13).",
  },
  {
    id: 142, question: "What was Matthew's (Levi's) occupation before becoming a disciple?",
    options: ["Fisherman", "Shepherd", "Carpenter", "Tax collector"], correctIndex: 3,
    category: "new-testament", difficulty: "medium",
    explanation: "Matthew (also called Levi) was a tax collector sitting at his tax booth when Jesus called him. He immediately followed Jesus (Matthew 9:9; Mark 2:14).",
  },
  {
    id: 143, question: "What question did Nicodemus ask Jesus in John 3?",
    options: ["'Who will be the greatest in the kingdom?'", "'How can a man be born when he is old?'", "'What must I do to inherit eternal life?'", "'Are you the one who is to come?'"], correctIndex: 1,
    category: "new-testament", difficulty: "medium",
    explanation: "Nicodemus, a Pharisee and member of the Sanhedrin, came to Jesus at night. When Jesus said one must be born again, Nicodemus asked, 'How can a man be born when he is old?' (John 3:4).",
  },
  {
    id: 144, question: "What happened to Ananias when he lied to the Holy Spirit about his offering?",
    options: ["He was expelled from the church", "He went blind for three days", "He fell down and died", "He was struck with illness"], correctIndex: 2,
    category: "new-testament", difficulty: "medium",
    explanation: "Ananias secretly kept part of the money from a land sale but claimed to give all of it. When Peter confronted him, Ananias fell down and died immediately (Acts 5:1–5).",
  },
  {
    id: 145, question: "Which Gospel was written by a physician and companion of Paul?",
    options: ["Matthew", "Mark", "Luke", "John"], correctIndex: 2,
    category: "new-testament", difficulty: "medium",
    explanation: "Luke, identified as 'the beloved physician' in Colossians 4:14, was a companion of Paul and wrote the Gospel of Luke and Acts of the Apostles.",
  },
  {
    id: 146, question: "Who was Paul's companion on his first missionary journey?",
    options: ["Silas", "Timothy", "Barnabas", "Titus"], correctIndex: 2,
    category: "new-testament", difficulty: "medium",
    explanation: "The Holy Spirit set apart Barnabas and Paul for the first missionary journey. John Mark accompanied them initially (Acts 13:2–5).",
  },
  {
    id: 147, question: "What was Peter's original name?",
    options: ["Bartholomew", "Simon", "Philip", "Andrew"], correctIndex: 1,
    category: "new-testament", difficulty: "medium",
    explanation: "Peter's birth name was Simon. Jesus gave him the Aramaic name 'Cephas' (Peter in Greek), meaning 'rock,' when they first met (John 1:42; Matthew 16:18).",
  },
  {
    id: 148, question: "What did Thomas exclaim when he saw the risen Jesus?",
    options: ["'Truly you are the Son of God!'", "'My Lord and my God!'", "'You have risen as you said!'", "'Blessed is the one who comes in the name of the Lord!'"], correctIndex: 1,
    category: "new-testament", difficulty: "medium",
    explanation: "When Thomas saw Jesus' wounds and touched them, he declared, 'My Lord and my God!' — one of the clearest confessions of Jesus' divinity in the Gospels (John 20:28).",
  },
  {
    id: 149, question: "In which city did followers of Jesus first receive the name 'Christians'?",
    options: ["Jerusalem", "Rome", "Antioch", "Corinth"], correctIndex: 2,
    category: "new-testament", difficulty: "medium",
    explanation: "The disciples were first called Christians in Antioch of Syria, where Barnabas and Saul (Paul) ministered for a whole year (Acts 11:26).",
  },
  {
    id: 150, question: "Which Gentile was the first to receive the Holy Spirit through Peter's ministry?",
    options: ["Lydia", "Cornelius", "Sergius Paulus", "The Philippian jailer"], correctIndex: 1,
    category: "new-testament", difficulty: "medium",
    explanation: "Cornelius, a Roman centurion and God-fearer in Caesarea, received a vision directing him to send for Peter. When Peter preached, the Holy Spirit fell on all the Gentiles present (Acts 10).",
  },
  {
    id: 151, question: "What is Paul's occupation mentioned in Acts 18?",
    options: ["Fisherman", "Carpenter", "Tentmaker", "Merchant"], correctIndex: 2,
    category: "new-testament", difficulty: "medium",
    explanation: "Paul was a tentmaker by trade. In Corinth he worked with Aquila and Priscilla, who shared the same trade (Acts 18:3).",
  },
  {
    id: 152, question: "In which Gospel does Jesus give the 'I am' statements (I am the vine, the light, the bread, etc.)?",
    options: ["Matthew", "Mark", "Luke", "John"], correctIndex: 3,
    category: "new-testament", difficulty: "medium",
    explanation: "John's Gospel contains the seven 'I am' statements of Jesus: bread of life, light of the world, gate, good shepherd, resurrection and life, way/truth/life, and true vine.",
  },
  {
    id: 153, question: "What happened to Paul and Silas in the city of Philippi?",
    options: ["They were exiled", "They were beheaded", "They were imprisoned and an earthquake freed them", "They were stoned"], correctIndex: 2,
    category: "new-testament", difficulty: "medium",
    explanation: "Paul and Silas were beaten and thrown in prison in Philippi. At midnight they prayed and sang, then an earthquake opened the prison doors and loosened everyone's chains (Acts 16:23–26).",
  },
  {
    id: 154, question: "Who were Lazarus' two sisters?",
    options: ["Mary and Joanna", "Martha and Mary", "Salome and Mary", "Lydia and Martha"], correctIndex: 1,
    category: "new-testament", difficulty: "medium",
    explanation: "Lazarus lived in Bethany with his sisters Mary and Martha. It was Mary who anointed Jesus' feet with expensive perfume (John 11:1–2; 12:3).",
  },
  {
    id: 155, question: "How many 'Beatitudes' does Jesus pronounce in the Sermon on the Mount?",
    options: ["6", "7", "8", "10"], correctIndex: 2,
    category: "new-testament", difficulty: "medium",
    explanation: "Jesus declares eight blessings (Beatitudes) in Matthew 5:3–10, each beginning with 'Blessed are...' describing qualities of kingdom citizens.",
  },
  {
    id: 156, question: "In which garden did Jesus pray the night he was arrested?",
    options: ["Garden of Eden", "Garden of Gethsemane", "Garden of Olives", "Garden of Joseph"], correctIndex: 1,
    category: "new-testament", difficulty: "medium",
    explanation: "Jesus went to the Garden of Gethsemane on the Mount of Olives where he prayed in great anguish before his arrest. His sweat was like drops of blood (Luke 22:44).",
  },
  {
    id: 157, question: "Who were the three disciples Jesus took with him to the Mount of Transfiguration?",
    options: ["Peter, James, and John", "Peter, Andrew, and John", "James, John, and Philip", "Peter, James, and Matthew"], correctIndex: 0,
    category: "new-testament", difficulty: "medium",
    explanation: "Jesus took Peter, James, and John up a high mountain where he was transfigured before them. Moses and Elijah appeared and spoke with Jesus (Matthew 17:1–3).",
  },
  {
    id: 158, question: "What was the parable Jesus told about a man who found a pearl of great value?",
    options: ["He sold all he had to buy it", "He hid it in his house", "He gave it to the king", "He shared it with the poor"], correctIndex: 0,
    category: "new-testament", difficulty: "medium",
    explanation: "The merchant found one pearl of great value and sold everything he had to buy it — illustrating the supreme worth of the kingdom of heaven (Matthew 13:45–46).",
  },
  {
    id: 159, question: "What does the 'fruit of the Spirit' include according to Galatians 5?",
    options: ["Wisdom, knowledge, and discernment", "Faith, hope, and love alone", "Love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, self-control", "Prayer, fasting, and giving"], correctIndex: 2,
    category: "new-testament", difficulty: "medium",
    explanation: "Paul lists nine qualities that the Holy Spirit produces in believers: love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, and self-control (Galatians 5:22–23).",
  },
  {
    id: 160, question: "What council in Jerusalem decided that Gentile converts did not need to be circumcised?",
    options: ["The Council of Nicaea", "The Council of Antioch", "The Jerusalem Council", "The Apostolic Synod"], correctIndex: 2,
    category: "new-testament", difficulty: "medium",
    explanation: "The Jerusalem Council (c. AD 49, Acts 15) was convened to settle the question of Gentile obligations to the Mosaic Law. The council decided Gentiles did not need circumcision.",
  },
  {
    id: 161, question: "Who rolled the stone away from Jesus' tomb?",
    options: ["The disciples", "Roman soldiers", "Mary Magdalene", "An angel"], correctIndex: 3,
    category: "new-testament", difficulty: "medium",
    explanation: "An angel of the Lord descended from heaven, rolled back the stone from the entrance, and sat on it. His appearance was like lightning and his clothing white as snow (Matthew 28:2–3).",
  },
  {
    id: 162, question: "What were James and John known as because of their passionate nature?",
    options: ["Sons of Thunder", "Sons of Peace", "Brothers of the Sword", "Pillars of the Church"], correctIndex: 0,
    category: "new-testament", difficulty: "medium",
    explanation: "Jesus nicknamed James and John 'Boanerges,' meaning 'Sons of Thunder,' likely reflecting their fiery temperament (Mark 3:17).",
  },

  // ══════════════════════════════════════════════════════════════════════════
  // HARD · GENERAL
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 163, question: "What is the shortest verse in the Bible?",
    options: ["'God is love.'", "'Jesus wept.'", "'Pray continually.'", "'Rejoice always.'"], correctIndex: 1,
    category: "general", difficulty: "hard",
    explanation: "'Jesus wept.' (John 11:35) is the shortest verse in the English Bible. Jesus wept upon seeing the grief of Mary and those mourning Lazarus.",
  },
  {
    id: 164, question: "Who was the oldest man mentioned in the Bible?",
    options: ["Noah", "Adam", "Methuselah", "Enoch"], correctIndex: 2,
    category: "general", difficulty: "hard",
    explanation: "Methuselah lived 969 years, making him the oldest recorded person in the Bible (Genesis 5:27).",
  },
  {
    id: 165, question: "How many books are in the Old Testament?",
    options: ["33", "36", "39", "42"], correctIndex: 2,
    category: "general", difficulty: "hard",
    explanation: "The Old Testament contains 39 books in Protestant Bibles, spanning from Genesis to Malachi.",
  },
  {
    id: 166, question: "What was Abraham's hometown before he moved to Canaan?",
    options: ["Babylon", "Nineveh", "Ur of the Chaldeans", "Haran"], correctIndex: 2,
    category: "general", difficulty: "hard",
    explanation: "Abraham was born in Ur of the Chaldeans (modern-day Iraq). God called him to leave for Canaan (Genesis 11:31; 12:1).",
  },
  {
    id: 167, question: "What number is associated with 'the Beast' in Revelation?",
    options: ["444", "555", "616", "666"], correctIndex: 3,
    category: "general", difficulty: "hard",
    explanation: "The number 666 is called 'the number of the Beast' in Revelation 13:18. Scholars interpret it as a numerical code (gematria), likely referring to a Roman emperor.",
  },
  {
    id: 168, question: "Which of King Saul's daughters became David's wife?",
    options: ["Merab", "Michal", "Rizpah", "Tamar"], correctIndex: 1,
    category: "general", difficulty: "hard",
    explanation: "Michal, Saul's younger daughter, loved David and was given to him as his wife (1 Samuel 18:20–27). She later helped David escape Saul's assassination attempt.",
  },
  {
    id: 169, question: "Who traditionally wrote the first five books of the Bible?",
    options: ["David", "Ezra", "Moses", "Solomon"], correctIndex: 2,
    category: "general", difficulty: "hard",
    explanation: "Moses is traditionally credited as the author of the Pentateuch (Genesis through Deuteronomy), though the books themselves are mostly anonymous.",
  },
  {
    id: 170, question: "What is the Tetragrammaton?",
    options: ["The four Gospel writers", "The Hebrew four-letter name of God (YHWH)", "The four living creatures in Ezekiel's vision", "The four cardinal virtues in Proverbs"], correctIndex: 1,
    category: "general", difficulty: "hard",
    explanation: "The Tetragrammaton (YHWH) is the four-letter personal name of God in Hebrew, often rendered as 'Yahweh' or 'Jehovah.' It appears about 6,800 times in the Old Testament.",
  },
  {
    id: 171, question: "Which apostle was also called 'Didymus,' meaning 'twin'?",
    options: ["James", "Bartholomew", "Philip", "Thomas"], correctIndex: 3,
    category: "general", difficulty: "hard",
    explanation: "Thomas is called 'Didymus' in John's Gospel (John 11:16; 20:24; 21:2). Both his Aramaic name Thomas and his Greek name Didymus mean 'twin.'",
  },
  {
    id: 172, question: "Who was the only female judge of Israel?",
    options: ["Miriam", "Huldah", "Deborah", "Abigail"], correctIndex: 2,
    category: "general", difficulty: "hard",
    explanation: "Deborah was a prophetess and the only female judge of Israel. She and Barak led Israel to victory over Jabin, king of Canaan (Judges 4–5).",
  },
  {
    id: 173, question: "What does the Aramaic word 'Maranatha' mean?",
    options: ["Praise the Lord forever", "Come, Lord", "Holy is the name of God", "God reigns over all"], correctIndex: 1,
    category: "general", difficulty: "hard",
    explanation: "'Maranatha' (1 Corinthians 16:22) is an Aramaic expression meaning 'Come, Lord' or 'Our Lord, come.' It is one of the oldest Christian prayers.",
  },
  {
    id: 174, question: "In which chapter of Genesis is the Tower of Babel story?",
    options: ["Genesis 3", "Genesis 6", "Genesis 11", "Genesis 15"], correctIndex: 2,
    category: "general", difficulty: "hard",
    explanation: "The Tower of Babel story, explaining how God confused human language and scattered people over the earth, is found in Genesis 11:1–9.",
  },
  {
    id: 175, question: "Who traditionally authored the book of Lamentations?",
    options: ["Isaiah", "Ezekiel", "Jeremiah", "Daniel"], correctIndex: 2,
    category: "general", difficulty: "hard",
    explanation: "Jeremiah, known as the 'Weeping Prophet,' is traditionally credited with writing Lamentations — five poems of grief over Jerusalem's destruction by Babylon.",
  },
  {
    id: 176, question: "How many psalms are specifically attributed to Moses?",
    options: ["None", "1", "3", "7"], correctIndex: 1,
    category: "general", difficulty: "hard",
    explanation: "Psalm 90, beginning 'Lord, you have been our dwelling place throughout all generations,' is the only psalm attributed to Moses.",
  },
  {
    id: 177, question: "What were the Urim and Thummim?",
    options: ["Sacred musical instruments", "Two precious stones used to determine God's will", "The two stone tablets of the Law", "High priest's chest armor pieces"], correctIndex: 1,
    category: "general", difficulty: "hard",
    explanation: "The Urim and Thummim were sacred objects carried in the high priest's breastpiece and used to seek God's guidance on important decisions (Exodus 28:30; Numbers 27:21).",
  },
  {
    id: 178, question: "What is 'Sheol' as used in the Old Testament?",
    options: ["The heavenly realm", "The realm of the dead / the underworld", "A desert region near Israel", "The holy inner court of the temple"], correctIndex: 1,
    category: "general", difficulty: "hard",
    explanation: "Sheol is the Hebrew word for the realm of the dead — the shadowy underworld where the dead reside. It is variously translated as 'grave,' 'pit,' or 'hell' in English versions.",
  },
  {
    id: 179, question: "What is the central declaration of faith in Judaism, called the 'Shema'?",
    options: ["'Blessed are those who fear the Lord.'", "'Hear, O Israel: The Lord our God, the Lord is one.'", "'The Lord is my shepherd, I lack nothing.'", "'Holy, holy, holy is the Lord Almighty.'"], correctIndex: 1,
    category: "general", difficulty: "hard",
    explanation: "The Shema (Deuteronomy 6:4) is Judaism's defining statement of monotheism. Jesus quoted it as the greatest commandment (Mark 12:29).",
  },
  {
    id: 180, question: "How many seals are opened in the book of Revelation?",
    options: ["4", "5", "6", "7"], correctIndex: 3,
    category: "general", difficulty: "hard",
    explanation: "The Lamb opens seven seals, each releasing judgments and visions. The seventh seal gives way to seven trumpets (Revelation 6–8).",
  },
  {
    id: 181, question: "What does the word 'Prophet' (Hebrew: nabi) literally mean?",
    options: ["One who foresees the future", "Spokesman / one who speaks on behalf of another", "Keeper of the temple", "Interpreter of dreams"], correctIndex: 1,
    category: "general", difficulty: "hard",
    explanation: "The Hebrew 'nabi' (prophet) means 'spokesman' or 'one who speaks on behalf of another.' Old Testament prophets were primarily spokesmen for God, not just predictors of the future.",
  },
  {
    id: 182, question: "What is 'Gehenna' as Jesus uses the term?",
    options: ["A region east of the Jordan", "A term for physical death", "A place of final punishment; originally a burning rubbish valley outside Jerusalem", "The prison for disobedient angels"], correctIndex: 2,
    category: "general", difficulty: "hard",
    explanation: "Gehenna (from Hebrew ge-hinnom, 'Valley of Hinnom') was a ravine outside Jerusalem used for burning refuse, later associated with the place of final judgment/hell (Matthew 5:22).",
  },
  {
    id: 183, question: "In which book does God say to Moses, 'I am who I am'?",
    options: ["Genesis", "Leviticus", "Exodus", "Numbers"], correctIndex: 2,
    category: "general", difficulty: "hard",
    explanation: "When Moses asked God for his name at the burning bush, God replied 'I AM WHO I AM' (Hebrew: EHYEH ASHER EHYEH), revealing his eternal, self-existent nature (Exodus 3:14).",
  },
  {
    id: 184, question: "What is a 'doxology'?",
    options: ["A theological argument about God's nature", "A short hymn or formula of praise to God", "A priestly blessing over the congregation", "A list of miracles performed by a prophet"], correctIndex: 1,
    category: "general", difficulty: "hard",
    explanation: "A doxology is a liturgical expression of praise to God, such as 'Glory be to the Father, and to the Son, and to the Holy Spirit' or the closing of the Lord's Prayer in some traditions.",
  },
  {
    id: 185, question: "What is the Deuterocanon?",
    options: ["The second giving of the law to Moses", "Books in Catholic/Orthodox OT not found in Protestant OT", "The second set of stone tablets Moses received", "A collection of lost books discovered in the Dead Sea"], correctIndex: 1,
    category: "general", difficulty: "hard",
    explanation: "The Deuterocanon (also called the Apocrypha by Protestants) includes books such as Tobit, Judith, and Maccabees. They appear in Catholic and Orthodox Bibles but not in Protestant ones.",
  },
  {
    id: 186, question: "What does the Hebrew word 'Elohim' (used for God in Genesis 1) indicate?",
    options: ["God's singular majesty", "God's plural form suggesting Trinity or divine fullness", "God's warrior nature", "God's hidden nature"], correctIndex: 1,
    category: "general", difficulty: "hard",
    explanation: "'Elohim' is a grammatically plural form, yet consistently used with singular verbs when referring to Israel's God. Theologians see it as suggesting divine fullness or foreshadowing the Trinity.",
  },
  {
    id: 187, question: "What are the 'Major Prophets' in the Old Testament?",
    options: ["Isaiah, Jeremiah, Ezekiel, Daniel, and Hosea", "Isaiah, Jeremiah, Lamentations, Ezekiel, and Daniel", "Isaiah, Ezekiel, Amos, Daniel, and Micah", "Jeremiah, Ezekiel, Joel, Daniel, and Malachi"], correctIndex: 1,
    category: "general", difficulty: "hard",
    explanation: "The five Major Prophets are Isaiah, Jeremiah, Lamentations, Ezekiel, and Daniel — called 'major' because of the length of their books, not their importance over the Minor Prophets.",
  },
  {
    id: 188, question: "What is the New Jerusalem described in Revelation 21?",
    options: ["A rebuilt Jerusalem after the Babylonian exile", "A prophecy about modern Israel", "The holy eternal city that descends from heaven", "A symbol for the Christian church on earth"], correctIndex: 2,
    category: "general", difficulty: "hard",
    explanation: "Revelation 21 describes the New Jerusalem — a glorious city coming down from God out of heaven, the eternal dwelling place of God and his redeemed people, with no more death or sorrow.",
  },
  {
    id: 189, question: "Which New Testament letter warns in the strongest terms against adding to or taking away from prophecy?",
    options: ["Jude", "2 Peter", "1 John", "Revelation"], correctIndex: 3,
    category: "general", difficulty: "hard",
    explanation: "Revelation 22:18–19 issues a solemn warning: anyone who adds to the words of this prophecy will receive the plagues described, and anyone who takes away words will lose their share in the tree of life.",
  },

  // ══════════════════════════════════════════════════════════════════════════
  // HARD · OLD TESTAMENT
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 190, question: "Who was the left-handed judge who assassinated King Eglon of Moab?",
    options: ["Gideon", "Samson", "Ehud", "Jephthah"], correctIndex: 2,
    category: "old-testament", difficulty: "hard",
    explanation: "Ehud, a left-handed Benjaminite, concealed a double-edged dagger and killed the Moabite king Eglon who had oppressed Israel (Judges 3:15–21).",
  },
  {
    id: 191, question: "Which king of Judah was struck with leprosy by God?",
    options: ["Uzziah", "Hezekiah", "Josiah", "Manasseh"], correctIndex: 0,
    category: "old-testament", difficulty: "hard",
    explanation: "King Uzziah was struck with leprosy after he entered the temple to burn incense — a duty reserved for priests alone (2 Chronicles 26:16–21).",
  },
  {
    id: 192, question: "Who succeeded Elijah as prophet in Israel?",
    options: ["Isaiah", "Amos", "Elisha", "Micah"], correctIndex: 2,
    category: "old-testament", difficulty: "hard",
    explanation: "Elisha succeeded Elijah and received a double portion of his spirit. He witnessed Elijah taken to heaven in a whirlwind (2 Kings 2:9–14).",
  },
  {
    id: 193, question: "How many plagues did God send on Egypt before Pharaoh released Israel?",
    options: ["7", "8", "9", "10"], correctIndex: 3,
    category: "old-testament", difficulty: "hard",
    explanation: "God sent 10 plagues: blood, frogs, gnats, flies, livestock disease, boils, hail, locusts, darkness, and the death of the firstborn (Exodus 7–12).",
  },
  {
    id: 194, question: "What was the name of Moses' father-in-law?",
    options: ["Eleazar", "Laban", "Jethro", "Amram"], correctIndex: 2,
    category: "old-testament", difficulty: "hard",
    explanation: "Jethro (also called Reuel) was a Midianite priest and the father of Zipporah, Moses' wife. He advised Moses to delegate leadership to capable judges (Exodus 18).",
  },
  {
    id: 195, question: "Who was the first child born in the Bible?",
    options: ["Abel", "Seth", "Cain", "Enoch"], correctIndex: 2,
    category: "old-testament", difficulty: "hard",
    explanation: "Cain was the firstborn child of Adam and Eve — the very first human birth recorded in Scripture (Genesis 4:1).",
  },
  {
    id: 196, question: "What were the names of Job's three friends who came to comfort him?",
    options: ["Eliphaz, Bildad, and Zophar", "Elihu, Eliphaz, and Bildad", "Nathan, Gad, and Hushai", "Abner, Joab, and Asahel"], correctIndex: 0,
    category: "old-testament", difficulty: "hard",
    explanation: "Eliphaz the Temanite, Bildad the Shuhite, and Zophar the Naamathite came to comfort Job and sat with him in silence for seven days (Job 2:11–13). A fourth man, Elihu, also spoke later.",
  },
  {
    id: 197, question: "Who was the prophet taken to heaven in a chariot of fire?",
    options: ["Isaiah", "Enoch", "Elisha", "Elijah"], correctIndex: 3,
    category: "old-testament", difficulty: "hard",
    explanation: "As Elijah and Elisha walked together, a chariot of fire and horses of fire appeared and separated them, and Elijah was taken up to heaven in a whirlwind (2 Kings 2:11).",
  },
  {
    id: 198, question: "Which tribe of Israel was Moses from?",
    options: ["Judah", "Ephraim", "Levi", "Benjamin"], correctIndex: 2,
    category: "old-testament", difficulty: "hard",
    explanation: "Moses' parents were both from the tribe of Levi. Amram married Jochebed, a Levite woman, and they had Miriam, Aaron, and Moses (Exodus 2:1; 6:18–20).",
  },
  {
    id: 199, question: "Who was the primary author of the book of Proverbs?",
    options: ["David", "Ezra", "Solomon", "Agur"], correctIndex: 2,
    category: "old-testament", difficulty: "hard",
    explanation: "Proverbs 1:1 and 10:1 attribute most of the book to Solomon, who was said to have spoken 3,000 proverbs (1 Kings 4:32). Some sections were added by Agur and King Lemuel.",
  },
  {
    id: 200, question: "Who was King David's general who killed Absalom despite David's orders?",
    options: ["Abner", "Ish-bosheth", "Joab", "Uriah"], correctIndex: 2,
    category: "old-testament", difficulty: "hard",
    explanation: "David commanded that Absalom be dealt with gently, but Joab thrust three javelins into Absalom as he hung by his hair in a tree (2 Samuel 18:9–14).",
  },
  {
    id: 201, question: "What sign did God give Gideon with the fleece to confirm his call?",
    options: ["Fire consumed it overnight", "Dew on the fleece but dry ground, then dry fleece but dew on the ground", "The fleece glowed in the darkness", "Writing appeared on it"], correctIndex: 1,
    category: "old-testament", difficulty: "hard",
    explanation: "Gideon asked God twice: first for dew only on the fleece while the ground was dry; then for the fleece to be dry while dew covered the ground. God did both (Judges 6:36–40).",
  },
  {
    id: 202, question: "What was the name of Abraham's second wife, whom he married after Sarah died?",
    options: ["Hagar", "Keturah", "Zilpah", "Bilhah"], correctIndex: 1,
    category: "old-testament", difficulty: "hard",
    explanation: "After Sarah's death, Abraham married Keturah, who bore him six more sons (Genesis 25:1–4).",
  },
  {
    id: 203, question: "What was the valley called where David defeated Goliath?",
    options: ["Valley of Jezreel", "Valley of Elah", "Valley of Aijalon", "Valley of Kidron"], correctIndex: 1,
    category: "old-testament", difficulty: "hard",
    explanation: "The Israelites and Philistines faced each other across the Valley of Elah when David stepped forward to fight Goliath (1 Samuel 17:2–3).",
  },
  {
    id: 204, question: "What was Rahab's sign of protection that spared her when Jericho was destroyed?",
    options: ["A white flag in the window", "A mark of blood on the doorpost", "A scarlet cord in the window", "Her name written on the city wall"], correctIndex: 2,
    category: "old-testament", difficulty: "hard",
    explanation: "Rahab tied a scarlet cord in her window as a sign. The spies promised that anyone inside her house would be spared when Israel conquered Jericho (Joshua 2:18–21).",
  },
  {
    id: 205, question: "Who was the Queen who traveled to test Solomon's wisdom?",
    options: ["Queen Esther", "Queen Jezebel", "Queen of Sheba", "Queen Bathsheba"], correctIndex: 2,
    category: "old-testament", difficulty: "hard",
    explanation: "The Queen of Sheba heard of Solomon's fame and came with hard questions and great riches to test him. She was overwhelmed by his wisdom (1 Kings 10:1–9).",
  },
  {
    id: 206, question: "What happened to the earth when Korah rebelled against Moses?",
    options: ["Fire fell from heaven on him", "He was struck with leprosy", "The earth opened and swallowed him and his followers", "He was expelled to wander in the desert"], correctIndex: 2,
    category: "old-testament", difficulty: "hard",
    explanation: "Korah led a rebellion against Moses and Aaron. The ground split apart beneath them, the earth opened its mouth and swallowed them (Numbers 16:31–33).",
  },
  {
    id: 207, question: "Who was the mother of the prophet Samuel?",
    options: ["Miriam", "Deborah", "Hannah", "Naomi"], correctIndex: 2,
    category: "old-testament", difficulty: "hard",
    explanation: "Hannah was a devout but barren woman who prayed earnestly for a son. God heard her prayer, and she bore Samuel, whom she dedicated to the Lord (1 Samuel 1:20–28).",
  },
  {
    id: 208, question: "Who was the king of Tyre who helped Solomon build the temple?",
    options: ["Benhadad", "Sennacherib", "Hiram", "Mesha"], correctIndex: 2,
    category: "old-testament", difficulty: "hard",
    explanation: "King Hiram of Tyre provided Solomon with cedars of Lebanon and skilled craftsmen for the temple, in exchange for wheat and olive oil (1 Kings 5:1–12).",
  },
  {
    id: 209, question: "What happened to Lot's wife as they fled from Sodom?",
    options: ["She was struck blind", "She turned into a pillar of salt", "She was captured by angels", "She died from the fire"], correctIndex: 1,
    category: "old-testament", difficulty: "hard",
    explanation: "Despite the angels' warning not to look back, Lot's wife looked back at Sodom and became a pillar of salt (Genesis 19:26).",
  },
  {
    id: 210, question: "Who was the judge who defeated the Midianites with only 300 men?",
    options: ["Samson", "Deborah", "Barak", "Gideon"], correctIndex: 3,
    category: "old-testament", difficulty: "hard",
    explanation: "God told Gideon to reduce his army from 32,000 to 300 men, so Israel could not boast that their own strength saved them. They routed the Midianite camp with torches and trumpets (Judges 7).",
  },
  {
    id: 211, question: "What does the Aaronic Blessing in Numbers 6:24–26 say?",
    options: ["'Blessed are the humble, for they shall inherit the earth'", "'The Lord bless you and keep you; the Lord make his face shine on you...'", "'Fear the Lord your God and serve him faithfully'", "'I am the Lord your God who brought you out of Egypt'"], correctIndex: 1,
    category: "old-testament", difficulty: "hard",
    explanation: "The Aaronic (Priestly) Blessing has three parts: 'The Lord bless you and keep you; the Lord make his face shine on you and be gracious to you; the Lord turn his face toward you and give you peace' (Numbers 6:24–26).",
  },
  {
    id: 212, question: "Who was Esau's twin brother?",
    options: ["Ishmael", "Laban", "Jacob", "Joseph"], correctIndex: 2,
    category: "old-testament", difficulty: "hard",
    explanation: "Esau and Jacob were the twin sons of Isaac and Rebekah. Esau was born first, red and hairy; Jacob came out grasping his brother's heel (Genesis 25:24–26).",
  },
  {
    id: 213, question: "What was David and Bathsheba's son who became king of Israel?",
    options: ["Amnon", "Adonijah", "Absalom", "Solomon"], correctIndex: 3,
    category: "old-testament", difficulty: "hard",
    explanation: "Solomon, the son of David and Bathsheba, was anointed king over Israel. God appeared to him at Gibeon and offered him whatever he wished; Solomon asked for wisdom (1 Kings 1:39; 3:5–9).",
  },
  {
    id: 214, question: "What message did the handwriting on the wall during Belshazzar's feast say?",
    options: ["'Your kingdom is at an end'", "'MENE, MENE, TEKEL, PARSIN'", "'The Lord sees all things'", "'Babylon is fallen'"], correctIndex: 1,
    category: "old-testament", difficulty: "hard",
    explanation: "Mysterious fingers wrote 'MENE, MENE, TEKEL, PARSIN' on the wall during King Belshazzar's feast. Daniel interpreted it as God's judgment: Belshazzar was weighed and found wanting; his kingdom would be divided (Daniel 5).",
  },
  {
    id: 215, question: "What was the name of Moses' wife?",
    options: ["Miriam", "Rahab", "Zipporah", "Deborah"], correctIndex: 2,
    category: "old-testament", difficulty: "hard",
    explanation: "Zipporah, a daughter of Jethro the Midianite priest, was Moses' wife. She circumcised their son when God threatened Moses' life on the journey back to Egypt (Exodus 2:21; 4:24–25).",
  },
  {
    id: 216, question: "What was the 'Ugaritic' or ancient significance of the 'High Places' in the Old Testament?",
    options: ["Mountain-top fortresses where Israel stored weapons", "Hilltop shrines used to worship Canaanite gods", "Temple courtyards reserved for the high priest", "Royal courts where kings received foreign dignitaries"], correctIndex: 1,
    category: "old-testament", difficulty: "hard",
    explanation: "High places (Hebrew: bamot) were elevated sites used for worship, often associated with Canaanite religion. Israel repeatedly adopted them despite God's command to worship only at the designated sanctuary (1 Kings 3:2; 14:23).",
  },

  // ══════════════════════════════════════════════════════════════════════════
  // HARD · NEW TESTAMENT
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 217, question: "On what island was the apostle John exiled when he wrote Revelation?",
    options: ["Malta", "Cyprus", "Patmos", "Crete"], correctIndex: 2,
    category: "new-testament", difficulty: "hard",
    explanation: "John was exiled to the island of Patmos in the Aegean Sea 'because of the word of God and the testimony of Jesus.' There he received the visions in Revelation (Revelation 1:9).",
  },
  {
    id: 218, question: "Who fell asleep and tumbled out of a window while Paul was preaching?",
    options: ["Eutychus", "Trophimus", "Timothy", "Silas"], correctIndex: 0,
    category: "new-testament", difficulty: "hard",
    explanation: "Eutychus fell from a third-floor window in Troas during Paul's long midnight sermon. Paul embraced him and he was restored to life (Acts 20:9–12).",
  },
  {
    id: 219, question: "What was the name of the high priest who questioned Jesus before his crucifixion?",
    options: ["Annas", "Caiaphas", "Ananias", "Zechariah"], correctIndex: 1,
    category: "new-testament", difficulty: "hard",
    explanation: "Caiaphas was the high priest that year and led the council that condemned Jesus. He had declared it was better for one man to die for the people (Matthew 26:57; John 11:49–50).",
  },
  {
    id: 220, question: "Who was the Roman governor who sentenced Jesus to death?",
    options: ["Herod Antipas", "Pontius Pilate", "Felix", "Festus"], correctIndex: 1,
    category: "new-testament", difficulty: "hard",
    explanation: "Pontius Pilate, the Roman prefect of Judea, ordered Jesus' crucifixion despite declaring him innocent. He symbolically washed his hands of the matter (Matthew 27:24–26).",
  },
  {
    id: 221, question: "What was the name of the place where Jesus was crucified?",
    options: ["Bethany", "Gethsemane", "Golgotha", "Emmaus"], correctIndex: 2,
    category: "new-testament", difficulty: "hard",
    explanation: "Golgotha, meaning 'Place of the Skull' (called Calvary in Latin), was the hill outside Jerusalem where Jesus was crucified (Matthew 27:33).",
  },
  {
    id: 222, question: "For how many days did Jesus appear to his disciples after his resurrection?",
    options: ["3", "7", "40", "50"], correctIndex: 2,
    category: "new-testament", difficulty: "hard",
    explanation: "Jesus appeared to his disciples over 40 days after his resurrection, speaking about the kingdom of God, before ascending into heaven (Acts 1:3).",
  },
  {
    id: 223, question: "In which city was the apostle Paul from?",
    options: ["Jerusalem", "Antioch", "Tarsus", "Corinth"], correctIndex: 2,
    category: "new-testament", difficulty: "hard",
    explanation: "Paul identified himself as 'a citizen of Tarsus in Cilicia, no ordinary city' (Acts 21:39). Tarsus was an important Roman city in what is now southern Turkey.",
  },
  {
    id: 224, question: "What was the name of Timothy's grandmother?",
    options: ["Priscilla", "Dorcas", "Lois", "Lydia"], correctIndex: 2,
    category: "new-testament", difficulty: "hard",
    explanation: "Paul wrote, 'I am reminded of your sincere faith, which first lived in your grandmother Lois and in your mother Eunice' (2 Timothy 1:5).",
  },
  {
    id: 225, question: "Which city hosted one of the seven churches addressed in Revelation that is called 'lukewarm'?",
    options: ["Ephesus", "Sardis", "Philadelphia", "Laodicea"], correctIndex: 3,
    category: "new-testament", difficulty: "hard",
    explanation: "The church in Laodicea was rebuked for being 'lukewarm — neither hot nor cold.' Jesus warned he would 'spit you out of my mouth' (Revelation 3:15–16).",
  },
  {
    id: 226, question: "Who was the silversmith in Ephesus who stirred up a riot against Paul?",
    options: ["Alexander", "Demetrius", "Sosthenes", "Tertullus"], correctIndex: 1,
    category: "new-testament", difficulty: "hard",
    explanation: "Demetrius, a silversmith who made silver shrines of Artemis, incited a riot in Ephesus because Paul's preaching was hurting his business (Acts 19:24–28).",
  },
  {
    id: 227, question: "What was the sin of Ananias and Sapphira in Acts 5?",
    options: ["Teaching false doctrine", "Refusing to feed the poor", "Lying to the Holy Spirit about money from a land sale", "Worshipping an idol in secret"], correctIndex: 2,
    category: "new-testament", difficulty: "hard",
    explanation: "Ananias and Sapphira secretly kept part of the proceeds from their land sale while pretending to give the full amount. Both fell dead after lying to the Holy Spirit (Acts 5:1–11).",
  },
  {
    id: 228, question: "Who was the first Gentile convert baptized by Peter in Acts?",
    options: ["Lydia", "Cornelius", "Sergius Paulus", "The Philippian jailer"], correctIndex: 1,
    category: "new-testament", difficulty: "hard",
    explanation: "Cornelius, a Roman centurion and God-fearer in Caesarea, received a vision directing him to send for Peter. When Peter preached, the Holy Spirit fell on the Gentiles present (Acts 10).",
  },
  {
    id: 229, question: "Who was Aquila's wife who helped teach the preacher Apollos?",
    options: ["Lydia", "Phoebe", "Priscilla", "Junia"], correctIndex: 2,
    category: "new-testament", difficulty: "hard",
    explanation: "Priscilla and Aquila heard Apollos preach in Ephesus and took him aside to explain 'the way of God more adequately,' correcting his incomplete understanding (Acts 18:26).",
  },
  {
    id: 230, question: "What was the name of the eloquent preacher from Alexandria who had an incomplete understanding of the gospel?",
    options: ["Barnabas", "Apollos", "Titus", "Epaphras"], correctIndex: 1,
    category: "new-testament", difficulty: "hard",
    explanation: "Apollos was a learned man from Alexandria who spoke with great fervor and accuracy about Jesus, though he only knew John's baptism. Priscilla and Aquila completed his instruction (Acts 18:24–26).",
  },
  {
    id: 231, question: "The town of Philippi was important to Paul. What happened there that was miraculous?",
    options: ["He raised a widow's son from death", "An earthquake freed Paul and Silas from prison", "The Holy Spirit appeared as fire over the church", "An angel blinded a sorcerer"], correctIndex: 1,
    category: "new-testament", difficulty: "hard",
    explanation: "At midnight Paul and Silas prayed and sang hymns. A violent earthquake shook the prison foundations, opened the doors, and loosened everyone's chains (Acts 16:25–26).",
  },
  {
    id: 232, question: "What did Paul preach about at the Areopagus in Athens?",
    options: ["The Ten Commandments", "The resurrection of Jesus and the 'unknown God'", "The fall of Rome and God's kingdom", "The need for circumcision"], correctIndex: 1,
    category: "new-testament", difficulty: "hard",
    explanation: "Paul stood at the Areopagus (Mars' Hill) and connected the Athenians' altar 'to an unknown God' with Jesus, culminating in a proclamation of the resurrection (Acts 17:22–31).",
  },
  {
    id: 233, question: "Who is the anonymous author of the letter to the Hebrews?",
    options: ["Paul", "Barnabas", "Luke", "The author is unknown"], correctIndex: 3,
    category: "new-testament", difficulty: "hard",
    explanation: "Hebrews is anonymous — no author is named. Early church figures attributed it to Paul, Barnabas, Apollos, or Luke. Today most scholars consider the authorship unknown.",
  },
  {
    id: 234, question: "What was the 'speaking in tongues' event at Pentecost?",
    options: ["The disciples spoke an unknown heavenly language", "The disciples spoke in the native languages of people from many nations", "Paul spoke in a trance", "Prophets recited scripture in unison"], correctIndex: 1,
    category: "new-testament", difficulty: "hard",
    explanation: "At Pentecost the disciples spoke in other languages (glōssai) — the actual native tongues of devout Jews from many nations who were in Jerusalem for the festival (Acts 2:4–11).",
  },
  {
    id: 235, question: "Who were the parents of James and John the apostles?",
    options: ["Alphaeus and Mary", "Zebedee and Salome", "Joseph and Mary", "Zacharias and Elizabeth"], correctIndex: 1,
    category: "new-testament", difficulty: "hard",
    explanation: "James and John were sons of Zebedee, a fisherman on the Sea of Galilee, and his wife Salome (Matthew 4:21; 27:56; Mark 15:40).",
  },
  {
    id: 236, question: "Who was the sorcerer in Samaria who tried to buy the power of the Holy Spirit from the apostles?",
    options: ["Elymas", "Simon Magus", "Bar-Jesus", "Demetrius"], correctIndex: 1,
    category: "new-testament", difficulty: "hard",
    explanation: "Simon Magus (Simon the Sorcerer) believed and was baptized, but when he saw the Spirit given through the apostles' hands, he offered money to obtain this power. Peter sharply rebuked him (Acts 8:9–24).",
  },
  {
    id: 237, question: "What does Revelation 19 describe as 'the marriage supper of the Lamb'?",
    options: ["The Last Supper Jesus ate with his disciples", "The feast celebrating Christ's union with his church at the end of the age", "The Passover meal in heaven", "The first communion service in the early church"], correctIndex: 1,
    category: "new-testament", difficulty: "hard",
    explanation: "Revelation 19:7–9 describes a great celebration: the wedding of the Lamb (Christ) and his bride (the church), invited guests being called 'blessed' — a metaphor for the final union of Christ with his redeemed people.",
  },
  {
    id: 238, question: "What parable did Jesus tell specifically to those who were confident of their own righteousness?",
    options: ["The Good Samaritan", "The Ten Virgins", "The Pharisee and the Tax Collector", "The Prodigal Son"], correctIndex: 2,
    category: "new-testament", difficulty: "hard",
    explanation: "Luke 18:9 says Jesus told the parable of the Pharisee and Tax Collector 'to some who were confident of their own righteousness and looked down on everyone else.' The tax collector's humble prayer was heard; the Pharisee's boastful one was not.",
  },
  {
    id: 239, question: "Where did Jesus first appear to his disciples as a group after his resurrection?",
    options: ["On the road to Emmaus", "In the Garden of Gethsemane", "In the upper room with locked doors", "On the shore of the Sea of Galilee"], correctIndex: 2,
    category: "new-testament", difficulty: "hard",
    explanation: "Jesus appeared to the ten disciples (Thomas was absent) in the upper room with the doors locked out of fear. He said 'Peace be with you' and showed them his wounds (John 20:19–20).",
  },
  {
    id: 240, question: "What is the 'thorn in the flesh' Paul describes in 2 Corinthians 12?",
    options: ["A persecution by Jewish leaders", "An unspecified physical or spiritual affliction he calls 'a messenger of Satan'", "His imprisonment in Rome", "His conflict with Peter at Antioch"], correctIndex: 1,
    category: "new-testament", difficulty: "hard",
    explanation: "Paul describes an unspecified 'thorn in my flesh, a messenger of Satan, to torment me.' He pleaded three times for it to be removed; God said 'My grace is sufficient for you' (2 Corinthians 12:7–9).",
  },
  {
    id: 241, question: "What is described as 'sharper than any double-edged sword' in Hebrews 4:12?",
    options: ["The Holy Spirit", "The word of God", "The power of prayer", "The angel of the Lord"], correctIndex: 1,
    category: "new-testament", difficulty: "hard",
    explanation: "Hebrews 4:12 says, 'The word of God is alive and active. Sharper than any double-edged sword, it penetrates even to dividing soul and spirit, joints and marrow; it judges the thoughts and attitudes of the heart.'",
  },
  {
    id: 242, question: "Who was the deacon and evangelist who explained Isaiah to the Ethiopian official?",
    options: ["Stephen", "Barnabas", "Philip", "Silas"], correctIndex: 2,
    category: "new-testament", difficulty: "hard",
    explanation: "Philip the evangelist was directed by an angel to the desert road where an Ethiopian eunuch was reading Isaiah 53. Philip explained the passage as fulfilled in Jesus and baptized him (Acts 8:26–38).",
  },
  {
    id: 243, question: "What was the name of the town where two disciples met the risen Jesus on the road after the resurrection?",
    options: ["Bethany", "Jericho", "Emmaus", "Capernaum"], correctIndex: 2,
    category: "new-testament", difficulty: "hard",
    explanation: "Two disciples walked from Jerusalem to Emmaus when a stranger joined them — it was Jesus, whom they did not recognize until he broke bread with them (Luke 24:13–31).",
  },
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

// ── Bible Wordle ─────────────────────────────────────────────────────────────
export const wordleWords = [
  "JESUS","DAVID","FAITH","GRACE","ANGEL","CROSS","PEACE","PSALM",
  "JAMES","PETER","JUDAS","HEROD","JACOB","ISAAC","ABRAM","SHEEP",
  "BREAD","WATER","FLOOD","SWORD","TOWER","BABEL","SIMON","AARON",
  "SARAH","MERCY","LIGHT","ALTAR","OLIVE","MANNA","CROWN","THORN",
  "RABBI","NAOMI","SINAI","TITHE","TRUST","GLORY","FLESH","TRUTH",
];

// ── Bible Wheel of Fortune ───────────────────────────────────────────────────
export const wheelPhrases = [
  { phrase: "THE LORD IS MY SHEPHERD",        reference: "Psalm 23:1" },
  { phrase: "FOR GOD SO LOVED THE WORLD",     reference: "John 3:16" },
  { phrase: "LOVE YOUR NEIGHBOR AS YOURSELF", reference: "Mark 12:31" },
  { phrase: "THE FRUIT OF THE SPIRIT",        reference: "Galatians 5:22" },
  { phrase: "WALK BY FAITH NOT BY SIGHT",     reference: "2 Corinthians 5:7" },
  { phrase: "I AM THE BREAD OF LIFE",         reference: "John 6:35" },
  { phrase: "BLESSED ARE THE PEACEMAKERS",    reference: "Matthew 5:9" },
  { phrase: "FEAR NOT FOR I AM WITH YOU",     reference: "Isaiah 41:10" },
  { phrase: "ASK AND IT WILL BE GIVEN",       reference: "Matthew 7:7" },
  { phrase: "IN THE BEGINNING GOD CREATED",   reference: "Genesis 1:1" },
  { phrase: "THE TRUTH SHALL SET YOU FREE",   reference: "John 8:32" },
  { phrase: "DO UNTO OTHERS AS YOU WOULD",    reference: "Luke 6:31" },
];

// ── Bible Jeopardy ───────────────────────────────────────────────────────────
export const jeopardyCategories = [
  "Old Testament", "New Testament", "Bible Heroes", "Books of Bible", "Bible Places", "Bible Numbers",
];

export const jeopardyClues: {
  category: string; value: number; clue: string;
  answer: string; options: string[];
}[] = [
  // Old Testament
  { category:"Old Testament", value:200, clue:"The first book of the Bible", answer:"Genesis", options:["Exodus","Genesis","Leviticus","Numbers"] },
  { category:"Old Testament", value:400, clue:"He parted the Red Sea to lead Israel out of Egypt", answer:"Moses", options:["Aaron","Moses","Joshua","Caleb"] },
  { category:"Old Testament", value:600, clue:"This prophet was swallowed by a great fish", answer:"Jonah", options:["Elijah","Isaiah","Jonah","Hosea"] },
  { category:"Old Testament", value:800, clue:"The first woman created, made from Adam's rib", answer:"Eve", options:["Sarah","Miriam","Eve","Rachel"] },
  { category:"Old Testament", value:1000, clue:"King who asked God for wisdom instead of riches", answer:"Solomon", options:["David","Saul","Solomon","Rehoboam"] },
  // New Testament
  { category:"New Testament", value:200, clue:"The angel who announced Jesus' birth to Mary", answer:"Gabriel", options:["Michael","Raphael","Gabriel","Uriel"] },
  { category:"New Testament", value:400, clue:"Jesus performed his first miracle here, turning water to wine", answer:"Cana", options:["Bethlehem","Jerusalem","Cana","Nazareth"] },
  { category:"New Testament", value:600, clue:"He denied Jesus three times before the rooster crowed", answer:"Peter", options:["Judas","Peter","Thomas","James"] },
  { category:"New Testament", value:800, clue:"Paul wrote his letter to believers in this Greek city", answer:"Corinth", options:["Athens","Corinth","Philippi","Ephesus"] },
  { category:"New Testament", value:1000, clue:"The last book of the Bible, written by John", answer:"Revelation", options:["Hebrews","Jude","Revelation","Acts"] },
  // Bible Heroes
  { category:"Bible Heroes", value:200, clue:"Killed the giant Goliath with a sling and stone", answer:"David", options:["Samson","David","Gideon","Joshua"] },
  { category:"Bible Heroes", value:400, clue:"She stayed loyal to her mother-in-law Naomi", answer:"Ruth", options:["Esther","Rahab","Ruth","Deborah"] },
  { category:"Bible Heroes", value:600, clue:"Built the ark before a great worldwide flood", answer:"Noah", options:["Noah","Abraham","Lot","Shem"] },
  { category:"Bible Heroes", value:800, clue:"Queen who risked her life to save the Jewish people", answer:"Esther", options:["Ruth","Miriam","Esther","Deborah"] },
  { category:"Bible Heroes", value:1000, clue:"He interpreted dreams and became ruler of Egypt", answer:"Joseph", options:["Benjamin","Reuben","Joseph","Judah"] },
  // Books of Bible
  { category:"Books of Bible", value:200, clue:"Shortest book in the Old Testament (one chapter)", answer:"Obadiah", options:["Obadiah","Nahum","Philemon","Jude"] },
  { category:"Books of Bible", value:400, clue:"Book containing the Ten Commandments given at Sinai", answer:"Exodus", options:["Leviticus","Deuteronomy","Exodus","Numbers"] },
  { category:"Books of Bible", value:600, clue:"New Testament book that records the acts of the early church", answer:"Acts", options:["Acts","Romans","James","Hebrews"] },
  { category:"Books of Bible", value:800, clue:"Book of songs, prayers, and poems — 150 chapters", answer:"Psalms", options:["Proverbs","Psalms","Ecclesiastes","Song of Solomon"] },
  { category:"Books of Bible", value:1000, clue:"Paul's letter that systematically explains the gospel", answer:"Romans", options:["Galatians","Romans","Ephesians","Colossians"] },
  // Bible Places
  { category:"Bible Places", value:200, clue:"City where Jesus was born", answer:"Bethlehem", options:["Jerusalem","Bethlehem","Nazareth","Hebron"] },
  { category:"Bible Places", value:400, clue:"The garden where Adam and Eve lived", answer:"Eden", options:["Gethsemane","Eden","Paradise","Canaan"] },
  { category:"Bible Places", value:600, clue:"River where John the Baptist baptized Jesus", answer:"Jordan", options:["Nile","Euphrates","Jordan","Galilee"] },
  { category:"Bible Places", value:800, clue:"Mountain where Moses received the Ten Commandments", answer:"Sinai", options:["Carmel","Sinai","Zion","Nebo"] },
  { category:"Bible Places", value:1000, clue:"Paul was shipwrecked on this Mediterranean island", answer:"Malta", options:["Cyprus","Crete","Malta","Sicily"] },
  // Bible Numbers
  { category:"Bible Numbers", value:200, clue:"Number of days and nights it rained during Noah's flood", answer:"40", options:["7","30","40","50"] },
  { category:"Bible Numbers", value:400, clue:"Pieces of silver Judas received for betraying Jesus", answer:"30", options:["20","30","40","50"] },
  { category:"Bible Numbers", value:600, clue:"Number of apostles Jesus chose", answer:"12", options:["7","10","12","14"] },
  { category:"Bible Numbers", value:800, clue:"Years the Israelites wandered in the wilderness", answer:"40", options:["20","30","40","50"] },
  { category:"Bible Numbers", value:1000, clue:"Age of Methuselah, the oldest person in the Bible", answer:"969", options:["777","852","930","969"] },
];

// ── Bible Memory Game Pairs ───────────────────────────────────────────────────
export const memoryPairs = [
  { id: 1, a: { label: "Moses",   emoji: "🏔️" }, b: { label: "Parted the Red Sea", emoji: "🌊" } },
  { id: 2, a: { label: "David",   emoji: "⭐" }, b: { label: "Slew Goliath",        emoji: "🪨" } },
  { id: 3, a: { label: "Noah",    emoji: "🚢" }, b: { label: "Built the Ark",       emoji: "🌈" } },
  { id: 4, a: { label: "Esther",  emoji: "👑" }, b: { label: "Saved Her People",    emoji: "💛" } },
  { id: 5, a: { label: "Jonah",   emoji: "🐳" }, b: { label: "Swallowed by Fish",   emoji: "🌊" } },
  { id: 6, a: { label: "Daniel",  emoji: "🦁" }, b: { label: "Den of Lions",        emoji: "🔒" } },
  { id: 7, a: { label: "Mary",    emoji: "✨" }, b: { label: "Mother of Jesus",     emoji: "🕊️" } },
  { id: 8, a: { label: "Paul",    emoji: "✉️" }, b: { label: "Wrote Many Epistles", emoji: "📜" } },
  { id: 9, a: { label: "Joseph",  emoji: "🎨" }, b: { label: "Coat of Many Colors", emoji: "🌟" } },
  { id:10, a: { label: "Samson",  emoji: "💪" }, b: { label: "His Strength Was His Hair", emoji: "✂️" } },
  { id:11, a: { label: "Elijah",  emoji: "🔥" }, b: { label: "Fire from Heaven",   emoji: "⚡" } },
  { id:12, a: { label: "Ruth",    emoji: "🌾" }, b: { label: "Loyal to Naomi",     emoji: "❤️" } },
];

// ── Bible Verse Generator ─────────────────────────────────────────────────────
export type VerseCategory = "All" | "Faith" | "Love" | "Hope" | "Strength" | "Wisdom" | "Encouragement";

export interface BibleVerse {
  text: string;
  reference: string;
  category: Exclude<VerseCategory, "All">;
}

export const bibleVerses: BibleVerse[] = [
  // Faith
  { text: "Now faith is confidence in what we hope for and assurance about what we do not see.", reference: "Hebrews 11:1", category: "Faith" },
  { text: "Consequently, faith comes from hearing the message, and the message is heard through the word about Christ.", reference: "Romans 10:17", category: "Faith" },
  { text: "Everything is possible for one who believes.", reference: "Mark 9:23", category: "Faith" },
  { text: "Truly I tell you, if you have faith as small as a mustard seed, you can say to this mountain, 'Move from here to there,' and it will move.", reference: "Matthew 17:20", category: "Faith" },
  { text: "For we live by faith, not by sight.", reference: "2 Corinthians 5:7", category: "Faith" },
  { text: "I have been crucified with Christ and I no longer live, but Christ lives in me.", reference: "Galatians 2:20", category: "Faith" },
  { text: "Cast all your anxiety on him because he cares for you.", reference: "1 Peter 5:7", category: "Faith" },
  { text: "Trust in the Lord with all your heart and lean not on your own understanding.", reference: "Proverbs 3:5", category: "Faith" },
  { text: "You will keep in perfect peace those whose minds are steadfast, because they trust in you.", reference: "Isaiah 26:3", category: "Faith" },
  { text: "Without faith it is impossible to please God, because anyone who comes to him must believe that he exists and that he rewards those who earnestly seek him.", reference: "Hebrews 11:6", category: "Faith" },
  // Love
  { text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.", reference: "John 3:16", category: "Love" },
  { text: "Love is patient, love is kind. It does not envy, it does not boast, it is not proud.", reference: "1 Corinthians 13:4", category: "Love" },
  { text: "And now these three remain: faith, hope and love. But the greatest of these is love.", reference: "1 Corinthians 13:13", category: "Love" },
  { text: "For I am convinced that neither death nor life, neither angels nor demons, neither the present nor the future, nor any powers, can separate us from the love of God.", reference: "Romans 8:38–39", category: "Love" },
  { text: "Whoever does not love does not know God, because God is love.", reference: "1 John 4:8", category: "Love" },
  { text: "Greater love has no one than this: to lay down one's life for one's friends.", reference: "John 15:13", category: "Love" },
  { text: "But God demonstrates his own love for us in this: While we were still sinners, Christ died for us.", reference: "Romans 5:8", category: "Love" },
  { text: "We love because he first loved us.", reference: "1 John 4:19", category: "Love" },
  { text: "A new command I give you: Love one another. As I have loved you, so you must love one another.", reference: "John 13:34", category: "Love" },
  { text: "Many waters cannot quench love; rivers cannot sweep it away.", reference: "Song of Solomon 8:7", category: "Love" },
  // Hope
  { text: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.", reference: "Jeremiah 29:11", category: "Hope" },
  { text: "May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope by the power of the Holy Spirit.", reference: "Romans 15:13", category: "Hope" },
  { text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.", reference: "Romans 8:28", category: "Hope" },
  { text: "Because of the Lord's great love we are not consumed, for his compassions never fail. They are new every morning.", reference: "Lamentations 3:22–23", category: "Hope" },
  { text: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles.", reference: "Isaiah 40:31", category: "Hope" },
  { text: "And hope does not put us to shame, because God's love has been poured out into our hearts through the Holy Spirit.", reference: "Romans 5:5", category: "Hope" },
  { text: "We have this hope as an anchor for the soul, firm and secure.", reference: "Hebrews 6:19", category: "Hope" },
  { text: "Rejoice in hope, be patient in tribulation, be constant in prayer.", reference: "Romans 12:12", category: "Hope" },
  { text: "As for me, I will always have hope; I will praise you more and more.", reference: "Psalm 71:14", category: "Hope" },
  { text: "Let us hold unswervingly to the hope we profess, for he who promised is faithful.", reference: "Hebrews 10:23", category: "Hope" },
  // Strength
  { text: "I can do all this through him who gives me strength.", reference: "Philippians 4:13", category: "Strength" },
  { text: "So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you.", reference: "Isaiah 41:10", category: "Strength" },
  { text: "God is our refuge and strength, an ever-present help in trouble.", reference: "Psalm 46:1", category: "Strength" },
  { text: "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.", reference: "Joshua 1:9", category: "Strength" },
  { text: "But he said to me, 'My grace is sufficient for you, for my power is made perfect in weakness.'", reference: "2 Corinthians 12:9", category: "Strength" },
  { text: "Finally, be strong in the Lord and in his mighty power.", reference: "Ephesians 6:10", category: "Strength" },
  { text: "He gives strength to the weary and increases the power of the weak.", reference: "Isaiah 40:29", category: "Strength" },
  { text: "The Lord is my strength and my shield; my heart trusts in him, and he helps me.", reference: "Psalm 28:7", category: "Strength" },
  { text: "The joy of the Lord is your strength.", reference: "Nehemiah 8:10", category: "Strength" },
  { text: "Be strong and courageous. Do not be afraid or terrified because of them, for the Lord your God goes with you.", reference: "Deuteronomy 31:6", category: "Strength" },
  // Wisdom
  { text: "If any of you lacks wisdom, you should ask God, who gives generously to all without finding fault.", reference: "James 1:5", category: "Wisdom" },
  { text: "The fear of the Lord is the beginning of wisdom, and knowledge of the Holy One is understanding.", reference: "Proverbs 9:10", category: "Wisdom" },
  { text: "The fear of the Lord is the beginning of knowledge, but fools despise wisdom and instruction.", reference: "Proverbs 1:7", category: "Wisdom" },
  { text: "Getting wisdom is the most important thing you can do. Whatever else you get, get insight.", reference: "Proverbs 4:7", category: "Wisdom" },
  { text: "In whom are hidden all the treasures of wisdom and knowledge.", reference: "Colossians 2:3", category: "Wisdom" },
  { text: "The wisdom that comes from heaven is first of all pure; then peace-loving, considerate, submissive.", reference: "James 3:17", category: "Wisdom" },
  { text: "Do not be wise in your own eyes; fear the Lord and shun evil.", reference: "Proverbs 3:7", category: "Wisdom" },
  { text: "The fear of the Lord is the beginning of wisdom; all who follow his precepts have good understanding.", reference: "Psalm 111:10", category: "Wisdom" },
  { text: "Blessed is the one who finds wisdom, and the one who gets understanding.", reference: "Proverbs 3:13", category: "Wisdom" },
  { text: "Wisdom is a shelter as money is a shelter, but the advantage of knowledge is this: Wisdom preserves those who have it.", reference: "Ecclesiastes 7:12", category: "Wisdom" },
  // Encouragement
  { text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.", reference: "Philippians 4:6", category: "Encouragement" },
  { text: "Come to me, all you who are weary and burdened, and I will give you rest.", reference: "Matthew 11:28", category: "Encouragement" },
  { text: "For the Spirit God gave us does not make us timid, but gives us power, love and self-discipline.", reference: "2 Timothy 1:7", category: "Encouragement" },
  { text: "The Lord is close to the brokenhearted and saves those who are crushed in spirit.", reference: "Psalm 34:18", category: "Encouragement" },
  { text: "I have told you these things, so that in me you may have peace. In this world you will have trouble. But take heart! I have overcome the world.", reference: "John 16:33", category: "Encouragement" },
  { text: "Therefore encourage one another and build each other up, just as in fact you are doing.", reference: "1 Thessalonians 5:11", category: "Encouragement" },
  { text: "If God is for us, who can be against us?", reference: "Romans 8:31", category: "Encouragement" },
  { text: "Even though I walk through the darkest valley, I will fear no evil, for you are with me.", reference: "Psalm 23:4", category: "Encouragement" },
  { text: "The Lord your God is with you, the Mighty Warrior who saves. He will take great delight in you.", reference: "Zephaniah 3:17", category: "Encouragement" },
  { text: "Fear not, for I have redeemed you; I have summoned you by name; you are mine.", reference: "Isaiah 43:1", category: "Encouragement" },
];

export const verseCategories: VerseCategory[] = ["All", "Faith", "Love", "Hope", "Strength", "Wisdom", "Encouragement"];

export const verseFAQs = [
  { q: "How many Bible verses are in the generator?", a: "Our Bible verse generator contains over 60 carefully selected passages covering six meaningful categories: Faith, Love, Hope, Strength, Wisdom, and Encouragement." },
  { q: "Can I filter verses by topic?", a: "Yes! Use the category dropdown to focus on a specific theme. Choose from Faith, Love, Hope, Strength, Wisdom, or Encouragement — or keep it on 'All' for a wide variety." },
  { q: "How do I copy a verse to share it?", a: "Each verse card includes a 'Copy' button. Click it to copy the full verse text and reference to your clipboard, ready to paste into a message, social media post, or document." },
  { q: "Are these verses from a specific Bible translation?", a: "The verses are drawn primarily from the New International Version (NIV), one of the most widely used modern translations, balanced for readability and accuracy." },
  { q: "Can I use this for daily devotions?", a: "Absolutely. Many people use the generator as a simple devotional starting point — generate a verse, reflect on it, and let it guide your prayer or journaling for the day." },
];

export const homeFAQs = [
  { q: "Are these Bible games completely free?", a: "Yes! All games on Bible Games Online are 100% free to play. There are no hidden fees or subscriptions required." },
  { q: "Do I need to create an account to play?", a: "No account is needed. You can jump right in and start playing immediately without any registration." },
  { q: "Are these games suitable for children?", a: "Absolutely. We have a dedicated Kids Games section with simple, engaging activities, and all our content is family-friendly." },
  { q: "Can I play on my mobile phone?", a: "Yes, our website is fully responsive and designed to work seamlessly on desktops, tablets, and smartphones." },
  { q: "Do you add new questions to the trivia games?", a: "We regularly update our database with new questions across all difficulty levels to keep the challenges fresh." },
];
