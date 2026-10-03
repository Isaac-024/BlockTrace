import React from 'react';

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
    if (onClick) onClick(e);
  };

  const baseStyles = "voxel-btn font-pixel text-center inline-flex items-center justify-center tracking-wider uppercase transition-all duration-75 select-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-cyber-950";

  const sizeStyles = {
    sm: "text-[10px] px-3 py-1.5 gap-1.5",
    md: "text-xs px-5 py-2.5 gap-2",
    lg: "text-sm px-7 py-3.5 gap-2.5"
  };

  const variantStyles = {
    cyan: "bg-cyber-cyan text-cyber-950 border-t-2 border-l-2 border-r-4 border-b-4 border-t-white/60 border-l-white/60 border-r-cyan-800 border-b-cyan-800 shadow-[3px_3px_0px_#042f2e] hover:bg-cyber-cyan-bright hover:shadow-[4px_4px_0px_#042f2e] active:shadow-[1px_1px_0px_#042f2e] focus:ring-cyber-cyan",
    green: "bg-emerald-500 text-cyber-950 border-t-2 border-l-2 border-r-4 border-b-4 border-t-white/60 border-l-white/60 border-r-emerald-800 border-b-emerald-800 shadow-[3px_3px_0px_#064e3b] hover:bg-emerald-400 hover:shadow-[4px_4px_0px_#064e3b] active:shadow-[1px_1px_0px_#064e3b] focus:ring-emerald-400",
    rose: "bg-rose-500 text-white border-t-2 border-l-2 border-r-4 border-b-4 border-t-rose-300/60 border-l-rose-300/60 border-r-rose-900 border-b-rose-900 shadow-[3px_3px_0px_#4c0519] hover:bg-rose-400 hover:shadow-[4px_4px_0px_#4c0519] active:shadow-[1px_1px_0px_#4c0519] focus:ring-rose-500",
    amber: "bg-amber-400 text-cyber-950 border-t-2 border-l-2 border-r-4 border-b-4 border-t-white/60 border-l-white/60 border-r-amber-800 border-b-amber-800 shadow-[3px_3px_0px_#451a03] hover:bg-amber-300 hover:shadow-[4px_4px_0px_#451a03] active:shadow-[1px_1px_0px_#451a03] focus:ring-amber-400",
    dark: "bg-voxel-card text-slate-200 border-t-2 border-l-2 border-r-4 border-b-4 border-t-slate-600 border-l-slate-600 border-r-cyber-950 border-b-cyber-950 shadow-[3px_3px_0px_#05080e] hover:bg-slate-700 hover:text-white active:shadow-[1px_1px_0px_#05080e] focus:ring-slate-400"
  };

  const disabledStyles = "opacity-45 cursor-not-allowed pointer-events-none grayscale";

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={handleClick}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${disabled ? disabledStyles : ''} ${className}`}
      {...props}
    >
      {Icon && <Icon className={size === 'sm' ? "w-3 h-3" : size === 'lg' ? "w-5 h-5" : "w-4 h-4"} />}
      <span>{children}</span>
    </button>
  );
}
