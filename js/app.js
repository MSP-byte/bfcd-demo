const SUPABASE_URL="https://xbourhzmhezzqrudzoay.supabase.co";
const SUPABASE_KEY="sb_publishable_5FreSuDu0SQ8SgEkCbLtjg_plb9uE7W";
const db=supabase.createClient(SUPABASE_URL,SUPABASE_KEY);
let docs=[];

const $=s=>document.querySelector(s);
const esc=s=>String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
const norm=s=>(s??"").toString().normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();

async function cargar(){
  const {data,error}=await db.from("documentos").select("*").order("codigo");
  if(error){$("#error").hidden=false;$("#error").textContent="No se pudo consultar el catálogo: "+error.message;$("#resultado").textContent="Error";return}
  docs=data||[];
  $("#stat-total").textContent=docs.length;
  $("#stat-colecciones").textContent=new Set(docs.map(d=>d.coleccion)).size;
  poblarFiltros();
  render();
}
function poblar(id,vals){const s=$(id);[...new Set(vals.filter(v=>v!==null&&v!==""))].sort((a,b)=>String(a).localeCompare(String(b),"es",{numeric:true})).forEach(v=>{const o=document.createElement("option");o.value=v;o.textContent=v;s.appendChild(o)})}
function poblarFiltros(){poblar("#coleccion",docs.map(d=>d.coleccion));poblar("#tipo",docs.map(d=>d.tipo_documental));poblar("#anio",docs.map(d=>d.anio))}
function filtrados(){
 const q=norm($("#q").value),c=$("#coleccion").value,t=$("#tipo").value,a=$("#anio").value;
 return docs.filter(d=>{
   const bolsa=norm([d.codigo,d.titulo,d.descripcion,d.ferrocarril,d.linea_ramal,d.autor_organismo,d.fabricante_modelo,d.ubicacion,d.palabras_clave].join(" "));
   return (!q||bolsa.includes(q))&&(!c||d.coleccion===c)&&(!t||d.tipo_documental===t)&&(!a||String(d.anio)===a);
 });
}
function render(){
 const arr=filtrados();$("#resultado").textContent=arr.length+" resultado"+(arr.length===1?"":"s");
 $("#grid").innerHTML=arr.length?arr.map(d=>`<article class="card" data-id="${d.id}" tabindex="0"><span class="code">${esc(d.codigo)}</span><span class="tag">${esc(d.coleccion)}</span><h3>${esc(d.titulo)}</h3><p>${esc(d.descripcion||"Objeto documental catalogado en BFCD.")}</p><div class="meta"><span>${esc(d.tipo_documental)}</span><span>${esc(d.anio||"s/f")}</span></div></article>`).join(""):`<div class="empty">No hay objetos que coincidan con la búsqueda.</div>`;
 document.querySelectorAll(".card").forEach(el=>{el.onclick=()=>abrir(el.dataset.id);el.onkeydown=e=>{if(e.key==="Enter")abrir(el.dataset.id)}})
}
function abrir(id){
 const d=docs.find(x=>x.id===id);if(!d)return;
 const rows=[["Colección",d.coleccion],["Tipo documental",d.tipo_documental],["Año / fecha",d.fecha_documento||d.anio||"Sin determinar"],["Ferrocarril",d.ferrocarril],["Línea / ramal",d.linea_ramal],["Autor / organismo",d.autor_organismo],["Ubicación",d.ubicacion],["Palabras clave",d.palabras_clave],["Fuente / procedencia",d.fuente]].filter(x=>x[1]);
 $("#ficha-contenido").innerHTML=`<span class="ficha-code">${esc(d.codigo)}</span><h2 class="ficha-title">${esc(d.titulo)}</h2><p>${esc(d.descripcion||"")}</p>${rows.map(r=>`<div class="detail"><b>${esc(r[0])}</b><span>${esc(r[1])}</span></div>`).join("")}<div class="notice">Objeto catalogado. La carga binaria al Storage se completará en la siguiente etapa del piloto.</div>`;
 $("#ficha").showModal();
}
["#q","#coleccion","#tipo","#anio"].forEach(s=>$(s).addEventListener(s==="#q"?"input":"change",render));
$("#cerrar").onclick=()=>$("#ficha").close();
$("#ficha").addEventListener("click",e=>{if(e.target===$("#ficha"))$("#ficha").close()});
cargar();
