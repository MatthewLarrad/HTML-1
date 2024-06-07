var creative = {};
var main_tl;
var img_tl;
var secondsCount = 0;


function politeInit () {
    preload = new createjs.LoadQueue(true);
    manifest = [
            {src:'ITVDisplaySans-Black.woff', id:"ITVDisplaySans-Black"},
            {src:'ITVDisplaySans-Bold.woff', id:"ITVDisplaySans-Bold"},
            {src:'show_img.jpg', id:"show_img"},
            ];

    preload.addEventListener("complete", handleManifastLoadComplete);
    preload.addEventListener("fileload", handleFileLoaded);
    preload.loadManifest(manifest);
  }

function handleFileLoaded(event) {
    var item = event.item;
    var id = item.id;
    console.log("///// LOADED : " + item.id)
}

function handleManifastLoadComplete(event) {
      setUp ();
}

function setUp () {
  setupDomElements ();
  reset ();
  CreateAnimations ();
  addListeners();
  myInterval = setInterval(addSecond, 1000);
  play ();
  creative.dom.mainContainer.style.visibility = "visible";
}

function setupDomElements () {
  creative.dom = {};
  creative.dom.mainContainer = document.getElementById('main-container');
  creative.dom.exit = document.getElementById('exit');



}

function reset () {
    gsap.set(blue_panel, {scaleY:0.19, transformOrigin:"50% 100%"});
    gsap.set(Headline_1, {opacity:1});
    gsap.set([Headline_2, Show_Title ], {opacity:0});
    gsap.set(arrow, {top:"90px"});
    gsap.set(".publisher_title", {opacity:0});
    gsap.set(".star", {scale:0});
    gsap.set([show_logo, stream_on_logo], {scale:1, x:0, y:0});
    gsap.set([show_logo_2, stream_on_logo_2], {opacity:0, y:50});

}

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function CreateAnimations () {
  // F1_SplitText = new SplitText(f3_copy_1, {type:"lines"});

  img_tl = new TimelineMax({paused:true});
  img_tl.timeScale(1);
  img_tl.fromTo(show_img, {scale:1}, {scale:1.15, duration: 10, ease: "none", transformOrigin:"50% 30%"});

  main_tl = new TimelineMax({paused:true, repeat:1, repeatDelay:2, onStart:playIMG, onRepeat:playIMG});
  main_tl.timeScale(1);
  main_tl.to(Headline_1,  {opacity:0, duration: 0.5, ease: "power1.in", delay:2});
  main_tl.to(Headline_2,  {opacity:1, duration: 1, ease: "power1.out", delay:0.1});
  main_tl.to(Show_Title,  {opacity:1, duration: 1, ease: "power1.out", delay:-0.5});
  main_tl.to([Headline_2, Show_Title ], {opacity:0, duration: 0.5, ease: "power1.in", delay:0.8});
  main_tl.to(arrow, {top:"-100px", duration: 1, ease: "power4.inOut", delay:-0.5});
  // main_tl.to(".publisher_title", {opacity:1, duration: 0.5,  ease: "power1.in", delay:-0.5});
  // main_tl.to(".review_star_1", {scale:1, duration: 0.5, stagger:0.05, ease: "back.out(1.7)", delay:-0.5});
  // main_tl.to(".review_star_2",  {scale:1, duration: 0.5, stagger:0.05, ease: "back.out(1.7)", delay:-0.5});
  main_tl.to(blue_panel, {scaleY:1, duration: 0.8, ease: "power4.In", delay:-1.2, transformOrigin:"50% 100%"});
  main_tl.to(show_logo, {y:80, duration: 0.8, ease: "power4.In", delay:-1.2});
  main_tl.to(stream_on_logo, {y:80, duration: 0.8, ease: "power2.Out", delay:-1.2});
  main_tl.to([show_logo_2, stream_on_logo_2], {opacity:1, y:0, duration: 0.8, stagger:0.2, ease: "power2.Out", delay:-0.8});
}

function play () {
  main_tl.play(0);

}

function playIMG () {
  secondsCount = 0;
  img_tl.play(0);
}

function addSecond () {
  secondsCount ++;
  console.log("secondsCount = " + secondsCount)
}

function onAnimationComplete () {
  console.log('///// ANIMATION COMPLETE');
}
function pauseAnim () {
  main_tl.pause();
}
function addListeners() {
    creative.dom.exit.addEventListener('click', exitClickHandler);
}
function exitClickHandler() {
  window.open(window.clickTag, "_blank");
}
window.addEventListener('load', politeInit);
