import React from 'react';
import { sound } from '../../utils/soundSynthesizer';

export function VoxelButton({
  children,
  onClick,
  variant = 'cyan', // 'cyan' | 'green' | 'rose' | 'amber' | 'dark'
  size = 'md',     // 'sm' | 'md' | 'lg'
  disabled = false,
  className = '',
  icon: Icon,
  type = 'button',
  ...props
}) {
  const handleClick = (e) => {
    if (disabled) return;
    sound.playClick();
    if (onClick) onClick(e);
  };

  const handleMouseEnter = () => {
    if (!disabled) {
      sound.playClick();
    }
  };

  const baseStyles = "voxel-btn font-pixel text-center inline-flex items-center justify-center tracking-wider uppercase transition-all duration-75 select-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-cyber-950";

  const sizeStyles = {
    sm: "text-[10px] px-3 py-1.5 gap-1.5",
    md: "text-xs px-5 py-2.5 gap-2",
    lg: "text-sm px-7 py-3.5 gap-2.5"
  };

  const variantStyles = {
    cyan: "bg-cyber-cyan text-cyber-950 border-t-2 border-l-2 border-white/60 border-r-4 border-b-4 border-cyan-800 shadow-[3px_3px_0px_#042f2e] hover:bg-cyber-cyan-bright hover:shadow-[4px_4px_0px_#042f2e] active:shadow-[1px_1px_0px_#042f2e] focus:ring-cyber-cyan",
    green: "bg-emerald-500 text-cyber-950 border-t-2 border-l-2 border-white/60 border-r-4 border-b-4 border-emerald-800 shadow-[3px_3px_0px_#064e3b] hover:bg-emerald-400 hover:shadow-[4px_4px_0px_#064e3b] active:shadow-[1px_1px_0px_#064e3b] focus:ring-emerald-400",
    rose: "bg-rose-500 text-white border-t-2 border-l-2 border-rose-300/60 border-r-4 border-b-4 border-rose-900 shadow-[3px_3px_0px_#4c0519] hover:bg-rose-400 hover:shadow-[4px_4px_0px_#4c0519] active:shadow-[1px_1px_0px_#4c0519] focus:ring-rose-500",
    amber: "bg-amber-400 text-cyber-950 border-t-2 border-l-2 border-white/60 border-r-4 border-b-4 border-amber-800 shadow-[3px_3px_0px_#451a03] hover:bg-amber-300 hover:shadow-[4px_4px_0px_#451a03] active:shadow-[1px_1px_0px_#451a03] focus:ring-amber-400",
    dark: "bg-voxel-card text-slate-200 border-t-2 border-l-2 border-slate-600 border-r-4 border-b-4 border-cyber-950 shadow-[3px_3px_0px_#05080e] hover:bg-slate-700 hover:text-white hover:border-slate-500 active:shadow-[1px_1px_0px_#05080e] focus:ring-slate-400"
  };

  const disabledStyles = "opacity-45 cursor-not-allowed pointer-events-none filter grayscale";

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      className={`
        ${baseStyles}
        ${sizeStyles[size]}
        ${disabled ? disabledStyles : variantStyles[variant]}
        ${className}
      `}
      {...props}
    >
      {Icon && <Icon className={size === 'sm' ? "w-3 h-3" : size === 'lg' ? "w-5 h-5" : "w-4 h-4"} />}
      <span>{children}</span>
    </button>
  );
}
