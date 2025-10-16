import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Navbar from "./Navbar";
import Footer from "./Footer";

function DataMiningBackground() {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateCanvasSize();

    const dataNodes = [];
    const connections = [];

    const getNodeCount = () => {
      if (window.innerWidth < 768) return 15; // Mobile
      if (window.innerWidth < 1024) return 25; // Tablet
      return 35; // Desktop
    };

    class DataNode {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 4 + 2;
        this.originalSize = this.size;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.6 + 0.4;
        this.type = Math.random() > 0.7 ? "data" : "mining";
        this.pulse = Math.random() * Math.PI * 2;
        this.color = this.type === "data" ? "#00d4ff" : "#b829dd";
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        this.x = Math.max(0, Math.min(canvas.width, this.x));
        this.y = Math.max(0, Math.min(canvas.height, this.y));

        this.pulse += 0.02;
        this.size = this.originalSize + Math.sin(this.pulse) * 0.5;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;

        // Glow effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;

        // Main node
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowBlur = 0;
        ctx.fillStyle = "#ffffff";
        ctx.globalAlpha = 0.8;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 0.3, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }
    }

    class DataStream {
      constructor(startNode, endNode) {
        this.start = startNode;
        this.end = endNode;
        this.progress = 0;
        this.speed = Math.random() * 0.005 + 0.001;
        this.opacity = Math.random() * 0.4 + 0.2;
        this.particles = [];
        this.lastParticleTime = 0;
      }

      update() {
        this.progress += this.speed;
        if (this.progress > 1) this.progress = 0;

        const currentTime = Date.now();
        if (currentTime - this.lastParticleTime > 500) {
          this.particles.push({
            x: this.start.x,
            y: this.start.y,
            progress: 0,
            life: 1,
          });
          this.lastParticleTime = currentTime;
        }

        this.particles = this.particles.filter((particle) => {
          particle.progress += this.speed * 2;
          particle.life -= 0.01;

          particle.x =
            this.start.x + (this.end.x - this.start.x) * particle.progress;
          particle.y =
            this.start.y + (this.end.y - this.start.y) * particle.progress;

          return particle.life > 0 && particle.progress < 1;
        });
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity * 0.3;
        ctx.strokeStyle = "#00d4ff";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(this.start.x, this.start.y);
        ctx.lineTo(this.end.x, this.end.y);
        ctx.stroke();

        // Draw data particles
        this.particles.forEach((particle) => {
          ctx.globalAlpha = particle.life * 0.8;
          ctx.fillStyle = "#00ffff";
          ctx.shadowBlur = 5;
          ctx.shadowColor = "#00ffff";
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
          ctx.fill();
        });

        ctx.restore();
      }
    }

    const initNodes = () => {
      dataNodes.length = 0;
      connections.length = 0;

      const nodeCount = getNodeCount();
      for (let i = 0; i < nodeCount; i++) {
        dataNodes.push(new DataNode());
      }

      for (let i = 0; i < dataNodes.length; i++) {
        for (let j = i + 1; j < dataNodes.length; j++) {
          const distance = Math.hypot(
            dataNodes[i].x - dataNodes[j].x,
            dataNodes[i].y - dataNodes[j].y
          );

          if (distance < 150 && Math.random() > 0.7) {
            connections.push(new DataStream(dataNodes[i], dataNodes[j]));
          }
        }
      }
    };

    initNodes();

    const binaryDrops = [];
    class BinaryDrop {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = -20;
        this.speed = Math.random() * 2 + 1;
        this.text = Math.random() > 0.5 ? "1" : "0";
        this.opacity = Math.random() * 0.3 + 0.1;
      }

      update() {
        this.y += this.speed;
        if (this.y > canvas.height + 20) {
          this.y = -20;
          this.x = Math.random() * canvas.width;
        }
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = "#00ff00";
        ctx.font = "12px monospace";
        ctx.fillText(this.text, this.x, this.y);
        ctx.restore();
      }
    }

    const binaryCount = window.innerWidth < 768 ? 20 : 40;
    for (let i = 0; i < binaryCount; i++) {
      binaryDrops.push(new BinaryDrop());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      binaryDrops.forEach((drop) => {
        drop.update();
        drop.draw();
      });

      dataNodes.forEach((node) => {
        node.update();
        node.draw();
      });

      connections.forEach((connection) => {
        connection.update();
        connection.draw();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      updateCanvasSize();
      initNodes();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none opacity-60"
      style={{ background: "transparent" }}
    />
  );
}

export default function Layout({ children }) {
  const router = useRouter();

  const isGamePage =
    router.pathname.startsWith("/games/") &&
    router.pathname !== "/games" &&
    router.pathname !== "/games/";

  return (
    <div className="min-h-screen relative overflow-hidden">
      <DataMiningBackground />
      {!isGamePage && <Navbar />}
      <div className="relative z-10">{children}</div>
      {!isGamePage && <Footer />}
    </div>
  );
}
