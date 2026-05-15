import React, { useState, useEffect, useMemo } from 'react';
import { Coffee, Clock, MapPin, Wifi, Volume2, Users, Utensils, Car, Train, Star, Edit3, X, Check, ArrowLeft, Sparkles, AlertCircle, Footprints, Palette } from 'lucide-react';

const STORAGE_KEY = 'rons-coffee-data-v3';

const SEED_DATA = [
  { id: 1,  name: "Revival Cambridge",              neighborhood: "Central Square",    favorite: false, season: "All Year",  hours: "08:00-15:00", openLate: false, noise: 3, food: 4, wifi: 4, seating: 4, parkingType: "",          parkingCost: "",      transit: "Red Line", walkMinutes: 25,   goodFor: "All",            stayLength: "Couple Hrs", notes: "Bright, airy space. Solid coffee and all-day food." },
  { id: 2,  name: "Revival Watertown",              neighborhood: "Watertown",         favorite: false, season: "All Year",  hours: "08:00-15:00", openLate: false, noise: 3, food: 4, wifi: 4, seating: 5, parkingType: "Free Lot",   parkingCost: "Free",  transit: "",         walkMinutes: null, goodFor: "All",            stayLength: "Camp Out",   notes: "Spacious with great parking. Best Revival for long sessions." },
  { id: 3,  name: "Revival Alewife",                neighborhood: "Alewife",           favorite: true,  season: "All Year",  hours: "08:00-15:00", openLate: false, noise: 3, food: 4, wifi: 4, seating: 5, parkingType: "Free Lot",   parkingCost: "Free",  transit: "Red Line", walkMinutes: null, goodFor: "All",            stayLength: "Camp Out",   notes: "Tons of seating, free parking, Red Line access. Opens at 8 daily." },
  { id: 4,  name: "Jaho Central Square",            neighborhood: "Central Square",    favorite: true,  season: "Winter",    hours: "06:30-23:00", openLate: true,  noise: 3, food: 3, wifi: 4, seating: 3, parkingType: "",          parkingCost: "",      transit: "Red Line", walkMinutes: 25,   goodFor: "Research/Casual", stayLength: "Couple Hrs", notes: "Warm, cozy. Open until 11pm every day — best late-night option.", scoreBump: 15 },
  { id: 5,  name: "Jaho Downtown Boston",           neighborhood: "Downtown Boston",   favorite: false, season: "",          hours: "07:00-18:00", openLate: false, noise: 3, food: 3, wifi: 4, seating: 3, parkingType: "",          parkingCost: "",      transit: "",         walkMinutes: null, goodFor: "Casual",         stayLength: "Quick",      notes: "Specialty coffee downtown." },
  { id: 6,  name: "Capital One Cafe",               neighborhood: "Downtown Boston",   favorite: false, season: "All Year",  hours: "07:00-19:00", openLate: false, noise: 3, food: 2, wifi: 5, seating: 4, parkingType: "",          parkingCost: "",      transit: "",         walkMinutes: null, goodFor: "All",            stayLength: "Camp Out",   notes: "Free WiFi, tons of outlets. Light snacks only." },
  { id: 7,  name: "Block Cafe",                     neighborhood: "Cambridge",         favorite: false, season: "",          hours: "07:00-16:00", openLate: false, noise: 3, food: 3, wifi: 4, seating: 3, parkingType: "",          parkingCost: "",      transit: "",         walkMinutes: 20,   goodFor: "Casual/Research", stayLength: "Couple Hrs", notes: "Neighborhood gem. Quiet atmosphere." },
  { id: 8,  name: "Daily Provisions Cambridge",     neighborhood: "Cambridge",         favorite: false, season: "",          hours: "07:00-15:00", openLate: false, noise: 3, food: 5, wifi: 3, seating: 3, parkingType: "",          parkingCost: "",      transit: "",         walkMinutes: 20,   goodFor: "Casual",         stayLength: "Quick",      notes: "Danny Meyer's original Cambridge location. Incredible food." },
  { id: 9,  name: "Broadsheet Coffee Roasters",     neighborhood: "Harvard Square",    favorite: false, season: "",          hours: ["08:00-16:00","07:30-16:00","07:30-16:00","07:30-16:00","07:30-16:00","07:30-16:00","08:00-16:00"], openLate: false, noise: 3, food: 3, wifi: 4, seating: 4, parkingType: "",          parkingCost: "",      transit: "Red Line", walkMinutes: 15,   goodFor: "Research/Casual", stayLength: "Couple Hrs", notes: "Top-tier coffee near Harvard Yard. No laptops on weekends." },
  { id: 10, name: "Tatte Harvard Square",           neighborhood: "Harvard Square",    favorite: false, season: "",          hours: ["07:30-19:00","07:00-20:30","07:00-20:30","07:00-20:30","07:00-20:30","07:00-20:30","07:00-20:30"], openLate: true, noise: 3, food: 5, wifi: 4, seating: 4, parkingType: "",          parkingCost: "",      transit: "Red Line", walkMinutes: 15,   goodFor: "All",            stayLength: "Camp Out",   notes: "Two floors, outlets upstairs. Open until 8:30pm weekdays, 7pm Sundays." },
  { id: 11, name: "Tatte Kendall Square",           neighborhood: "Kendall Square",    favorite: false, season: "",          hours: ["08:00-19:00","07:00-20:00","07:00-20:00","07:00-20:00","07:00-20:00","07:00-20:00","07:00-20:00"], openLate: false, noise: 3, food: 5, wifi: 4, seating: 5, parkingType: "Garage",    parkingCost: "",      transit: "Red Line", walkMinutes: null, goodFor: "All",            stayLength: "Camp Out",   notes: "Spacious. Parking garage nearby. Full menu." },
  { id: 12, name: "Tatte Cambridge Crossing",       neighborhood: "Cambridge Crossing", favorite: false, season: "",         hours: "07:00-18:00", openLate: false, noise: 3, food: 5, wifi: 4, seating: 4, parkingType: "",          parkingCost: "",      transit: "",         walkMinutes: null, goodFor: "All",            stayLength: "Couple Hrs", notes: "Newer, less crowded. Same great Tatte menu." },
  { id: 13, name: "1369 Coffee (Central Sq)",       neighborhood: "Central Square",    favorite: false, season: "",          hours: ["08:00-16:00","07:00-15:00","07:00-15:00","07:00-15:00","07:00-15:00","07:00-15:00","08:00-16:00"], openLate: false, noise: 3, food: 3, wifi: 3, seating: 3, parkingType: "",          parkingCost: "",      transit: "Red Line", walkMinutes: 25,   goodFor: "Research/Casual", stayLength: "Couple Hrs", notes: "Classic Cambridge coffeehouse. Award-winning. WiFi is paid by the hour." },
  { id: 14, name: "1369 Coffee (Inman Sq)",         neighborhood: "Inman Square",      favorite: false, season: "",          hours: ["08:00-16:00","07:00-15:00","07:00-15:00","07:00-15:00","07:00-15:00","07:00-15:00","08:00-16:00"], openLate: false, noise: 3, food: 3, wifi: 3, seating: 3, parkingType: "",          parkingCost: "",      transit: "",         walkMinutes: 30,   goodFor: "Research/Casual", stayLength: "Couple Hrs", notes: "Cozy community coffeehouse. Eclectic art. WiFi is paid by the hour." },
  { id: 15, name: "Life Alive Kendall Square",      neighborhood: "Kendall Square",    favorite: false, season: "",          hours: "08:00-20:00", openLate: false, noise: 3, food: 5, wifi: 4, seating: 4, parkingType: "",          parkingCost: "",      transit: "",         walkMinutes: null, goodFor: "All",            stayLength: "Camp Out",   notes: "Healthy food, relaxed vibe. Great for long sessions." },
  { id: 16, name: "Flour Bakery Cambridge",         neighborhood: "Cambridge",         favorite: false, season: "",          hours: "07:00-18:00", openLate: false, noise: 3, food: 5, wifi: 4, seating: 3, parkingType: "",          parkingCost: "",      transit: "",         walkMinutes: 20,   goodFor: "Casual",         stayLength: "Quick",      notes: "Amazing pastries. More food spot than work cafe." },
  { id: 17, name: "Call Me Honey",                  neighborhood: "East Cambridge",    favorite: false, season: "",          hours: ["08:00-14:00","07:00-14:00","07:00-14:00","07:00-14:00","07:00-14:00","07:00-14:00","08:00-14:00"], openLate: false, noise: 4, food: 3, wifi: 4, seating: 3, parkingType: "",          parkingCost: "",      transit: "",         walkMinutes: null, goodFor: "Research/Casual", stayLength: "Couple Hrs", notes: "Rebranded from Curio Coffee, opened Feb 2026. Same staff, same waffles." },
  { id: 18, name: "Darwin's",                       neighborhood: "Harvard Square",    favorite: false, season: "",          hours: ["08:00-21:00","07:00-20:00","07:00-20:00","07:00-20:00","07:00-20:00","07:00-22:00","08:00-22:00"], openLate: true, noise: 3, food: 5, wifi: 3, seating: 4, parkingType: "",          parkingCost: "",      transit: "",         walkMinutes: 15,   goodFor: "Casual",         stayLength: "Couple Hrs", notes: "It's actually Luxor Cafe now — Egyptian-inspired, same address. But we still call it Darwin's. Open until 10pm Fri/Sat." },
  { id: 19, name: "Intelligentsia Watertown",       neighborhood: "Watertown",         favorite: false, season: "",          hours: ["07:00-17:00","07:00-17:00","07:00-17:00","07:00-17:00","07:00-17:00","07:00-18:00","07:00-18:00"], openLate: false, noise: 3, food: 2, wifi: 4, seating: 4, parkingType: "Free Lot", parkingCost: "Free",  transit: "",         walkMinutes: null, goodFor: "Research/Casual", stayLength: "Couple Hrs", notes: "Premier specialty coffee. Bright, airy. Outdoor seating. Fri–Sat open till 6.", scoreBump: -8 },
  { id: 20, name: "Daily Provisions Harvard Sq",   neighborhood: "Harvard Square",    favorite: false, season: "All Year",  hours: "07:00-21:00", openLate: true,  noise: 3, food: 5, wifi: 3, seating: 3, parkingType: "Validated", parkingCost: "Validated", transit: "Red Line", walkMinutes: 15, goodFor: "All",            stayLength: "Couple Hrs", notes: "Danny Meyer's all-day spot. Exceptional crullers, breakfast sandwiches, roast chicken." },
  { id: 21, name: "Flour Bakery Harvard Square",   neighborhood: "Harvard Square",    favorite: false, season: "",          hours: ["08:00-18:00","07:00-19:00","07:00-19:00","07:00-19:00","07:00-19:00","07:00-19:00","08:00-18:00"], openLate: false, noise: 3, food: 5, wifi: 3, seating: 3, parkingType: "",          parkingCost: "",      transit: "Red Line", walkMinutes: 12,   goodFor: "Casual",         stayLength: "Quick",      notes: "Joanne Chang's legendary bakery. Sticky buns, sandwiches, tarts. More food destination than work cafe." },
];

const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

const MODES = [
  { id: "Workshop Prep", label: "Prep / Grading", desc: "focused but low-key",  emoji: "💻" },
  { id: "Research",      label: "Research",      desc: "reading, deep focus",       emoji: "📖" },
  { id: "Art / Making",  label: "Art / Making",  desc: "collage, art, camp out",    emoji: "🎨" },
  { id: "Coffee Date",   label: "Coffee Date",   desc: "meeting someone",           emoji: "🤝" },
  { id: "Casual",        label: "Casual",        desc: "hang out, light work",      emoji: "☕" },
  { id: "Just Coffee",   label: "Just Coffee",   desc: "grab and go",               emoji: "🚀" },
];

const STAY_LENGTHS = [
  { id: "Quick",      label: "Quick",      desc: "< 30 min"   },
  { id: "Couple Hrs", label: "Couple Hrs", desc: "1–3 hours"  },
  { id: "Camp Out",   label: "Camp Out",   desc: "half day +" },
];

// ── palette (Childology: dusty pink, cream, terracotta) ──
const C = {
  pink50:   "#fbeaf0",
  pink100:  "#f4c0d1",
  pink300:  "#e07898",
  pink500:  "#c24e6f",
  pink700:  "#72243e",
  cream:    "#fdf8f2",
  cream2:   "#f5ede0",
  terra50:  "#faece7",
  terra300: "#e08060",
  terra500: "#c05030",
  terra700: "#71301a",
  warm100:  "#f0e6d6",
  warm200:  "#e0cbb0",
  warm500:  "#8a6a50",
  warm700:  "#4a3828",
  green50:  "#eaf3de",
  green600: "#3b6d11",
  red50:    "#fcebeb",
  red600:   "#a32d2d",
  amber50:  "#faeeda",
  amber600: "#854f0b",
};

// ── time helpers ──
const timeToMin = t => { if (!t) return null; const [h,m] = t.split(":").map(Number); return h*60+m; };
const getTodayH = shop => { const d = new Date().getDay(); return Array.isArray(shop.hours) ? shop.hours[d]||null : shop.hours||null; };
const parseH = s => { if (!s) return {opens:null,closes:null}; const [a,b]=s.split("-"); return {opens:a,closes:b}; };
const isOpen = shop => { const n=new Date().getHours()*60+new Date().getMinutes(); const {opens,closes}=parseH(getTodayH(shop)); const o=timeToMin(opens),c=timeToMin(closes); if(!o||!c) return null; return n>=o&&n<c; };
const minsLeft = shop => { const n=new Date().getHours()*60+new Date().getMinutes(); const {closes}=parseH(getTodayH(shop)); const c=timeToMin(closes); return c?c-n:null; };
const fmtH = s => { if (!s) return "—"; const {opens,closes}=parseH(s); const f=t=>{ if(!t) return ""; const [h,m]=t.split(":").map(Number); return `${h%12||12}${m?"":""}${m?`:${String(m).padStart(2,"0")}`:""}${h>=12?"pm":"am"}`; }; return `${f(opens)}–${f(closes)}`; };
const getSeason = () => { const m=new Date().getMonth(); if(m>=10||m<=2) return "Winter"; if(m>=5&&m<=8) return "Summer"; return null; };

// ── scoring ──
const scoreShop = (shop, mode, stay) => {
  let s = 50; const tags = [];
  if (shop.scoreBump) s += shop.scoreBump;

  // Revival Watertown: boost Fri/Sat/Sun mornings before 11am, penalize after
  if (shop.id === 2) {
    const dow = new Date().getDay(); // 0=Sun, 5=Fri, 6=Sat
    const hr = new Date().getHours();
    const isWeekendOrFri = dow === 0 || dow === 5 || dow === 6;
    if (isWeekendOrFri && hr < 11) s += 20;
    else if (isWeekendOrFri && hr >= 11) s -= 15;
  }

  // Jaho-specific tuning: strong for Prep/Grading, with seasonal + evening boosts
  if (shop.id === 4 && mode === "Workshop Prep") {
    s += 18; // strong baseline for Prep/Grading
    const cs = getSeason();
    if (cs === "Winter") s += 10; // extra winter boost
    const hr = new Date().getHours();
    if (hr >= 17) s += 8; // evening boost
  }
  if (shop.favorite) { s+=25; tags.push({t:"fav",label:"★ favorite"}); }
  const cs = getSeason();
  if (shop.season==="All Year") s+=5;
  else if (cs&&shop.season===cs) { s+=10; tags.push({t:"season",label:`great in ${cs.toLowerCase()}`}); }
  if (mode==="Coffee Date") {
    const w=shop.walkMinutes;
    if (w!=null) { if(w<=15){s+=40;tags.push({t:"walk",label:`${w} min walk`});}else if(w<=25){s+=20;tags.push({t:"walk",label:`${w} min walk`});}else{s+=8;tags.push({t:"walk",label:`${w} min walk`});} }
    else s-=15;
    s+=(shop.food-3)*4; s+=(shop.seating-3)*3; s+=(shop.noise-3)*2;
    if(shop.openLate){s+=6;tags.push({t:"late",label:"open late"});}
  } else if (mode==="Art / Making") {
    s+=(shop.seating-3)*6; s+=(shop.noise-3)*4; s+=(shop.wifi-3)*2;
    const moody=[4,14,17,18];
    if(moody.includes(shop.id)){s+=18;tags.push({t:"vibe",label:"moody atmosphere"});}
    if(shop.openLate){s+=10;tags.push({t:"late",label:"open late"});}
    if(shop.stayLength==="Camp Out"){s+=15;tags.push({t:"stay",label:"great for camping out"});}
    else if(shop.stayLength==="Couple Hrs") s+=5;
    s+=(shop.food-3)*2;
  } else {
    if (mode&&shop.goodFor) {
      const gf=shop.goodFor.toLowerCase(),ml=mode.toLowerCase();
      if(gf==="all") s+=10;
      else if(gf.includes(ml)||(ml==="just coffee"&&gf.includes("casual"))){s+=20;tags.push({t:"mode",label:`built for this`});}
      else s-=10;
    }
    if (stay&&shop.stayLength) {
      if(shop.stayLength===stay){s+=20;tags.push({t:"stay",label:`right size`});}
      else if((stay==="Couple Hrs"&&shop.stayLength==="Camp Out")||(stay==="Quick"&&shop.stayLength==="Couple Hrs")) s+=8;
      else s-=5;
    }
    if(mode==="Workshop Prep"||mode==="Research"){s+=(shop.wifi-3)*4;s+=(shop.seating-3)*4;s+=(shop.noise-3)*3;}
    if(mode==="Casual") s+=(shop.food-3)*3;
    if(stay==="Camp Out"){s+=(shop.seating-3)*5;s+=(shop.wifi-3)*3;}
    if(stay==="Quick") s+=(shop.food-3)*2;
  }
  const ml=minsLeft(shop); const effStay=mode==="Art / Making"?"Camp Out":stay;
  if(ml!=null){
    if(effStay==="Camp Out"&&ml<180){s-=30;tags.push({t:"warn",label:`closes in ${ml}m`});}
    else if(effStay==="Couple Hrs"&&ml<90){s-=20;tags.push({t:"warn",label:`closes in ${ml}m`});}
    else if(ml<30){s-=15;tags.push({t:"warn",label:`closes in ${ml}m`});}
  }
  const nowM=new Date().getHours()*60+new Date().getMinutes();
  if(nowM>=18*60&&shop.openLate&&mode!=="Coffee Date"&&mode!=="Art / Making"){s+=8;tags.push({t:"late",label:"open late"});}
  return {score:s,tags};
};

// ── tag chip ──
const tagStyle = t => {
  if (t==="warn") return {bg:C.red50,color:C.red600,border:`1px solid #f7c1c1`};
  if (t==="fav")  return {bg:C.pink50,color:C.pink700,border:`1px solid ${C.pink100}`};
  if (t==="walk") return {bg:C.green50,color:C.green600,border:`1px solid #c0dd97`};
  if (t==="late") return {bg:C.amber50,color:C.amber600,border:`1px solid #fac775`};
  return {bg:C.cream2,color:C.warm500,border:`1px solid ${C.warm200}`};
};

const Dot = ({filled}) => (
  <span style={{display:"inline-block",width:7,height:7,borderRadius:"50%",background:filled?C.pink500:C.warm200,margin:"0 1px"}}/>
);

function HoursGrid({hours}) {
  const isArr=Array.isArray(hours); const today=new Date().getDay();
  if(!isArr) return <div style={{fontSize:12,color:C.warm500}}>Every day: {fmtH(hours)}</div>;
  const groups=[]; let i=0;
  while(i<7){let j=i+1;while(j<7&&hours[j]===hours[i])j++;groups.push({days:Array.from({length:j-i},(_,k)=>i+k),h:hours[i]});i=j;}
  return <div style={{display:"flex",flexDirection:"column",gap:2}}>
    {groups.map((g,gi)=>{const isToday=g.days.includes(today);return <div key={gi} style={{display:"flex",justifyContent:"space-between",fontSize:12,padding:"2px 6px",borderRadius:6,background:isToday?C.pink50:"transparent",color:isToday?C.pink700:C.warm500,fontWeight:isToday?600:400}}>
      <span>{g.days.length===7?"every day":g.days.length===1?DAYS[g.days[0]]:`${DAYS[g.days[0]]}–${DAYS[g.days[g.days.length-1]]}`}</span>
      <span>{fmtH(g.h)}</span>
    </div>;})}
  </div>;
}

function ShopCard({shop, tags, rank, mode}) {
  const [exp,setExp]=useState(false);
  const open=isOpen(shop); const ml=minsLeft(shop); const todayH=getTodayH(shop); const hasVar=Array.isArray(shop.hours);
  return (
    <div style={{background:"white",borderRadius:18,border:`1.5px solid ${rank===1?C.pink300:C.warm100}`,overflow:"hidden",transition:"box-shadow .15s",position:"relative",fontFamily:"inherit"}}>
      {rank===1&&<div style={{position:"absolute",top:0,right:0,background:C.pink500,color:"white",fontSize:10,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",padding:"4px 14px",borderBottomLeftRadius:12}}>top pick ✦</div>}
      <div style={{padding:"18px 20px 16px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:12,marginBottom:8}}>
          <div style={{flex:1,minWidth:0}}>
            <div style={{display:"flex",alignItems:"center",gap:7,flexWrap:"wrap"}}>
              <span style={{fontFamily:"'Georgia',serif",fontSize:20,fontWeight:600,color:C.warm700,letterSpacing:"-0.3px"}}>{shop.name}</span>
              {shop.favorite&&<span style={{color:C.pink500,fontSize:14}}>♥</span>}
            </div>
            <div style={{display:"flex",alignItems:"center",gap:10,marginTop:3,flexWrap:"wrap"}}>
              <span style={{fontSize:12,color:C.warm500,display:"flex",alignItems:"center",gap:3}}><MapPin size={11}/>{shop.neighborhood}</span>
              {mode==="Coffee Date"&&shop.walkMinutes&&<span style={{fontSize:11,color:C.green600,fontWeight:600,display:"flex",alignItems:"center",gap:3}}><Footprints size={11}/>{shop.walkMinutes} min walk</span>}
            </div>
          </div>
          <div style={{textAlign:"right",flexShrink:0}}>
            <div style={{display:"flex",alignItems:"center",gap:4,justifyContent:"flex-end",fontSize:12}}>
              <span style={{width:7,height:7,borderRadius:"50%",background:open?"#3b6d11":"#ccc",display:"inline-block"}}/>
              <span style={{color:open?C.green600:"#aaa",fontWeight:open?600:400}}>
                {open?(ml>=60?`open · ${Math.floor(ml/60)}h${ml%60?` ${ml%60}m`:""}`:ml>0?`open · ${ml}m left`:"open"):"closed"}
              </span>
            </div>
            <button onClick={()=>setExp(e=>!e)} style={{fontSize:11,color:C.pink500,textDecoration:"underline",background:"none",border:"none",cursor:"pointer",padding:0,marginTop:2,fontFamily:"inherit"}}>
              {todayH?fmtH(todayH):"hours unknown"}{hasVar?" ↕":""}
            </button>
          </div>
        </div>

        {exp&&<div style={{background:C.cream,borderRadius:10,padding:"10px 12px",marginBottom:12,border:`1px solid ${C.warm100}`}}><HoursGrid hours={shop.hours}/></div>}

        {tags&&tags.length>0&&<div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:10}}>
          {tags.map((tag,i)=>{const ts=tagStyle(tag.t);return <span key={i} style={{fontSize:10,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.08em",padding:"3px 9px",borderRadius:20,...ts}}>{tag.label}</span>;})}
        </div>}

        {shop.notes&&<p style={{fontSize:13,color:C.warm500,fontFamily:"'Georgia',serif",fontStyle:"italic",borderLeft:`3px solid ${C.pink200||C.pink100}`,paddingLeft:10,margin:"0 0 12px",lineHeight:1.6}}>"{shop.notes}"</p>}

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"6px 20px",borderTop:`1px solid ${C.warm100}`,paddingTop:12}}>
          {[["quiet",shop.noise,Volume2],["wifi",shop.wifi,Wifi],["seating",shop.seating,Users],["food",shop.food,Utensils]].map(([lbl,val,Icon])=>(
            <div key={lbl} style={{display:"flex",alignItems:"center",gap:6}}>
              <Icon size={11} color={C.warm500}/>
              <span style={{fontSize:11,color:C.warm500,width:44}}>{lbl}</span>
              <div style={{display:"flex",gap:2}}>{Array.from({length:5}).map((_,i)=><Dot key={i} filled={i<val}/>)}</div>
            </div>
          ))}
        </div>

        {(shop.transit||shop.parkingType)&&<div style={{display:"flex",gap:16,marginTop:10,paddingTop:10,borderTop:`1px solid ${C.warm100}`,flexWrap:"wrap"}}>
          {shop.transit&&<span style={{fontSize:11,color:C.warm500,display:"flex",alignItems:"center",gap:3}}><Train size={11}/>{shop.transit}</span>}
          {shop.parkingType&&<span style={{fontSize:11,color:C.warm500,display:"flex",alignItems:"center",gap:3}}><Car size={11}/>{shop.parkingType}{shop.parkingCost==="Free"?" · free":""}</span>}
        </div>}
      </div>
    </div>
  );
}

function ModeBtn({active,onClick,label,desc,emoji}) {
  return (
    <button onClick={onClick} style={{flex:"1 1 0",minWidth:0,padding:"12px 14px",borderRadius:14,border:`2px solid ${active?C.pink500:C.warm100}`,background:active?C.pink500:"white",cursor:"pointer",textAlign:"left",transition:"all .15s",fontFamily:"inherit"}}>
      <div style={{fontSize:13,fontWeight:600,color:active?"white":C.warm700}}>{emoji} {label}</div>
      <div style={{fontSize:11,marginTop:3,color:active?"rgba(255,255,255,0.8)":C.warm500}}>{desc}</div>
    </button>
  );
}

function StayBtn({active,onClick,label,desc}) {
  return (
    <button onClick={onClick} style={{flex:"1 1 0",minWidth:0,padding:"10px 12px",borderRadius:12,border:`2px solid ${active?C.pink500:C.warm100}`,background:active?C.pink50:"white",cursor:"pointer",textAlign:"left",transition:"all .15s",fontFamily:"inherit"}}>
      <div style={{fontSize:13,fontWeight:600,color:active?C.pink700:C.warm700}}>{label}</div>
      <div style={{fontSize:11,marginTop:2,color:active?C.pink500:C.warm500}}>{desc}</div>
    </button>
  );
}

function HoursEditor({hours,onChange}) {
  const isArr=Array.isArray(hours); const [perDay,setPerDay]=useState(isArr);
  const uni=isArr?(hours[1]||""):(hours||"");
  const toggle=()=>{ if(!perDay){onChange(Array(7).fill(uni));setPerDay(true);}else{onChange(isArr?hours[1]:hours);setPerDay(false);} };
  const pH=s=>{ if(!s) return {o:"",c:""}; const [a,b]=s.split("-"); return {o:a||"",c:b||""}; };
  const bH=(o,c)=>(o&&c)?`${o}-${c}`:"";
  const upDay=(idx,val)=>{ const arr=isArr?[...hours]:Array(7).fill(uni); arr[idx]=val; onChange(arr); };
  const inp={width:"100%",padding:"7px 10px",borderRadius:8,border:`1px solid ${C.warm200}`,fontSize:13,fontFamily:"inherit",background:"white",color:C.warm700};
  return <div>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
      <label style={{fontSize:11,textTransform:"uppercase",letterSpacing:"0.1em",color:C.warm500,fontWeight:600}}>Hours</label>
      <button onClick={toggle} style={{fontSize:11,color:C.pink500,textDecoration:"underline",background:"none",border:"none",cursor:"pointer",fontFamily:"inherit"}}>{perDay?"use same hours every day":"set per-day hours"}</button>
    </div>
    {!perDay?<div style={{display:"flex",gap:8}}>
      <div style={{flex:1}}><div style={{fontSize:11,color:C.warm500,marginBottom:4}}>opens</div><input type="time" value={pH(uni).o} onChange={e=>onChange(bH(e.target.value,pH(uni).c))} style={inp}/></div>
      <div style={{flex:1}}><div style={{fontSize:11,color:C.warm500,marginBottom:4}}>closes</div><input type="time" value={pH(uni).c} onChange={e=>onChange(bH(pH(uni).o,e.target.value))} style={inp}/></div>
    </div>:<div style={{display:"flex",flexDirection:"column",gap:4}}>
      {DAYS.map((day,idx)=>{const h=isArr?(hours[idx]||""):uni;const {o,c}=pH(h);const tod=new Date().getDay()===idx;return <div key={day} style={{display:"flex",alignItems:"center",gap:8,background:tod?C.pink50:"transparent",padding:"2px 6px",borderRadius:8}}>
        <span style={{fontSize:12,width:28,flexShrink:0,color:tod?C.pink700:C.warm500,fontWeight:tod?700:400}}>{day}</span>
        <input type="time" value={o} onChange={e=>upDay(idx,bH(e.target.value,c))} style={{...inp,padding:"4px 8px"}}/>
        <span style={{color:C.warm300||C.warm200,fontSize:12}}>–</span>
        <input type="time" value={c} onChange={e=>upDay(idx,bH(o,e.target.value))} style={{...inp,padding:"4px 8px"}}/>
      </div>;})}
    </div>}
  </div>;
}

const sel={width:"100%",padding:"8px 10px",borderRadius:8,border:`1px solid ${C.warm200}`,fontSize:13,background:"white",color:C.warm700,fontFamily:"inherit"};
const inp2={width:"100%",padding:"8px 10px",borderRadius:8,border:`1px solid ${C.warm200}`,fontSize:13,background:"white",color:C.warm700,fontFamily:"inherit"};
const fieldLabel={fontSize:11,textTransform:"uppercase",letterSpacing:"0.1em",color:C.warm500,fontWeight:600,display:"block",marginBottom:5};

function EditModal({shop,onSave,onClose}) {
  const [d,setD]=useState(shop);
  const up=(f,v)=>setD(p=>({...p,[f]:v}));
  return <div style={{position:"fixed",inset:0,background:"rgba(74,56,40,0.35)",zIndex:50,display:"flex",alignItems:"flex-end",justifyContent:"center"}}>
    <div style={{background:C.cream,width:"100%",maxWidth:520,borderRadius:"20px 20px 0 0",maxHeight:"90vh",overflowY:"auto",fontFamily:"inherit"}}>
      <div style={{position:"sticky",top:0,background:C.cream,borderBottom:`1px solid ${C.warm100}`,padding:"14px 20px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span style={{fontFamily:"Georgia,serif",fontSize:17,fontWeight:600,color:C.warm700}}>edit · {shop.name}</span>
        <button onClick={onClose} style={{background:"none",border:"none",cursor:"pointer",color:C.warm500,padding:4}}><X size={18}/></button>
      </div>
      <div style={{padding:"20px",display:"flex",flexDirection:"column",gap:16}}>
        <label style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",fontSize:14,color:C.warm700}}>
          <input type="checkbox" checked={!!d.favorite} onChange={e=>up("favorite",e.target.checked)} style={{accentColor:C.pink500,width:16,height:16}}/>
          mark as favorite ♥
        </label>
        <HoursEditor hours={d.hours} onChange={v=>up("hours",v)}/>
        {[["noise","quiet (1=loud · 5=silent)"],["food","food (1=none · 5=full meals)"],["wifi","wifi (1=none · 5=excellent)"],["seating","seating (1=tiny · 5=spacious)"]].map(([k,lbl])=>(
          <div key={k}>
            <label style={fieldLabel}>{lbl}</label>
            <div style={{display:"flex",gap:6}}>{[1,2,3,4,5].map(n=><button key={n} onClick={()=>up(k,n)} style={{flex:1,padding:"8px 0",borderRadius:10,border:`2px solid ${d[k]===n?C.pink500:C.warm200}`,background:d[k]===n?C.pink500:"white",color:d[k]===n?"white":C.warm600||C.warm500,fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>{n}</button>)}</div>
          </div>
        ))}
        <div><label style={fieldLabel}>walk from home (min)</label><input type="number" placeholder="blank = not walkable" value={d.walkMinutes||""} onChange={e=>up("walkMinutes",e.target.value?Number(e.target.value):null)} style={inp2}/></div>
        <div><label style={fieldLabel}>good for</label><select value={d.goodFor||""} onChange={e=>up("goodFor",e.target.value)} style={sel}><option value="All">All</option><option value="Research/Casual">Research / Casual</option><option value="Casual">Casual</option><option value="Workshop Prep">Workshop Prep</option></select></div>
        <div><label style={fieldLabel}>stay length</label><select value={d.stayLength||""} onChange={e=>up("stayLength",e.target.value)} style={sel}><option value="Quick">Quick</option><option value="Couple Hrs">Couple Hrs</option><option value="Camp Out">Camp Out</option></select></div>
        <div><label style={fieldLabel}>best season</label><select value={d.season||""} onChange={e=>up("season",e.target.value)} style={sel}><option value="All Year">All Year</option><option value="Winter">Winter</option><option value="Summer">Summer</option><option value="">Unknown</option></select></div>
        <div><label style={fieldLabel}>parking</label><select value={d.parkingType||""} onChange={e=>up("parkingType",e.target.value)} style={sel}><option value="">Unknown</option><option value="Free Lot">Free Lot</option><option value="Street Meter">Street Meter</option><option value="Garage">Garage</option><option value="Validated">Validated</option><option value="None">None</option></select></div>
        <div><label style={fieldLabel}>transit</label><select value={d.transit||""} onChange={e=>up("transit",e.target.value)} style={sel}><option value="">Unknown</option><option value="Red Line">Red Line</option><option value="Bus">Bus</option><option value="Both">Both</option><option value="Walk from Home">Walk from Home</option></select></div>
        <div><label style={fieldLabel}>notes</label><textarea value={d.notes||""} onChange={e=>up("notes",e.target.value)} rows={3} style={{...inp2,resize:"none"}}/></div>
      </div>
      <div style={{position:"sticky",bottom:0,background:C.cream,borderTop:`1px solid ${C.warm100}`,padding:"12px 20px",display:"flex",gap:10}}>
        <button onClick={onClose} style={{flex:1,padding:"10px 0",borderRadius:12,border:`1.5px solid ${C.warm200}`,background:"white",color:C.warm700,fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>cancel</button>
        <button onClick={()=>onSave(d)} style={{flex:1,padding:"10px 0",borderRadius:12,border:"none",background:C.pink500,color:"white",fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}><Check size={14}/>save</button>
      </div>
    </div>
  </div>;
}

function ManageView({shops,onSave,onBack}) {
  const [editing,setEditing]=useState(null);
  const incomplete=s=>!s.parkingType||!s.transit;
  return <div style={{minHeight:"100vh",background:C.cream,fontFamily:"inherit"}}>
    <div style={{background:"white",borderBottom:`1px solid ${C.warm100}`,position:"sticky",top:0,zIndex:10}}>
      <div style={{maxWidth:640,margin:"0 auto",padding:"14px 20px",display:"flex",alignItems:"center",gap:12}}>
        <button onClick={onBack} style={{background:"none",border:"none",cursor:"pointer",color:C.warm500,padding:4}}><ArrowLeft size={20}/></button>
        <div>
          <div style={{fontFamily:"Georgia,serif",fontSize:18,fontWeight:600,color:C.warm700}}>manage shops</div>
          <div style={{fontSize:12,color:C.warm500}}>{shops.filter(incomplete).length} with missing info</div>
        </div>
      </div>
    </div>
    <div style={{maxWidth:640,margin:"0 auto",padding:20,display:"flex",flexDirection:"column",gap:8}}>
      {shops.map(shop=><button key={shop.id} onClick={()=>setEditing(shop)} style={{background:"white",border:`1.5px solid ${C.warm100}`,borderRadius:14,padding:"12px 16px",textAlign:"left",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between",gap:10,fontFamily:"inherit",transition:"border-color .1s"}}>
        <div style={{flex:1,minWidth:0}}>
          <div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"}}>
            <span style={{fontWeight:600,color:C.warm700,fontSize:14}}>{shop.name}</span>
            {shop.favorite&&<span style={{color:C.pink500,fontSize:12}}>♥</span>}
            {Array.isArray(shop.hours)&&<span style={{fontSize:10,background:C.pink50,color:C.pink700,border:`1px solid ${C.pink100}`,borderRadius:20,padding:"2px 7px",fontWeight:600}}>per-day hrs</span>}
            {shop.walkMinutes&&<span style={{fontSize:10,background:C.green50,color:C.green600,border:"1px solid #c0dd97",borderRadius:20,padding:"2px 7px",fontWeight:600}}>{shop.walkMinutes}m walk</span>}
          </div>
          <div style={{fontSize:12,color:C.warm500,marginTop:2}}>{shop.neighborhood} · today: {fmtH(getTodayH(shop))}</div>
        </div>
        {incomplete(shop)&&<div style={{display:"flex",alignItems:"center",gap:4,color:C.amber600,flexShrink:0}}><AlertCircle size={13}/><span style={{fontSize:10,textTransform:"uppercase",letterSpacing:"0.08em",fontWeight:600}}>incomplete</span></div>}
        <Edit3 size={15} color={C.warm500} style={{flexShrink:0}}/>
      </button>)}
    </div>
    {editing&&<EditModal shop={editing} onClose={()=>setEditing(null)} onSave={u=>{onSave(u);setEditing(null);}}/>}
  </div>;
}

export default function RonsCoffee() {
  const [shops,setShops]=useState(SEED_DATA);
  const [view,setView]=useState("home");
  const [mode,setMode]=useState(null);
  const [stay,setStay]=useState(null);
  const [showClosed,setShowClosed]=useState(false);
  const [now,setNow]=useState(new Date());

  useEffect(()=>{ (async()=>{ try{ const r=await window.storage.get(STORAGE_KEY); if(r?.value){const p=JSON.parse(r.value);if(Array.isArray(p)&&p.length>0)setShops(p);} }catch{} })(); },[]);
  useEffect(()=>{ const t=setInterval(()=>setNow(new Date()),60000); return()=>clearInterval(t); },[]);

  const saveShop=async u=>{ const n=shops.map(s=>s.id===u.id?u:s); setShops(n); try{await window.storage.set(STORAGE_KEY,JSON.stringify(n));}catch(e){console.error(e);} };

  const needsStay=mode&&mode!=="Coffee Date"&&mode!=="Art / Making";
  const complete=mode&&(!needsStay||stay);

  const ranked=useMemo(()=>shops
    .map(s=>{const {score,tags}=scoreShop(s,mode,stay);return{shop:s,score,tags,open:isOpen(s)};})
    .filter(({shop,open})=>showClosed||open!==false||!shop.hours)
    .sort((a,b)=>a.open!==b.open?a.open?-1:1:b.score-a.score)
  ,[shops,mode,stay,showClosed,now]);

  const greeting=useMemo(()=>{const h=now.getHours();if(h<11)return"good morning,";if(h<14)return"good midday,";if(h<17)return"good afternoon,";if(h<21)return"good evening,";return"late night,";},[now]);

  if (view==="manage") return <ManageView shops={shops} onSave={saveShop} onBack={()=>setView("home")}/>;

  return <div style={{minHeight:"100vh",background:C.cream,fontFamily:"'Georgia',serif"}}>
    <style>{`@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,500;9..144,600&display=swap'); * { box-sizing: border-box; }`}</style>

    {/* header */}
    <div style={{background:`linear-gradient(160deg, ${C.pink50} 0%, ${C.cream} 100%)`,borderBottom:`1.5px solid ${C.pink100}`,padding:"32px 20px 24px"}}>
      <div style={{maxWidth:640,margin:"0 auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:42,height:42,borderRadius:"50%",background:C.pink500,display:"flex",alignItems:"center",justifyContent:"center"}}>
              <Coffee size={20} color="white"/>
            </div>
            <div>
              <div style={{fontSize:10,textTransform:"uppercase",letterSpacing:"0.2em",color:C.pink500,fontWeight:700,fontFamily:"Georgia,serif"}}>Ron's Coffee</div>
              <div style={{fontSize:12,color:C.warm500,fontFamily:"Georgia,serif"}}>{shops.length} spots · {ranked.filter(r=>r.open).length} open now</div>
            </div>
          </div>
          <button onClick={()=>setView("manage")} style={{background:"white",border:`1.5px solid ${C.pink100}`,borderRadius:10,padding:"7px 10px",cursor:"pointer",color:C.warm500,display:"flex",alignItems:"center",gap:5,fontSize:12,fontFamily:"Georgia,serif"}}>
            <Edit3 size={14}/> manage
          </button>
        </div>

        <div style={{fontFamily:"Fraunces, Georgia, serif",fontSize:36,fontWeight:300,color:C.warm700,letterSpacing:"-0.5px",lineHeight:1.15}}>
          {greeting}<br/>
          <span style={{color:C.pink500,fontWeight:500}}>Ron.</span>
        </div>

        <div style={{marginTop:10,fontSize:13,color:C.warm500,fontFamily:"Georgia,serif",fontStyle:"italic"}}>
          {!mode&&"what are you going for today?"}
          {mode==="Coffee Date"&&"closest walkable spots first ↓"}
          {mode==="Art / Making"&&"moody, spacious, open late ↓"}
          {mode&&needsStay&&!stay&&"how long are you staying?"}
          {mode&&needsStay&&stay&&`✦ picks for ${mode.toLowerCase()} · ${stay.toLowerCase()}`}
        </div>
      </div>
    </div>

    <div style={{maxWidth:640,margin:"0 auto",padding:"20px 20px 60px"}}>

      {/* mode buttons */}
      <div style={{marginBottom:14}}>
        <div style={{fontSize:10,textTransform:"uppercase",letterSpacing:"0.15em",color:C.pink500,fontWeight:700,marginBottom:8,fontFamily:"Georgia,serif"}}>what for?</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          {MODES.map(m=><ModeBtn key={m.id} active={mode===m.id} onClick={()=>{setMode(mode===m.id?null:m.id);setStay(null);}} label={m.label} desc={m.desc} emoji={m.emoji}/>)}
        </div>
      </div>

      {/* stay length */}
      {needsStay&&<div style={{marginBottom:14}}>
        <div style={{fontSize:10,textTransform:"uppercase",letterSpacing:"0.15em",color:C.pink500,fontWeight:700,marginBottom:8,fontFamily:"Georgia,serif"}}>how long?</div>
        <div style={{display:"flex",gap:8}}>
          {STAY_LENGTHS.map(s=><StayBtn key={s.id} active={stay===s.id} onClick={()=>setStay(stay===s.id?null:s.id)} label={s.label} desc={s.desc}/>)}
        </div>
      </div>}

      {(mode||stay)&&<button onClick={()=>{setMode(null);setStay(null);}} style={{fontSize:12,color:C.pink500,background:"none",border:"none",cursor:"pointer",textDecoration:"underline",marginBottom:16,padding:0,fontFamily:"Georgia,serif"}}>clear filters</button>}

      {/* results */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
        <div style={{fontSize:10,textTransform:"uppercase",letterSpacing:"0.15em",color:C.pink500,fontWeight:700,fontFamily:"Georgia,serif"}}>
          {mode==="Coffee Date"?"closest first":mode==="Art / Making"?"best for making":complete?"recommendations":mode?"best matches":"right now"}
        </div>
        <label style={{display:"flex",alignItems:"center",gap:5,fontSize:12,color:C.warm500,cursor:"pointer",fontFamily:"Georgia,serif"}}>
          <input type="checkbox" checked={showClosed} onChange={e=>setShowClosed(e.target.checked)} style={{accentColor:C.pink500,width:13,height:13}}/>
          show closed
        </label>
      </div>

      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        {ranked.slice(0,complete||mode==="Coffee Date"||mode==="Art / Making"?6:8).map((item,i)=>(
          <ShopCard key={item.shop.id} shop={item.shop} tags={item.tags} rank={i+1} mode={mode}/>
        ))}
        {ranked.length===0&&<div style={{textAlign:"center",padding:"48px 0",color:C.warm500}}>
          <div style={{fontSize:32,marginBottom:12}}>☕</div>
          <div style={{fontSize:14,fontStyle:"italic"}}>nothing open right now.</div>
          <button onClick={()=>setShowClosed(true)} style={{marginTop:8,fontSize:12,color:C.pink500,background:"none",border:"none",cursor:"pointer",textDecoration:"underline",fontFamily:"Georgia,serif"}}>show closed shops anyway</button>
        </div>}
      </div>

      <div style={{marginTop:48,paddingTop:20,borderTop:`1px solid ${C.warm100}`,textAlign:"center",fontSize:11,color:C.warm300||C.warm200,fontStyle:"italic",fontFamily:"Georgia,serif"}}>
        built for Ron ✦ edits saved locally
      </div>
    </div>
  </div>;
}