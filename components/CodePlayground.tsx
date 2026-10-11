
"use client";

import { useState } from "react";
import { motion } from "motion/react";

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
        <div className="grid md:grid-cols-2">
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
              className="block h-[320px] w-full resize-y bg-transparent px-4 py-3 font-mono text-xs leading-6 text-[#D9DDF5] outline-none focus:ring-1 focus:ring-inset focus:ring-[#869CFF] sm:h-[380px]"
            />

            <div className="flex flex-wrap gap-3 border-t border-white/10 p-4">
              <button
                type="button"
                onClick={runCode}
                className="rounded-xl bg-gradient-to-r from-[#869CFF] to-[#E2A3FF] px-5 py-3 text-sm font-black text-[#20243A] transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                ▶ Run Code
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

          {/* Preview */}
          <div className="flex min-w-0 flex-col bg-[#F6F5FC]">
            <div className="flex items-center justify-between border-b border-[#20243A]/10 px-4 py-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#5F6785]">
                Live Preview
              </span>

              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${hasRun
                ? "bg-[#DDF8EC] text-[#227B58]"
                : "bg-white text-[#7B829D]"
                }`}>
                {hasRun ? "Running" : "Ready to run"}
              </span>
            </div>

            <div className="flex min-h-[360px] flex-1 p-3 sm:min-h-[420px]">
              {output ? (
                <iframe
                  key={output}
                  title="Codo Learn logo animation"
                  sandbox="allow-scripts"
                  srcDoc={output}
                  className="min-h-[340px] w-full flex-1 rounded-xl border border-[#869CFF]/20 bg-white sm:min-h-[400px]"
                />
              ) : (
                <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-[#869CFF]/30 px-5 py-10 text-center">
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#869CFF] to-[#E2A3FF] text-2xl font-black text-white"
                  >
                    C
                  </motion.div>

                  <h3 className="text-lg font-black text-[#20243A]">
                    Bring Your Ideas to Life
                  </h3>

                  <p className="mt-2 max-w-xs text-sm leading-6 text-[#7B829D]">
                    Press Run Code to see the Codo Learn logo animation.
                  </p>
                </div>
              )}
            </div>
          </div>
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
