document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("starfield");
    const ctx = canvas.getContext("2d");
    const numStars = 2500;
    const speed = 1;
    const maxDepth = 1500;
    const starColors = ["#FFFFFF", "#040273", "#0e0afa", "#c242ff", "#B0E0E6"];
    let stars = [];
  
    function setCanvasSize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  
    function getRandomColor() {
      return starColors[Math.floor(Math.random() * starColors.length)];
    }
  
    class Star {
      constructor(x, y, z, size, color) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.size = size;
        this.color = color;
      }
  
      update() {
        this.z -= speed * (2 - this.z / maxDepth);
        if (this.z <= 0) {
          this.reset();
        }
      }
  
      reset() {
        this.z = maxDepth;
        const angle = Math.random() * 2 * Math.PI;
        const distance = Math.sqrt(Math.random()) * (canvas.width / 2);
        this.x = Math.cos(angle) * distance;
        this.y = Math.sin(angle) * distance;
        this.size = (1 - distance / (canvas.width / 2)) * 0.1 + 0.7;
        this.color = getRandomColor();
      }
  
      draw() {
        const x = ((this.x / this.z) * canvas.width) / 2 + canvas.width / 2;
        const y = ((this.y / this.z) * canvas.height) / 2 + canvas.height / 2;
        const radius = (1 - this.z / maxDepth) * this.size * 3;
        ctx.beginPath();
        ctx.arc(x, y, radius, 3, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }
  
    function initStars() {
      stars = Array.from({ length: numStars }, () => {
        const angle = Math.random() * 2 * Math.PI;
        const distance = Math.sqrt(Math.random()) * (canvas.width / 2);
        return new Star(
          Math.cos(angle) * distance,
          Math.sin(angle) * distance,
          Math.random() * maxDepth,
          (1 - distance / (canvas.width / 2)) * 0.1 + 0.5,
          getRandomColor()
        );
      });
    }
  
    function updateAndDrawStars() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((star) => {
        star.update();
        star.draw();
      });
      requestAnimationFrame(updateAndDrawStars);
    }
  
    window.addEventListener("resize", () => {
      setCanvasSize();
      initStars();
    });
  
    setCanvasSize();
    initStars();
    requestAnimationFrame(updateAndDrawStars);
  });
  