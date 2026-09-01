export default function Separator({ variant = "light-center" }: { variant?: "dark-center" | "light-center" }) {
  const gradientClass =
    variant === "dark-center"
      ? "from-gray-400 via-gray-800 to-gray-400"
      : "from-gray-800 via-gray-400 to-gray-800";

  return <div className={`h-px bg-gradient-to-r ${gradientClass} my-6`} />;
}
