const Line: React.FC<{
  className?: string;
  variant?: "horizontal" | "vertical";
}> = ({ className }) => {
  return <div className={className} />;
};

export default Line;
