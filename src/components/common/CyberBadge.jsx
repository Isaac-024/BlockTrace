import React from 'react';

export function CyberBadge({
  children,
  variant = 'cyan', // 'cyan' | 'green' | 'rose' | 'amber' | 'slate'
  size = 'sm',
  className = '',
  icon: Icon
}) {
  const variantStyles = {
    cyan: "bg-cyan-950/80 text-cyber-cyan border border-cyber-cyan/50 shadow-[0_0_8px_rgba(0,245,212,0.2)]",
    green: "bg-emerald-950/80 text-emerald-300 border border-emerald-500/50 shadow-[0_0_8px_rgba(16,185,129,0.2)]",
    rose: "bg-rose-950/80 text-rose-300 border border-rose-500/50 shadow-[0_0_8px_rgba(244,63,94,0.2)]",
    amber: "bg-amber-950/80 text-amber-300 border border-amber-500/50 shadow-[0_0_8px_rgba(245,158,11,0.2)]",
    slate: "bg-slate-800/80 text-slate-300 border border-slate-600/50"
  };

  const sizeStyles = {
    xs: "text-[9px] px-1.5 py-0.5 font-code uppercase tracking-wider",
    sm: "text-[10px] px-2 py-0.5 font-pixel uppercase tracking-widest",
    md: "text-xs px-2.5 py-1 font-pixel uppercase tracking-widest"
  };

  return (
    <span className={`inline-flex items-center gap-1.5 select-none ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}>
      {Icon && <Icon className="w-3 h-3 shrink-0" />}
      <span>{children}</span>
    </span>
  );
}
