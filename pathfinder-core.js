// pathfinder-core.js — shared across all Pathfinder builds
// Assumes T and CHART are defined globally in the host HTML before this script loads.

// ─── DAILY DATA (declared first so async IIFEs can reference it) ───────────
let dailyData=null;

// ─── GEOMETRY ─────────────────────────────────────────────────────────────────
const CX=360,CY=360;
const R={rim3:354,elArc:347,rim1:340,zodOut:328,zodMid:302,zodIn:276,cuspLbl:265,hNum:162,sepRing:240,pGlyph:244,pLbl:258,asp:218,cRing:18,cDot:11};
const C={gold:'#d0a840',goldM:'rgba(208,168,64,0.28)',goldBrt:'rgba(208,168,64,0.58)',goldF:'rgba(208,168,64,0.07)',ivory:'#f0e4cc',ivoryM:'rgba(240,228,200,0.55)',ivoryDim:'rgba(240,228,200,0.28)',ivoryDimmer:'rgba(240,228,200,0.14)',cerulean:'#3e8fc0',ceruleanM:'rgba(62,143,192,0.60)',teal:'#5ab8a8',tealM:'rgba(90,184,168,0.60)',rose:'#c89898',roseM:'rgba(200,152,152,0.65)',fire:'rgba(210,130,48,0.26)',earth:'rgba(80,142,68,0.19)',air:'rgba(80,112,200,0.20)',water:'rgba(40,128,188,0.28)',fireArc:'#c87840',earthArc:'#58925a',airArc:'#5878c8',waterArc:'#3880b8',axis:'rgba(208,168,64,0.72)'};
const PLANET_COLOR={luminary:'#d8b850',personal:'#c8a0a0',social:'#7ab0d0',outer:'#5ab8a8',point:'rgba(240,228,200,0.70)'};
const ASP_STYLE={conjunction:{color:'#d0a840',dash:'',w:1.2,op:0.82},sextile:{color:'#3e8fc0',dash:'',w:0.9,op:0.70},trine:{color:'#5ab8a8',dash:'',w:0.9,op:0.65},square:{color:'#c89898',dash:'5,3',w:0.9,op:0.75},opposition:{color:'#c89898',dash:'',w:0.9,op:0.68},inconjunct:{color:'rgba(240,228,200,0.38)',dash:'2,4',w:0.7,op:0.65}};
const SIGNS=[{gl:'♈'+T,el:'fire',name:'Aries',abbr:'Ar',color:'#d4a050'},{gl:'♉'+T,el:'earth',name:'Taurus',abbr:'Ta',color:'#80c070'},{gl:'♊'+T,el:'air',name:'Gemini',abbr:'Ge',color:'#8090d8'},{gl:'♋'+T,el:'water',name:'Cancer',abbr:'Cn',color:'#50b8d0'},{gl:'♌'+T,el:'fire',name:'Leo',abbr:'Le',color:'#d4a050'},{gl:'♍'+T,el:'earth',name:'Virgo',abbr:'Vi',color:'#80c070'},{gl:'♎'+T,el:'air',name:'Libra',abbr:'Li',color:'#8090d8'},{gl:'♏'+T,el:'water',name:'Scorpio',abbr:'Sc',color:'#50b8d0'},{gl:'♐'+T,el:'fire',name:'Sagittarius',abbr:'Sg',color:'#d4a050'},{gl:'♑'+T,el:'earth',name:'Capricorn',abbr:'Cp',color:'#80c070'},{gl:'♒'+T,el:'air',name:'Aquarius',abbr:'Aq',color:'#8090d8'},{gl:'♓'+T,el:'water',name:'Pisces',abbr:'Pi',color:'#50b8d0'}];
const GLYPH_FONT="'Apple Symbols','Segoe UI Symbol','Noto Sans Symbols',serif";
const MODALITY={Ar:'Cardinal',Ta:'Fixed',Ge:'Mutable',Cn:'Cardinal',Le:'Fixed',Vi:'Mutable',Li:'Cardinal',Sc:'Fixed',Sg:'Mutable',Cp:'Cardinal',Aq:'Fixed',Pi:'Mutable'};

// ─── JORDAN'S NATAL CHART (static — for synastry rendering in friend builds) ──
const JORDAN_CHART={
  asc:89.3709,mc:338.2840,
  planets:[
    {id:'sun',    gl:'☉'+T,deg:241.8311,retro:false,grp:'luminary'},
    {id:'moon',   gl:'☽'+T,deg:4.9796, retro:false,grp:'luminary'},
    {id:'mercury',gl:'☿'+T,deg:222.2947,retro:false,grp:'personal'},
    {id:'venus',  gl:'♀'+T,deg:228.8348,retro:false,grp:'personal'},
    {id:'mars',   gl:'♂'+T,deg:250.7698,retro:false,grp:'personal'},
    {id:'jupiter',gl:'♃'+T,deg:212.8672,retro:false,grp:'social'},
    {id:'saturn', gl:'♄'+T,deg:324.2549,retro:false,grp:'social'},
    {id:'uranus', gl:'♅'+T,deg:289.5802,retro:false,grp:'outer'},
    {id:'neptune',gl:'♆'+T,deg:289.1846,retro:false,grp:'outer'},
    {id:'pluto',  gl:'♇'+T,deg:235.6816,retro:false,grp:'outer'},
    {id:'chiron', gl:'⚷'+T,deg:158.4833,retro:false,grp:'point'},
    {id:'nnode',  gl:'☊'+T,deg:243.0475,retro:true, grp:'point'},
    {id:'snode',  gl:'☋'+T,deg:63.0475, retro:true, grp:'point'},
  ],
};

// ─── MATH ─────────────────────────────────────────────────────────────────────
const norm=a=>((a%360)+360)%360;
const rad=d=>d*Math.PI/180;
const f=n=>n.toFixed(2);
const svgA=(ecl,asc)=>norm(180-(ecl-asc));
const pt=(a,r)=>({x:CX+r*Math.cos(rad(a)),y:CY+r*Math.sin(rad(a))});
const ept=(ecl,r,asc)=>pt(svgA(ecl,asc),r);
function sector(s,e,rO,rI,asc){const a1=svgA(s,asc),a2=svgA(e,asc);const o1=pt(a1,rO),o2=pt(a2,rO),i1=pt(a1,rI),i2=pt(a2,rI);return `M${f(o1.x)} ${f(o1.y)} A${rO} ${rO} 0 0 0 ${f(o2.x)} ${f(o2.y)} L${f(i2.x)} ${f(i2.y)} A${rI} ${rI} 0 0 1 ${f(i1.x)} ${f(i1.y)}Z`}
function arcStroke(s,e,r,asc){const a1=svgA(s,asc),a2=svgA(e,asc);const p1=pt(a1,r),p2=pt(a2,r);return `M${f(p1.x)} ${f(p1.y)} A${r} ${r} 0 0 0 ${f(p2.x)} ${f(p2.y)}`}
function eclSD(ecl){const idx=Math.floor(ecl/30)%12;return{idx,deg:Math.floor(ecl%30),sign:SIGNS[idx]}}

// ─── SPREAD + MIN-GAP ─────────────────────────────────────────────────────────
function spread(planets){
  const sorted=[...planets].sort((a,b)=>a.deg-b.deg);
  const out=[];let i=0;
  while(i<sorted.length){
    let j=i+1;
    while(j<sorted.length&&sorted[j].deg-sorted[i].deg<8)j++;
    const cl=sorted.slice(i,j);
    if(cl.length===1){out.push({...cl[0],disp:cl[0].deg});}
    else{const mean=cl.reduce((s,p)=>s+p.deg,0)/cl.length;const step=cl.length===2?14:11;const off=-(cl.length-1)*step/2;cl.forEach((p,k)=>out.push({...p,disp:mean+off+k*step}));}
    i=j;
  }
  return enforceMinGap(out,10);
}
function enforceMinGap(planets,minGap){
  const sp=[...planets].sort((a,b)=>a.disp-b.disp);
  let changed=true,iter=0;
  while(changed&&iter<60){
    changed=false;iter++;
    for(let i=0;i<sp.length-1;i++){const gap=sp[i+1].disp-sp[i].disp;if(gap<minGap){const push=(minGap-gap)/2;sp[i].disp-=push;sp[i+1].disp+=push;changed=true;}}
    const wGap=(sp[0].disp+360)-sp[sp.length-1].disp;
    if(wGap<minGap){const push=(minGap-wGap)/2;sp[sp.length-1].disp-=push;sp[0].disp+=push;changed=true;}
  }
  return sp.map(p=>({...p,disp:norm(p.disp)}));
}

// ─── SVG HELPERS ──────────────────────────────────────────────────────────────
const NS='http://www.w3.org/2000/svg';
function el(tag,attrs){const e=document.createElementNS(NS,tag);for(const[k,v]of Object.entries(attrs))e.setAttribute(k,String(v));return e}
function tx(content,attrs){const t=el('text',attrs);t.textContent=content;return t}
function glTx(content,x,y,size,color,opacity,extra={}){return tx(content,{x:f(x),y:f(y),fill:color,opacity,'font-size':size,'font-family':GLYPH_FONT,'font-variant-emoji':'text','text-anchor':'middle','dominant-baseline':'central',...extra})}

function drawDefs(svg){
  const defs=el('defs',{});
  const g1=el('radialGradient',{id:'bgG',cx:'50%',cy:'50%',r:'50%'});
  g1.appendChild(el('stop',{offset:'0%','stop-color':'#1a3060','stop-opacity':'0.80'}));
  g1.appendChild(el('stop',{offset:'55%','stop-color':'#0e1030','stop-opacity':'0.45'}));
  g1.appendChild(el('stop',{offset:'100%','stop-color':'#09102a','stop-opacity':'0'}));
  defs.appendChild(g1);
  const fWC=el('filter',{id:'wc',x:'-30%',y:'-30%',width:'160%',height:'160%'});
  fWC.appendChild(el('feGaussianBlur',{stdDeviation:'12'}));
  defs.appendChild(fWC);
  const fG=el('filter',{id:'glow',x:'-20%',y:'-20%',width:'140%',height:'140%'});
  fG.appendChild(el('feGaussianBlur',{in:'SourceGraphic',stdDeviation:'3',result:'b'}));
  const m=el('feMerge',{});['b','SourceGraphic'].forEach(s=>{const n=el('feMergeNode',{});n.setAttribute('in',s);m.appendChild(n);});
  fG.appendChild(m);defs.appendChild(fG);svg.appendChild(defs);
}

function drawBackground(svg){
  const g=el('g',{id:'bg'});
  const clipDefs=svg.querySelector('defs')||el('defs',{});
  const cp=el('clipPath',{id:'chartClip'});cp.appendChild(el('circle',{cx:CX,cy:CY,r:358}));clipDefs.appendChild(cp);
  g.appendChild(el('rect',{x:0,y:0,width:720,height:720,fill:'#09102a'}));
  g.appendChild(el('circle',{cx:CX,cy:CY,r:360,fill:'none',stroke:'rgba(208,168,64,0.12)','stroke-width':'3'}));
  g.appendChild(el('circle',{cx:CX,cy:CY,r:358,fill:'none',stroke:'rgba(62,143,192,0.10)','stroke-width':'2'}));
  const chartG=el('g',{'clip-path':'url(#chartClip)'});
  chartG.appendChild(el('circle',{cx:CX,cy:CY,r:358,fill:'#09102a'}));
  chartG.appendChild(el('circle',{cx:CX,cy:CY,r:358,fill:'url(#bgG)'}));
  chartG.appendChild(el('ellipse',{cx:CX+60,cy:CY-80,rx:300,ry:100,fill:'rgba(200,144,64,0.06)',transform:`rotate(-38,${CX},${CY})`}));
  chartG.appendChild(el('ellipse',{cx:CX-60,cy:CY+80,rx:300,ry:110,fill:'rgba(38,110,180,0.07)',transform:`rotate(-38,${CX},${CY})`}));
  chartG.appendChild(el('ellipse',{cx:CX+120,cy:CY-120,rx:180,ry:70,fill:'rgba(180,120,40,0.05)',transform:`rotate(-20,${CX},${CY})`}));
  const blooms=[{ecl:135,color:'rgba(200,120,40,0.09)'},{ecl:15,color:'rgba(200,120,40,0.07)'},{ecl:255,color:'rgba(200,120,40,0.07)'},{ecl:105,color:'rgba(30,120,180,0.10)'},{ecl:225,color:'rgba(30,120,180,0.09)'},{ecl:345,color:'rgba(30,120,180,0.09)'},{ecl:75,color:'rgba(70,100,200,0.07)'},{ecl:195,color:'rgba(70,100,200,0.07)'},{ecl:315,color:'rgba(70,100,200,0.07)'},{ecl:45,color:'rgba(70,130,60,0.06)'},{ecl:165,color:'rgba(70,130,60,0.06)'},{ecl:285,color:'rgba(70,130,60,0.06)'}];
  for(const b of blooms){const p=ept(b.ecl,302,CHART.asc);chartG.appendChild(el('circle',{cx:f(p.x),cy:f(p.y),r:62,fill:b.color,filter:'url(#wc)'}))}
  const stars=[[38,72,1.1,0.38,'#f0e8d0'],[152,44,0.8,0.30,'#e8f0f8'],[300,32,1.2,0.34,'#f0e8d0'],[460,50,0.9,0.32,'#d8e8f0'],[616,40,1.0,0.36,'#f0e8d0'],[668,88,0.8,0.30,'#e8d8b8'],[690,220,0.9,0.24,'#e8f0f8'],[678,400,1.0,0.22,'#f0e8d0'],[660,548,0.8,0.26,'#d8e8f0'],[596,640,1.1,0.30,'#f0e8d0'],[448,672,0.9,0.24,'#e8f0f8'],[272,676,0.8,0.22,'#f0e8d0'],[106,652,1.0,0.26,'#e8d8b8'],[34,556,0.9,0.24,'#f0e8d0'],[20,408,0.8,0.22,'#e8f0f8'],[32,252,1.0,0.28,'#f0e8d0'],[80,156,0.7,0.18,'#e8d8b8'],[580,156,0.7,0.18,'#d8e8f0'],[590,528,0.8,0.20,'#f0e8d0'],[108,520,0.7,0.17,'#e8f0f8'],[196,60,0.6,0.16,'#f0e8d0'],[508,68,0.7,0.18,'#e8d8b8'],[360,14,0.8,0.20,'#f0e8d0'],[710,360,0.7,0.16,'#e8f0f8'],[8,360,0.7,0.16,'#f0e8d0'],[360,710,0.8,0.18,'#e8d8b8'],[240,90,1.4,0.28,'#f8e8b0'],[480,650,1.3,0.26,'#f8e8b0'],[620,200,1.2,0.24,'#d8f0f8'],[100,520,1.2,0.22,'#f8e8b0']];
  for(const[sx,sy,sr,so,sc]of stars)chartG.appendChild(el('circle',{cx:sx,cy:sy,r:sr,fill:sc,opacity:so}));
  for(const[sx,sy,s,fs,op,c]of[[90,110,'✦',11,0.28,'#f0e8d0'],[638,132,'✧',9,0.24,'#d8e8f0'],[74,562,'✦',9,0.22,'#f0e8d0'],[628,562,'✧',11,0.26,'#e8d8b8']])chartG.appendChild(tx(s,{x:sx,y:sy,fill:c,opacity:op,'font-size':fs,'text-anchor':'middle','font-family':'serif'}));
  g.appendChild(chartG);svg.appendChild(g);
}

function drawRims(svg){
  const g=el('g',{id:'rims'});
  for(let i=0;i<12;i++){const s=SIGNS[i];g.appendChild(el('path',{d:arcStroke(i*30,i*30+30,R.elArc,CHART.asc),fill:'none',stroke:C[s.el+'Arc'],'stroke-width':'7',opacity:'0.68','stroke-linecap':'butt'}))}
  for(const[r,op]of[[R.rim3,0.32],[R.rim1,0.18]])g.appendChild(el('circle',{cx:CX,cy:CY,r,fill:'none',stroke:C.gold,'stroke-width':'0.5',opacity:op}));
  for(let i=0;i<12;i++){const p=ept(i*30,R.rim3+5,CHART.asc);g.appendChild(el('circle',{cx:f(p.x),cy:f(p.y),r:2.0,fill:C.gold,opacity:'0.55'}))}
  for(let i=0;i<36;i++){if(i%3===0)continue;const p=ept(i*10,R.rim1,CHART.asc);g.appendChild(el('circle',{cx:f(p.x),cy:f(p.y),r:0.9,fill:C.gold,opacity:'0.28'}))}
  svg.appendChild(g);
}

function drawZodiac(svg){
  const g=el('g',{id:'zodiac'});
  for(let i=0;i<12;i++){
    const s=SIGNS[i];const startEcl=i*30,endEcl=startEcl+30;
    g.appendChild(el('path',{d:sector(startEcl,endEcl,R.zodOut,R.zodIn,CHART.asc),fill:C[s.el],stroke:C.goldM,'stroke-width':'0.6'}));
    for(const off of[10,20]){const a=svgA(startEcl+off,CHART.asc);const oT=pt(a,R.zodIn+14),iT=pt(a,R.zodIn+2);g.appendChild(el('line',{x1:f(oT.x),y1:f(oT.y),x2:f(iT.x),y2:f(iT.y),stroke:C.goldBrt,'stroke-width':'0.6'}))}
    const gp=ept(startEcl+15,R.zodMid,CHART.asc);g.appendChild(glTx(s.gl,gp.x,gp.y,21,s.color,'0.93'));
  }
  g.appendChild(el('circle',{cx:CX,cy:CY,r:R.zodOut,fill:'none',stroke:C.goldBrt,'stroke-width':'0.9'}));
  g.appendChild(el('circle',{cx:CX,cy:CY,r:R.zodIn,fill:'none',stroke:C.goldM,'stroke-width':'0.7'}));
  svg.appendChild(g);
}

function drawHouses(svg){
  const g=el('g',{id:'houses'});
  g.appendChild(el('circle',{cx:CX,cy:CY,r:R.zodIn,fill:'#09102a'}));
  const ig=el('radialGradient',{id:'innerG',cx:'50%',cy:'50%',r:'50%'});
  ig.appendChild(el('stop',{offset:'0%','stop-color':'#122040','stop-opacity':'0.6'}));
  ig.appendChild(el('stop',{offset:'100%','stop-color':'#09102a','stop-opacity':'0'}));
  svg.querySelector('defs').appendChild(ig);
  g.appendChild(el('circle',{cx:CX,cy:CY,r:R.zodIn,fill:'url(#innerG)'}));
  const EL_WC={fire:'rgba(205,125,45,',earth:'rgba(75,138,65,',air:'rgba(75,108,195,',water:'rgba(38,118,178,'};
  const EL_BY_SIGN=['fire','earth','air','water','fire','earth','air','water','fire','earth','air','water'];
  for(let i=0;i<12;i++){
    if(i%2===0)continue;
    const c1=CHART.cusps[i],c2=CHART.cusps[(i+1)%12];
    g.appendChild(el('path',{d:sector(c1,c2,R.zodIn,R.cDot+6,CHART.asc),fill:'rgba(240,228,200,0.04)',stroke:'none'}));
    const mid=c2>c1?(c1+c2)/2:norm((c1+c2+360)/2);
    const signIdx=Math.floor(CHART.cusps[i]/30)%12;
    const wcColor=EL_WC[EL_BY_SIGN[signIdx]];
    const blobP=ept(mid,125,CHART.asc);g.appendChild(el('circle',{cx:f(blobP.x),cy:f(blobP.y),r:70,fill:wcColor+'0.11)',filter:'url(#wc)'}));
    const blobP2=ept(mid,200,CHART.asc);g.appendChild(el('circle',{cx:f(blobP2.x),cy:f(blobP2.y),r:45,fill:wcColor+'0.07)',filter:'url(#wc)'}));
  }
  for(let i=0;i<12;i++){
    const cusp=CHART.cusps[i];const isAngle=(i%3===0);
    const oP=ept(cusp,R.zodIn,CHART.asc),iP=ept(cusp,R.cDot+6,CHART.asc);
    g.appendChild(el('line',{x1:f(oP.x),y1:f(oP.y),x2:f(iP.x),y2:f(iP.y),stroke:isAngle?C.axis:'rgba(208,168,64,0.42)','stroke-width':isAngle?1.4:0.9}));
    g.appendChild(el('circle',{cx:f(oP.x),cy:f(oP.y),r:isAngle?2.2:1.6,fill:isAngle?C.gold:C.goldM,opacity:isAngle?'0.85':'0.55'}));
    const sp=ept(cusp,R.sepRing,CHART.asc);g.appendChild(el('circle',{cx:f(sp.x),cy:f(sp.y),r:isAngle?2.4:1.5,fill:isAngle?C.gold:C.goldM,opacity:isAngle?'0.80':'0.48'}));
    const{deg,sign}=eclSD(cusp);const lp=ept(cusp,R.cuspLbl,CHART.asc);
    g.appendChild(el('circle',{cx:f(lp.x),cy:f(lp.y),r:12,fill:'rgba(8,22,46,0.85)'}));
    g.appendChild(tx(`${deg}°`,{x:f(lp.x),y:f(lp.y-4.5),fill:isAngle?C.gold:C.ivory,opacity:isAngle?'0.90':'0.72','font-size':isAngle?8.5:7.5,'font-family':"'Inter',sans-serif",'text-anchor':'middle','dominant-baseline':'central'}));
    g.appendChild(glTx(sign.gl,lp.x,lp.y+5.2,isAngle?8.5:7.5,isAngle?C.gold:C.ivory,isAngle?'0.90':'0.68'));
  }
  for(let i=0;i<12;i++){
    const c1=CHART.cusps[i],c2=CHART.cusps[(i+1)%12];
    const mid=c2>c1?(c1+c2)/2:norm((c1+c2+360)/2);const np=ept(mid,R.hNum,CHART.asc);
    g.appendChild(el('circle',{cx:f(np.x),cy:f(np.y),r:11,fill:'rgba(8,22,46,0.75)'}));
    g.appendChild(tx(String(i+1),{x:f(np.x),y:f(np.y),fill:C.ivory,opacity:'0.72','font-size':12.5,'font-family':"'Cormorant Garamond',serif",'font-weight':'400','font-style':'italic','text-anchor':'middle','dominant-baseline':'central'}));
  }
  g.appendChild(el('circle',{cx:CX,cy:CY,r:R.sepRing,fill:'none',stroke:C.goldM,'stroke-width':'0.35'}));
  g.appendChild(el('circle',{cx:CX,cy:CY,r:R.asp,fill:'rgba(8,12,30,0.45)',stroke:'rgba(62,143,192,0.28)','stroke-width':'0.9'}));
  svg.appendChild(g);
}

function drawCenter(svg){
  const g=el('g',{id:'center'});
  for(let i=0;i<16;i++){const angle=i*(360/16);const inner=14,outer=i%2===0?42:30;const p1=pt(angle,inner),p2=pt(angle,outer);g.appendChild(el('line',{x1:f(p1.x),y1:f(p1.y),x2:f(p2.x),y2:f(p2.y),stroke:C.gold,'stroke-width':i%2===0?'0.8':'0.4',opacity:i%2===0?'0.30':'0.14'}))}
  for(const[r,op]of[[32,0.06],[25,0.07],[19,0.08]])g.appendChild(el('circle',{cx:CX,cy:CY,r,fill:'none',stroke:C.gold,'stroke-width':'0.5',opacity:op}));
  g.appendChild(el('circle',{cx:CX,cy:CY,r:R.cRing,fill:'none',stroke:C.goldM,'stroke-width':'0.7'}));
  g.appendChild(el('circle',{cx:CX,cy:CY,r:R.cDot,fill:'#0c1030',stroke:C.gold,'stroke-width':'0.9',opacity:'0.85'}));
  g.appendChild(tx('✦',{x:CX,y:CY,fill:C.gold,opacity:'0.92','font-size':8,'font-family':'serif','text-anchor':'middle','dominant-baseline':'central'}));
  svg.appendChild(g);
}

function drawAspects(svg){
  const g=el('g',{id:'aspects'});
  const dMap={};CHART.planets.forEach(p=>dMap[p.id]=p.deg);dMap.mc=CHART.mc;dMap.asc=CHART.asc;
  for(const asp of CHART.aspects){
    const st=ASP_STYLE[asp.type];if(!st)continue;
    const d1=dMap[asp.p1],d2=dMap[asp.p2];if(d1==null||d2==null)continue;
    const p1=ept(d1,R.asp,CHART.asc),p2=ept(d2,R.asp,CHART.asc);
    const ln=el('line',{x1:f(p1.x),y1:f(p1.y),x2:f(p2.x),y2:f(p2.y),stroke:st.color,'stroke-width':st.w,opacity:st.op});
    if(st.dash)ln.setAttribute('stroke-dasharray',st.dash);
    g.appendChild(ln);
  }
  svg.appendChild(g);
}

function drawAxes(svg){
  const g=el('g',{id:'axes'});
  for(const[ecl,label]of[[CHART.asc,'ASC'],[CHART.mc,'MC']]){
    const p1=ept(ecl,R.zodOut+4,CHART.asc),p2=ept(ecl+180,R.zodOut+4,CHART.asc);
    g.appendChild(el('line',{x1:f(p1.x),y1:f(p1.y),x2:f(p2.x),y2:f(p2.y),stroke:C.gold,'stroke-width':'1.1',opacity:'0.55'}));
    const lp=ept(ecl,R.zodOut+28,CHART.asc);
    g.appendChild(tx(label,{x:f(lp.x),y:f(lp.y),fill:C.gold,opacity:'0.85','font-size':8.5,'font-family':"'Inter',sans-serif",'font-weight':'500','letter-spacing':'0.12em','text-anchor':'middle','dominant-baseline':'central'}));
  }
  svg.appendChild(g);
}

function drawPlanets(svg){
  const g=el('g',{id:'planets'});
  const sp=spread(CHART.planets);
  for(const p of sp){
    const color=PLANET_COLOR[p.grp];const sign=SIGNS[p.si];
    const tP=ept(p.deg,R.asp,CHART.asc);g.appendChild(el('circle',{cx:f(tP.x),cy:f(tP.y),r:2.8,fill:color,opacity:'0.88'}));
    if(Math.abs(p.disp-p.deg)>2.5){const lA=ept(p.deg,R.asp+5,CHART.asc),lB=ept(p.disp,R.pGlyph-14,CHART.asc);g.appendChild(el('line',{x1:f(lA.x),y1:f(lA.y),x2:f(lB.x),y2:f(lB.y),stroke:color,'stroke-width':'0.5',opacity:'0.42'}))}
    const lp=ept(p.disp,R.pLbl,CHART.asc);
    g.appendChild(tx(`${p.sd}°`,{x:f(lp.x),y:f(lp.y-4.2),fill:color,opacity:'0.72','font-size':8,'font-family':"'Inter',sans-serif",'text-anchor':'middle','dominant-baseline':'central'}));
    g.appendChild(glTx(sign.gl,lp.x,lp.y+5.2,8.5,color,'0.68'));
    const gp=ept(p.disp,R.pGlyph,CHART.asc);
    g.appendChild(el('circle',{cx:f(gp.x),cy:f(gp.y),r:13,fill:color,opacity:'0.05'}));
    g.appendChild(glTx(p.gl,gp.x,gp.y,21,color,'0.97'));
    if(p.retro){const rxA=svgA(p.disp,CHART.asc)+9;const rxP=pt(rxA,R.pGlyph-10);g.appendChild(tx('Rx',{x:f(rxP.x),y:f(rxP.y),fill:color,opacity:'0.68','font-size':7.5,'font-family':"'Inter',sans-serif",'font-style':'italic','text-anchor':'middle','dominant-baseline':'central'}))}
  }
  svg.appendChild(g);
}

function render(){
  const svg=document.getElementById('chart-svg');
  drawDefs(svg);drawBackground(svg);drawRims(svg);drawZodiac(svg);
  drawHouses(svg);drawAspects(svg);drawAxes(svg);drawPlanets(svg);drawCenter(svg);
}
render();

// ─── NAVIGATION ───────────────────────────────────────────────────────────────
const panels={
  home:    document.getElementById('panel-home'),
  natal:   document.getElementById('panel-natal'),
  transits:document.getElementById('panel-transits'),
  daily:   document.getElementById('panel-daily'),
  wheel:   document.getElementById('panel-wheel'),
};
const subpanels={
  chart:   document.getElementById('sp-chart'),
  identity:document.getElementById('sp-identity'),
  depth:   document.getElementById('sp-depth'),
  roots:   document.getElementById('sp-roots'),
  soul:    document.getElementById('sp-soul'),
};
let activePanel='home';
let activeSub='chart';
panels.home.classList.add('active');
subpanels.chart.classList.add('active');
document.getElementById('keyBtn').classList.add('hidden');

// Home panel: date (static)
(function(){
  const months=['January','February','March','April','May','June','July','August','September','October','November','December'];
  const days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const now=new Date();
  const el=document.getElementById('home-date');
  if(el)el.textContent=`${days[now.getDay()]} · ${months[now.getMonth()]} ${now.getDate()}`;
})();

// Planet name → glyph map (shared by position fetch + biwheel)
const PLANET_GLYPHS={'Sun':'☉','Moon':'☽','Mercury':'☿','Venus':'♀','Mars':'♂','Jupiter':'♃','Saturn':'♄','Uranus':'♅','Neptune':'♆','Pluto':'♇','Chiron':'⚷','NNode':'☊','SNode':'☋','TrueNode':'☊','MeanNode':'☊'};
const SIGN_NAMES=['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];

async function fetchPositions(){
  try{
    const r=await fetch('/routine/positions-today.json?_='+Date.now());
    const pos=await r.json();
    if(!pos||!pos.positions)return;
    dailyData.transiting_positions=Object.entries(pos.positions).map(([name,p])=>({
      planet:name,
      glyph:PLANET_GLYPHS[name]||name[0],
      deg:p.deg,
      retrograde:p.retrograde||false,
      formatted:p.formatted||'',
      sign:SIGN_NAMES[Math.floor(((p.deg%360)+360)%360/30)]||''
    }));
  }catch(e){}
}

// Pre-fetch today.json so home panel populates without tapping Daily first
// Friend builds: fetch moon phase only — skip daily title + transit overwrite
(async function(){
  if(typeof IS_FRIEND_BUILD!=='undefined'&&IS_FRIEND_BUILD){
    try{
      const r=await fetch('/today.json?_='+Date.now());
      const d=await r.json();
      dailyData=d;
      updateHomeFromDaily(d,true);
    }catch(e){}
    return;
  }
  try{
    const r=await fetch('/today.json?_='+Date.now());
    const d=await r.json();
    dailyData=d;
    updateHomeFromDaily(d);
    await fetchPositions();
    renderBiwheel();
  }catch(e){}
})();

function switchPanel(id,btn){
  if(id===activePanel)return;
  panels[activePanel].classList.remove('active');
  document.querySelectorAll('.nav-tab').forEach(t=>t.classList.remove('active'));
  panels[id].classList.add('active');
  btn.classList.add('active');
  activePanel=id;
  const showKey=id==='natal'&&activeSub==='chart';
  document.getElementById('keyBtn').classList.toggle('hidden',!showKey);
  if(!showKey)closeKey();
  if(id==='transits')loadTransits();
  if(id==='daily')loadDaily();
  if(id==='wheel')loadWheel();
}

// Open transit library from within The Variable (no separate nav tab)
function openTransitLibrary(){
  loadTransits();
  panels[activePanel].classList.remove('active');
  document.querySelectorAll('.nav-tab').forEach(t=>t.classList.remove('active'));
  panels.transits.classList.add('active');
  document.querySelector('.nav-tab[data-target="daily"]').classList.add('active');
  activePanel='transits';
  document.getElementById('keyBtn').classList.add('hidden');
  closeKey();
}

// Return from transit library to today's reading
function backToToday(){
  const btn=document.querySelector('.nav-tab[data-target="daily"]');
  switchPanel('daily',btn);
}

// ─── THE WHEEL ────────────────────────────────────────────────────────────────
const SABBATS=[
  {name:'Imbolc',     date:'2026-02-01', element:'Earth', theme:'The ground stirs. First light after the long dark — not arrival yet, but the turning toward it.'},
  {name:'Ostara',     date:'2026-03-20', element:'Air',   theme:'Equal day and night. Balance as a starting point, not a destination.'},
  {name:'Beltane',    date:'2026-05-01', element:'Fire',  theme:'Full-body yes. The fire that doesn\'t ask permission.'},
  {name:'Litha',      date:'2026-06-21', element:'Fire',  theme:'Peak light. Everything that has been growing reaches its fullest expression. What have you been building toward?'},
  {name:'Lughnasadh', date:'2026-08-01', element:'Earth', theme:'First harvest. What ripened and what didn\'t — both are information.'},
  {name:'Mabon',      date:'2026-09-22', element:'Earth', theme:'Second equinox. Gratitude and release in equal measure.'},
  {name:'Samhain',    date:'2026-10-31', element:'Water', theme:'The veil thins. The ancestors are close. What have you carried long enough?'},
  {name:'Yule',       date:'2026-12-21', element:'Earth', theme:'Longest night — and then the turning back. The light returns, however small.'},
];

const MOON_PHASE_DESC={
  'New Moon':       'Seed point. The sky is dark and receptive. What you begin now carries the energy of the whole cycle ahead.',
  'Waxing Crescent':'Building momentum. Intentions set at the New Moon start to take form.',
  'First Quarter':  'Decision point. Something is being asked of you — act on what\'s been building.',
  'Waxing Gibbous': 'Refinement. The shape of the cycle is becoming clear. Adjust and continue.',
  'Full Moon':      'Peak illumination. What has been growing comes fully into the light — for better or for reckoning.',
  'Waning Gibbous': 'Integration. The height has passed; what did you learn?',
  'Last Quarter':   'Release. Let go of what served the cycle but doesn\'t belong in the next one.',
  'Waning Crescent':'Surrender. Rest. The cycle is completing. Don\'t force new starts — not yet.',
};

let wheelLoaded=false;
function getMoonPhaseSVG(phase){
  const p=(phase||'').toLowerCase();
  const f='rgba(90,184,168,0.52)';
  const s='rgba(90,184,168,0.32)';
  const bg='rgba(90,184,168,0.07)';
  if(p.includes('new'))
    return `<svg viewBox="0 0 36 36" width="36" height="36"><circle cx="18" cy="18" r="13" fill="${bg}" stroke="${s}" stroke-width="1.2"/></svg>`;
  if(p.includes('full'))
    return `<svg viewBox="0 0 36 36" width="36" height="36"><circle cx="18" cy="18" r="13" fill="${f}"/></svg>`;
  if(p.includes('first quarter'))
    return `<svg viewBox="0 0 36 36" width="36" height="36"><path d="M18 5A13 13 0 0 1 18 31L18 5Z" fill="${f}"/><circle cx="18" cy="18" r="13" fill="none" stroke="${s}" stroke-width="0.8"/></svg>`;
  if(p.includes('last quarter')||p.includes('third quarter'))
    return `<svg viewBox="0 0 36 36" width="36" height="36"><path d="M18 5A13 13 0 0 0 18 31L18 5Z" fill="${f}"/><circle cx="18" cy="18" r="13" fill="none" stroke="${s}" stroke-width="0.8"/></svg>`;
  if(p.includes('waxing crescent'))
    return `<svg viewBox="0 0 36 36" width="36" height="36"><path d="M18 5A13 13 0 0 1 18 31A10 13 0 0 0 18 5Z" fill="${f}"/><circle cx="18" cy="18" r="13" fill="none" stroke="${s}" stroke-width="0.6" opacity="0.5"/></svg>`;
  if(p.includes('waxing gibbous'))
    return `<svg viewBox="0 0 36 36" width="36" height="36"><path d="M18 5A13 13 0 0 1 18 31A6 13 0 0 1 18 5Z" fill="${f}"/><circle cx="18" cy="18" r="13" fill="none" stroke="${s}" stroke-width="0.6" opacity="0.5"/></svg>`;
  if(p.includes('waning gibbous'))
    return `<svg viewBox="0 0 36 36" width="36" height="36"><path d="M18 5A13 13 0 0 0 18 31A6 13 0 0 0 18 5Z" fill="${f}"/><circle cx="18" cy="18" r="13" fill="none" stroke="${s}" stroke-width="0.6" opacity="0.5"/></svg>`;
  if(p.includes('waning crescent'))
    return `<svg viewBox="0 0 36 36" width="36" height="36"><path d="M18 5A13 13 0 0 0 18 31A10 13 0 0 1 18 5Z" fill="${f}"/><circle cx="18" cy="18" r="13" fill="none" stroke="${s}" stroke-width="0.6" opacity="0.5"/></svg>`;
  return `<svg viewBox="0 0 24 24" width="36" height="36"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="${f}"/></svg>`;
}

function loadWheel(){
  if(wheelLoaded)return;
  wheelLoaded=true;
  if(dailyData){
    const phase=dailyData.moon_phase||'';
    const sign=dailyData.moon_sign||'';
    const el=document.getElementById('wheel-moon-phase-label');
    const sl=document.getElementById('wheel-moon-sign-label');
    const gl=document.getElementById('wheel-moon-glyph');
    const dl=document.getElementById('wheel-moon-desc');
    if(el)el.textContent=phase;
    if(sl)sl.textContent=sign;
    if(gl)gl.innerHTML=getMoonPhaseSVG(phase);
    if(dl)dl.textContent=MOON_PHASE_DESC[phase]||'';
  }
  const today=new Date();
  today.setHours(0,0,0,0);
  let nextIdx=-1;
  SABBATS.forEach((s,i)=>{
    const d=new Date(s.date+'T12:00:00');
    if(nextIdx===-1&&d>=today)nextIdx=i;
  });
  if(nextIdx===-1)nextIdx=0;
  const next=SABBATS[nextIdx];
  const nextDate=new Date(next.date+'T12:00:00');
  const daysAway=Math.round((nextDate-today)/(1000*60*60*24));
  const months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  document.getElementById('next-sabbat-name').textContent=next.name;
  document.getElementById('next-sabbat-days').textContent=daysAway===0?'Today':`${daysAway} day${daysAway===1?'':'s'}`;
  document.getElementById('next-sabbat-date').textContent=`${months[nextDate.getMonth()]} ${nextDate.getDate()}, ${nextDate.getFullYear()} · ${next.element}`;
  document.getElementById('next-sabbat-theme').textContent=next.theme;
  const list=document.getElementById('wheel-sabbat-list');
  if(list){
    list.innerHTML=SABBATS.map((s,i)=>{
      const d=new Date(s.date+'T12:00:00');
      const isPast=d<today;
      const isNext=i===nextIdx;
      const label=`${months[d.getMonth()]} ${d.getDate()}`;
      return `<div style="display:flex;align-items:center;gap:12px;padding:11px 14px;border-radius:10px;background:${isNext?'rgba(90,184,168,0.07)':'transparent'};border:1px solid ${isNext?'rgba(90,184,168,0.20)':'rgba(90,184,168,0.07)'};opacity:${isPast?'0.42':'1'}">
        <div style="width:6px;height:6px;border-radius:50%;background:rgba(90,184,168,${isNext?'0.80':isPast?'0.25':'0.45'});flex-shrink:0"></div>
        <div style="flex:1;min-width:0">
          <div style="font-size:0.85rem;color:${isNext?'var(--text)':'var(--muted)'};font-family:'Cormorant Garamond',serif;font-weight:${isNext?'400':'300'}">${s.name}</div>
        </div>
        <div style="font-size:0.70rem;color:rgba(90,184,168,${isPast?'0.35':'0.55'});font-family:'Inter',sans-serif;flex-shrink:0">${label}</div>
        ${isPast?`<div style="font-size:0.46rem;letter-spacing:0.14em;text-transform:uppercase;font-family:'Inter',sans-serif;color:rgba(90,184,168,0.30)">past</div>`:''}
      </div>`;
    }).join('');
  }
}

// Navigate from home card directly into Natal/Chart
function goNatal(){
  const btn=document.querySelector('[data-target="natal"]');
  switchPanel('natal',btn);
}

// Navigate from home cards to top-level panels
function switchToPanel(id,btn){
  if(btn)switchPanel(id,btn);
}

function switchSub(id,btn){
  if(id===activeSub)return;
  subpanels[activeSub].classList.remove('active');
  document.querySelectorAll('.subnav-tab').forEach(t=>t.classList.remove('active'));
  subpanels[id].classList.add('active');
  btn.classList.add('active');
  activeSub=id;
  const showKey=id==='chart';
  document.getElementById('keyBtn').classList.toggle('hidden',!showKey);
  if(!showKey)closeKey();
  if(subpanels[id].scrollTop!==undefined)subpanels[id].scrollTop=0;
}

// ─── SCROLL FADE-IN ───────────────────────────────────────────────────────────
const fadeObserver=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');fadeObserver.unobserve(e.target);}});
},{threshold:0.08,rootMargin:'0px 0px -20px 0px'});

document.querySelectorAll('.sec-card,.dive-wrap,.throughline,.tarot-outer,.poem-outer').forEach(el=>{
  const siblings=[...el.parentElement.children].filter(c=>c.classList.contains(el.className.split(' ')[0]));
  const idx=siblings.indexOf(el);
  el.style.transitionDelay=`${idx*0.06}s`;
  fadeObserver.observe(el);
});

// ─── iOS PWA VIEWPORT HEIGHT FIX ─────────────────────────────────────────────
(function(){
  function setAppH(){document.documentElement.style.setProperty('--app-h',window.innerHeight+'px');}
  setAppH();
  window.addEventListener('resize',setAppH,{passive:true});
})();

// ─── CHART PINCH-TO-ZOOM ─────────────────────────────────────────────────────
(function(){
  const wrap  = document.querySelector('.chart-wrap');
  const svg   = document.getElementById('chart-svg');
  const badge = document.getElementById('zoom-badge');
  if(!wrap || !svg || !badge) return;

  const MIN=1, MAX=4;
  let s=1, tx=0, ty=0;
  let pinching=false, lastDist=0, lastMid={x:0,y:0};
  let panStart={x:0,y:0}, panBase={x:0,y:0};
  let lastTap=0;

  function clamp(v,lo,hi){return Math.max(lo,Math.min(hi,v));}

  function constrain(){
    const mx=(wrap.offsetWidth*(s-1))/2;
    const my=(wrap.offsetHeight*(s-1))/2;
    tx=clamp(tx,-mx,mx); ty=clamp(ty,-my,my);
  }

  function apply(animated){
    constrain();
    svg.style.transition=animated?'transform 0.22s ease':'none';
    svg.style.transform=`translate(${tx}px,${ty}px) scale(${s})`;
    const pct=Math.round(s*10)/10;
    badge.textContent=`${pct}×  ↺`;
    badge.style.opacity=s>1.02?'1':'0';
  }

  function reset(animated){s=1;tx=0;ty=0;apply(animated!==false);}

  document.querySelector('.natal-subnav').addEventListener('click',function(e){
    const btn=e.target.closest('.subnav-tab');
    if(btn&&btn.dataset.sub!=='chart') reset(false);
  },{passive:true});
  document.querySelector('.app-nav').addEventListener('click',function(e){
    const btn=e.target.closest('.nav-tab');
    if(btn&&btn.dataset.target!=='natal') reset(false);
  },{passive:true});

  badge.style.pointerEvents='auto';
  badge.addEventListener('click',()=>reset(true));

  function dist2(t){
    const dx=t[0].clientX-t[1].clientX, dy=t[0].clientY-t[1].clientY;
    return Math.sqrt(dx*dx+dy*dy);
  }
  function mid2(t,el){
    const r=el.getBoundingClientRect();
    return{x:((t[0].clientX+t[1].clientX)/2)-r.left-r.width/2,
           y:((t[0].clientY+t[1].clientY)/2)-r.top-r.height/2};
  }
  function mid1(t,el){
    const r=el.getBoundingClientRect();
    return{x:t[0].clientX-r.left-r.width/2, y:t[0].clientY-r.top-r.height/2};
  }

  wrap.addEventListener('touchstart',function(e){
    if(e.touches.length===2){
      pinching=true;
      lastDist=dist2(e.touches);
      lastMid=mid2(e.touches,wrap);
      e.preventDefault();
    } else if(e.touches.length===1){
      const now=Date.now();
      if(now-lastTap<280){
        reset(true); lastTap=0; e.preventDefault(); return;
      }
      lastTap=now;
      if(s>1){
        panStart=mid1(e.touches,wrap);
        panBase={x:tx,y:ty};
      }
      pinching=false;
    }
  },{passive:false});

  wrap.addEventListener('touchmove',function(e){
    if(e.touches.length===2&&pinching){
      const d=dist2(e.touches), m=mid2(e.touches,wrap);
      const ns=clamp(s*(d/lastDist),MIN,MAX);
      tx=m.x+(tx-lastMid.x)*(ns/s);
      ty=m.y+(ty-lastMid.y)*(ns/s);
      s=ns; lastDist=d; lastMid=m;
      apply(false); e.preventDefault();
    } else if(e.touches.length===1&&s>1&&!pinching){
      const m=mid1(e.touches,wrap);
      tx=panBase.x+(m.x-panStart.x);
      ty=panBase.y+(m.y-panStart.y);
      apply(false); e.preventDefault();
    }
  },{passive:false});

  wrap.addEventListener('touchend',function(e){
    if(e.touches.length<2) pinching=false;
    if(s<1.02) reset(true);
  },{passive:true});
})();

// ─── DAILY DATE WIRING ────────────────────────────────────────────────────────
(function(){
  const now=new Date();
  const months=['January','February','March','April','May','June','July','August','September','October','November','December'];
  const days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const formatted=`${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
  const short=`${months[now.getMonth()].toLowerCase()} ${now.getDate()} · ${now.getFullYear()}`;
  const ey=document.getElementById('daily-eyebrow');
  const de=document.getElementById('daily-date-eyebrow');
  if(ey)ey.textContent=short;
  if(de)de.textContent=formatted;
})();

// ─── DIVE TOGGLES ─────────────────────────────────────────────────────────────
function toggleDive(btn){
  const expanded=btn.getAttribute('aria-expanded')==='true';
  btn.setAttribute('aria-expanded',!expanded);
  btn.nextElementSibling.classList.toggle('open',!expanded);
}

// ─── KEY DRAWER ───────────────────────────────────────────────────────────────
const KS=SIGNS.map(s=>({gl:s.gl,color:s.color,name:s.name,note:({fire:'Fire',earth:'Earth',air:'Air',water:'Water'})[s.el]+' · '+MODALITY[s.abbr]}));
const KP=[{gl:'☉'+T,c:'#d8b850',name:'Sun',note:'Vitality · core identity'},{gl:'☽'+T,c:'#d8b850',name:'Moon',note:'Emotion · instinct · needs'},{gl:'☿'+T,c:'#c8a0a0',name:'Mercury',note:'Mind · communication'},{gl:'♀'+T,c:'#c8a0a0',name:'Venus',note:'Love · beauty · values'},{gl:'♂'+T,c:'#c8a0a0',name:'Mars',note:'Drive · assertion · will'},{gl:'♃'+T,c:'#7ab0d0',name:'Jupiter',note:'Expansion · wisdom · luck'},{gl:'♄'+T,c:'#7ab0d0',name:'Saturn',note:'Structure · discipline · time'},{gl:'♅'+T,c:'#5ab8a8',name:'Uranus',note:'Innovation · disruption'},{gl:'♆'+T,c:'#5ab8a8',name:'Neptune',note:'Dreams · dissolution · vision'},{gl:'♇'+T,c:'#5ab8a8',name:'Pluto',note:'Transformation · depth · power'},{gl:'⚷'+T,c:'rgba(240,228,200,0.70)',name:'Chiron',note:'The wound · the healer'},{gl:'☊'+T,c:'rgba(240,228,200,0.70)',name:'North Node',note:'Soul path · growth edge'},{gl:'☋'+T,c:'rgba(240,228,200,0.70)',name:'South Node',note:'Karmic origin · past pattern'}];
const KA=[{color:'#d0a840',dash:false,name:'Conjunction',note:'0° · unity, intensity, merger'},{color:'#3e8fc0',dash:false,name:'Sextile',note:'60° · opportunity, ease, flow'},{color:'#5ab8a8',dash:false,name:'Trine',note:'120° · natural talent, grace'},{color:'#c89898',dash:true,name:'Square',note:'90° · friction, growth pressure'},{color:'#c89898',dash:false,name:'Opposition',note:'180° · tension, polarity, awareness'},{color:'rgba(240,228,200,0.38)',dash:true,name:'Inconjunct',note:'150° · adjustment, redirection'}];
const KE=[{color:'#c87840',name:'Fire',note:'Aries · Leo · Sagittarius'},{color:'#58925a',name:'Earth',note:'Taurus · Virgo · Capricorn'},{color:'#5878c8',name:'Air',note:'Gemini · Libra · Aquarius'},{color:'#3880b8',name:'Water',note:'Cancer · Scorpio · Pisces'}];
function ki(html,bc){const d=document.createElement('div');d.className='ki';d.style.borderColor=`${bc}18`;d.innerHTML=html;return d}
function buildKey(){
  const sg=document.getElementById('kS');for(const s of KS)sg.appendChild(ki(`<span class="ki-gl" style="color:${s.color}">${s.gl}</span><span><span class="ki-name">${s.name}</span><span class="ki-note">${s.note}</span></span>`,s.color));
  const pg=document.getElementById('kP');for(const p of KP)pg.appendChild(ki(`<span class="ki-gl" style="color:${p.c}">${p.gl}</span><span><span class="ki-name">${p.name}</span><span class="ki-note">${p.note}</span></span>`,p.c));
  const ag=document.getElementById('kA');for(const a of KA){const ln=`<svg width="30" height="14" style="flex-shrink:0"><line x1="2" y1="7" x2="28" y2="7" stroke="${a.color}" stroke-width="1.5" ${a.dash?'stroke-dasharray="5,3"':''} opacity="0.88"/></svg>`;ag.appendChild(ki(`${ln}<span><span class="ki-name">${a.name}</span><span class="ki-note">${a.note}</span></span>`,a.color));}
  const eg=document.getElementById('kE');for(const e of KE)eg.appendChild(ki(`<span class="ki-sw" style="background:${e.color};box-shadow:0 0 7px ${e.color}55"></span><span><span class="ki-name">${e.name}</span><span class="ki-note">${e.note}</span></span>`,e.color));
}
buildKey();

const overlay=document.getElementById('keyOverlay'),dimmer=document.getElementById('keyDimmer'),keyBtn=document.getElementById('keyBtn');
function openKey(){overlay.classList.add('open');dimmer.classList.add('open');document.body.classList.add('drawer-open');keyBtn.textContent='×'}
function closeKey(){overlay.classList.remove('open');dimmer.classList.remove('open');document.body.classList.remove('drawer-open');keyBtn.textContent='✦'}
keyBtn.addEventListener('click',()=>overlay.classList.contains('open')?closeKey():openKey());
document.getElementById('keyClose').addEventListener('click',closeKey);
dimmer.addEventListener('click',closeKey);
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeKey()});
let _sx=0;
overlay.addEventListener('touchstart',e=>{_sx=e.touches[0].clientX},{passive:true});
overlay.addEventListener('touchend',e=>{if(e.changedTouches[0].clientX-_sx>80)closeKey()},{passive:true});

// ─── TRANSITS DATA + NAVIGATION ──────────────────────────────────────────────
let transitsData=null;
let activeTransitTab='now';

function switchTransitTab(tab,btn){
  if(tab===activeTransitTab)return;
  activeTransitTab=tab;
  document.querySelectorAll('.t-tab').forEach(t=>t.classList.remove('active'));
  btn.classList.add('active');
  renderTransitTabContent();
}

// ─── BIWHEEL STATE ────────────────────────────────────────────────────────────
window.bwState={selected:null,lines:[],planets:{},selRing:null};

const BW_PLANET_NAMES={'☉':'Sun','☽':'Moon','☿':'Mercury','♀':'Venus','♂':'Mars',
  '♃':'Jupiter','♄':'Saturn','♅':'Uranus','♆':'Neptune','♇':'Pluto',
  '⚷':'Chiron','☊':'NNode','☋':'SNode'};

function renderBiwheel(svgId,interactive){
  if(svgId===undefined)svgId='t-biwheel-svg';
  if(interactive===undefined)interactive=true;
  const bSvg=document.getElementById(svgId);
  if(!bSvg||!dailyData||!dailyData.transiting_positions)return;
  while(bSvg.firstChild)bSvg.removeChild(bSvg.firstChild);
  if(interactive){window.bwState={selected:null,lines:[],planets:{},selRing:null};bSvg.onclick=()=>clearBiwheelSelection();}

  const bCX=130,bCY=130,bASC=CHART.asc,bMC=CHART.mc;
  const bNorm=a=>((a%360)+360)%360;
  const bRad=d=>d*Math.PI/180;
  const bF=n=>n.toFixed(2);
  const bSvgA=ecl=>bNorm(180-(ecl-bASC));
  const bPt=(a,r)=>({x:bCX+r*Math.cos(bRad(a)),y:bCY+r*Math.sin(bRad(a))});
  const bEpt=(ecl,r)=>bPt(bSvgA(ecl),r);
  const bR={outer:122,trGlyph:116,trSep:110,zodOut:108,zodMid:98,zodIn:88,
            nSep:82,nGlyph:73,aspLine:78};

  const defs=el('defs',{});
  const cp=el('clipPath',{id:'bwClip'});
  cp.appendChild(el('circle',{cx:bCX,cy:bCY,r:bR.outer}));
  defs.appendChild(cp);
  bSvg.appendChild(defs);

  const bgG=el('g',{'clip-path':'url(#bwClip)','pointer-events':'none'});
  bgG.appendChild(el('circle',{cx:bCX,cy:bCY,r:bR.outer,fill:'#09102a'}));
  bgG.appendChild(el('ellipse',{cx:bCX+18,cy:bCY-28,rx:72,ry:38,fill:'rgba(180,110,30,0.07)',transform:`rotate(-35,${bCX},${bCY})`}));
  bgG.appendChild(el('ellipse',{cx:bCX-18,cy:bCY+28,rx:72,ry:42,fill:'rgba(30,100,160,0.08)',transform:`rotate(-35,${bCX},${bCY})`}));
  bSvg.appendChild(bgG);

  const elColors={fire:'rgba(210,130,48,0.25)',earth:'rgba(80,142,68,0.18)',air:'rgba(80,112,200,0.20)',water:'rgba(40,128,188,0.27)'};
  const elArcs={fire:'#c87840',earth:'#58925a',air:'#5878c8',water:'#3880b8'};
  const signEls=['fire','earth','air','water','fire','earth','air','water','fire','earth','air','water'];
  const zodG=el('g',{id:'bw-zodiac','pointer-events':'none'});
  for(let i=0;i<12;i++){
    const s=i*30,e=s+30;
    const a1=bSvgA(s),a2=bSvgA(e);
    const oo=bPt(a1,bR.zodOut),oe=bPt(a2,bR.zodOut),io=bPt(a1,bR.zodIn),ie=bPt(a2,bR.zodIn);
    const d=`M${bF(oo.x)} ${bF(oo.y)} A${bR.zodOut} ${bR.zodOut} 0 0 0 ${bF(oe.x)} ${bF(oe.y)} L${bF(ie.x)} ${bF(ie.y)} A${bR.zodIn} ${bR.zodIn} 0 0 1 ${bF(io.x)} ${bF(io.y)}Z`;
    zodG.appendChild(el('path',{d,fill:elColors[signEls[i]],stroke:'rgba(208,168,64,0.18)','stroke-width':'0.5'}));
    const aa1=bSvgA(s+1.5),aa2=bSvgA(e-1.5);
    const ap1=bPt(aa1,bR.zodOut-1.5),ap2=bPt(aa2,bR.zodOut-1.5);
    zodG.appendChild(el('path',{d:`M${bF(ap1.x)} ${bF(ap1.y)} A${bR.zodOut-1.5} ${bR.zodOut-1.5} 0 0 0 ${bF(ap2.x)} ${bF(ap2.y)}`,fill:'none',stroke:elArcs[signEls[i]],'stroke-width':'2.5',opacity:'0.50','stroke-linecap':'round'}));
    const gp=bEpt(s+15,bR.zodMid);
    zodG.appendChild(tx(SIGNS[i].gl,{x:bF(gp.x),y:bF(gp.y),fill:SIGNS[i].color,opacity:'0.80','font-size':'7.8','font-family':GLYPH_FONT,'font-variant-emoji':'text','text-anchor':'middle','dominant-baseline':'central'}));
  }
  zodG.appendChild(el('circle',{cx:bCX,cy:bCY,r:bR.zodOut,fill:'none',stroke:'rgba(208,168,64,0.45)','stroke-width':'0.6'}));
  zodG.appendChild(el('circle',{cx:bCX,cy:bCY,r:bR.zodIn, fill:'none',stroke:'rgba(208,168,64,0.30)','stroke-width':'0.5'}));
  zodG.appendChild(el('circle',{cx:bCX,cy:bCY,r:bR.outer, fill:'none',stroke:'rgba(208,168,64,0.32)','stroke-width':'0.6'}));
  for(let i=0;i<12;i++){const a=bSvgA(i*30);const op=bPt(a,bR.outer),zp=bPt(a,bR.zodOut+0.5);zodG.appendChild(el('line',{x1:bF(op.x),y1:bF(op.y),x2:bF(zp.x),y2:bF(zp.y),stroke:'rgba(208,168,64,0.45)','stroke-width':'0.5'}));}
  bSvg.appendChild(zodG);

  const nFill=el('g',{'pointer-events':'none'});
  nFill.appendChild(el('circle',{cx:bCX,cy:bCY,r:bR.zodIn,fill:'#09102a'}));
  nFill.appendChild(el('circle',{cx:bCX,cy:bCY,r:bR.zodIn,fill:'rgba(12,18,44,0.55)'}));
  nFill.appendChild(el('circle',{cx:bCX,cy:bCY,r:bR.nSep, fill:'none',stroke:'rgba(208,168,64,0.38)','stroke-width':'0.6'}));
  bSvg.appendChild(nFill);

  const NAME_MAP={Sun:'sun',Moon:'moon',Mercury:'mercury',Venus:'venus',Mars:'mars',
    Jupiter:'jupiter',Saturn:'saturn',Uranus:'uranus',Neptune:'neptune',Pluto:'pluto',
    Chiron:'chiron',NNode:'nnode',SNode:'snode',Ascendant:'asc',Fortune:null};
  const natalByIdMap={};
  CHART.planets.forEach(p=>{natalByIdMap[p.id]=p;});
  natalByIdMap['asc']={deg:CHART.asc};
  const transitByGlyph={};
  dailyData.transiting_positions.forEach(tp=>{transitByGlyph[tp.glyph]=tp;});
  function getAspColor(label){
    if(label.includes('□/'))return{c:'rgba(212,128,64,0.72)',op:0.44};
    if(label.includes('☌'))return{c:'#d0a840',op:0.55};
    if(label.includes('✶'))return{c:'#3e8fc0',op:0.46};
    if(label.includes('△'))return{c:'#5ab8a8',op:0.46};
    if(label.includes('□'))return{c:'#c89898',op:0.50};
    if(label.includes('☍'))return{c:'#c89898',op:0.50};
    if(label.includes('⚻'))return{c:'rgba(240,228,200,0.55)',op:0.38};
    return{c:'rgba(240,228,200,0.40)',op:0.30};
  }
  const AMBIENT=0.14;
  const aspG=el('g',{id:'bw-aspects','pointer-events':'none'});
  for(const tr of (dailyData.active_transits||[])){
    const nm=tr.label.match(/natal\s+(\w+)/)?.[1];
    if(!nm)continue;
    const nP=natalByIdMap[NAME_MAP[nm]];
    const tP=transitByGlyph[tr.glyph];
    if(!nP||!tP)continue;
    const asp=getAspColor(tr.label);
    const tpt=bEpt(tP.deg,bR.aspLine),npt=bEpt(nP.deg,bR.aspLine);
    const lineEl=el('line',{x1:bF(tpt.x),y1:bF(tpt.y),x2:bF(npt.x),y2:bF(npt.y),stroke:asp.c,'stroke-width':'0.8',opacity:String(AMBIENT)});
    aspG.appendChild(lineEl);
    if(interactive)window.bwState.lines.push({glyph:tr.glyph,elem:lineEl,fullOp:asp.op,fullSw:'1.2'});
  }
  bSvg.appendChild(aspG);

  const nColors={luminary:'#d8b850',personal:'#c8a0a0',social:'#7ab0d0',outer:'#5ab8a8',point:'rgba(240,228,200,0.72)'};
  const nSpread=spread(CHART.planets.map(p=>({...p,disp:p.deg})));
  const nPG=el('g',{id:'bw-natal-pl','pointer-events':'none'});
  for(const p of nSpread){
    const tick=bEpt(p.deg,bR.nSep-1);
    nPG.appendChild(el('circle',{cx:bF(tick.x),cy:bF(tick.y),r:'1.1',fill:nColors[p.grp]||'#d8b850',opacity:'0.60'}));
    const gp=bEpt(p.disp,bR.nGlyph);
    nPG.appendChild(tx(p.gl,{x:bF(gp.x),y:bF(gp.y),fill:nColors[p.grp]||'#d8b850',opacity:'0.92','font-size':'8','font-family':GLYPH_FONT,'font-variant-emoji':'text','text-anchor':'middle','dominant-baseline':'central'}));
  }
  bSvg.appendChild(nPG);

  const trData=dailyData.transiting_positions.map(tp=>({id:tp.planet,gl:tp.glyph,deg:tp.deg,retro:tp.retrograde,formatted:tp.formatted,sign:tp.sign,grp:'transit',disp:tp.deg}));
  const trSpread=spread(trData);
  const tPG=el('g',{id:'bw-transit-pl'});
  const TC='rgba(210,188,255,0.92)',TCR='rgba(180,208,255,0.82)';
  for(const tp of trSpread){
    const tick=bEpt(tp.deg,bR.zodOut+4);
    tPG.appendChild(el('circle',{cx:bF(tick.x),cy:bF(tick.y),r:'1.4',fill:tp.retro?TCR:TC,opacity:'0.65','pointer-events':'none'}));
    const gp=bEpt(tp.disp,bR.trGlyph);
    const glEl=tx(tp.gl,{x:bF(gp.x),y:bF(gp.y),fill:tp.retro?TCR:TC,opacity:'0.90','font-size':'8','font-family':GLYPH_FONT,'font-variant-emoji':'text','text-anchor':'middle','dominant-baseline':'central','pointer-events':'none'});
    tPG.appendChild(glEl);
    if(tp.retro){
      const rp=bEpt(tp.disp,bR.trGlyph-6);
      tPG.appendChild(tx('℞',{x:bF(rp.x),y:bF(rp.y),fill:TCR,opacity:'0.55','font-size':'4.5','font-family':GLYPH_FONT,'font-variant-emoji':'text','text-anchor':'middle','dominant-baseline':'central','pointer-events':'none'}));
    }
    if(interactive){
      const hit=el('circle',{cx:bF(gp.x),cy:bF(gp.y),r:'10',fill:'transparent','pointer-events':'all',style:'cursor:pointer;-webkit-tap-highlight-color:transparent'});
      hit.onclick=(e)=>{e.stopPropagation();selectBiwheelPlanet(tp.gl);};
      tPG.appendChild(hit);
      window.bwState.planets[tp.gl]={glyphEl:glEl,glyphPos:{x:gp.x,y:gp.y},data:tp};
    }
  }
  bSvg.appendChild(tPG);

  const axG=el('g',{id:'bw-axes','pointer-events':'none'});
  for(const [ecl,lbl] of [[bASC,'ASC'],[bNorm(bASC+180),'DSC'],[bMC,'MC'],[bNorm(bMC+180),'IC']]){
    const o=bEpt(ecl,bR.nSep+1),i=bEpt(ecl,bR.aspLine-6);
    axG.appendChild(el('line',{x1:bF(o.x),y1:bF(o.y),x2:bF(i.x),y2:bF(i.y),stroke:'rgba(208,168,64,0.55)','stroke-width':'0.7'}));
    const lp=bEpt(ecl,bR.nSep+6);
    axG.appendChild(tx(lbl,{x:bF(lp.x),y:bF(lp.y),fill:'rgba(208,168,64,0.75)','font-size':'4.2','font-family':"'Inter',sans-serif",'font-weight':'600','letter-spacing':'0.2','text-anchor':'middle','dominant-baseline':'central'}));
  }
  bSvg.appendChild(axG);

  const cg=el('g',{'pointer-events':'none'});
  cg.appendChild(el('circle',{cx:bCX,cy:bCY,r:'16',fill:'#09102a',stroke:'rgba(208,168,64,0.22)','stroke-width':'0.5'}));
  cg.appendChild(el('circle',{cx:bCX,cy:bCY,r:'4.5',fill:'rgba(208,168,64,0.32)'}));
  cg.appendChild(el('circle',{cx:bCX,cy:bCY,r:'2',fill:'rgba(240,228,200,0.78)'}));
  bSvg.appendChild(cg);

  if(interactive){
    const selRing=el('circle',{cx:'130',cy:'130',r:'10',fill:'none',stroke:'transparent','stroke-width':'1.8','pointer-events':'none'});
    bSvg.appendChild(selRing);
    window.bwState.selRing=selRing;
  }
}

function selectBiwheelPlanet(glyph){
  if(window.bwState.selected===glyph){clearBiwheelSelection();return;}
  window.bwState.selected=glyph;
  const AMBIENT=0.14,DIMMED=0.05;
  for(const ln of window.bwState.lines){
    if(ln.glyph===glyph){
      ln.elem.setAttribute('opacity',String(ln.fullOp));
      ln.elem.setAttribute('stroke-width',ln.fullSw);
    }else{
      ln.elem.setAttribute('opacity',String(DIMMED));
    }
  }
  const planet=window.bwState.planets[glyph];
  if(planet&&window.bwState.selRing){
    window.bwState.selRing.setAttribute('cx',planet.glyphPos.x.toFixed(2));
    window.bwState.selRing.setAttribute('cy',planet.glyphPos.y.toFixed(2));
    window.bwState.selRing.setAttribute('stroke','rgba(208,168,64,0.60)');
  }
  const lbl=document.getElementById('t-biwheel-lbl');
  if(lbl){lbl.textContent='tap to dismiss';lbl.classList.add('bw-has-sel');lbl.onclick=(e)=>{e.stopPropagation();clearBiwheelSelection();};}
  renderBiwheelDetail(glyph);
}

function clearBiwheelSelection(){
  if(!window.bwState.selected)return;
  window.bwState.selected=null;
  const AMBIENT=0.14;
  for(const ln of window.bwState.lines){
    ln.elem.setAttribute('opacity',String(AMBIENT));
    ln.elem.setAttribute('stroke-width','0.8');
  }
  if(window.bwState.selRing)window.bwState.selRing.setAttribute('stroke','transparent');
  const panel=document.getElementById('bw-detail');
  if(panel){panel.style.maxHeight='0';panel.innerHTML='';}
  const lbl=document.getElementById('t-biwheel-lbl');
  if(lbl){lbl.textContent='natal · live sky';lbl.classList.remove('bw-has-sel');lbl.onclick=null;}
}

function renderBiwheelDetail(glyph){
  const panel=document.getElementById('bw-detail');
  if(!panel||!dailyData)return;
  const tp=(dailyData.transiting_positions||[]).find(p=>p.glyph===glyph);
  if(!tp)return;
  const pName=BW_PLANET_NAMES[glyph]||tp.planet;
  const myAspects=(dailyData.active_transits||[]).filter(a=>a.glyph===glyph);
  const retroBadge=tp.retrograde?` <span style="opacity:0.48;font-size:0.36rem;letter-spacing:0.12em">Rx</span>`:'';
  function aspRowColor(sym){
    if(sym.includes('□/'))return'rgba(212,128,64,0.90)';
    if(sym.includes('☌'))return'#d0a840';
    if(sym.includes('✶'))return'#3e8fc0';
    if(sym.includes('△'))return'#5ab8a8';
    if(sym.includes('□')||sym.includes('☍'))return'#c89898';
    if(sym.includes('⚻'))return'rgba(240,228,200,0.65)';
    return'rgba(208,168,64,0.70)';
  }
  const rows=myAspects.slice(0,7).map(a=>{
    const rest=a.label.slice(pName.length+1);
    const ni=rest.indexOf(' natal ');
    const aspSym=ni>0?rest.slice(0,ni):rest;
    const natalStr=ni>=0?rest.slice(ni+1):'';
    const dirStr=a.direction==='applying'?'app':'sep';
    return`<div class="bw-det-row"><span class="bw-det-asym" style="color:${aspRowColor(aspSym)}">${aspSym}</span><span class="bw-det-lbl">${natalStr}</span><span class="bw-det-orb">${a.orb} · ${dirStr}</span></div>`;
  }).join('');
  panel.innerHTML=`<div class="bw-det-head"><span class="bw-det-gl">${glyph}</span><span class="bw-det-nm">${pName}</span><span class="bw-det-pos">${tp.formatted}${retroBadge}</span></div>${rows||'<div style="padding:10px 12px;font-size:0.40rem;letter-spacing:0.12em;text-transform:uppercase;color:rgba(240,228,200,0.28);font-family:Inter,sans-serif">no active transits</div>'}`;
  const rowH=rows?(Math.min(myAspects.length,7)*34+38):68;
  panel.style.maxHeight=rowH+'px';
}

async function loadTransits(){
  if(transitsData)return;
  try{
    const r=await fetch('/transits.json?_='+Date.now());
    transitsData=await r.json();
    renderTransitList();
  }catch(e){
    document.getElementById('t-list-body').innerHTML='<p style="opacity:0.35;font-size:0.75rem;padding:20px 0;text-align:center">Could not load transit data.</p>';
  }
}

function renderTransitList(){
  if(!transitsData)return;
  const eyebrow=document.getElementById('t-eyebrow');
  if(eyebrow){const g=transitsData.generated||'';const d=g?new Date(g+'T12:00:00'):null;const label=d&&!isNaN(d)?d.toLocaleDateString('en-US',{month:'long',day:'numeric'}):g;eyebrow.textContent='live sky · '+label;}
  const cur=transitsData.current||[];
  const countEl=document.getElementById('home-transit-count');
  if(countEl){const n=cur.length;countEl.textContent=n>0?`${n} active`:'Current sky';}
  renderTransitTabContent();
}

function fmtNP(s){return(s||'').replace(/([a-z])([A-Z])/g,'$1 $2');}

function renderTransitTabContent(){
  if(!transitsData)return;
  const cur=transitsData.current||[];
  const hist=transitsData.historical||[];
  const applying=cur.filter(t=>t.direction==='applying');
  const separating=cur.filter(t=>t.direction!=='applying');
  const between=hist.filter(t=>t.status==='between_passes');
  const complete=hist.filter(t=>t.status==='complete');

  const body=document.getElementById('t-list-body');
  body.innerHTML='';

  function addSectionHdr(label,count,isFirst){
    const hdr=document.createElement('div');
    hdr.className='t-sec'+(isFirst?' t-sec-first':'');
    hdr.innerHTML=`<span class="t-sec-label">${label}</span><span class="t-sec-count">${count}</span>`;
    body.appendChild(hdr);
  }
  function addCurrentRow(t){
    const idx=cur.indexOf(t);
    const row=document.createElement('button');
    row.className='t-row'+(t.direction==='applying'?' t-row-applying':'');
    row.setAttribute('aria-label',`${t.transit_planet} ${t.aspect} natal ${fmtNP(t.natal_point)}`);
    const dirLabel=t.direction==='applying'?'applying':'separating';
    const dirCls=t.direction==='applying'?'t-applying':'';
    row.innerHTML=`
      <span class="t-row-glyph">${t.glyph}</span>
      <span class="t-row-body">
        <span class="t-row-name">${t.aspect} Natal ${fmtNP(t.natal_point)}</span>
        <span class="t-row-meta">${t.transit_planet} · ${t.transit_deg} ${t.transit_sign} · ${t.natal_house}</span>
      </span>
      <span class="t-row-orb">
        <span class="t-row-orb-val">${t.orb}</span>
        <span class="t-row-orb-dir ${dirCls}">${dirLabel}</span>
      </span>
      <span class="t-row-chevron">›</span>`;
    row.addEventListener('click',()=>openTransitDetail(idx));
    body.appendChild(row);
  }
  function addHistRow(t){
    const idx=hist.indexOf(t);
    const row=document.createElement('button');
    row.className='t-row';
    const badgeCls=t.status==='between_passes'?'between':'complete';
    const badgeLabel=t.status==='between_passes'?'between passes':'complete';
    const nextStr=t.next_pass?`<span class="t-hist-dates">next: ${t.next_pass}</span>`:
                  t.active_dates?`<span class="t-hist-dates">${t.active_dates}</span>`:'';
    row.innerHTML=`
      <span class="t-row-glyph" style="opacity:0.55">${t.glyph}</span>
      <span class="t-row-body">
        <span class="t-row-name" style="opacity:0.80">${t.aspect} Natal ${fmtNP(t.natal_point)}</span>
        <span class="t-row-meta">${t.transit_planet}${t.active_dates?' · '+t.active_dates:''}</span>
        ${nextStr}
      </span>
      <span class="t-hist-badge ${badgeCls}">${badgeLabel}</span>
      <span class="t-row-chevron" style="opacity:0.35">›</span>`;
    row.addEventListener('click',()=>openTransitDetail(idx,'historical'));
    body.appendChild(row);
  }

  function emptyState(msg){
    body.innerHTML=`<div style="opacity:0.28;text-align:center;padding:32px 0;font-size:0.70rem;font-family:'Inter',sans-serif">${msg}</div>`;
  }

  if(activeTransitTab==='now'){
    let isFirst=true;
    if(applying.length){addSectionHdr('Applying',applying.length,isFirst);isFirst=false;applying.forEach(t=>addCurrentRow(t));}
    if(separating.length){addSectionHdr('Separating',separating.length,isFirst);isFirst=false;separating.forEach(t=>addCurrentRow(t));}
    if(!applying.length&&!separating.length)emptyState('No active transits today');
  } else if(activeTransitTab==='returning'){
    if(between.length){addSectionHdr('Between Passes',between.length,true);between.forEach(t=>addHistRow(t));}
    else emptyState('No transits between passes');
  } else if(activeTransitTab==='archive'){
    if(complete.length){addSectionHdr('Complete',complete.length,true);complete.forEach(t=>addHistRow(t));}
    else emptyState('No archived transits yet');
  }
}

function openTransitDetail(idx,pool){
  const t=(pool==='historical'?transitsData.historical:transitsData.current)[idx];
  const db=document.getElementById('t-detail-body');
  const statusMap={'exact now':'now','upcoming':'upcoming','complete':'done'};
  const passesHtml=(t.passes&&t.passes.length)?`
    <div class="t-passes">
      <div class="t-passes-label">Passes</div>
      ${t.passes.map(p=>{
        const skey=Object.keys(statusMap).find(k=>p.status.toLowerCase().includes(k))||'';
        const cls=statusMap[skey]||'done';
        return `<div class="t-pass-row"><span class="t-pass-label">${p.label}</span><span class="t-pass-date">${p.date}</span><span class="t-pass-status ${cls}">${p.status}</span></div>`;
      }).join('')}
    </div>`:'';
  const kwHtml=t.keywords?`<div class="kw-row" style="margin-top:14px;margin-bottom:0">${t.keywords.map(k=>`<span class="kw">${k}</span>`).join('')}</div>`:'';
  const proseParas=(t.reading||'').split('\n\n').filter(Boolean);
  const proseFirst=proseParas.length?`<p>${proseParas[0].replace(/\n/g,' ')}</p>`:'';
  const proseRest=proseParas.length>1?proseParas.slice(1).map(p=>`<p>${p.replace(/\n/g,' ')}</p>`).join(''):'';
  const proseHtml=proseFirst+(proseRest?`<div class="d-prose-fold" id="td-prose-fold">${proseRest}</div><button class="d-pull-thread" style="border-color:rgba(212,128,64,0.20);color:rgba(212,128,64,0.65)" onclick="document.getElementById('td-prose-fold').classList.add('open');this.style.display='none'">Pull the thread <span>&#8594;</span></button>`:'');
  const orbBlock=t.status==='between_passes'?`
      <div class="t-detail-orb">
        <span class="t-hist-badge between" style="font-size:0.50rem;padding:5px 14px">between passes</span>
        ${t.next_pass?`<span class="t-detail-orb-val" style="opacity:0.55;margin-left:8px">· next ~${t.next_pass}</span>`:''}
      </div>`:t.status==='complete'?`
      <div class="t-detail-orb">
        <span class="t-hist-badge complete" style="font-size:0.50rem;padding:5px 14px">transit complete</span>
        ${t.active_dates?`<span class="t-detail-orb-val" style="opacity:0.55;margin-left:8px">· ${t.active_dates}</span>`:''}
      </div>`:`
      <div class="t-detail-orb">
        <span class="t-detail-orb-val">${t.orb} ${t.direction}</span>
        ${t.exact_date?`<span class="t-detail-orb-val" style="opacity:0.55">· exact ${t.exact_date}</span>`:''}
      </div>`;
  db.innerHTML=`
    <div class="t-detail-header">
      <div class="t-detail-eyebrow">${t.transit_planet} · ${t.transit_deg||'—'} ${t.transit_sign}</div>
      <div class="t-detail-title">${t.aspect} Natal ${fmtNP(t.natal_point)}</div>
      <div class="t-detail-subtitle">${t.natal_sign} · ${t.natal_house}</div>
      ${orbBlock}
    </div>
    ${t.summary?`<div class="t-detail-pull" style="margin-top:18px">${t.summary}</div>`:''}
    ${kwHtml}
    <div class="t-detail-prose">${proseHtml}</div>
    ${passesHtml}
    <div style="height:32px"></div>`;
  const listEl=document.getElementById('t-list');
  const detailEl=document.getElementById('t-detail');
  listEl.style.transform='translateX(-28%)';
  listEl.style.opacity='0';
  listEl.style.pointerEvents='none';
  detailEl.style.transform='translateX(0)';
  detailEl.scrollTop=0;
}

function closeTransitDetail(){
  const listEl=document.getElementById('t-list');
  const detailEl=document.getElementById('t-detail');
  detailEl.style.transform='translateX(100%)';
  listEl.style.transform='translateX(0)';
  listEl.style.opacity='1';
  listEl.style.pointerEvents='';
}

function normPlanet(s){
  return s.toLowerCase()
    .replace(/northnode|north[\s-]?node/g,'nnode')
    .replace(/southnode|south[\s-]?node/g,'snode')
    .replace(/lot.{0,6}fortune/g,'fortune')
    .replace(/ascendant/g,'asc')
    .replace(/\s+/g,'');
}

async function openTransitFromPill(label,glyph){
  if(!transitsData){
    try{
      const r=await fetch('/transits.json?_='+Date.now());
      transitsData=await r.json();
      renderTransitList();
    }catch(e){return;}
  }
  openTransitLibrary();
  const natalM=label.match(/natal\s+(\S+)/i);
  if(!natalM)return;
  const natalNorm=normPlanet(natalM[1]);
  const idx=transitsData.current.findIndex(t=>t.glyph===glyph&&normPlanet(t.natal_point)===natalNorm);
  if(idx!==-1)setTimeout(()=>openTransitDetail(idx),80);
}

// ─── SYNASTRY ────────────────────────────────────────────────────────────────
function calcSynastryAspects(jPlanets,fPlanets){
  const DEFS=[
    {type:'conjunction',sym:'☌',angle:0,  orb:8,c:'#d0a840',              op:0.65},
    {type:'opposition', sym:'☍',angle:180,orb:8,c:'#c89898',              op:0.60},
    {type:'trine',      sym:'△',angle:120,orb:7,c:'#5ab8a8',              op:0.55},
    {type:'square',     sym:'□',angle:90, orb:7,c:'#c89898',              op:0.58},
    {type:'sextile',    sym:'✶',angle:60, orb:5,c:'#3e8fc0',              op:0.50},
    {type:'inconjunct', sym:'⚻',angle:150,orb:3,c:'rgba(240,228,200,0.55)',op:0.35},
  ];
  const results=[];
  for(const j of jPlanets){
    for(const f of fPlanets){
      let diff=Math.abs(j.deg-f.deg);
      if(diff>180)diff=360-diff;
      for(const a of DEFS){
        const orb=Math.abs(diff-a.angle);
        if(orb<=a.orb){results.push({j,f,type:a.type,sym:a.sym,orb,c:a.c,op:a.op});break;}
      }
    }
  }
  return results.sort((a,b)=>a.orb-b.orb);
}

function renderSynastryBiwheel(svgId){
  const bSvg=document.getElementById(svgId);
  if(!bSvg)return;
  while(bSvg.firstChild)bSvg.removeChild(bSvg.firstChild);
  const bCX=130,bCY=130,bASC=CHART.asc,bMC=CHART.mc;
  const bNorm=a=>((a%360)+360)%360;
  const bRad=d=>d*Math.PI/180;
  const bF=n=>n.toFixed(2);
  const bSvgA=ecl=>bNorm(180-(ecl-bASC));
  const bPt=(a,r)=>({x:bCX+r*Math.cos(bRad(a)),y:bCY+r*Math.sin(bRad(a))});
  const bEpt=(ecl,r)=>bPt(bSvgA(ecl),r);
  const bR={outer:122,trGlyph:116,trSep:110,zodOut:108,zodMid:98,zodIn:88,nSep:82,nGlyph:73,aspLine:78};
  const defs=el('defs',{});
  const cp=el('clipPath',{id:'synClip'});
  cp.appendChild(el('circle',{cx:bCX,cy:bCY,r:bR.outer}));
  defs.appendChild(cp);
  bSvg.appendChild(defs);
  const bgG=el('g',{'clip-path':'url(#synClip)','pointer-events':'none'});
  bgG.appendChild(el('circle',{cx:bCX,cy:bCY,r:bR.outer,fill:'#09102a'}));
  bgG.appendChild(el('ellipse',{cx:bCX+18,cy:bCY-28,rx:72,ry:38,fill:'rgba(180,110,30,0.07)',transform:`rotate(-35,${bCX},${bCY})`}));
  bgG.appendChild(el('ellipse',{cx:bCX-18,cy:bCY+28,rx:72,ry:42,fill:'rgba(30,100,160,0.08)',transform:`rotate(-35,${bCX},${bCY})`}));
  bSvg.appendChild(bgG);
  const elColors={fire:'rgba(210,130,48,0.25)',earth:'rgba(80,142,68,0.18)',air:'rgba(80,112,200,0.20)',water:'rgba(40,128,188,0.27)'};
  const elArcs={fire:'#c87840',earth:'#58925a',air:'#5878c8',water:'#3880b8'};
  const signEls=['fire','earth','air','water','fire','earth','air','water','fire','earth','air','water'];
  const zodG=el('g',{'pointer-events':'none'});
  for(let i=0;i<12;i++){
    const s=i*30,e=s+30;
    const a1=bSvgA(s),a2=bSvgA(e);
    const oo=bPt(a1,bR.zodOut),oe=bPt(a2,bR.zodOut),io=bPt(a1,bR.zodIn),ie=bPt(a2,bR.zodIn);
    const d=`M${bF(oo.x)} ${bF(oo.y)} A${bR.zodOut} ${bR.zodOut} 0 0 0 ${bF(oe.x)} ${bF(oe.y)} L${bF(ie.x)} ${bF(ie.y)} A${bR.zodIn} ${bR.zodIn} 0 0 1 ${bF(io.x)} ${bF(io.y)}Z`;
    zodG.appendChild(el('path',{d,fill:elColors[signEls[i]],stroke:'rgba(208,168,64,0.18)','stroke-width':'0.5'}));
    const aa1=bSvgA(s+1.5),aa2=bSvgA(e-1.5);
    const ap1=bPt(aa1,bR.zodOut-1.5),ap2=bPt(aa2,bR.zodOut-1.5);
    zodG.appendChild(el('path',{d:`M${bF(ap1.x)} ${bF(ap1.y)} A${bR.zodOut-1.5} ${bR.zodOut-1.5} 0 0 0 ${bF(ap2.x)} ${bF(ap2.y)}`,fill:'none',stroke:elArcs[signEls[i]],'stroke-width':'2.5',opacity:'0.50','stroke-linecap':'round'}));
    const gp=bEpt(s+15,bR.zodMid);
    zodG.appendChild(tx(SIGNS[i].gl,{x:bF(gp.x),y:bF(gp.y),fill:SIGNS[i].color,opacity:'0.80','font-size':'7.8','font-family':GLYPH_FONT,'font-variant-emoji':'text','text-anchor':'middle','dominant-baseline':'central'}));
  }
  zodG.appendChild(el('circle',{cx:bCX,cy:bCY,r:bR.zodOut,fill:'none',stroke:'rgba(208,168,64,0.45)','stroke-width':'0.6'}));
  zodG.appendChild(el('circle',{cx:bCX,cy:bCY,r:bR.zodIn, fill:'none',stroke:'rgba(208,168,64,0.30)','stroke-width':'0.5'}));
  zodG.appendChild(el('circle',{cx:bCX,cy:bCY,r:bR.outer, fill:'none',stroke:'rgba(208,168,64,0.32)','stroke-width':'0.6'}));
  for(let i=0;i<12;i++){const a=bSvgA(i*30);const op=bPt(a,bR.outer),zp=bPt(a,bR.zodOut+0.5);zodG.appendChild(el('line',{x1:bF(op.x),y1:bF(op.y),x2:bF(zp.x),y2:bF(zp.y),stroke:'rgba(208,168,64,0.45)','stroke-width':'0.5'}));}
  bSvg.appendChild(zodG);
  const nFill=el('g',{'pointer-events':'none'});
  nFill.appendChild(el('circle',{cx:bCX,cy:bCY,r:bR.zodIn,fill:'#09102a'}));
  nFill.appendChild(el('circle',{cx:bCX,cy:bCY,r:bR.zodIn,fill:'rgba(12,18,44,0.55)'}));
  nFill.appendChild(el('circle',{cx:bCX,cy:bCY,r:bR.nSep, fill:'none',stroke:'rgba(208,168,64,0.38)','stroke-width':'0.6'}));
  bSvg.appendChild(nFill);
  const aspects=calcSynastryAspects(JORDAN_CHART.planets,CHART.planets);
  const AMBIENT=0.22;
  const aspG=el('g',{'pointer-events':'none'});
  for(const a of aspects.slice(0,16)){
    const jpt=bEpt(a.j.deg,bR.aspLine),fpt=bEpt(a.f.deg,bR.aspLine);
    const sw=a.orb<1?'1.1':a.orb<3?'0.85':'0.65';
    const op=a.orb<0.5?'0.50':a.orb<2?'0.32':String(AMBIENT);
    aspG.appendChild(el('line',{x1:bF(jpt.x),y1:bF(jpt.y),x2:bF(fpt.x),y2:bF(fpt.y),stroke:a.c,'stroke-width':sw,opacity:op}));
  }
  bSvg.appendChild(aspG);
  const nColors={luminary:'#d8b850',personal:'#c8a0a0',social:'#7ab0d0',outer:'#5ab8a8',point:'rgba(240,228,200,0.72)'};
  const nSpread=spread(CHART.planets.map(p=>({...p,disp:p.deg})));
  const nPG=el('g',{'pointer-events':'none'});
  for(const p of nSpread){
    const tick=bEpt(p.deg,bR.nSep-1);
    nPG.appendChild(el('circle',{cx:bF(tick.x),cy:bF(tick.y),r:'1.1',fill:nColors[p.grp]||'#d8b850',opacity:'0.60'}));
    const gp=bEpt(p.disp,bR.nGlyph);
    nPG.appendChild(tx(p.gl,{x:bF(gp.x),y:bF(gp.y),fill:nColors[p.grp]||'#d8b850',opacity:'0.92','font-size':'8','font-family':GLYPH_FONT,'font-variant-emoji':'text','text-anchor':'middle','dominant-baseline':'central'}));
  }
  bSvg.appendChild(nPG);
  const JC='rgba(180,140,255,0.90)',JCR='rgba(140,180,255,0.82)';
  const jSpread=spread(JORDAN_CHART.planets.map(p=>({...p,disp:p.deg})));
  const jPG=el('g',{'pointer-events':'none'});
  for(const jp of jSpread){
    const tick=bEpt(jp.deg,bR.zodOut+4);
    jPG.appendChild(el('circle',{cx:bF(tick.x),cy:bF(tick.y),r:'1.4',fill:jp.retro?JCR:JC,opacity:'0.65'}));
    const gp=bEpt(jp.disp,bR.trGlyph);
    jPG.appendChild(tx(jp.gl,{x:bF(gp.x),y:bF(gp.y),fill:jp.retro?JCR:JC,opacity:'0.90','font-size':'8','font-family':GLYPH_FONT,'font-variant-emoji':'text','text-anchor':'middle','dominant-baseline':'central'}));
  }
  bSvg.appendChild(jPG);
  const axG=el('g',{'pointer-events':'none'});
  for(const [ecl,lbl] of [[bASC,'ASC'],[bNorm(bASC+180),'DSC'],[bMC,'MC'],[bNorm(bMC+180),'IC']]){
    const o=bEpt(ecl,bR.nSep+1),i=bEpt(ecl,bR.aspLine-6);
    axG.appendChild(el('line',{x1:bF(o.x),y1:bF(o.y),x2:bF(i.x),y2:bF(i.y),stroke:'rgba(208,168,64,0.55)','stroke-width':'0.7'}));
    const lp=bEpt(ecl,bR.nSep+6);
    axG.appendChild(tx(lbl,{x:bF(lp.x),y:bF(lp.y),fill:'rgba(208,168,64,0.75)','font-size':'4.2','font-family':"'Inter',sans-serif",'font-weight':'600','letter-spacing':'0.2','text-anchor':'middle','dominant-baseline':'central'}));
  }
  bSvg.appendChild(axG);
  const cg=el('g',{'pointer-events':'none'});
  cg.appendChild(el('circle',{cx:bCX,cy:bCY,r:'16',fill:'#09102a',stroke:'rgba(208,168,64,0.22)','stroke-width':'0.5'}));
  cg.appendChild(el('circle',{cx:bCX,cy:bCY,r:'4.5',fill:'rgba(208,168,64,0.32)'}));
  cg.appendChild(el('circle',{cx:bCX,cy:bCY,r:'2',fill:'rgba(240,228,200,0.78)'}));
  bSvg.appendChild(cg);
}

function renderSynastryPanel(){
  const aspects=calcSynastryAspects(JORDAN_CHART.planets,CHART.planets);
  const nColors={luminary:'#d8b850',personal:'#c8a0a0',social:'#7ab0d0',outer:'#5ab8a8',point:'rgba(240,228,200,0.72)'};
  const rows=aspects.slice(0,12).map(a=>{
    const orbStr=a.orb<0.1?`${(a.orb*60).toFixed(0)}'`:`${a.orb.toFixed(2)}°`;
    const fColor=nColors[a.f.grp]||'rgba(240,228,200,0.70)';
    return `<div class="syn-row"><span class="syn-glyph" style="color:rgba(180,140,255,0.90)">${a.j.gl}</span><span class="syn-sym" style="color:${a.c}">${a.sym}</span><span class="syn-glyph" style="color:${fColor}">${a.f.gl}</span><span class="syn-label">${a.type}</span><span class="syn-orb">${orbStr}</span></div>`;
  }).join('');
  const readingSrc=document.getElementById('synastry-reading-src');
  const readingHtml=readingSrc?readingSrc.innerHTML:'';
  document.getElementById('daily-body').innerHTML=`
    <div style="padding-top:24px">
      <div class="d-header">
        <div class="d-eyebrow">Synastry</div>
        <div class="d-title">You &amp; Jordan</div>
        <div class="d-moon-strip">
          <span style="letter-spacing:0.08em;font-size:0.62rem;opacity:0.52">natal charts · exact contacts</span>
        </div>
      </div>
      <div class="t-biwheel-wrap" style="margin-bottom:24px">
        <svg viewBox="0 0 260 260" xmlns="http://www.w3.org/2000/svg" id="s-biwheel-svg"></svg>
        <div class="t-biwheel-label">your chart · jordan's chart</div>
      </div>
      <div class="synastry-contacts">
        <div class="syn-section-label">Contacts by orb</div>
        ${rows}
      </div>
      ${readingHtml?`<div class="syn-reading">${readingHtml}</div>`:''}
      <div style="height:32px"></div>
    </div>`;
  renderSynastryBiwheel('s-biwheel-svg');
}

// ─── DAILY DATA FUNCTIONS ─────────────────────────────────────────────────────
function updateHomeFromDaily(d,omitTitle=false){
  const moonEl=document.getElementById('home-moon');
  if(moonEl&&(d.moon_phase||d.moon_sign))moonEl.textContent=[d.moon_phase,d.moon_sign].filter(Boolean).join(' · ');
  if(!omitTitle){
    const titleEl=document.getElementById('home-daily-title');
    if(titleEl&&d.title)titleEl.textContent=d.title;
    const transitEl=document.getElementById('home-daily-transit');
    if(transitEl&&d.key_transit){transitEl.textContent=d.key_transit;transitEl.style.display='';}
  }
}

function showDailySkeleton(){
  document.getElementById('daily-body').innerHTML=`
    <div style="padding-top:24px">
      <div class="skel skel-line" style="width:40%;margin-bottom:8px"></div>
      <div class="skel skel-line" style="width:65%;margin-bottom:24px"></div>
      <div class="skel skel-block" style="border-radius:12px"></div>
      <div class="skel skel-line" style="width:90%"></div>
      <div class="skel skel-line" style="width:80%"></div>
      <div class="skel skel-line" style="width:85%"></div>
      <div class="skel skel-line" style="width:60%;margin-bottom:24px"></div>
      <div style="display:flex;gap:6px;flex-wrap:wrap">
        <div class="skel skel-pill"></div>
        <div class="skel skel-pill"></div>
        <div class="skel skel-pill"></div>
      </div>
    </div>`;
}

async function loadDaily(){
  if(typeof IS_FRIEND_BUILD!=='undefined'&&IS_FRIEND_BUILD){renderSynastryPanel();return;}
  if(dailyData){
    if(!dailyData.transiting_positions)await fetchPositions();
    renderDaily();
    return;
  }
  showDailySkeleton();
  try{
    const r=await fetch('/today.json?_='+Date.now());
    dailyData=await r.json();
    updateHomeFromDaily(dailyData);
    await fetchPositions();
    renderBiwheel();
    renderDaily();
  }catch(e){
    document.getElementById('daily-body').innerHTML='<div style="opacity:0.30;text-align:center;padding:40px 0;font-size:0.75rem">Could not load today\'s reading.</div>';
  }
}

function renderDaily(){
  if(!dailyData)return;
  const d=dailyData;
  const months=['January','February','March','April','May','June','July','August','September','October','November','December'];
  const dateObj=new Date(d.date+'T12:00:00');
  const dateLabel=`${months[dateObj.getMonth()]} ${dateObj.getDate()}, ${dateObj.getFullYear()}`;
  const slowGlyphs=new Set(['♃','♄','♅','♆','♇','⚷','☊','☋']);
  const allT=d.active_transits||[];
  const slowT=allT.filter(t=>slowGlyphs.has(t.glyph)).sort((a,b)=>parseFloat(a.orb)-parseFloat(b.orb));
  const fastT=allT.filter(t=>!slowGlyphs.has(t.glyph));
  const slowVisible=slowT.slice(0,5);
  const slowHidden=slowT.slice(5);
  const slowPillsHtml=slowVisible.map(t=>`
    <span class="d-t-pill d-t-pill-season${t.direction==='applying'?' d-t-applying':''}" role="button" data-transit-label="${(t.label||'').replace(/"/g,'&quot;')}" data-transit-glyph="${(t.glyph||'').replace(/"/g,'&quot;')}">
      <span class="d-t-pill-glyph">${t.glyph}</span>
      <span class="d-t-pill-text">${t.label} · ${t.orb}</span>
    </span>`).join('');
  const moreHtml=slowHidden.length>0?`<button class="d-pills-more" onclick="openTransitLibrary()">+${slowHidden.length} more · Transit Library →</button>`:'';
  const fastPillsHtml=fastT.map(t=>{
    const short=t.label.replace(/\s*natal\s*/i,' ').replace(/\s*\([^)]*\)/g,'').trim();
    return `<span class="d-t-pill-mini"><span class="d-t-pill-glyph">${t.glyph}</span><span>${short}</span></span>`;
  }).join('');
  const seasonHtml=slowPillsHtml||moreHtml?`
    <div class="d-pills-section">
      <div class="d-pills-section-label">The Season</div>
      <div class="d-transit-pills">${slowPillsHtml}${moreHtml}</div>
    </div>`:'';
  const weatherHtml=fastPillsHtml?`
    <div class="d-pills-section">
      <div class="d-pills-section-label">Passing Weather</div>
      <div class="d-transit-pills">${fastPillsHtml}</div>
    </div>`:'';
  const proseParas=d.prose||[];
  const proseFirst=proseParas.length>0?`<p>${proseParas[0]}</p>`:'';
  const proseRest=proseParas.length>1?proseParas.slice(1).map(p=>`<p>${p}</p>`).join(''):'';
  const proseHtml=proseFirst+(proseRest?`<div class="d-prose-fold" id="d-prose-fold">${proseRest}</div><button class="d-pull-thread" onclick="expandProse(this)">Pull the thread <span class="d-pull-arrow">→</span></button>`:'');
  const todayWork=d.today&&d.today.business;
  const todayBody=d.today&&d.today.body;
  const todayConn=d.today&&(d.today.connection||d.today.creative);
  const todayHtml=(todayWork||todayBody||todayConn)?`
    <div class="d-today">
      <div class="d-today-label">Today</div>
      <div class="d-today-grid">
        ${todayWork?`<div class="d-today-card"><div class="d-today-cat">Work</div><div class="d-today-text">${todayWork}</div></div>`:''}
        ${todayBody?`<div class="d-today-card"><div class="d-today-cat">Body</div><div class="d-today-text">${todayBody}</div></div>`:''}
        ${todayConn?`<div class="d-today-card"><div class="d-today-cat">Connection</div><div class="d-today-text">${todayConn}</div></div>`:''}
      </div>
    </div>`:'';
  document.getElementById('daily-body').innerHTML=`
    <div style="padding-top:24px">
      <div class="d-header">
        <div class="d-eyebrow">${dateLabel}</div>
        <div class="d-title">${d.title||'Daily Reading'}</div>
        ${d.moon_phase||d.moon_sign?`<div class="d-moon-strip">
          <span class="d-moon-glyph"><svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg></span>
          <span class="d-moon-text">${[d.moon_phase,d.moon_sign].filter(Boolean).join(' · ')}</span>
        </div>`:''}
      </div>
      <div class="t-biwheel-wrap" style="margin-bottom:24px">
        <svg viewBox="0 0 260 260" xmlns="http://www.w3.org/2000/svg" id="d-biwheel-svg"></svg>
        <div class="t-biwheel-label">natal · live sky</div>
      </div>
      ${todayHtml}
      ${d.pulse?`<div class="d-pulse">${d.pulse}</div>`:''}
      ${d.key_transit?`<div class="d-key-transit">
        <span class="d-key-transit-name">${d.key_transit}</span>
        <span class="d-key-transit-note">${d.key_transit_note||''}</span>
      </div>`:''}
      <div class="d-prose">${proseHtml}</div>
      ${d.pull?`<div class="d-pull">${d.pull}</div>`:''}
      ${seasonHtml||weatherHtml?`<div class="d-pills-container">${seasonHtml}${weatherHtml}</div>`:''}
      <div style="height:32px"></div>
    </div>`;
  renderBiwheel('d-biwheel-svg',false);
  document.querySelectorAll('.d-t-pill[data-transit-label]').forEach(p=>{
    p.addEventListener('click',()=>openTransitFromPill(p.dataset.transitLabel,p.dataset.transitGlyph));
  });
}
function expandProse(btn){
  const fold=document.getElementById('d-prose-fold');
  if(fold){fold.classList.add('open');}
  btn.style.display='none';
}
