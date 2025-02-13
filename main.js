const sadGifs = [
    'https://i.pinimg.com/originals/a5/29/1a/a5291aeaf0075ee44425e8f5d342e5c9.gif',
    'https://i.pinimg.com/originals/4d/d7/60/4dd76056feee92a2f0e669afc2361678.gif',
    'https://i.pinimg.com/originals/67/5d/aa/675daa5c96e23bb7e2b5b06ef804cb81.gif', 
    'https://i.pinimg.com/originals/da/99/9f/da999f3d19764a03007a7aac54a61a20.gif'  
  ];
  

document.getElementById("noButton").addEventListener("click", function() {
    const gifContainer = document.querySelector('.valentine-gif');
    
    // Fade out current GIF
    gifContainer.style.opacity = '0';
    
    setTimeout(() => {
        // Change to next sad GIF
        currentGifIndex = (currentGifIndex + 1) % sadGifs.length;
        gifContainer.src = sadGifs[currentGifIndex];
        
        // Fade in new GIF
        gifContainer.style.opacity = '1';
    }, 300); // Match transition duration

    
    const noButton = document.getElementById("noButton");
    const buffer = 0.1; // 10% margin from edges (percentage-based)
    

});

document.getElementById("yesButton").addEventListener("click", function() {
    
    // Redirect to new page after 1 second
    setTimeout(() => {
        window.location.href = "success.html"; // Change to your desired URL
    }, 1000);
});


  let currentGifIndex = 0;
  const initialGif = document.querySelector('.valentine-gif').src;


class Tool {
    static randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    static randomColorRGB() {
        return `rgb(${this.randomNumber(0, 255)}, ${this.randomNumber(0, 255)}, ${this.randomNumber(0, 255)})`;
    }

    static randomColorHSL(hue, saturation, lightness) {
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }

    static gradientColor(ctx, cr, cg, cb, ca, x, y, r) {
        const col = `${cr},${cg},${cb}`;
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, `rgba(${col}, ${ca * 1})`);
        g.addColorStop(0.5, `rgba(${col}, ${ca * 0.5})`);
        g.addColorStop(1, `rgba(${col}, ${ca * 0})`);
        return g;
    }
}

class Angle {
    constructor(a) {
        this.a = a;
        this.rad = (this.a * Math.PI) / 180;
    }

    incDec(num) {
        this.a += num;
        this.rad = (this.a * Math.PI) / 180;
    }
}

let canvas;
let offCanvas;

class Canvas {
    constructor(bool) {
        this.canvas = document.createElement("canvas");
        if (bool === true) {
            this.canvas.style.position = "relative";
            this.canvas.style.display = "block";
            this.canvas.style.top = 0;
            this.canvas.style.left = 0;
            document.body.appendChild(this.canvas);
        }
        this.ctx = this.canvas.getContext("2d");
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;
        this.width < 768 ? (this.heartSize = 180) : (this.heartSize = 250);
        this.mouseX = null;
        this.mouseY = null;
        this.hearts = [];
        this.offHeartNum = 1;
        this.offHearts = [];
        this.data = null;
    }

    onInit() {
        let index = 0;
        for (let i = 0; i < this.height; i += 12) {
            for (let j = 0; j < this.width; j += 12) {
                let oI = (j + i * this.width) * 4 + 3;
                if (this.data[oI] > 0) {
                    index++;
                    const h = new Heart(canvas.ctx, j + Tool.randomNumber(-3, 3), i + Tool.randomNumber(-3, 3), Tool.randomNumber(6, 12), index);
                    canvas.hearts.push(h);
                }
            }
        }
    }

    offInit() {
        for (let i = 0; i < this.offHeartNum; i++) {
            const s = new Heart(this.ctx, this.width / 2, this.height / 2.3, this.heartSize);
            this.offHearts.push(s);
        }
        for (let i = 0; i < this.offHearts.length; i++) {
            this.offHearts[i].offRender(i);
        }
        this.data = this.ctx.getImageData(0, 0, this.width, this.height).data;
        this.onInit();
    }

    render() {

    if (this.animationCompleted) return;
        
    this.ctx.clearRect(0, 0, this.width, this.height);
    let allOffScreen = true;
        
            // Update hearts
    for (const heart of this.hearts) {
    heart.render();
        if (heart.x < this.width * 1.5) allOffScreen = false;
            }
        
            // When animation completes
            if (allOffScreen) {
              this.animationCompleted = true;
              this.canvas.style.opacity = "0";
              
              // Fade out canvas
              this.canvas.style.opacity = "0";
              
              setTimeout(() => {
                // Hide canvas completely
      
                
                // Show content
                document.querySelector('.content').classList.add('visible');
              }, 300); // Match transition duration
            }
          }
        

    resize() {
        this.offHearts = [];
        this.hearts = [];
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;
        this.width < 768 ? (this.heartSize = 180) : (this.heartSize = 250);
    }
}

class Heart {
    constructor(ctx, x, y, r, i) {
        this.ctx = ctx;
        this.init(x, y, r, i);
    }

    init(x, y, r, i) {
        this.x = x;
        this.xi = x;
        this.y = y;
        this.yi = y;
        this.r = r;
        this.i = i * 0.5 + 200;
        this.l = this.i;
        this.c = Tool.randomColorHSL(Tool.randomNumber(-5, 5), 80, 60);
        this.a = new Angle(Tool.randomNumber(0, 360));
        this.v = {
            x: Math.random(),
            y: -Math.random(),
        };
        this.ga = Math.random();
    }

    draw() {
        const ctx = this.ctx;
        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        ctx.globalAlpha = this.ga;
        ctx.beginPath();
        ctx.fillStyle = this.c;
        ctx.moveTo(this.x, this.y + this.r);
        ctx.bezierCurveTo(
            this.x - this.r - this.r / 5,
            this.y + this.r / 1.5,
            this.x - this.r,
            this.y - this.r,
            this.x,
            this.y - this.r / 5
        );
        ctx.bezierCurveTo(
            this.x + this.r,
            this.y - this.r,
            this.x + this.r + this.r / 5,
            this.y + this.r / 1.5,
            this.x,
            this.y + this.r
        );
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    updateParams() {
        this.a.incDec(1);
        Math.sin(this.a.rad) < 0 ? (this.r = -Math.sin(this.a.rad) * 20) : (this.r = Math.sin(this.a.rad) * 20);
    }

    updatePosition() {
        this.l -= 1;
        if (this.l < 0) {
            this.v.y -= 0.01;
            this.v.x += 0.02;
            this.y += this.v.y;
            this.x += this.v.x;
        }
    }

    wrapPosition() {
        
    }

    render() {
        this.wrapPosition();
        this.updateParams();
        this.updatePosition();
        this.draw();
    }

    offRender(i) {
        this.draw();
    }
}

(function () {
    "use strict";
    window.addEventListener("load", function () {
        offCanvas = new Canvas(false);
        canvas = new Canvas(true);

        offCanvas.offInit();

        function render() {
            canvas.render();
        
            // Check if the animation has completed
            if (canvas.hearts.every(heart => heart.x > canvas.width * 1.5)) {
                // Hide the canvas
                canvas.canvas.style.display = "none";
                return; // Stop further rendering
            }
        
            window.requestAnimationFrame(render);
        }

        render();

        window.addEventListener(
            "resize",
            function () {
                canvas.resize();
                offCanvas.resize();
                offCanvas.offInit();
            },
            false
        );
    });
})();