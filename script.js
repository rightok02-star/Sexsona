let state = {
  currentScene: "intro",
  inCombat: false,
  enemy: null,
  playerTurn: true,
  allOutReady: false
};

const $ = (sel) => document.querySelector(sel);

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  const el = document.getElementById(id);
  if (el) el.classList.add("active");
}

function updatePartyStatus() {
  const container = $("#party-status");
  container.innerHTML = STORY.party.map(p => 
    `<div class="party-member">${p.name} ${p.hp}/${p.maxHp}</div>`
  ).join("");
}

function showScene(sceneId) {
  const scene = STORY.scenes[sceneId];
  if (!scene) return;

  state.currentScene = sceneId;

  if (scene.type === "combat") {
    startCombat(scene);
    return;
  }

  if (scene.type === "sex") {
    showSexScene(scene);
    return;
  }

  // Normal scene
  $("#combat-panel").classList.add("hidden");
  showScreen("game-screen");

  $("#scene-image").src = scene.image || "images/ui/background_day.jpg";
  $("#speaker-name").textContent = scene.speaker || "";
  $("#dialogue-text").textContent = scene.text || "";

  const choicesDiv = $("#choices");
  choicesDiv.innerHTML = "";
  $("#btn-next").classList.add("hidden");

  if (scene.choices) {
    scene.choices.forEach(c => {
      const btn = document.createElement("button");
      btn.textContent = c.text;
      btn.onclick = () => {
        if (c.flag) STORY.flags[c.flag] = true;
        showScene(c.next);
      };
      choicesDiv.appendChild(btn);
    });
  } else if (scene.next) {
    $("#btn-next").classList.remove("hidden");
    $("#btn-next").onclick = () => showScene(scene.next);
  }

  updatePartyStatus();
}

function showSexScene(scene) {
  showScreen("sex-overlay");
  $("#sex-image").src = scene.image;
  $("#sex-text").textContent = scene.text;
  $("#btn-sex-continue").onclick = () => {
    if (scene.next) showScene(scene.next);
    else showScene("social_hub");
  };
}

function startCombat(scene) {
  state.inCombat = true;
  state.enemy = { ...scene.enemy };
  state.playerTurn = true;
  state.allOutReady = false;
  state.combatOnWin = scene.onWin;

  showScreen("game-screen");
  $("#combat-panel").classList.remove("hidden");
  $("#scene-image").src = state.enemy.image;
  $("#enemy-info").textContent = `${state.enemy.name}  HP: ${state.enemy.hp}/${state.enemy.maxHp}`;
  $("#combat-log").innerHTML = `A ${state.enemy.name} appears!`;
  renderCombatActions();
}

function renderCombatActions() {
  const actions = $("#combat-actions");
  actions.innerHTML = "";

  if (!state.playerTurn) return;

  const skills = [
    { name: "Attack", type: "phys", power: 25 },
    { name: "Agi (Fire)", type: "fire", power: 35, cost: 8 },
    { name: "Zio (Electric)", type: "electric", power: 35, cost: 8 },
    { name: "Charm", type: "charm", power: 20, cost: 10 },
    { name: "Guard", type: "guard", power: 0 }
  ];

  skills.forEach(sk => {
    const btn = document.createElement("button");
    btn.textContent = sk.name;
    btn.onclick = () => playerAttack(sk);
    actions.appendChild(btn);
  });

  if (state.allOutReady) {
    const ao = document.createElement("button");
    ao.textContent = "ALL-OUT ATTACK";
    ao.style.background = "var(--accent2)";
    ao.onclick = () => allOutAttack();
    actions.appendChild(ao);
  }
}

function playerAttack(skill) {
  if (!state.playerTurn) return;

  let dmg = skill.power + Math.floor(Math.random() * 15);
  let log = `You used ${skill.name}! `;

  if (skill.type === "guard") {
    log += "You brace yourself.";
    $("#combat-log").innerHTML += `<div>${log}</div>`;
    state.playerTurn = false;
    setTimeout(enemyTurn, 800);
    return;
  }

  const weak = state.enemy.weaknesses.includes(skill.type);
  if (weak) {
    dmg = Math.floor(dmg * 1.7);
    log += `WEAKNESS! ${dmg} damage!`;
    state.allOutReady = true;
  } else {
    log += `${dmg} damage.`;
  }

  state.enemy.hp = Math.max(0, state.enemy.hp - dmg);
  $("#enemy-info").textContent = `${state.enemy.name}  HP: ${state.enemy.hp}/${state.enemy.maxHp}`;
  $("#combat-log").innerHTML += `<div>${log}</div>`;

  if (state.enemy.hp <= 0) {
    endCombat(true);
    return;
  }

  state.playerTurn = false;
  renderCombatActions();
  setTimeout(enemyTurn, 900);
}

function enemyTurn() {
  const dmg = 15 + Math.floor(Math.random() * 20);
  // simple: damage the leader
  STORY.party[0].hp = Math.max(0, STORY.party[0].hp - dmg);
  $("#combat-log").innerHTML += `<div>${state.enemy.name} attacks for ${dmg}!</div>`;
  updatePartyStatus();

  if (STORY.party[0].hp <= 0) {
    $("#combat-log").innerHTML += `<div>You were defeated...</div>`;
    setTimeout(() => showScene("social_hub"), 1500);
    return;
  }

  state.playerTurn = true;
  renderCombatActions();
}

function allOutAttack() {
  $("#combat-log").innerHTML += `<div style="color:var(--accent)">ALL-OUT ATTACK!</div>`;
  state.enemy.hp = 0;
  // chance to go to group sex
  if (Math.random() > 0.4) {
    setTimeout(() => showSexScene(STORY.scenes.sex_group_allout), 600);
    // after sex it will need manual continue, so we force win after
    setTimeout(() => endCombat(true), 100);
  } else {
    endCombat(true);
  }
}

function endCombat(won) {
  state.inCombat = false;
  $("#combat-panel").classList.add("hidden");
  if (won) {
    showScene(state.combatOnWin);
  }
}

// ========== INIT ==========
$("#btn-new-game").onclick = () => {
  // reset simple state if needed
  showScene("intro");
};

$("#btn-sex-continue").onclick = () => showScene("social_hub");

// Start
showScreen("title-screen");
