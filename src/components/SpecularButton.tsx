'use client';

import React, { useRef, useState, useCallback, useEffect } from 'react';
import './SpecularButton.css';

export interface SpecularButtonProps {
  children?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  radius?: number;
  tint?: string;
  tintOpacity?: number;
  blur?: number;
  textColor?: string;
  lineColor?: string;
  baseColor?: string;
  intensity?: number;
  idleIntensity?: number;
  shineSize?: number;
  shineFade?: number;
  thickness?: number;
  glow?: number;
  speed?: number;
  followMouse?: boolean;
  proximity?: number;
  autoAnimate?: boolean;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  style?: React.CSSProperties;
  href?: string;
  target?: string;
  rel?: string;
}

export default function SpecularButton({
  children = 'Get Started',
  size = 'sm',
  radius = 14,
  tint = '#ffffff',
  tintOpacity = 0.08,
  textColor = '#f4f4f5',
  lineColor = '#00d2ff',
  intensity = 1,
  idleIntensity = 0.35,
  followMouse = true,
  autoAnimate = true,
  disabled = false,
  onClick,
  className = '',
  type = 'button',
  style,
  href,
  target,
  rel,
  ...rest
}: SpecularButtonProps) {
  const elementRef = useRef<HTMLElement | null>(null);
  const [coords, setCoords] = useState<{ x: string; y: string; opacity: number }>({
    x: '50%',
    y: '50%',
    opacity: idleIntensity
  });

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (!followMouse || disabled || !elementRef.current) return;
      const rect = elementRef.current.getBoundingClientRect();
      const x = Math.round(e.clientX - rect.left);
      const y = Math.round(e.clientY - rect.top);
      setCoords({
        x: `${x}px`,
        y: `${y}px`,
        opacity: Math.min(1, Math.max(0.4, intensity))
      });
    },
    [followMouse, disabled, intensity]
  );

  const handlePointerLeave = useCallback(() => {
    setCoords({
      x: '50%',
      y: '50%',
      opacity: idleIntensity
    });
  }, [idleIntensity]);

  // Subtle idle shimmer movement
  useEffect(() => {
    if (!autoAnimate || disabled) return;
    let animId: number;
    let angle = 0;

    const loop = () => {
      if (!elementRef.current) return;
      angle = (angle + 0.012) % (Math.PI * 2);
      const xPercent = 50 + Math.cos(angle) * 35;
      const yPercent = 50 + Math.sin(angle) * 25;
      elementRef.current.style.setProperty('--mouse-x', `${xPercent.toFixed(2)}%`);
      elementRef.current.style.setProperty('--mouse-y', `${yPercent.toFixed(2)}%`);
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [autoAnimate, disabled]);

  const buttonStyle: React.CSSProperties = {
    '--sb-radius': `${radius}px`,
    '--sb-tint': tint,
    '--sb-tint-opacity': tintOpacity,
    '--sb-line-color': lineColor,
    '--sb-text-color': textColor,
    '--mouse-x': coords.x,
    '--mouse-y': coords.y,
    '--light-opacity': coords.opacity,
    ...style
  } as React.CSSProperties;

  const content = (
    <>
      <span className="specular-button__beam" aria-hidden="true" />
      <span className="specular-button__glass" aria-hidden="true" />
      <span className="specular-button__label">{children}</span>
    </>
  );

  if (href) {
    return (
      <a
        ref={elementRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={target ?? '_blank'}
        rel={rel ?? 'noopener noreferrer'}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className={`specular-button specular-button--${size}${className ? ` ${className}` : ''}`}
        style={buttonStyle}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={elementRef as React.RefObject<HTMLButtonElement>}
      type={type}
      disabled={disabled}
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`specular-button specular-button--${size}${className ? ` ${className}` : ''}`}
      style={buttonStyle}
      {...rest}
    >
      {content}
    </button>
  );
}
