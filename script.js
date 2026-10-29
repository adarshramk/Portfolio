(() => {
  const output = document.getElementById('terminalOutput');
  const form = document.getElementById('terminalForm');
  const input = document.getElementById('terminalInput');
  const clearButton = document.getElementById('clearTerminal');
  const unlocked = document.getElementById('observatoryUnlocked');
  const closeUnlocked = document.getElementById('closeObservatory');
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('mainNav');
  const commands = ['help', 'about', 'projects', 'skills', 'lessons', 'ideas', 'observatory', 'fun', 'credits', 'agent', 'contact', 'clear'];

  const responses = {
    help: `Available commands:\n  about        a quick intro\n  projects     see what I have worked on\n  skills       tools in my backpack\n  lessons      open the lessons log\n  ideas        peek at future possibilities\n  observatory  unlock the Idea Observatory\n  credits      how AI helped with this build\n  agent        how the coding-agent workflow works\n  contact      find the human behind the prompt\n  fun          receive a tiny truth\n  clear        clear this terminal`,
    about: `Adarsh Ram K. IT student at KGiSL Institute of Technology.\nInterested in systems, building useful things, and aspiring toward cloud security.\nPersonal rule: make it useful, then make it feel like yours.`,
    projects: `Current project constellation:\n  PrepMate                     AI-assisted build\n  Thirukkural RAG              collaborative internship\n  Student Project Management   in progress (~60%)\n  AI Traffic Challan Generator basic Django backend\n  Dementia Screening           model training & refinement\nClick a project card above for more context.`,
    skills: `Currently listed:\n  Python · SQL · Linux · AWS · Cybersecurity\n  Docker (learning) · Communication (C1 overall certificate)\nA list of tools is not the same thing as mastery.`,
    lessons: `LESSONS LOG / OPENING...\n1. Understand the system before trying to improve it.\n2. A prototype is a start, not a production-ready product.\n3. Good documentation includes limitations.\n4. Learning out loud is allowed.`,
    ideas: `IDEA ORBIT / POSSIBILITIES, NOT PROMISES\n- Build more hands-on cloud security labs.\n- Improve project documentation and evidence.\n- Explore transparent, human-reviewed AI workflows.\nIdeas can change. That's why they're ideas.`,
    observatory: `Unlocking observatory log...\nThe Idea Observatory is now open below. Explore Lessons, Ideas, and Motto.`,
    fun: `A tiny truth: “still learning” is a status, not a failure. ✳`,
    credits: `BUILD CREDITS / SHARED WITH TRANSPARENCY
AI helped with code and iteration. The foundation — the idea, priorities, personal taste, and final decisions — is mine.
The AI is the coding sidekick. I still have to understand, review, test, and own the result.
Want to ask why something works this way? Try: contact`,
    agent: `CODING AGENT / NOT A MAGIC BADGE
For the AWS challenge, the coding agent is part of the development workflow — not a feature that grants visitors access to AWS.
The planned workflow uses Kiro with the AWS Agent Toolkit: current AWS docs, project-aware guidance, and AWS actions under my signed-in permissions.
I'll mark the connection complete only after I verify it in the local project. No credentials belong in this website.`,
    contact: `Taking you to the human behind the prompt. No chatbot maze, promise. ✳`,
    clear: ''
  };

  function appendLine(text, className = '') {
    const p = document.createElement('p');
    if (className) p.className = className;
    p.textContent = text;
    output.appendChild(p);
    output.scrollTop = output.scrollHeight;
  }

  function runCommand(raw) {
    const command = raw.trim().toLowerCase();
    if (!command) return;
    appendLine(`visitor@observatory:~$ ${raw}`, 'terminal-line');
    if (command === 'clear') {
      output.replaceChildren();
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
    if (responses[command]) {
      appendLine(responses[command], command === 'lessons' || command === 'ideas' ? 'terminal-welcome' : '');
      return;
    }
    if (command === 'sudo hire-me') {
      appendLine('Permission denied: confidence is not a substitute for evidence. Try `projects` instead. 🙂', 'terminal-error');
      return;
    }
    appendLine(`Command not found: ${command}. Try “help” to see what works.`, 'terminal-error');
  }

  document.querySelectorAll('[data-focus-terminal]').forEach((link) => {
    link.addEventListener('click', () => {
      // The native anchor scrolls to the terminal; focus follows after smooth scrolling begins.
      window.setTimeout(() => input.focus({ preventScroll: true }), 450);
    });
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
        const target = command === 'lessons' ? unlocked.querySelectorAll('article')[0] : unlocked.querySelectorAll('article')[1];
        target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  });
  closeUnlocked.addEventListener('click', () => { unlocked.hidden = true; });
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
