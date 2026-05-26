'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { FORMATIONS, FormationPosition } from './data/players';

/* ═══════════════════════════════════════════════════════
   TYPES
═══════════════════════════════════════════════════════ */
type PosType = 'GK' | 'DEF' | 'MID' | 'FWD';
type DrawTool = 'none' | 'arrow' | 'zone' | 'freehand';
type ArrowStyle = 'attack' | 'defense' | 'pass' | 'press';
type KitPattern = 'solid' | 'stripes' | 'hoops' | 'halves' | 'diagonal';

interface SlotData {
  name: string;
  pos: PosType;
  number: string;
  kitColor: string;
  kitPattern: KitPattern;
  note: string;
}

interface DrawnArrow {
  id: string;
  x1: number; y1: number;
  x2: number; y2: number;
  style: ArrowStyle;
}

interface DrawnZone {
  id: string;
  x: number; y: number;
  w: number; h: number;
  label: string;
  color: string;
}

interface DrawnPath {
  id: string;
  points: [number, number][];
  color: string;
}

interface SavedPlan {
  id: string;
  name: string;
  formation: string;
  teamName: string;
  lineup: Record<string, SlotData>;
  arrows: DrawnArrow[];
  zones: DrawnZone[];
  paths: DrawnPath[];
  kitColor: string;
  kitPattern: KitPattern;
  savedAt: string;
}

/* ═══════════════════════════════════════════════════════
   CONSTANTS
═══════════════════════════════════════════════════════ */
const POSITION_COLORS: Record<PosType, { bg: string; text: string }> = {
  GK:  { bg: '#f5c518', text: '#000' },
  DEF: { bg: '#2563eb', text: '#fff' },
  MID: { bg: '#16a34a', text: '#fff' },
  FWD: { bg: '#dc2626', text: '#fff' },
};

const ARROW_STYLES: Record<ArrowStyle, { color: string; dash: string; label: string; emoji: string }> = {
  attack:  { color: '#ff4444', dash: 'none',    label: 'Hücum',    emoji: '⚔️' },
  defense: { color: '#2563eb', dash: '6,3',     label: 'Savunma',  emoji: '🛡️' },
  pass:    { color: '#00ff87', dash: 'none',     label: 'Pas',      emoji: '↗️' },
  press:   { color: '#f59e0b', dash: '4,4',     label: 'Pressing', emoji: '⚡' },
};

const ZONE_COLORS = ['#ff444433', '#2563eb33', '#00ff8733', '#f59e0b33', '#a855f733'];
const ZONE_LABELS = ['Pressing Bölgesi', 'Savunma Bloğu', 'Hücum Üçgeni', 'Orta Alan', 'Özel Bölge'];

const SLOT_DEFAULT_POS: Record<string, PosType> = {
  GK:'GK', LB:'DEF', RB:'DEF', CB1:'DEF', CB2:'DEF', CB3:'DEF',
  LCB:'DEF', RCB:'DEF', CB:'DEF', LWB:'DEF', RWB:'DEF',
  LM:'MID', RM:'MID', LCM:'MID', RCM:'MID', CM:'MID',
  DM:'MID', LDM:'MID', RDM:'MID', CAM:'MID', LAM:'MID', RAM:'MID',
  LW:'FWD', RW:'FWD', ST:'FWD', LST:'FWD', RST:'FWD',
};

const KIT_PATTERNS: Record<KitPattern, string> = {
  solid:    'Düz',
  stripes:  'Dikey Çizgili',
  hoops:    'Yatay Çizgili',
  halves:   'İki Renk',
  diagonal: 'Diyagonal',
};

/* ═══════════════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════════════ */
function uid() { return Math.random().toString(36).slice(2, 9); }
function getInitials(name: string) {
  return name.trim().split(/\s+/).map((w: string) => w[0]).join('').slice(0, 2).toUpperCase();
}

function KitCircle({ color, pattern, size = 60, initials, number, textColor }:
  { color: string; pattern: KitPattern; size: number; initials: string; number?: string; textColor: string }) {
  const r = size / 2;
  const secondary = textColor === '#fff' ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.15)';

  const patternEl = () => {
    if (pattern === 'stripes') return (
      <>
        <rect x={r * 0.35} y="0" width={r * 0.28} height={size} fill={secondary} />
        <rect x={r * 0.85} y="0" width={r * 0.28} height={size} fill={secondary} />
        <rect x={r * 1.35} y="0" width={r * 0.28} height={size} fill={secondary} />
      </>
    );
    if (pattern === 'hoops') return (
      <>
        <rect x="0" y={r * 0.35} width={size} height={r * 0.25} fill={secondary} />
        <rect x="0" y={r * 0.85} width={size} height={r * 0.25} fill={secondary} />
        <rect x="0" y={r * 1.35} width={size} height={r * 0.25} fill={secondary} />
      </>
    );
    if (pattern === 'halves') return <rect x={r} y="0" width={r} height={size} fill={secondary} />;
    if (pattern === 'diagonal') return <polygon points={`${size},0 ${size},${size} 0,${size}`} fill={secondary} />;
    return null;
  };

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: 'block', flexShrink: 0 }}>
      <clipPath id={`clip-${initials}-${size}`}>
        <circle cx={r} cy={r} r={r} />
      </clipPath>
      <circle cx={r} cy={r} r={r} fill={color} />
      <g clipPath={`url(#clip-${initials}-${size})`}>{patternEl()}</g>
      <circle cx={r} cy={r} r={r} fill="none" stroke={textColor === '#fff' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)'} strokeWidth="2" />
      {number && <text x={r} y={r - 4} textAnchor="middle" fontSize={size * 0.18} fontWeight="800" fill={textColor} opacity="0.7" fontFamily="Inter,sans-serif">{`#${number}`}</text>}
      <text x={r} y={number ? r + size * 0.16 : r + size * 0.09} textAnchor="middle" fontSize={size * (initials.length > 1 ? 0.24 : 0.28)} fontWeight="800" fill={textColor} fontFamily="Inter,sans-serif">{initials}</text>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════
   EDIT MODAL
═══════════════════════════════════════════════════════ */
function EditModal({ slotLabel, initial, onSave, onClose }: {
  slotLabel: string; initial: SlotData;
  onSave: (d: SlotData) => void; onClose: () => void;
}) {
  const [name, setName] = useState(initial.name);
  const [pos, setPos] = useState<PosType>(initial.pos);
  const [number, setNumber] = useState(initial.number);
  const [kitColor, setKitColor] = useState(initial.kitColor);
  const [kitPattern, setKitPattern] = useState<KitPattern>(initial.kitPattern);
  const [note, setNote] = useState(initial.note || '');

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [onClose]);

  const textColor = ['#ffffff', '#f5c518', '#fbbf24', '#a3e635', '#34d399', '#e2e8f0'].includes(kitColor) ? '#000' : '#fff';
  const previewInitials = name.trim() ? getInitials(name) : slotLabel;

  const KIT_COLORS = [
    '#dc2626','#ea580c','#f59e0b','#16a34a','#2563eb','#7c3aed',
    '#db2777','#0891b2','#111827','#ffffff','#6b7280','#f5c518',
  ];

  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.7)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:200, backdropFilter:'blur(5px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{ background:'#161b22', border:'1px solid #30363d', borderRadius:14, padding:24, width:340, maxHeight:'90vh', overflowY:'auto', boxShadow:'0 24px 64px rgba(0,0,0,0.7)' }}>
        
        {/* Header */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:18 }}>
          <div>
            <div style={{ fontSize:16, fontWeight:800, color:'#f0f6fc' }}>Oyuncu Düzenle</div>
            <div style={{ fontSize:11, color:'#8b949e' }}>Pozisyon: <span style={{ color:'#00ff87', fontWeight:700 }}>{slotLabel}</span></div>
          </div>
          <button onClick={onClose} style={{ background:'#21262d', border:'none', color:'#8b949e', width:28, height:28, borderRadius:6, cursor:'pointer', fontSize:16 }}>×</button>
        </div>

        {/* Preview */}
        <div style={{ display:'flex', alignItems:'center', gap:12, background:'#21262d', borderRadius:10, padding:'12px 14px', marginBottom:18, border:'1px solid #30363d' }}>
          <KitCircle color={kitColor} pattern={kitPattern} size={52} initials={previewInitials} number={number} textColor={textColor} />
          <div>
            <div style={{ fontSize:14, fontWeight:700, color:'#f0f6fc' }}>{name.trim() || '—'}</div>
            <div style={{ fontSize:11, color:'#8b949e' }}>{pos}{number ? ` · #${number}` : ''}</div>
            <div style={{ fontSize:10, color:'#8b949e', marginTop:2 }}>{KIT_PATTERNS[kitPattern]}</div>
          </div>
        </div>

        {/* Name */}
        <label style={{ fontSize:10, color:'#8b949e', fontWeight:700, display:'block', marginBottom:5 }}>OYUNCU ADI *</label>
        <input autoFocus value={name} onChange={e => setName(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && name.trim()) onSave({ name: name.trim(), pos, number, kitColor, kitPattern, note }); }}
          placeholder="Örn. Ahmet Çelik"
          style={{ width:'100%', background:'#21262d', border:'1px solid #30363d', borderRadius:7, padding:'9px 12px', color:'#f0f6fc', fontSize:13, fontWeight:600, outline:'none', boxSizing:'border-box', marginBottom:12 }} />

        {/* Number */}
        <label style={{ fontSize:10, color:'#8b949e', fontWeight:700, display:'block', marginBottom:5 }}>FORMA NUMARASI</label>
        <input value={number} onChange={e => setNumber(e.target.value.replace(/\D/g,'').slice(0,2))}
          placeholder="1–99" maxLength={2}
          style={{ width:'100%', background:'#21262d', border:'1px solid #30363d', borderRadius:7, padding:'9px 12px', color:'#f0f6fc', fontSize:13, fontWeight:600, outline:'none', boxSizing:'border-box', marginBottom:12 }} />

        {/* Position */}
        <label style={{ fontSize:10, color:'#8b949e', fontWeight:700, display:'block', marginBottom:6 }}>POZİSYON</label>
        <div style={{ display:'flex', gap:5, marginBottom:14 }}>
          {(['GK','DEF','MID','FWD'] as PosType[]).map(p => {
            const c = POSITION_COLORS[p];
            return <button key={p} onClick={() => setPos(p)} style={{ flex:1, padding:'7px 0', background: pos===p ? c.bg : '#21262d', color: pos===p ? c.text : '#8b949e', border:'none', borderRadius:6, fontSize:11, fontWeight:700, cursor:'pointer' }}>{p}</button>;
          })}
        </div>

        {/* Kit Color */}
        <label style={{ fontSize:10, color:'#8b949e', fontWeight:700, display:'block', marginBottom:6 }}>FORMA RENGİ</label>
        <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginBottom:12 }}>
          {KIT_COLORS.map(c => (
            <div key={c} onClick={() => setKitColor(c)} style={{ width:24, height:24, borderRadius:'50%', background:c, cursor:'pointer', border: kitColor===c ? '3px solid #00ff87' : '2px solid transparent', boxSizing:'border-box', flexShrink:0 }} />
          ))}
          <input type="color" value={kitColor} onChange={e => setKitColor(e.target.value)}
            style={{ width:24, height:24, borderRadius:'50%', border:'none', cursor:'pointer', padding:0, background:'none' }} title="Özel renk" />
        </div>

        {/* Kit Pattern */}
        <label style={{ fontSize:10, color:'#8b949e', fontWeight:700, display:'block', marginBottom:6 }}>FORMA DESENİ</label>
        <div style={{ display:'flex', flexWrap:'wrap', gap:4, marginBottom:14 }}>
          {(Object.keys(KIT_PATTERNS) as KitPattern[]).map(p => (
            <button key={p} onClick={() => setKitPattern(p)} style={{ padding:'5px 8px', background: kitPattern===p ? '#00ff87' : '#21262d', color: kitPattern===p ? '#000' : '#8b949e', border:'none', borderRadius:5, fontSize:10, fontWeight:700, cursor:'pointer' }}>{KIT_PATTERNS[p]}</button>
          ))}
        </div>

        {/* Note */}
        <label style={{ fontSize:10, color:'#8b949e', fontWeight:700, display:'block', marginBottom:6 }}>NOT / TALİMAT</label>
        <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="Örn. İleri çık, sol kanatta bask..."
          rows={2} style={{ width:'100%', background:'#21262d', border:'1px solid #30363d', borderRadius:7, padding:'8px 12px', color:'#f0f6fc', fontSize:12, outline:'none', resize:'none', boxSizing:'border-box', marginBottom:16, fontFamily:'Inter,sans-serif' }} />

        <div style={{ display:'flex', gap:8 }}>
          <button onClick={onClose} style={{ flex:1, padding:'10px', background:'#21262d', border:'1px solid #30363d', color:'#8b949e', borderRadius:7, fontSize:13, fontWeight:600, cursor:'pointer' }}>İptal</button>
          <button onClick={() => { if (name.trim()) onSave({ name:name.trim(), pos, number, kitColor, kitPattern, note }); }}
            disabled={!name.trim()}
            style={{ flex:2, padding:'10px', background: name.trim() ? '#00ff87':'#21262d', border:'none', color: name.trim() ? '#000':'#8b949e', borderRadius:7, fontSize:13, fontWeight:700, cursor: name.trim() ? 'pointer':'not-allowed' }}>
            ✓ Kaydet
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SAVE/LOAD MODAL
═══════════════════════════════════════════════════════ */
function SaveLoadModal({ current, onLoad, onClose }: {
  current: Omit<SavedPlan, 'id' | 'savedAt'>;
  onLoad: (plan: SavedPlan) => void;
  onClose: () => void;
}) {
  const [plans, setPlans] = useState<SavedPlan[]>([]);
  const [saveName, setSaveName] = useState(current.name || 'Taktik Planım');
  const [tab, setTab] = useState<'save' | 'load'>('save');

  useEffect(() => {
    try {
      const raw = localStorage.getItem('lineup_plans');
      if (raw) setPlans(JSON.parse(raw));
    } catch {}
  }, []);

  const savePlan = () => {
    const plan: SavedPlan = { ...current, id: uid(), name: saveName.trim() || 'İsimsiz Plan', savedAt: new Date().toLocaleString('tr-TR') };
    const updated = [plan, ...plans.slice(0, 19)];
    localStorage.setItem('lineup_plans', JSON.stringify(updated));
    setPlans(updated);
    setTab('load');
  };

  const deletePlan = (id: string) => {
    const updated = plans.filter(p => p.id !== id);
    localStorage.setItem('lineup_plans', JSON.stringify(updated));
    setPlans(updated);
  };

  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.7)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:200, backdropFilter:'blur(5px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{ background:'#161b22', border:'1px solid #30363d', borderRadius:14, width:400, maxHeight:'80vh', display:'flex', flexDirection:'column', boxShadow:'0 24px 64px rgba(0,0,0,0.7)' }}>
        
        <div style={{ padding:'18px 20px 12px', borderBottom:'1px solid #30363d', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div style={{ fontSize:16, fontWeight:800, color:'#f0f6fc' }}>💾 Planlar</div>
          <button onClick={onClose} style={{ background:'#21262d', border:'none', color:'#8b949e', width:28, height:28, borderRadius:6, cursor:'pointer', fontSize:16 }}>×</button>
        </div>

        <div style={{ display:'flex', borderBottom:'1px solid #30363d' }}>
          {(['save','load'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ flex:1, padding:'9px', background:'none', border:'none', color: tab===t ? '#00ff87':'#8b949e', fontSize:12, fontWeight:700, cursor:'pointer', borderBottom: tab===t ? '2px solid #00ff87':'2px solid transparent' }}>
              {t === 'save' ? '💾 Kaydet' : `📂 Yükle (${plans.length})`}
            </button>
          ))}
        </div>

        <div style={{ flex:1, overflowY:'auto', padding:16 }}>
          {tab === 'save' && (
            <>
              <label style={{ fontSize:10, color:'#8b949e', fontWeight:700, display:'block', marginBottom:6 }}>PLAN ADI</label>
              <input value={saveName} onChange={e => setSaveName(e.target.value)} placeholder="Örn. Hafta Sonu Taktiği"
                style={{ width:'100%', background:'#21262d', border:'1px solid #30363d', borderRadius:7, padding:'10px 12px', color:'#f0f6fc', fontSize:13, fontWeight:600, outline:'none', boxSizing:'border-box', marginBottom:14 }} />
              <div style={{ background:'#21262d', borderRadius:8, padding:'10px 12px', marginBottom:14, border:'1px solid #30363d' }}>
                <div style={{ fontSize:11, color:'#8b949e', marginBottom:4 }}>Kaydedilecek bilgiler:</div>
                <div style={{ fontSize:11, color:'#f0f6fc' }}>🗂 {current.formation} · {Object.keys(current.lineup).length} oyuncu · {current.arrows.length} ok · {current.zones.length} bölge</div>
              </div>
              <button onClick={savePlan} style={{ width:'100%', padding:'12px', background:'#00ff87', border:'none', color:'#000', borderRadius:8, fontSize:14, fontWeight:700, cursor:'pointer' }}>
                💾 Planı Kaydet
              </button>
            </>
          )}

          {tab === 'load' && (
            plans.length === 0
              ? <div style={{ textAlign:'center', color:'#8b949e', padding:'30px 0', fontSize:13 }}>Henüz kayıtlı plan yok</div>
              : plans.map(plan => (
                <div key={plan.id} style={{ background:'#21262d', borderRadius:8, padding:'11px 13px', marginBottom:8, border:'1px solid #30363d', display:'flex', alignItems:'center', gap:10 }}>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:13, fontWeight:700, color:'#f0f6fc', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{plan.name}</div>
                    <div style={{ fontSize:10, color:'#8b949e' }}>{plan.formation} · {Object.keys(plan.lineup).length} oyuncu · {plan.savedAt}</div>
                  </div>
                  <button onClick={() => { onLoad(plan); onClose(); }}
                    style={{ background:'#00ff87', border:'none', color:'#000', padding:'5px 10px', borderRadius:5, fontSize:11, fontWeight:700, cursor:'pointer', flexShrink:0 }}>Yükle</button>
                  <button onClick={() => deletePlan(plan.id)}
                    style={{ background:'none', border:'none', color:'#ff4444', cursor:'pointer', fontSize:16, padding:'0 2px', flexShrink:0 }}>×</button>
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   PITCH SLOT
═══════════════════════════════════════════════════════ */
function PitchSlot({ slot, data, onClick, onRemove, isDragOver, onDragOver, onDragLeave, onDrop, onDragStart }: {
  slot: FormationPosition; data?: SlotData;
  onClick: () => void; onRemove: () => void;
  isDragOver: boolean;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent) => void;
  onDragStart: (e: React.DragEvent) => void;
}) {
  const initials = data ? getInitials(data.name) : '';
  const textColor = data ? (['#ffffff','#f5c518','#fbbf24','#a3e635','#34d399','#e2e8f0'].includes(data.kitColor) ? '#000' : '#fff') : '#fff';

  return (
    <div style={{ position:'absolute', left:`${slot.x}%`, top:`${slot.y}%`, transform:'translate(-50%,-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:3, zIndex:10 }}
      onDragOver={e => { e.preventDefault(); onDragOver(e); }}
      onDrop={onDrop}
      onDragLeave={onDragLeave}>
      
      <div draggable={!!data} onDragStart={onDragStart} onClick={onClick}
        style={{ cursor:'pointer', userSelect:'none', filter: data ? `drop-shadow(0 3px 10px ${data.kitColor}66)` : 'none', transition:'transform 0.15s', borderRadius:'50%',
          outline: isDragOver ? '3px dashed #00ff87' : 'none', outlineOffset:3 }}>
        {data
          ? <KitCircle color={data.kitColor} pattern={data.kitPattern} size={60} initials={initials} number={data.number} textColor={textColor} />
          : <div style={{ width:60, height:60, borderRadius:'50%', background: isDragOver ? 'rgba(0,255,135,0.18)' : 'rgba(255,255,255,0.07)', border:'2px dashed rgba(255,255,255,0.28)', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <span style={{ fontSize:10, color:'rgba(255,255,255,0.3)', fontWeight:600 }}>{isDragOver ? '▼' : '+'}</span>
            </div>
        }
      </div>

      {data ? (
        <div style={{ background:'rgba(0,0,0,0.85)', backdropFilter:'blur(6px)', border:`1px solid ${data.kitColor}55`, borderRadius:5, padding:'2px 7px', display:'flex', alignItems:'center', gap:3, maxWidth:114 }}>
          <span style={{ fontSize:8, background:data.kitColor, color:textColor, borderRadius:3, padding:'1px 4px', fontWeight:700, flexShrink:0 }}>{slot.label}</span>
          <span style={{ fontSize:10, color:'#f0f6fc', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', fontWeight:600 }}>{data.name}</span>
          <button onClick={e => { e.stopPropagation(); onRemove(); }} style={{ background:'none', border:'none', color:'#ff4444', cursor:'pointer', fontSize:12, padding:0, lineHeight:1, flexShrink:0 }}>×</button>
        </div>
      ) : (
        <div style={{ background:'rgba(0,0,0,0.45)', borderRadius:3, padding:'1px 6px', fontSize:9, color: isDragOver ? '#00ff87' : 'rgba(255,255,255,0.3)', fontWeight:600 }}>
          {isDragOver ? 'Bırak' : slot.label}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   DRAWING LAYER (arrows, zones, freehand)
═══════════════════════════════════════════════════════ */
function DrawingLayer({ arrows, zones, paths, activeTool, arrowStyle, zoneColor, zoneLabel, drawColor,
  onAddArrow, onAddZone, onAddPath, onDeleteArrow, onDeleteZone, onDeletePath, pitchW, pitchH }:
{
  arrows: DrawnArrow[]; zones: DrawnZone[]; paths: DrawnPath[];
  activeTool: DrawTool; arrowStyle: ArrowStyle; zoneColor: string; zoneLabel: string; drawColor: string;
  onAddArrow: (a: DrawnArrow) => void; onAddZone: (z: DrawnZone) => void; onAddPath: (p: DrawnPath) => void;
  onDeleteArrow: (id: string) => void; onDeleteZone: (id: string) => void; onDeletePath: (id: string) => void;
  pitchW: number; pitchH: number;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [drawing, setDrawing] = useState(false);
  const [start, setStart] = useState<[number,number]>([0,0]);
  const [current, setCurrent] = useState<[number,number]>([0,0]);
  const [pathPoints, setPathPoints] = useState<[number,number][]>([]);

  const toSvg = useCallback((e: React.MouseEvent | React.PointerEvent) => {
    const rect = svgRef.current!.getBoundingClientRect();
    return [(e.clientX - rect.left) / rect.width * 100, (e.clientY - rect.top) / rect.height * 100] as [number,number];
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    if (activeTool === 'none') return;
    e.preventDefault();
    (e.target as Element).setPointerCapture(e.pointerId);
    const p = toSvg(e);
    setStart(p); setCurrent(p); setDrawing(true);
    if (activeTool === 'freehand') setPathPoints([p]);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!drawing) return;
    const p = toSvg(e);
    setCurrent(p);
    if (activeTool === 'freehand') setPathPoints(prev => [...prev, p]);
  };

  const onPointerUp = () => {
    if (!drawing) return;
    setDrawing(false);
    if (activeTool === 'arrow') {
      const dx = current[0]-start[0], dy = current[1]-start[1];
      if (Math.sqrt(dx*dx+dy*dy) > 2) onAddArrow({ id:uid(), x1:start[0], y1:start[1], x2:current[0], y2:current[1], style:arrowStyle });
    } else if (activeTool === 'zone') {
      const x = Math.min(start[0],current[0]), y = Math.min(start[1],current[1]);
      const w = Math.abs(current[0]-start[0]), h = Math.abs(current[1]-start[1]);
      if (w > 2 && h > 2) onAddZone({ id:uid(), x, y, w, h, color:zoneColor, label:zoneLabel });
    } else if (activeTool === 'freehand' && pathPoints.length > 2) {
      onAddPath({ id:uid(), points:pathPoints, color:drawColor });
      setPathPoints([]);
    }
  };

  const mkArrow = (a: DrawnArrow) => {
    const st = ARROW_STYLES[a.style];
    const dx = a.x2-a.x1, dy = a.y2-a.y1;
    const len = Math.sqrt(dx*dx+dy*dy);
    if (len < 1) return null;
    const ux = dx/len, uy = dy/len;
    const ex = a.x2 - ux*1.5, ey = a.y2 - uy*1.5;
    const px = -uy*1.2, py = ux*1.2;
    return (
      <g key={a.id}>
        <line x1={a.x1} y1={a.y1} x2={ex} y2={ey} stroke={st.color} strokeWidth="0.8" strokeDasharray={st.dash} opacity="0.9" />
        <polygon points={`${a.x2},${a.y2} ${ex+px},${ey+py} ${ex-px},${ey-py}`} fill={st.color} opacity="0.9" />
        <line x1={a.x1} y1={a.y1} x2={a.x2} y2={a.y2} stroke="transparent" strokeWidth="3" style={{ cursor:'pointer' }}
          onClick={() => onDeleteArrow(a.id)} />
      </g>
    );
  };

  const pathD = (pts: [number,number][]) => pts.length < 2 ? '' : `M${pts[0][0]},${pts[0][1]} ` + pts.slice(1).map(p => `L${p[0]},${p[1]}`).join(' ');

  return (
    <svg ref={svgRef} viewBox="0 0 100 100" preserveAspectRatio="none"
      style={{ position:'absolute', inset:0, width:'100%', height:'100%', zIndex: activeTool !== 'none' ? 20 : 5,
        cursor: activeTool === 'none' ? 'default' : activeTool === 'freehand' ? 'crosshair' : 'crosshair',
        pointerEvents: activeTool !== 'none' ? 'all' : 'none' }}
      onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp}>

      {/* Zones */}
      {zones.map(z => (
        <g key={z.id}>
          <rect x={z.x} y={z.y} width={z.w} height={z.h} fill={z.color} stroke={z.color.replace('33','99')} strokeWidth="0.5" rx="0.5" style={{ cursor:'pointer' }} onClick={() => activeTool === 'none' && onDeleteZone(z.id)} />
          <text x={z.x + z.w/2} y={z.y + z.h/2} textAnchor="middle" dominantBaseline="middle" fontSize="2.5" fontWeight="700" fill={z.color.replace('33','ff')} fontFamily="Inter,sans-serif">{z.label}</text>
        </g>
      ))}

      {/* Saved paths */}
      {paths.map(p => (
        <path key={p.id} d={pathD(p.points)} fill="none" stroke={p.color} strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.85"
          style={{ cursor:'pointer' }} onClick={() => activeTool === 'none' && onDeletePath(p.id)} />
      ))}

      {/* Arrows */}
      {arrows.map(mkArrow)}

      {/* Live preview */}
      {drawing && activeTool === 'arrow' && (
        <line x1={start[0]} y1={start[1]} x2={current[0]} y2={current[1]} stroke={ARROW_STYLES[arrowStyle].color} strokeWidth="0.8" strokeDasharray={ARROW_STYLES[arrowStyle].dash} opacity="0.7" />
      )}
      {drawing && activeTool === 'zone' && (
        <rect x={Math.min(start[0],current[0])} y={Math.min(start[1],current[1])} width={Math.abs(current[0]-start[0])} height={Math.abs(current[1]-start[1])} fill={zoneColor} stroke={zoneColor.replace('33','99')} strokeWidth="0.5" opacity="0.7" />
      )}
      {drawing && activeTool === 'freehand' && pathPoints.length > 1 && (
        <path d={pathD(pathPoints)} fill="none" stroke={drawColor} strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
      )}
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN APP
═══════════════════════════════════════════════════════ */
const DEFAULT_KIT_COLOR = '#dc2626';
const DEFAULT_KIT_PATTERN: KitPattern = 'solid';

export default function LineupBuilder() {
  const [formation, setFormation] = useState('4-3-3');
  const [lineup, setLineup] = useState<Record<string, SlotData>>({});
  const [editSlot, setEditSlot] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState<string | null>(null);
  const [dragging, setDragging] = useState<string | null>(null);
  const [teamName, setTeamName] = useState('Takımım');
  const [sidebarTab, setSidebarTab] = useState<'lineup' | 'draw' | 'kit'>('lineup');

  // Drawing state
  const [drawTool, setDrawTool] = useState<DrawTool>('none');
  const [arrowStyle, setArrowStyle] = useState<ArrowStyle>('attack');
  const [arrows, setArrows] = useState<DrawnArrow[]>([]);
  const [zones, setZones] = useState<DrawnZone[]>([]);
  const [paths, setPaths] = useState<DrawnPath[]>([]);
  const [zoneColorIdx, setZoneColorIdx] = useState(0);
  const [zoneLabelIdx, setZoneLabelIdx] = useState(0);
  const [drawColor, setDrawColor] = useState('#ffffff');

  // Kit defaults
  const [globalKitColor, setGlobalKitColor] = useState(DEFAULT_KIT_COLOR);
  const [globalKitPattern, setGlobalKitPattern] = useState<KitPattern>(DEFAULT_KIT_PATTERN);

  // Save/Load
  const [showSaveLoad, setShowSaveLoad] = useState(false);

  const currentFormation = FORMATIONS[formation];
  const filledCount = Object.keys(lineup).length;
  const totalSlots = currentFormation.positions.length;

  // Auto-save to localStorage every change
  useEffect(() => {
    const state = { formation, lineup, teamName, arrows, zones, paths, globalKitColor, globalKitPattern };
    localStorage.setItem('lineup_autosave', JSON.stringify(state));
  }, [formation, lineup, teamName, arrows, zones, paths, globalKitColor, globalKitPattern]);

  // Restore autosave on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem('lineup_autosave');
      if (raw) {
        const s = JSON.parse(raw);
        if (s.formation) setFormation(s.formation);
        if (s.lineup) setLineup(s.lineup);
        if (s.teamName) setTeamName(s.teamName);
        if (s.arrows) setArrows(s.arrows);
        if (s.zones) setZones(s.zones);
        if (s.paths) setPaths(s.paths);
        if (s.globalKitColor) setGlobalKitColor(s.globalKitColor);
        if (s.globalKitPattern) setGlobalKitPattern(s.globalKitPattern);
      }
    } catch {}
  }, []);

  const handleFormationChange = (f: string) => {
    const newSlots = FORMATIONS[f].positions.map(p => p.role);
    const oldSlots = currentFormation.positions;
    const newLineup: Record<string, SlotData> = {};
    newSlots.forEach((role, i) => {
      const old = oldSlots[i];
      if (old && lineup[old.role]) newLineup[role] = lineup[old.role];
    });
    setLineup(newLineup);
    setFormation(f);
  };

  const handleSave = (role: string, data: SlotData) => {
    setLineup(prev => ({ ...prev, [role]: data }));
    setEditSlot(null);
  };

  const handleRemove = (role: string) => setLineup(prev => { const n = { ...prev }; delete n[role]; return n; });
  const clearAll = () => { setLineup({}); setArrows([]); setZones([]); setPaths([]); };

  const handleDragStart = (e: React.DragEvent, role: string) => {
    if (drawTool !== 'none') return;
    e.dataTransfer.effectAllowed = 'move';
    setDragging(role);
  };

  const handleDrop = (e: React.DragEvent, targetRole: string) => {
    e.preventDefault(); setDragOver(null);
    if (!dragging || dragging === targetRole) { setDragging(null); return; }
    setLineup(prev => {
      const next = { ...prev };
      const src = next[dragging]; const tgt = next[targetRole];
      if (src) next[targetRole] = src; else delete next[targetRole];
      if (tgt) next[dragging] = tgt; else delete next[dragging];
      return next;
    });
    setDragging(null);
  };

  // Apply global kit to all filled slots
  const applyGlobalKit = () => {
    setLineup(prev => {
      const next = { ...prev };
      Object.keys(next).forEach(role => {
        next[role] = { ...next[role], kitColor: globalKitColor, kitPattern: globalKitPattern };
      });
      return next;
    });
  };

  const loadPlan = (plan: SavedPlan) => {
    setFormation(plan.formation);
    setLineup(plan.lineup);
    setTeamName(plan.teamName);
    setArrows(plan.arrows || []);
    setZones(plan.zones || []);
    setPaths(plan.paths || []);
    if (plan.kitColor) setGlobalKitColor(plan.kitColor);
    if (plan.kitPattern) setGlobalKitPattern(plan.kitPattern);
  };

  const currentPlanData: Omit<SavedPlan,'id'|'savedAt'> = {
    name: teamName, formation, teamName, lineup, arrows, zones, paths, kitColor: globalKitColor, kitPattern: globalKitPattern,
  };

  const editingSlot = editSlot ? currentFormation.positions.find(p => p.role === editSlot) : null;
  const pitchRef = useRef<HTMLDivElement>(null);
  const [pitchSize, setPitchSize] = useState({ w: 500, h: 735 });
  useEffect(() => {
    const obs = new ResizeObserver(entries => {
      for (const e of entries) setPitchSize({ w: e.contentRect.width, h: e.contentRect.height });
    });
    if (pitchRef.current) obs.observe(pitchRef.current);
    return () => obs.disconnect();
  }, []);

  const KIT_COLORS_GLOBAL = ['#dc2626','#ea580c','#f59e0b','#16a34a','#2563eb','#7c3aed','#db2777','#0891b2','#111827','#ffffff','#6b7280','#f5c518'];

  return (
    <div style={{ display:'flex', height:'100vh', overflow:'hidden', background:'#0d1117', fontFamily:"'Inter',sans-serif", color:'#f0f6fc' }}>

      {/* MODALS */}
      {editSlot && editingSlot && (
        <EditModal slotLabel={editingSlot.label}
          initial={lineup[editSlot] || { name:'', pos:SLOT_DEFAULT_POS[editSlot]||'MID', number:'', kitColor:globalKitColor, kitPattern:globalKitPattern, note:'' }}
          onSave={data => handleSave(editSlot, data)}
          onClose={() => setEditSlot(null)} />
      )}
      {showSaveLoad && (
        <SaveLoadModal current={currentPlanData} onLoad={loadPlan} onClose={() => setShowSaveLoad(false)} />
      )}

      {/* LEFT SIDEBAR */}
      <div style={{ width:268, background:'#161b22', borderRight:'1px solid #30363d', display:'flex', flexDirection:'column', flexShrink:0 }}>
        {/* Logo & team name */}
        <div style={{ padding:'14px 14px 12px', borderBottom:'1px solid #30363d' }}>
          <div style={{ display:'flex', alignItems:'center', gap:9, marginBottom:12 }}>
            <div style={{ width:36, height:36, background:'linear-gradient(135deg,#00ff87,#00cc6e)', borderRadius:9, display:'flex', alignItems:'center', justifyContent:'center', fontSize:19, boxShadow:'0 4px 12px rgba(0,255,135,0.3)', flexShrink:0 }}>⚽</div>
            <div>
              <div style={{ fontSize:14, fontWeight:800, color:'#f0f6fc', letterSpacing:1.5, fontFamily:'Georgia,serif' }}>LINEUP BUILDER</div>
              <div style={{ fontSize:9, color:'#8b949e' }}>Taktik Analiz Aracı</div>
            </div>
          </div>
          <input value={teamName} onChange={e => setTeamName(e.target.value)} placeholder="Takım adı..."
            style={{ width:'100%', background:'#21262d', border:'1px solid #30363d', borderRadius:6, padding:'7px 10px', color:'#f0f6fc', fontSize:13, fontWeight:600, outline:'none', marginBottom:10, boxSizing:'border-box' }} />

          {/* Formation */}
          <div style={{ fontSize:9, color:'#8b949e', fontWeight:700, marginBottom:5 }}>FORMASYON</div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:3, marginBottom:10 }}>
            {Object.keys(FORMATIONS).map(f => (
              <button key={f} onClick={() => handleFormationChange(f)} style={{ background: formation===f ? '#00ff87':'#21262d', color: formation===f ? '#000':'#8b949e', border:'none', borderRadius:4, padding:'4px 1px', fontSize:9, fontWeight:700, cursor:'pointer' }}>{f}</button>
            ))}
          </div>

          {/* Stats row */}
          <div style={{ display:'flex', gap:4, marginBottom:10 }}>
            {[{v:filledCount,l:'DOLU',c:'#00ff87'},{v:totalSlots-filledCount,l:'BOŞ',c:'#f0f6fc'},{v:arrows.length+zones.length+paths.length,l:'ÇİZİM',c:'#f59e0b'}].map(s => (
              <div key={s.l} style={{ flex:1, background:'#21262d', borderRadius:5, padding:'5px 3px', textAlign:'center' }}>
                <div style={{ fontSize:15, fontWeight:700, color:s.c }}>{s.v}</div>
                <div style={{ fontSize:7, color:'#8b949e' }}>{s.l}</div>
              </div>
            ))}
          </div>

          {/* Action buttons */}
          <div style={{ display:'flex', gap:5 }}>
            <button onClick={() => setShowSaveLoad(true)} style={{ flex:1, background:'#21262d', border:'1px solid #30363d', color:'#f0f6fc', padding:'6px 4px', borderRadius:6, fontSize:10, fontWeight:700, cursor:'pointer' }}>💾 Kaydet</button>
            <button onClick={clearAll} style={{ flex:1, background:'#21262d', border:'1px solid #ff444433', color:'#ff4444', padding:'6px 4px', borderRadius:6, fontSize:10, fontWeight:700, cursor:'pointer' }}>🗑 Temizle</button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display:'flex', borderBottom:'1px solid #30363d' }}>
          {([['lineup','👥 Kadro'],['draw','✏️ Çizim'],['kit','🎨 Forma']] as const).map(([tab, label]) => (
            <button key={tab} onClick={() => setSidebarTab(tab)} style={{ flex:1, padding:'8px 2px', background:'none', border:'none', color: sidebarTab===tab ? '#00ff87':'#8b949e', fontSize:10, fontWeight:700, cursor:'pointer', borderBottom: sidebarTab===tab ? '2px solid #00ff87':'2px solid transparent' }}>
              {label}
            </button>
          ))}
        </div>

        {/* LINEUP TAB */}
        {sidebarTab === 'lineup' && (
          <div style={{ flex:1, overflowY:'auto', padding:8 }}>
            {currentFormation.positions.map(slot => {
              const p = lineup[slot.role];
              const textColor = p ? (['#ffffff','#f5c518','#fbbf24','#a3e635','#34d399','#e2e8f0'].includes(p.kitColor) ? '#000':'#fff') : '#8b949e';
              return (
                <div key={slot.role} onClick={() => setEditSlot(slot.role)}
                  style={{ display:'flex', alignItems:'center', gap:7, padding:'7px 8px', borderRadius:7, marginBottom:3, cursor:'pointer', background: p ? '#21262d':'#191f27', border:`1px solid ${p ? p.kitColor+'44':'#30363d'}`, transition:'all 0.1s' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = '#00ff8766')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = p ? p.kitColor+'44':'#30363d')}>
                  <div style={{ width:24, fontSize:8, fontWeight:700, color: p ? textColor:'#8b949e', background: p ? p.kitColor:'#21262d', borderRadius:3, padding:'2px 3px', textAlign:'center', flexShrink:0 }}>{slot.label}</div>
                  {p ? (
                    <>
                      <KitCircle color={p.kitColor} pattern={p.kitPattern} size={28} initials={getInitials(p.name)} number={p.number} textColor={textColor} />
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ fontSize:11, fontWeight:600, color:'#f0f6fc', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{p.name}</div>
                        {p.note && <div style={{ fontSize:9, color:'#8b949e', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{p.note}</div>}
                      </div>
                      <button onClick={e => { e.stopPropagation(); handleRemove(slot.role); }} style={{ background:'none', border:'none', color:'#ff4444', cursor:'pointer', fontSize:14, padding:'0 1px', flexShrink:0 }}>×</button>
                    </>
                  ) : (
                    <div style={{ flex:1, fontSize:11, color:'#8b949e' }}><span style={{ color:'#00ff87' }}>+</span> Oyuncu ekle</div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* DRAW TAB */}
        {sidebarTab === 'draw' && (
          <div style={{ flex:1, overflowY:'auto', padding:12 }}>
            <div style={{ fontSize:10, color:'#8b949e', fontWeight:700, marginBottom:8 }}>ÇİZİM ARACI</div>
            <div style={{ display:'flex', flexDirection:'column', gap:4, marginBottom:14 }}>
              {([['none','🚫 Kapalı'],['arrow','→ Ok'],['zone','□ Bölge'],['freehand','✏️ Serbest']] as const).map(([tool, label]) => (
                <button key={tool} onClick={() => setDrawTool(tool)} style={{ padding:'9px 12px', background: drawTool===tool ? '#21262d':'transparent', color: drawTool===tool ? '#00ff87':'#8b949e', border: drawTool===tool ? '1px solid #00ff8744':'1px solid transparent', borderRadius:7, fontSize:12, fontWeight:700, cursor:'pointer', textAlign:'left' }}>
                  {label} {drawTool===tool && <span style={{ float:'right', color:'#00ff87' }}>●</span>}
                </button>
              ))}
            </div>

            {drawTool === 'arrow' && (
              <>
                <div style={{ fontSize:10, color:'#8b949e', fontWeight:700, marginBottom:7 }}>OK TÜRÜ</div>
                {(Object.entries(ARROW_STYLES) as [ArrowStyle, typeof ARROW_STYLES[ArrowStyle]][]).map(([key, st]) => (
                  <button key={key} onClick={() => setArrowStyle(key)} style={{ width:'100%', display:'flex', alignItems:'center', gap:8, padding:'7px 10px', background: arrowStyle===key ? '#21262d':'transparent', border: arrowStyle===key ? `1px solid ${st.color}44`:'1px solid transparent', borderRadius:6, cursor:'pointer', marginBottom:3 }}>
                    <div style={{ width:24, height:3, background:st.color, borderRadius:2, flexShrink:0, ...(st.dash !== 'none' ? { backgroundImage:`linear-gradient(90deg, ${st.color} 60%, transparent 60%)`, backgroundSize:'8px 3px' } : {}) }} />
                    <span style={{ fontSize:11, color: arrowStyle===key ? '#f0f6fc':'#8b949e', fontWeight:600 }}>{st.emoji} {st.label}</span>
                  </button>
                ))}
              </>
            )}

            {drawTool === 'zone' && (
              <>
                <div style={{ fontSize:10, color:'#8b949e', fontWeight:700, marginBottom:7 }}>BÖLGE TÜRÜ</div>
                {ZONE_LABELS.map((lbl, i) => (
                  <button key={i} onClick={() => { setZoneColorIdx(i); setZoneLabelIdx(i); }} style={{ width:'100%', display:'flex', alignItems:'center', gap:8, padding:'7px 10px', background: zoneLabelIdx===i ? '#21262d':'transparent', border: zoneLabelIdx===i ? '1px solid #30363d':'1px solid transparent', borderRadius:6, cursor:'pointer', marginBottom:3 }}>
                    <div style={{ width:14, height:14, borderRadius:3, background:ZONE_COLORS[i], border:`1px solid ${ZONE_COLORS[i].replace('33','99')}`, flexShrink:0 }} />
                    <span style={{ fontSize:11, color: zoneLabelIdx===i ? '#f0f6fc':'#8b949e', fontWeight:600 }}>{lbl}</span>
                  </button>
                ))}
              </>
            )}

            {drawTool === 'freehand' && (
              <>
                <div style={{ fontSize:10, color:'#8b949e', fontWeight:700, marginBottom:7 }}>ÇİZİM RENGİ</div>
                <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginBottom:10 }}>
                  {['#ffffff','#ff4444','#00ff87','#f59e0b','#2563eb','#a855f7'].map(c => (
                    <div key={c} onClick={() => setDrawColor(c)} style={{ width:22, height:22, borderRadius:'50%', background:c, cursor:'pointer', border: drawColor===c ? '3px solid #fff':'2px solid transparent', boxSizing:'border-box' }} />
                  ))}
                </div>
              </>
            )}

            {drawTool !== 'none' && (
              <div style={{ background:'#21262d', borderRadius:8, padding:'10px 12px', marginTop:8, border:'1px solid #30363d' }}>
                <div style={{ fontSize:11, color:'#00ff87', fontWeight:700, marginBottom:4 }}>💡 Nasıl Kullanılır</div>
                <div style={{ fontSize:10, color:'#8b949e', lineHeight:1.6 }}>
                  {drawTool === 'arrow' && 'Sahada tıklayıp sürükle → ok çiz. Ok üzerine tıkla → sil.'}
                  {drawTool === 'zone' && 'Sahada tıklayıp sürükle → bölge çiz. Bölgeye tıkla → sil.'}
                  {drawTool === 'freehand' && 'Sahada tıklayıp sürükle → serbest çizim. Çizgiye tıkla → sil.'}
                </div>
              </div>
            )}

            {(arrows.length > 0 || zones.length > 0 || paths.length > 0) && (
              <button onClick={() => { setArrows([]); setZones([]); setPaths([]); }} style={{ width:'100%', marginTop:12, padding:'8px', background:'transparent', border:'1px solid #ff444433', color:'#ff4444', borderRadius:6, fontSize:11, fontWeight:700, cursor:'pointer' }}>
                🗑 Tüm Çizimleri Sil
              </button>
            )}
          </div>
        )}

        {/* KIT TAB */}
        {sidebarTab === 'kit' && (
          <div style={{ flex:1, overflowY:'auto', padding:12 }}>
            <div style={{ fontSize:10, color:'#8b949e', fontWeight:700, marginBottom:8 }}>TAKIM FORMASI</div>

            {/* Preview */}
            <div style={{ display:'flex', justifyContent:'center', gap:10, marginBottom:14, background:'#21262d', borderRadius:10, padding:'14px 0', border:'1px solid #30363d' }}>
              {(['GK','DEF','MID','FWD'] as PosType[]).map(pos => (
                <div key={pos} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
                  <KitCircle color={globalKitColor} pattern={globalKitPattern} size={36} initials={pos} textColor={['#ffffff','#f5c518','#fbbf24','#a3e635','#34d399','#e2e8f0'].includes(globalKitColor)?'#000':'#fff'} />
                  <span style={{ fontSize:8, color:'#8b949e', fontWeight:700 }}>{pos}</span>
                </div>
              ))}
            </div>

            <div style={{ fontSize:10, color:'#8b949e', fontWeight:700, marginBottom:6 }}>FORMA RENGİ</div>
            <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginBottom:14 }}>
              {KIT_COLORS_GLOBAL.map(c => (
                <div key={c} onClick={() => setGlobalKitColor(c)} style={{ width:24, height:24, borderRadius:'50%', background:c, cursor:'pointer', border: globalKitColor===c ? '3px solid #00ff87':'2px solid transparent', boxSizing:'border-box', flexShrink:0 }} />
              ))}
              <input type="color" value={globalKitColor} onChange={e => setGlobalKitColor(e.target.value)}
                style={{ width:24, height:24, borderRadius:'50%', border:'none', cursor:'pointer', padding:0, background:'none' }} />
            </div>

            <div style={{ fontSize:10, color:'#8b949e', fontWeight:700, marginBottom:6 }}>FORMA DESENİ</div>
            <div style={{ display:'flex', flexDirection:'column', gap:4, marginBottom:14 }}>
              {(Object.entries(KIT_PATTERNS) as [KitPattern, string][]).map(([k, v]) => (
                <button key={k} onClick={() => setGlobalKitPattern(k)} style={{ padding:'8px 12px', background: globalKitPattern===k ? '#21262d':'transparent', color: globalKitPattern===k ? '#00ff87':'#8b949e', border: globalKitPattern===k ? '1px solid #00ff8744':'1px solid transparent', borderRadius:6, fontSize:11, fontWeight:700, cursor:'pointer', textAlign:'left' }}>
                  {v} {globalKitPattern===k && <span style={{ float:'right' }}>✓</span>}
                </button>
              ))}
            </div>

            <button onClick={applyGlobalKit} style={{ width:'100%', padding:'10px', background:'#00ff87', border:'none', color:'#000', borderRadius:8, fontSize:12, fontWeight:700, cursor:'pointer', marginBottom:8 }}>
              ✨ Tüm Oyunculara Uygula
            </button>
            <div style={{ fontSize:10, color:'#8b949e', textAlign:'center', lineHeight:1.5 }}>
              Her oyuncuya özel forma için kadro listesinden oyuncuya tıkla
            </div>
          </div>
        )}
      </div>

      {/* PITCH */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
        {/* Toolbar */}
        <div style={{ padding:'10px 18px', borderBottom:'1px solid #30363d', display:'flex', alignItems:'center', justifyContent:'space-between', background:'#161b22', flexShrink:0 }}>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <h1 style={{ fontSize:20, fontWeight:800, color:'#f0f6fc', letterSpacing:2, fontFamily:'Georgia,serif' }}>{teamName.toUpperCase()||'TAKIMIM'}</h1>
            <span style={{ background:'#21262d', color:'#00ff87', padding:'3px 9px', borderRadius:20, fontSize:11, fontWeight:700, border:'1px solid #00ff8733' }}>{formation}</span>
            <span style={{ fontSize:11, color:'#8b949e' }}>{filledCount}/{totalSlots}</span>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:6 }}>
            {drawTool !== 'none' && (
              <div style={{ background:'#f59e0b22', border:'1px solid #f59e0b55', borderRadius:6, padding:'5px 10px', fontSize:11, color:'#f59e0b', fontWeight:700 }}>
                ✏️ Çizim Modu: {drawTool === 'arrow' ? ARROW_STYLES[arrowStyle].label : drawTool === 'zone' ? ZONE_LABELS[zoneLabelIdx] : 'Serbest'} — Oyuncu taşımak için Çizim Kapalı yapın
              </div>
            )}
            <button onClick={() => setShowSaveLoad(true)} style={{ background:'#21262d', border:'1px solid #30363d', color:'#f0f6fc', padding:'6px 12px', borderRadius:6, fontSize:11, fontWeight:600, cursor:'pointer' }}>💾 Planlar</button>
          </div>
        </div>

        {/* Pitch */}
        <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', padding:14, overflow:'hidden' }}>
          <div ref={pitchRef} style={{ position:'relative', width:'100%', maxWidth:570, aspectRatio:'0.68', maxHeight:'calc(100vh - 108px)', borderRadius:8, overflow:'hidden' }}>
            {/* Grass */}
            <div style={{ position:'absolute', inset:0, background:'repeating-linear-gradient(0deg,#1a4a1a 0px,#1a4a1a 36px,#1d5520 36px,#1d5520 72px)' }} />
            {/* Pitch lines */}
            <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', zIndex:1 }} viewBox="0 0 100 147" preserveAspectRatio="none">
              <rect x="4" y="3" width="92" height="141" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="0.5" />
              <line x1="4" y1="73.5" x2="96" y2="73.5" stroke="rgba(255,255,255,0.5)" strokeWidth="0.4" />
              <circle cx="50" cy="73.5" r="11" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="0.4" />
              <circle cx="50" cy="73.5" r="0.8" fill="rgba(255,255,255,0.5)" />
              <rect x="20" y="3" width="60" height="22" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="0.4" />
              <rect x="34" y="3" width="32" height="9" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="0.4" />
              <circle cx="50" cy="18" r="0.7" fill="rgba(255,255,255,0.5)" />
              <rect x="20" y="122" width="60" height="22" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="0.4" />
              <rect x="34" y="135" width="32" height="9" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="0.4" />
              <circle cx="50" cy="129" r="0.7" fill="rgba(255,255,255,0.5)" />
              <rect x="38" y="1" width="24" height="2.5" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.5)" strokeWidth="0.3" />
              <rect x="38" y="143.5" width="24" height="2.5" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.5)" strokeWidth="0.3" />
            </svg>

            {/* Drawing layer — behind players when tool off, in front when on */}
            <DrawingLayer
              arrows={arrows} zones={zones} paths={paths}
              activeTool={drawTool} arrowStyle={arrowStyle}
              zoneColor={ZONE_COLORS[zoneColorIdx]} zoneLabel={ZONE_LABELS[zoneLabelIdx]}
              drawColor={drawColor}
              onAddArrow={a => setArrows(prev => [...prev, a])}
              onAddZone={z => setZones(prev => [...prev, z])}
              onAddPath={p => setPaths(prev => [...prev, p])}
              onDeleteArrow={id => setArrows(prev => prev.filter(a => a.id !== id))}
              onDeleteZone={id => setZones(prev => prev.filter(z => z.id !== id))}
              onDeletePath={id => setPaths(prev => prev.filter(p => p.id !== id))}
              pitchW={pitchSize.w} pitchH={pitchSize.h}
            />

            {/* Players */}
            {currentFormation.positions.map(slot => (
              <PitchSlot key={slot.role} slot={slot} data={lineup[slot.role]}
                onClick={() => { if (drawTool === 'none') setEditSlot(slot.role); }}
                onRemove={() => handleRemove(slot.role)}
                isDragOver={dragOver === slot.role}
                onDragOver={() => setDragOver(slot.role)}
                onDragLeave={() => setDragOver(null)}
                onDrop={e => handleDrop(e, slot.role)}
                onDragStart={e => handleDragStart(e, slot.role)} />
            ))}

            <div style={{ position:'absolute', bottom:7, right:10, fontSize:10, color:'rgba(255,255,255,0.12)', fontFamily:'Georgia,serif', letterSpacing:2 }}>{formation}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
