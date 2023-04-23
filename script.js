
function canvas() {
    const canvas = document.querySelector("canvas");
    const context = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener("resize", function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        render();
    })

    function files(index) {
        return `./image/scene${(index + 1).toString().padStart(5, '0')}.png`
    }


    const frameCount = 565;

    const images = [];
    const imageSeq = {
        frame: 0
    };

    for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = files(i);
        images.push(img);
    }

    gsap.to(imageSeq, {
        frame: frameCount - 1,
        snap: "frame",
        ease: "none",
        scrollTrigger: {
            scrub: 0.5,
            pin: "canvas",
            trigger: ".overflow"
        },
        onUpdate: render
    });

    images[0].onload = render;

/*     function render() {
        var img = images[imageSeq.frame]
        context.drawImage(img,0,0,canvas.width,canvas.height);
    }
 */
      function render() {
          scaleImage(images[imageSeq.frame], context)
      }
  
      function scaleImage(img, ctx) {
          var canvas = ctx.canvas;
          var hRatio = canvas.width / img.width;
          var vRatio = canvas.height / img.height;
          var ratio = Math.max(hRatio, vRatio);
          /* center the img */
          var centerShift_x = (canvas.width - img.width * ratio) / 2;
          var centerShift_y = (canvas.height - img.height * ratio) / 2;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, img.width, img.height,
              centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
      }
}


canvas()







