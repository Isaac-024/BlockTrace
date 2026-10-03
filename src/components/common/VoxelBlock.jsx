import React from 'react';

export function VoxelBlock({
  children,
  title,
  subtitle,
  icon: Icon,
  variant = 'default', // 'default' | 'cyan' | 'green' | 'rose' | 'amber'
  headerRight,
  className = '',
  bodyClassName = 'p-5',
  ...props
}) {
  const borderVariants = {
    default: "border-t-[3px] border-l-[3px] border-slate-600 border-r-[3px] border-b-[3px] border-cyber-950 bg-cyber-900/95 shadow-voxel",
    cyan: "border-t-[3px] border-l-[3px] border-cyber-cyan border-r-[3px] border-b-[3px] border-cyan-950 bg-cyber-900/95 shadow-voxel-cyan",
    green: "border-t-[3px] border-l-[3px] border-emerald-400 border-r-[3px] border-b-[3px] border-emerald-950 bg-cyber-900/95 shadow-voxel-green",
    rose: "border-t-[3px] border-l-[3px] border-rose-400 border-r-[3px] border-b-[3px] border-rose-950 bg-cyber-900/95 shadow-voxel-rose",
    amber: "border-t-[3px] border-l-[3px] border-amber-400 border-r-[3px] border-b-[3px] border-amber-950 bg-cyber-900/95 shadow-voxel"
  };

  const headerColors = {
    default: "bg-slate-800/80 border-b-2 border-slate-700 text-slate-200",
    cyan: "bg-cyan-950/80 border-b-2 border-cyan-800 text-cyber-cyan",
    green: "bg-emerald-950/80 border-b-2 border-emerald-800 text-emerald-300",
    rose: "bg-rose-950/80 border-b-2 border-rose-800 text-rose-300",
    amber: "bg-amber-950/80 border-b-2 border-amber-800 text-amber-300"
  };

  return (
    <div
      className={`relative rounded-none ${borderVariants[variant]} ${className}`}
      {...props}
    >
      {/* 3D Voxel Corner Accents */}
      <div className="absolute -top-1 -left-1 w-2 h-2 bg-white/40 pointer-events-none" />
      <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-black/70 pointer-events-none" />

      {/* Header if specified */}
      {(title || Icon || headerRight) && (
        <div className={`px-4 py-3 flex items-center justify-between ${headerColors[variant]}`}>
          <div className="flex items-center gap-2.5">
            {Icon && <Icon className="w-4 h-4 shrink-0" />}
            <div>
              {title && <h3 className="font-pixel text-xs tracking-wider uppercase">{title}</h3>}
              {subtitle && <p className="font-code text-[11px] text-slate-400 mt-0.5">{subtitle}</p>}
            </div>
          </div>
          {headerRight && <div>{headerRight}</div>}
        </div>
      )}

      {/* Content */}
      <div className={bodyClassName}>
        {children}
      </div>
    </div>
  );
}
