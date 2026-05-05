import { useState, useEffect, useCallback, useRef } from "react";

// ─── Complete database of all 48 Unfinity Sticker Sheets ───

const ALL_STICKER_SHEETS = [
  { id: 1, name: "Eldrazi Guacamole Tightrope", nameStickers: ["Eldrazi", "Guacamole", "Tightrope"], artStickers: ["🎪 Tightrope", "🥑 Guacamole Bowl", "👁️ Eldrazi Eye"], abilityStickers: [{ text: "Haste", cost: 2 }, { text: "You may cast this card from your graveyard by paying 2 life in addition to paying its other costs.", cost: 5 }], ptStickers: [{ pt: "1/4", cost: 2 }, { pt: "5/3", cost: 3 }] },
  { id: 2, name: "Trendy Circus Pirate", nameStickers: ["Trendy", "Circus", "Pirate"], artStickers: ["🏴‍☠️ Pirate Hat", "🎪 Big Top", "🎭 Mask"], abilityStickers: [{ text: "Deathtouch", cost: 2 }, { text: "Whenever this creature deals combat damage to a player, create that many 1/1 green Squirrel creature tokens.", cost: 5 }], ptStickers: [{ pt: "5/1", cost: 2 }, { pt: "3/6", cost: 3 }] },
  { id: 3, name: "Night Brushwagg Ringmaster", nameStickers: ["Night", "Brushwagg", "Ringmaster"], artStickers: ["🎩 Top Hat", "🌙 Moon", "🦔 Brushwagg"], abilityStickers: [{ text: "Menace", cost: 2 }, { text: "Persist (When this permanent dies, if it had no -1/-1 counters on it, return it to the battlefield under its owner's control with a -1/-1 counter on it.)", cost: 3 }], ptStickers: [{ pt: "2/3", cost: 2 }, { pt: "10/10", cost: 6 }] },
  { id: 4, name: "Urza's Dark Cannonball", nameStickers: ["Urza's", "Dark", "Cannonball"], artStickers: ["💣 Cannonball", "🔮 Powerstone", "🌑 Darkness"], abilityStickers: [{ text: "Exalted, exalted (Whenever a creature you control attacks alone, it gets +1/+1 until end of turn for each instance of exalted among permanents you control.)", cost: 2 }, { text: "Shadow (This creature can block or be blocked only by creatures with shadow.)", cost: 3 }], ptStickers: [{ pt: "1/5", cost: 2 }, { pt: "7/4", cost: 4 }] },
  { id: 5, name: "Misunderstood Trapeze Elf", nameStickers: ["Misunderstood", "Trapeze", "Elf"], artStickers: ["🧝 Elf Ears", "🎪 Trapeze", "😢 Teardrop"], abilityStickers: [{ text: "Whenever you cast a spell, this creature gets +X/+X until end of turn, where X is the amount of generic mana in that spell's mana cost.", cost: 2 }, { text: "Hexproof", cost: 3 }], ptStickers: [{ pt: "4/2", cost: 2 }, { pt: "6/6", cost: 4 }] },
  { id: 6, name: "Zombie Cheese Magician", nameStickers: ["Zombie", "Cheese", "Magician"], artStickers: ["🧀 Cheese Wheel", "🧟 Zombie Hand", "🎩 Magic Hat"], abilityStickers: [{ text: "First strike", cost: 2 }, { text: "Whenever this creature deals combat damage to a player, draw that many cards.", cost: 4 }], ptStickers: [{ pt: "3/3", cost: 2 }, { pt: "6/2", cost: 3 }] },
  { id: 7, name: "Carnival Elephant Meteor", nameStickers: ["Carnival", "Elephant", "Meteor"], artStickers: ["🐘 Elephant", "☄️ Meteor", "🎡 Ferris Wheel"], abilityStickers: [{ text: "Sacrifice this permanent: Draw two cards.", cost: 2 }, { text: "Whenever this creature attacks, proliferate. (Choose any number of permanents and/or players, then give each another counter of each kind already there.)", cost: 3 }], ptStickers: [{ pt: "4/1", cost: 2 }, { pt: "8/7", cost: 5 }] },
  { id: 8, name: "Happy Dead Squirrel", nameStickers: ["Happy", "Dead", "Squirrel"], artStickers: ["🐿️ Squirrel", "💀 Skull", "😊 Smiley"], abilityStickers: [{ text: "{T}: Add {C}{C}. Spend this mana only to cast noncreature spells.", cost: 2 }, { text: "Infect (This permanent deals damage to creatures in the form of -1/-1 counters and to players in the form of poison counters.)", cost: 3 }], ptStickers: [{ pt: "3/2", cost: 2 }, { pt: "4/7", cost: 4 }] },
  { id: 9, name: "Slimy Burrito Illusion", nameStickers: ["Slimy", "Burrito", "Illusion"], artStickers: ["🌯 Burrito", "🫧 Slime Bubble", "✨ Illusion"], abilityStickers: [{ text: "Bushido 2 (Whenever this creature blocks or becomes blocked, it gets +2/+2 until end of turn.)", cost: 2 }, { text: "Double strike", cost: 3 }], ptStickers: [{ pt: "2/4", cost: 2 }, { pt: "5/6", cost: 4 }] },
  { id: 10, name: "Spooky Clown Mox", nameStickers: ["Spooky", "Clown", "Mox"], artStickers: ["🤡 Clown Face", "👻 Ghost", "💎 Gem"], abilityStickers: [{ text: "Vigilance", cost: 2 }, { text: "{1}, {T}: Tap target creature.", cost: 4 }], ptStickers: [{ pt: "1/5", cost: 2 }, { pt: "5/4", cost: 3 }] },
  { id: 11, name: "Mystic Doom Sandwich", nameStickers: ["Mystic", "Doom", "Sandwich"], artStickers: ["🥪 Sandwich", "🔮 Crystal Ball", "💀 Doom"], abilityStickers: [{ text: "Lifelink", cost: 2 }, { text: "This creature must be blocked if able. Whenever this creature becomes blocked, it gets +1/+1 until end of turn for each creature blocking it.", cost: 3 }], ptStickers: [{ pt: "1/4", cost: 2 }, { pt: "6/8", cost: 5 }] },
  { id: 12, name: "Narrow-Minded Baloney Fireworks", nameStickers: ["Narrow-Minded", "Baloney", "Fireworks"], artStickers: ["🎆 Fireworks", "🥓 Baloney", "😤 Grumpy Face"], abilityStickers: [{ text: "Whenever this creature attacks, you gain 2 life.", cost: 2 }, { text: "Vigilance, reach", cost: 3 }], ptStickers: [{ pt: "2/4", cost: 2 }, { pt: "7/7", cost: 5 }] },
  { id: 13, name: "Unsanctioned Ancient Juggler", nameStickers: ["Unsanctioned", "Ancient", "Juggler"], artStickers: ["🤹 Juggling Balls", "🏛️ Temple", "📜 Scroll"], abilityStickers: [{ text: "Whenever this creature attacks, bolster 1. (Choose a creature with the least toughness among creatures you control and put a +1/+1 counter on it.)", cost: 2 }, { text: "Indestructible", cost: 4 }], ptStickers: [{ pt: "3/2", cost: 2 }, { pt: "5/4", cost: 3 }] },
  { id: 14, name: "Deep-Fried Plague Myr", nameStickers: ["Deep-Fried", "Plague", "Myr"], artStickers: ["🍟 Deep Fryer", "🦠 Plague", "🤖 Myr"], abilityStickers: [{ text: "Whenever this creature attacks, scry 1.", cost: 2 }, { text: "Whenever this permanent leaves the battlefield, you may destroy target artifact or enchantment.", cost: 3 }], ptStickers: [{ pt: "4/5", cost: 3 }, { pt: "8/4", cost: 4 }] },
  { id: 15, name: "Contortionist Otter Storm", nameStickers: ["Contortionist", "Otter", "Storm"], artStickers: ["🦦 Otter", "⛈️ Storm Cloud", "🤸 Contortionist"], abilityStickers: [{ text: "{T}: Target creature gains haste until end of turn.", cost: 2 }, { text: "Deathtouch, lifelink", cost: 4 }], ptStickers: [{ pt: "5/1", cost: 2 }, { pt: "3/5", cost: 3 }] },
  { id: 16, name: "Sticky Kavu Daredevil", nameStickers: ["Sticky", "Kavu", "Daredevil"], artStickers: ["🦎 Kavu", "🏍️ Motorcycle", "🍯 Honey"], abilityStickers: [{ text: "Whenever this permanent dies, you may return target creature to its owner's hand.", cost: 2 }, { text: "Whenever this creature attacks, creatures you control get +1/+1 until end of turn.", cost: 4 }], ptStickers: [{ pt: "3/3", cost: 2 }, { pt: "2/6", cost: 3 }] },
  { id: 17, name: "Goblin Coward Parade", nameStickers: ["Goblin", "Coward", "Parade"], artStickers: ["👺 Goblin", "🏃 Running Away", "🎺 Parade"], abilityStickers: [{ text: "Mentor (Whenever this creature attacks, put a +1/+1 counter on target attacking creature with lesser power.)", cost: 2 }, { text: "When this permanent leaves the battlefield, you may destroy target creature with power 4 or greater.", cost: 3 }], ptStickers: [{ pt: "2/3", cost: 2 }, { pt: "8/4", cost: 4 }] },
  { id: 18, name: "Phyrexian Midway Bamboozle", nameStickers: ["Phyrexian", "Midway", "Bamboozle"], artStickers: ["⚙️ Phyrexian Symbol", "🎡 Midway", "🃏 Trick"], abilityStickers: [{ text: "Whenever this creature attacks, you get {TK}.", cost: 2 }, { text: "Undying (When this creature dies, if it had no +1/+1 counters on it, return it to the battlefield under its owner's control with a +1/+1 counter on it.)", cost: 3 }], ptStickers: [{ pt: "4/2", cost: 2 }, { pt: "6/9", cost: 5 }] },
  { id: 19, name: "Eternal Acrobat Toast", nameStickers: ["Eternal", "Acrobat", "Toast"], artStickers: ["🍞 Toast", "🤸 Acrobat", "♾️ Infinity"], abilityStickers: [{ text: "Whenever this creature deals combat damage to a player, exile target creature you control, then return it to the battlefield under its owner's control.", cost: 2 }, { text: "{T}: Untap another target permanent.", cost: 3 }], ptStickers: [{ pt: "4/4", cost: 3 }, { pt: "7/8", cost: 5 }] },
  { id: 20, name: "Jetpack Death Seltzer", nameStickers: ["Jetpack", "Death", "Seltzer"], artStickers: ["🚀 Jetpack", "💀 Skull", "🥤 Seltzer"], abilityStickers: [{ text: "Trample", cost: 2 }, { text: "{3}: Monstrosity 3. (If this creature isn't monstrous, put three +1/+1 counters on it and it becomes monstrous.)", cost: 3 }], ptStickers: [{ pt: "2/7", cost: 3 }, { pt: "6/5", cost: 4 }] },
  { id: 21, name: "Demonic Tourist Laser", nameStickers: ["Demonic", "Tourist", "Laser"], artStickers: ["😈 Demon", "📸 Camera", "🔴 Laser"], abilityStickers: [{ text: "Outlast {1} ({1}, {T}: Put a +1/+1 counter on this creature. Outlast only as a sorcery.)", cost: 2 }, { text: "When this permanent dies, you get seven {TK}.", cost: 3 }], ptStickers: [{ pt: "1/4", cost: 2 }, { pt: "9/6", cost: 5 }] },
  { id: 22, name: "Cursed Firebreathing Yogurt", nameStickers: ["Cursed", "Firebreathing", "Yogurt"], artStickers: ["🔥 Fireball", "🥛 Yogurt Cup", "💀 Curse"], abilityStickers: [{ text: "Prowess, prowess (Whenever you cast a noncreature spell, this creature gets +1/+1 until end of turn twice.)", cost: 2 }, { text: "{2}, {T}: This permanent deals 2 damage to any target.", cost: 5 }], ptStickers: [{ pt: "4/2", cost: 2 }, { pt: "4/8", cost: 4 }] },
  { id: 23, name: "Ancestral Hot Dog Minotaur", nameStickers: ["Ancestral", "Hot Dog", "Minotaur"], artStickers: ["🌭 Hot Dog", "🐂 Minotaur", "📖 Tome"], abilityStickers: [{ text: "Afflict 2 (Whenever this creature becomes blocked, defending player loses 2 life.)", cost: 2 }, { text: "Flying", cost: 3 }], ptStickers: [{ pt: "1/4", cost: 2 }, { pt: "8/6", cost: 5 }] },
  { id: 24, name: "Familiar Beeble Mascot", nameStickers: ["Familiar", "Beeble", "Mascot"], artStickers: ["🐝 Beeble", "🎭 Mascot Suit", "🧙 Familiar"], abilityStickers: [{ text: "Whenever this creature attacks, untap target permanent.", cost: 2 }, { text: "Whenever a creature enters under your control, creatures you control get +1/+1 until end of turn.", cost: 4 }], ptStickers: [{ pt: "2/3", cost: 2 }, { pt: "5/3", cost: 3 }] },
  { id: 25, name: "Giant Mana Cake", nameStickers: ["Giant", "Mana", "Cake"], artStickers: ["🎂 Cake", "✨ Mana Spark", "🏔️ Giant"], abilityStickers: [{ text: "When this permanent leaves the battlefield, create two Food tokens. (They're artifacts with \"{2}, {T}, Sacrifice this artifact: You gain 3 life.\")", cost: 2 }, { text: "When this permanent dies, you may destroy target nonland permanent.", cost: 4 }], ptStickers: [{ pt: "3/3", cost: 2 }, { pt: "6/2", cost: 3 }] },
  { id: 26, name: "Snazzy Aether Homunculus", nameStickers: ["Snazzy", "Aether", "Homunculus"], artStickers: ["🧪 Flask", "💨 Aether", "🕴️ Dapper"], abilityStickers: [{ text: "{1}: Target creature gains all creature types until end of turn.", cost: 2 }, { text: "Magecraft — Whenever you cast or copy an instant or sorcery spell, draw a card.", cost: 3 }], ptStickers: [{ pt: "2/4", cost: 2 }, { pt: "8/7", cost: 5 }] },
  { id: 27, name: "Squid Fire Knight", nameStickers: ["Squid", "Fire", "Knight"], artStickers: ["🦑 Squid", "🔥 Fire", "⚔️ Knight"], abilityStickers: [{ text: "{T}: The next time target player would roll one or more dice this turn, instead they roll that many dice plus one, then you choose one of those rolls to ignore.", cost: 2 }, { text: "Protection from odd mana values", cost: 3 }], ptStickers: [{ pt: "4/1", cost: 2 }, { pt: "6/6", cost: 4 }] },
  { id: 28, name: "Cool Fluffy Loxodon", nameStickers: ["Cool", "Fluffy", "Loxodon"], artStickers: ["🐘 Loxodon", "😎 Sunglasses", "☁️ Cloud"], abilityStickers: [{ text: "When this permanent leaves the battlefield, draw a card.", cost: 2 }, { text: "Whenever a creature enters under your control, this permanent becomes a 13/13 Eldrazi creature in addition to its other types until end of turn.", cost: 5 }], ptStickers: [{ pt: "4/2", cost: 2 }, { pt: "5/6", cost: 4 }] },
  { id: 29, name: "Space Fungus Snickerdoodle", nameStickers: ["Space", "Fungus", "Snickerdoodle"], artStickers: ["🍪 Cookie", "🍄 Mushroom", "🚀 Rocket"], abilityStickers: [{ text: "Skulk (This creature can't be blocked by creatures with greater power.)", cost: 2 }, { text: "Battle cry (Whenever this creature attacks, each other attacking creature gets +1/+0 until end of turn.)", cost: 3 }], ptStickers: [{ pt: "3/2", cost: 2 }, { pt: "6/8", cost: 5 }] },
  { id: 30, name: "Playable Delusionary Hydra", nameStickers: ["Playable", "Delusionary", "Hydra"], artStickers: ["🐉 Hydra", "🌀 Swirl", "🃏 Card"], abilityStickers: [{ text: "{T}: Draw a card, then discard a card.", cost: 2 }, { text: "Whenever this creature attacks, you gain 3 life and draw a card.", cost: 4 }], ptStickers: [{ pt: "1/5", cost: 2 }, { pt: "4/4", cost: 3 }] },
  { id: 31, name: "Wrinkly Monkey Shenanigans", nameStickers: ["Wrinkly", "Monkey", "Shenanigans"], artStickers: ["🐒 Monkey", "🎊 Party", "👴 Wrinkles"], abilityStickers: [{ text: "{1}: Target creature can't block this creature this turn.", cost: 2 }, { text: "Morbid — At the beginning of each end step, if a creature died this turn and this permanent is a creature, put a -1/-1 counter on this permanent and draw a card.", cost: 4 }], ptStickers: [{ pt: "2/4", cost: 2 }, { pt: "7/2", cost: 3 }] },
  { id: 32, name: "Geek Lotus Warrior", nameStickers: ["Geek", "Lotus", "Warrior"], artStickers: ["🪷 Lotus", "⚔️ Sword", "🤓 Glasses"], abilityStickers: [{ text: "{2}: This creature gets +2/+0 until end of turn.", cost: 2 }, { text: "Whenever a creature enters under your control, this permanent deals 2 damage to target player.", cost: 4 }], ptStickers: [{ pt: "4/1", cost: 2 }, { pt: "3/6", cost: 3 }] },
  { id: 33, name: "Primal Elder Kitty", nameStickers: ["Primal", "Elder", "Kitty"], artStickers: ["🐱 Cat", "🌿 Vine", "👑 Crown"], abilityStickers: [{ text: "{1}: This creature gets +1/-1 until end of turn.", cost: 2 }, { text: "When this creature dies, you may put X +1/+1 counters on target creature, where X is this creature's power.", cost: 3 }], ptStickers: [{ pt: "5/1", cost: 2 }, { pt: "4/7", cost: 4 }] },
  { id: 34, name: "Sassy Gremlin Blood", nameStickers: ["Sassy", "Gremlin", "Blood"], artStickers: ["👹 Gremlin", "💉 Blood Drop", "💅 Sassy"], abilityStickers: [{ text: "Whenever this creature attacks, create a Treasure token.", cost: 2 }, { text: "{3}: Target creature gains flying until end of turn.", cost: 5 }], ptStickers: [{ pt: "3/2", cost: 2 }, { pt: "10/10", cost: 6 }] },
  { id: 35, name: "Yawgmoth Merfolk Soul", nameStickers: ["Yawgmoth", "Merfolk", "Soul"], artStickers: ["🧜 Merfolk", "⚫ Void", "👻 Spirit"], abilityStickers: [{ text: "When this permanent leaves the battlefield, target player discards a card.", cost: 2 }, { text: "When this permanent leaves the battlefield, create five 1/1 white Clown Robot artifact creature tokens.", cost: 5 }], ptStickers: [{ pt: "3/3", cost: 2 }, { pt: "6/5", cost: 4 }] },
  { id: 36, name: "Unassuming Gelatinous Serpent", nameStickers: ["Unassuming", "Gelatinous", "Serpent"], artStickers: ["🐍 Serpent", "🟢 Slime", "😶 Blank Face"], abilityStickers: [{ text: "When this permanent dies, return target noncreature, nonland card from your graveyard to your hand.", cost: 2 }, { text: "Whenever this creature deals combat damage to a player, that player mills twice that many cards.", cost: 4 }], ptStickers: [{ pt: "2/3", cost: 2 }, { pt: "7/2", cost: 3 }] },
  { id: 37, name: "Squishy Sphinx Ninja", nameStickers: ["Squishy", "Sphinx", "Ninja"], artStickers: ["🗿 Sphinx", "🥷 Ninja Star", "🫧 Bubble"], abilityStickers: [{ text: "Ward {2} (Whenever this creature becomes the target of a spell or ability an opponent controls, counter it unless that player pays {2}.)", cost: 2 }, { text: "Provoke (Whenever this creature attacks, you may have target creature defending player controls untap and block it if able.)", cost: 4 }], ptStickers: [{ pt: "5/3", cost: 3 }, { pt: "7/7", cost: 5 }] },
  { id: 38, name: "Unique Charmed Pants", nameStickers: ["Unique", "Charmed", "Pants"], artStickers: ["👖 Pants", "✨ Sparkle", "🦄 Unicorn"], abilityStickers: [{ text: "{T}: Add one mana of any color.", cost: 2 }, { text: "Whenever this creature attacks, if it's not a Brushwagg, it gets +X/+0 until end of turn, where X is the number of supertypes, card types, and subtypes it has.", cost: 3 }], ptStickers: [{ pt: "5/1", cost: 2 }, { pt: "4/8", cost: 4 }] },
  { id: 39, name: "Unhinged Beast Hunt", nameStickers: ["Unhinged", "Beast", "Hunt"], artStickers: ["🦁 Beast", "🏹 Bow", "💥 Explosion"], abilityStickers: [{ text: "{T}: You gain 1 life.", cost: 2 }, { text: "Whenever this creature attacks, tap each creature an opponent controls with the same power and/or same toughness as this creature.", cost: 4 }], ptStickers: [{ pt: "4/1", cost: 2 }, { pt: "2/6", cost: 3 }] },
  { id: 40, name: "Wild Ogre Bupkis", nameStickers: ["Wild", "Ogre", "Bupkis"], artStickers: ["👹 Ogre", "🌿 Wilderness", "🤷 Shrug"], abilityStickers: [{ text: "Whenever this creature attacks, put a +1/+1 counter on it.", cost: 2 }, { text: "Metalcraft — This permanent has protection from noncreature permanents as long as you control three or more artifacts.", cost: 3 }], ptStickers: [{ pt: "5/1", cost: 2 }, { pt: "7/4", cost: 4 }] },
  { id: 41, name: "Notorious Sliver War", nameStickers: ["Notorious", "Sliver", "War"], artStickers: ["🐛 Sliver", "⚔️ Crossed Swords", "🔥 Battlefield"], abilityStickers: [{ text: "{5}: Creatures you control get +1/+1 until end of turn.", cost: 2 }, { text: "Protection from creatures with two or more creature types", cost: 3 }], ptStickers: [{ pt: "3/3", cost: 2 }, { pt: "9/6", cost: 5 }] },
  { id: 42, name: "Weird Angel Flame", nameStickers: ["Weird", "Angel", "Flame"], artStickers: ["👼 Angel", "🔥 Flame", "👽 Weird"], abilityStickers: [{ text: "Heroic — Whenever you cast a spell that targets this permanent, put two +1/+1 counters on it.", cost: 2 }, { text: "Protection from even mana values", cost: 3 }], ptStickers: [{ pt: "2/3", cost: 2 }, { pt: "7/8", cost: 5 }] },
  { id: 43, name: "Vampire Champion Fury", nameStickers: ["Vampire", "Champion", "Fury"], artStickers: ["🧛 Vampire", "🏆 Trophy", "😤 Rage"], abilityStickers: [{ text: "Hellbent — This creature gets +3/+3 as long as you have no cards in hand.", cost: 2 }, { text: "{2}, Sacrifice this creature: It deals X damage divided as you choose among any number of target creatures, where X is its power.", cost: 4 }], ptStickers: [{ pt: "1/5", cost: 2 }, { pt: "6/3", cost: 3 }] },
  { id: 44, name: "Trained Blessed Mind", nameStickers: ["Trained", "Blessed", "Mind"], artStickers: ["🧠 Brain", "🙏 Halo", "📚 Books"], abilityStickers: [{ text: "{T}: Exile target card from a graveyard.", cost: 2 }, { text: "Threshold — As long as seven or more cards are in your graveyard, this creature gets +4/+0 and has trample.", cost: 3 }], ptStickers: [{ pt: "4/2", cost: 2 }, { pt: "6/9", cost: 5 }] },
  { id: 45, name: "Unglued Pea-Brained Dinosaur", nameStickers: ["Unglued", "Pea-Brained", "Dinosaur"], artStickers: ["🦕 Dinosaur", "🟢 Pea", "🧩 Puzzle Piece"], abilityStickers: [{ text: "{T}: Add {2}. Spend this mana only to cast creature spells.", cost: 2 }, { text: "At the beginning of combat on your turn, target noncreature artifact you control becomes a 4/4 artifact creature with flying until end of turn.", cost: 4 }], ptStickers: [{ pt: "2/4", cost: 2 }, { pt: "8/6", cost: 5 }] },
  { id: 46, name: "Elemental Time Flamingo", nameStickers: ["Elemental", "Time", "Flamingo"], artStickers: ["🦩 Flamingo", "⏰ Clock", "🌊 Wave"], abilityStickers: [{ text: "Exile this permanent: You may cast target nonland card from your graveyard this turn.", cost: 2 }, { text: "Whenever a creature you control dies, each opponent loses 1 life and you gain 1 life.", cost: 4 }], ptStickers: [{ pt: "1/5", cost: 2 }, { pt: "5/4", cost: 3 }] },
  { id: 47, name: "Unstable Robot Dragon", nameStickers: ["Unstable", "Robot", "Dragon"], artStickers: ["🐲 Dragon", "🤖 Robot", "💥 Explosion"], abilityStickers: [{ text: "{1}: Switch this creature's power and toughness until end of turn.", cost: 2 }, { text: "Whenever this creature attacks, it gets +5/+5 until end of turn.", cost: 4 }], ptStickers: [{ pt: "3/2", cost: 2 }, { pt: "2/7", cost: 3 }] },
  { id: 48, name: "Werewolf Lightning Mage", nameStickers: ["Werewolf", "Lightning", "Mage"], artStickers: ["🐺 Werewolf", "⚡ Lightning", "🧙 Mage"], abilityStickers: [{ text: "Landfall — Whenever a land enters under your control, put a +1/+1 counter on this permanent.", cost: 2 }, { text: "Whenever a creature blocks this creature, that creature gets -4/-4 until end of turn.", cost: 4 }], ptStickers: [{ pt: "4/1", cost: 2 }, { pt: "3/5", cost: 3 }] }
];

// ─── Persistent Storage helpers (localStorage) ───
const STORAGE_KEY = "mtg-sticker-boards";
const GAME_KEY = "mtg-sticker-game";

async function loadBoards() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}
async function saveBoards(boards) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(boards));
  } catch (e) { console.error("Save failed:", e); }
}
async function loadGame() {
  try {
    const raw = localStorage.getItem(GAME_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}
async function saveGame(game) {
  try {
    if (game) localStorage.setItem(GAME_KEY, JSON.stringify(game));
    else localStorage.removeItem(GAME_KEY);
  } catch (e) { console.error("Save failed:", e); }
}

// ─── Shuffle helper ───
function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ─── Color palette ───
const COLORS = {
  bg: "#0c0a14",
  card: "#15121f",
  cardHover: "#1d1a2a",
  accent: "#c084fc",
  accentDim: "#7c3aed",
  accentGlow: "rgba(192, 132, 252, 0.15)",
  name: "#fbbf24",
  art: "#34d399",
  ability: "#60a5fa",
  pt: "#f472b6",
  used: "#374151",
  usedText: "#6b7280",
  text: "#e2e0ea",
  textDim: "#8b87a0",
  border: "#2a2640",
  danger: "#ef4444",
  success: "#22c55e",
};

const TicketIcon = ({ size = 12 }) => (
  <span style={{ fontSize: size, opacity: 0.9 }}>🎟️</span>
);

// ─── Main App ───
export default function App() {
  const [view, setView] = useState("loading");
  const [boards, setBoards] = useState([]);
  const [game, setGame] = useState(null);
  const [selectedForBoard, setSelectedForBoard] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    (async () => {
      const b = await loadBoards();
      const g = await loadGame();
      setBoards(b);
      setGame(g);
      setView(g ? "game" : "home");
    })();
  }, []);

  useEffect(() => {
    if (view !== "loading") saveBoards(boards);
  }, [boards]);

  useEffect(() => {
    if (view !== "loading") saveGame(game);
  }, [game]);

  const addBoard = useCallback((sheetIds) => {
    const newBoard = {
      id: Date.now(),
      name: `Board ${boards.length + 1}`,
      sheetIds,
      createdAt: new Date().toISOString()
    };
    setBoards(prev => [...prev, newBoard]);
    setSelectedForBoard([]);
    setView("home");
  }, [boards]);

  const deleteBoard = useCallback((boardId) => {
    setBoards(prev => prev.filter(b => b.id !== boardId));
  }, []);

  const renameBoard = useCallback((boardId, newName) => {
    setBoards(prev => prev.map(b => b.id === boardId ? { ...b, name: newName } : b));
  }, []);

  const startGame = useCallback((board) => {
    const shuffled = shuffleArray(board.sheetIds);
    const selected = shuffled.slice(0, 3);
    const gameState = {
      boardId: board.id,
      boardName: board.name,
      selectedSheetIds: selected,
      usedStickers: {},
      startedAt: new Date().toISOString(),
      tickets: 0
    };
    setGame(gameState);
    setView("shuffle");
  }, []);

  const goToGame = useCallback(() => setView("game"), []);

  const toggleSticker = useCallback((sheetId, stickerType, stickerIdx, cost) => {
    setGame(prev => {
      const key = `${sheetId}-${stickerType}-${stickerIdx}`;
      const used = { ...prev.usedStickers };
      let ticketDelta = 0;
      if (used[key]) {
        delete used[key];
        if (cost) ticketDelta = cost;
      } else {
        used[key] = true;
        if (cost) ticketDelta = -cost;
      }
      return { ...prev, usedStickers: used, tickets: (prev.tickets || 0) + ticketDelta };
    });
  }, []);

  const endGame = useCallback(() => {
    setGame(null);
    setView("home");
  }, []);

  if (view === "loading") {
    return (
      <div style={{
        minHeight: "100vh", background: COLORS.bg, display: "flex",
        alignItems: "center", justifyContent: "center", color: COLORS.text,
        fontFamily: "'Comic Neue', cursive"
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🎪</div>
          <div style={{ fontSize: 14, letterSpacing: 4, textTransform: "uppercase", color: COLORS.textDim }}>
            Loading Astrotorium...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: COLORS.bg,
      color: COLORS.text,
      fontFamily: "'Comic Neue', cursive",
      position: "relative",
      overflow: "hidden"
    }}>
      <div style={{
        position: "fixed", inset: 0, opacity: 0.03, pointerEvents: "none",
        backgroundImage: `radial-gradient(${COLORS.accent} 1px, transparent 1px)`,
        backgroundSize: "32px 32px"
      }} />

      <header style={{
        padding: "20px 24px 16px",
        borderBottom: `1px solid ${COLORS.border}`,
        position: "relative", zIndex: 10,
        background: `linear-gradient(180deg, ${COLORS.bg} 0%, transparent 100%)`
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 28 }}>🎪</span>
            <div>
              <h1 style={{
                margin: 0, fontSize: 18, fontWeight: 700, letterSpacing: 2,
                textTransform: "uppercase", color: COLORS.accent,
                textShadow: `0 0 20px ${COLORS.accentGlow}`
              }}>
                Sticker HQ
              </h1>
              <div style={{ fontSize: 10, color: COLORS.textDim, letterSpacing: 3, textTransform: "uppercase", marginTop: 2 }}>
                Unfinity Sticker Manager
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {view !== "home" && !game && (
              <button onClick={() => { setView("home"); setSelectedForBoard([]); setSearchQuery(""); }}
                style={navBtnStyle}>
                ← Back
              </button>
            )}
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 900, margin: "0 auto", padding: "24px 16px 80px", position: "relative", zIndex: 5 }}>
        {view === "home" && (
          <HomeView boards={boards} onNewBoard={() => setView("newBoard")}
            onStartGame={startGame} onDeleteBoard={deleteBoard} onRenameBoard={renameBoard}
            onResumeGame={() => setView("game")} game={game} />
        )}
        {view === "newBoard" && (
          <NewBoardView selected={selectedForBoard} setSelected={setSelectedForBoard}
            onSave={addBoard} searchQuery={searchQuery} setSearchQuery={setSearchQuery}
            existingBoards={boards} />
        )}
        {view === "shuffle" && game && (
          <ShuffleAnimation game={game} onComplete={goToGame} />
        )}
        {view === "game" && game && (
          <GameView game={game} onToggle={toggleSticker} onEnd={endGame}
            setGame={setGame} />
        )}
      </main>
    </div>
  );
}

// ─── Home View ───
function HomeView({ boards, onNewBoard, onStartGame, onDeleteBoard, onRenameBoard, onResumeGame, game }) {
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");

  return (
    <div>
      {game && (
        <div style={{
          background: `linear-gradient(135deg, ${COLORS.accentDim}22, ${COLORS.accent}11)`,
          border: `1px solid ${COLORS.accent}44`,
          borderRadius: 12, padding: 20, marginBottom: 24,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: 12
        }}>
          <div>
            <div style={{ fontSize: 12, color: COLORS.accent, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>
              ⚡ Game In Progress
            </div>
            <div style={{ fontSize: 14, color: COLORS.text }}>
              {game.boardName} — {Object.keys(game.usedStickers).length} stickers used
            </div>
          </div>
          <button onClick={onResumeGame} style={primaryBtnStyle}>
            Resume game →
          </button>
        </div>
      )}

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <h2 style={{ margin: 0, fontSize: 14, letterSpacing: 3, textTransform: "uppercase", color: COLORS.textDim }}>
          Your Stickerboards ({boards.length})
        </h2>
        <button onClick={onNewBoard} style={primaryBtnStyle}>
          + New board
        </button>
      </div>

      {boards.length === 0 ? (
        <div style={{
          textAlign: "center", padding: "60px 20px",
          border: `1px dashed ${COLORS.border}`, borderRadius: 12
        }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🃏</div>
          <div style={{ fontSize: 14, color: COLORS.textDim, marginBottom: 8 }}>
            No stickerboards yet
          </div>
          <div style={{ fontSize: 12, color: COLORS.textDim, maxWidth: 300, margin: "0 auto" }}>
            Create a board of 10 unique sticker sheets, then start a game to randomly select 3 for play.
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {boards.map(board => {
            const sheets = board.sheetIds.map(id => ALL_STICKER_SHEETS.find(s => s.id === id)).filter(Boolean);
            return (
              <div key={board.id} style={{
                background: COLORS.card, borderRadius: 12, padding: 20,
                border: `1px solid ${COLORS.border}`,
                transition: "border-color 0.2s"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    {editingId === board.id ? (
                      <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 4 }}>
                        <input
                          autoFocus
                          value={editName}
                          onChange={e => setEditName(e.target.value)}
                          onKeyDown={e => {
                            if (e.key === "Enter" && editName.trim()) {
                              onRenameBoard(board.id, editName.trim());
                              setEditingId(null);
                            }
                            if (e.key === "Escape") setEditingId(null);
                          }}
                          style={{
                            flex: 1, padding: "4px 8px", borderRadius: 6,
                            background: COLORS.bg, border: `1px solid ${COLORS.accent}88`,
                            color: COLORS.text, fontFamily: "inherit",
                            fontSize: 15, fontWeight: 700, outline: "none"
                          }}
                        />
                        <button onClick={() => {
                          if (editName.trim()) onRenameBoard(board.id, editName.trim());
                          setEditingId(null);
                        }} style={{ ...navBtnStyle, fontSize: 11, padding: "4px 8px", color: COLORS.success }}>
                          ✓
                        </button>
                        <button onClick={() => setEditingId(null)}
                          style={{ ...navBtnStyle, fontSize: 11, padding: "4px 8px" }}>
                          ✕
                        </button>
                      </div>
                    ) : (
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                        <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.text }}>
                          {board.name}
                        </div>
                        <button onClick={() => { setEditingId(board.id); setEditName(board.name); }}
                          style={{
                            background: "transparent", border: "none", cursor: "pointer",
                            color: COLORS.textDim, fontSize: 13, padding: 2,
                            fontFamily: "inherit", opacity: 0.6
                          }}
                          title="Rename board">
                          ✏️
                        </button>
                      </div>
                    )}
                    <div style={{ fontSize: 11, color: COLORS.textDim }}>
                      Created {new Date(board.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => onStartGame(board)}
                      style={{ ...primaryBtnStyle, fontSize: 12, padding: "6px 14px" }}
                      disabled={!!game}>
                      🎲 New game
                    </button>
                    {confirmDelete === board.id ? (
                      <div style={{ display: "flex", gap: 4 }}>
                        <button onClick={() => { onDeleteBoard(board.id); setConfirmDelete(null); }}
                          style={{ ...dangerBtnStyle, fontSize: 11, padding: "6px 10px" }}>
                          Yes
                        </button>
                        <button onClick={() => setConfirmDelete(null)}
                          style={{ ...navBtnStyle, fontSize: 11, padding: "6px 10px" }}>
                          No
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => setConfirmDelete(board.id)}
                        style={{ ...navBtnStyle, fontSize: 12, padding: "6px 10px", color: COLORS.danger }}>
                        🗑️
                      </button>
                    )}
                  </div>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {sheets.map(s => (
                    <span key={s.id} style={{
                      fontSize: 11, padding: "3px 8px", borderRadius: 6,
                      background: COLORS.accentGlow, color: COLORS.accent,
                      border: `1px solid ${COLORS.accent}33`
                    }}>
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── New Board View ───
function NewBoardView({ selected, setSelected, onSave, searchQuery, setSearchQuery, existingBoards }) {
  const filtered = ALL_STICKER_SHEETS.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleSheet = (id) => {
    setSelected(prev =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : prev.length < 10 ? [...prev, id] : prev
    );
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 14, letterSpacing: 3, textTransform: "uppercase", color: COLORS.textDim }}>
            Build a Stickerboard
          </h2>
          <div style={{
            fontSize: 24, fontWeight: 700, color: selected.length === 10 ? COLORS.success : COLORS.accent,
            marginTop: 4
          }}>
            {selected.length}/10 <span style={{ fontSize: 13, color: COLORS.textDim, fontWeight: 400 }}>sheets selected</span>
          </div>
        </div>
        <button onClick={() => onSave(selected)}
          disabled={selected.length !== 10}
          style={{
            ...primaryBtnStyle,
            opacity: selected.length === 10 ? 1 : 0.4,
            cursor: selected.length === 10 ? "pointer" : "not-allowed"
          }}>
          Save board ✓
        </button>
      </div>

      <div style={{ marginBottom: 16 }}>
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search sticker sheets..."
          style={{
            width: "100%", boxSizing: "border-box", padding: "10px 14px",
            background: COLORS.card, border: `1px solid ${COLORS.border}`,
            borderRadius: 8, color: COLORS.text, fontFamily: "inherit",
            fontSize: 13, outline: "none"
          }}
        />
      </div>

      {selected.length > 0 && (
        <div style={{
          marginBottom: 16, padding: 12, background: COLORS.card,
          borderRadius: 8, border: `1px solid ${COLORS.border}`
        }}>
          <div style={{ fontSize: 11, color: COLORS.textDim, marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>
            Selected:
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {selected.map(id => {
              const s = ALL_STICKER_SHEETS.find(x => x.id === id);
              return (
                <button key={id} onClick={() => toggleSheet(id)}
                  style={{
                    fontSize: 11, padding: "4px 10px", borderRadius: 6,
                    background: COLORS.accent + "22", color: COLORS.accent,
                    border: `1px solid ${COLORS.accent}55`, cursor: "pointer",
                    fontFamily: "inherit"
                  }}>
                  {s.name} ×
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
        gap: 10
      }}>
        {filtered.map(sheet => {
          const isSelected = selected.includes(sheet.id);
          const isFull = selected.length >= 10 && !isSelected;
          return (
            <button key={sheet.id} onClick={() => !isFull && toggleSheet(sheet.id)}
              style={{
                background: isSelected
                  ? `linear-gradient(135deg, ${COLORS.accentDim}33, ${COLORS.accent}11)`
                  : COLORS.card,
                border: `1px solid ${isSelected ? COLORS.accent + "88" : COLORS.border}`,
                borderRadius: 10, padding: 14, textAlign: "left",
                cursor: isFull ? "not-allowed" : "pointer",
                opacity: isFull ? 0.4 : 1,
                fontFamily: "inherit", color: COLORS.text,
                transition: "all 0.15s",
                outline: "none"
              }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <span style={{ fontSize: 13, fontWeight: 700 }}>#{sheet.id} {sheet.name}</span>
                {isSelected && <span style={{ color: COLORS.success, fontSize: 16 }}>✓</span>}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {sheet.abilityStickers.map((a, i) => (
                  <div key={`a${i}`} style={{
                    display: "flex", alignItems: "stretch", borderRadius: 6, overflow: "hidden",
                    background: COLORS.ability + "10", border: `1px solid ${COLORS.ability}33`
                  }}>
                    <span style={{
                      display: "flex", alignItems: "center", justifyContent: "center",
                      padding: "4px 8px", minWidth: 40,
                      background: COLORS.ability + "22", borderRight: `1px solid ${COLORS.ability}33`,
                      fontSize: 11, fontWeight: 700, color: COLORS.ability
                    }}>
                      {a.cost}🎟️
                    </span>
                    <span style={{ padding: "4px 8px", fontSize: 11, color: COLORS.text, lineHeight: 1.4 }}>
                      {a.text}
                    </span>
                  </div>
                ))}
                <div style={{ display: "flex", gap: 6 }}>
                  {sheet.ptStickers.map((p, i) => (
                    <div key={`p${i}`} style={{
                      display: "flex", alignItems: "center", borderRadius: 6, overflow: "hidden",
                      background: COLORS.pt + "10", border: `1px solid ${COLORS.pt}33`, flex: 1
                    }}>
                      <span style={{
                        display: "flex", alignItems: "center", justifyContent: "center",
                        padding: "4px 8px", minWidth: 40,
                        background: COLORS.pt + "22", borderRight: `1px solid ${COLORS.pt}33`,
                        fontSize: 11, fontWeight: 700, color: COLORS.pt
                      }}>
                        {p.cost}🎟️
                      </span>
                      <span style={{ padding: "4px 8px", fontSize: 13, fontWeight: 700, color: COLORS.pt }}>
                        {p.pt}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Game View ───
function GameView({ game, onToggle, onEnd, setGame }) {
  const [confirmEnd, setConfirmEnd] = useState(false);
  const [expandedSheet, setExpandedSheet] = useState(null);

  const sheets = game.selectedSheetIds.map(id =>
    ALL_STICKER_SHEETS.find(s => s.id === id)
  ).filter(Boolean);

  const totalStickers = sheets.reduce((acc, s) =>
    acc + s.nameStickers.length + s.abilityStickers.length + s.ptStickers.length, 0);
  const usedCount = Object.keys(game.usedStickers).length;

  const isUsed = (sheetId, type, idx) => !!game.usedStickers[`${sheetId}-${type}-${idx}`];

  return (
    <div>
      <div style={{
        background: COLORS.card, borderRadius: 12, padding: 20,
        border: `1px solid ${COLORS.border}`, marginBottom: 20
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ fontSize: 11, color: COLORS.textDim, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>
              Active Game
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.accent }}>
              {game.boardName}
            </div>
            <div style={{ fontSize: 12, color: COLORS.textDim, marginTop: 4 }}>
              {usedCount}/{totalStickers} stickers used · Started {new Date(game.startedAt).toLocaleTimeString()}
            </div>
          </div>
          {confirmEnd ? (
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <span style={{ fontSize: 12, color: COLORS.danger }}>End game?</span>
              <button onClick={onEnd} style={{ ...dangerBtnStyle, fontSize: 12 }}>Yes</button>
              <button onClick={() => setConfirmEnd(false)} style={{ ...navBtnStyle, fontSize: 12 }}>No</button>
            </div>
          ) : (
            <button onClick={() => setConfirmEnd(true)} style={{ ...navBtnStyle, color: COLORS.danger, fontSize: 12 }}>
              End game
            </button>
          )}
        </div>

        <div style={{
          marginTop: 16, display: "flex", alignItems: "center", justifyContent: "center", gap: 4
        }}>
          <span style={{ fontSize: 12, color: COLORS.textDim, marginRight: 8, letterSpacing: 1, textTransform: "uppercase" }}>
            Tickets
          </span>
          <button onClick={() => setGame(prev => ({ ...prev, tickets: (prev.tickets || 0) - 1 }))}
            style={{
              width: 32, height: 32, borderRadius: 6,
              background: COLORS.bg, border: `1px solid ${COLORS.border}`,
              color: COLORS.text, fontSize: 18, fontWeight: 700,
              cursor: "pointer", fontFamily: "inherit",
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>
            −
          </button>
          <div style={{
            minWidth: 48, height: 32, borderRadius: 6,
            background: COLORS.bg, border: `1px solid ${COLORS.accent}55`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18, fontWeight: 700, color: COLORS.accent,
            padding: "0 8px"
          }}>
            {game.tickets || 0}
          </div>
          <button onClick={() => setGame(prev => ({ ...prev, tickets: (prev.tickets || 0) + 1 }))}
            style={{
              width: 32, height: 32, borderRadius: 6,
              background: COLORS.bg, border: `1px solid ${COLORS.border}`,
              color: COLORS.text, fontSize: 18, fontWeight: 700,
              cursor: "pointer", fontFamily: "inherit",
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>
            +
          </button>
          <span style={{ fontSize: 18, marginLeft: 4 }}>🎟️</span>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {sheets.map((sheet, sheetIdx) => {
          const isExpanded = expandedSheet === sheet.id || expandedSheet === null;
          return (
            <div key={sheet.id} style={{
              background: COLORS.card, borderRadius: 12,
              border: `1px solid ${COLORS.border}`,
              overflow: "hidden"
            }}>
              <button onClick={() => setExpandedSheet(expandedSheet === sheet.id ? null : sheet.id)}
                style={{
                  width: "100%", padding: "16px 20px",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  background: "transparent", border: "none", cursor: "pointer",
                  fontFamily: "inherit", color: COLORS.text
                }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{
                    width: 28, height: 28, borderRadius: 8,
                    background: COLORS.accent + "22",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 14, fontWeight: 700, color: COLORS.accent
                  }}>
                    {sheetIdx + 1}
                  </span>
                  <span style={{ fontSize: 14, fontWeight: 700 }}>{sheet.name}</span>
                </div>
                <span style={{ fontSize: 18, color: COLORS.textDim, transition: "transform 0.2s", transform: isExpanded ? "rotate(180deg)" : "none" }}>
                  ▾
                </span>
              </button>

              {isExpanded && (
                <div style={{ padding: "0 20px 20px" }}>
                  <StickerSection title="Name stickers" color={COLORS.name} icon="✏️">
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {sheet.nameStickers.map((name, idx) => (
                        <StickerChip key={idx}
                          label={name}
                          used={isUsed(sheet.id, "name", idx)}
                          color={COLORS.name}
                          onClick={() => onToggle(sheet.id, "name", idx)} />
                      ))}
                    </div>
                  </StickerSection>

                  <StickerSection title="Ability stickers" color={COLORS.ability} icon="⚡">
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {sheet.abilityStickers.map((ability, idx) => (
                        <AbilityChip key={idx}
                          ability={ability}
                          used={isUsed(sheet.id, "ability", idx)}
                          onClick={() => onToggle(sheet.id, "ability", idx, ability.cost)} />
                      ))}
                    </div>
                  </StickerSection>

                  <StickerSection title="Power / Toughness" color={COLORS.pt} icon="💪">
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {sheet.ptStickers.map((pt, idx) => (
                        <PTChip key={idx}
                          pt={pt}
                          used={isUsed(sheet.id, "pt", idx)}
                          onClick={() => onToggle(sheet.id, "pt", idx, pt.cost)} />
                      ))}
                    </div>
                  </StickerSection>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StickerSection({ title, color, icon, children }) {
  return (
    <div style={{ marginTop: 14 }}>
      <div style={{
        fontSize: 10, letterSpacing: 2, textTransform: "uppercase",
        color, marginBottom: 8, display: "flex", alignItems: "center", gap: 6
      }}>
        <span>{icon}</span> {title}
      </div>
      {children}
    </div>
  );
}

function StickerChip({ label, used, color, onClick }) {
  return (
    <button onClick={onClick} style={{
      padding: "8px 14px", borderRadius: 8,
      background: used ? COLORS.used : color + "18",
      border: `1px solid ${used ? COLORS.used : color + "55"}`,
      color: used ? COLORS.usedText : color,
      fontFamily: "inherit", fontSize: 12, fontWeight: 600,
      cursor: "pointer", transition: "all 0.15s",
      textDecoration: used ? "line-through" : "none",
      opacity: used ? 0.6 : 1,
      position: "relative"
    }}>
      {label}
      {used && <span style={{ marginLeft: 6, fontSize: 10 }}>✕</span>}
    </button>
  );
}

function AbilityChip({ ability, used, onClick }) {
  return (
    <button onClick={onClick} style={{
      padding: 0, borderRadius: 8,
      background: used ? COLORS.used : COLORS.ability + "12",
      border: `1px solid ${used ? COLORS.used : COLORS.ability + "44"}`,
      color: used ? COLORS.usedText : COLORS.text,
      fontFamily: "inherit", fontSize: 13,
      cursor: "pointer", transition: "all 0.15s",
      opacity: used ? 0.6 : 1,
      display: "flex", alignItems: "stretch",
      textAlign: "left", width: "100%", overflow: "hidden"
    }}>
      <span style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        gap: 4, padding: "10px 12px", minWidth: 56,
        background: used ? COLORS.used : COLORS.ability + "30",
        borderRight: `1px solid ${used ? COLORS.used : COLORS.ability + "44"}`,
        fontSize: 15, fontWeight: 700,
        color: used ? COLORS.usedText : COLORS.ability
      }}>
        {ability.cost} 🎟️
      </span>
      <span style={{
        padding: "10px 14px", flex: 1,
        display: "flex", alignItems: "center",
        textDecoration: used ? "line-through" : "none"
      }}>
        {ability.text}
      </span>
      {used && <span style={{ padding: "10px 12px", fontSize: 10, color: COLORS.usedText, display: "flex", alignItems: "center" }}>✕</span>}
    </button>
  );
}

function PTChip({ pt, used, onClick }) {
  return (
    <button onClick={onClick} style={{
      padding: 0, borderRadius: 8,
      background: used ? COLORS.used : COLORS.pt + "15",
      border: `1px solid ${used ? COLORS.used : COLORS.pt + "55"}`,
      color: used ? COLORS.usedText : COLORS.pt,
      fontFamily: "inherit",
      cursor: "pointer", transition: "all 0.15s",
      opacity: used ? 0.6 : 1,
      display: "flex", alignItems: "stretch", overflow: "hidden"
    }}>
      <span style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        gap: 4, padding: "10px 12px", minWidth: 56,
        background: used ? COLORS.used : COLORS.pt + "25",
        borderRight: `1px solid ${used ? COLORS.used : COLORS.pt + "44"}`,
        fontSize: 15, fontWeight: 700,
        color: used ? COLORS.usedText : COLORS.pt
      }}>
        {pt.cost} 🎟️
      </span>
      <span style={{
        padding: "10px 16px", fontSize: 18, fontWeight: 700,
        textDecoration: used ? "line-through" : "none",
        display: "flex", alignItems: "center"
      }}>
        {pt.pt}
      </span>
      {used && <span style={{ padding: "10px 8px", fontSize: 10, color: COLORS.usedText, display: "flex", alignItems: "center" }}>✕</span>}
    </button>
  );
}

// ─── Shuffle Animation ───
const SHUFFLE_KEYFRAMES = `
  @keyframes sa-fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes sa-riffle {
    0%   { transform: rotate(0deg)  skewX(0deg);  }
    20%  { transform: rotate(-5deg) skewX(-3deg); }
    40%  { transform: rotate(5deg)  skewX(3deg);  }
    60%  { transform: rotate(-3deg) skewX(-2deg); }
    80%  { transform: rotate(3deg)  skewX(2deg);  }
    100% { transform: rotate(0deg)  skewX(0deg);  }
  }
  @keyframes sa-deal-0 {
    0%   { transform: translate(85px, -125px) scale(0.75); opacity: 0; }
    50%  { transform: translate(40px, -70px)  scale(0.9);  opacity: 1; }
    100% { transform: translate(0, 0)         scale(1);    opacity: 1; }
  }
  @keyframes sa-deal-1 {
    0%   { transform: translate(0px, -125px) scale(0.75); opacity: 0; }
    50%  { transform: translate(0px, -70px)  scale(0.9);  opacity: 1; }
    100% { transform: translate(0, 0)        scale(1);    opacity: 1; }
  }
  @keyframes sa-deal-2 {
    0%   { transform: translate(-85px, -125px) scale(0.75); opacity: 0; }
    50%  { transform: translate(-40px, -70px)  scale(0.9);  opacity: 1; }
    100% { transform: translate(0, 0)          scale(1);    opacity: 1; }
  }
  @keyframes sa-flip-back {
    0%   { transform: scaleX(1); }
    100% { transform: scaleX(0); }
  }
  @keyframes sa-flip-front {
    0%   { transform: scaleX(0); }
    100% { transform: scaleX(1); }
  }
  @keyframes sa-pulse {
    0%, 100% { opacity: 0.6; }
    50%      { opacity: 1;   }
  }
  @keyframes sa-glow {
    0%, 100% { box-shadow: 0 0 10px 2px rgba(192,132,252,0.25); }
    50%      { box-shadow: 0 0 24px 5px rgba(192,132,252,0.65); }
  }
`;

function ShuffleAnimation({ game, onComplete }) {
  const [phase, setPhase] = useState("idle");
  const [dealtCards, setDealtCards] = useState(new Set());
  const [flippedCards, setFlippedCards] = useState(new Set());
  const skipped = useRef(false);

  const sheets = game.selectedSheetIds.map(id =>
    ALL_STICKER_SHEETS.find(s => s.id === id)
  ).filter(Boolean);

  useEffect(() => {
    if (!document.getElementById("shuffle-anim-styles")) {
      const el = document.createElement("style");
      el.id = "shuffle-anim-styles";
      el.textContent = SHUFFLE_KEYFRAMES;
      document.head.appendChild(el);
    }
    return () => document.getElementById("shuffle-anim-styles")?.remove();
  }, []);

  useEffect(() => {
    const timers = [];
    const t = (fn, ms) => timers.push(setTimeout(fn, ms));
    t(() => setPhase("shuffling"), 200);
    t(() => setPhase("dealing"), 1400);
    [0, 1, 2].forEach(i =>
      t(() => setDealtCards(prev => new Set([...prev, i])), 1400 + i * 150)
    );
    t(() => setPhase("flipping"), 2000);
    [0, 1, 2].forEach(i =>
      t(() => setFlippedCards(prev => new Set([...prev, i])), 2000 + i * 200)
    );
    t(() => setPhase("revealed"), 2600);
    t(() => { if (!skipped.current) onComplete(); }, 5600);
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  const skip = useCallback(() => {
    skipped.current = true;
    onComplete();
  }, [onComplete]);

  const CARD_W = 80;
  const CARD_H = 112;
  const STAGE_W = 360;
  const DECK_LEFT = 140;
  const DECK_TOP = 50;
  const DEAL_TOP = 175;
  const DEAL_LEFTS = [55, 140, 225];

  const cardBackBase = {
    position: "absolute", inset: 0, borderRadius: 8,
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 28,
    background: `repeating-linear-gradient(45deg, ${COLORS.accentDim}44 0px, ${COLORS.accentDim}44 1px, transparent 1px, transparent 8px), ${COLORS.card}`,
    border: `1px solid ${COLORS.accent}66`,
  };

  return (
    <div
      onClick={phase === "revealed" ? skip : undefined}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(12,10,20,0.96)",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        animation: "sa-fadeIn 200ms ease-out",
        fontFamily: "'Comic Neue', cursive",
        cursor: phase === "revealed" ? "pointer" : "default",
      }}
    >
      <button
        onClick={e => { e.stopPropagation(); skip(); }}
        style={{ position: "absolute", top: 20, right: 20, ...navBtnStyle, fontSize: 11, padding: "6px 12px" }}
      >
        Skip →
      </button>

      <div style={{
        fontSize: 11, letterSpacing: 2, textTransform: "uppercase",
        color: COLORS.textDim, marginBottom: 24,
      }}>
        {game.boardName}
      </div>

      <div style={{ position: "relative", width: STAGE_W, height: 310 }}>
        {/* Deck */}
        <div style={{
          position: "absolute", left: DECK_LEFT, top: DECK_TOP,
          width: CARD_W, height: CARD_H,
          transformOrigin: "center bottom",
          animation: phase === "shuffling" ? "sa-riffle 300ms ease-in-out 0s 4" : "none",
        }}>
          {Array.from({ length: 6 }, (_, i) => {
            const offset = 5 - i;
            return (
              <div key={i} style={{
                ...cardBackBase,
                transform: `translate(${offset * 1.2}px, ${offset * -1.2}px)`,
                zIndex: i,
                border: `1px solid ${COLORS.accent}${i === 5 ? "77" : "44"}`,
              }}>
                {i === 5 ? "🎪" : null}
              </div>
            );
          })}
        </div>

        {/* Dealt cards */}
        {[0, 1, 2].map(i => {
          if (!dealtCards.has(i)) return null;
          const sheet = sheets[i];
          if (!sheet) return null;
          const isFlipped = flippedCards.has(i);
          const artEmojis = sheet.artStickers.map(s => s.split(" ")[0]);
          return (
            <div key={i} style={{
              position: "absolute",
              left: DEAL_LEFTS[i], top: DEAL_TOP,
              width: CARD_W, height: CARD_H,
              animation: `sa-deal-${i} 400ms ease-out forwards`,
            }}>
              <div style={{
                position: "relative", width: "100%", height: "100%", borderRadius: 8,
                animation: phase === "revealed" ? "sa-glow 1.5s ease-in-out infinite" : "none",
              }}>
                <div style={{
                  ...cardBackBase,
                  animation: isFlipped ? "sa-flip-back 200ms ease-in forwards" : "none",
                }}>🎪</div>
                <div style={{
                  position: "absolute", inset: 0, borderRadius: 8,
                  background: COLORS.card,
                  border: `1px solid ${COLORS.accent}88`,
                  display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center",
                  gap: 5, padding: "8px 6px", textAlign: "center",
                  transform: "scaleX(0)",
                  animation: isFlipped ? "sa-flip-front 200ms ease-out 200ms forwards" : "none",
                }}>
                  <div style={{ display: "flex", gap: 3, fontSize: 16 }}>
                    {artEmojis.map((e, j) => <span key={j}>{e}</span>)}
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.name, lineHeight: 1.3 }}>
                    {sheet.name}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {phase === "revealed" && (
        <div style={{
          marginTop: 24, fontSize: 12, color: COLORS.accent,
          animation: "sa-pulse 1.5s ease-in-out infinite",
          letterSpacing: 1,
        }}>
          Tap to continue →
        </div>
      )}
    </div>
  );
}

// ─── Shared Styles ───
const navBtnStyle = {
  padding: "8px 14px", borderRadius: 8,
  background: COLORS.card, border: `1px solid ${COLORS.border}`,
  color: COLORS.text, fontFamily: "'Comic Neue', cursive",
  fontSize: 12, cursor: "pointer", transition: "all 0.15s"
};

const primaryBtnStyle = {
  padding: "10px 20px", borderRadius: 8,
  background: `linear-gradient(135deg, ${COLORS.accentDim}, ${COLORS.accent})`,
  border: "none", color: "#fff", fontFamily: "'Comic Neue', cursive",
  fontSize: 13, fontWeight: 700, cursor: "pointer",
  letterSpacing: 1, transition: "all 0.15s",
  boxShadow: `0 4px 16px ${COLORS.accent}33`
};

const dangerBtnStyle = {
  ...navBtnStyle,
  background: COLORS.danger + "22",
  borderColor: COLORS.danger + "55",
  color: COLORS.danger
};
