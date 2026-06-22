
import { useEffect, useRef } from "react";
import logo from "../asset/logo.webp";
import ecommerceImg from "../asset/Trendora.jpeg";
import aiChatbotImg from "../asset/AI.jpeg";
import InventoryImg from "../asset/inventory.jpeg";
import crmImg from "../asset/CRM_HRM.png";
import hospitalImg from "../asset/healthcare.jpeg";
import sgfood from "../asset/sgfoods.jpeg";
import { useNavigate } from "react-router-dom";


const PROJECTS=[
{
 img:ecommerceImg,
 title:"E-Commerce",
 text:"Web Platform"
},
{
 img:aiChatbotImg,
 title:"AI Solution",
 text:"Automation"
},
{
 img:crmImg,
 title:"CRM + HRM System",
 text:"Enterprise"
},
{
 img:hospitalImg,
 title:"Healthcare",
 text:"Technology"
},
{
 img:InventoryImg,
 title:"Inventory Management",
 text:"Infrastructure"
},
{
 img:sgfood,
 title:"SG Foods",
 text:"Restaurant Management"
}
];



function NeuralBG(){

const ref=useRef();
 

useEffect(()=>{

const canvas=ref.current;
const ctx=canvas.getContext("2d");

canvas.width=canvas.offsetWidth;
canvas.height=canvas.offsetHeight;


let nodes=Array.from({length:45},()=>({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
vx:(Math.random()-.5)*.5,
vy:(Math.random()-.5)*.5
}));


function draw(){

ctx.clearRect(0,0,canvas.width,canvas.height);


nodes.forEach((n,i)=>{


n.x+=n.vx;
n.y+=n.vy;


if(n.x<0||n.x>canvas.width)n.vx*=-1;
if(n.y<0||n.y>canvas.height)n.vy*=-1;



ctx.beginPath();
ctx.arc(n.x,n.y,2,0,Math.PI*2);
ctx.fillStyle="rgba(0,170,255,.8)";
ctx.fill();



nodes.slice(i+1).forEach(m=>{

let d=Math.hypot(n.x-m.x,n.y-m.y);

if(d<120){

ctx.beginPath();
ctx.moveTo(n.x,n.y);
ctx.lineTo(m.x,m.y);
ctx.strokeStyle="rgba(0,150,255,.18)";
ctx.stroke();

}

})


})


requestAnimationFrame(draw);

}

draw();


},[])


return(
<canvas
ref={ref}
className="neural"
/>
)

}





export default function DetagenixHero({ setIsOpenForm }){

const navigate = useNavigate();
return(

<div className="hero">



<style>{`

.hero{

height:650px;
position:relative;
overflow:hidden;

display:flex;
align-items:center;

background:
radial-gradient(circle at 75% 40%,#063f7a,#020b1b 55%);

font-family:Inter,sans-serif;

color:white;

}



.neural{

position:absolute;
inset:0;
width:100%;
height:100%;
}



.hero-grid{

position:absolute;
inset:0;

background-image:
linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),
linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px);

background-size:45px 45px;

}



.left{

width:45%;
padding-left:60px;
z-index:2;

}

.service-tags{
  margin-top:25px;
  color:#8ddcff;
  font-size:15px;
  font-weight:500;
  line-height:1.8;
  max-width:550px;
}
.left h1{

 font-size:46px;
  line-height:1.15;
  font-weight:900;
}



.blue{

color:#00aaff;

}



.left p{

width:430px;
color:#b7c7dc;
line-height:1.8;

}



.btns{

display:flex;
gap:20px;
margin-top:30px;

}



button{

padding:15px 35px;
border-radius:12px;
border:none;
font-weight:700;
cursor:pointer;

}



.primary{

background:#0666ff;
color:white;

box-shadow:
0 0 30px #0666ff;

}


.secondary{

background:#071426;
color:white;
border:1px solid #1557a8;

}





.right{

position:relative;
width:55%;
height:100%;

display:flex;
align-items:center;
justify-content:center;

z-index:2;

}



/* RIGHT ORBIT */

.orbit-area{
position:relative;
width:500px;
height:500px;
display:flex;
align-items:center;
justify-content:center;
}


.logo-core{

position:absolute;

width:150px;
height:150px;

border-radius:50%;

background:
radial-gradient(circle,#073a75,#020b1b);

display:flex;
align-items:center;
justify-content:center;


box-shadow:
0 0 30px #00aaff,
0 0 90px rgba(0,170,255,.5);


z-index:5;

animation:pulse 3s infinite;

}


.logo-core img{
width:90px;
}



/* rotating container */

.orbit{

position:absolute;

width:100%;
height:100%;

animation:
 clockMove 40s linear infinite;

}



.orbit-card{


position:absolute;


 width:220px;
  height:140px;


border-radius:18px;

overflow:hidden;


background:#061426;


border:
1px solid rgba(0,170,255,.35);


box-shadow:

0 20px 40px rgba(0,120,255,.4);


transition:.3s;


}



.orbit-card:hover{

scale:1.15;

box-shadow:
0 0 20px #00aaff;

}



.orbit-card img{

width:100%;
height:100%;

object-fit:cover;

}




.card-title{

position:absolute;

bottom:0;

left:0;

width:100%;


padding:10px;


background:
linear-gradient(
transparent,
#020617
);


font-size:14px;

}




@keyframes clockMove{


from{

transform:rotate(0deg);

}


to{

transform:rotate(360deg);

}


}




/* counter rotate cards so images stay straight */

.orbit-card-inner{

width:100%;
height:100%;

animation:
 counterMove 40s linear infinite;

}



@keyframes counterMove{


from{

transform:rotate(0deg);

}


to{

transform:rotate(-360deg);

}


}



@keyframes pulse{


50%{

scale:1.08;

}

}


.slide-card img{


width:100%;
height:100%;


object-fit:cover;


}





.project-info{


position:absolute;

bottom:0;

left:0;

width:100%;


padding:20px;


background:
linear-gradient(
transparent,
#020617
);


}



.project-info h3{

margin:0;

font-size:22px;

}



.project-info p{

color:#8ddcff;

}





.slide-card:nth-child(2){

animation-delay:4s;

}



.slide-card:nth-child(3){

animation-delay:8s;

}





@keyframes projectSlide{


0%{

transform:
translateX(120px) scale(.9);

opacity:0;

}


15%,70%{


transform:
translateX(0) scale(1);


opacity:1;


}



100%{


transform:
translateX(-140px) scale(.9);


opacity:0;


}


}





@keyframes floatCode{


50%{

transform:translateY(-18px);

}

}


.logo-core{


position:absolute;

width:150px;
height:150px;

border-radius:50%;

background:
radial-gradient(circle,#073a75,#020b1b);


display:flex;
align-items:center;
justify-content:center;


box-shadow:

0 0 30px #00aaff,
0 0 100px rgba(0,170,255,.5);


animation:pulse 3s infinite;

}



.logo-core img{

width:90px;

}







@media (max-width: 1024px) {

  .hero{
    flex-direction: column;
    height: auto;
    padding: 80px 20px;
    text-align: center;
  }

  .left{
    width: 100%;
    padding-left: 0;
  }

  .left h1{
    font-size: 42px;
  }

  .left p{
    width: 100%;
    max-width: 700px;
    margin: 0 auto;
  }

  .btns{
    justify-content: center;
    flex-wrap: wrap;
  }

  .right{
    width: 100%;
    height: 550px;
    margin-top: 50px;
  }

  .orbit-area{
    width: 420px;
    height: 420px;
  }

  .orbit-card{
    width:180px;
    height:120px;
  }
}


@media (max-width: 768px) {

  .hero{
    padding: 60px 15px;
  }
   .service-tags{
    font-size:13px;
    text-align:center;
    max-width:100%;
  }
  .left h1{
    font-size: 32px;
  }

  .left p{
    font-size: 14px;
    line-height: 1.7;
  }

  .btns{
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }

  .btns button{
    width: 100%;
    max-width: 280px;
  }

  .right{
    height: 350px;
    overflow: hidden;
  }

  .orbit-area{
    width: 300px;
    height: 300px;
     transform: scale(0.7);
  }

  .logo-core{
    width: 100px;
    height: 100px;
  }

  .logo-core img{
    width: 60px;
  }

  .orbit-card{
      width:140px;
    height:90px;
  }

  .card-title{
    font-size: 10px;
    padding: 6px;
  }
}


@media (max-width: 480px) {

  .hero{
    padding: 40px 12px;
  }

  .left h1{
    font-size: 26px;
    line-height: 1.3;
  }

  .left p{
    font-size: 13px;
  }

  .right{
     height: 280px;
  }

  .orbit-area{
    width: 240px;
    height: 240px;
    transform: scale(0.55);
  }

  .logo-core{
    width: 80px;
    height: 80px;
  }

  .logo-core img{
    width: 45px;
  }

  .orbit-card{
    width:110px;
    height:70px;
  }

  .card-title{
    font-size: 8px;
    padding: 4px;
  }
}

`}</style>




<NeuralBG/>

<div className="hero-grid"/>



<div className="left">


<h1>

Digitize, Automate & Scale Your 

<br/>

Business With <span className="blue">
Technology
</span>

</h1>


<p>

We help startups, SMEs, and enterprises streamline operations, automate workflows, strengthen their digital presence, 
and generate measurable business growth through custom software, 
AI solutions, and modern web platforms.

</p>


<div className="btns">

<button
  className="secondary"
  onClick={() => setIsOpenForm(true)}
>
  Book Free Consultation
</button>


<button
  className="primary"
  onClick={() => navigate("/about")}
>
  View Our Work
</button>

</div>
<div className="service-tags">
  Website Development | CRM & ERP Solutions | AI Integration |
  Business Automation | SEO & Digital Growth
</div>


</div>





<div className="right">


<div className="orbit-area">


<div className="orbit">


{
PROJECTS.map((p,i)=>{


const angle =
(i / PROJECTS.length) * 360;


const radius=180;


const x =
Math.sin(angle*Math.PI/180)*radius;


const y =
-Math.cos(angle*Math.PI/180)*radius;



return(

<div
key={i}
className="orbit-card"
style={{
left:"50%",
top:"50%",
transform:`
translate(-50%,-50%)
translate(${x}px,${y}px)
`
}}
>


<div className="orbit-card-inner">


<img
src={p.img}
/>


<div className="card-title">

{p.title}

</div>


</div>


</div>


)


})

}



</div>



<div className="logo-core">

<img src={logo}/>

</div>



</div>


</div>




</div>

)

}
