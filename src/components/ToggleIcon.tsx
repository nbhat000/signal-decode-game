import { motion } from 'framer-motion';

interface ToggleIconProps {
  enabled: boolean;
  onClick: () => void;
  icon: string;
  label: string;
}

export function ToggleIcon({ enabled, onClick, icon, label }: ToggleIconProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="toggle-icon"
      aria-label={label}
      style={{
        opacity: enabled ? 1 : 0.5,
      }}
    >
      {icon}
    </motion.button>
  );
}

