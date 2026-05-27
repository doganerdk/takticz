@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Rajdhani:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --grass-dark: #1a4a1a;
  --grass-mid: #1e5c1e;
  --grass-light: #22682a;
  --pitch-line: rgba(255,255,255,0.6);
  --ui-bg: #0d1117;
  --ui-panel: #161b22;
  --ui-border: #30363d;
  --ui-hover: #21262d;
  --accent: #00ff87;
  --accent-dim: rgba(0,255,135,0.15);
  --text-primary: #f0f6fc;
  --text-secondary: #8b949e;
  --gold: #f0b429;
  --red: #ff4444;
}

* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { height: 100%; overflow: hidden; }
body {
  font-family: 'Inter', sans-serif;
  background: var(--ui-bg);
  color: var(--text-primary);
}

/* Grass stripes */
.pitch-bg {
  background: repeating-linear-gradient(
    0deg,
    var(--grass-dark) 0px,
    var(--grass-dark) 40px,
    var(--grass-mid) 40px,
    var(--grass-mid) 80px
  );
}

/* Custom scrollbar */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: var(--ui-bg); }
::-webkit-scrollbar-thumb { background: var(--ui-border); border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: #484f58; }

.player-token {
  cursor: grab;
  user-select: none;
  transition: transform 0.15s ease, filter 0.15s ease;
}
.player-token:hover { transform: scale(1.08); filter: drop-shadow(0 4px 12px rgba(0,255,135,0.4)); }
.player-token:active { cursor: grabbing; }

.dragging { opacity: 0.5; transform: scale(1.1); }

@keyframes pitch-in {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-pitch-in { animation: pitch-in 0.5s ease forwards; }

@keyframes pulse-green {
  0%, 100% { box-shadow: 0 0 0 0 rgba(0,255,135,0.4); }
  50% { box-shadow: 0 0 0 8px rgba(0,255,135,0); }
}
.pulse-green { animation: pulse-green 2s infinite; }
