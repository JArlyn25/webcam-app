const Canvas= document.querySelector(".photo");
const video = document.querySelector(".player");
const ctx =Canvas.getContext("2d");
const snap= document.querySelector(".snap");
const strip= document.querySelector(".strip");

function getVideo(){
navigator.mediaDevices.getUserMedia({video:true,audio: false})
.then(localMediaStream => {
    console.log(localMediaStream); /* this accesses the user video data so we can use it on the page) */
video.srcObject= localMediaStream;
video.play();
})
.catch(err => {
    console.error(`OH NO!!!`, err);
  });

} 

function paintToCanvas() {
  Width = video.videoWidth;
  Height = video.videoHeight;
  Canvas.Width = Width;
  Canvas.Height = Height;
  

return setInterval(() => {
  ctx.drawImage(video, 0, 0, Width, Height);
  let pixels = ctx.getImageData(0, 0, Width, Height);
  pixels = rgbSplit(pixels);
   ctx.putImageData(pixels, 0, 0);
}, 16);
}

function takePhoto() {
snap.currentTime=0;
snap.play()

  const data = canvas.toDataURL('image/jpeg');
 const link = document.createElement('a');
 link.href = data;
 link.setAttribute('download', 'handsome');
 link.innerHTML = `<img src="${data}" alt="Handsome Man" />`;
 strip.insertBefore(link, strip.firstChild);
}
 function redEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 200; // RED
    pixels.data[i + 1] = pixels.data[i + 1] - 50; // GREEN
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // Blue
  }
  return pixels;
 }
 
 
 function rgbSplit(pixels) {
  for (let i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i - 150] = pixels.data[i + 0]; // RED
    pixels.data[i + 500] = pixels.data[i + 1]; // GREEN\

    pixels.data[i - 550] = pixels.data[i + 2]; // Blue
 }
 return pixels;
}


function greenScreen(pixels) {
 const levels = {};


 document.querySelectorAll('.rgb input').forEach((input) => {
   levels[input.name] = input.value;
 });


 for (i = 0; i < pixels.data.length; i = i + 4) {
   red = pixels.data[i + 0];
   green = pixels.data[i + 1];
   blue = pixels.data[i + 2];
   alpha = pixels.data[i + 3];


   if (red >= levels.rmin
     && green >= levels.gmin
     && blue >= levels.bmin
     && red <= levels.rmax
     && green <= levels.gmax
     && blue <= levels.bmax) {
     // take it out!
     pixels.data[i + 3] = 0;
   }
 }


 return pixels;
}

 
getVideo();

  video.addEventListener("canplay", paintToCanvas);
