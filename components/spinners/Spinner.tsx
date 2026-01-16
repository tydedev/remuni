import { Loader } from "lucide-react";

interface Props {
  text?: string;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: { icon: 18, text: "text-sm" },
  md: { icon: 24, text: "text-base" },
  lg: { icon: 40, text: "text-3xl" },
};

export const Spinner = ({ text, size = "md" }: Props) => {
  return (
    <div className="flex items-center gap-2">
      <Loader className="animate-spin" size={sizes[size].icon} />
      {text && <span className={sizes[size].text}>{text}</span>}
    </div>
  );
};
