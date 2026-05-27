'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { FORMATIONS, FormationPosition } from './data/players';

/* ═══════════════ TYPES ═══════════════ */
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

interface FreePlayer {
  id: string;
  data: SlotData;
  x: number; // % on pitch
  y: number;
  isBench?: boolean; // sub players shown below their linked starter
  linkedTo?: string; // slot role they're subbing for
}

interface DrawnArrow { id: string; x1:number; y1:number; x2:number; y2:number; style: ArrowStyle; }
interface DrawnZone  { id: string; x:number; y:number; w:number; h:number; label:string; color:string; }
interface DrawnPath  { id: string; points:[number,number][]; color:string; }

interface SavedPlan {
  id: string; name: string; formation: string; teamName: string;
  lineup: Record<string, SlotData>; positions: Record<string, {x:number;y:number}>;
  freePlayers: FreePlayer[];
  arrows: DrawnArrow[]; zones: DrawnZone[]; paths: DrawnPath[];
  kitColor: string; kitPattern: KitPattern; savedAt: string;
}

/* ═══════════════ CONSTANTS ═══════════════ */
const POS_COLORS: Record<PosType, {bg:string;text:string;accent:string}> = {
  GK:  { bg:'#b45309', text:'#fef3c7', accent:'#f59e0b' },
  DEF: { bg:'#1e40af', text:'#dbeafe', accent:'#3b82f6' },
  MID: { bg:'#065f46', text:'#d1fae5', accent:'#10b981' },
  FWD: { bg:'#991b1b', text:'#fee2e2', accent:'#ef4444' },
};

const ARROW_STYLES: Record<ArrowStyle,{color:string;dash:string;label:string}> = {
  attack:  { color:'#ef4444', dash:'none',  label:'Hücum'    },
  defense: { color:'#3b82f6', dash:'6,3',   label:'Savunma'  },
  pass:    { color:'#10b981', dash:'none',   label:'Pas'      },
  press:   { color:'#f59e0b', dash:'4,4',   label:'Pressing' },
};

const ZONE_COLORS = ['#ef444433','#3b82f633','#10b98133','#f59e0b33','#a855f733'];
const ZONE_LABELS = ['Pressing','Savunma Bloğu','Hücum Üçgeni','Orta Alan','Özel Bölge'];

const SLOT_POS: Record<string,PosType> = {
  GK:'GK', LB:'DEF',RB:'DEF',CB1:'DEF',CB2:'DEF',CB3:'DEF',LCB:'DEF',RCB:'DEF',CB:'DEF',LWB:'DEF',RWB:'DEF',
  LM:'MID',RM:'MID',LCM:'MID',RCM:'MID',CM:'MID',DM:'MID',LDM:'MID',RDM:'MID',CAM:'MID',LAM:'MID',RAM:'MID',
  LW:'FWD',RW:'FWD',ST:'FWD',LST:'FWD',RST:'FWD',
};

const KIT_PATTERNS: Record<KitPattern,string> = {
  solid:'Düz', stripes:'Dikey Çizgi', hoops:'Yatay Çizgi', halves:'İki Renk', diagonal:'Diyagonal',
};

const LIGHT_COLORS = ['#ffffff','#f5c518','#fbbf24','#a3e635','#34d399','#e2e8f0','#fde68a'];

function uid() { return Math.random().toString(36).slice(2,9); }
function getInitials(n:string){ return n.trim().split(/\s+/).map((w:string)=>w[0]).join('').slice(0,2).toUpperCase(); }
function isLight(c:string){ return LIGHT_COLORS.includes(c); }

/* ═══════════════ FIFA FUT CARD ═══════════════ */
function FutCard({ data, size='md', glow=false, mini=false }:
  { data:SlotData; size?:'sm'|'md'|'lg'; glow?:boolean; mini?:boolean }) {
  const c = POS_COLORS[data.pos];
  const dim = size==='lg' ? 90 : size==='sm' ? 60 : 74;
  const fs  = size==='lg' ? 11 : size==='sm' ? 8  : 9;
  const nfs = size==='lg' ? 13 : size==='sm' ? 9  : 11;
  const nmaxw = size==='lg' ? 78 : size==='sm' ? 50 : 62;

  // kit pattern SVG fill
  const secondary = 'rgba(255,255,255,0.18)';
  const patternSVG = () => {
    if (data.kitPattern==='stripes') return <><rect x="20%" y="0" width="18%" height="100%" fill={secondary}/><rect x="50%" y="0" width="18%" height="100%" fill={secondary}/><rect x="80%" y="0" width="18%" height="100%" fill={secondary}/></>;
    if (data.kitPattern==='hoops')   return <><rect x="0" y="22%" width="100%" height="16%" fill={secondary}/><rect x="0" y="55%" width="100%" height="16%" fill={secondary}/></>;
    if (data.kitPattern==='halves')  return <rect x="50%" y="0" width="50%" height="100%" fill={secondary}/>;
    if (data.kitPattern==='diagonal')return <polygon points="100%,0 100%,100% 0,100%" fill={secondary}/>;
    return null;
  };

  if (mini) {
    return (
      <div style={{ width:dim*0.7, height:dim*0.7*1.35, borderRadius:5, background:`linear-gradient(160deg, ${c.bg} 0%, ${c.bg}dd 100%)`,
        border:`1.5px solid ${c.accent}88`, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
        flexShrink:0, overflow:'hidden', position:'relative', boxShadow: glow ? `0 0 10px ${c.accent}66` : `0 2px 6px rgba(0,0,0,0.5)` }}>
        <svg style={{position:'absolute',inset:0,width:'100%',height:'100%'}} viewBox="0 0 100 100" preserveAspectRatio="none">{patternSVG()}</svg>
        <div style={{position:'relative',zIndex:1,textAlign:'center',padding:'2px 3px'}}>
          <div style={{fontSize:fs*0.8,fontWeight:900,color:c.accent,lineHeight:1}}>{data.pos}</div>
          <div style={{fontSize:nfs*0.75,fontWeight:800,color:c.text,lineHeight:1.1,maxWidth:nmaxw*0.7,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{data.number?`#${data.number}`:''}</div>
          <div style={{fontSize:nfs*0.7,fontWeight:700,color:c.text,lineHeight:1.1,maxWidth:nmaxw*0.7,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{getInitials(data.name)}</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ width:dim, height:Math.round(dim*1.38), borderRadius:7, background:`linear-gradient(160deg, ${c.bg} 0%, ${c.bg}cc 60%, #0d1117 100%)`,
      border:`2px solid ${c.accent}99`, display:'flex', flexDirection:'column', alignItems:'center',
      flexShrink:0, overflow:'hidden', position:'relative',
      boxShadow: glow ? `0 0 18px ${c.accent}88, 0 4px 16px rgba(0,0,0,0.6)` : `0 4px 14px rgba(0,0,0,0.55)` }}>
      {/* Pattern overlay */}
      <svg style={{position:'absolute',inset:0,width:'100%',height:'100%'}} viewBox="0 0 100 100" preserveAspectRatio="none">{patternSVG()}</svg>
      {/* Shine */}
      <div style={{position:'absolute',top:0,left:0,right:0,height:'40%',background:'linear-gradient(180deg,rgba(255,255,255,0.12) 0%,transparent 100%)',pointerEvents:'none'}}/>
      
      <div style={{position:'relative',zIndex:1,width:'100%',display:'flex',flexDirection:'column',alignItems:'center',padding:`${fs-2}px ${fs-2}px 0`}}>
        {/* POS + number top row */}
        <div style={{width:'100%',display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:2}}>
          <span style={{fontSize:fs,fontWeight:900,color:c.accent,letterSpacing:0.5,lineHeight:1,textShadow:`0 1px 4px rgba(0,0,0,0.5)`}}>{data.pos}</span>
          {data.number && <span style={{fontSize:fs,fontWeight:800,color:'rgba(255,255,255,0.5)',lineHeight:1}}>{`#${data.number}`}</span>}
        </div>
        {/* Big initials circle */}
        <div style={{width:dim*0.52,height:dim*0.52,borderRadius:'50%',background:`radial-gradient(circle at 35% 35%, ${c.accent}55, ${c.bg}88)`,
          border:`1.5px solid ${c.accent}66`,display:'flex',alignItems:'center',justifyContent:'center',margin:`${fs-3}px 0`,flexShrink:0}}>
          <span style={{fontSize:dim*0.2,fontWeight:900,color:c.text,letterSpacing:1,textShadow:`0 2px 8px rgba(0,0,0,0.6)`}}>{getInitials(data.name)}</span>
        </div>
        {/* Name */}
        <div style={{width:'100%',background:'rgba(0,0,0,0.45)',borderRadius:3,padding:`2px ${fs-2}px`,textAlign:'center'}}>
          <div style={{fontSize:nfs,fontWeight:800,color:c.text,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis',maxWidth:nmaxw,letterSpacing:0.3,lineHeight:1.2}}>{data.name}</div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════ EDIT MODAL ═══════════════ */
function EditModal({ slotLabel, initial, onSave, onClose }:
  { slotLabel:string; initial:SlotData; onSave:(d:SlotData)=>void; onClose:()=>void }) {
  const [name,setName]           = useState(initial.name);
  const [pos,setPos]             = useState<PosType>(initial.pos);
  const [number,setNumber]       = useState(initial.number);
  const [kitColor,setKitColor]   = useState(initial.kitColor);
  const [kitPattern,setKitPattern] = useState<KitPattern>(initial.kitPattern);
  const [note,setNote]           = useState(initial.note||'');

  useEffect(()=>{ const fn=(e:KeyboardEvent)=>{ if(e.key==='Escape') onClose(); }; window.addEventListener('keydown',fn); return()=>window.removeEventListener('keydown',fn); },[onClose]);

  const preview: SlotData = { name:name.trim()||slotLabel, pos, number, kitColor, kitPattern, note };
  const KIT_COLS = ['#dc2626','#ea580c','#f59e0b','#16a34a','#2563eb','#7c3aed','#db2777','#0891b2','#111827','#ffffff','#6b7280','#f5c518'];

  return (
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.75)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:300,backdropFilter:'blur(6px)'}}
      onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
      <div style={{background:'#0d1117',border:'1px solid #30363d',borderRadius:14,padding:22,width:340,maxHeight:'90vh',overflowY:'auto',boxShadow:'0 24px 64px rgba(0,0,0,0.8)'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
          <div><div style={{fontSize:15,fontWeight:800,color:'#f0f6fc'}}>Oyuncu Düzenle</div>
            <div style={{fontSize:10,color:'#8b949e'}}>Pozisyon: <span style={{color:'#00ff87',fontWeight:700}}>{slotLabel}</span></div></div>
          <button onClick={onClose} style={{background:'#21262d',border:'none',color:'#8b949e',width:28,height:28,borderRadius:6,cursor:'pointer',fontSize:16}}>×</button>
        </div>
        {/* Live card preview */}
        <div style={{display:'flex',justifyContent:'center',marginBottom:16}}>
          <FutCard data={preview} size="lg" glow />
        </div>
        <label style={{fontSize:10,color:'#8b949e',fontWeight:700,display:'block',marginBottom:5}}>OYUNCU ADI *</label>
        <input autoFocus value={name} onChange={e=>setName(e.target.value)}
          onKeyDown={e=>{if(e.key==='Enter'&&name.trim()) onSave({name:name.trim(),pos,number,kitColor,kitPattern,note});}}
          placeholder="Örn. Ahmet Çelik"
          style={{width:'100%',background:'#21262d',border:'1px solid #30363d',borderRadius:7,padding:'9px 12px',color:'#f0f6fc',fontSize:13,fontWeight:600,outline:'none',boxSizing:'border-box',marginBottom:10}}/>
        <label style={{fontSize:10,color:'#8b949e',fontWeight:700,display:'block',marginBottom:5}}>FORMA NUMARASI</label>
        <input value={number} onChange={e=>setNumber(e.target.value.replace(/\D/g,'').slice(0,2))} placeholder="1–99" maxLength={2}
          style={{width:'100%',background:'#21262d',border:'1px solid #30363d',borderRadius:7,padding:'9px 12px',color:'#f0f6fc',fontSize:13,fontWeight:600,outline:'none',boxSizing:'border-box',marginBottom:10}}/>
        <label style={{fontSize:10,color:'#8b949e',fontWeight:700,display:'block',marginBottom:6}}>POZİSYON</label>
        <div style={{display:'flex',gap:5,marginBottom:12}}>
          {(['GK','DEF','MID','FWD'] as PosType[]).map(p=>{
            const c=POS_COLORS[p];
            return <button key={p} onClick={()=>setPos(p)} style={{flex:1,padding:'7px 0',background:pos===p?c.bg:'#21262d',color:pos===p?c.text:'#8b949e',border:pos===p?`1px solid ${c.accent}`:'1px solid transparent',borderRadius:6,fontSize:11,fontWeight:700,cursor:'pointer'}}>{p}</button>;
          })}
        </div>
        <label style={{fontSize:10,color:'#8b949e',fontWeight:700,display:'block',marginBottom:6}}>FORMA RENGİ</label>
        <div style={{display:'flex',flexWrap:'wrap',gap:6,marginBottom:10}}>
          {KIT_COLS.map(c=>(
            <div key={c} onClick={()=>setKitColor(c)} style={{width:22,height:22,borderRadius:'50%',background:c,cursor:'pointer',border:kitColor===c?'3px solid #00ff87':'2px solid transparent',boxSizing:'border-box',flexShrink:0}}/>
          ))}
          <input type="color" value={kitColor} onChange={e=>setKitColor(e.target.value)} style={{width:22,height:22,borderRadius:'50%',border:'none',cursor:'pointer',padding:0,background:'none'}}/>
        </div>
        <label style={{fontSize:10,color:'#8b949e',fontWeight:700,display:'block',marginBottom:6}}>FORMA DESENİ</label>
        <div style={{display:'flex',flexWrap:'wrap',gap:4,marginBottom:12}}>
          {(Object.keys(KIT_PATTERNS) as KitPattern[]).map(p=>(
            <button key={p} onClick={()=>setKitPattern(p)} style={{padding:'5px 8px',background:kitPattern===p?'#00ff87':'#21262d',color:kitPattern===p?'#000':'#8b949e',border:'none',borderRadius:5,fontSize:10,fontWeight:700,cursor:'pointer'}}>{KIT_PATTERNS[p]}</button>
          ))}
        </div>
        <label style={{fontSize:10,color:'#8b949e',fontWeight:700,display:'block',marginBottom:5}}>NOT / TALİMAT</label>
        <textarea value={note} onChange={e=>setNote(e.target.value)} placeholder="Özel talimat..." rows={2}
          style={{width:'100%',background:'#21262d',border:'1px solid #30363d',borderRadius:7,padding:'8px 12px',color:'#f0f6fc',fontSize:12,outline:'none',resize:'none',boxSizing:'border-box',marginBottom:16,fontFamily:'Inter,sans-serif'}}/>
        <div style={{display:'flex',gap:8}}>
          <button onClick={onClose} style={{flex:1,padding:'10px',background:'#21262d',border:'1px solid #30363d',color:'#8b949e',borderRadius:7,fontSize:13,fontWeight:600,cursor:'pointer'}}>İptal</button>
          <button onClick={()=>{if(name.trim()) onSave({name:name.trim(),pos,number,kitColor,kitPattern,note});}} disabled={!name.trim()}
            style={{flex:2,padding:'10px',background:name.trim()?'#00ff87':'#21262d',border:'none',color:name.trim()?'#000':'#8b949e',borderRadius:7,fontSize:13,fontWeight:700,cursor:name.trim()?'pointer':'not-allowed'}}>
            ✓ Kaydet
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════ SAVE/LOAD MODAL ═══════════════ */
function SaveLoadModal({ current, onLoad, onClose }:
  { current:Omit<SavedPlan,'id'|'savedAt'>; onLoad:(p:SavedPlan)=>void; onClose:()=>void }) {
  const [plans,setPlans] = useState<SavedPlan[]>([]);
  const [saveName,setSaveName] = useState(current.name||'Taktik Planım');
  const [tab,setTab] = useState<'save'|'load'>('save');
  useEffect(()=>{ try{ const r=localStorage.getItem('lineup_plans'); if(r) setPlans(JSON.parse(r)); }catch{} },[]);
  const savePlan=()=>{
    const plan:SavedPlan={...current,id:uid(),name:saveName.trim()||'İsimsiz Plan',savedAt:new Date().toLocaleString('tr-TR')};
    const updated=[plan,...plans.slice(0,19)]; localStorage.setItem('lineup_plans',JSON.stringify(updated)); setPlans(updated); setTab('load');
  };
  const del=(id:string)=>{ const u=plans.filter(p=>p.id!==id); localStorage.setItem('lineup_plans',JSON.stringify(u)); setPlans(u); };
  return (
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.75)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:300,backdropFilter:'blur(6px)'}}
      onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
      <div style={{background:'#0d1117',border:'1px solid #30363d',borderRadius:14,width:400,maxHeight:'80vh',display:'flex',flexDirection:'column',boxShadow:'0 24px 64px rgba(0,0,0,0.8)'}}>
        <div style={{padding:'16px 18px 12px',borderBottom:'1px solid #30363d',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div style={{fontSize:15,fontWeight:800,color:'#f0f6fc'}}>💾 Planlar</div>
          <button onClick={onClose} style={{background:'#21262d',border:'none',color:'#8b949e',width:28,height:28,borderRadius:6,cursor:'pointer',fontSize:16}}>×</button>
        </div>
        <div style={{display:'flex',borderBottom:'1px solid #30363d'}}>
          {(['save','load'] as const).map(t=>(
            <button key={t} onClick={()=>setTab(t)} style={{flex:1,padding:'9px',background:'none',border:'none',color:tab===t?'#00ff87':'#8b949e',fontSize:12,fontWeight:700,cursor:'pointer',borderBottom:tab===t?'2px solid #00ff87':'2px solid transparent'}}>
              {t==='save'?'💾 Kaydet':`📂 Yükle (${plans.length})`}
            </button>
          ))}
        </div>
        <div style={{flex:1,overflowY:'auto',padding:16}}>
          {tab==='save' && <>
            <label style={{fontSize:10,color:'#8b949e',fontWeight:700,display:'block',marginBottom:6}}>PLAN ADI</label>
            <input value={saveName} onChange={e=>setSaveName(e.target.value)} placeholder="Örn. Hafta Sonu Taktiği"
              style={{width:'100%',background:'#21262d',border:'1px solid #30363d',borderRadius:7,padding:'10px 12px',color:'#f0f6fc',fontSize:13,fontWeight:600,outline:'none',boxSizing:'border-box',marginBottom:14}}/>
            <button onClick={savePlan} style={{width:'100%',padding:'12px',background:'#00ff87',border:'none',color:'#000',borderRadius:8,fontSize:14,fontWeight:700,cursor:'pointer'}}>💾 Planı Kaydet</button>
          </>}
          {tab==='load' && (plans.length===0
            ? <div style={{textAlign:'center',color:'#8b949e',padding:'30px 0',fontSize:13}}>Kayıtlı plan yok</div>
            : plans.map(plan=>(
              <div key={plan.id} style={{background:'#21262d',borderRadius:8,padding:'11px 13px',marginBottom:8,border:'1px solid #30363d',display:'flex',alignItems:'center',gap:10}}>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:13,fontWeight:700,color:'#f0f6fc',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{plan.name}</div>
                  <div style={{fontSize:10,color:'#8b949e'}}>{plan.formation} · {Object.keys(plan.lineup).length} oyuncu · {plan.savedAt}</div>
                </div>
                <button onClick={()=>{onLoad(plan);onClose();}} style={{background:'#00ff87',border:'none',color:'#000',padding:'5px 10px',borderRadius:5,fontSize:11,fontWeight:700,cursor:'pointer',flexShrink:0}}>Yükle</button>
                <button onClick={()=>del(plan.id)} style={{background:'none',border:'none',color:'#ff4444',cursor:'pointer',fontSize:16,padding:'0 2px',flexShrink:0}}>×</button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════ DRAWING LAYER ═══════════════ */
function DrawingLayer({ arrows,zones,paths,activeTool,arrowStyle,zoneColor,zoneLabel,drawColor,
  onAddArrow,onAddZone,onAddPath,onDeleteArrow,onDeleteZone,onDeletePath }:
{ arrows:DrawnArrow[];zones:DrawnZone[];paths:DrawnPath[];
  activeTool:DrawTool;arrowStyle:ArrowStyle;zoneColor:string;zoneLabel:string;drawColor:string;
  onAddArrow:(a:DrawnArrow)=>void;onAddZone:(z:DrawnZone)=>void;onAddPath:(p:DrawnPath)=>void;
  onDeleteArrow:(id:string)=>void;onDeleteZone:(id:string)=>void;onDeletePath:(id:string)=>void; }) {
  const svgRef=useRef<SVGSVGElement>(null);
  const [drawing,setDrawing]=useState(false);
  const [start,setStart]=useState<[number,number]>([0,0]);
  const [current,setCurrent]=useState<[number,number]>([0,0]);
  const [pathPoints,setPathPoints]=useState<[number,number][]>([]);
  const toSvg=useCallback((e:React.PointerEvent)=>{
    const r=svgRef.current!.getBoundingClientRect();
    return [(e.clientX-r.left)/r.width*100,(e.clientY-r.top)/r.height*100] as [number,number];
  },[]);
  const onPD=(e:React.PointerEvent)=>{
    if(activeTool==='none') return; e.preventDefault();
    (e.target as Element).setPointerCapture(e.pointerId);
    const p=toSvg(e); setStart(p);setCurrent(p);setDrawing(true);
    if(activeTool==='freehand') setPathPoints([p]);
  };
  const onPM=(e:React.PointerEvent)=>{
    if(!drawing) return; const p=toSvg(e); setCurrent(p);
    if(activeTool==='freehand') setPathPoints(prev=>[...prev,p]);
  };
  const onPU=()=>{
    if(!drawing) return; setDrawing(false);
    if(activeTool==='arrow'){const dx=current[0]-start[0],dy=current[1]-start[1];if(Math.sqrt(dx*dx+dy*dy)>2) onAddArrow({id:uid(),x1:start[0],y1:start[1],x2:current[0],y2:current[1],style:arrowStyle});}
    else if(activeTool==='zone'){const x=Math.min(start[0],current[0]),y=Math.min(start[1],current[1]),w=Math.abs(current[0]-start[0]),h=Math.abs(current[1]-start[1]);if(w>2&&h>2) onAddZone({id:uid(),x,y,w,h,color:zoneColor,label:zoneLabel});}
    else if(activeTool==='freehand'&&pathPoints.length>2){onAddPath({id:uid(),points:pathPoints,color:drawColor});setPathPoints([]);}
  };
  const mkArrow=(a:DrawnArrow)=>{
    const st=ARROW_STYLES[a.style];
    const dx=a.x2-a.x1,dy=a.y2-a.y1,len=Math.sqrt(dx*dx+dy*dy);
    if(len<1) return null;
    const ux=dx/len,uy=dy/len,ex=a.x2-ux*1.5,ey=a.y2-uy*1.5,px=-uy*1.2,py=ux*1.2;
    return <g key={a.id}><line x1={a.x1} y1={a.y1} x2={ex} y2={ey} stroke={st.color} strokeWidth="0.8" strokeDasharray={st.dash} opacity="0.9"/>
      <polygon points={`${a.x2},${a.y2} ${ex+px},${ey+py} ${ex-px},${ey-py}`} fill={st.color} opacity="0.9"/>
      <line x1={a.x1} y1={a.y1} x2={a.x2} y2={a.y2} stroke="transparent" strokeWidth="3" style={{cursor:'pointer'}} onClick={()=>onDeleteArrow(a.id)}/></g>;
  };
  const pathD=(pts:[number,number][])=>pts.length<2?'': `M${pts[0][0]},${pts[0][1]} `+pts.slice(1).map(p=>`L${p[0]},${p[1]}`).join(' ');
  return (
    <svg ref={svgRef} viewBox="0 0 100 100" preserveAspectRatio="none"
      style={{position:'absolute',inset:0,width:'100%',height:'100%',zIndex:activeTool!=='none'?20:5,
        cursor:activeTool!=='none'?'crosshair':'default',pointerEvents:activeTool!=='none'?'all':'none'}}
      onPointerDown={onPD} onPointerMove={onPM} onPointerUp={onPU}>
      {zones.map(z=><g key={z.id}><rect x={z.x} y={z.y} width={z.w} height={z.h} fill={z.color} stroke={z.color.replace('33','99')} strokeWidth="0.5" rx="0.5" style={{cursor:'pointer'}} onClick={()=>activeTool==='none'&&onDeleteZone(z.id)}/>
        <text x={z.x+z.w/2} y={z.y+z.h/2} textAnchor="middle" dominantBaseline="middle" fontSize="2.5" fontWeight="700" fill={z.color.replace('33','ff')} fontFamily="Inter,sans-serif">{z.label}</text></g>)}
      {paths.map(p=><path key={p.id} d={pathD(p.points)} fill="none" stroke={p.color} strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.85" style={{cursor:'pointer'}} onClick={()=>activeTool==='none'&&onDeletePath(p.id)}/>)}
      {arrows.map(mkArrow)}
      {drawing&&activeTool==='arrow'&&<line x1={start[0]} y1={start[1]} x2={current[0]} y2={current[1]} stroke={ARROW_STYLES[arrowStyle].color} strokeWidth="0.8" opacity="0.7"/>}
      {drawing&&activeTool==='zone'&&<rect x={Math.min(start[0],current[0])} y={Math.min(start[1],current[1])} width={Math.abs(current[0]-start[0])} height={Math.abs(current[1]-start[1])} fill={zoneColor} stroke={zoneColor.replace('33','99')} strokeWidth="0.5" opacity="0.7"/>}
      {drawing&&activeTool==='freehand'&&pathPoints.length>1&&<path d={pathD(pathPoints)} fill="none" stroke={drawColor} strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.7"/>}
    </svg>
  );
}

/* ═══════════════ PITCH PLAYER CARD (freely draggable, with sub slot below) ═══════════════ */
function PitchCard({ slotRole, slotLabel, data, subData, x, y, pitchW, pitchH,
  onDragStartCard, onDropOnCard, isDragTarget, drawTool,
  onClick, onRemove, onAddSub, onEditSub, onRemoveSub, onDragStartSub }:
{ slotRole:string; slotLabel:string; data?:SlotData; subData?:SlotData;
  x:number; y:number; pitchW:number; pitchH:number;
  onDragStartCard:(e:React.DragEvent,role:string)=>void;
  onDropOnCard:(e:React.DragEvent,role:string)=>void;
  isDragTarget:boolean; drawTool:DrawTool;
  onClick:()=>void; onRemove:()=>void;
  onAddSub:()=>void; onEditSub:()=>void; onRemoveSub:()=>void;
  onDragStartSub:(e:React.DragEvent)=>void;
}) {
  const [hovered,setHovered]=useState(false);

  return (
    <div
      style={{ position:'absolute', left:`${x}%`, top:`${y}%`, transform:'translate(-50%,-50%)',
        display:'flex', flexDirection:'column', alignItems:'center', gap:3,
        zIndex: hovered ? 30 : 10, pointerEvents: drawTool!=='none' ? 'none' : 'auto' }}
      onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}
      onDragOver={e=>{e.preventDefault();}}
      onDrop={e=>onDropOnCard(e,slotRole)}
    >
      {/* STARTER CARD */}
      {data ? (
        <div draggable onDragStart={e=>onDragStartCard(e,slotRole)}
          onClick={onClick}
          style={{ cursor:'grab', filter: isDragTarget ? 'brightness(1.3)' : 'none',
            outline: isDragTarget ? '2px solid #00ff87' : 'none', outlineOffset:3, borderRadius:8 }}>
          <FutCard data={data} size="md" glow={hovered||isDragTarget}/>
        </div>
      ) : (
        <div onClick={onClick}
          onDragOver={e=>e.preventDefault()} onDrop={e=>onDropOnCard(e,slotRole)}
          style={{ width:74, height:102, borderRadius:8, background: isDragTarget?'rgba(0,255,135,0.12)':'rgba(255,255,255,0.05)',
            border:`2px dashed ${isDragTarget?'#00ff87':'rgba(255,255,255,0.2)'}`,
            display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:4,cursor:'pointer' }}>
          <span style={{fontSize:18,opacity:0.25}}>+</span>
          <span style={{fontSize:9,color:'rgba(255,255,255,0.3)',fontWeight:700}}>{slotLabel}</span>
        </div>
      )}

      {/* name tag + remove */}
      {data && (
        <div style={{ display:'flex', alignItems:'center', gap:3, background:'rgba(0,0,0,0.82)', backdropFilter:'blur(6px)',
          border:`1px solid ${POS_COLORS[data.pos].accent}55`, borderRadius:4, padding:'1px 6px', maxWidth:120 }}>
          <span style={{fontSize:9,color:'#f0f6fc',fontWeight:600,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{data.name}</span>
          <button onClick={e=>{e.stopPropagation();onRemove();}} style={{background:'none',border:'none',color:'#ff444488',cursor:'pointer',fontSize:11,padding:0,lineHeight:1,flexShrink:0}}
            onMouseEnter={e=>(e.currentTarget.style.color='#ff4444')} onMouseLeave={e=>(e.currentTarget.style.color='#ff444488')}>×</button>
        </div>
      )}

      {/* SUB SLOT */}
      {data && (
        subData ? (
          <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:2,marginTop:2}}>
            <div style={{fontSize:8,color:'#8b949e',fontWeight:700,letterSpacing:1}}>YEDEK</div>
            <div draggable onDragStart={onDragStartSub} onClick={onEditSub}
              style={{cursor:'grab',position:'relative'}}>
              <FutCard data={subData} size="sm" />
              <button onClick={e=>{e.stopPropagation();onRemoveSub();}}
                style={{position:'absolute',top:-4,right:-4,width:14,height:14,borderRadius:'50%',background:'#ff4444',border:'none',color:'#fff',cursor:'pointer',fontSize:9,padding:0,display:'flex',alignItems:'center',justifyContent:'center',lineHeight:1}}>×</button>
            </div>
          </div>
        ) : (
          <button onClick={onAddSub}
            style={{background:'rgba(0,0,0,0.5)',border:'1px dashed rgba(255,255,255,0.15)',borderRadius:5,padding:'3px 8px',fontSize:8,color:'rgba(255,255,255,0.3)',cursor:'pointer',display:'flex',alignItems:'center',gap:3,marginTop:2,transition:'all 0.15s'}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor='#00ff8788';e.currentTarget.style.color='#00ff87';}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,0.15)';e.currentTarget.style.color='rgba(255,255,255,0.3)';}}>
            <span style={{fontSize:10}}>+</span> Yedek
          </button>
        )
      )}
    </div>
  );
}

/* ═══════════════ MAIN APP ═══════════════ */
const DEFAULT_KIT: SlotData = { name:'', pos:'MID', number:'', kitColor:'#dc2626', kitPattern:'solid', note:'' };

export default function LineupBuilder() {
  const [formation,setFormation]         = useState('4-3-3');
  const [lineup,setLineup]               = useState<Record<string,SlotData>>({});
  const [subs,setSubs]                   = useState<Record<string,SlotData>>({}); // slotRole → sub player
  const [positions,setPositions]         = useState<Record<string,{x:number;y:number}>>({}); // overridden free positions
  const [editSlot,setEditSlot]           = useState<string|null>(null);
  const [editSubSlot,setEditSubSlot]     = useState<string|null>(null); // slot role whose sub is being edited
  const [addSubSlot,setAddSubSlot]       = useState<string|null>(null); // slot to add NEW sub for
  const [dragRole,setDragRole]           = useState<string|null>(null); // pitch slot being dragged
  const [dragOverRole,setDragOverRole]   = useState<string|null>(null);
  const [dragSubRole,setDragSubRole]     = useState<string|null>(null); // sub being dragged
  const [teamName,setTeamName]           = useState('Takımım');
  const [sidebarTab,setSidebarTab]       = useState<'lineup'|'draw'|'kit'>('lineup');
  const [globalKit,setGlobalKit]         = useState<{color:string;pattern:KitPattern}>({color:'#dc2626',pattern:'solid'});
  const [showSaveLoad,setShowSaveLoad]   = useState(false);
  const [drawTool,setDrawTool]           = useState<DrawTool>('none');
  const [arrowStyle,setArrowStyle]       = useState<ArrowStyle>('attack');
  const [arrows,setArrows]               = useState<DrawnArrow[]>([]);
  const [zones,setZones]                 = useState<DrawnZone[]>([]);
  const [paths,setPaths]                 = useState<DrawnPath[]>([]);
  const [zoneIdx,setZoneIdx]             = useState(0);
  const [drawColor,setDrawColor]         = useState('#ffffff');
  const pitchRef                         = useRef<HTMLDivElement>(null);
  const [pitchRect,setPitchRect]         = useState({w:700,h:900});

  const curF = FORMATIONS[formation];

  // Free position of a slot: use override if dragged, else formation default
  const slotPos = useCallback((role:string):{x:number;y:number} => {
    if (positions[role]) return positions[role];
    const s = curF.positions.find(p=>p.role===role);
    return s ? {x:s.x, y:s.y} : {x:50,y:50};
  },[positions,curF]);

  // Persist
  useEffect(()=>{
    localStorage.setItem('lineup_autosave',JSON.stringify({formation,lineup,subs,positions,teamName,arrows,zones,paths,globalKit}));
  },[formation,lineup,subs,positions,teamName,arrows,zones,paths,globalKit]);

  useEffect(()=>{
    try{
      const r=localStorage.getItem('lineup_autosave');
      if(r){const s=JSON.parse(r);
        if(s.formation) setFormation(s.formation);
        if(s.lineup)    setLineup(s.lineup);
        if(s.subs)      setSubs(s.subs);
        if(s.positions) setPositions(s.positions);
        if(s.teamName)  setTeamName(s.teamName);
        if(s.arrows)    setArrows(s.arrows);
        if(s.zones)     setZones(s.zones);
        if(s.paths)     setPaths(s.paths);
        if(s.globalKit) setGlobalKit(s.globalKit);
      }
    }catch{}
  },[]);

  // Track pitch size
  useEffect(()=>{
    const obs=new ResizeObserver(entries=>{
      for(const e of entries) setPitchRect({w:e.contentRect.width,h:e.contentRect.height});
    });
    if(pitchRef.current) obs.observe(pitchRef.current);
    return()=>obs.disconnect();
  },[]);

  // Formation change: remap positions, clear custom pos overrides
  const handleFormationChange=(f:string)=>{
    const newSlots=FORMATIONS[f].positions.map(p=>p.role);
    const oldSlots=curF.positions;
    const newLineup:Record<string,SlotData>={};
    const newSubs:Record<string,SlotData>={};
    newSlots.forEach((role,i)=>{
      const old=oldSlots[i];
      if(old&&lineup[old.role]) newLineup[role]=lineup[old.role];
      if(old&&subs[old.role])   newSubs[role]=subs[old.role];
    });
    setLineup(newLineup); setSubs(newSubs);
    setPositions({}); setFormation(f);
  };

  // FREE DRAG: pointer-based move on pitch
  const draggingRole=useRef<string|null>(null);
  const dragOffset=useRef<{ox:number;oy:number}>({ox:0,oy:0});

  const handleCardPointerDown=(e:React.PointerEvent,role:string)=>{
    if(drawTool!=='none') return;
    // Only initiate free-drag on middle mouse or with explicit drag handle
    // We use HTML5 drag for swap, pointer for free position
  };

  // HTML5 drag for SWAP between slots
  const handleDragStartCard=(e:React.DragEvent,role:string)=>{
    if(drawTool!=='none'){e.preventDefault();return;}
    e.dataTransfer.effectAllowed='move';
    setDragRole(role); setDragSubRole(null);
  };

  const handleDragStartSub=(e:React.DragEvent,role:string)=>{
    if(drawTool!=='none'){e.preventDefault();return;}
    e.dataTransfer.effectAllowed='move';
    setDragSubRole(role); setDragRole(null);
  };

  const handleDropOnCard=(e:React.DragEvent,targetRole:string)=>{
    e.preventDefault(); setDragOverRole(null);
    if(dragRole && dragRole!==targetRole){
      // Swap two starter positions
      setLineup(prev=>{
        const n={...prev};
        const a=n[dragRole]; const b=n[targetRole];
        if(a) n[targetRole]=a; else delete n[targetRole];
        if(b) n[dragRole]=b;  else delete n[dragRole];
        return n;
      });
      // Also swap subs
      setSubs(prev=>{
        const n={...prev};
        const a=n[dragRole]; const b=n[targetRole];
        if(a) n[targetRole]=a; else delete n[targetRole];
        if(b) n[dragRole]=b;  else delete n[dragRole];
        return n;
      });
      setDragRole(null);
    } else if(dragSubRole){
      // Sub dropped onto a starter slot → make sub the starter, push starter to that sub slot
      const sub=subs[dragSubRole];
      if(!sub){setDragSubRole(null);return;}
      const existing=lineup[targetRole];
      setLineup(prev=>({...prev,[targetRole]:sub}));
      if(existing) setSubs(prev=>({...prev,[dragSubRole]:existing,[targetRole]:undefined as unknown as SlotData}));
      else setSubs(prev=>{const n={...prev};delete n[dragSubRole];return n;});
      setDragSubRole(null);
    }
  };

  // FREE POSITION drag: use pitch onMouseMove while a card is being pointer-dragged
  // We implement free move with a dedicated drag overlay using onDragOver on pitch
  const [freeDragActive,setFreeDragActive]=useState(false);

  const handlePitchDragOver=(e:React.DragEvent)=>{
    e.preventDefault();
    if(!dragRole||!pitchRef.current) return;
    const r=pitchRef.current.getBoundingClientRect();
    const x=Math.max(4,Math.min(96,(e.clientX-r.left)/r.width*100));
    const y=Math.max(4,Math.min(96,(e.clientY-r.top)/r.height*100));
    setPositions(prev=>({...prev,[dragRole]:{x,y}}));
  };

  const handlePitchDrop=(e:React.DragEvent)=>{
    e.preventDefault();
    if(!dragRole||!pitchRef.current) return;
    const r=pitchRef.current.getBoundingClientRect();
    const x=Math.max(4,Math.min(96,(e.clientX-r.left)/r.width*100));
    const y=Math.max(4,Math.min(96,(e.clientY-r.top)/r.height*100));
    setPositions(prev=>({...prev,[dragRole]:{x,y}}));
    setDragRole(null);
  };

  const clearAll=()=>{setLineup({});setSubs({});setPositions({});setArrows([]);setZones([]);setPaths([]);};
  const resetPositions=()=>setPositions({});
  const applyGlobalKit=()=>{
    setLineup(prev=>Object.fromEntries(Object.entries(prev).map(([k,v])=>[k,{...v,kitColor:globalKit.color,kitPattern:globalKit.pattern}])));
    setSubs(prev=>Object.fromEntries(Object.entries(prev).map(([k,v])=>[k,{...v,kitColor:globalKit.color,kitPattern:globalKit.pattern}])));
  };

  const filledCount=Object.keys(lineup).length;
  const totalSlots=curF.positions.length;
  const subsCount=Object.keys(subs).length;

  const currentPlanData:Omit<SavedPlan,'id'|'savedAt'>={
    name:teamName, formation, teamName, lineup, positions, freePlayers:[], arrows, zones, paths, kitColor:globalKit.color, kitPattern:globalKit.pattern,
  };

  const loadPlan=(plan:SavedPlan)=>{
    setFormation(plan.formation); setLineup(plan.lineup);
    setPositions(plan.positions||{}); setTeamName(plan.teamName);
    setArrows(plan.arrows||[]); setZones(plan.zones||[]); setPaths(plan.paths||[]);
    if(plan.kitColor) setGlobalKit({color:plan.kitColor,pattern:plan.kitPattern||'solid'});
  };

  const KIT_COLS=['#dc2626','#ea580c','#f59e0b','#16a34a','#2563eb','#7c3aed','#db2777','#0891b2','#111827','#ffffff','#6b7280','#f5c518'];

  return (
    <div style={{display:'flex',height:'100vh',overflow:'hidden',background:'#0a0e14',fontFamily:"'Inter',sans-serif",color:'#f0f6fc'}}>

      {/* MODALS */}
      {editSlot && (() => { const s=curF.positions.find(p=>p.role===editSlot); return s?(
        <EditModal slotLabel={s.label}
          initial={lineup[editSlot]||{...DEFAULT_KIT,pos:SLOT_POS[editSlot]||'MID',kitColor:globalKit.color,kitPattern:globalKit.pattern}}
          onSave={d=>{setLineup(prev=>({...prev,[editSlot]:d}));setEditSlot(null);}}
          onClose={()=>setEditSlot(null)}/>
      ):null; })()}
      {addSubSlot && (
        <EditModal slotLabel="Yedek"
          initial={{...DEFAULT_KIT,pos:SLOT_POS[addSubSlot]||'MID',kitColor:globalKit.color,kitPattern:globalKit.pattern}}
          onSave={d=>{setSubs(prev=>({...prev,[addSubSlot]:d}));setAddSubSlot(null);}}
          onClose={()=>setAddSubSlot(null)}/>
      )}
      {editSubSlot && subs[editSubSlot] && (
        <EditModal slotLabel="Yedek"
          initial={subs[editSubSlot]}
          onSave={d=>{setSubs(prev=>({...prev,[editSubSlot]:d}));setEditSubSlot(null);}}
          onClose={()=>setEditSubSlot(null)}/>
      )}
      {showSaveLoad && <SaveLoadModal current={currentPlanData} onLoad={loadPlan} onClose={()=>setShowSaveLoad(false)}/>}

      {/* LEFT SIDEBAR */}
      <div style={{width:256,background:'#0d1117',borderRight:'1px solid #21262d',display:'flex',flexDirection:'column',flexShrink:0}}>
        <div style={{padding:'14px 14px 12px',borderBottom:'1px solid #21262d'}}>
          <div style={{display:'flex',alignItems:'center',gap:9,marginBottom:12}}>
            <div style={{width:36,height:36,background:'linear-gradient(135deg,#00ff87,#00cc6e)',borderRadius:9,display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,boxShadow:'0 4px 12px rgba(0,255,135,0.3)',flexShrink:0}}>⚽</div>
            <div>
              <div style={{fontSize:13,fontWeight:800,color:'#f0f6fc',letterSpacing:1.5,fontFamily:'Georgia,serif'}}>LINEUP BUILDER</div>
              <div style={{fontSize:9,color:'#8b949e'}}>FIFA FUT Taktik Aracı</div>
            </div>
          </div>
          <input value={teamName} onChange={e=>setTeamName(e.target.value)} placeholder="Takım adı..."
            style={{width:'100%',background:'#161b22',border:'1px solid #21262d',borderRadius:6,padding:'7px 10px',color:'#f0f6fc',fontSize:13,fontWeight:600,outline:'none',marginBottom:10,boxSizing:'border-box'}}/>
          <div style={{fontSize:9,color:'#8b949e',fontWeight:700,marginBottom:5}}>FORMASYON</div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:3,marginBottom:10}}>
            {Object.keys(FORMATIONS).map(f=>(
              <button key={f} onClick={()=>handleFormationChange(f)} style={{background:formation===f?'#00ff87':'#161b22',color:formation===f?'#000':'#8b949e',border:'none',borderRadius:4,padding:'4px 1px',fontSize:9,fontWeight:700,cursor:'pointer'}}>{f}</button>
            ))}
          </div>
          <div style={{display:'flex',gap:4,marginBottom:10}}>
            {[{v:filledCount,l:'İLK 11',c:'#00ff87'},{v:subsCount,l:'YEDEK',c:'#f59e0b'},{v:totalSlots-filledCount,l:'BOŞ',c:'#8b949e'}].map(s=>(
              <div key={s.l} style={{flex:1,background:'#161b22',borderRadius:5,padding:'5px 3px',textAlign:'center',border:'1px solid #21262d'}}>
                <div style={{fontSize:15,fontWeight:700,color:s.c}}>{s.v}</div>
                <div style={{fontSize:7,color:'#8b949e'}}>{s.l}</div>
              </div>
            ))}
          </div>
          <div style={{display:'flex',gap:5}}>
            <button onClick={()=>setShowSaveLoad(true)} style={{flex:1,background:'#161b22',border:'1px solid #21262d',color:'#f0f6fc',padding:'6px 4px',borderRadius:6,fontSize:10,fontWeight:700,cursor:'pointer'}}>💾 Kaydet</button>
            <button onClick={resetPositions} style={{flex:1,background:'#161b22',border:'1px solid #21262d',color:'#8b949e',padding:'6px 4px',borderRadius:6,fontSize:10,fontWeight:700,cursor:'pointer'}}>↺ Sıfırla</button>
            <button onClick={clearAll} style={{flex:1,background:'#161b22',border:'1px solid #ff444422',color:'#ff4444',padding:'6px 4px',borderRadius:6,fontSize:10,fontWeight:700,cursor:'pointer'}}>🗑 Temizle</button>
          </div>
        </div>

        {/* TABS */}
        <div style={{display:'flex',borderBottom:'1px solid #21262d'}}>
          {([['lineup','👥'],['draw','✏️'],['kit','🎨']] as const).map(([tab,ico])=>(
            <button key={tab} onClick={()=>setSidebarTab(tab)} style={{flex:1,padding:'8px 2px',background:'none',border:'none',color:sidebarTab===tab?'#00ff87':'#8b949e',fontSize:10,fontWeight:700,cursor:'pointer',borderBottom:sidebarTab===tab?'2px solid #00ff87':'2px solid transparent'}}>
              {ico} {tab==='lineup'?'Kadro':tab==='draw'?'Çizim':'Forma'}
            </button>
          ))}
        </div>

        {/* LINEUP TAB */}
        {sidebarTab==='lineup' && (
          <div style={{flex:1,overflowY:'auto',padding:8}}>
            {curF.positions.map(slot=>{
              const p=lineup[slot.role]; const sub=subs[slot.role];
              const c=p?POS_COLORS[p.pos]:{bg:'#161b22',text:'#8b949e',accent:'#21262d'};
              return (
                <div key={slot.role} style={{marginBottom:4}}>
                  <div onClick={()=>setEditSlot(slot.role)}
                    style={{display:'flex',alignItems:'center',gap:7,padding:'7px 8px',borderRadius:7,cursor:'pointer',background:p?'#161b22':'#0f1318',border:`1px solid ${p?c.accent+'44':'#21262d'}`,transition:'all 0.1s'}}
                    onMouseEnter={e=>(e.currentTarget.style.borderColor='#00ff8766')}
                    onMouseLeave={e=>(e.currentTarget.style.borderColor=p?c.accent+'44':'#21262d')}>
                    <div style={{width:22,fontSize:7,fontWeight:700,color:c.text,background:c.bg,borderRadius:3,padding:'2px 3px',textAlign:'center',flexShrink:0}}>{slot.label}</div>
                    {p ? <>
                      <FutCard data={p} size="sm"/>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontSize:11,fontWeight:600,color:'#f0f6fc',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{p.name}</div>
                        {p.note&&<div style={{fontSize:9,color:'#8b949e',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{p.note}</div>}
                      </div>
                      <button onClick={e=>{e.stopPropagation();setLineup(prev=>{const n={...prev};delete n[slot.role];return n;});}} style={{background:'none',border:'none',color:'#ff444488',cursor:'pointer',fontSize:13,padding:'0 1px',flexShrink:0}}>×</button>
                    </> : <div style={{flex:1,fontSize:11,color:'#8b949e'}}><span style={{color:'#00ff87'}}>+</span> Oyuncu ekle</div>}
                  </div>
                  {/* Sub row */}
                  {p && (
                    <div style={{display:'flex',alignItems:'center',gap:5,padding:'3px 8px 3px 30px'}}>
                      <div style={{width:1,height:20,background:'#21262d',flexShrink:0}}/>
                      {sub ? (
                        <div onClick={()=>setEditSubSlot(slot.role)} style={{display:'flex',alignItems:'center',gap:5,flex:1,cursor:'pointer',padding:'2px 4px',borderRadius:4,background:'#0f1318',border:'1px solid #21262d'}}
                          onMouseEnter={e=>(e.currentTarget.style.background='#161b22')}
                          onMouseLeave={e=>(e.currentTarget.style.background='#0f1318')}>
                          <FutCard data={sub} size="sm" mini/>
                          <div style={{flex:1,minWidth:0}}>
                            <div style={{fontSize:10,color:'#8b949e',fontWeight:600,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{sub.name}</div>
                          </div>
                          <button onClick={e=>{e.stopPropagation();setSubs(prev=>{const n={...prev};delete n[slot.role];return n;});}} style={{background:'none',border:'none',color:'#ff444488',cursor:'pointer',fontSize:12,padding:0}}>×</button>
                        </div>
                      ) : (
                        <button onClick={()=>setAddSubSlot(slot.role)} style={{fontSize:9,color:'#8b949e',background:'none',border:'1px dashed #21262d',borderRadius:4,padding:'2px 8px',cursor:'pointer'}}
                          onMouseEnter={e=>{e.currentTarget.style.color='#00ff87';e.currentTarget.style.borderColor='#00ff8766';}}
                          onMouseLeave={e=>{e.currentTarget.style.color='#8b949e';e.currentTarget.style.borderColor='#21262d';}}>+ Yedek ekle</button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* DRAW TAB */}
        {sidebarTab==='draw' && (
          <div style={{flex:1,overflowY:'auto',padding:12}}>
            <div style={{fontSize:10,color:'#8b949e',fontWeight:700,marginBottom:8}}>ÇİZİM ARACI</div>
            {([['none','🚫 Kapalı'],['arrow','→ Ok Çiz'],['zone','□ Bölge'],['freehand','✏️ Serbest']] as const).map(([t,l])=>(
              <button key={t} onClick={()=>setDrawTool(t)} style={{width:'100%',padding:'8px 12px',background:drawTool===t?'#161b22':'transparent',color:drawTool===t?'#00ff87':'#8b949e',border:drawTool===t?'1px solid #00ff8744':'1px solid transparent',borderRadius:7,fontSize:12,fontWeight:700,cursor:'pointer',textAlign:'left',marginBottom:3}}>
                {l}{drawTool===t&&<span style={{float:'right'}}>●</span>}
              </button>
            ))}
            {drawTool==='arrow' && <>
              <div style={{fontSize:10,color:'#8b949e',fontWeight:700,margin:'12px 0 7px'}}>OK TÜRÜ</div>
              {(Object.entries(ARROW_STYLES) as [ArrowStyle,typeof ARROW_STYLES[ArrowStyle]][]).map(([k,st])=>(
                <button key={k} onClick={()=>setArrowStyle(k)} style={{width:'100%',display:'flex',alignItems:'center',gap:8,padding:'7px 10px',background:arrowStyle===k?'#161b22':'transparent',border:arrowStyle===k?`1px solid ${st.color}44`:'1px solid transparent',borderRadius:6,cursor:'pointer',marginBottom:3}}>
                  <div style={{width:24,height:3,background:st.color,borderRadius:2,flexShrink:0}}/><span style={{fontSize:11,color:arrowStyle===k?'#f0f6fc':'#8b949e',fontWeight:600}}>{st.label}</span>
                </button>
              ))}
            </>}
            {drawTool==='zone' && <>
              <div style={{fontSize:10,color:'#8b949e',fontWeight:700,margin:'12px 0 7px'}}>BÖLGE TÜRÜ</div>
              {ZONE_LABELS.map((l,i)=>(
                <button key={i} onClick={()=>setZoneIdx(i)} style={{width:'100%',display:'flex',alignItems:'center',gap:8,padding:'7px 10px',background:zoneIdx===i?'#161b22':'transparent',border:zoneIdx===i?'1px solid #30363d':'1px solid transparent',borderRadius:6,cursor:'pointer',marginBottom:3}}>
                  <div style={{width:14,height:14,borderRadius:3,background:ZONE_COLORS[i],border:`1px solid ${ZONE_COLORS[i].replace('33','99')}`,flexShrink:0}}/><span style={{fontSize:11,color:zoneIdx===i?'#f0f6fc':'#8b949e',fontWeight:600}}>{l}</span>
                </button>
              ))}
            </>}
            {drawTool==='freehand' && <>
              <div style={{fontSize:10,color:'#8b949e',fontWeight:700,margin:'12px 0 7px'}}>RENK</div>
              <div style={{display:'flex',flexWrap:'wrap',gap:6}}>
                {['#ffffff','#ff4444','#00ff87','#f59e0b','#3b82f6','#a855f7'].map(c=>(
                  <div key={c} onClick={()=>setDrawColor(c)} style={{width:22,height:22,borderRadius:'50%',background:c,cursor:'pointer',border:drawColor===c?'3px solid #fff':'2px solid transparent',boxSizing:'border-box'}}/>
                ))}
              </div>
            </>}
            {(arrows.length>0||zones.length>0||paths.length>0)&&(
              <button onClick={()=>{setArrows([]);setZones([]);setPaths([]);}} style={{width:'100%',marginTop:16,padding:'8px',background:'transparent',border:'1px solid #ff444433',color:'#ff4444',borderRadius:6,fontSize:11,fontWeight:700,cursor:'pointer'}}>
                🗑 Tüm Çizimleri Sil
              </button>
            )}
          </div>
        )}

        {/* KIT TAB */}
        {sidebarTab==='kit' && (
          <div style={{flex:1,overflowY:'auto',padding:12}}>
            <div style={{fontSize:10,color:'#8b949e',fontWeight:700,marginBottom:8}}>TAKIM FORMASI</div>
            <div style={{display:'flex',justifyContent:'center',gap:8,marginBottom:14,background:'#161b22',borderRadius:10,padding:'14px 0',border:'1px solid #21262d'}}>
              {(['GK','DEF','MID','FWD'] as PosType[]).map(pos=>(
                <div key={pos} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:4}}>
                  <FutCard data={{...DEFAULT_KIT,name:pos,pos,kitColor:globalKit.color,kitPattern:globalKit.pattern}} size="sm"/>
                </div>
              ))}
            </div>
            <div style={{fontSize:10,color:'#8b949e',fontWeight:700,marginBottom:6}}>FORMA RENGİ</div>
            <div style={{display:'flex',flexWrap:'wrap',gap:6,marginBottom:14}}>
              {KIT_COLS.map(c=>(
                <div key={c} onClick={()=>setGlobalKit(prev=>({...prev,color:c}))} style={{width:24,height:24,borderRadius:'50%',background:c,cursor:'pointer',border:globalKit.color===c?'3px solid #00ff87':'2px solid transparent',boxSizing:'border-box',flexShrink:0}}/>
              ))}
              <input type="color" value={globalKit.color} onChange={e=>setGlobalKit(prev=>({...prev,color:e.target.value}))} style={{width:24,height:24,borderRadius:'50%',border:'none',cursor:'pointer',padding:0,background:'none'}}/>
            </div>
            <div style={{fontSize:10,color:'#8b949e',fontWeight:700,marginBottom:6}}>FORMA DESENİ</div>
            <div style={{display:'flex',flexDirection:'column',gap:4,marginBottom:14}}>
              {(Object.entries(KIT_PATTERNS) as [KitPattern,string][]).map(([k,v])=>(
                <button key={k} onClick={()=>setGlobalKit(prev=>({...prev,pattern:k}))} style={{padding:'8px 12px',background:globalKit.pattern===k?'#161b22':'transparent',color:globalKit.pattern===k?'#00ff87':'#8b949e',border:globalKit.pattern===k?'1px solid #00ff8744':'1px solid transparent',borderRadius:6,fontSize:11,fontWeight:700,cursor:'pointer',textAlign:'left'}}>
                  {v}{globalKit.pattern===k&&<span style={{float:'right'}}>✓</span>}
                </button>
              ))}
            </div>
            <button onClick={applyGlobalKit} style={{width:'100%',padding:'10px',background:'#00ff87',border:'none',color:'#000',borderRadius:8,fontSize:12,fontWeight:700,cursor:'pointer'}}>✨ Tüm Oyunculara Uygula</button>
          </div>
        )}
      </div>

      {/* MAIN PITCH AREA */}
      <div style={{flex:1,display:'flex',flexDirection:'column',overflow:'hidden',background:'#0a0e14'}}>
        {/* Topbar */}
        <div style={{padding:'9px 18px',borderBottom:'1px solid #21262d',display:'flex',alignItems:'center',justifyContent:'space-between',background:'#0d1117',flexShrink:0}}>
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <h1 style={{fontSize:19,fontWeight:800,color:'#f0f6fc',letterSpacing:2,fontFamily:'Georgia,serif',margin:0}}>{teamName.toUpperCase()||'TAKIMIM'}</h1>
            <span style={{background:'#161b22',color:'#00ff87',padding:'3px 9px',borderRadius:20,fontSize:11,fontWeight:700,border:'1px solid #00ff8733'}}>{formation}</span>
            <span style={{fontSize:11,color:'#8b949e'}}>{filledCount}/{totalSlots} oyuncu · {subsCount} yedek</span>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:8}}>
            {drawTool!=='none' && <div style={{background:'#f59e0b22',border:'1px solid #f59e0b55',borderRadius:6,padding:'4px 10px',fontSize:10,color:'#f59e0b',fontWeight:700}}>✏️ Çizim aktif — oyuncu taşımak için kapat</div>}
            <button onClick={()=>setShowSaveLoad(true)} style={{background:'#161b22',border:'1px solid #21262d',color:'#f0f6fc',padding:'6px 12px',borderRadius:6,fontSize:11,fontWeight:600,cursor:'pointer'}}>💾 Planlar</button>
          </div>
        </div>

        {/* PITCH */}
        <div style={{flex:1,overflow:'hidden',position:'relative',display:'flex',alignItems:'stretch'}}>
          <div ref={pitchRef}
            style={{flex:1,position:'relative',overflow:'hidden'}}
            onDragOver={handlePitchDragOver}
            onDrop={handlePitchDrop}>
            {/* Grass stripes */}
            <div style={{position:'absolute',inset:0,background:'repeating-linear-gradient(0deg,#162a16 0px,#162a16 44px,#1a3119 44px,#1a3119 88px)'}}/>
            {/* Subtle vignette */}
            <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at 50% 50%, transparent 60%, rgba(0,0,0,0.35) 100%)',pointerEvents:'none',zIndex:2}}/>
            {/* Pitch lines */}
            <svg style={{position:'absolute',inset:0,width:'100%',height:'100%',zIndex:1}} viewBox="0 0 100 100" preserveAspectRatio="none">
              <rect x="3" y="2" width="94" height="96" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="0.35"/>
              <line x1="3" y1="50" x2="97" y2="50" stroke="rgba(255,255,255,0.45)" strokeWidth="0.3"/>
              <circle cx="50" cy="50" r="10" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="0.3"/>
              <circle cx="50" cy="50" r="0.6" fill="rgba(255,255,255,0.5)"/>
              {/* Top box */}
              <rect x="22" y="2" width="56" height="17" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.3"/>
              <rect x="35" y="2" width="30" height="7" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.3"/>
              <circle cx="50" cy="13" r="0.5" fill="rgba(255,255,255,0.4)"/>
              {/* Bottom box */}
              <rect x="22" y="81" width="56" height="17" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.3"/>
              <rect x="35" y="91" width="30" height="7" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.3"/>
              <circle cx="50" cy="87" r="0.5" fill="rgba(255,255,255,0.4)"/>
              {/* Goals */}
              <rect x="40" y="0" width="20" height="2" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.4)" strokeWidth="0.25"/>
              <rect x="40" y="98" width="20" height="2" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.4)" strokeWidth="0.25"/>
            </svg>

            {/* Drawing layer */}
            <DrawingLayer arrows={arrows} zones={zones} paths={paths}
              activeTool={drawTool} arrowStyle={arrowStyle}
              zoneColor={ZONE_COLORS[zoneIdx]} zoneLabel={ZONE_LABELS[zoneIdx]} drawColor={drawColor}
              onAddArrow={a=>setArrows(prev=>[...prev,a])}
              onAddZone={z=>setZones(prev=>[...prev,z])}
              onAddPath={p=>setPaths(prev=>[...prev,p])}
              onDeleteArrow={id=>setArrows(prev=>prev.filter(a=>a.id!==id))}
              onDeleteZone={id=>setZones(prev=>prev.filter(z=>z.id!==id))}
              onDeletePath={id=>setPaths(prev=>prev.filter(p=>p.id!==id))}/>

            {/* Player cards */}
            {curF.positions.map(slot=>{
              const pos=slotPos(slot.role);
              return (
                <PitchCard key={slot.role}
                  slotRole={slot.role} slotLabel={slot.label}
                  data={lineup[slot.role]} subData={subs[slot.role]}
                  x={pos.x} y={pos.y}
                  pitchW={pitchRect.w} pitchH={pitchRect.h}
                  onDragStartCard={handleDragStartCard}
                  onDropOnCard={handleDropOnCard}
                  isDragTarget={dragOverRole===slot.role}
                  drawTool={drawTool}
                  onClick={()=>drawTool==='none'&&setEditSlot(slot.role)}
                  onRemove={()=>setLineup(prev=>{const n={...prev};delete n[slot.role];return n;})}
                  onAddSub={()=>setAddSubSlot(slot.role)}
                  onEditSub={()=>setEditSubSlot(slot.role)}
                  onRemoveSub={()=>setSubs(prev=>{const n={...prev};delete n[slot.role];return n;})}
                  onDragStartSub={e=>handleDragStartSub(e,slot.role)}
                />
              );
            })}

            {/* Watermarks */}
            <div style={{position:'absolute',bottom:8,right:12,fontSize:10,color:'rgba(255,255,255,0.1)',fontFamily:'Georgia,serif',letterSpacing:2,zIndex:3,pointerEvents:'none'}}>{formation}</div>
            <div style={{position:'absolute',top:6,left:0,right:0,textAlign:'center',fontSize:12,color:'rgba(255,255,255,0.08)',fontFamily:'Georgia,serif',letterSpacing:4,zIndex:3,pointerEvents:'none'}}>{teamName.toUpperCase()}</div>
            {drawTool==='none' && filledCount===0 && (
              <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',zIndex:4,pointerEvents:'none'}}>
                <div style={{textAlign:'center',opacity:0.4}}>
                  <div style={{fontSize:40,marginBottom:8}}>⚽</div>
                  <div style={{fontSize:14,color:'#f0f6fc',fontWeight:600}}>Soldaki kadro listesinden oyuncu ekle</div>
                  <div style={{fontSize:11,color:'#8b949e',marginTop:4}}>veya sahadaki + ikonlarına tıkla</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Hint bar */}
        <div style={{padding:'5px 16px',background:'#0d1117',borderTop:'1px solid #21262d',display:'flex',gap:16,flexShrink:0}}>
          {[['🖱️ Sürükle','Oyuncuyu istediğin yere taşı'],['🔄 Karta Bırak','İki oyuncuyu yer değiştir'],['➕ Tıkla','Boş slota oyuncu ekle'],['📌 Yedek','Oyuncu kartının altına yedek ekle']].map(([t,d])=>(
            <div key={t} style={{fontSize:9,color:'#8b949e'}}><span style={{color:'#f0f6fc',fontWeight:600}}>{t}</span> — {d}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
