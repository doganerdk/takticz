'use client';

/* eslint-disable @typescript-eslint/no-unused-vars */
interface Player {
  id: string;
  name: string;
  shortName: string;
  position: 'GK' | 'DEF' | 'MID' | 'FWD';
  club: string;
  nationality: string;
  rating: number;
  number: number;
  photoUrl: string;
  flag: string;
}

const PLAYERS: Player[] = [
  // Goalkeepers
  { id: 'p1', name: 'Thibaut Courtois', shortName: 'Courtois', position: 'GK', club: 'Real Madrid', nationality: 'Belgium', rating: 90, number: 1, photoUrl: 'https://cdn.sofifa.net/players/192/448/25_120.png', flag: '🇧🇪' },
  { id: 'p2', name: 'Manuel Neuer', shortName: 'Neuer', position: 'GK', club: 'Bayern Munich', nationality: 'Germany', rating: 87, number: 1, photoUrl: 'https://cdn.sofifa.net/players/167/495/25_120.png', flag: '🇩🇪' },
  { id: 'p3', name: 'Alisson Becker', shortName: 'Alisson', position: 'GK', club: 'Liverpool', nationality: 'Brazil', rating: 89, number: 1, photoUrl: 'https://cdn.sofifa.net/players/212/831/25_120.png', flag: '🇧🇷' },
  { id: 'p4', name: 'Ederson', shortName: 'Ederson', position: 'GK', club: 'Man City', nationality: 'Brazil', rating: 88, number: 1, photoUrl: 'https://cdn.sofifa.net/players/222/665/25_120.png', flag: '🇧🇷' },
  { id: 'p5', name: 'Gianluigi Donnarumma', shortName: 'Donnarumma', position: 'GK', club: 'PSG', nationality: 'Italy', rating: 88, number: 1, photoUrl: 'https://cdn.sofifa.net/players/238/021/25_120.png', flag: '🇮🇹' },
  // Defenders
  { id: 'p7', name: 'Virgil van Dijk', shortName: 'Van Dijk', position: 'DEF', club: 'Liverpool', nationality: 'Netherlands', rating: 90, number: 4, photoUrl: 'https://cdn.sofifa.net/players/203/376/25_120.png', flag: '🇳🇱' },
  { id: 'p8', name: 'Ruben Dias', shortName: 'R. Dias', position: 'DEF', club: 'Man City', nationality: 'Portugal', rating: 89, number: 3, photoUrl: 'https://cdn.sofifa.net/players/239/229/25_120.png', flag: '🇵🇹' },
  { id: 'p9', name: 'Antonio Rudiger', shortName: 'Rudiger', position: 'DEF', club: 'Real Madrid', nationality: 'Germany', rating: 87, number: 22, photoUrl: 'https://cdn.sofifa.net/players/200/212/25_120.png', flag: '🇩🇪' },
  { id: 'p10', name: 'Marquinhos', shortName: 'Marquinhos', position: 'DEF', club: 'PSG', nationality: 'Brazil', rating: 87, number: 5, photoUrl: 'https://cdn.sofifa.net/players/200/389/25_120.png', flag: '🇧🇷' },
  { id: 'p11', name: 'Trent Alexander-Arnold', shortName: 'T. Alexander-Arnold', position: 'DEF', club: 'Real Madrid', nationality: 'England', rating: 87, number: 66, photoUrl: 'https://cdn.sofifa.net/players/238/353/25_120.png', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  { id: 'p12', name: 'Achraf Hakimi', shortName: 'Hakimi', position: 'DEF', club: 'PSG', nationality: 'Morocco', rating: 87, number: 2, photoUrl: 'https://cdn.sofifa.net/players/236/006/25_120.png', flag: '🇲🇦' },
  { id: 'p13', name: 'Theo Hernandez', shortName: 'T. Hernandez', position: 'DEF', club: 'AC Milan', nationality: 'France', rating: 86, number: 19, photoUrl: 'https://cdn.sofifa.net/players/240/003/25_120.png', flag: '🇫🇷' },
  { id: 'p14', name: 'Andrew Robertson', shortName: 'Robertson', position: 'DEF', club: 'Liverpool', nationality: 'Scotland', rating: 85, number: 26, photoUrl: 'https://cdn.sofifa.net/players/212/766/25_120.png', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿' },
  { id: 'p15', name: 'William Saliba', shortName: 'Saliba', position: 'DEF', club: 'Arsenal', nationality: 'France', rating: 86, number: 12, photoUrl: 'https://cdn.sofifa.net/players/258/013/25_120.png', flag: '🇫🇷' },
  { id: 'p16', name: 'Dayot Upamecano', shortName: 'Upamecano', position: 'DEF', club: 'Bayern Munich', nationality: 'France', rating: 84, number: 2, photoUrl: 'https://cdn.sofifa.net/players/249/967/25_120.png', flag: '🇫🇷' },
  { id: 'p17', name: 'Joao Cancelo', shortName: 'Cancelo', position: 'DEF', club: 'Barcelona', nationality: 'Portugal', rating: 85, number: 2, photoUrl: 'https://cdn.sofifa.net/players/220/834/25_120.png', flag: '🇵🇹' },
  // Midfielders
  { id: 'p19', name: 'Kevin De Bruyne', shortName: 'De Bruyne', position: 'MID', club: 'Man City', nationality: 'Belgium', rating: 91, number: 17, photoUrl: 'https://cdn.sofifa.net/players/192/985/25_120.png', flag: '🇧🇪' },
  { id: 'p20', name: 'Luka Modric', shortName: 'Modric', position: 'MID', club: 'Real Madrid', nationality: 'Croatia', rating: 87, number: 10, photoUrl: 'https://cdn.sofifa.net/players/177/003/25_120.png', flag: '🇭🇷' },
  { id: 'p22', name: 'Jude Bellingham', shortName: 'Bellingham', position: 'MID', club: 'Real Madrid', nationality: 'England', rating: 91, number: 5, photoUrl: 'https://cdn.sofifa.net/players/277/360/25_120.png', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  { id: 'p23', name: 'Martin Odegaard', shortName: 'Odegaard', position: 'MID', club: 'Arsenal', nationality: 'Norway', rating: 88, number: 8, photoUrl: 'https://cdn.sofifa.net/players/222/005/25_120.png', flag: '🇳🇴' },
  { id: 'p24', name: 'Pedri', shortName: 'Pedri', position: 'MID', club: 'Barcelona', nationality: 'Spain', rating: 89, number: 8, photoUrl: 'https://cdn.sofifa.net/players/306/956/25_120.png', flag: '🇪🇸' },
  { id: 'p25', name: 'Gavi', shortName: 'Gavi', position: 'MID', club: 'Barcelona', nationality: 'Spain', rating: 87, number: 6, photoUrl: 'https://cdn.sofifa.net/players/322/895/25_120.png', flag: '🇪🇸' },
  { id: 'p26', name: 'Bruno Fernandes', shortName: 'B. Fernandes', position: 'MID', club: 'Man United', nationality: 'Portugal', rating: 87, number: 8, photoUrl: 'https://cdn.sofifa.net/players/212/677/25_120.png', flag: '🇵🇹' },
  { id: 'p27', name: 'Declan Rice', shortName: 'D. Rice', position: 'MID', club: 'Arsenal', nationality: 'England', rating: 87, number: 41, photoUrl: 'https://cdn.sofifa.net/players/246/669/25_120.png', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  { id: 'p28', name: 'Joshua Kimmich', shortName: 'Kimmich', position: 'MID', club: 'Bayern Munich', nationality: 'Germany', rating: 88, number: 6, photoUrl: 'https://cdn.sofifa.net/players/212/622/25_120.png', flag: '🇩🇪' },
  { id: 'p29', name: 'Rodri', shortName: 'Rodri', position: 'MID', club: 'Man City', nationality: 'Spain', rating: 91, number: 16, photoUrl: 'https://cdn.sofifa.net/players/246/944/25_120.png', flag: '🇪🇸' },
  { id: 'p30', name: 'Frenkie de Jong', shortName: 'F. de Jong', position: 'MID', club: 'Barcelona', nationality: 'Netherlands', rating: 86, number: 21, photoUrl: 'https://cdn.sofifa.net/players/244/477/25_120.png', flag: '🇳🇱' },
  // Forwards
  { id: 'p33', name: 'Erling Haaland', shortName: 'Haaland', position: 'FWD', club: 'Man City', nationality: 'Norway', rating: 92, number: 9, photoUrl: 'https://cdn.sofifa.net/players/258/065/25_120.png', flag: '🇳🇴' },
  { id: 'p34', name: 'Kylian Mbappe', shortName: 'Mbappe', position: 'FWD', club: 'Real Madrid', nationality: 'France', rating: 93, number: 9, photoUrl: 'https://cdn.sofifa.net/players/231/747/25_120.png', flag: '🇫🇷' },
  { id: 'p35', name: 'Lionel Messi', shortName: 'Messi', position: 'FWD', club: 'Inter Miami', nationality: 'Argentina', rating: 90, number: 10, photoUrl: 'https://cdn.sofifa.net/players/158/023/25_120.png', flag: '🇦🇷' },
  { id: 'p36', name: 'Cristiano Ronaldo', shortName: 'Ronaldo', position: 'FWD', club: 'Al Nassr', nationality: 'Portugal', rating: 88, number: 7, photoUrl: 'https://cdn.sofifa.net/players/155/862/25_120.png', flag: '🇵🇹' },
  { id: 'p37', name: 'Vinicius Jr.', shortName: 'Vini Jr.', position: 'FWD', club: 'Real Madrid', nationality: 'Brazil', rating: 92, number: 7, photoUrl: 'https://cdn.sofifa.net/players/250/244/25_120.png', flag: '🇧🇷' },
  { id: 'p38', name: 'Mohamed Salah', shortName: 'M. Salah', position: 'FWD', club: 'Liverpool', nationality: 'Egypt', rating: 91, number: 11, photoUrl: 'https://cdn.sofifa.net/players/209/331/25_120.png', flag: '🇪🇬' },
  { id: 'p39', name: 'Harry Kane', shortName: 'H. Kane', position: 'FWD', club: 'Bayern Munich', nationality: 'England', rating: 90, number: 9, photoUrl: 'https://cdn.sofifa.net/players/202/126/25_120.png', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  { id: 'p40', name: 'Robert Lewandowski', shortName: 'Lewandowski', position: 'FWD', club: 'Barcelona', nationality: 'Poland', rating: 89, number: 9, photoUrl: 'https://cdn.sofifa.net/players/188/545/25_120.png', flag: '🇵🇱' },
  { id: 'p41', name: 'Lamine Yamal', shortName: 'L. Yamal', position: 'FWD', club: 'Barcelona', nationality: 'Spain', rating: 88, number: 19, photoUrl: 'https://cdn.sofifa.net/players/366/023/25_120.png', flag: '🇪🇸' },
  { id: 'p42', name: 'Bukayo Saka', shortName: 'Saka', position: 'FWD', club: 'Arsenal', nationality: 'England', rating: 88, number: 7, photoUrl: 'https://cdn.sofifa.net/players/273/498/25_120.png', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  { id: 'p44', name: 'Phil Foden', shortName: 'Foden', position: 'FWD', club: 'Man City', nationality: 'England', rating: 90, number: 47, photoUrl: 'https://cdn.sofifa.net/players/257/212/25_120.png', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  { id: 'p45', name: 'Bernardo Silva', shortName: 'B. Silva', position: 'FWD', club: 'Man City', nationality: 'Portugal', rating: 88, number: 20, photoUrl: 'https://cdn.sofifa.net/players/212/563/25_120.png', flag: '🇵🇹' },
  { id: 'p43', name: 'Raphinha', shortName: 'Raphinha', position: 'FWD', club: 'Barcelona', nationality: 'Brazil', rating: 87, number: 11, photoUrl: 'https://cdn.sofifa.net/players/234/519/25_120.png', flag: '🇧🇷' },
];

interface _FormationPosition {
  role: string;
  x: number;
  y: number;
  label: string;
}

interface Formation {
  name: string;
  positions: _FormationPosition[];
}

const FORMATIONS: Record<string, Formation> = {
  '4-3-3': {
    name: '4-3-3',
    positions: [
      { role: 'GK', x: 50, y: 88, label: 'GK' },
      { role: 'LB', x: 12, y: 68, label: 'LB' },
      { role: 'CB1', x: 34, y: 73, label: 'CB' },
      { role: 'CB2', x: 66, y: 73, label: 'CB' },
      { role: 'RB', x: 88, y: 68, label: 'RB' },
      { role: 'LCM', x: 24, y: 47, label: 'CM' },
      { role: 'CM', x: 50, y: 43, label: 'CM' },
      { role: 'RCM', x: 76, y: 47, label: 'CM' },
      { role: 'LW', x: 14, y: 20, label: 'LW' },
      { role: 'ST', x: 50, y: 14, label: 'ST' },
      { role: 'RW', x: 86, y: 20, label: 'RW' },
    ]
  },
  '4-4-2': {
    name: '4-4-2',
    positions: [
      { role: 'GK', x: 50, y: 88, label: 'GK' },
      { role: 'LB', x: 12, y: 70, label: 'LB' },
      { role: 'CB1', x: 34, y: 75, label: 'CB' },
      { role: 'CB2', x: 66, y: 75, label: 'CB' },
      { role: 'RB', x: 88, y: 70, label: 'RB' },
      { role: 'LM', x: 12, y: 48, label: 'LM' },
      { role: 'LCM', x: 37, y: 48, label: 'CM' },
      { role: 'RCM', x: 63, y: 48, label: 'CM' },
      { role: 'RM', x: 88, y: 48, label: 'RM' },
      { role: 'LST', x: 34, y: 17, label: 'ST' },
      { role: 'RST', x: 66, y: 17, label: 'ST' },
    ]
  },
  '4-2-3-1': {
    name: '4-2-3-1',
    positions: [
      { role: 'GK', x: 50, y: 88, label: 'GK' },
      { role: 'LB', x: 12, y: 70, label: 'LB' },
      { role: 'CB1', x: 34, y: 75, label: 'CB' },
      { role: 'CB2', x: 66, y: 75, label: 'CB' },
      { role: 'RB', x: 88, y: 70, label: 'RB' },
      { role: 'LDM', x: 34, y: 55, label: 'DM' },
      { role: 'RDM', x: 66, y: 55, label: 'DM' },
      { role: 'LAM', x: 16, y: 34, label: 'LW' },
      { role: 'CAM', x: 50, y: 31, label: 'AM' },
      { role: 'RAM', x: 84, y: 34, label: 'RW' },
      { role: 'ST', x: 50, y: 12, label: 'ST' },
    ]
  },
  '3-5-2': {
    name: '3-5-2',
    positions: [
      { role: 'GK', x: 50, y: 88, label: 'GK' },
      { role: 'CB1', x: 24, y: 74, label: 'CB' },
      { role: 'CB2', x: 50, y: 77, label: 'CB' },
      { role: 'CB3', x: 76, y: 74, label: 'CB' },
      { role: 'LWB', x: 8, y: 53, label: 'LWB' },
      { role: 'LCM', x: 29, y: 49, label: 'CM' },
      { role: 'CM', x: 50, y: 46, label: 'CM' },
      { role: 'RCM', x: 71, y: 49, label: 'CM' },
      { role: 'RWB', x: 92, y: 53, label: 'RWB' },
      { role: 'LST', x: 34, y: 16, label: 'ST' },
      { role: 'RST', x: 66, y: 16, label: 'ST' },
    ]
  },
  '3-4-3': {
    name: '3-4-3',
    positions: [
      { role: 'GK', x: 50, y: 88, label: 'GK' },
      { role: 'CB1', x: 24, y: 74, label: 'CB' },
      { role: 'CB2', x: 50, y: 77, label: 'CB' },
      { role: 'CB3', x: 76, y: 74, label: 'CB' },
      { role: 'LM', x: 12, y: 52, label: 'LM' },
      { role: 'LCM', x: 36, y: 52, label: 'CM' },
      { role: 'RCM', x: 64, y: 52, label: 'CM' },
      { role: 'RM', x: 88, y: 52, label: 'RM' },
      { role: 'LW', x: 14, y: 20, label: 'LW' },
      { role: 'ST', x: 50, y: 13, label: 'ST' },
      { role: 'RW', x: 86, y: 20, label: 'RW' },
    ]
  },
  '5-3-2': {
    name: '5-3-2',
    positions: [
      { role: 'GK', x: 50, y: 88, label: 'GK' },
      { role: 'LWB', x: 8, y: 67, label: 'LWB' },
      { role: 'LCB', x: 26, y: 75, label: 'CB' },
      { role: 'CB', x: 50, y: 77, label: 'CB' },
      { role: 'RCB', x: 74, y: 75, label: 'CB' },
      { role: 'RWB', x: 92, y: 67, label: 'RWB' },
      { role: 'LCM', x: 27, y: 48, label: 'CM' },
      { role: 'CM', x: 50, y: 44, label: 'CM' },
      { role: 'RCM', x: 73, y: 48, label: 'CM' },
      { role: 'LST', x: 34, y: 16, label: 'ST' },
      { role: 'RST', x: 66, y: 16, label: 'ST' },
    ]
  },
  '4-1-4-1': {
    name: '4-1-4-1',
    positions: [
      { role: 'GK', x: 50, y: 88, label: 'GK' },
      { role: 'LB', x: 12, y: 70, label: 'LB' },
      { role: 'CB1', x: 34, y: 75, label: 'CB' },
      { role: 'CB2', x: 66, y: 75, label: 'CB' },
      { role: 'RB', x: 88, y: 70, label: 'RB' },
      { role: 'DM', x: 50, y: 57, label: 'DM' },
      { role: 'LM', x: 12, y: 41, label: 'LM' },
      { role: 'LCM', x: 36, y: 43, label: 'CM' },
      { role: 'RCM', x: 64, y: 43, label: 'CM' },
      { role: 'RM', x: 88, y: 41, label: 'RM' },
      { role: 'ST', x: 50, y: 12, label: 'ST' },
    ]
  },
  '4-3-2-1': {
    name: '4-3-2-1',
    positions: [
      { role: 'GK', x: 50, y: 88, label: 'GK' },
      { role: 'LB', x: 12, y: 70, label: 'LB' },
      { role: 'CB1', x: 34, y: 75, label: 'CB' },
      { role: 'CB2', x: 66, y: 75, label: 'CB' },
      { role: 'RB', x: 88, y: 70, label: 'RB' },
      { role: 'LCM', x: 24, y: 52, label: 'CM' },
      { role: 'CM', x: 50, y: 49, label: 'CM' },
      { role: 'RCM', x: 76, y: 52, label: 'CM' },
      { role: 'LAM', x: 33, y: 30, label: 'AM' },
      { role: 'RAM', x: 67, y: 30, label: 'AM' },
      { role: 'ST', x: 50, y: 12, label: 'ST' },
    ]
  },
};


import { useState, useEffect, useRef, useCallback } from 'react';
// data inlined

/* ═══ TYPES ═══ */
type PosType = 'GK'|'DEF'|'MID'|'FWD';
type DrawTool = 'none'|'arrow'|'zone'|'freehand';
type ArrowStyle = 'attack'|'defense'|'pass'|'press';
type KitPattern = 'solid'|'stripes'|'hoops'|'halves'|'diagonal';
type PitchTheme = 'classic'|'night'|'retro'|'snow'|'artificial';

interface SlotData { name:string; pos:PosType; number:string; kitColor:string; kitPattern:KitPattern; note:string; }
interface DrawnArrow { id:string; x1:number; y1:number; x2:number; y2:number; style:ArrowStyle; }
interface DrawnZone  { id:string; x:number; y:number; w:number; h:number; label:string; color:string; }
interface DrawnPath  { id:string; points:[number,number][]; color:string; }
interface SavedPlan  { id:string; name:string; formation:string; teamName:string; lineup:Record<string,SlotData>; subs:Record<string,SlotData>; positions:Record<string,{x:number;y:number}>; arrows:DrawnArrow[]; zones:DrawnZone[]; paths:DrawnPath[]; kitColor:string; kitPattern:KitPattern; savedAt:string; }

/* ═══ CONSTANTS ═══ */
const POS_COLORS:Record<PosType,{bg:string;text:string;accent:string}> = {
  GK: {bg:'#92400e',text:'#fef3c7',accent:'#f59e0b'},
  DEF:{bg:'#1e3a8a',text:'#dbeafe',accent:'#60a5fa'},
  MID:{bg:'#064e3b',text:'#d1fae5',accent:'#34d399'},
  FWD:{bg:'#7f1d1d',text:'#fee2e2',accent:'#f87171'},
};
const ARROW_STYLES:Record<ArrowStyle,{color:string;dash:string;label:string}> = {
  attack: {color:'#f87171',dash:'none',label:'Hücum'},
  defense:{color:'#60a5fa',dash:'6,3', label:'Savunma'},
  pass:   {color:'#34d399',dash:'none',label:'Pas'},
  press:  {color:'#fbbf24',dash:'4,4', label:'Pressing'},
};
const ZONE_COLORS=['#f8717133','#60a5fa33','#34d39933','#fbbf2433','#a78bfa33'];
const ZONE_LABELS=['Pressing Bölgesi','Savunma Bloğu','Hücum Üçgeni','Orta Alan','Özel Bölge'];
const SLOT_POS:Record<string,PosType>={
  GK:'GK',LB:'DEF',RB:'DEF',CB1:'DEF',CB2:'DEF',CB3:'DEF',LCB:'DEF',RCB:'DEF',CB:'DEF',LWB:'DEF',RWB:'DEF',
  LM:'MID',RM:'MID',LCM:'MID',RCM:'MID',CM:'MID',DM:'MID',LDM:'MID',RDM:'MID',CAM:'MID',LAM:'MID',RAM:'MID',
  LW:'FWD',RW:'FWD',ST:'FWD',LST:'FWD',RST:'FWD',
};
const KIT_PATTERNS:Record<KitPattern,string>={solid:'Düz',stripes:'Dikey Çizgi',hoops:'Yatay Çizgi',halves:'İki Renk',diagonal:'Diyagonal'};
const PITCH_THEMES:Record<PitchTheme,{label:string;emoji:string;bg:string;stripe:string;line:string;vignette:string;overlay?:string}> = {
  classic:    {label:'Klasik',    emoji:'🌿',bg:'#162a16',stripe:'#1d3b1a',line:'rgba(255,255,255,0.45)',vignette:'rgba(0,0,0,0.3)'},
  night:      {label:'Gece',      emoji:'🌙',bg:'#040d04',stripe:'#081508',line:'rgba(150,230,255,0.6)',vignette:'rgba(0,0,60,0.5)',overlay:'radial-gradient(ellipse at 50% 0%,rgba(60,100,255,0.15) 0%,transparent 70%)'},
  retro:      {label:'Retro',     emoji:'📺',bg:'#2d4a1e',stripe:'#3a5c26',line:'rgba(255,235,100,0.65)',vignette:'rgba(80,40,0,0.4)',overlay:'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.07) 3px,rgba(0,0,0,0.07) 6px)'},
  snow:       {label:'Kar',       emoji:'❄️',bg:'#c8d8ec',stripe:'#dde8f5',line:'rgba(255,255,255,0.9)',vignette:'rgba(200,220,240,0.2)',overlay:'radial-gradient(ellipse at 50% 0%,rgba(255,255,255,0.3) 0%,transparent 70%)'},
  artificial: {label:'Yapay Çim', emoji:'💚',bg:'#006400',stripe:'#007a00',line:'rgba(255,255,255,0.7)',vignette:'rgba(0,0,0,0.2)'},
};
const KIT_COLS=['#dc2626','#ea580c','#f59e0b','#16a34a','#2563eb','#7c3aed','#db2777','#0891b2','#111827','#ffffff','#6b7280','#f5c518'];
const DEFAULT_KIT:SlotData={name:'',pos:'MID',number:'',kitColor:'#2563eb',kitPattern:'solid',note:''};

function uid(){return Math.random().toString(36).slice(2,9);}
function getInitials(n:string){return n.trim().split(/\s+/).map((w:string)=>w[0]).join('').slice(0,2).toUpperCase();}

/* ═══ FUT CARD ═══ */
function FutCard({data,size='md',glow=false,scale=1}:{data:SlotData;size?:'sm'|'md'|'lg';glow?:boolean;scale?:number}){
  const c=POS_COLORS[data.pos];
  const base=size==='lg'?140:size==='sm'?82:110;
  const dim=Math.round(base*scale);
  const fs=Math.round((size==='lg'?14:size==='sm'?10:12)*scale);
  const nfs=Math.round((size==='lg'?16:size==='sm'?11:13)*scale);
  const nmaxw=Math.round((size==='lg'?120:size==='sm'?68:94)*scale);
  const pat=()=>{
    const s='rgba(255,255,255,0.16)';
    if(data.kitPattern==='stripes') return <><rect x="18%" y="0" width="16%" height="100%" fill={s}/><rect x="46%" y="0" width="16%" height="100%" fill={s}/><rect x="74%" y="0" width="16%" height="100%" fill={s}/></>;
    if(data.kitPattern==='hoops')   return <><rect x="0" y="20%" width="100%" height="15%" fill={s}/><rect x="0" y="52%" width="100%" height="15%" fill={s}/><rect x="0" y="80%" width="100%" height="15%" fill={s}/></>;
    if(data.kitPattern==='halves')  return <rect x="50%" y="0" width="50%" height="100%" fill={s}/>;
    if(data.kitPattern==='diagonal')return <polygon points="100%,0 100%,100% 0,100%" fill={s}/>;
    return null;
  };
  return (
    <div style={{width:dim,height:Math.round(dim*1.38),borderRadius:Math.round(7*scale),
      background:`linear-gradient(155deg,${c.bg} 0%,${c.bg}cc 55%,#06090f 100%)`,
      border:`${Math.max(1,Math.round(2*scale))}px solid ${c.accent}99`,
      display:'flex',flexDirection:'column',alignItems:'center',
      flexShrink:0,overflow:'hidden',position:'relative',
      boxShadow:glow?`0 0 ${Math.round(20*scale)}px ${c.accent}88,0 ${Math.round(4*scale)}px ${Math.round(16*scale)}px rgba(0,0,0,0.7)`:`0 ${Math.round(4*scale)}px ${Math.round(12*scale)}px rgba(0,0,0,0.6)`}}>
      <svg style={{position:'absolute',inset:0,width:'100%',height:'100%'}} viewBox="0 0 100 100" preserveAspectRatio="none">{pat()}</svg>
      <div style={{position:'absolute',top:0,left:0,right:0,height:'38%',background:'linear-gradient(180deg,rgba(255,255,255,0.1) 0%,transparent 100%)',pointerEvents:'none'}}/>
      <div style={{position:'relative',zIndex:1,width:'100%',display:'flex',flexDirection:'column',alignItems:'center',padding:`${fs}px ${fs}px 0`}}>
        <div style={{width:'100%',display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:Math.round(2*scale)}}>
          <span style={{fontSize:fs,fontWeight:900,color:c.accent,letterSpacing:0.5,lineHeight:1,textShadow:'0 1px 4px rgba(0,0,0,0.6)'}}>{data.pos}</span>
          {data.number&&<span style={{fontSize:fs,fontWeight:800,color:'rgba(255,255,255,0.45)',lineHeight:1}}>#{data.number}</span>}
        </div>
        <div style={{width:Math.round(dim*0.5),height:Math.round(dim*0.5),borderRadius:'50%',
          background:`radial-gradient(circle at 35% 35%,${c.accent}44,${c.bg}99)`,
          border:`${Math.max(1,Math.round(1.5*scale))}px solid ${c.accent}55`,
          display:'flex',alignItems:'center',justifyContent:'center',
          margin:`${Math.round(4*scale)}px 0`,flexShrink:0}}>
          <span style={{fontSize:Math.round(dim*0.19),fontWeight:900,color:c.text,textShadow:'0 2px 8px rgba(0,0,0,0.7)'}}>{getInitials(data.name)}</span>
        </div>
        <div style={{width:'100%',background:'rgba(0,0,0,0.5)',borderRadius:Math.round(3*scale),padding:`${Math.round(2*scale)}px ${fs}px`,textAlign:'center'}}>
          <div style={{fontSize:nfs,fontWeight:800,color:c.text,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis',maxWidth:nmaxw,letterSpacing:0.3,lineHeight:1.2,margin:'0 auto'}}>{data.name||'—'}</div>
        </div>
      </div>
    </div>
  );
}

/* ═══ EDIT MODAL ═══ */
function EditModal({slotLabel,initial,onSave,onClose}:{slotLabel:string;initial:SlotData;onSave:(d:SlotData)=>void;onClose:()=>void}){
  const [name,setName]=useState(initial.name);
  const [pos,setPos]=useState<PosType>(initial.pos);
  const [number,setNumber]=useState(initial.number);
  const [kitColor,setKitColor]=useState(initial.kitColor);
  const [kitPattern,setKitPattern]=useState<KitPattern>(initial.kitPattern);
  const [note,setNote]=useState(initial.note||'');
  useEffect(()=>{const fn=(e:KeyboardEvent)=>{if(e.key==='Escape')onClose();};window.addEventListener('keydown',fn);return()=>window.removeEventListener('keydown',fn);},[onClose]);
  const preview:SlotData={name:name.trim()||slotLabel,pos,number,kitColor,kitPattern,note};
  return(
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.8)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:300,backdropFilter:'blur(8px)'}} onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
      <div style={{background:'#0d1117',border:'1px solid #30363d',borderRadius:14,padding:22,width:340,maxHeight:'92vh',overflowY:'auto',boxShadow:'0 24px 64px rgba(0,0,0,0.9)'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14}}>
          <div><div style={{fontSize:15,fontWeight:800,color:'#f0f6fc'}}>Oyuncu Düzenle</div><div style={{fontSize:10,color:'#8b949e'}}>Pozisyon: <span style={{color:'#00ff87',fontWeight:700}}>{slotLabel}</span></div></div>
          <button onClick={onClose} style={{background:'#21262d',border:'none',color:'#8b949e',width:28,height:28,borderRadius:6,cursor:'pointer',fontSize:16}}>×</button>
        </div>
        <div style={{display:'flex',justifyContent:'center',marginBottom:14}}><FutCard data={preview} size="lg" glow/></div>
        <label style={{fontSize:10,color:'#8b949e',fontWeight:700,display:'block',marginBottom:4}}>OYUNCU ADI *</label>
        <input autoFocus value={name} onChange={e=>setName(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'&&name.trim())onSave({name:name.trim(),pos,number,kitColor,kitPattern,note});}} placeholder="Örn. Ahmet Çelik"
          style={{width:'100%',background:'#21262d',border:'1px solid #30363d',borderRadius:7,padding:'9px 12px',color:'#f0f6fc',fontSize:13,fontWeight:600,outline:'none',boxSizing:'border-box',marginBottom:9}}/>
        <label style={{fontSize:10,color:'#8b949e',fontWeight:700,display:'block',marginBottom:4}}>FORMA NUMARASI</label>
        <input value={number} onChange={e=>setNumber(e.target.value.replace(/\D/g,'').slice(0,2))} placeholder="1–99" maxLength={2}
          style={{width:'100%',background:'#21262d',border:'1px solid #30363d',borderRadius:7,padding:'9px 12px',color:'#f0f6fc',fontSize:13,fontWeight:600,outline:'none',boxSizing:'border-box',marginBottom:9}}/>
        <label style={{fontSize:10,color:'#8b949e',fontWeight:700,display:'block',marginBottom:5}}>POZİSYON</label>
        <div style={{display:'flex',gap:5,marginBottom:11}}>
          {(['GK','DEF','MID','FWD'] as PosType[]).map(p=>{const c=POS_COLORS[p];return(
            <button key={p} onClick={()=>setPos(p)} style={{flex:1,padding:'7px 0',background:pos===p?c.bg:'#21262d',color:pos===p?c.text:'#8b949e',border:pos===p?`1px solid ${c.accent}`:'1px solid transparent',borderRadius:6,fontSize:11,fontWeight:700,cursor:'pointer'}}>{p}</button>
          );})}
        </div>
        <label style={{fontSize:10,color:'#8b949e',fontWeight:700,display:'block',marginBottom:5}}>FORMA RENGİ</label>
        <div style={{display:'flex',flexWrap:'wrap',gap:6,marginBottom:9}}>
          {KIT_COLS.map(c=><div key={c} onClick={()=>setKitColor(c)} style={{width:22,height:22,borderRadius:'50%',background:c,cursor:'pointer',border:kitColor===c?'3px solid #00ff87':'2px solid transparent',boxSizing:'border-box',flexShrink:0}}/>)}
          <input type="color" value={kitColor} onChange={e=>setKitColor(e.target.value)} style={{width:22,height:22,borderRadius:'50%',border:'none',cursor:'pointer',padding:0,background:'none'}}/>
        </div>
        <label style={{fontSize:10,color:'#8b949e',fontWeight:700,display:'block',marginBottom:5}}>FORMA DESENİ</label>
        <div style={{display:'flex',flexWrap:'wrap',gap:4,marginBottom:11}}>
          {(Object.keys(KIT_PATTERNS) as KitPattern[]).map(p=><button key={p} onClick={()=>setKitPattern(p)} style={{padding:'5px 8px',background:kitPattern===p?'#00ff87':'#21262d',color:kitPattern===p?'#000':'#8b949e',border:'none',borderRadius:5,fontSize:10,fontWeight:700,cursor:'pointer'}}>{KIT_PATTERNS[p]}</button>)}
        </div>
        <label style={{fontSize:10,color:'#8b949e',fontWeight:700,display:'block',marginBottom:4}}>NOT</label>
        <textarea value={note} onChange={e=>setNote(e.target.value)} placeholder="Özel talimat..." rows={2}
          style={{width:'100%',background:'#21262d',border:'1px solid #30363d',borderRadius:7,padding:'8px 12px',color:'#f0f6fc',fontSize:12,outline:'none',resize:'none',boxSizing:'border-box',marginBottom:14,fontFamily:'Inter,sans-serif'}}/>
        <div style={{display:'flex',gap:8}}>
          <button onClick={onClose} style={{flex:1,padding:'10px',background:'#21262d',border:'1px solid #30363d',color:'#8b949e',borderRadius:7,fontSize:13,fontWeight:600,cursor:'pointer'}}>İptal</button>
          <button onClick={()=>{if(name.trim())onSave({name:name.trim(),pos,number,kitColor,kitPattern,note});}} disabled={!name.trim()}
            style={{flex:2,padding:'10px',background:name.trim()?'#00ff87':'#21262d',border:'none',color:name.trim()?'#000':'#8b949e',borderRadius:7,fontSize:13,fontWeight:700,cursor:name.trim()?'pointer':'not-allowed'}}>✓ Kaydet</button>
        </div>
      </div>
    </div>
  );
}

/* ═══ SAVE/LOAD MODAL ═══ */
function SaveLoadModal({current,onLoad,onClose}:{current:Omit<SavedPlan,'id'|'savedAt'>;onLoad:(p:SavedPlan)=>void;onClose:()=>void}){
  const [plans,setPlans]=useState<SavedPlan[]>([]);
  const [saveName,setSaveName]=useState(current.name||'Taktik Planım');
  const [tab,setTab]=useState<'save'|'load'>('save');
  useEffect(()=>{try{const r=localStorage.getItem('lineup_plans');if(r)setPlans(JSON.parse(r));}catch{}},[]);
  const save=()=>{const p:SavedPlan={...current,id:uid(),name:saveName.trim()||'İsimsiz',savedAt:new Date().toLocaleString('tr-TR')};const u=[p,...plans.slice(0,19)];localStorage.setItem('lineup_plans',JSON.stringify(u));setPlans(u);setTab('load');};
  const del=(id:string)=>{const u=plans.filter(p=>p.id!==id);localStorage.setItem('lineup_plans',JSON.stringify(u));setPlans(u);};
  return(
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.8)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:300,backdropFilter:'blur(8px)'}} onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
      <div style={{background:'#0d1117',border:'1px solid #30363d',borderRadius:14,width:400,maxHeight:'80vh',display:'flex',flexDirection:'column',boxShadow:'0 24px 64px rgba(0,0,0,0.9)'}}>
        <div style={{padding:'16px 18px 12px',borderBottom:'1px solid #30363d',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div style={{fontSize:15,fontWeight:800,color:'#f0f6fc'}}>💾 Planlar</div>
          <button onClick={onClose} style={{background:'#21262d',border:'none',color:'#8b949e',width:28,height:28,borderRadius:6,cursor:'pointer',fontSize:16}}>×</button>
        </div>
        <div style={{display:'flex',borderBottom:'1px solid #30363d'}}>
          {(['save','load'] as const).map(t=><button key={t} onClick={()=>setTab(t)} style={{flex:1,padding:'9px',background:'none',border:'none',color:tab===t?'#00ff87':'#8b949e',fontSize:12,fontWeight:700,cursor:'pointer',borderBottom:tab===t?'2px solid #00ff87':'2px solid transparent'}}>{t==='save'?'💾 Kaydet':`📂 Yükle (${plans.length})`}</button>)}
        </div>
        <div style={{flex:1,overflowY:'auto',padding:16}}>
          {tab==='save'&&<>
            <label style={{fontSize:10,color:'#8b949e',fontWeight:700,display:'block',marginBottom:6}}>PLAN ADI</label>
            <input value={saveName} onChange={e=>setSaveName(e.target.value)} style={{width:'100%',background:'#21262d',border:'1px solid #30363d',borderRadius:7,padding:'10px 12px',color:'#f0f6fc',fontSize:13,fontWeight:600,outline:'none',boxSizing:'border-box',marginBottom:14}}/>
            <button onClick={save} style={{width:'100%',padding:'12px',background:'#00ff87',border:'none',color:'#000',borderRadius:8,fontSize:14,fontWeight:700,cursor:'pointer'}}>💾 Kaydet</button>
          </>}
          {tab==='load'&&(plans.length===0?<div style={{textAlign:'center',color:'#8b949e',padding:'30px 0'}}>Kayıtlı plan yok</div>:
            plans.map(p=><div key={p.id} style={{background:'#21262d',borderRadius:8,padding:'11px 13px',marginBottom:8,border:'1px solid #30363d',display:'flex',alignItems:'center',gap:10}}>
              <div style={{flex:1,minWidth:0}}><div style={{fontSize:13,fontWeight:700,color:'#f0f6fc',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{p.name}</div><div style={{fontSize:10,color:'#8b949e'}}>{p.formation} · {p.savedAt}</div></div>
              <button onClick={()=>{onLoad(p);onClose();}} style={{background:'#00ff87',border:'none',color:'#000',padding:'5px 10px',borderRadius:5,fontSize:11,fontWeight:700,cursor:'pointer',flexShrink:0}}>Yükle</button>
              <button onClick={()=>del(p.id)} style={{background:'none',border:'none',color:'#ff4444',cursor:'pointer',fontSize:16,padding:'0 2px',flexShrink:0}}>×</button>
            </div>)
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══ DRAWING LAYER ═══ */
function DrawingLayer({arrows,zones,paths,activeTool,arrowStyle,zoneColor,zoneLabel,drawColor,onAddArrow,onAddZone,onAddPath,onDeleteArrow,onDeleteZone,onDeletePath,animProgress}:
{arrows:DrawnArrow[];zones:DrawnZone[];paths:DrawnPath[];activeTool:DrawTool;arrowStyle:ArrowStyle;zoneColor:string;zoneLabel:string;drawColor:string;
onAddArrow:(a:DrawnArrow)=>void;onAddZone:(z:DrawnZone)=>void;onAddPath:(p:DrawnPath)=>void;
onDeleteArrow:(id:string)=>void;onDeleteZone:(id:string)=>void;onDeletePath:(id:string)=>void;
animProgress:number;}){
  const svgRef=useRef<SVGSVGElement>(null);
  const [drawing,setDrawing]=useState(false);
  const [start,setStart]=useState<[number,number]>([0,0]);
  const [cur,setCur]=useState<[number,number]>([0,0]);
  const [pp,setPp]=useState<[number,number][]>([]);
  const toSvg=useCallback((e:React.PointerEvent)=>{const r=svgRef.current!.getBoundingClientRect();return[(e.clientX-r.left)/r.width*100,(e.clientY-r.top)/r.height*100] as [number,number];},[]);
  const onPD=(e:React.PointerEvent)=>{if(activeTool==='none')return;e.preventDefault();(e.target as Element).setPointerCapture(e.pointerId);const p=toSvg(e);setStart(p);setCur(p);setDrawing(true);if(activeTool==='freehand')setPp([p]);};
  const onPM=(e:React.PointerEvent)=>{if(!drawing)return;const p=toSvg(e);setCur(p);if(activeTool==='freehand')setPp(prev=>[...prev,p]);};
  const onPU=()=>{if(!drawing)return;setDrawing(false);
    if(activeTool==='arrow'){const dx=cur[0]-start[0],dy=cur[1]-start[1];if(Math.sqrt(dx*dx+dy*dy)>2)onAddArrow({id:uid(),x1:start[0],y1:start[1],x2:cur[0],y2:cur[1],style:arrowStyle});}
    else if(activeTool==='zone'){const x=Math.min(start[0],cur[0]),y=Math.min(start[1],cur[1]),w=Math.abs(cur[0]-start[0]),h=Math.abs(cur[1]-start[1]);if(w>2&&h>2)onAddZone({id:uid(),x,y,w,h,color:zoneColor,label:zoneLabel});}
    else if(activeTool==='freehand'&&pp.length>2){onAddPath({id:uid(),points:pp,color:drawColor});setPp([]);}};
  const mkArrow=(a:DrawnArrow,progress=1)=>{
    const st=ARROW_STYLES[a.style];
    const px1=a.x1+(a.x2-a.x1)*(1-progress),py1=a.y1+(a.y2-a.y1)*(1-progress);
    const dx=a.x2-px1,dy=a.y2-py1,len=Math.sqrt(dx*dx+dy*dy);if(len<0.5)return null;
    const ux=dx/len,uy=dy/len,ex=a.x2-ux*1.4,ey=a.y2-uy*1.4,hx=-uy*1.1,hy=ux*1.1;
    return(<g key={a.id}>
      <line x1={px1} y1={py1} x2={ex} y2={ey} stroke={st.color} strokeWidth="0.85" strokeDasharray={st.dash} opacity="0.92"/>
      {progress>0.85&&<polygon points={`${a.x2},${a.y2} ${ex+hx},${ey+hy} ${ex-hx},${ey-hy}`} fill={st.color} opacity="0.92"/>}
      <line x1={a.x1} y1={a.y1} x2={a.x2} y2={a.y2} stroke="transparent" strokeWidth="4" style={{cursor:'pointer'}} onClick={()=>activeTool==='none'&&onDeleteArrow(a.id)}/>
    </g>);};
  const pathD=(pts:[number,number][])=>pts.length<2?'':`M${pts[0][0]},${pts[0][1]} `+pts.slice(1).map(p=>`L${p[0]},${p[1]}`).join(' ');
  return(
    <svg ref={svgRef} viewBox="0 0 100 100" preserveAspectRatio="none"
      style={{position:'absolute',inset:0,width:'100%',height:'100%',zIndex:activeTool!=='none'?20:5,cursor:activeTool!=='none'?'crosshair':'default',pointerEvents:activeTool!=='none'?'all':'none'}}
      onPointerDown={onPD} onPointerMove={onPM} onPointerUp={onPU}>
      {zones.map(z=><g key={z.id}><rect x={z.x} y={z.y} width={z.w} height={z.h} fill={z.color} stroke={z.color.replace('33','88')} strokeWidth="0.5" rx="0.5" style={{cursor:'pointer'}} onClick={()=>activeTool==='none'&&onDeleteZone(z.id)}/><text x={z.x+z.w/2} y={z.y+z.h/2} textAnchor="middle" dominantBaseline="middle" fontSize="2.8" fontWeight="700" fill={z.color.replace('33','ff')} fontFamily="Inter,sans-serif">{z.label}</text></g>)}
      {paths.map(p=><path key={p.id} d={pathD(p.points)} fill="none" stroke={p.color} strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" opacity="0.88" style={{cursor:'pointer'}} onClick={()=>activeTool==='none'&&onDeletePath(p.id)}/>)}
      {arrows.map(a=>mkArrow(a,animProgress<1?animProgress:1))}
      {drawing&&activeTool==='arrow'&&<line x1={start[0]} y1={start[1]} x2={cur[0]} y2={cur[1]} stroke={ARROW_STYLES[arrowStyle].color} strokeWidth="0.85" opacity="0.7"/>}
      {drawing&&activeTool==='zone'&&<rect x={Math.min(start[0],cur[0])} y={Math.min(start[1],cur[1])} width={Math.abs(cur[0]-start[0])} height={Math.abs(cur[1]-start[1])} fill={zoneColor} stroke={zoneColor.replace('33','88')} strokeWidth="0.5" opacity="0.7"/>}
      {drawing&&activeTool==='freehand'&&pp.length>1&&<path d={pathD(pp)} fill="none" stroke={drawColor} strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" opacity="0.7"/>}
    </svg>
  );
}

/* ═══ PITCH CARD ═══ */
function PitchCard({slotRole,slotLabel,data,subData,x,y,onDragStartCard,onDropOnCard,isDragTarget,drawTool,onClick,onRemove,onAddSub,onEditSub,onRemoveSub,onDragStartSub,scale,animX,animY}:
{slotRole:string;slotLabel:string;data?:SlotData;subData?:SlotData;x:number;y:number;
onDragStartCard:(e:React.DragEvent,r:string)=>void;onDropOnCard:(e:React.DragEvent,r:string)=>void;
isDragTarget:boolean;drawTool:DrawTool;onClick:()=>void;onRemove:()=>void;
onAddSub:()=>void;onEditSub:()=>void;onRemoveSub:()=>void;onDragStartSub:(e:React.DragEvent)=>void;
scale:number;animX?:number;animY?:number;}){
  const [draggingThis,setDraggingThis]=useState(false);
  const [hovered,setHovered]=useState(false);
  const dispX=animX!==undefined?animX:x;
  const dispY=animY!==undefined?animY:y;
  const nameFs=Math.round(13*scale);
  const subFs=Math.round(13*scale);
  const c=data?POS_COLORS[data.pos]:null;
  return(
    <div style={{position:'absolute',left:`${dispX}%`,top:`${dispY}%`,transform:'translate(-50%,-50%)',display:'flex',flexDirection:'column',alignItems:'center',gap:Math.round(3*scale),
      zIndex:hovered||draggingThis?30:10,pointerEvents:drawTool!=='none'?'none':'auto',
      transition:animX!==undefined?'left 0.6s cubic-bezier(0.34,1.56,0.64,1),top 0.6s cubic-bezier(0.34,1.56,0.64,1)':'none'}}
      onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}
      onDragOver={e=>e.preventDefault()} onDrop={e=>onDropOnCard(e,slotRole)}>
      {/* Card */}
      {data?(
        <div draggable
          onDragStart={e=>{onDragStartCard(e,slotRole);setDraggingThis(true);}}
          onDragEnd={()=>setDraggingThis(false)}
          onClick={onClick}
          style={{cursor:'grab',opacity:draggingThis?0.3:1,transform:draggingThis?'scale(1.1) rotate(-3deg)':isDragTarget?'scale(1.06)':'scale(1)',
            outline:isDragTarget?`3px solid #00ff87`:'none',outlineOffset:4,borderRadius:8,
            transition:'transform 0.18s cubic-bezier(0.34,1.56,0.64,1),opacity 0.15s,filter 0.15s',
            filter:isDragTarget?'brightness(1.2)':'none'}}>
          <FutCard data={data} size="md" glow={hovered||isDragTarget} scale={scale}/>
        </div>
      ):(
        <div onClick={onClick} onDragOver={e=>e.preventDefault()} onDrop={e=>onDropOnCard(e,slotRole)}
          style={{width:Math.round(110*scale),height:Math.round(152*scale),borderRadius:8,
            background:isDragTarget?'rgba(0,255,135,0.1)':'rgba(255,255,255,0.04)',
            border:`2px dashed ${isDragTarget?'#00ff87':'rgba(255,255,255,0.18)'}`,
            display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:4,cursor:'pointer',
            transition:'all 0.15s'}}>
          <span style={{fontSize:Math.round(28*scale),opacity:0.2}}>+</span>
          <span style={{fontSize:Math.round(12*scale),color:'rgba(255,255,255,0.28)',fontWeight:700}}>{slotLabel}</span>
        </div>
      )}
      {/* Name tag */}
      {data&&(
        <div style={{display:'flex',alignItems:'center',gap:4,background:'rgba(0,0,0,0.85)',backdropFilter:'blur(8px)',
          border:`1px solid ${c!.accent}55`,borderRadius:5,padding:`2px ${Math.round(7*scale)}px`,maxWidth:Math.round(130*scale)}}>
          <span style={{fontSize:nameFs,color:'#f0f6fc',fontWeight:700,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{data.name}</span>
          <button onClick={e=>{e.stopPropagation();onRemove();}} style={{background:'none',border:'none',color:'#ff444066',cursor:'pointer',fontSize:Math.round(13*scale),padding:0,lineHeight:1,flexShrink:0}}
            onMouseEnter={e=>(e.currentTarget.style.color='#ff4444')} onMouseLeave={e=>(e.currentTarget.style.color='#ff444066')}>×</button>
        </div>
      )}
      {/* Sub slot */}
      {data&&(subData?(
        <div draggable onDragStart={onDragStartSub} onClick={onEditSub}
          style={{display:'flex',alignItems:'center',gap:Math.round(6*scale),
            background:'rgba(0,0,0,0.82)',backdropFilter:'blur(8px)',
            border:`1.5px solid ${POS_COLORS[subData.pos].accent}77`,
            borderRadius:20,padding:`${Math.round(5*scale)}px ${Math.round(12*scale)}px ${Math.round(5*scale)}px ${Math.round(8*scale)}px`,
            marginTop:Math.round(2*scale),cursor:'grab',maxWidth:Math.round(155*scale)}}>
          <div style={{width:Math.round(18*scale),height:Math.round(18*scale),borderRadius:'50%',flexShrink:0,background:POS_COLORS[subData.pos].bg,display:'flex',alignItems:'center',justifyContent:'center'}}>
            <span style={{fontSize:Math.round(9*scale),fontWeight:900,color:POS_COLORS[subData.pos].accent,lineHeight:1}}>{subData.pos[0]}</span>
          </div>
          <span style={{fontSize:subFs,fontWeight:700,color:'#f0f6fc',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{subData.name}</span>
          <button onClick={e=>{e.stopPropagation();onRemoveSub();}} style={{background:'none',border:'none',color:'#ff444066',cursor:'pointer',fontSize:Math.round(14*scale),padding:0,lineHeight:1,flexShrink:0,marginLeft:2}}
            onMouseEnter={e=>(e.currentTarget.style.color='#ff4444')} onMouseLeave={e=>(e.currentTarget.style.color='#ff444066')}>×</button>
        </div>
      ):(
        <button onClick={onAddSub}
          style={{background:'rgba(0,0,0,0.45)',border:'1px dashed rgba(255,255,255,0.14)',borderRadius:20,
            padding:`${Math.round(5*scale)}px ${Math.round(14*scale)}px`,fontSize:Math.round(12*scale),
            color:'rgba(255,255,255,0.28)',cursor:'pointer',display:'flex',alignItems:'center',
            gap:Math.round(4*scale),marginTop:Math.round(2*scale),transition:'all 0.15s'}}
          onMouseEnter={e=>{e.currentTarget.style.borderColor='#00ff8877';e.currentTarget.style.color='#00ff87';}}
          onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,0.14)';e.currentTarget.style.color='rgba(255,255,255,0.28)';}}>
          <span style={{fontSize:Math.round(15*scale),lineHeight:1}}>+</span> Yedek
        </button>
      ))}
    </div>
  );
}

/* ═══ MAIN APP ═══ */
export default function LineupBuilder(){
  const [formation,setFormation]       =useState('4-3-3');
  const [lineup,setLineup]             =useState<Record<string,SlotData>>({});
  const [subs,setSubs]                 =useState<Record<string,SlotData>>({});
  const [positions,setPositions]       =useState<Record<string,{x:number;y:number}>>({});
  const [editSlot,setEditSlot]         =useState<string|null>(null);
  const [editSubSlot,setEditSubSlot]   =useState<string|null>(null);
  const [addSubSlot,setAddSubSlot]     =useState<string|null>(null);
  const [dragRole,setDragRole]         =useState<string|null>(null);
  const [dragOverRole,setDragOverRole] =useState<string|null>(null);
  const [dragSubRole,setDragSubRole]   =useState<string|null>(null);
  const [teamName,setTeamName]         =useState('Takımım');
  const [sidebarTab,setSidebarTab]     =useState<'lineup'|'draw'|'kit'|'theme'>('lineup');
  const [globalKit,setGlobalKit]       =useState<{color:string;pattern:KitPattern}>({color:'#2563eb',pattern:'solid'});
  const [showSaveLoad,setShowSaveLoad] =useState(false);
  const [cardScale,setCardScale]       =useState(1.0);
  const [showSettings,setShowSettings] =useState(false);
  const [pitchTheme,setPitchTheme]     =useState<PitchTheme>('classic');
  const [drawTool,setDrawTool]         =useState<DrawTool>('none');
  const [arrowStyle,setArrowStyle]     =useState<ArrowStyle>('attack');
  const [arrows,setArrows]             =useState<DrawnArrow[]>([]);
  const [zones,setZones]               =useState<DrawnZone[]>([]);
  const [paths,setPaths]               =useState<DrawnPath[]>([]);
  const [zoneIdx,setZoneIdx]           =useState(0);
  const [drawColor,setDrawColor]       =useState('#ffffff');
  // Animation
  const [animating,setAnimating]       =useState(false);
  const [animProgress,setAnimProgress] =useState(1); // 0→1 arrows draw
  const [animPositions,setAnimPositions]=useState<Record<string,{x:number;y:number}>>({});
  const animTimerRef                   =useRef<ReturnType<typeof setInterval>|null>(null);
  // Screenshot
  const [showExport,setShowExport]     =useState(false);
  const [exporting,setExporting]       =useState(false);
  const [exportUrl,setExportUrl]       =useState<string|null>(null);
  const pitchRef                       =useRef<HTMLDivElement>(null);

  const curF=FORMATIONS[formation];
  const theme=PITCH_THEMES[pitchTheme];

  const slotPos=useCallback((role:string):{x:number;y:number}=>{
    if(animating&&animPositions[role])return animPositions[role];
    if(positions[role])return positions[role];
    const s=curF.positions.find(p=>p.role===role);
    return s?{x:s.x,y:s.y}:{x:50,y:50};
  },[positions,curF,animating,animPositions]);

  // Persist
  useEffect(()=>{localStorage.setItem('lineup_autosave',JSON.stringify({formation,lineup,subs,positions,teamName,arrows,zones,paths,globalKit,pitchTheme,cardScale}));},[formation,lineup,subs,positions,teamName,arrows,zones,paths,globalKit,pitchTheme,cardScale]);
  useEffect(()=>{try{const r=localStorage.getItem('lineup_autosave');if(r){const s=JSON.parse(r);
    if(s.formation)setFormation(s.formation);if(s.lineup)setLineup(s.lineup);if(s.subs)setSubs(s.subs);
    if(s.positions)setPositions(s.positions);if(s.teamName)setTeamName(s.teamName);
    if(s.arrows)setArrows(s.arrows);if(s.zones)setZones(s.zones);if(s.paths)setPaths(s.paths);
    if(s.globalKit)setGlobalKit(s.globalKit);if(s.pitchTheme)setPitchTheme(s.pitchTheme);if(s.cardScale)setCardScale(s.cardScale);
  }}catch{}},[]);

  // ANIMATION — players pulse to random positions then snap back
  const startAnimation=()=>{
    if(animating){
      setAnimating(false);setAnimProgress(1);setAnimPositions({});
      if(animTimerRef.current)clearInterval(animTimerRef.current);
      return;
    }
    setAnimating(true);setAnimProgress(0);
    // Phase 1: arrows draw
    let prog=0;
    const arrowInt=setInterval(()=>{prog+=0.04;setAnimProgress(Math.min(1,prog));if(prog>=1)clearInterval(arrowInt);},(16));
    // Phase 2: players drift to "run" positions
    setTimeout(()=>{
      const drifted:Record<string,{x:number;y:number}>={};
      curF.positions.forEach(slot=>{
        const base=positions[slot.role]||{x:slot.x,y:slot.y};
        // Each player moves slightly toward attacking position
        const forwardBias=slot.y>50?-8:4; // attackers move up more
        drifted[slot.role]={
          x:Math.max(5,Math.min(95,base.x+(Math.random()-0.5)*18)),
          y:Math.max(5,Math.min(95,base.y+forwardBias+(Math.random()-0.5)*12)),
        };
      });
      setAnimPositions(drifted);
      // Phase 3: snap back
      setTimeout(()=>{setAnimPositions({});setAnimating(false);setAnimProgress(1);},(1800));
    },(600));
  };

  // Screenshot
  const handleScreenshot=async()=>{
    if(!pitchRef.current)return;
    setExporting(true);setShowExport(true);setExportUrl(null);
    try{
      const h2c=(await import('html2canvas')).default;
      const canvas=await h2c(pitchRef.current,{scale:2.5,useCORS:true,allowTaint:true,backgroundColor:theme.bg,logging:false});
      const final=document.createElement('canvas');
      const bh=70;final.width=canvas.width;final.height=canvas.height+bh;
      const ctx=final.getContext('2d')!;
      ctx.fillStyle='#0d1117';ctx.fillRect(0,0,final.width,bh);
      ctx.fillStyle='#00ff87';ctx.fillRect(0,bh-3,final.width,3);
      ctx.fillStyle='#f0f6fc';ctx.font=`bold ${bh*0.42}px Georgia,serif`;ctx.textAlign='left';ctx.fillText((teamName||'TAKIMIM').toUpperCase(),28,bh*0.65);
      ctx.fillStyle='#00ff87';ctx.font=`bold ${bh*0.3}px Inter,sans-serif`;ctx.textAlign='right';ctx.fillText(formation,final.width-28,bh*0.65);
      ctx.drawImage(canvas,0,bh);
      ctx.fillStyle='rgba(0,0,0,0.65)';ctx.fillRect(0,final.height-30,final.width,30);
      ctx.fillStyle='rgba(255,255,255,0.3)';ctx.font=`${bh*0.2}px Inter,sans-serif`;ctx.textAlign='center';
      ctx.fillText(`${Object.keys(lineup).length} oyuncu · ${Object.keys(subs).length} yedek · Lineup Builder`,final.width/2,final.height-10);
      setExportUrl(final.toDataURL('image/png'));
    }catch(e){console.error(e);}
    setExporting(false);
  };

  const handleFormationChange=(f:string)=>{
    const newSlots=FORMATIONS[f].positions.map(p=>p.role);
    const oldSlots=curF.positions;
    const nl:Record<string,SlotData>={},ns:Record<string,SlotData>={};
    newSlots.forEach((role,i)=>{const old=oldSlots[i];if(old&&lineup[old.role])nl[role]=lineup[old.role];if(old&&subs[old.role])ns[role]=subs[old.role];});
    setLineup(nl);setSubs(ns);setPositions({});setFormation(f);
  };

  const handleDragStartCard=(e:React.DragEvent,role:string)=>{if(drawTool!=='none'){e.preventDefault();return;}e.dataTransfer.effectAllowed='move';setDragRole(role);setDragSubRole(null);};
  const handleDragStartSub=(e:React.DragEvent,role:string)=>{if(drawTool!=='none'){e.preventDefault();return;}e.dataTransfer.effectAllowed='move';setDragSubRole(role);setDragRole(null);};

  const handleDropOnCard=(e:React.DragEvent,targetRole:string)=>{
    e.preventDefault();setDragOverRole(null);
    if(dragRole&&dragRole!==targetRole){
      setLineup(prev=>{const n={...prev};const a=n[dragRole],b=n[targetRole];if(a)n[targetRole]=a;else delete n[targetRole];if(b)n[dragRole]=b;else delete n[dragRole];return n;});
      setSubs(prev=>{const n={...prev};const a=n[dragRole],b=n[targetRole];if(a)n[targetRole]=a;else delete n[targetRole];if(b)n[dragRole]=b;else delete n[dragRole];return n;});
      setDragRole(null);
    }else if(dragSubRole){
      const sub=subs[dragSubRole];if(!sub){setDragSubRole(null);return;}
      const existing=lineup[targetRole];
      setLineup(prev=>({...prev,[targetRole]:sub}));
      if(existing)setSubs(prev=>({...prev,[dragSubRole]:existing,[targetRole]:undefined as unknown as SlotData}));
      else setSubs(prev=>{const n={...prev};delete n[dragSubRole];return n;});
      setDragSubRole(null);
    }
  };

  const handlePitchDragOver=(e:React.DragEvent)=>{
    e.preventDefault();
    if(!dragRole||!pitchRef.current)return;
    const r=pitchRef.current.getBoundingClientRect();
    const x=Math.max(4,Math.min(96,(e.clientX-r.left)/r.width*100));
    const y=Math.max(4,Math.min(96,(e.clientY-r.top)/r.height*100));
    setPositions(prev=>({...prev,[dragRole]:{x,y}}));
  };
  const handlePitchDrop=(e:React.DragEvent)=>{
    e.preventDefault();
    if(!dragRole||!pitchRef.current)return;
    const r=pitchRef.current.getBoundingClientRect();
    const x=Math.max(4,Math.min(96,(e.clientX-r.left)/r.width*100));
    const y=Math.max(4,Math.min(96,(e.clientY-r.top)/r.height*100));
    setPositions(prev=>({...prev,[dragRole]:{x,y}}));setDragRole(null);
  };

  const clearAll=()=>{setLineup({});setSubs({});setPositions({});setArrows([]);setZones([]);setPaths([]);};
  const applyGlobalKit=()=>{
    setLineup(prev=>Object.fromEntries(Object.entries(prev).map(([k,v])=>[k,{...v,kitColor:globalKit.color,kitPattern:globalKit.pattern}])));
    setSubs(prev=>Object.fromEntries(Object.entries(prev).map(([k,v])=>[k,{...v,kitColor:globalKit.color,kitPattern:globalKit.pattern}])));
  };
  const loadPlan=(plan:SavedPlan)=>{
    setFormation(plan.formation);setLineup(plan.lineup);setSubs(plan.subs||{});
    setPositions(plan.positions||{});setTeamName(plan.teamName);
    setArrows(plan.arrows||[]);setZones(plan.zones||[]);setPaths(plan.paths||[]);
    if(plan.kitColor)setGlobalKit({color:plan.kitColor,pattern:plan.kitPattern||'solid'});
  };
  const curPlan:Omit<SavedPlan,'id'|'savedAt'>={name:teamName,formation,teamName,lineup,subs,positions,arrows,zones,paths,kitColor:globalKit.color,kitPattern:globalKit.pattern};
  const editingSlot=editSlot?curF.positions.find(p=>p.role===editSlot):null;
  const filledCount=Object.keys(lineup).length;
  const subsCount=Object.keys(subs).length;

  return(
    <div style={{display:'flex',height:'100vh',overflow:'hidden',background:'#080b0f',fontFamily:"'Inter',sans-serif",color:'#f0f6fc'}}>

      {/* MODALS */}
      {editSlot&&editingSlot&&<EditModal slotLabel={editingSlot.label} initial={lineup[editSlot]||{...DEFAULT_KIT,pos:SLOT_POS[editSlot]||'MID',kitColor:globalKit.color,kitPattern:globalKit.pattern}} onSave={d=>{setLineup(prev=>({...prev,[editSlot]:d}));setEditSlot(null);}} onClose={()=>setEditSlot(null)}/>}
      {addSubSlot&&<EditModal slotLabel="Yedek" initial={{...DEFAULT_KIT,pos:SLOT_POS[addSubSlot]||'MID',kitColor:globalKit.color,kitPattern:globalKit.pattern}} onSave={d=>{setSubs(prev=>({...prev,[addSubSlot]:d}));setAddSubSlot(null);}} onClose={()=>setAddSubSlot(null)}/>}
      {editSubSlot&&subs[editSubSlot]&&<EditModal slotLabel="Yedek" initial={subs[editSubSlot]} onSave={d=>{setSubs(prev=>({...prev,[editSubSlot]:d}));setEditSubSlot(null);}} onClose={()=>setEditSubSlot(null)}/>}
      {showSaveLoad&&<SaveLoadModal current={curPlan} onLoad={loadPlan} onClose={()=>setShowSaveLoad(false)}/>}
      {showExport&&(
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.85)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:400,backdropFilter:'blur(10px)'}} onClick={e=>{if(e.target===e.currentTarget){setShowExport(false);setExportUrl(null);}}}>
          <div style={{background:'#0d1117',border:'1px solid #30363d',borderRadius:16,padding:24,maxWidth:520,width:'90vw',boxShadow:'0 24px 64px rgba(0,0,0,0.9)'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
              <div style={{fontSize:16,fontWeight:800,color:'#f0f6fc'}}>📸 Ekran Görüntüsü</div>
              <button onClick={()=>{setShowExport(false);setExportUrl(null);}} style={{background:'#21262d',border:'none',color:'#8b949e',width:28,height:28,borderRadius:6,cursor:'pointer',fontSize:16}}>×</button>
            </div>
            {exporting?<div style={{textAlign:'center',padding:'40px 0'}}><div style={{fontSize:32,marginBottom:12}}>⏳</div><div style={{fontSize:14,color:'#8b949e'}}>Görüntü hazırlanıyor...</div></div>
            :exportUrl?<>
              <img src={exportUrl} alt="lineup" style={{width:'100%',borderRadius:8,marginBottom:14,border:'1px solid #30363d'}}/>
              <div style={{display:'flex',gap:8}}>
                <a href={exportUrl} download={`${teamName||'lineup'}-${formation}.png`}
                  style={{flex:1,background:'linear-gradient(135deg,#6366f1,#8b5cf6)',color:'#fff',padding:'11px',borderRadius:8,fontSize:13,fontWeight:700,cursor:'pointer',textDecoration:'none',textAlign:'center',display:'block'}}>⬇️ PNG İndir</a>
                <button onClick={()=>{const w=window.open();if(w)w.document.write(`<img src="${exportUrl}" style="max-width:100%">`);}} style={{flex:1,background:'#21262d',border:'1px solid #30363d',color:'#f0f6fc',padding:'11px',borderRadius:8,fontSize:13,fontWeight:600,cursor:'pointer'}}>🔗 Yeni Sekme</button>
              </div>
            </>:null}
          </div>
        </div>
      )}

      {/* ══ LEFT SIDEBAR ══ */}
      <div style={{width:258,background:'#0d1117',borderRight:'1px solid #1c2128',display:'flex',flexDirection:'column',flexShrink:0}}>
        <div style={{padding:'13px 13px 11px',borderBottom:'1px solid #1c2128'}}>
          <div style={{display:'flex',alignItems:'center',gap:9,marginBottom:11}}>
            <div style={{width:35,height:35,background:'linear-gradient(135deg,#00ff87,#00cc6e)',borderRadius:9,display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,boxShadow:'0 4px 12px rgba(0,255,135,0.3)',flexShrink:0}}>⚽</div>
            <div><div style={{fontSize:13,fontWeight:800,color:'#f0f6fc',letterSpacing:1.5,fontFamily:'Georgia,serif'}}>LINEUP BUILDER</div><div style={{fontSize:9,color:'#8b949e'}}>FIFA FUT Taktik Aracı</div></div>
          </div>
          <input value={teamName} onChange={e=>setTeamName(e.target.value)} placeholder="Takım adı..."
            style={{width:'100%',background:'#161b22',border:'1px solid #1c2128',borderRadius:6,padding:'7px 10px',color:'#f0f6fc',fontSize:13,fontWeight:600,outline:'none',marginBottom:9,boxSizing:'border-box'}}/>
          <div style={{fontSize:9,color:'#8b949e',fontWeight:700,marginBottom:4}}>FORMASYON</div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:3,marginBottom:9}}>
            {Object.keys(FORMATIONS).map(f=><button key={f} onClick={()=>handleFormationChange(f)} style={{background:formation===f?'#00ff87':'#161b22',color:formation===f?'#000':'#8b949e',border:'none',borderRadius:4,padding:'4px 1px',fontSize:9,fontWeight:700,cursor:'pointer'}}>{f}</button>)}
          </div>
          <div style={{display:'flex',gap:4,marginBottom:9}}>
            {[{v:filledCount,l:'İLK 11',c:'#00ff87'},{v:subsCount,l:'YEDEK',c:'#fbbf24'},{v:curF.positions.length-filledCount,l:'BOŞ',c:'#8b949e'}].map(s=><div key={s.l} style={{flex:1,background:'#161b22',borderRadius:5,padding:'5px 3px',textAlign:'center',border:'1px solid #1c2128'}}><div style={{fontSize:15,fontWeight:700,color:s.c}}>{s.v}</div><div style={{fontSize:7,color:'#8b949e'}}>{s.l}</div></div>)}
          </div>
          <div style={{display:'flex',gap:4}}>
            <button onClick={()=>setShowSaveLoad(true)} style={{flex:1,background:'#161b22',border:'1px solid #1c2128',color:'#f0f6fc',padding:'5px 0',borderRadius:5,fontSize:9,fontWeight:700,cursor:'pointer'}}>💾 Kaydet</button>
            <button onClick={()=>setPositions({})} style={{flex:1,background:'#161b22',border:'1px solid #1c2128',color:'#8b949e',padding:'5px 0',borderRadius:5,fontSize:9,fontWeight:700,cursor:'pointer'}}>↺ Sıfırla</button>
            <button onClick={clearAll} style={{flex:1,background:'#161b22',border:'1px solid #ff444422',color:'#ff4444',padding:'5px 0',borderRadius:5,fontSize:9,fontWeight:700,cursor:'pointer'}}>🗑 Temizle</button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{display:'flex',borderBottom:'1px solid #1c2128'}}>
          {([['lineup','👥'],['draw','✏️'],['kit','🎨'],['theme','🌙']] as const).map(([t,i])=>(
            <button key={t} onClick={()=>setSidebarTab(t)} style={{flex:1,padding:'7px 0',background:'none',border:'none',color:sidebarTab===t?'#00ff87':'#8b949e',fontSize:9,fontWeight:700,cursor:'pointer',borderBottom:sidebarTab===t?'2px solid #00ff87':'2px solid transparent'}}>
              {i} {t==='lineup'?'Kadro':t==='draw'?'Çizim':t==='kit'?'Forma':'Tema'}
            </button>
          ))}
        </div>

        {/* LINEUP TAB */}
        {sidebarTab==='lineup'&&(
          <div style={{flex:1,overflowY:'auto',padding:7}}>
            {curF.positions.map(slot=>{
              const p=lineup[slot.role];const sub=subs[slot.role];const c=p?POS_COLORS[p.pos]:null;
              return(<div key={slot.role} style={{marginBottom:3}}>
                <div onClick={()=>setEditSlot(slot.role)} style={{display:'flex',alignItems:'center',gap:6,padding:'6px 7px',borderRadius:6,cursor:'pointer',background:p?'#161b22':'#0f1318',border:`1px solid ${p?c!.accent+'44':'#1c2128'}`,transition:'all 0.1s'}}
                  onMouseEnter={e=>(e.currentTarget.style.borderColor='#00ff8766')} onMouseLeave={e=>(e.currentTarget.style.borderColor=p?c!.accent+'44':'#1c2128')}>
                  <div style={{width:20,fontSize:7,fontWeight:700,color:p?c!.text:'#8b949e',background:p?c!.bg:'#21262d',borderRadius:3,padding:'2px 2px',textAlign:'center',flexShrink:0}}>{slot.label}</div>
                  {p?<><FutCard data={p} size="sm" scale={0.55}/>
                    <div style={{flex:1,minWidth:0}}><div style={{fontSize:11,fontWeight:600,color:'#f0f6fc',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{p.name}</div>{p.note&&<div style={{fontSize:9,color:'#8b949e',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{p.note}</div>}</div>
                    <button onClick={e=>{e.stopPropagation();setLineup(prev=>{const n={...prev};delete n[slot.role];return n;});}} style={{background:'none',border:'none',color:'#ff444066',cursor:'pointer',fontSize:13,padding:'0 1px',flexShrink:0}}>×</button>
                  </>:<div style={{flex:1,fontSize:11,color:'#8b949e'}}><span style={{color:'#00ff87'}}>+</span> Oyuncu ekle</div>}
                </div>
                {p&&(<div style={{display:'flex',alignItems:'center',gap:5,padding:'2px 7px 2px 26px'}}>
                  <div style={{width:1,height:16,background:'#1c2128',flexShrink:0}}/>
                  {sub?<div onClick={()=>setEditSubSlot(slot.role)} style={{display:'flex',alignItems:'center',gap:5,flex:1,cursor:'pointer',padding:'2px 5px',borderRadius:4,background:'#0f1318',border:'1px solid #1c2128'}}
                    onMouseEnter={e=>(e.currentTarget.style.background='#161b22')} onMouseLeave={e=>(e.currentTarget.style.background='#0f1318')}>
                    <div style={{width:16,height:16,borderRadius:'50%',background:POS_COLORS[sub.pos].bg,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                      <span style={{fontSize:7,fontWeight:900,color:POS_COLORS[sub.pos].accent}}>{sub.pos[0]}</span>
                    </div>
                    <div style={{flex:1,minWidth:0}}><div style={{fontSize:10,color:'#c9d1d9',fontWeight:600,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{sub.name}</div></div>
                    <button onClick={e=>{e.stopPropagation();setSubs(prev=>{const n={...prev};delete n[slot.role];return n;});}} style={{background:'none',border:'none',color:'#ff444066',cursor:'pointer',fontSize:12,padding:0}}>×</button>
                  </div>:<button onClick={()=>setAddSubSlot(slot.role)} style={{fontSize:9,color:'#8b949e',background:'none',border:'1px dashed #1c2128',borderRadius:4,padding:'2px 7px',cursor:'pointer'}}
                    onMouseEnter={e=>{e.currentTarget.style.color='#00ff87';e.currentTarget.style.borderColor='#00ff8766';}} onMouseLeave={e=>{e.currentTarget.style.color='#8b949e';e.currentTarget.style.borderColor='#1c2128';}}>+ Yedek ekle</button>}
                </div>)}
              </div>);
            })}
          </div>
        )}

        {/* DRAW TAB */}
        {sidebarTab==='draw'&&(<div style={{flex:1,overflowY:'auto',padding:11}}>
          <div style={{fontSize:10,color:'#8b949e',fontWeight:700,marginBottom:7}}>ÇİZİM ARACI</div>
          {([['none','🚫 Kapalı'],['arrow','→ Ok'],['zone','□ Bölge'],['freehand','✏️ Serbest']] as const).map(([t,l])=>(
            <button key={t} onClick={()=>setDrawTool(t)} style={{width:'100%',padding:'8px 11px',background:drawTool===t?'#161b22':'transparent',color:drawTool===t?'#00ff87':'#8b949e',border:drawTool===t?'1px solid #00ff8744':'1px solid transparent',borderRadius:6,fontSize:11,fontWeight:700,cursor:'pointer',textAlign:'left',marginBottom:3}}>
              {l}{drawTool===t&&<span style={{float:'right'}}>●</span>}
            </button>
          ))}
          {drawTool==='arrow'&&<>{<div style={{fontSize:10,color:'#8b949e',fontWeight:700,margin:'10px 0 6px'}}>OK TÜRÜ</div>}{(Object.entries(ARROW_STYLES) as [ArrowStyle,typeof ARROW_STYLES[ArrowStyle]][]).map(([k,st])=>(
            <button key={k} onClick={()=>setArrowStyle(k)} style={{width:'100%',display:'flex',alignItems:'center',gap:7,padding:'6px 9px',background:arrowStyle===k?'#161b22':'transparent',border:arrowStyle===k?`1px solid ${st.color}44`:'1px solid transparent',borderRadius:5,cursor:'pointer',marginBottom:3}}>
              <div style={{width:20,height:3,background:st.color,borderRadius:2,flexShrink:0}}/><span style={{fontSize:11,color:arrowStyle===k?'#f0f6fc':'#8b949e',fontWeight:600}}>{st.label}</span>
            </button>
          ))}</>}
          {drawTool==='zone'&&<>{<div style={{fontSize:10,color:'#8b949e',fontWeight:700,margin:'10px 0 6px'}}>BÖLGE TÜRÜ</div>}{ZONE_LABELS.map((l,i)=>(
            <button key={i} onClick={()=>setZoneIdx(i)} style={{width:'100%',display:'flex',alignItems:'center',gap:7,padding:'6px 9px',background:zoneIdx===i?'#161b22':'transparent',border:zoneIdx===i?'1px solid #30363d':'1px solid transparent',borderRadius:5,cursor:'pointer',marginBottom:3}}>
              <div style={{width:12,height:12,borderRadius:3,background:ZONE_COLORS[i],border:`1px solid ${ZONE_COLORS[i].replace('33','88')}`,flexShrink:0}}/><span style={{fontSize:11,color:zoneIdx===i?'#f0f6fc':'#8b949e',fontWeight:600}}>{l}</span>
            </button>
          ))}</>}
          {drawTool==='freehand'&&<>{<div style={{fontSize:10,color:'#8b949e',fontWeight:700,margin:'10px 0 6px'}}>RENK</div>}<div style={{display:'flex',flexWrap:'wrap',gap:5}}>
            {['#ffffff','#f87171','#34d399','#fbbf24','#60a5fa','#a78bfa'].map(c=><div key={c} onClick={()=>setDrawColor(c)} style={{width:20,height:20,borderRadius:'50%',background:c,cursor:'pointer',border:drawColor===c?'3px solid #fff':'2px solid transparent',boxSizing:'border-box'}}/>)}
          </div></>}
          {(arrows.length>0||zones.length>0||paths.length>0)&&<button onClick={()=>{setArrows([]);setZones([]);setPaths([]);}} style={{width:'100%',marginTop:14,padding:'7px',background:'transparent',border:'1px solid #ff444433',color:'#ff4444',borderRadius:5,fontSize:11,fontWeight:700,cursor:'pointer'}}>🗑 Çizimleri Sil</button>}
        </div>)}

        {/* KIT TAB */}
        {sidebarTab==='kit'&&(<div style={{flex:1,overflowY:'auto',padding:11}}>
          <div style={{fontSize:10,color:'#8b949e',fontWeight:700,marginBottom:7}}>TAKIM FORMASI</div>
          <div style={{display:'flex',justifyContent:'center',gap:7,marginBottom:12,background:'#161b22',borderRadius:9,padding:'12px 0',border:'1px solid #1c2128'}}>
            {(['GK','DEF','MID','FWD'] as PosType[]).map(pos=><FutCard key={pos} data={{...DEFAULT_KIT,name:pos,pos,kitColor:globalKit.color,kitPattern:globalKit.pattern}} size="sm" scale={0.7}/>)}
          </div>
          <div style={{fontSize:10,color:'#8b949e',fontWeight:700,marginBottom:5}}>FORMA RENGİ</div>
          <div style={{display:'flex',flexWrap:'wrap',gap:5,marginBottom:12}}>
            {KIT_COLS.map(c=><div key={c} onClick={()=>setGlobalKit(prev=>({...prev,color:c}))} style={{width:22,height:22,borderRadius:'50%',background:c,cursor:'pointer',border:globalKit.color===c?'3px solid #00ff87':'2px solid transparent',boxSizing:'border-box',flexShrink:0}}/>)}
            <input type="color" value={globalKit.color} onChange={e=>setGlobalKit(prev=>({...prev,color:e.target.value}))} style={{width:22,height:22,borderRadius:'50%',border:'none',cursor:'pointer',padding:0,background:'none'}}/>
          </div>
          <div style={{fontSize:10,color:'#8b949e',fontWeight:700,marginBottom:5}}>DESEN</div>
          <div style={{display:'flex',flexDirection:'column',gap:3,marginBottom:12}}>
            {(Object.entries(KIT_PATTERNS) as [KitPattern,string][]).map(([k,v])=><button key={k} onClick={()=>setGlobalKit(prev=>({...prev,pattern:k}))} style={{padding:'7px 11px',background:globalKit.pattern===k?'#161b22':'transparent',color:globalKit.pattern===k?'#00ff87':'#8b949e',border:globalKit.pattern===k?'1px solid #00ff8744':'1px solid transparent',borderRadius:5,fontSize:11,fontWeight:700,cursor:'pointer',textAlign:'left'}}>{v}{globalKit.pattern===k&&<span style={{float:'right'}}>✓</span>}</button>)}
          </div>
          <button onClick={applyGlobalKit} style={{width:'100%',padding:'9px',background:'#00ff87',border:'none',color:'#000',borderRadius:7,fontSize:12,fontWeight:700,cursor:'pointer'}}>✨ Tüm Oyunculara Uygula</button>
        </div>)}

        {/* THEME TAB */}
        {sidebarTab==='theme'&&(<div style={{flex:1,overflowY:'auto',padding:11}}>
          <div style={{fontSize:10,color:'#8b949e',fontWeight:700,marginBottom:7}}>SAHA TEMASI</div>
          {(Object.entries(PITCH_THEMES) as [PitchTheme,typeof PITCH_THEMES[PitchTheme]][]).map(([k,t])=>(
            <button key={k} onClick={()=>setPitchTheme(k)} style={{width:'100%',display:'flex',alignItems:'center',gap:9,padding:'9px 11px',background:pitchTheme===k?'#161b22':'transparent',border:pitchTheme===k?'1px solid #00ff8744':'1px solid transparent',borderRadius:7,cursor:'pointer',marginBottom:4}}>
              <span style={{fontSize:18}}>{t.emoji}</span>
              <div style={{textAlign:'left'}}>
                <div style={{fontSize:12,fontWeight:700,color:pitchTheme===k?'#00ff87':'#f0f6fc'}}>{t.label}</div>
                <div style={{width:60,height:8,borderRadius:2,background:`linear-gradient(90deg,${t.bg},${t.stripe})`,marginTop:3,border:`1px solid ${t.line}`}}/>
              </div>
              {pitchTheme===k&&<span style={{marginLeft:'auto',color:'#00ff87',fontSize:14}}>✓</span>}
            </button>
          ))}
          <div style={{marginTop:14,fontSize:10,color:'#8b949e',fontWeight:700,marginBottom:7}}>KART BOYUTU</div>
          <div style={{display:'flex',alignItems:'center',gap:7,marginBottom:8}}>
            <button onClick={()=>setCardScale(s=>Math.max(0.6,+(s-0.1).toFixed(1)))} style={{width:26,height:26,background:'#161b22',border:'1px solid #30363d',borderRadius:5,color:'#f0f6fc',cursor:'pointer',fontSize:14,display:'flex',alignItems:'center',justifyContent:'center'}}>−</button>
            <div style={{flex:1,textAlign:'center',fontSize:12,fontWeight:700,color:'#00ff87',background:'#161b22',borderRadius:5,padding:'4px 0',border:'1px solid #1c2128'}}>{Math.round(cardScale*100)}%</div>
            <button onClick={()=>setCardScale(s=>Math.min(1.6,+(s+0.1).toFixed(1)))} style={{width:26,height:26,background:'#161b22',border:'1px solid #30363d',borderRadius:5,color:'#f0f6fc',cursor:'pointer',fontSize:14,display:'flex',alignItems:'center',justifyContent:'center'}}>+</button>
          </div>
          <div style={{display:'flex',gap:4}}>
            {[0.7,0.85,1.0,1.2,1.4].map(v=><button key={v} onClick={()=>setCardScale(v)} style={{flex:1,padding:'4px 0',background:cardScale===v?'#00ff87':'#161b22',border:'none',borderRadius:4,color:cardScale===v?'#000':'#8b949e',fontSize:9,fontWeight:700,cursor:'pointer'}}>{Math.round(v*100)}%</button>)}
          </div>
        </div>)}
      </div>

      {/* ══ MAIN AREA ══ */}
      <div style={{flex:1,display:'flex',flexDirection:'column',overflow:'hidden'}}>
        {/* Topbar */}
        <div style={{padding:'8px 16px',borderBottom:'1px solid #1c2128',display:'flex',alignItems:'center',justifyContent:'space-between',background:'#0d1117',flexShrink:0}}>
          <div style={{display:'flex',alignItems:'center',gap:9}}>
            <h1 style={{fontSize:18,fontWeight:800,color:'#f0f6fc',letterSpacing:2,fontFamily:'Georgia,serif',margin:0}}>{teamName.toUpperCase()||'TAKIMIM'}</h1>
            <span style={{background:'#161b22',color:'#00ff87',padding:'3px 9px',borderRadius:20,fontSize:11,fontWeight:700,border:'1px solid #00ff8733'}}>{formation}</span>
            <span style={{fontSize:11,color:'#8b949e'}}>{filledCount}/{curF.positions.length} oyuncu</span>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:6}}>
            {drawTool!=='none'&&<div style={{background:'#fbbf2422',border:'1px solid #fbbf2455',borderRadius:5,padding:'4px 9px',fontSize:10,color:'#fbbf24',fontWeight:700}}>✏️ Çizim aktif</div>}
            <button onClick={startAnimation}
              style={{background:animating?'#dc262622':'linear-gradient(135deg,#7c3aed,#6d28d9)',border:animating?'1px solid #dc262655':'none',color:'#fff',padding:'6px 12px',borderRadius:6,fontSize:11,fontWeight:700,cursor:'pointer'}}>
              {animating?'⏹ Durdur':'🎬 Animasyon'}
            </button>
            <button onClick={handleScreenshot}
              style={{background:'linear-gradient(135deg,#6366f1,#8b5cf6)',border:'none',color:'#fff',padding:'6px 12px',borderRadius:6,fontSize:11,fontWeight:700,cursor:'pointer'}}>📸 Görüntü</button>
          </div>
        </div>

        {/* PITCH */}
        <div style={{flex:1,overflow:'hidden',position:'relative'}}>
          <div ref={pitchRef} style={{position:'absolute',inset:0,overflow:'hidden'}}
            onDragOver={handlePitchDragOver} onDrop={handlePitchDrop}>
            {/* Grass */}
            <div style={{position:'absolute',inset:0,background:`repeating-linear-gradient(0deg,${theme.bg} 0px,${theme.bg} 44px,${theme.stripe} 44px,${theme.stripe} 88px)`}}/>
            {/* Theme overlay */}
            {theme.overlay&&<div style={{position:'absolute',inset:0,background:theme.overlay,pointerEvents:'none'}}/>}
            {/* Vignette */}
            <div style={{position:'absolute',inset:0,background:`radial-gradient(ellipse at 50% 50%,transparent 55%,${theme.vignette} 100%)`,pointerEvents:'none',zIndex:2}}/>
            {/* Lines */}
            <svg style={{position:'absolute',inset:0,width:'100%',height:'100%',zIndex:1}} viewBox="0 0 100 100" preserveAspectRatio="none">
              <rect x="3" y="2" width="94" height="96" fill="none" stroke={theme.line} strokeWidth="0.35"/>
              <line x1="3" y1="50" x2="97" y2="50" stroke={theme.line} strokeWidth="0.3"/>
              <circle cx="50" cy="50" r="10" fill="none" stroke={theme.line} strokeWidth="0.3"/>
              <circle cx="50" cy="50" r="0.6" fill={theme.line}/>
              <rect x="22" y="2" width="56" height="17" fill="none" stroke={theme.line} strokeWidth="0.3"/>
              <rect x="35" y="2" width="30" height="7" fill="none" stroke={theme.line} strokeWidth="0.3"/>
              <circle cx="50" cy="13" r="0.5" fill={theme.line}/>
              <rect x="22" y="81" width="56" height="17" fill="none" stroke={theme.line} strokeWidth="0.3"/>
              <rect x="35" y="91" width="30" height="7" fill="none" stroke={theme.line} strokeWidth="0.3"/>
              <circle cx="50" cy="87" r="0.5" fill={theme.line}/>
              <rect x="40" y="0" width="20" height="2" fill="rgba(255,255,255,0.12)" stroke={theme.line} strokeWidth="0.25"/>
              <rect x="40" y="98" width="20" height="2" fill="rgba(255,255,255,0.12)" stroke={theme.line} strokeWidth="0.25"/>
            </svg>
            {/* Snow particles */}
            {pitchTheme==='snow'&&[...Array(18)].map((_,i)=><div key={i} style={{position:'absolute',left:`${(i*17+7)%97}%`,top:`${(i*23+5)%95}%`,width:Math.random()*4+2,height:Math.random()*4+2,borderRadius:'50%',background:'rgba(255,255,255,0.7)',pointerEvents:'none',zIndex:3}}/>)}
            {/* Drawing layer */}
            <DrawingLayer arrows={arrows} zones={zones} paths={paths}
              activeTool={drawTool} arrowStyle={arrowStyle}
              zoneColor={ZONE_COLORS[zoneIdx]} zoneLabel={ZONE_LABELS[zoneIdx]} drawColor={drawColor}
              onAddArrow={a=>setArrows(prev=>[...prev,a])} onAddZone={z=>setZones(prev=>[...prev,z])} onAddPath={p=>setPaths(prev=>[...prev,p])}
              onDeleteArrow={id=>setArrows(prev=>prev.filter(a=>a.id!==id))} onDeleteZone={id=>setZones(prev=>prev.filter(z=>z.id!==id))} onDeletePath={id=>setPaths(prev=>prev.filter(p=>p.id!==id))}
              animProgress={animProgress}/>
            {/* Cards */}
            {curF.positions.map(slot=>{
              const pos=slotPos(slot.role);
              const animPos=animating&&animPositions[slot.role]?animPositions[slot.role]:undefined;
              return(<PitchCard key={slot.role} slotRole={slot.role} slotLabel={slot.label}
                data={lineup[slot.role]} subData={subs[slot.role]}
                x={pos.x} y={pos.y}
                animX={animPos?.x} animY={animPos?.y}
                onDragStartCard={handleDragStartCard} onDropOnCard={handleDropOnCard}
                isDragTarget={dragOverRole===slot.role} drawTool={drawTool}
                onClick={()=>drawTool==='none'&&!animating&&setEditSlot(slot.role)}
                onRemove={()=>setLineup(prev=>{const n={...prev};delete n[slot.role];return n;})}
                onAddSub={()=>setAddSubSlot(slot.role)} onEditSub={()=>setEditSubSlot(slot.role)}
                onRemoveSub={()=>setSubs(prev=>{const n={...prev};delete n[slot.role];return n;})}
                onDragStartSub={e=>handleDragStartSub(e,slot.role)}
                scale={cardScale}/>);
            })}
            {/* Watermarks */}
            <div style={{position:'absolute',bottom:7,right:11,fontSize:10,color:'rgba(255,255,255,0.1)',fontFamily:'Georgia,serif',letterSpacing:2,zIndex:3,pointerEvents:'none'}}>{formation}</div>
            <div style={{position:'absolute',top:5,left:0,right:0,textAlign:'center',fontSize:11,color:'rgba(255,255,255,0.07)',fontFamily:'Georgia,serif',letterSpacing:4,zIndex:3,pointerEvents:'none'}}>{teamName.toUpperCase()}</div>
            {filledCount===0&&!animating&&<div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',zIndex:4,pointerEvents:'none'}}>
              <div style={{textAlign:'center',opacity:0.35}}><div style={{fontSize:38,marginBottom:8}}>⚽</div><div style={{fontSize:13,color:'#f0f6fc',fontWeight:600}}>Soldaki listeden oyuncu ekle</div><div style={{fontSize:10,color:'#8b949e',marginTop:3}}>veya sahadaki + ikonlarına tıkla</div></div>
            </div>}
          </div>
        </div>

        {/* Hint bar */}
        <div style={{padding:'5px 14px',background:'#0d1117',borderTop:'1px solid #1c2128',display:'flex',gap:14,flexShrink:0,flexWrap:'wrap'}}>
          {[['🖱️ Sürükle','İstediğin yere taşı'],['🔄 Karta Bırak','Pozisyon değiştir'],['➕ Tıkla','Oyuncu ekle'],['🎬 Animasyon','Taktiği canlandır'],['🌙 Tema','Saha görünümünü değiştir']].map(([t,d])=>(
            <div key={t} style={{fontSize:9,color:'#8b949e'}}><span style={{color:'#f0f6fc',fontWeight:600}}>{t}</span> — {d}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
