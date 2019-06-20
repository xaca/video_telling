let indice = 1;
let fin_escena = false;
let interval_id;
let video_actual;
let sound;
let control_progreso;

const videos = [];
videos[1] =  {c:"g1", id:1,v:"IuZWszHATjI",d:false,s:2};
videos[2] =  {c:"g2", id:2,v:"ESkM5cijr9M",d:false,s:3};
videos[3] =  {c:"g3", id:3,v:"iS78b5S3BMM",d:false,s:4};
videos[4] =  {c:"g4", id:4,v:"mKS_DZKLPIw",d:true,s:[5,6,7]};
videos[5] =  {c:"g5a",id:5,v:"2cYyVdslpEw",d:false,s:[]};
videos[6] =  {c:"g5b",id:6,v:"YQ7IhAm8s9M",d:false,s:[]};
videos[7] =  {c:"g6", id:7,v:"QQyXh6SM_sU",d:true,s:[9,10,8]};
videos[8] =  {c:"g6a",id:8,v:"eUJYq9SzLJ8",d:false,s:[]};
videos[9] =  {c:"g6b",id:9,v:"rvTJyPWAnHw",d:false,s:[]};
videos[10] = {c:"g7", id:10,v:"Lj_lYg9dHes",d:false,s:11};
videos[11] = {c:"g8", id:11,v:"8IFJS_nTulg",d:false,s:12};
videos[12] = {c:"g9", id:12,v:"fUfDBsZTK1g",d:false,s:-1};//Indica el fin

// 2. This code loads the IFrame Player API code asynchronously.
//var tag = document.createElement('script');

/* tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
 */
// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
/* var player;
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
} */

window.onload = function()
{
    /* sound = new Howl({
        src: ['sounds/JuneBug.mp3'],
        autoplay: false,
        loop: true,
        preload :true
    }); */
    control_progreso = document.getElementById("control_progreso");
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {            
    event.target.playVideo();
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
    quitarSeleccion();
    seleccionarBoton(target.id);
    control_progreso.className = "sprite progreso_"+indice;
}

function seleccionarBoton(id)
{
    document.getElementById(id).className = "boton_avance_circular seleccionado "+id;
}

function cargarVideo(indice){
    
    /*if(indice>0){
        
        ocultarMensaje();
        fin_escena = false;
        video_actual = videos[indice];            
        player.loadVideoById(video_actual.v, 0, "default");
    }
    else{
        detenerVideo();
        alert("fin de la experiencia :)");
    }*/
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        sound.play();
    }
    if(event.data == YT.PlayerState.PAUSED)
    {
        sound.pause();
    }
    if(event.data == YT.PlayerState.ENDED){
        sound.pause();
       
        if(Array.isArray(video_actual.s))
        {
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

            mostrarMensaje({
                estado:"CONDICIONAL",
                controles:controles_config,
                imagen:"img/"+video_actual.c+".jpg"
            });
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
        cargarPlay(video_actual.s);
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
