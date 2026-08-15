
(() => {
const $=id=>document.getElementById(id);
const editor=$("editor"),iastView=$("iastView"),iastInput=$("iastInput"),fontSize=$("fontSize");
const groups={
vowels:["अ","आ","इ","ई","उ","ऊ","ऋ","ॠ","ऌ","ॡ","ए","ऐ","ओ","औ"],
consonants:["क","ख","ग","घ","ङ","च","छ","ज","झ","ञ","ट","ठ","ड","ढ","ण","त","थ","द","ध","न","प","फ","ब","भ","म","य","र","ल","व","श","ष","स","ह"],
signs:["ा","ि","ी","ु","ू","ृ","ॄ","ॢ","ॣ","े","ै","ो","ौ","्","ं","ः","ँ","़","ऽ","ॐ"],
conjuncts:["क्ष","त्र","ज्ञ","श्र","द्य","द्व","त्व","स्त","स्व","ह्य","प्र","ग्र","क्र","ब्र","भ्र"],
numbers:["०","१","२","३","४","५","६","७","८","९","।","॥","॰","ॱ"]};
const devaToIast={"अ":"a","आ":"ā","इ":"i","ई":"ī","उ":"u","ऊ":"ū","ऋ":"ṛ","ॠ":"ṝ","ऌ":"ḷ","ॡ":"ḹ","ए":"e","ऐ":"ai","ओ":"o","औ":"au","क":"k","ख":"kh","ग":"g","घ":"gh","ङ":"ṅ","च":"c","छ":"ch","ज":"j","झ":"jh","ञ":"ñ","ट":"ṭ","ठ":"ṭh","ड":"ḍ","ढ":"ḍh","ण":"ṇ","त":"t","थ":"th","द":"d","ध":"dh","न":"n","प":"p","फ":"ph","ब":"b","भ":"bh","म":"m","य":"y","र":"r","ल":"l","व":"v","श":"ś","ष":"ṣ","स":"s","ह":"h","ा":"ā","ि":"i","ी":"ī","ु":"u","ू":"ū","ृ":"ṛ","ॄ":"ṝ","ॢ":"ḷ","ॣ":"ḹ","े":"e","ै":"ai","ो":"o","ौ":"au","ं":"ṃ","ः":"ḥ","ँ":"m̐","ऽ":"'","।":" |","॥":" ||","०":"0","१":"1","२":"2","३":"3","४":"4","५":"5","६":"6","७":"7","८":"8","९":"9"};
const consonantsSet=new Set(groups.consonants);
const independent={"a":"अ","ā":"आ","i":"इ","ī":"ई","u":"उ","ū":"ऊ","ṛ":"ऋ","ṝ":"ॠ","ḷ":"ऌ","ḹ":"ॡ","e":"ए","ai":"ऐ","o":"ओ","au":"औ"};
const matras={"a":"","ā":"ा","i":"ि","ī":"ी","u":"ु","ū":"ू","ṛ":"ृ","ṝ":"ॄ","ḷ":"ॢ","ḹ":"ॣ","e":"े","ai":"ै","o":"ो","au":"ौ"};
const cmap={"k":"क","kh":"ख","g":"ग","gh":"घ","ṅ":"ङ","c":"च","ch":"छ","j":"ज","jh":"झ","ñ":"ञ","ṭ":"ट","ṭh":"ठ","ḍ":"ड","ḍh":"ढ","ṇ":"ण","t":"त","th":"थ","d":"द","dh":"ध","n":"न","p":"प","ph":"फ","b":"ब","bh":"भ","m":"म","y":"य","r":"र","l":"ल","v":"व","ś":"श","ṣ":"ष","s":"स","h":"ह"};
const specials={"ṃ":"ं","ṁ":"ं","ḥ":"ः","m̐":"ँ","'":"ऽ","|":"।","||":"॥"};
let history=[""],historyIndex=0;

function renderKeyboard(){Object.entries(groups).forEach(([id,chars])=>{const box=$(id);chars.forEach(ch=>{const b=document.createElement("button");b.className="key";b.textContent=ch;b.title=ch;b.addEventListener("click",()=>insertAtCursor(ch));box.appendChild(b);});});}
function insertAtCursor(text){const s=editor.selectionStart,e=editor.selectionEnd;editor.setRangeText(text,s,e,"end");editor.focus();sync(true);}
function pushHistory(v){if(history[historyIndex]===v)return;history=history.slice(0,historyIndex+1);history.push(v);if(history.length>100)history.shift();historyIndex=history.length-1;}
function undo(){if(historyIndex>0){historyIndex--;editor.value=history[historyIndex];sync(false);}}
function redo(){if(historyIndex<history.length-1){historyIndex++;editor.value=history[historyIndex];sync(false);}}

function devanagariToIAST(text){const chars=Array.from(text);let out="";for(let i=0;i<chars.length;i++){const ch=chars[i];if(consonantsSet.has(ch)){const n=chars[i+1];if(n==="्"){out+=devaToIast[ch]||ch;i++;continue;}if(n&&["ा","ि","ी","ु","ू","ृ","ॄ","ॢ","ॣ","े","ै","ो","ौ"].includes(n)){out+=(devaToIast[ch]||ch)+(devaToIast[n]||"");i++;continue;}out+=(devaToIast[ch]||ch)+"a";continue;}if(ch==="्")continue;out+=Object.prototype.hasOwnProperty.call(devaToIast,ch)?devaToIast[ch]:ch;}return out;}

function normalizeIAST(t){return t.normalize("NFC").replace(/aa/g,"ā").replace(/ii/g,"ī").replace(/uu/g,"ū").replace(/\.r/g,"ṛ").replace(/\.n/g,"ṇ").replace(/~n/g,"ñ").replace(/"n/g,"ṅ").replace(/\.s/g,"ṣ").replace(/\.m/g,"ṃ").replace(/\.h/g,"ḥ");}
function iastToDevanagari(text){
text=normalizeIAST(text);const vowels=["ai","au","ā","ī","ū","ṝ","ḹ","ṛ","ḷ","e","o","a","i","u"];const cons=["kh","gh","ch","jh","ṭh","ḍh","th","dh","ph","bh","ṅ","ñ","ṭ","ḍ","ṇ","ś","ṣ","k","g","c","j","t","d","n","p","b","m","y","r","l","v","s","h"];let out="",i=0,pending=false;const match=arr=>arr.find(x=>text.startsWith(x,i));
while(i<text.length){const c=text[i];if(/\s/.test(c)){pending=false;out+=c;i++;continue;}if(text.startsWith("||",i)){out+="॥";i+=2;pending=false;continue;}if(text.startsWith("|",i)){out+="।";i++;pending=false;continue;}const con=match(cons);if(con){if(pending)out+="्";out+=cmap[con];i+=con.length;pending=true;continue;}const v=match(vowels);if(v){out+=pending?(matras[v]??""):(independent[v]??v);i+=v.length;pending=false;continue;}const sk=Object.keys(specials).sort((a,b)=>b.length-a.length).find(x=>text.startsWith(x,i));if(sk){out+=specials[sk];i+=sk.length;pending=false;continue;}pending=false;out+=c;i++;}return out;}

function sync(addHistory=true){const text=editor.value;iastView.value=devanagariToIAST(text);const chars=Array.from(text).length,words=text.trim()?text.trim().split(/\s+/).length:0;$("counts").textContent=`${chars} characters • ${words} words`;localStorage.setItem("sanskritStudioV8Text",text);if(addHistory)pushHistory(text);}
function escapeHtml(t){return t.replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));}
function downloadBlob(name,blob){const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=name;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove();},500);}
function exportFile(type){const text=editor.value;if(type==="txt"){downloadBlob("sanskrit-text.txt",new Blob([text],{type:"text/plain;charset=utf-8"}));return;}if(type==="csv"){const rows=[["Script","Text"],["Devanagari",text],["IAST",iastView.value]];const csv=rows.map(r=>r.map(v=>`"${String(v).replace(/"/g,'""')}"`).join(",")).join("\n");downloadBlob("sanskrit-text.csv",new Blob([csv],{type:"text/csv;charset=utf-8"}));return;}if(type==="doc"){const html=`<!doctype html><html><head><meta charset="utf-8"></head><body><div style="font-family:'Noto Sans Devanagari',serif;font-size:20pt;white-space:pre-wrap">${escapeHtml(text)}</div></body></html>`;downloadBlob("sanskrit-text.doc",new Blob([html],{type:"application/msword"}));return;}if(type==="pdf"){const w=window.open("","_blank");if(!w){alert("Pop-up blocked. Allow pop-ups and try again.");return;}w.document.write(`<html><head><meta charset="utf-8"><title>Sanskrit Text</title><style>body{font-family:'Noto Sans Devanagari','Devanagari Sangam MN',serif;font-size:22px;line-height:1.7;padding:40px;white-space:pre-wrap}</style></head><body>${escapeHtml(text)}</body></html>`);w.document.close();w.focus();setTimeout(()=>w.print(),250);}}

editor.addEventListener("input",()=>sync(true));
$("convertIASTBtn").addEventListener("click",()=>{const t=iastInput.value.trim();if(t)insertAtCursor(iastToDevanagari(t));});
$("clearIASTBtn").addEventListener("click",()=>{iastInput.value="";iastInput.focus();});
$("themeBtn").addEventListener("click",()=>{const cur=document.documentElement.dataset.theme||"dark",next=cur==="dark"?"light":"dark";document.documentElement.dataset.theme=next;localStorage.setItem("sanskritStudioV8Theme",next);$("themeBtn").textContent=next==="dark"?"☀":"☾";});
fontSize.addEventListener("change",()=>{editor.style.fontSize=`${fontSize.value}px`;});
$("undoBtn").addEventListener("click",undo);$("redoBtn").addEventListener("click",redo);
$("copyBtn").addEventListener("click",async()=>{try{await navigator.clipboard.writeText(editor.value);$("copyBtn").textContent="Copied";setTimeout(()=>$("copyBtn").textContent="Copy",900);}catch{editor.select();document.execCommand("copy");}});
$("clearBtn").addEventListener("click",()=>{if(editor.value&&!confirm("Clear the editor?"))return;editor.value="";sync(true);});
$("findBtn").addEventListener("click",()=>{$("findBar").classList.toggle("hidden");if(!$("findBar").classList.contains("hidden"))$("findInput").focus();});
$("closeFindBtn").addEventListener("click",()=>$("findBar").classList.add("hidden"));
$("replaceBtn").addEventListener("click",()=>{const f=$("findInput").value;if(!f)return;editor.value=editor.value.replace(f,$("replaceInput").value);sync(true);});
$("replaceAllBtn").addEventListener("click",()=>{const f=$("findInput").value;if(!f)return;editor.value=editor.value.split(f).join($("replaceInput").value);sync(true);});
document.querySelectorAll("[data-export]").forEach(b=>b.addEventListener("click",()=>exportFile(b.dataset.export)));
window.addEventListener("keydown",e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="z"){e.preventDefault();e.shiftKey?redo():undo();}});

renderKeyboard();
const theme=localStorage.getItem("sanskritStudioV8Theme")||"dark";document.documentElement.dataset.theme=theme;$("themeBtn").textContent=theme==="dark"?"☀":"☾";
editor.value=localStorage.getItem("sanskritStudioV8Text")||"";editor.style.fontSize=`${fontSize.value}px`;history=[editor.value];historyIndex=0;sync(false);
})();
