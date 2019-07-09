let indice = 2;
let fin_escena = false;
let interval_id;
let video_actual;
let sound;
let control_progreso;
let boton_ventana_pachamama, boton_cerrar_ventana;
let secciones = [];

const videos = [];
/*
c ->Id de la imagen de fondo que se carga al final del video
s ->Siguiente video
v ->Id del video de youtube
*/
videos[2] =  {c:"g2", id:1,v:"UJrPam0C5Vk",d:false,s:3};
videos[3] =  {c:"g2", id:2,v:"J_USarY7szs",d:false,s:4};
videos[4] =  {c:"g3", id:3,v:"TJ4hQjqDrOU",d:false,s:5};
videos[5] =  {c:"g4", id:4,v:"7kOPn7uFfn8",d:false,s:6};
videos[6] =  {c:"g5a",id:5,v:"78eBaDqOCVc",d:true,s:[7,8,9]};
videos[7] =  {c:"g5b",id:6,v:"QFMglskQsDI",d:false,s:[]};
videos[8] =  {c:"g6", id:7,v:"5zgk1mvyVN0",d:true,s:[9,10,8]};
videos[9] =  {c:"g6a",id:8,v:"qoI2zUSwRos",d:false,s:[]};
videos[10] =  {c:"g6b",id:9,v:"4iFtrOVXJjw",d:false,s:[]};
videos[11] = {c:"g7", id:10,v:"UgUg0fT8Rvw",d:false,s:11};
videos[12] = {c:"g8", id:11,v:"n1EuIINYmTk",d:false,s:12};
//videos[12] = {c:"g9", id:12,v:"fUfDBsZTK1g",d:false,s:-1};//Indica el fin

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
    video_actual = videos[indice];
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
}

window.onload = function()
{
    /* sound = new Howl({
        src: ['sounds/JuneBug.mp3'],
        autoplay: false,
        loop: true,
        preload :true
    }); */
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
    boton_ventana_pachamama = document.getElementById("boton_ventana_pachamama");
    boton_cerrar_ventana = document.getElementById("boton_cerrar_ventana");
}
function agregarEventos()
{
    boton_ventana_pachamama.addEventListener("click",abrirVentana);
    boton_cerrar_ventana.addEventListener("click",cerrarVentana); 
}

function abrirVentana()
{
    let ventana = document.getElementById("ventana_pachamama");
    ventana.className = "animated fadeInDown";
}

function cerrarVentana()
{
    let ventana = document.getElementById("ventana_pachamama");
    ventana.className = "animated fadeOutUp"; 
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
    quitarSeleccion();
    seleccionarBoton(target.id);
    cargarSeccion(id_simple);
    cargarVideo(id_simple);
    control_progreso.className = "sprite progreso_"+indice;
}
function ocultarSeccion(){
    for (let i=1;i<secciones.length;i++) {
        secciones[i].className = "contenedor ocultar";
    }
}
function cargarSeccion(id){
   ocultarSeccion();
   secciones[id].className = "contenedor"; 
}
function seleccionarBoton(id)
{
    document.getElementById(id).className = "boton_avance_circular seleccionado "+id;
}

function cargarVideo(indice){
    console.log(indice)
    if(indice>0){
        
        //ocultarMensaje();
        fin_escena = false;
        video_actual = videos[indice];            
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
       console.log(video_actual);
        if(Array.isArray(video_actual.s))
        {
            /*
            let controles_config = "";
            if(video_actual.id == 4 || video_actual.id == 5 || video_actual.id == 6)
            {
                video_actual = videos[4];
                controles_config = "i,v,d";
            }

            if(video_actual.id == 7 || video_actual.id == 8 || video_actual.id == 9)
            {
                video_actual = videos[7];
                controles_config = "i,d,a";
            }
            */
            /*mostrarMensaje({
                estado:"CONDICIONAL",
                controles:controles_config,
                imagen:"img/"+video_actual.c+".jpg"
            });*/
        }
        else
        {
           mostrarMensaje({
                estado:"FIN_VIDEO",
                imagen:"img/"+video_actual.c+".jpg"
            }); 
        }
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

function detenerVideo() {
    player.stopVideo();            
}
function pausarVideo()
{
    player.pauseVideo();
}
