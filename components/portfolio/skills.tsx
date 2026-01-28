"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SiNextdotjs, SiReact, SiTypescript, SiJavascript, SiTailwindcss, SiNodedotjs, SiPrisma, SiGit, SiGithub, SiFigma, SiJira, SiBitbucket, SiJest, SiExpress, SiSpring, SiPostgresql, SiMysql } from "react-icons/si";
import { Box, Zap, Shield, Brain, Terminal, Code, Database, GitBranch, CheckCircle, Server, Globe } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

interface SkillGroup {
  title: string;
  skills: Skill[];
}

const skillGroups: SkillGroup[] = [
  {
    title: "Frontend Frameworks",
    skills: [
      {
        name: "NEXT.JS",
        icon: SiNextdotjs as React.ComponentType<{ className?: string }>,
        description: "A React framework for production-grade web applications with server-side rendering and static site generation."
      },
      {
        name: "REACT",
        icon: SiReact as React.ComponentType<{ className?: string }>,
        description: "A JavaScript library for building user interfaces with reusable components and efficient rendering."
      },
      {
        name: "REACT QUERY",
        icon: Zap,
        description: "Powerful data synchronization for React applications with caching, background updates, and error handling."
      },
      {
        name: "WEB COMPONENTS",
        icon: Code,
        description: "Reusable custom elements for building web applications with native browser support."
      }
    ]
  },
  {
    title: "Programming Languages",
    skills: [
      {
        name: "TYPESCRIPT",
        icon: SiTypescript as React.ComponentType<{ className?: string }>,
        description: "A strongly typed superset of JavaScript that adds static typing for better code reliability."
      },
      {
        name: "JAVASCRIPT",
        icon: SiJavascript as React.ComponentType<{ className?: string }>,
        description: "The programming language of the web, enabling interactive and dynamic web applications."
      },
      {
        name: "JAVA",
        icon: Code,
        description: "A versatile, object-oriented programming language for enterprise applications and Android development."
      },
      {
        name: "C",
        icon: Code,
        description: "A low-level programming language for system programming, embedded systems, and performance-critical applications."
      }
    ]
  },
  {
    title: "Styling & UI",
    skills: [
      {
        name: "TAILWIND CSS",
        icon: SiTailwindcss as React.ComponentType<{ className?: string }>,
        description: "A utility-first CSS framework for rapidly building custom user interfaces."
      },
      {
        name: "RADIX UI",
        icon: Box,
        description: "A headless UI component library that provides accessible and customizable building blocks."
      }
    ]
  },
  {
    title: "Animation",
    skills: [
      {
        name: "GSAP",
        icon: Zap,
        description: "A powerful JavaScript animation library for creating high-performance, professional-grade animations."
      }
    ]
  },
  {
    title: "Backend & Runtime",
    skills: [
      {
        name: "NODE.JS",
        icon: SiNodedotjs as React.ComponentType<{ className?: string }>,
        description: "A JavaScript runtime built on Chrome's V8 engine for server-side development."
      },
      {
        name: "NESTJS",
        icon: Server,
        description: "A progressive Node.js framework for building efficient, scalable server-side applications."
      },
      {
        name: "EXPRESS.JS",
        icon: SiExpress as React.ComponentType<{ className?: string }>,
        description: "A minimal and flexible Node.js web application framework for building APIs and web applications."
      },
      {
        name: "SPRING BOOT",
        icon: SiSpring as React.ComponentType<{ className?: string }>,
        description: "A Java framework for building production-ready applications with dependency injection and microservices support."
      },
      {
        name: "TRPC",
        icon: Code,
        description: "End-to-end type-safe APIs for TypeScript applications with automatic code generation."
      },
      {
        name: "REST APIs",
        icon: Globe,
        description: "Designing and implementing RESTful APIs for scalable web services and data exchange."
      }
    ]
  },
  {
    title: "Auth & Security",
    skills: [
      {
        name: "NEXTAUTH",
        icon: Shield,
        description: "Complete open source authentication solution for Next.js applications."
      },
      {
        name: "JWT",
        icon: Shield,
        description: "Token-based authentication for secure API access and user session management."
      }
    ]
  },
  {
    title: "Databases",
    skills: [
      {
        name: "POSTGRESQL",
        icon: SiPostgresql as React.ComponentType<{ className?: string }>,
        description: "An advanced open-source relational database with robust features and extensibility."
      },
      {
        name: "MYSQL",
        icon: SiMysql as React.ComponentType<{ className?: string }>,
        description: "A popular open-source relational database management system for web applications."
      },
      {
        name: "PRISMA ORM",
        icon: SiPrisma as React.ComponentType<{ className?: string }>,
        description: "A next-generation ORM for TypeScript and Node.js with type-safe database access."
      }
    ]
  },
  {
    title: "Testing & Quality",
    skills: [
      {
        name: "JUNIT",
        icon: CheckCircle,
        description: "A unit testing framework for Java applications to ensure code reliability and quality."
      },
      {
        name: "JEST",
        icon: SiJest as React.ComponentType<{ className?: string }>,
        description: "A JavaScript testing framework with a focus on simplicity and support for large web applications."
      },
      {
        name: "UNIT TESTING",
        icon: CheckCircle,
        description: "Writing and maintaining automated tests to verify individual units of code functionality."
      },
      {
        name: "SOLID DESIGN PRINCIPLES",
        icon: Shield,
        description: "Object-oriented design principles for writing maintainable, scalable, and robust software."
      }
    ]
  },
  {
    title: "Tools & Collaboration",
    skills: [
      {
        name: "GIT",
        icon: SiGit as React.ComponentType<{ className?: string }>,
        description: "Distributed version control system for tracking changes in source code during software development."
      },
      {
        name: "GITHUB",
        icon: SiGithub as React.ComponentType<{ className?: string }>,
        description: "Web-based platform for version control, collaboration, and code hosting using Git."
      },
      {
        name: "GITFLOW",
        icon: GitBranch,
        description: "A Git workflow model for managing branches and releases in software development teams."
      },
      {
        name: "JIRA",
        icon: SiJira as React.ComponentType<{ className?: string }>,
        description: "Project management tool for tracking issues, bugs, and agile development workflows."
      },
      {
        name: "BITBUCKET",
        icon: SiBitbucket as React.ComponentType<{ className?: string }>,
        description: "Git repository management solution with integrated CI/CD and collaboration features."
      },
      {
        name: "FIGMA",
        icon: SiFigma as React.ComponentType<{ className?: string }>,
        description: "Collaborative interface design tool for creating, prototyping, and sharing user interfaces."
      },
      {
        name: "AGILE METHODOLOGIES",
        icon: CheckCircle,
        description: "Iterative development approach focusing on flexibility, collaboration, and customer feedback."
      },
      {
        name: "SCRUM",
        icon: CheckCircle,
        description: "Agile framework for managing complex projects with sprints, roles, and ceremonies."
      },
      {
        name: "KANBAN",
        icon: CheckCircle,
        description: "Visual workflow management method for optimizing team processes and limiting work-in-progress."
      }
    ]
  },
  {
    title: "AI & Development Tools",
    skills: [
      {
        name: "GITHUB COPILOT",
        icon: Brain,
        description: "AI-powered coding assistant that suggests code completions and entire functions in real-time."
      },
      {
        name: "NEOVIM",
        icon: Terminal,
        description: "An extensible text editor built on Vim, optimized for productivity and customization."
      },
      {
        name: "OPENCODE",
        icon: Code,
        description: "An interactive CLI tool for software engineering tasks, powered by advanced AI models."
      }
    ]
  }
];

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
  "JAVA",
  "C",
  "REACT QUERY",
  "WEB COMPONENTS",
  "NESTJS",
  "EXPRESS.JS",
  "SPRING BOOT",
  "TRPC",
  "REST APIs",
  "JWT",
  "POSTGRESQL",
  "MYSQL",
  "JUNIT",
  "JEST",
  "UNIT TESTING",
  "SOLID",
  "GIT",
  "GITHUB",
  "GITFLOW",
  "JIRA",
  "BITBUCKET",
  "FIGMA",
  "AGILE",
  "SCRUM",
  "KANBAN",
  "GITHUB COPILOT",
  "NEOVIM",
  "OPENCODE",
];

export function PortfolioSkills() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const cardsRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { theme } = useTheme();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const streams: { x: number; characters: { char: string; y: number; opacity: number; speed: number }[] }[] = [];
    const CHAR_WIDTH = 12;
    const CHAR_HEIGHT = 14;
    const CHARS_PER_STREAM = 12; // Reduced from 25
    const TARGET_FPS = 60;
    const FRAME_INTERVAL = 1000 / TARGET_FPS;
    let lastFrameTime = 0;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Optimize canvas
    ctx.imageSmoothingEnabled = false;
    ctx.font = `${CHAR_HEIGHT}px 'Courier New', monospace`;

    const isMobile = window.innerWidth < 768;
    const maxStreams = isMobile ? 10 : 15; // Dramatically reduced density

    const initializeStreams = () => {
      streams.length = 0;
      const screenWidth = canvas.width;
      const screenHeight = canvas.height;
      const streamSpacing = Math.max(CHAR_WIDTH, Math.floor(screenWidth / maxStreams));

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
            speed: isMobile ? 1.5 + Math.random() : 3 + Math.random() * 2, // Optimized speed
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

      // Clear canvas with black background
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, canvas.width, screenHeight);

      // Draw streams
      streams.forEach((stream) => {
        stream.characters.forEach((char) => {
          // All characters are white in the skills section
          ctx.fillStyle = "rgba(255, 255, 255, 1)";
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
      const section = sectionRef.current;
      if (section) {
        canvas.width = section.clientWidth;
        canvas.height = section.clientHeight;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    // Start animation immediately and continuously
    const startAnimation = () => {
      if (!animationRef.current) {
        animationRef.current = requestAnimationFrame(draw);
      }
    };

    resizeCanvas(); // Set initial dimensions
    window.addEventListener("resize", resizeCanvas);

    // Start animation immediately without scroll-based controls
    startAnimation();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [theme]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // GSAP card entrance animations
    if (!cardsRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-skill-card]",
        {
          opacity: 0,
          y: 100,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top center+=100",
            end: "bottom center",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Group title animations
      gsap.fromTo(
        "[data-skill-group]",
        {
          opacity: 0,
          x: -50,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top center+=50",
            end: "bottom center",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, cardsRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="relative min-h-screen w-screen bg-black text-white overflow-hidden">
      {/* Matrix Background Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 -z-10 pointer-events-none" />

      {/* Skills Cards */}
      <div ref={cardsRef} className="relative z-10 py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black mb-4">TECHNICAL SKILLS</h2>
            <p className="text-lg md:text-xl opacity-80 max-w-2xl mx-auto">
              Technologies and tools I use to build exceptional digital experiences
            </p>
          </div>

          <div className="space-y-16">
            {skillGroups.map((group, groupIndex) => (
              <div key={group.title} data-skill-group className="space-y-8">
                <h3 className="text-2xl md:text-3xl font-bold text-center">{group.title}</h3>
                {group.skills.length <= 2 || isMobile ? (
                  <div className="flex flex-col md:flex-row md:justify-center gap-4 md:gap-6">
                    {group.skills.map((skill, skillIndex) => {
                      const Icon = skill.icon;
                      return (
                        <Card
                          key={skill.name}
                          data-skill-card
                          className="border-4 border-foreground bg-card/90 backdrop-blur-sm text-card-foreground p-6 shadow-brutalist hover:shadow-brutalist-lg transition-all duration-300 hover:-translate-y-2 data-magnetic group flex-shrink-0 w-full md:w-80"
                        >
                          <CardHeader className="pb-4">
                            <div className="flex items-center gap-4">
                              <Icon className="w-12 h-12 text-foreground group-hover:scale-110 transition-transform" />
                              <CardTitle className="text-xl font-bold">{skill.name}</CardTitle>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm leading-relaxed opacity-80">{skill.description}</p>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                ) : (
                  <Swiper
                    modules={[Autoplay]}
                    spaceBetween={24}
                    slidesPerView={2}
                    breakpoints={{
                      1024: { slidesPerView: 3 },
                    }}
                    loop={true}
                    autoplay={{ delay: 2500, disableOnInteraction: false }}
                    className="w-full"
                  >
                    {group.skills.map((skill, skillIndex) => {
                      const Icon = skill.icon;
                      return (
                        <SwiperSlide key={skill.name}>
                          <Card
                            key={skill.name}
                            data-skill-card
                            className="border-4 border-foreground bg-card/90 backdrop-blur-sm text-card-foreground p-6 shadow-brutalist hover:shadow-brutalist-lg transition-all duration-300 hover:-translate-y-2 data-magnetic group flex-shrink-0 w-full"
                          >
                            <CardHeader className="pb-4">
                              <div className="flex items-center gap-4">
                                <Icon className="w-12 h-12 text-foreground group-hover:scale-110 transition-transform" />
                                <CardTitle className="text-xl font-bold">{skill.name}</CardTitle>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm leading-relaxed opacity-80">{skill.description}</p>
                            </CardContent>
                          </Card>
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}