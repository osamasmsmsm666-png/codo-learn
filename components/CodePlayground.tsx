
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const starterCode = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-height: 100vh;
  font-family: Arial, sans-serif;
  overflow: hidden;
  background: radial-gradient(circle, #ffffff, #f1edff);
}

.scene {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 24px;
}

.glow {
  position: absolute;
  width: 220px;
  height: 220px;
  border-radius: 50%;
  background: linear-gradient(135deg, #869CFF, #E2A3FF);
  filter: blur(60px);
  animation: glow 3s ease-in-out infinite alternate;
}

.orbit {
  position: absolute;
  width: 260px;
  height: 260px;
  border: 1px solid #869CFF80;
  border-radius: 50%;
  animation: rotate 12s linear infinite;
}

.orbit::before {
  content: "";
  position: absolute;
  top: 25px;
  left: 30px;
  width: 12px;
  height: 12px;
  background: #869CFF;
  border-radius: 50%;
  box-shadow: 0 0 20px #869CFF;
}

.orbit::after {
  content: "";
  position: absolute;
  right: 20px;
  bottom: 40px;
  width: 10px;
  height: 10px;
  background: #E2A3FF;
  border-radius: 50%;
  box-shadow: 0 0 20px #E2A3FF;
}

.logo-box {
  position: relative;
  z-index: 2;
  width: min(82%, 360px);
  opacity: 0;
  transform: translateY(35px) scale(.6);
  animation: reveal 1.2s cubic-bezier(.2,.8,.2,1) forwards;
}

.logo {
  display: block;
  width: 100%;
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 15px 25px #869CFF40);
  animation: float 3s ease-in-out infinite 1.2s;
}

.caption {
  position: relative;
  z-index: 2;
  margin-top: 30px;
  color: #20243A;
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 3px;
  text-align: center;
  opacity: 0;
  animation: caption 1s ease forwards 1s;
}

.line {
  position: relative;
  z-index: 2;
  height: 3px;
  width: 0;
  margin-top: 18px;
  border-radius: 20px;
  background: linear-gradient(90deg, #869CFF, #E2A3FF);
  animation: line 1s ease forwards 1.3s;
}

@keyframes reveal {
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
}

@keyframes rotate {
  to { transform: rotate(360deg); }
}

@keyframes glow {
  from { opacity: .25; transform: scale(.9); }
  to { opacity: .55; transform: scale(1.2); }
}

@keyframes caption {
  to { opacity: .8; }
}

@keyframes line {
  to { width: 100px; }
}

@media (max-width: 420px) {
  .orbit {
    width: 220px;
    height: 220px;
  }

  .caption {
    font-size: 10px;
    letter-spacing: 2px;
  }
}
</style>
</head>

<body>
  <main class="scene">
    <div class="glow"></div>
    <div class="orbit"></div>

    <div class="logo-box">
      <img
        class="logo"
        src="/logoos.png"
        alt="Codo Learn Logo"
      />
    </div>

    <div class="line"></div>
  </main>
</body>
</html>`;

export default function CodePlayground() {
  const [code, setCode] = useState(starterCode);
  const [output, setOutput] = useState("");
  const [hasRun, setHasRun] = useState(false);

  function runCode() {
    setOutput(code);
    setHasRun(true);
  }

  function resetCode() {
    setCode(starterCode);
    setOutput("");
    setHasRun(false);
  }

  return (
    <section className="w-full px-3 py-8 sm:px-5">
      <motion.div
        layout
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-[#869CFF]/20 bg-[#171A2B] shadow-2xl shadow-[#869CFF]/15"
      >
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-[#FF7A90]" />
              <span className="h-3 w-3 rounded-full bg-[#FFD479]" />
              <span className="h-3 w-3 rounded-full bg-[#91E6C1]" />
            </div>

            <span className="text-sm font-bold text-white">
              Codo Playground
            </span>
          </div>

          <span className="rounded-lg bg-[#869CFF]/15 px-3 py-1.5 text-xs font-semibold text-[#C5CCFF]">
            HTML · CSS · JS
          </span>
        </div>

        {/* Editor and Preview */}
        <div
          className={`grid ${hasRun ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
            }`}
        >
          {/* Code Editor */}
          <div className="min-w-0 border-b border-white/10 md:border-b-0 md:border-r">
            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#E2A3FF]">
                Code Editor
              </span>

              <span className="text-xs text-white/40">
                index.html
              </span>
            </div>

            <textarea
              aria-label="HTML code editor"
              spellCheck={false}
              value={code}
              onChange={(event) => setCode(event.target.value)}
              className="block h-[300px] w-full resize-y bg-transparent px-4 py-3 font-mono text-xs leading-6 text-[#D9DDF5] outline-none focus:ring-1 focus:ring-inset focus:ring-[#869CFF] sm:h-[340px]" />

            <div className="flex flex-wrap gap-3 border-t border-white/10 p-4">
              <button
                type="button"
                onClick={runCode}
                className="rounded-xl bg-gradient-to-r from-[#869CFF] to-[#E2A3FF] px-5 py-3 text-sm font-black text-[#20243A] transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                ▶ {hasRun ? "Run Again" : "Run Code"}
              </button>

              <button
                type="button"
                onClick={resetCode}
                className="rounded-xl border border-white/15 px-4 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/10"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Preview appears only after Run */}
          <AnimatePresence initial={false}>
            {hasRun && (
              <motion.div
                key="preview"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.4 }}
                className="flex min-w-0 flex-col bg-[#F6F5FC]"
              >
                <div className="flex items-center justify-between border-b border-[#20243A]/10 px-4 py-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#5F6785]">
                    Live Preview
                  </span>

                  <span className="rounded-full bg-[#DDF8EC] px-3 py-1 text-xs font-semibold text-[#227B58]">
                    Running
                  </span>
                </div>

                <div className="flex min-h-[360px] flex-1 p-3 sm:min-h-[420px]">
                  <iframe
                    key={output}
                    title="Codo Learn animation preview"
                    sandbox="allow-scripts"
                    srcDoc={output}
                    className="min-h-[340px] w-full flex-1 rounded-xl border border-[#869CFF]/20 bg-white sm:min-h-[400px]"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 px-5 py-3">
          <p className="text-xs text-white/50">
            Learn by building. Build by experimenting.
          </p>

          <span className="text-xs font-bold text-[#E2A3FF]">
            Codo Learn
          </span>
        </div>
      </motion.div>
    </section>
  );
}
