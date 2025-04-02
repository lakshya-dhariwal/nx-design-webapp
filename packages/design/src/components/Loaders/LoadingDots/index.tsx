// import { motion } from "framer-motion";
// import { tv } from "tailwind-variants";

// const dotsContainer = tv({
//   base: "flex space-x-1",
// });

// const dot = tv({
//   base: "rounded-full bg-current",
//   variants: {F
//     size: {
//       xs: "w-1 h-1",
//       sm: "w-1.5 h-1.5",
//       md: "w-2 h-2",
//       lg: "w-2.5 h-2.5",
//       xl: "w-3 h-3",
//     },
//   },
//   defaultVariants: {
//     size: "md",
//   },
// });

// //todo: Rollup build error  src/components/Loaders/LoadingDots/index.tsx (24:0): Expression expected
// // interface LoadingDotsProps {
// //   size?: "xs" | "sm" | "md" | "lg" | "xl";
// //   color?: string;
// //   className?: string;
// //   dotClassName?: string;
// // };

// export default function LoadingDots ({
//   size = "md",
//   color = "#ffffff",
//   className = "",
//   dotClassName  = "",
// }) {
//   return (
//     <div className={dotsContainer({ className })} style={{ color }}>
//       {[0, 1, 2].map((i) => 
//         <motion.div
//           key={i}
//           className={dot({ size, className: dotClassName })}
//           animate={{
//             opacity: [0.4, 1, 0.4],
//             scale: [0.9, 1.1, 0.9],
//           }}
//           transition={{
//             duration: 1,
//             repeat: Infinity,
//             delay: i * 0.2,
//           }}
//         />
//       ))}
//     </div>
//   );
// };


