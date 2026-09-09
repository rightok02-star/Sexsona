const STORY = {
  party: [
    { id: "you", name: "You", hp: 120, maxHp: 120, sp: 40, maxSp: 40 },
    { id: "annika", name: "Annika", hp: 100, maxHp: 100, sp: 35, maxSp: 35 },
    { id: "rina", name: "Rina", hp: 95, maxHp: 95, sp: 50, maxSp: 50 },
    { id: "leo", name: "Leo", hp: 130, maxHp: 130, sp: 25, maxSp: 25 },
    { id: "soren", name: "Soren", hp: 90, maxHp: 90, sp: 45, maxSp: 45 },
    { id: "yuna", name: "Yuna", hp: 110, maxHp: 110, sp: 40, maxSp: 40 }
  ],

  // Social Link ranks (0-10)
  social: {
    annika: 0,
    rina: 0,
    leo: 0,
    soren: 0,
    yuna: 0
  },

  flags: {},

  // ========== SCENES ==========
  scenes: {
    intro: {
      image: "images/ui/background_day.jpg",
      speaker: "",
      text: "A new semester at the private university. You transferred here under... unusual circumstances.\n\nAt night, the Metaverse still calls.",
      next: "meet_party"
    },

    meet_party: {
      image: "images/ui/background_night.jpg",
      speaker: "Annika",
      text: "There you are. Ready to steal another heart tonight?",
      choices: [
        { text: "Always.", next: "palace1_start" },
        { text: "Let's check on everyone first.", next: "social_hub" }
      ]
    },

    social_hub: {
      image: "images/ui/background_day.jpg",
      speaker: "",
      text: "Who do you want to spend time with?",
      choices: [
        { text: "Annika", next: "sl_annika_1" },
        { text: "Rina", next: "sl_rina_1" },
        { text: "Leo", next: "sl_leo_1" },
        { text: "Soren", next: "sl_soren_1" },
        { text: "Yuna", next: "sl_yuna_1" },
        { text: "Head to the Palace", next: "palace1_start" }
      ]
    },

    // --- Social Links (short versions that can lead to sex) ---
    sl_annika_1: {
      image: "images/party/annika.png",
      speaker: "Annika",
      text: "You know, ever since you joined us... I can't stop thinking about certain things.",
      choices: [
        { text: "Tell me more.", next: "sex_annika_1", flag: "annika_sex1" },
        { text: "We should focus on the mission.", next: "social_hub" }
      ]
    },

    sl_rina_1: {
      image: "images/party/rina.png",
      speaker: "Rina",
      text: "I've been analyzing our combat data. Your performance is... impressive. Stay after the meeting.",
      choices: [
        { text: "Yes, ma'am.", next: "sex_rina_dom", flag: "rina_sex1" },
        { text: "Another time.", next: "social_hub" }
      ]
    },

    sl_leo_1: {
      image: "images/party/leo.png",
      speaker: "Leo",
      text: "Hey. You've been staring. You want me to take the lead tonight... or the other way around?",
      choices: [
        { text: "You take control.", next: "sex_leo_dom", flag: "leo_dom" },
        { text: "I want you under me.", next: "sex_leo_sub", flag: "leo_sub" },
        { text: "Maybe later.", next: "social_hub" }
      ]
    },

    sl_soren_1: {
      image: "images/party/soren.png",
      speaker: "Soren",
      text: "The way you look at me sometimes... it's different. Soft. I don't mind it.",
      choices: [
        { text: "Come closer.", next: "sex_soren_femboy", flag: "soren_sex1" },
        { text: "Not yet.", next: "social_hub" }
      ]
    },

    sl_yuna_1: {
      image: "images/party/yuna.png",
      speaker: "Yuna",
      text: "You've been working so hard. Let me take care of you tonight... properly.",
      choices: [
        { text: "Please.", next: "sex_yuna_1", flag: "yuna_sex1" },
        { text: "I should rest alone.", next: "social_hub" }
      ]
    },

    // --- Palace 1 ---
    palace1_start: {
      image: "images/palace1/entrance.jpg",
      speaker: "",
      text: "The Professor's Palace. Distorted lecture halls stretch into infinity. Shadows of failed students wander the corridors.",
      next: "palace1_combat1"
    },

    palace1_combat1: {
      type: "combat",
      enemy: {
        name: "Shadow Student",
        hp: 80,
        maxHp: 80,
        weaknesses: ["fire", "charm"],
        image: "images/palace1/shadow1.jpg"
      },
      onWin: "palace1_after1"
    },

    palace1_after1: {
      image: "images/palace1/corridor.jpg",
      speaker: "Rina",
      text: "One down. The treasure is deeper in. Stay sharp.",
      next: "palace1_combat2"
    },

    palace1_combat2: {
      type: "combat",
      enemy: {
        name: "Shadow Proctor",
        hp: 120,
        maxHp: 120,
        weaknesses: ["electric", "charm"],
        image: "images/palace1/shadow2.jpg"
      },
      onWin: "palace1_boss_intro"
    },

    palace1_boss_intro: {
      image: "images/palace1/boss.jpg",
      speaker: "Professor",
      text: "You think you can steal my control? These students belong to me!",
      next: "palace1_boss"
    },

    palace1_boss: {
      type: "combat",
      enemy: {
        name: "Shadow Professor",
        hp: 220,
        maxHp: 220,
        weaknesses: ["curse", "charm"],
        image: "images/palace1/boss.jpg",
        downImage: "images/palace1/boss_down.jpg"
      },
      onWin: "palace1_boss_sex"
    },

    palace1_boss_sex: {
      type: "sex",
      image: "images/sex/boss1_sex.jpg",
      text: "The distorted professor collapses. The Palace begins to crumble... but not before the group 'changes his heart' in a much more personal way.",
      next: "palace1_clear"
    },

    palace1_clear: {
      image: "images/ui/background_night.jpg",
      speaker: "Annika",
      text: "Another heart stolen. You were incredible in there.\n\nTomorrow we hit the Heiress's Palace.",
      next: "palace2_start"
    },

    // --- Palace 2 ---
    palace2_start: {
      image: "images/palace2/entrance.jpg",
      speaker: "",
      text: "The Heiress's Palace. Endless gold, velvet, and the scent of excess. Every corridor feels like a private club.",
      next: "palace2_combat1"
    },

    palace2_combat1: {
      type: "combat",
      enemy: {
        name: "Shadow Butler",
        hp: 100,
        maxHp: 100,
        weaknesses: ["ice", "charm"],
        image: "images/palace2/shadow1.jpg"
      },
      onWin: "palace2_after1"
    },

    palace2_after1: {
      image: "images/palace2/hall.jpg",
      speaker: "Soren",
      text: "This place is beautiful... and disgusting. Let's finish it.",
      next: "palace2_boss_intro"
    },

    palace2_boss_intro: {
      image: "images/palace2/boss.jpg",
      speaker: "Heiress",
      text: "You little thieves think you can take what's mine? Everything—and everyone—in this city is for sale.",
      next: "palace2_boss"
    },

    palace2_boss: {
      type: "combat",
      enemy: {
        name: "Shadow Heiress",
        hp: 260,
        maxHp: 260,
        weaknesses: ["bless", "charm"],
        image: "images/palace2/boss.jpg",
        downImage: "images/palace2/boss_down.jpg"
      },
      onWin: "palace2_boss_sex"
    },

    palace2_boss_sex: {
      type: "sex",
      image: "images/sex/boss2_sex.jpg",
      text: "The Heiress falls. The Palace shudders. What follows is less 'rehabilitation' and more thorough conquest.",
      next: "ending_temp"
    },

    ending_temp: {
      image: "images/ui/background_night.jpg",
      speaker: "",
      text: "Two Palaces cleared.\n\nThe night is still young... and the rest of the party is waiting.\n\n(End of current build – more content can be added easily)",
      choices: [
        { text: "Return to Social Hub", next: "social_hub" },
        { text: "Title Screen", next: "title" }
      ]
    },

    // --- Sex scenes ---
    sex_annika_1: {
      type: "sex",
      image: "images/sex/annika_1.jpg",
      text: "Annika doesn't waste time. Clothes hit the floor. She pushes you down with a hungry smile.",
      next: "social_hub"
    },
    sex_annika_futa: {
      type: "sex",
      image: "images/sex/annika_futa.jpg",
      text: "Annika reveals more than expected. She grins. \"Surprise.\"",
      next: "social_hub"
    },
    sex_rina_dom: {
      type: "sex",
      image: "images/sex/rina_dom.jpg",
      text: "Rina locks the door. \"On your knees. I won't repeat myself.\"",
      next: "social_hub"
    },
    sex_leo_dom: {
      type: "sex",
      image: "images/sex/leo_dom.jpg",
      text: "Leo pins you easily. \"My turn to lead.\"",
      next: "social_hub"
    },
    sex_leo_sub: {
      type: "sex",
      image: "images/sex/leo_sub.jpg",
      text: "Leo's usual energy turns soft and needy under you.",
      next: "social_hub"
    },
    sex_soren_femboy: {
      type: "sex",
      image: "images/sex/soren_femboy.jpg",
      text: "Soren looks up at you through long lashes, already half-undressed and waiting.",
      next: "social_hub"
    },
    sex_yuna_1: {
      type: "sex",
      image: "images/sex/yuna_1.jpg",
      text: "Yuna's hands are gentle but insistent. She takes her time with you.",
      next: "social_hub"
    },
    sex_yuna_futa: {
      type: "sex",
      image: "images/sex/yuna_futa.jpg",
      text: "Yuna blushes even as she shows you what she's been hiding.",
      next: "social_hub"
    },
    sex_group_allout: {
      type: "sex",
      image: "images/sex/group_allout.jpg",
      text: "The All-Out Attack turns into something far more personal. Everyone is involved.",
      next: null // returns to previous flow
    }
  }
};
