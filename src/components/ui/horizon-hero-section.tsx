"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

/* Correction 4: ScrollTrigger was registered and never used — scroll is handled
   by a window listener. The plugin registration is dropped rather than faked. */

const TOTAL_SECTIONS = 2;

const SECTIONS: { title: string; lines: [string, string] }[] = [
  {
    title: "Underwrite",
    lines: [
      "Price is what the paper says.",
      "Value is what the underwriting survives.",
    ],
  },
  {
    title: "Acquire",
    lines: [
      "We buy on a thesis we can defend",
      "line by line, to anyone who asks.",
    ],
  },
  {
    title: "Operate",
    lines: [
      "The return is not made at closing.",
      "It is made every month after it.",
    ],
  },
];

/* Correction 3: the supplied file was untyped JSX in a .tsx file. Typed here;
   `strict` stays on and nothing is suppressed. */
type ThreeRefs = {
  scene: THREE.Scene | null;
  camera: THREE.PerspectiveCamera | null;
  renderer: THREE.WebGLRenderer | null;
  composer: EffectComposer | null;
  bloom: UnrealBloomPass | null;
  sky: THREE.Mesh | null;
  mountains: THREE.Mesh[];
  locations: number[];
  animationId: number | null;
  targetCameraX?: number;
  targetCameraY?: number;
  targetCameraZ?: number;
};

export const Component = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const scrollProgressRef = useRef<HTMLDivElement | null>(null);

  /* Correction 2: the supplied component assigned `ref={titleRef}` inside a
     .map(), so every iteration overwrote the last and only the final section
     ever animated. Ref arrays instead. */
  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const subtitleRefs = useRef<(HTMLDivElement | null)[]>([]);

  const smoothCameraPos = useRef({ x: 0, y: 30, z: 100 });

  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [immersive, setImmersive] = useState<boolean | null>(null);
  const [introArmed, setIntroArmed] = useState(0);
  /* The side label and the scroll readout belong to the hero. They are fixed, so
     without this they float over every section below it. */
  const [chromeVisible, setChromeVisible] = useState(true);

  const threeRefs = useRef<ThreeRefs>({
    scene: null,
    camera: null,
    renderer: null,
    composer: null,
    bloom: null,
    sky: null,
    mountains: [],
    locations: [],
    animationId: null,
  });

  /* §6: the WebGL hero does not initialise under reduced motion, on small
     screens, or on low-core devices. The static field serves instead. */
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.matchMedia("(max-width: 767px)").matches;
    const weak = (navigator.hardwareConcurrency ?? 8) <= 4;
    setImmersive(!reduced && !small && !weak);
  }, []);

  useEffect(() => {
    if (immersive !== true) return;
    const refs = threeRefs.current;
    const canvas = canvasRef.current;
    if (!canvas) return;

    /* The sky must live inside the scene: EffectComposer writes an opaque
       buffer, so anything painted behind the canvas in CSS is covered. A single
       gradient plane on NormalBlending — it cannot blow out the way the additive
       nebula and star field did, and it sits below the bloom threshold. */
    const createSky = () => {
      if (!refs.scene) return;
      const geometry = new THREE.PlaneGeometry(9000, 5000);
      const material = new THREE.ShaderMaterial({
        uniforms: {
          skyTop: { value: new THREE.Color(0x090707) },
          skyBase: { value: new THREE.Color(0x150f0e) },
          glow: { value: new THREE.Color(0x6e1e2a) },
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 skyTop;
          uniform vec3 skyBase;
          uniform vec3 glow;
          varying vec2 vUv;
          void main() {
            vec3 c = mix(skyBase, skyTop, smoothstep(0.28, 1.0, vUv.y));
            float d = distance(vec2(vUv.x, vUv.y * 1.35), vec2(0.5, 0.46));
            c = mix(c, glow, smoothstep(0.42, 0.0, d) * 0.9);
            gl_FragColor = vec4(c, 1.0);
          }
        `,
        depthWrite: false,
        side: THREE.DoubleSide,
      });
      const sky = new THREE.Mesh(geometry, material);
      sky.position.z = -1500;
      sky.renderOrder = -1;
      refs.sky = sky;
      refs.scene.add(sky);
    };

    const createMountains = () => {
      if (!refs.scene) return;
      /* Ridge layers in warm near-blacks stepping toward oxblood, so the
         horizon resolves as a skyline rather than the supplied blue. */
      const layers = [
        { distance: -50, height: 60, color: 0x1e1917, opacity: 1 },
        { distance: -100, height: 80, color: 0x2a1f1d, opacity: 0.85 },
        { distance: -150, height: 100, color: 0x3d242a, opacity: 0.62 },
        { distance: -200, height: 120, color: 0x55202c, opacity: 0.42 },
      ];

      layers.forEach((layer, index) => {
        const points: THREE.Vector2[] = [];
        const segments = 50;
        for (let i = 0; i <= segments; i++) {
          const x = (i / segments - 0.5) * 1000;
          const y =
            Math.sin(i * 0.1) * layer.height +
            Math.sin(i * 0.05) * layer.height * 0.5 +
            Math.random() * layer.height * 0.2 -
            100;
          points.push(new THREE.Vector2(x, y));
        }
        points.push(new THREE.Vector2(5000, -300));
        points.push(new THREE.Vector2(-5000, -300));

        const shape = new THREE.Shape(points);
        const geometry = new THREE.ShapeGeometry(shape);
        const material = new THREE.MeshBasicMaterial({
          color: layer.color,
          transparent: true,
          opacity: layer.opacity,
          side: THREE.DoubleSide,
        });
        const mountain = new THREE.Mesh(geometry, material);
        mountain.position.z = layer.distance;
        mountain.position.y = layer.distance;
        mountain.userData = { baseZ: layer.distance, index };
        refs.scene!.add(mountain);
        refs.mountains.push(mountain);
      });
    };

    const captureLocations = () => {
      refs.locations = refs.mountains.map((m) => m.position.z);
    };

    const animate = () => {
      refs.animationId = requestAnimationFrame(animate);
      const time = Date.now() * 0.001;

      if (refs.camera && refs.targetCameraX !== undefined) {
        const k = 0.05;
        smoothCameraPos.current.x += (refs.targetCameraX - smoothCameraPos.current.x) * k;
        smoothCameraPos.current.y += (refs.targetCameraY! - smoothCameraPos.current.y) * k;
        smoothCameraPos.current.z += (refs.targetCameraZ! - smoothCameraPos.current.z) * k;

        refs.camera.position.x = smoothCameraPos.current.x + Math.sin(time * 0.1) * 2;
        refs.camera.position.y = smoothCameraPos.current.y + Math.cos(time * 0.15) * 1;
        refs.camera.position.z = smoothCameraPos.current.z;
        refs.camera.lookAt(0, 10, -600);
      }

      refs.mountains.forEach((mountain, i) => {
        const parallax = 1 + i * 0.5;
        mountain.position.x = Math.sin(time * 0.1) * 2 * parallax;
        mountain.position.y = 50 + Math.cos(time * 0.15) * 1 * parallax;
      });

      if (refs.composer) refs.composer.render();
    };

    refs.scene = new THREE.Scene();
    refs.scene.fog = new THREE.FogExp2(0x14100f, 0.00025);

    refs.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      2000,
    );
    refs.camera.position.z = 100;
    refs.camera.position.y = 20;

    refs.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    refs.renderer.setSize(window.innerWidth, window.innerHeight);
    refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    refs.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    refs.renderer.toneMappingExposure = 0.5;

    refs.composer = new EffectComposer(refs.renderer);
    refs.composer.addPass(new RenderPass(refs.scene, refs.camera));
    const bloom = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.26,
      0.6,
      0.92,
    );
    refs.composer.addPass(bloom);
    refs.bloom = bloom;

    createSky();
    createMountains();
    captureLocations();
    animate();
    setIsReady(true);

    const handleResize = () => {
      if (!refs.camera || !refs.renderer || !refs.composer) return;
      refs.camera.aspect = window.innerWidth / window.innerHeight;
      refs.camera.updateProjectionMatrix();
      refs.renderer.setSize(window.innerWidth, window.innerHeight);
      refs.composer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      if (refs.animationId) cancelAnimationFrame(refs.animationId);
      window.removeEventListener("resize", handleResize);

      if (refs.sky) {
        refs.sky.geometry.dispose();
        (refs.sky.material as THREE.Material).dispose();
        refs.sky = null;
      }
      refs.mountains.forEach((m) => {
        m.geometry.dispose();
        (m.material as THREE.Material).dispose();
      });
      /* B05: the composer and the bloom pass were never disposed in the
         supplied component. They are now — the mobile fallback unmounts this
         tree, so the leak was reachable. */
      refs.bloom?.dispose();
      refs.composer?.dispose();
      refs.renderer?.dispose();

      refs.mountains = [];
      refs.locations = [];
    };
  }, [immersive]);

  /* Entrance choreography. Runs in both modes; the static field does not need
     WebGL to be ready, so it keys off `immersive` resolving rather than isReady. */
  useEffect(() => {
    if (immersive === null) return;
    if (immersive && !isReady) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = [menuRef.current, scrollProgressRef.current].filter(Boolean);
    gsap.set(targets, { visibility: "visible" });

    if (reduced) return;

    /* Browsers suspend requestAnimationFrame in a hidden tab, which stops GSAP's
       ticker. A `from` tween applies its start values immediately, so running the
       intro while hidden strands the headline at opacity 0 until the tab is
       looked at. The resting state stays visible; the intro waits for visibility. */
    if (document.visibilityState !== "visible") {
      const onVisible = () => {
        if (document.visibilityState === "visible") {
          document.removeEventListener("visibilitychange", onVisible);
          setIntroArmed((n) => n + 1);
        }
      };
      document.addEventListener("visibilitychange", onVisible);
      return () => document.removeEventListener("visibilitychange", onVisible);
    }

    const tl = gsap.timeline();
    if (menuRef.current) {
      tl.from(menuRef.current, { x: -60, opacity: 0, duration: 1, ease: "power3.out" });
    }

    const firstTitle = titleRefs.current[0];
    if (firstTitle) {
      const chars = firstTitle.querySelectorAll(".title-char");
      if (chars.length) {
        tl.from(
          chars,
          { yPercent: 120, opacity: 0, duration: 1.5, stagger: 0.05, ease: "power4.out" },
          "-=0.5",
        );
      }
    }

    const firstSubtitle = subtitleRefs.current[0];
    if (firstSubtitle) {
      const lines = firstSubtitle.querySelectorAll(".subtitle-line");
      if (lines.length) {
        tl.from(lines, { y: 40, opacity: 0, duration: 1, stagger: 0.2, ease: "power3.out" }, "-=0.8");
      }
    }

    if (scrollProgressRef.current) {
      tl.from(scrollProgressRef.current, { opacity: 0, y: 40, duration: 1, ease: "power2.out" }, "-=0.5");
    }

    return () => {
      tl.kill();
    };
  }, [isReady, immersive, introArmed]);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(window.scrollY / maxScroll, 1) : 0;
      setScrollProgress(progress);

      const newSection = Math.min(Math.floor(progress * TOTAL_SECTIONS), TOTAL_SECTIONS);
      setCurrentSection(newSection);
      setChromeVisible(window.scrollY < SECTIONS.length * window.innerHeight - window.innerHeight * 0.35);

      const refs = threeRefs.current;
      /* Correction 5: handleScroll() fires immediately on mount and can run
         before the scene exists. Everything below is guarded. */
      if (!refs.camera) return;

      const sectionProgress = (progress * TOTAL_SECTIONS) % 1;
      const cameraPositions = [
        { x: 0, y: 30, z: 300 },
        { x: 0, y: 40, z: -50 },
        { x: 0, y: 50, z: -700 },
      ];
      const currentPos = cameraPositions[newSection] ?? cameraPositions[0];
      const nextPos = cameraPositions[newSection + 1] ?? currentPos;

      refs.targetCameraX = currentPos.x + (nextPos.x - currentPos.x) * sectionProgress;
      refs.targetCameraY = currentPos.y + (nextPos.y - currentPos.y) * sectionProgress;
      refs.targetCameraZ = currentPos.z + (nextPos.z - currentPos.z) * sectionProgress;

      if (refs.locations.length !== refs.mountains.length) return;
      refs.mountains.forEach((mountain, i) => {
        const speed = 1 + i * 0.9;
        const baseZ = (mountain.userData as { baseZ: number }).baseZ;
        const targetZ = baseZ + window.scrollY * speed * 0.5;
        void targetZ;
        mountain.position.z = progress > 0.7 ? 600000 : refs.locations[i];
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* B01: the supplied component defined this and never called it, so the
     headline stagger animated an empty set. It is called now. */
  const splitTitle = (text: string) =>
    text.split("").map((char, i) => (
      <span key={`${char}-${i}`} className="title-char">
        {char === " " ? " " : char}
      </span>
    ));

  return (
    <div ref={containerRef} className="hero-container">
      <div className="hero-sky" aria-hidden="true" />
      {immersive === false ? null : (
        <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />
      )}

      <div
        ref={menuRef}
        className="side-menu"
        style={{ visibility: "hidden", opacity: chromeVisible ? 1 : 0, pointerEvents: chromeVisible ? "auto" : "none" }}
      >
        <div className="menu-icon" aria-hidden="true">
          <span /> <span /> <span />
        </div>
        <div className="vertical-text">Maryland &amp; the Mid-Atlantic</div>
      </div>

      <div className="hero-content">
        <h1
          ref={(el) => {
            titleRefs.current[0] = el;
          }}
          className="hero-title"
        >
          {splitTitle(SECTIONS[0].title)}
        </h1>
        <div
          ref={(el) => {
            subtitleRefs.current[0] = el;
          }}
          className="hero-subtitle cosmos-subtitle"
        >
          <p className="subtitle-line">{SECTIONS[0].lines[0]}</p>
          <p className="subtitle-line">{SECTIONS[0].lines[1]}</p>
        </div>
      </div>

      <div
        ref={scrollProgressRef}
        className="scroll-progress"
        style={{ visibility: "hidden", opacity: chromeVisible ? 1 : 0, pointerEvents: chromeVisible ? "auto" : "none" }}
      >
        <div className="scroll-text">Scroll</div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${scrollProgress * 100}%` }} />
        </div>
        {/* B02: the supplied counter read 02 / 02 at the end because it counted
            from zero against a total of two. Reads 01/03 .. 03/03 now. */}
        <div className="section-counter">
          {String(currentSection + 1).padStart(2, "0")} /{" "}
          {String(SECTIONS.length).padStart(2, "0")}
        </div>
      </div>

      <div className="scroll-sections">
        {SECTIONS.slice(1).map((section, i) => (
          <section key={section.title} className="content-section">
            <h2
              ref={(el) => {
                titleRefs.current[i + 1] = el;
              }}
              className="hero-title"
            >
              {splitTitle(section.title)}
            </h2>
            <div
              ref={(el) => {
                subtitleRefs.current[i + 1] = el;
              }}
              className="hero-subtitle cosmos-subtitle"
            >
              <p className="subtitle-line">{section.lines[0]}</p>
              <p className="subtitle-line">{section.lines[1]}</p>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};
