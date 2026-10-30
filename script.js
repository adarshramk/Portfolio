(() => {
  const output = document.getElementById('terminalOutput');
  const form = document.getElementById('terminalForm');
  const input = document.getElementById('terminalInput');
  const suggestions = document.getElementById('commandSuggestions');
  const clearButton = document.getElementById('clearTerminal');
  const unlocked = document.getElementById('observatoryUnlocked');
  const closeUnlocked = document.getElementById('closeObservatory');
  const missionPanel = document.getElementById('curiosityPanel');
  const closeMission = document.getElementById('closeCuriosity');
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('mainNav');

  const commandData = [
    ['help', 'show available commands'], ['about', 'a quick intro'], ['projects', 'see project stories'],
    ['skills', 'tools in my backpack'], ['lessons', 'open the lessons log'], ['ideas', 'peek at future possibilities'],
    ['observatory', 'open the Idea Observatory'], ['fun', 'receive a tiny truth'], ['credits', 'how AI helped with this build'],
    ['agent', 'how the coding-agent workflow works'], ['contact', 'find the human behind the prompt'], ['clear', 'clear this terminal'],
    ['neofetch', 'portfolio system summary'], ['history', 'show this session’s commands'], ['progress', 'view learning areas'],
    ['explore', 'begin Project Curiosity'], ['coffee', 'take a tiny break'], ['42', 'the answer to a good question'],
    ['sudo hire adarsh', 'a harmless hiring simulation'], ['sudo hire-me', 'legacy hiring simulation'], ['secret', 'a small developer secret'], ['systems', 'answer the Project Curiosity clue']
  ];
  const commandNames = commandData.map(([name]) => name);
  const history = [];
  let historyCursor = 0;
  let selectedSuggestion = -1;
  let projectVisited = false;
  let missionStarted = false;

  const responses = {
    help: `Available commands:\n${commandData.map(([name, description]) => `  ${name.padEnd(17)} ${description}`).join('\n')}`,
    about: `Adarsh Ram K. IT student at KGiSL Institute of Technology.\nInterested in systems, building useful things, and aspiring toward cloud security.\nPersonal rule: make it useful, then make it feel like yours.`,
    projects: `Current project constellation:\n  PrepMate                     AI-assisted build\n  Thirukkural RAG              collaborative internship\n  Student Project Management   in progress (~60%)\n  AI Traffic Challan Generator basic Django backend\n  Dementia Screening           model training & refinement\nClick a project card above for more context.`,
    skills: `Currently listed:\n  Python · SQL · Linux · AWS · Cybersecurity\n  Docker (learning) · Communication (C1 overall certificate)\nA list of tools is not the same thing as mastery.`,
    lessons: `LESSONS LOG\n1. Understand the system before trying to improve it.\n2. A prototype is a start, not a production-ready product.\n3. Good documentation includes limitations.\n4. Learning out loud is allowed.`,
    ideas: `IDEA ORBIT / POSSIBILITIES, NOT PROMISES\n- Build more hands-on cloud security labs.\n- Improve project documentation and evidence.\n- Explore transparent, human-reviewed AI workflows.\nIdeas can change. That's why they're ideas.`,
    observatory: `The Idea Observatory is now open below. Explore Lessons, Ideas, and Motto.`,
    fun: `A tiny truth: “still learning” is a status, not a failure. ✳`,
    credits: `BUILD CREDITS / SHARED WITH TRANSPARENCY\nAI helped with code and iteration. The foundation — the idea, priorities, personal taste, and final decisions — is mine.\nThe AI is the coding sidekick. I still have to understand, review, test, and own the result.\nWant to ask why something works this way? Try: contact`,
    agent: `CODING AGENT / NOT A MAGIC BADGE\nFor the AWS challenge, the coding agent is part of the development workflow — not a feature that grants visitors access to AWS.\nThe planned workflow uses Kiro with the AWS Agent Toolkit: current AWS docs, project-aware guidance, and AWS actions under my signed-in permissions.\nI'll mark the connection complete only after I verify it in the local project. No credentials belong in this website.`,
    contact: `Taking you to the human behind the prompt. No chatbot maze, promise. ✳`,
    neofetch: `       .---.       Adarsh Ram K\n      /     \\      Role       IT Student\n     |  .-.  |     Aspiration Cloud Security Engineer\n     |  | |  |     Education  B.Tech Information Technology\n      \\  '-' /      Tech       Python · SQL · Linux · AWS · Docker\n       '---'       Environment Curiosity OS\n                    Mission    Learning, experimenting and building.`,
    progress: `LEARNING MAP\n\nLEARNED / PRACTICED\n[✓] Python   [✓] SQL   [✓] Linux fundamentals\n[✓] Basic AWS   [✓] Django\n\nCURRENTLY EXPLORING\n[~] AWS cloud services   [~] Cloud security\n[~] Docker   [~] Networking\n\nFUTURE EXPLORATIONS\n[ ] Advanced cloud security\n[ ] Infrastructure as Code   [ ] Security automation\n\nA map of topics, not scores or certifications.`,
    coffee: `Coffee break approved ☕\nBack to the keyboard when the idea is ready.`,
    '42': `42: a fine answer, and an excellent reminder to stay curious about the question. ✳`,
    'sudo hire adarsh': `Simulated sudo: no privileges requested or changed.\nHiring signal received! I’ll bring curiosity, projects, and a willingness to learn. 🙂`,
    'sudo hire-me': `Permission denied: confidence is not a substitute for evidence. Try projects instead. 🙂`,
    secret: `Developer secret: the best debugging tool is often a smaller question.\nAlso, a snack break can count as a systems restart.`,
    explore: `PROJECT CURIOSITY / STEP 1 OF 2\nFirst clue: look beneath the surface of the projects. Visit the Projects section and find the field note there.\nWhen you return, enter the idea that connects each project to how it works.`,
    systems: `PROJECT CURIOSITY / ${projectVisited ? 'MISSION COMPLETE' : 'ONE MORE STEP'}\n${projectVisited ? 'You followed the clues and found the idea beneath the projects.' : 'Good thought. Visit the Projects section to find its field note, then come back and try again.'}`
  };

  function appendLine(text, className = '') {
    const p = document.createElement('p');
    if (className) p.className = className;
    p.textContent = text;
    output.appendChild(p);
    output.scrollTop = output.scrollHeight;
  }

  function closeSuggestions() {
    suggestions.hidden = true;
    suggestions.replaceChildren();
    input.removeAttribute('aria-activedescendant');
    input.setAttribute('aria-expanded', 'false');
    selectedSuggestion = -1;
  }

  function updateSuggestions() {
    const query = input.value.trim().toLowerCase();
    if (!query) return closeSuggestions();
    const matches = commandNames.filter((name) => name.startsWith(query));
    suggestions.replaceChildren();
    selectedSuggestion = -1;
    if (!matches.length) return closeSuggestions();
    matches.slice(0, 7).forEach((name, index) => {
      const item = document.createElement('li');
      item.id = `command-suggestion-${index}`;
      item.setAttribute('role', 'option');
      item.setAttribute('aria-selected', 'false');
      item.dataset.command = name;
      item.textContent = name;
      const description = commandData.find(([candidate]) => candidate === name)?.[1];
      const detail = document.createElement('span');
      detail.textContent = description || '';
      item.appendChild(detail);
      item.addEventListener('mousedown', (event) => event.preventDefault());
      item.addEventListener('click', () => { input.value = name; closeSuggestions(); runCommand(name); input.focus(); });
      suggestions.appendChild(item);
    });
    suggestions.hidden = false;
    input.setAttribute('aria-expanded', 'true');
  }

  function selectSuggestion(next) {
    const items = [...suggestions.querySelectorAll('[role="option"]')];
    if (!items.length) return false;
    selectedSuggestion = (selectedSuggestion + next + items.length) % items.length;
    items.forEach((item, index) => item.setAttribute('aria-selected', String(index === selectedSuggestion)));
    input.setAttribute('aria-activedescendant', items[selectedSuggestion].id);
    return true;
  }

  function nearestCommands(query) {
    const first = query.split(/\s+/)[0];
    const candidates = commandNames.map((name) => {
      const target = name.split(/\s+/)[0];
      let row = Array.from({ length: target.length + 1 }, (_, index) => index);
      for (let i = 1; i <= first.length; i += 1) {
        const next = [i];
        for (let j = 1; j <= target.length; j += 1) next[j] = Math.min(next[j - 1] + 1, row[j] + 1, row[j - 1] + (first[i - 1] === target[j - 1] ? 0 : 1));
        row = next;
      }
      return { name, distance: row[target.length] };
    }).sort((a, b) => a.distance - b.distance);
    return candidates.slice(0, 3).map(({ name }) => name).join(', ');
  }

  function runCommand(raw) {
    const cleaned = raw.trim();
    if (!cleaned) return;
    const command = cleaned.toLowerCase();
    closeSuggestions();
    appendLine(`visitor@observatory:~$ ${cleaned}`, 'terminal-line');
    if (command !== 'history') history.push(cleaned);
    historyCursor = history.length;
    if (command === 'clear') { output.replaceChildren(); return; }
    if (command === 'history') {
      appendLine(history.length ? history.map((item, index) => `${String(index + 1).padStart(2, ' ')}  ${item}`).join('\n') : 'No commands in this session yet.');
      return;
    }
    if (command === 'contact') {
      appendLine(responses.contact, 'terminal-welcome');
      document.getElementById('contact').scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    if (command === 'observatory') {
      unlocked.hidden = false;
      appendLine(responses.observatory, 'terminal-welcome');
      unlocked.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      return;
    }
    if (command === 'systems' && projectVisited && missionStarted) {
      appendLine(responses.systems, 'terminal-welcome');
      missionPanel.hidden = false;
      missionPanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    if (command === 'explore') missionStarted = true;
    if (command === 'systems' && !missionStarted) {
      appendLine('No active mission yet. Try `explore` to find the first clue.', 'terminal-error');
      return;
    }
    if (responses[command]) {
      appendLine(responses[command], ['lessons', 'ideas', 'progress', 'neofetch'].includes(command) ? 'terminal-welcome' : '');
      return;
    }
    appendLine(`Command not found: ${command}. Did you mean: ${nearestCommands(command)}? Try “help” for all commands.`, 'terminal-error');
  }

  input.addEventListener('input', () => { historyCursor = history.length; updateSuggestions(); });
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') { closeSuggestions(); return; }
    if (event.key === 'Tab') {
      const items = [...suggestions.querySelectorAll('[role="option"]')];
      const choice = selectedSuggestion >= 0 ? items[selectedSuggestion]?.dataset.command : items[0]?.dataset.command;
      if (choice) { event.preventDefault(); input.value = choice; closeSuggestions(); }
      return;
    }
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      if (!suggestions.hidden && suggestions.children.length) {
        event.preventDefault(); selectSuggestion(event.key === 'ArrowDown' ? 1 : -1);
      } else if (history.length && (event.key === 'ArrowUp' ? historyCursor > 0 : historyCursor < history.length)) {
        event.preventDefault();
        historyCursor = Math.max(0, Math.min(history.length, historyCursor + (event.key === 'ArrowUp' ? -1 : 1)));
        input.value = historyCursor === history.length ? '' : history[historyCursor];
      }
    }
    if (event.key === 'Enter' && selectedSuggestion >= 0) {
      const choice = suggestions.querySelectorAll('[role="option"]')[selectedSuggestion]?.dataset.command;
      if (choice) { event.preventDefault(); input.value = choice; form.requestSubmit(); }
    }
  });
  document.querySelectorAll('[data-focus-terminal]').forEach((link) => {
    link.addEventListener('click', () => window.setTimeout(() => input.focus({ preventScroll: true }), 450));
  });
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const command = input.value;
    input.value = '';
    runCommand(command);
  });
  clearButton.addEventListener('click', () => {
    output.replaceChildren();
    appendLine('Terminal cleared. The curiosity remains.', 'terminal-welcome');
    input.focus();
  });
  document.querySelectorAll('[data-command]').forEach((button) => {
    button.addEventListener('click', () => {
      const command = button.dataset.command;
      runCommand(command);
      if (command === 'lessons' || command === 'ideas') {
        unlocked.hidden = false;
        unlocked.querySelectorAll('article')[command === 'lessons' ? 0 : 1].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  });
  closeUnlocked.addEventListener('click', () => { unlocked.hidden = true; });
  closeMission.addEventListener('click', () => { missionPanel.hidden = true; input.focus(); });
  const projectSection = document.getElementById('projects');
  const projectObserver = new IntersectionObserver((entries) => {
    if (missionStarted && entries.some((entry) => entry.isIntersecting)) projectVisited = true;
  }, { threshold: 0.08 });
  projectObserver.observe(projectSection);
  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }));
  document.getElementById('year').textContent = new Date().getFullYear();
})();
