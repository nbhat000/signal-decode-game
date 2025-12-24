import { motion } from 'framer-motion';

interface StatusChipProps {
  status: 'PLAYING' | 'YOUR TURN' | 'SUCCESS' | 'FAIL' | 'READY';
}

export function StatusChip({ status }: StatusChipProps) {
  const variants = {
    PLAYING: { color: '#00d4ff', glow: '0 0 12px rgba(0, 212, 255, 0.4)' },
    'YOUR TURN': { color: '#a855f7', glow: '0 0 12px rgba(168, 85, 247, 0.4)' },
    SUCCESS: { color: '#10b981', glow: '0 0 12px rgba(16, 185, 129, 0.4)' },
    FAIL: { color: '#ef4444', glow: '0 0 12px rgba(239, 68, 68, 0.4)' },
    READY: { color: '#8b5cf6', glow: '0 0 12px rgba(139, 92, 246, 0.3)' },
  };

  const variant = variants[status];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="status-chip"
      style={{
        color: variant.color,
        textShadow: variant.glow,
      }}
    >
      {status}
    </motion.div>
  );
}

