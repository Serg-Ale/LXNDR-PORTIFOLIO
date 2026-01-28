"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const techStack = [
  "NEXT.JS",
  "REACT",
  "TYPESCRIPT",
  "JAVASCRIPT",
  "TAILWIND CSS",
  "RADIX UI",
  "GSAP",
  "NODE.JS",
  "PRISMA ORM",
  "NEXTAUTH",
];

export function PortfolioSkills() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    const streams: { x: number; characters: { char: string; y: number; opacity: number; speed: number }[] }[] = [];
    const CHAR_WIDTH = 12;
    const CHAR_HEIGHT = 14;
    const CHARS_PER_STREAM = 25;
    const TARGET_FPS = 45;
    const FRAME_INTERVAL = 1000 / TARGET_FPS;
    let lastFrameTime = 0;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Optimize canvas
    ctx.imageSmoothingEnabled = false;
    ctx.font = `${CHAR_HEIGHT}px 'Courier New', monospace`;

    const isMobile = window.innerWidth < 768;
    const maxStreams = isMobile ? 30 : 80; // More streams for density

    const initializeStreams = () => {
      streams.length = 0;
      const screenWidth = canvas.width;
      const screenHeight = canvas.height;
      const streamSpacing = Math.max(CHAR_WIDTH, Math.floor(screenWidth / maxStreams)); // Ensure 100% coverage

      for (let i = 0; i < maxStreams; i++) {
        const stream = {
          x: i * streamSpacing,
          characters: [] as { char: string; y: number; opacity: number; speed: number }[],
        };

        for (let j = 0; j < CHARS_PER_STREAM; j++) {
          const skill = techStack[Math.floor(Math.random() * techStack.length)];
          stream.characters.push({
            char: skill.charAt(Math.floor(Math.random() * skill.length)),
            y: -j * CHAR_HEIGHT + Math.random() * CHAR_HEIGHT,
            opacity: Math.random() * 0.8 + 0.2,
            speed: isMobile ? 1 + Math.random() : 2 + Math.random() * 3,
          });
        }

        streams.push(stream);
      }
    };

    const draw = (timestamp: number) => {
      if (timestamp - lastFrameTime < FRAME_INTERVAL) {
        animationRef.current = requestAnimationFrame(draw);
        return;
      }
      lastFrameTime = timestamp;

      const screenHeight = canvas.height;

      // Clear canvas
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, canvas.width, screenHeight);

      // Draw streams
      ctx.fillStyle = "rgba(255, 255, 255, 1)";

      streams.forEach((stream) => {
        stream.characters.forEach((char) => {
          ctx.globalAlpha = char.opacity;
          ctx.fillText(char.char, stream.x, char.y);

          // Update position
          char.y += char.speed;
          char.opacity *= 0.995; // Gradual fade

          // Reset when off screen
          if (char.y > screenHeight + CHAR_HEIGHT || char.opacity < 0.1) {
            const skill = techStack[Math.floor(Math.random() * techStack.length)];
            char.char = skill.charAt(Math.floor(Math.random() * skill.length));
            char.y = -CHAR_HEIGHT;
            char.opacity = Math.random() * 0.8 + 0.2;
          }
        });
      });

      ctx.globalAlpha = 1; // Reset alpha
      animationRef.current = requestAnimationFrame(draw);
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initializeStreams();
    };

    // Intersection Observer to pause when not visible
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animationRef.current = requestAnimationFrame(draw);
        } else {
          cancelAnimationFrame(animationRef.current);
        }
      },
      { threshold: 0.1 }
    );

    if (canvas.parentElement) {
      observer.observe(canvas.parentElement);
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resizeCanvas);
      observer.disconnect();
    };
  }, [theme]);

  return (
    <section id="skills" className="relative h-screen w-screen bg-black text-white overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0" />
    </section>
  );
}