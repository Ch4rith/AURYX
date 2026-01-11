import { useEffect, useRef, useState } from "react";

interface MousePosition {
  x: number;
  y: number;
}

const CursorGradientBackground = () => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 50, y: 50 });
  const [targetPosition, setTargetPosition] = useState<MousePosition>({ x: 50, y: 50 });
  const animationRef = useRef<number>();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setTargetPosition({ x, y });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const animate = () => {
      setMousePosition((prev) => ({
        x: prev.x + (targetPosition.x - prev.x) * 0.05,
        y: prev.y + (targetPosition.y - prev.y) * 0.05,
      }));
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [targetPosition]);

  // Idle animation - subtle organic movement
  useEffect(() => {
    const idleAnimation = setInterval(() => {
      setTargetPosition((prev) => ({
        x: prev.x + (Math.random() - 0.5) * 2,
        y: prev.y + (Math.random() - 0.5) * 2,
      }));
    }, 3000);

    return () => clearInterval(idleAnimation);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 overflow-hidden"
      style={{ background: "hsl(240 12% 4%)" }}
    >
      {/* Primary gradient orb - Royal Purple */}
      <div
        className="absolute w-[800px] h-[800px] rounded-full animate-pulse-glow"
        style={{
          background: "radial-gradient(circle, hsl(262 83% 34% / 0.4) 0%, transparent 70%)",
          left: `calc(${mousePosition.x}% - 400px)`,
          top: `calc(${mousePosition.y}% - 400px)`,
          transform: "translate3d(0, 0, 0)",
          willChange: "left, top",
        }}
      />

      {/* Secondary gradient orb - Wine Red */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full animate-pulse-glow"
        style={{
          background: "radial-gradient(circle, hsl(340 75% 22% / 0.35) 0%, transparent 70%)",
          left: `calc(${100 - mousePosition.x}% - 300px)`,
          top: `calc(${100 - mousePosition.y}% - 300px)`,
          transform: "translate3d(0, 0, 0)",
          willChange: "left, top",
          animationDelay: "-1.5s",
        }}
      />

      {/* Tertiary orb - Midnight Indigo */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full animate-pulse-glow"
        style={{
          background: "radial-gradient(circle, hsl(240 60% 20% / 0.3) 0%, transparent 70%)",
          left: `calc(${mousePosition.x * 0.7 + 15}% - 250px)`,
          top: `calc(${mousePosition.y * 0.7 + 15}% - 250px)`,
          transform: "translate3d(0, 0, 0)",
          willChange: "left, top",
          animationDelay: "-3s",
        }}
      />

      {/* Subtle noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Vignette effect */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, hsl(240 12% 4%) 80%)",
        }}
      />
    </div>
  );
};

export default CursorGradientBackground;
