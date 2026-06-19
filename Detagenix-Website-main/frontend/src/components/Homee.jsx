import { useEffect, useRef } from "react";
import logo from "../asset/logo.webp"

const N = 10;
const R = 170;

const CARDS = [
  { w:168,h:110,title:"Analytics Dashboard",type:"bars" },
  { w:155,h:105,title:"Solar Energy Dash",type:"line" },
  { w:162,h:108,title:"Logistics Platform",type:"stats" },
  { w:158,h:106,title:"Construction ERP",type:"bars" },
  { w:165,h:110,title:"E-Commerce Platform",type:"ecom" },
  { w:160,h:108,title:"Healthcare AI",type:"line" },
  { w:163,h:106,title:"Manufacturing Sys",type:"bars" },
  { w:155,h:105,title:"Cloud Management",type:"stats" },
  { w:162,h:108,title:"CRM Interface",type:"ecom" },
  { w:158,h:106,title:"AI Platform",type:"line" },
];

function makeSVG({ w, h, title, type }) {
  const bg = "#071B34", acc = "#1a56db";
  const bar = (y, pw, c, lbl) =>
    `<text x="10" y="${y}" font-size="6" fill="#4a7ab5" font-family="Inter,sans-serif">${lbl}</text>
     <rect x="10" y="${y+2}" width="${w-20}" height="5" rx="2" fill="#0a2040"/>
     <rect x="10" y="${y+2}" width="${pw}" height="5" rx="2" fill="${c}"/>`;

  let body = "";
  if (type === "bars") {
    body = bar(48, Math.round((w-20)*.75), "#2563eb", "Revenue")
      + bar(60, Math.round((w-20)*.55), "#22c55e", "Growth")
      + bar(72, Math.round((w-20)*.42), "#f59e0b", "Costs")
      + `<text x="10" y="90" font-size="12" font-weight="800" fill="#fff" font-family="Inter,sans-serif">94.2%</text>
         <text x="65" y="90" font-size="12" font-weight="800" fill="#22c55e" font-family="Inter,sans-serif">+28%</text>`;
  } else if (type === "line") {
    body = `<polyline points="10,82 26,70 42,76 58,58 74,63 90,50 106,56 122,43 138,48 154,35" fill="none" stroke="#2563eb" stroke-width="2.5" stroke-linecap="round"/>
            <polyline points="10,88 26,78 42,83 58,68 74,72 90,60 106,65 122,54 138,58 154,46" fill="none" stroke="#22c55e" stroke-width="1.5" opacity=".6" stroke-linecap="round"/>
            <text x="10" y="100" font-size="12" font-weight="800" fill="#fff" font-family="Inter,sans-serif">1.24 GW</text>
            <text x="80" y="100" font-size="12" font-weight="800" fill="#22c55e" font-family="Inter,sans-serif">+32%</text>`;
  } else if (type === "stats") {
    const cols = [["$2.4M","Revenue"],["1.2k","Users"],["99%","Uptime"]];
    body = cols.map(([v,l], i) =>
      `<rect x="${10+i*48}" y="46" width="42" height="34" rx="5" fill="#0a2040"/>
       <text x="${10+i*48+6}" y="58" font-size="6" fill="#4a7ab5" font-family="Inter,sans-serif">${l}</text>
       <text x="${10+i*48+4}" y="72" font-size="10" font-weight="800" fill="#fff" font-family="Inter,sans-serif">${v}</text>`
    ).join("") + bar(88, Math.round((w-20)*.7), "#2563eb", "Performance");
  } else {
    body = `<rect x="10" y="44" width="44" height="30" rx="5" fill="#0a2040"/>
            <text x="14" y="56" font-size="6" fill="#4a7ab5" font-family="Inter,sans-serif">Orders</text>
            <text x="14" y="68" font-size="11" font-weight="800" fill="#22c55e" font-family="Inter,sans-serif">2.1k</text>
            <rect x="60" y="44" width="44" height="30" rx="5" fill="#0a2040"/>
            <text x="64" y="56" font-size="6" fill="#4a7ab5" font-family="Inter,sans-serif">Revenue</text>
            <text x="64" y="68" font-size="10" font-weight="800" fill="#fff" font-family="Inter,sans-serif">$94k</text>
            <rect x="110" y="44" width="40" height="30" rx="5" fill="#0a2040"/>
            <text x="114" y="56" font-size="6" fill="#4a7ab5" font-family="Inter,sans-serif">Conv.</text>
            <text x="114" y="68" font-size="11" font-weight="800" fill="#2563eb" font-family="Inter,sans-serif">68%</text>`
      + bar(82, Math.round((w-20)*.68), "#2563eb", "Conversion Rate");
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <rect width="${w}" height="${h}" rx="12" fill="${bg}"/>
    <rect x="0" y="0" width="${w}" height="26" rx="0" fill="${bg}"/>
    <rect x="0" y="14" width="${w}" height="12" fill="${bg}"/>
    <circle cx="11" cy="13" r="4" fill="${acc}"/>
    <text x="20" y="17" font-size="8" font-weight="700" fill="#7ab3f0" font-family="Inter,sans-serif">${title}</text>
    <line x1="0" y1="26" x2="${w}" y2="26" stroke="${acc}" stroke-width=".5" opacity=".4"/>
    ${body}
    <rect width="${w}" height="${h}" rx="12" fill="none" stroke="${acc}" stroke-width="1" opacity=".35"/>
  </svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

function Particles() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current;
    const ctx = c.getContext("2d");
    c.width = c.offsetWidth; c.height = c.offsetHeight;
    const pts = Array.from({ length: 35 }, () => ({
      x: Math.random()*c.width, y: Math.random()*c.height,
      vx: (Math.random()-.5)*.28, vy: (Math.random()-.5)*.28,
      r: Math.random()*1.4+.4,
    }));
    let id;
    const draw = () => {
      ctx.clearRect(0,0,c.width,c.height);
      pts.forEach(p => {
        p.x+=p.vx; p.y+=p.vy;
        if(p.x<0||p.x>c.width)p.vx*=-1;
        if(p.y<0||p.y>c.height)p.vy*=-1;
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle="rgba(80,140,255,.5)"; ctx.fill();
      });
      id = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(id);
  }, []);
  return <canvas ref={ref} style={{ position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:0 }} />;
}

export default function DetagenixHero() {
  return (
    <div style={{ position:"relative",display:"flex",alignItems:"center",minHeight:500,background:"linear-gradient(135deg,#06233f,#004e7a,#00bfff)",overflow:"hidden",fontFamily:"Inter,sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;800;900&display=swap');
        @keyframes orbitSpin { from{transform:perspective(600px) rotateY(0deg) rotateX(18deg)} to{transform:perspective(600px) rotateY(360deg) rotateX(18deg)} }
        .orbit { position:absolute;inset:0;animation:orbitSpin 12s linear infinite; }
        .b1:hover,.b2:hover { transform:translateY(-2px)!important; }
      `}</style>

      <Particles />

      {/* Grid */}
      <div style={{ position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(100,140,200,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(100,140,200,0.05) 1px,transparent 1px)",backgroundSize:"44px 44px",zIndex:0,pointerEvents:"none" }} />

      {/* Watermark */}
     <div 
style={{ 
position:"absolute",
top:"70%",
left:"55%",
transform:"translate(-50%,-50%)",
fontSize:115,
fontWeight:900,
color:"rgba(255,255,255,0.035)",
letterSpacing:10,
whiteSpace:"nowrap",
pointerEvents:"none",
userSelect:"none",
filter:"blur(1px)",
zIndex:0
}}>
DETAGENIX
</div>

      {/* LEFT */}
      <div style={{ position:"relative",zIndex:2,width:"42%",padding:"48px 0 48px 44px",flexShrink:0 }}>
        <h1 style={{ fontSize:42,
fontWeight:900,
color:"#ffffff",lineHeight:1.15,marginBottom:16,letterSpacing:-1.5 }}>
          Transforming Industries<br/>Through Technology
        </h1>
        <p style={{ fontSize:15,
color:"rgba(255,255,255,0.75)",lineHeight:1.85,marginBottom:32,maxWidth:370 }}>
          Delivering AI, Cloud, Digital Transformation, Enterprise Software, Healthcare Technology, Manufacturing Solutions, Logistics Platforms, and Business Automation.
        </p>
        <div style={{ display:"flex",gap:14 }}>
          <button className="b1" style={{ padding:"15px 32px",background:"#09111f",color:"#fff",border:"none",borderRadius:10,fontSize:15,fontWeight:700,cursor:"pointer",boxShadow:"0 4px 20px rgba(9,17,31,.25)",transition:"all .2s" }}>Get Started</button>
          <button className="b2" style={{ padding:"15px 32px",background:"linear-gradient(135deg,#0052ff,#1a82ff)",color:"#fff",border:"none",borderRadius:10,fontSize:15,fontWeight:700,cursor:"pointer",boxShadow:"0 4px 20px rgba(0,82,255,.35)",transition:"all .2s" }}>Explore Services</button>
        </div>
      </div>

      {/* RIGHT — Circular Orbit */}
      <div style={{ position:"relative",zIndex:2,flex:1,display:"flex",alignItems:"center",justifyContent:"center",height:500 }}>
        <div style={{ position:"relative",width:420,height:420 }}>
          <div className="orbit">
            <div
    style={{
      position:"absolute",
      top:"50%",
      left:"50%",
      width:110,
      height:110,
      transform:"translate(-50%,-50%)",
      borderRadius:"50%",
      background:"rgba(7,27,52,0.9)",
      display:"flex",
      alignItems:"center",
      justifyContent:"center",
      boxShadow:"0 0 35px rgba(37,99,235,.7)",
      border:"1px solid rgba(37,99,235,.5)",
      zIndex:5,
    }}
  >
    <img
      src={logo}
      alt="Detagenix"
      style={{
        width:"75px",
        height:"75px",
        objectFit:"contain",
      }}
    />
  </div>
            {CARDS.map((card, i) => {
              const angle = (i / N) * Math.PI * 2;
              const x = Math.sin(angle) * R;
              const y = -Math.cos(angle) * R;
              return (
                <div key={i} style={{
                  position:"absolute",top:"50%",left:"50%",
                  width:card.w,height:card.h,borderRadius:12,overflow:"hidden",
                  transform:`translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  boxShadow:"0 6px 28px rgba(0,50,180,.32),0 0 14px rgba(30,100,255,.18)",
                }}>
                  <img src={makeSVG(card)} style={{ width:"100%",height:"100%",display:"block" }} alt={card.title} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}