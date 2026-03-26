// Real-time clock
function updateClock() {
  const clock = document.getElementById('clock');
  setInterval(() => {
    clock.textContent = new Date().toLocaleTimeString('en-US', {hour:'numeric', minute:'2-digit'});
  }, 1000);
}
updateClock();

// Start menu toggle
function toggleStartMenu() {
  const menu = document.getElementById('start-menu');
  menu.classList.toggle('hidden');
}

// Run dialog
let runDialogVisible = false;
function showRunDialog() {
  document.getElementById('run-dialog').classList.remove('hidden');
  document.getElementById('run-input').focus();
  runDialogVisible = true;
}
function hideRunDialog() {
  document.getElementById('run-dialog').classList.add('hidden');
  runDialogVisible = false;
}

// Execute real .exe via Electron IPC
async function executeRunCommand() {
  const input = document.getElementById('run-input').value.trim();
  if (!input) return;
  
  hideRunDialog();
  
  try {
    const result = await window.electronAPI.runExe(input);
    if (!result.success) {
      alert('Failed to launch: ' + result.error);
    }
  } catch (e) {
    console.error(e);
  }
}

// Handle Enter in start search (also supports running commands)
function handleStartSearch() {
  const searchInput = document.getElementById('start-search').value.trim();
  if (searchInput) {
    toggleStartMenu();
    // Reuse the same run mechanism
    window.electronAPI.runExe(searchInput);
  }
}

// Fake app openers (built-in Windows tools via real run)
function openApp(app) {
  toggleStartMenu(); // close menu if open
  let cmd = '';
  switch(app) {
    case 'notepad': cmd = 'notepad'; break;
    case 'calc': cmd = 'calc'; break;
    case 'cmd': cmd = 'cmd'; break;
    case 'explorer': cmd = 'explorer'; break;
    case 'paint': cmd = 'mspaint'; break;
    default: cmd = app;
  }
  window.electronAPI.runExe(cmd);
}

// Keyboard shortcuts (Win+R style)
document.addEventListener('keydown', (e) => {
  if (e.key === 'r' && e.ctrlKey && e.altKey) { // Ctrl+Alt+R for demo (or map to real Win key if needed)
    e.preventDefault();
    showRunDialog();
  }
  if (e.key === 'Escape' && runDialogVisible) {
    hideRunDialog();
  }
});

// Click desktop to close menus
document.getElementById('desktop').addEventListener('click', (e) => {
  if (e.target.id === 'desktop') {
    document.getElementById('start-menu').classList.add('hidden');
  }
});