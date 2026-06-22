import { useEffect, useRef } from "react";

export default function NeuralBG() {
  const ref = useRef();

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");

   const resize = () => {
  const parent = canvas.parentElement;

  canvas.width = parent.offsetWidth;
  canvas.height = parent.offsetHeight;
};

    resize();
    window.addEventListener("resize", resize);

    // Responsive node count
   const nodeCount = 18;

    let nodes = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
    }));

    function draw() {
      

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Glow effect
      ctx.shadowBlur = 12;
      ctx.shadowColor = "#00bfff";

      // Connections
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j];

          const d = Math.hypot(n.x - m.x, n.y - m.y);

          if (d < 180) {
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);

            ctx.strokeStyle = `rgba(0,191,255,${
              (1 - d / 220) * 0.35
            })`;

            ctx.lineWidth = 2;
            ctx.stroke();
          }
        }
      }

      // Nodes
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;

        if (n.x <= 0 || n.x >= canvas.width) n.vx *= -1;
        if (n.y <= 0 || n.y >= canvas.height) n.vy *= -1;

        ctx.beginPath();
        ctx.arc(n.x, n.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,191,255,0.95)";
        ctx.fill();
      });

      requestAnimationFrame(draw);
    }

    draw();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="global-neural-bg" />;
}