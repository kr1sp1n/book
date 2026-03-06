// --- Styles ---
const style = document.createElement("style");
style.innerHTML=`
#bmLauncher {position:fixed;top:50px;left:50px;width:300px;background:#222;color:white;border-radius:10px;z-index:999999;font-family:sans-serif;box-shadow:0 0 20px rgba(0,0,0,0.5);}
#bmLauncherHeader {cursor:move;background:#333;padding:8px;border-radius:10px 10px 0 0;display:flex;justify-content:space-between;align-items:center;}
#bmLauncherHeader button {background:#444;border:none;color:white;padding:2px 6px;border-radius:4px;cursor:pointer;}
#bmLauncherSearch {width:calc(100% - 16px);margin:8px;padding:4px;border-radius:4px;border:none;}
#bmLauncherApps {max-height:400px;overflow-y:auto;padding:8px;}
#bmLauncherApps button {width:100%;margin-bottom:6px;padding:6px;background:#555;border:none;color:white;border-radius:4px;cursor:pointer;text-align:left;}
#bmLauncherApps button:hover{background:#666;}
`;
document.head.appendChild(style);

// --- Launcher UI ---
const launcher = document.createElement("div");
launcher.id="bmLauncher";
launcher.innerHTML=`
<div id="bmLauncherHeader">
  <b>Bookmarklet Launcher</b>
  <button id="bmClose">✕</button>
</div>
<input type="text" id="bmLauncherSearch" placeholder="Search apps...">
<div id="bmLauncherApps"></div>
`;
document.body.appendChild(launcher);

// --- Close Button ---
document.getElementById("bmClose").onclick = ()=>launcher.remove();

// --- Dragging ---
let isDragging = false, offsetX, offsetY;
const header = document.getElementById("bmLauncherHeader");
header.onmousedown = function(e){
  isDragging=true; offsetX=e.clientX - launcher.offsetLeft; offsetY=e.clientY - launcher.offsetTop;
};
document.onmouseup = ()=>isDragging=false;
document.onmousemove = function(e){
  if(isDragging){launcher.style.left=(e.clientX - offsetX)+"px";launcher.style.top=(e.clientY - offsetY)+"px";}
};

// --- Apps ---
const apps = [
  {name:"Page Title", action:()=>alert(document.title)},
  {name:"Edit Page", action:()=>document.body.contentEditable=true},
  {name:"List Images", action:()=>alert([...document.images].map(i=>i.src).join("\\n"))},
  {name:"Dark Mode", action:()=>document.documentElement.style.filter="invert(1) hue-rotate(180deg)"},
  {name:"Highlight Links", action:()=>[...document.links].forEach(a=>a.style.background="yellow")}
];

// --- Render Apps ---
const appsContainer = document.getElementById("bmLauncherApps");
function renderApps(filter=""){
  appsContainer.innerHTML="";
  apps.filter(a=>a.name.toLowerCase().includes(filter.toLowerCase())).forEach(a=>{
    const btn=document.createElement("button");
    btn.textContent=a.name;
    btn.onclick=a.action;
    appsContainer.appendChild(btn);
  });
}
renderApps();

// --- Search Filter ---
const searchInput=document.getElementById("bmLauncherSearch");
searchInput.oninput = e => renderApps(e.target.value);

})();
