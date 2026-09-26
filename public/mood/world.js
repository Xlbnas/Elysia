/* Elysia mood world: no framework, remote API, generated mockup, or cursor replacement. */
(()=>{
'use strict';
const $=id=>document.getElementById(id),root=document.documentElement,world=$('world');
const canvas=$('atmosphere'),ctx=canvas.getContext('2d',{alpha:true});
const reduced=matchMedia('(prefers-reduced-motion: reduce)'),fine=matchMedia('(hover: hover) and (pointer: fine)');
const scenes=[
 {key:'encounter',label:'邂逅',file:'人之律者.png',verse:'把此刻，留给喜欢。',alt:'粉发的爱莉希雅立于晶莹的光中'},
 {key:'garden',label:'花间',file:'about_3.jpg',verse:'不赶路，只等一朵花开。',alt:'爱莉希雅与盛开的花朵'},
 {key:'stars',label:'星海',file:'Elysia_3.jpg',verse:'星光落下的时候，想起你。',alt:'花与光环围绕的爱莉希雅'}
];
const state={scene:0,paused:false,immersed:false,frame:0,time:0,x:0,y:0,tx:0,ty:0,w:1,h:1,dpr:1,raf:null,last:0,bloom:[],petals:[],request:0,hidden:document.hidden,audio:false,soundBusy:false,toastTimer:null};
let front=$('art-a'),back=$('art-b');
const assetURL=file=>new URL('./img/'+encodeURIComponent(file),document.baseURI).href;
const isStill=()=>state.paused||reduced.matches||state.hidden;
const status=message=>{$('announcer').textContent=message};
function notify(message){$('toast').textContent=message;$('toast').hidden=false;clearTimeout(state.toastTimer);state.toastTimer=setTimeout(()=>$('toast').hidden=true,2600)}
function syncTheme(){const day=root.dataset.theme==='day';$('theme').setAttribute('aria-pressed',String(day));$('theme').setAttribute('aria-label',day?'切换到夜幕':'切换到白昼');$('theme-text').textContent=day?'夜幕':'白昼';document.querySelector('meta[name=theme-color]').content=day?'#efe5f2':'#160f26';draw()}
$('theme').addEventListener('click',()=>{root.dataset.theme=root.dataset.theme==='day'?'night':'day';try{localStorage.setItem('elysia-theme',root.dataset.theme)}catch{}syncTheme()});
async function selectScene(index){
 index=(index+scenes.length)%scenes.length;
 if(index===state.scene&&!world.dataset.loading)return;
 const token=++state.request,next=scenes[index];world.dataset.loading='true';
 try{
  const image=new Image();
  await new Promise((resolve,reject)=>{
   const finish=(fn)=>{clearTimeout(timer);image.onload=image.onerror=null;fn()};
   const timer=setTimeout(()=>finish(()=>reject(new Error('image timeout'))),15000);
   image.onload=()=>finish(resolve);image.onerror=()=>finish(()=>reject(new Error('image load')));
   image.src=assetURL(next.file);
   if(image.complete&&image.naturalWidth)finish(resolve);
  });
  if(token!==state.request)return;
  back.src=image.src;back.alt=next.alt;back.removeAttribute('aria-hidden');
  front.classList.remove('active');front.alt='';front.setAttribute('aria-hidden','true');back.classList.add('active');[front,back]=[back,front];
  state.scene=index;root.dataset.scene=next.key;$('verse').textContent=next.verse;
  document.querySelectorAll('.scene').forEach((b,i)=>{b.classList.toggle('active',i===index);if(i===index)b.setAttribute('aria-current','true');else b.removeAttribute('aria-current')});
  status(next.label+'。'+next.verse);burst(state.w*.65,state.h*.48,12);draw();
 }catch{if(token===state.request){notify('这片风景暂时没有载入，请再试一次。');status('场景加载失败，保留当前画面。')}}
 finally{if(token===state.request)delete world.dataset.loading}
}
document.querySelectorAll('.scene').forEach(b=>b.addEventListener('click',()=>selectScene(Number(b.dataset.to))));
function motionState(){world.classList.toggle('paused',state.paused);world.classList.toggle('reduced',reduced.matches);$('pause').setAttribute('aria-pressed',String(state.paused||reduced.matches));$('pause').setAttribute('aria-label',reduced.matches?'系统已减少动态':state.paused?'继续动效':'暂停动效');$('pause').title=$('pause').getAttribute('aria-label');if(isStill()){if(state.raf!==null)cancelAnimationFrame(state.raf);state.raf=null;state.last=0;state.tx=state.ty=state.x=state.y=0;position();draw()}else start()}
$('pause').addEventListener('click',()=>{if(reduced.matches){notify('系统已开启减少动态，当前保持静态。');return}state.paused=!state.paused;motionState()});
$('immersive').addEventListener('click',()=>setImmersed(!state.immersed));
function setImmersed(value){state.immersed=value;world.classList.toggle('immersed',value);$('immersive').setAttribute('aria-pressed',String(value));$('immersive').setAttribute('aria-label',value?'显示文字与导航':'只看风景');$('immersive').title=value?'显示文字与导航':'只看风景';['.poetry','.scene-footer','.bloom-button','.brand'].forEach(s=>{document.querySelector(s).inert=value});status(value?'已隐藏文字，按 Escape 返回。':'已显示文字与导航。')}
const about=$('about');$('credits').addEventListener('click',()=>{if(typeof about.showModal==='function')about.showModal();else about.setAttribute('open','')});
about.querySelector('button').addEventListener('click',()=>about.close());about.addEventListener('click',e=>{if(e.target===about){const r=about.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)about.close()}});
document.addEventListener('keydown',e=>{if(about.open)return;if(e.key==='Escape'&&state.immersed){setImmersed(false);return}if(['INPUT','TEXTAREA','SELECT'].includes(e.target.tagName)||e.altKey||e.ctrlKey||e.metaKey)return;if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();selectScene(state.scene+(e.key==='ArrowRight'?1:-1))}});
function position(){world.style.setProperty('--p-x',state.x.toFixed(2)+'px');world.style.setProperty('--p-y',state.y.toFixed(2)+'px');world.style.setProperty('--tilt',(state.x*.023).toFixed(3)+'deg');world.style.setProperty('--clock',(state.time*2.2%360).toFixed(2)+'deg')}
world.addEventListener('pointermove',e=>{if(!fine.matches||e.pointerType==='touch'||isStill())return;const r=world.getBoundingClientRect();state.tx=(e.clientX/r.width-.5)*28;state.ty=(e.clientY/r.height-.5)*18},{passive:true});
world.addEventListener('pointerleave',()=>{state.tx=state.ty=0},{passive:true});
let touch=null;world.addEventListener('pointerdown',e=>{if(e.pointerType==='touch'&&!e.target.closest('button,a'))touch={x:e.clientX,y:e.clientY}},{passive:true});
world.addEventListener('pointerup',e=>{if(e.pointerType==='touch'&&touch){const dx=e.clientX-touch.x,dy=e.clientY-touch.y;touch=null;if(Math.abs(dx)>65&&Math.abs(dy)<55)selectScene(state.scene+(dx<0?1:-1))}},{passive:true});world.addEventListener('pointercancel',()=>touch=null,{passive:true});
function rand(a,b){return a+Math.random()*(b-a)}
function resize(){const r=world.getBoundingClientRect();state.w=r.width;state.h=r.height;state.dpr=Math.min(devicePixelRatio||1,fine.matches?1.75:1.5);canvas.width=Math.round(r.width*state.dpr);canvas.height=Math.round(r.height*state.dpr);if(ctx)ctx.setTransform(state.dpr,0,0,state.dpr,0,0);state.petals=Array.from({length:fine.matches?48:25},()=>({x:Math.random(),y:Math.random(),s:rand(1.8,7),speed:rand(.015,.04),phase:rand(0,6.28),r:rand(0,6.28)}));draw()}
function petal(x,y,size,rotation,alpha,day){if(!ctx)return;ctx.save();ctx.translate(x,y);ctx.rotate(rotation);ctx.globalAlpha=alpha;ctx.fillStyle=day?'#a4568e':'#efb7df';ctx.beginPath();ctx.moveTo(-size,0);ctx.bezierCurveTo(-size,-size,size*.8,-size*.75,size*.8,0);ctx.bezierCurveTo(size*.8,size*.45,0,size*.7,-size,0);ctx.fill();ctx.restore()}
function burst(x,y,count=22){if(isStill()){status('花正盛开。减少动态时不播放绽放动画。');return}const now=state.time;for(let i=0;i<count;i++){const a=Math.random()*Math.PI*2;state.bloom.push({x,y,vx:Math.cos(a)*rand(40,170),vy:Math.sin(a)*rand(35,125)-25,born:now,s:rand(2,7),r:rand(0,6.28)})}state.bloom=state.bloom.slice(-100)}
$('bloom').addEventListener('click',()=>{burst(state.w*.68,state.h*.48,38);if(!isStill())status('花朵在光中绽放。')});
function draw(){if(!ctx)return;const {w,h,time}=state,day=root.dataset.theme==='day';ctx.clearRect(0,0,w,h);
 ctx.save();ctx.strokeStyle=day?'#9365a5':'#e8b6ed';ctx.lineWidth=.7;
 for(let row=0;row<13;row++){ctx.globalAlpha=(day?.026:.045)*(1-row/16);ctx.beginPath();for(let x=0;x<=w;x+=16){const y=h*(.73+row*.022)+Math.sin(x*.008+time*.27+row*.31)*10+Math.sin(x*.015-time*.19)*5;if(x===0)ctx.moveTo(x,y);else ctx.lineTo(x,y)}ctx.stroke()}ctx.restore();
 state.petals.forEach((p,i)=>{const x=((p.x+time*p.speed*.22)%1.16-.08)*w+Math.sin(time*.24+p.phase)*16;const y=((p.y+time*p.speed*.2)%1.14-.08)*h;const al=(Math.sin(time*.35+p.phase)*.14+.4)*(day?.65:1);if(i%4===0){ctx.save();ctx.globalAlpha=al;ctx.fillStyle=day?'#955291':'#fff1ff';ctx.fillRect(x,y,1.3,1.3);ctx.restore()}else petal(x,y,p.s,p.r+time*.25,al,day)});
 state.bloom=state.bloom.filter(p=>time-p.born<3.2);state.bloom.forEach(p=>{const age=time-p.born;petal(p.x+p.vx*age,p.y+p.vy*age+age*age*12,p.s,p.r+age,.8*(1-age/3.2),day)});
}
function frame(stamp){state.raf=null;if(isStill())return;const dt=state.last?Math.min((stamp-state.last)/1000,.045):.016;state.last=stamp;state.time+=dt;state.frame++;const k=1-Math.exp(-dt*3.8);state.x+=(state.tx-state.x)*k;state.y+=(state.ty-state.y)*k;position();draw();state.raf=requestAnimationFrame(frame)}
function start(){if(state.raf===null&&!isStill())state.raf=requestAnimationFrame(frame)}
// User-initiated synthetic chimes; no copyrighted soundtrack or external requests.
let audio=null,master=null,soundTimer=null,soundStep=0;
const notes=[0,7,12,16,19,12,7,4];
function chime(){if(!audio||!state.audio||document.hidden)return;const now=audio.currentTime,base=[220,196,246.94][state.scene],freq=base*2**(notes[soundStep++%notes.length]/12);for(const mul of [1,2.002]){const osc=audio.createOscillator(),g=audio.createGain();osc.type='sine';osc.frequency.value=freq*mul;g.gain.setValueAtTime(0,now);g.gain.linearRampToValueAtTime(mul===1?.13:.035,now+.025);g.gain.exponentialRampToValueAtTime(.0001,now+2.8);osc.connect(g);g.connect(master);osc.start(now);osc.stop(now+3);osc.onended=()=>{osc.disconnect();g.disconnect()}}soundTimer=setTimeout(chime,2600)}
function soundUI(){$('sound').setAttribute('aria-pressed',String(state.audio));$('sound').setAttribute('aria-label',state.audio?'关闭合成风铃音景':'开启合成风铃音景')}
async function toggleSound(){if(state.soundBusy)return;state.soundBusy=true;$('sound').disabled=true;try{if(state.audio){state.audio=false;clearTimeout(soundTimer);if(audio)await audio.suspend();soundUI();return}const AC=window.AudioContext||window.webkitAudioContext;if(!AC)throw new Error('unsupported');if(!audio){audio=new AC();master=audio.createGain();master.gain.value=.34;master.connect(audio.destination)}await audio.resume();if(audio.state!=='running')throw new Error('blocked');state.audio=true;soundUI();chime();status('合成风铃音景已开启。')}catch{state.audio=false;soundUI();notify('浏览器没有开启声音；可以稍后再点一次。')}finally{state.soundBusy=false;$('sound').disabled=false}}
$('sound').addEventListener('click',toggleSound);
document.addEventListener('visibilitychange',()=>{state.hidden=document.hidden;if(state.hidden){clearTimeout(soundTimer);if(audio)audio.suspend().catch(()=>{})}else if(state.audio&&audio){audio.resume().then(()=>{if(audio.state==='running'){clearTimeout(soundTimer);chime()}else{state.audio=false;soundUI()}}).catch(()=>{state.audio=false;soundUI()})}motionState()});
window.addEventListener('pagehide',()=>{if(state.raf!==null)cancelAnimationFrame(state.raf);state.raf=null;clearTimeout(soundTimer);clearTimeout(state.toastTimer);if(audio)audio.suspend().catch(()=>{})});window.addEventListener('pageshow',()=>{state.hidden=document.hidden;motionState()});
reduced.addEventListener('change',motionState);fine.addEventListener('change',()=>{state.tx=state.ty=0;resize()});
if(window.ResizeObserver)new ResizeObserver(resize).observe(world);else window.addEventListener('resize',resize);
front.addEventListener('error',()=>notify('角色图片未加载；页面控制仍可使用，请检查本地素材路径。'));
Object.defineProperty(window,'elysiaWorld',{value:Object.freeze({getState:()=>({scene:state.scene,paused:state.paused,reduced:reduced.matches,immersed:state.immersed,frame:state.frame,audio:state.audio,x:state.x,y:state.y,raf:state.raf!==null})}),writable:false});
resize();syncTheme();motionState();
})();
