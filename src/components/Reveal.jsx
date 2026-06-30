import { motion } from 'framer-motion';

/**
 * Reveal — scroll-triggered entrance with optional blur, depth and stagger.
 * Defaults give a soft cinematic rise. Use `index` for stagger choreography.
 */
export default function Reveal({
  children,
  y = 34,
  x = 0,
  blur = 8,
  scale = 1,
  delay = 0,
  index = 0,
  stagger = 0.08,
  duration = 0.8,
  once = true,
  amount = 0.25,
  as = 'div',
  style = {},
  className = '',
  ...rest
}) {
  const Tag = motion[as] || motion.div;
  const totalDelay = delay + index * stagger;

  return (
    <Tag
      className={className}
      style={style}
      initial={{ opacity: 0, y, x, filter: `blur(${blur}px)`, scale }}
      whileInView={{ opacity: 1, y: 0, x: 0, filter: 'blur(0px)', scale: 1 }}
      viewport={{ once, amount }}
      transition={{ duration, delay: totalDelay, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
