let indice = 2;
let fin_escena = false;
let interval_id;
let video_actual;
let sound;
let control_progreso;
let boton_ventana_pachamama, boton_cerrar_ventana,ventana_pachamama;
let btn_cerrar_video_layer, player_layer_wrap, layer_actual;
let btn_ver_video_agape,btn_ver_video_siembra, btn_ver_video_sanedrin;
let btn_ver_video_laberinto,btn_ver_video_oraculo,btn_ver_video_memoria;
let btn_ver_video_alegria,btn_ver_video_alegria_layer,btn_ver_video_agora;
let btn_ver_video_suenos,btn_comenzar_experiencia,btns_continuar;
let secciones = [];
const videos = [];
const videos_especiales = [];
/*
c ->Id de la imagen de fondo que se carga al final del video
s ->Siguiente video, o videos si la sección tienen más de un camino
v ->Id del video de youtube
d ->Indica si hay un punto de decisión al final del video
*/
videos[2] =  {c:"g2", id:2,v:"UJrPam0C5Vk",d:false,s:3};
videos[3] =  {c:"g3", id:3,v:"J_USarY7szs",d:false,s:4};
videos[4] =  {c:"g4", id:4,v:"TJ4hQjqDrOU",d:false,s:5};
videos[5] =  {c:"g5", id:5,v:"7kOPn7uFfn8",d:false,s:6};
videos[6] =  {c:"g6", id:6,v:"78eBaDqOCVc",d:true,s:[7,8,9]};
videos[7] =  {c:"g7",id:7,v:"QFMglskQsDI",d:false,s:[]};
videos[8] =  {c:"g8", id:8,v:"5zgk1mvyVN0",d:true,s:[9,10,8]};
videos[9] =  {c:"g9",id:9,v:"qoI2zUSwRos",d:false,s:[]};
videos[10] =  {c:"g10",id:10,v:"4iFtrOVXJjw",d:false,s:[]};
videos[11] = {c:"g11", id:11,v:"UgUg0fT8Rvw",d:false,s:11};
videos[12] = {c:"g12", id:12,v:"n1EuIINYmTk",d:false,s:12};
//videos[12] = {c:"g9", id:12,v:"fUfDBsZTK1g",d:false,s:-1};//Indica el fin

videos_especiales[0] = {v:"SNlk6mtJ9nE",name:"Agape"};
videos_especiales[1] = {v:"Dna_LScGuZo",name:"Siembra"};
videos_especiales[2] = {v:"mAxXJFbvrK0",name:"Sanedrín"};
videos_especiales[3] = {v:"OtdlX94OLCk",name:"Laberinto"};
videos_especiales[4] = {v:"BAWAmyKjzfY",name:"Alegría"};
videos_especiales[5] = {v:"oqvqbLuzAhw",name:"Agora"};
videos_especiales[6] = {v:"apB9MJ-2doQ",name:"Los Sueños"};
videos_especiales[7] = {v:"RYAaBHdN5Ek",name:"Memoria"};

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player, player_layer;
function onYouTubeIframeAPIReady() {
    video_actual = videos[indice];
    layer_actual = videos_especiales[0];
    player = new YT.Player('player', {
        height: '100%',
        width: '100%',
        videoId: video_actual.v,
        playerVars:{ 'autoplay': 1, 'controls': 0, 'rel': 0, 'modestbranding':0, 'showinfo':0 },
        events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
        }
    });
    player_layer = new YT.Player('video_layer', {
        height: '100%',
        width: '100%',
        videoId: layer_actual.v,
        playerVars:{ 'autoplay': 1, 'controls': 0, 'rel': 0, 'modestbranding':0, 'showinfo':0 },
        events: {
        'onReady': ()=>{player_layer.stopVideo()},
        'onStateChange': (event)=>{
            if(event.data == YT.PlayerState.ENDED){
                cerrarLayerVideo();
            }
        }
        }
    });         
}

window.onload = function()
{
    /*sound = new Howl({
        src: ['sounds/JuneBug.mp3'],
        autoplay: false,
        loop: true,
        preload :true
    });*/
    asignarReferencias();
    agregarEventos();
}


function asignarReferencias()
{ 
    secciones[1] = document.getElementById("seccion_01");
    secciones[2] = document.getElementById("seccion_02");
    secciones[3] = document.getElementById("seccion_03");
    secciones[4] = document.getElementById("seccion_04");
    secciones[5] = document.getElementById("seccion_05");
    secciones[6] = document.getElementById("seccion_06");
    secciones[7] = document.getElementById("seccion_07");
    secciones[8] = document.getElementById("seccion_08");
    secciones[9] = document.getElementById("seccion_09");
    secciones[10] = document.getElementById("seccion_10");
    secciones[11] = document.getElementById("seccion_11");
    secciones[12] = document.getElementById("seccion_12");
    control_progreso = document.getElementById("control_progreso");
    ventana_pachamama = document.getElementById("ventana_pachamama");
    boton_ventana_pachamama = document.getElementById("boton_ventana_pachamama");
    boton_cerrar_ventana = document.getElementById("boton_cerrar_ventana");
    btn_cerrar_video_layer = document.getElementById("cerrar_video_layer");
    player_layer_wrap = document.getElementById("player_layer");
    btn_ver_video_agape = document.getElementById("ver_video_agape");
    btn_ver_video_siembra = document.getElementById("ver_video_siembra");
    btn_ver_video_sanedrin = document.getElementById("ver_video_sanedrin");
    btn_ver_video_laberinto = document.getElementById("ver_video_laberinto");
    btn_ver_video_oraculo = document.getElementById("ver_video_oraculo");
    btn_ver_video_memoria = document.getElementById("ver_video_memoria");
    btn_ver_video_alegria = document.getElementById("ver_video_alegria");
    btn_ver_video_alegria_layer = document.getElementById("ver_video_alegria_layer");
    btn_ver_video_agora = document.getElementById("ver_video_agora");
    btn_ver_video_suenos = document.getElementById("ver_video_suenos");
    btn_comenzar_experiencia = document.getElementById("comenzar_experiencia");
    btns_continuar = Array.from(document.querySelectorAll(".continuar"));
}
function agregarEventos()
{
    boton_ventana_pachamama.addEventListener("click",abrirVentana);
    boton_cerrar_ventana.addEventListener("click",cerrarVentana); 
    btn_cerrar_video_layer.addEventListener("click",cerrarLayerVideo);
    btn_ver_video_agape.addEventListener("click",abrirLayerVideo);
    btn_ver_video_siembra.addEventListener("click",()=>{
        cargarLayer(1);
    });
    btn_ver_video_sanedrin.addEventListener("click",()=>{
        cargarLayer(2);
    });
    btn_ver_video_laberinto.addEventListener("click",()=>{
        cargarLayer(3);
    });
    btn_ver_video_oraculo.addEventListener("click",()=>{
        document.getElementById("btn8").click();
    });
    btn_ver_video_memoria.addEventListener("click",()=>{
        document.getElementById("btn9").click();
    });
    btn_ver_video_alegria.addEventListener("click",()=>{
        document.getElementById("btn10").click();
    });
    btn_ver_video_alegria_layer.addEventListener("click",()=>{
        cargarLayer(4);
    });
    btn_ver_video_agora.addEventListener("click",()=>{
        cargarLayer(5);
    });
    btn_ver_video_suenos.addEventListener("click",()=>{
        cargarLayer(6);
    });
    btn_comenzar_experiencia.addEventListener("click",()=>{
        document.getElementById("btn2").click();
    });
    /* btn_continuar.addEventListener("click",()=>{
        console.dir(video_actual);
    }); */
    btns_continuar.map((btn)=>{
        btn.addEventListener("click",()=>{
            console.log(video_actual.id);
            switch(video_actual.id)
            {
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 11: document.getElementById("btn"+(video_actual.id+1)).click();
                         break;
                case 8:
                case 9: 
                case 10: document.getElementById("btn7").click(); 
                         break;
                case 7: document.getElementById("btn11").click();
                        break;
                case 12: document.getElementById("btn1").click();
                        break;
            }
        });
    });
}
function cargarLayer(id)
{
    layer_actual = videos_especiales[id];
    abrirLayerVideo();
}
function asignarVideoLayer(data){
    player_layer.loadVideoById(data.v, 0, "default");
}
function abrirVentana()
{
    TweenLite.to(ventana_pachamama,.5,{top:108,opacity:1});
}
function cerrarLayerVideo()
{  
    player_layer.stopVideo();  
    TweenLite.to(player_layer_wrap,.5,{top:"-100%",opacity:0,zIndex:0}); 
}
function abrirLayerVideo()
{    
    TweenLite.to(player_layer_wrap,
        .5,{opacity:1,top:0,zIndex:2,onComplete:()=>{
            asignarVideoLayer(layer_actual);
        }}); 
}
function cerrarVentana()
{
    TweenLite.to(ventana_pachamama,.5,{top:-522,opacity:0}); 
}
// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {            
    //event.target.playVideo();
    detenerVideo();
}

function izquierda(){
    cargarVideo(video_actual.s[0]);
    ocultarMensaje();
}

function centro(){
    cargarVideo(video_actual.s[1]);
    ocultarMensaje();
}

function derecha(){
    cargarVideo(video_actual.s[2]);
    ocultarMensaje();
}

function arriba(){
    cargarVideo(video_actual.s[1]);
    ocultarMensaje();
}

function obtenerId(value)
{
    return  value.split("btn")[1];
}

function quitarSeleccion()
{
    let botones = document.getElementsByClassName("boton_avance_circular");
    let cont = 1;
    for (const key in botones) {
        botones[key].className = "boton_avance_circular btn"+cont++;
    }
}
function actualizarProgreso(indice, target)
{
    let id_simple = obtenerId(target.id);
    detenerVideo();
    quitarSeleccion();
    seleccionarBoton(target.id);
    cargarSeccion(id_simple);
    cargarVideo(id_simple);
    control_progreso.className = "sprite progreso_"+indice;
}
function ocultarSeccion()
{
    for (let i=1;i<secciones.length;i++)
    {
        secciones[i].className = "contenedor ocultar";
    }
}
function cargarSeccion(id)
{
   ocultarSeccion();
   secciones[id].className = "contenedor"; 
}
function seleccionarBoton(id)
{
    document.getElementById(id).className = "boton_avance_circular seleccionado "+id;
}
function calcularSelectorSeccion(seccion)
{
    let selector = "#seccion_"+((seccion<10)?"0"+seccion:seccion);
    return selector;
}
function ocultarControlesUI(seccion)
{
    let selector = calcularSelectorSeccion(seccion);
    if(selector)
    {
        TweenLite.to(selector+" header",.5,{top:-239});
        TweenLite.to(selector+" footer",.5,{bottom:-194});
    }
}
function mostarControlesUI(seccion)
{
    let selector = calcularSelectorSeccion(seccion);
    if(selector)
    {
        TweenLite.to(selector+" header",.5,{top:0});
        TweenLite.to(selector+" footer",.5,{bottom:0});
    }
}
function cargarVideo(indice){
    if(indice>0){
        ocultarMensaje();
        fin_escena = false;
        video_actual = videos[indice];            
        ocultarControlesUI(video_actual.id);
        player.loadVideoById(video_actual.v, 0, "default");
    }
    else{
        detenerVideo();
        alert("fin de la experiencia :)");
    }
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        //sound.play();
    }
    if(event.data == YT.PlayerState.PAUSED)
    {
        //sound.pause();
    }
    if(event.data == YT.PlayerState.ENDED){
        //sound.pause();
        mostarControlesUI(video_actual.id);
        mostrarMensaje({
             estado:"FIN_VIDEO",
             imagen:"img/"+video_actual.c+".jpg"
         });         
    }
}

function ocultarMensaje()
{
    mensaje.className = "hidden";
}

function mostrarMensaje(obj)
{
    mensaje.className = "show";
    detenerVideo();
    mensaje.innerHTML = "";
    console.dir(obj);

    if(obj.estado == "CONDICIONAL")
    {
        cargarControles(obj.controles);
        cargarImagen(obj.imagen);
    }

    if(obj.estado == "FIN_VIDEO")
    {
        //cargarPlay(video_actual.s);
        cargarImagen(obj.imagen);
    }
}

function cargarPlay(siguiente)
{
    let play = '<img src="img/Actions-go-next-view-icon.png" class="control" style="position: absolute;top: 40%;" onclick="cargarVideo('+siguiente+');" alt="">';
    mensaje.innerHTML += play;
}
function cargarImagen(imagen)
{
    mensaje.style.backgroundImage = 'url("'+imagen+'")';
    mensaje.style.backgroundSize = "cover";
    mensaje.style.opacity = 0;
    TweenLite.to(mensaje,.5,{opacity:1});
}

function cargarControles(controles)
{
    let ii = '<img src="img/Actions-go-previous-icon.png" class="control" onclick="izquierda();" alt="">';
    let iv = '<img src="img/Eye-icon.png" class="control" onclick="centro();" alt="">';   
    let id = '<img src="img/Actions-go-next-icon.png" class="control" onclick="derecha();" alt="">';
    let ia = '<img src="img/Actions-go-up-icon.png" class="control" onclick="arriba();" alt="">';
    let temp = controles.split(",");
    let salida = "";
    
    for(let cont = 0; cont<temp.length;cont++)
    {
        if(temp[cont]=="i")
        {
            salida+= ii;
        }

        if(temp[cont]=="d")
        {
            salida+= id;
        }

        if(temp[cont]=="v")
        {
            salida+= iv;
        }
        if(temp[cont]=="a")
        {
            salida+= ia;
        } 
    }
    
    mensaje.innerHTML += salida;
}

function detenerVideo() 
{
    player.stopVideo();            
}
function pausarVideo()
{
    player.pauseVideo();
}
