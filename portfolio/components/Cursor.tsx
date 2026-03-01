"use client";
import { useEffect, useRef } from "react";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isDesktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!isDesktop) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX - 6 + "px";
      cursor.style.top = mouseY - 6 + "px";
    };

    const animate = () => {
      followerX += (mouseX - followerX - 18) * 0.12;
      followerY += (mouseY - followerY - 18) * 0.12;
      follower.style.left = followerX + "px";
      follower.style.top = followerY + "px";
      requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", onMove);
    animate();

    return () => {
      document.removeEventListener("mousemove", onMove);
    };
  }, []);

  if (typeof window !== "undefined") {
    const isDesktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!isDesktop) return null;
  }

  return (
    <>
      <div ref={cursorRef} className="cursor" />
      <div ref={followerRef} className="cursor-follower" />
    </>
  );
}