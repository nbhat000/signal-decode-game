import { motion } from 'framer-motion';

interface StatusChipProps {
  status: 'PLAYING' | 'YOUR TURN' | 'SUCCESS' | 'FAIL';
}

export function StatusChip({ status }: StatusChipProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="status-chip"
      data-status={status}
    >
      ▶ {status}
    </motion.div>
  );
}

