import { FaCheckCircle } from "react-icons/fa";
import { tv } from "tailwind-variants";
import { IoWarningOutline } from "react-icons/io5";

export const StepStatus = ({
  state,
  stepName,
}: {
  stepName: string;
  state: "notConnected" | "connected" | "skipped" | "completed";
}) => {
  const cardClassName = tv({
    base: "h-auto w-full text-white rounded-lg p-4 bg-gradient-to-r from-[rgba(255,255,255,0.05)] to-[rgba(255,255,255,0.10)]",
    variants: {
      state: {
        notConnected: "border-[1px] border-white border-opacity-20",
        connected: "border-[1px] border-success-600",
        completed: "border-[1px] border-success-600",
        skipped: "border-[1px] border-warning-400",
      },
    },
  });
  return (
    <div className={cardClassName({ state: state })}>
      <div className=" flex flex-col gap-4">
        <span className="body-1">{stepName}</span>
        {state === "connected" && (
          <div className="flex items-center text-success-600 gap-2">
            <FaCheckCircle />
            Connected
          </div>
        )}
        {state === "completed" && (
          <div className="flex items-center text-success-600 gap-2">
            <FaCheckCircle />
            Completed
          </div>
        )}
        {state === "skipped" && (
          <div className="flex items-center text-warning-400 gap-2">
            <IoWarningOutline />
            SKIPPED
          </div>
        )}
      </div>
    </div>
  );
};
