"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const isHovering = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth < 768) return;

    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    if (!cursor || !cursorDot) return;

    const onMove = (e: MouseEvent) => {
      posRef.current.targetX = e.clientX;
      posRef.current.targetY = e.clientY;
    };

    const onEnterInteractive = () => {
      isHovering.current = true;
      cursor.style.transform = `translate(${posRef.current.x - 30}px, ${posRef.current.y - 30}px) scale(2)`;
      cursor.style.borderColor = "rgba(205, 127, 50, 0.6)";
    };

    const onLeaveInteractive = () => {
      isHovering.current = false;
      cursor.style.borderColor = "rgba(205, 127, 50, 0.3)";
    };

    let animId: number;
    const animate = () => {
      const { targetX, targetY } = posRef.current;
      posRef.current.x += (targetX - posRef.current.x) * 0.15;
      posRef.current.y += (targetY - posRef.current.y) * 0.15;

      const size = isHovering.current ? 60 : 40;
      cursor.style.transform = `translate(${posRef.current.x - size / 2}px, ${posRef.current.y - size / 2}px) scale(${isHovering.current ? 2 : 1})`;
      cursorDot.style.transform = `translate(${targetX - 4}px, ${targetY - 4}px)`;

      animId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    document.querySelectorAll("a, button, [data-cursor-hover]").forEach((el) => {
      el.addEventListener("mouseenter", onEnterInteractive);
      el.addEventListener("mouseleave", onLeaveInteractive);
    });

    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-[rgba(205,127,50,0.3)] pointer-events-none z-[9999] hidden md:block mix-blend-difference"
        style={{ transition: "width 0.3s, height 0.3s, border-color 0.3s" }}
      />
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#CD7F32] pointer-events-none z-[9999] hidden md:block"
      />
    </>
  );
}
