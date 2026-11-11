import { MinusIcon, PlusIcon } from "@phosphor-icons/react";

export function LotTabActionButton({
  icon,
  handleClick,
}: {
  icon: "plus" | "minus";
  handleClick?: () => void;
}) {
  const isInteractive = !!handleClick;
  const Button = isInteractive ? "button" : "div";
  const Icon = icon === "plus" ? PlusIcon : MinusIcon;

  return (
    <li
      className={`relative flex w-14 h-7 border border-gray-400 border-b-transparent text-gray-400 p-2 justify-center items-center rounded-t-md`}
    >
      <Button
        className='absolute flex justify-center items-center w-full h-full'
        onClick={handleClick}
      >
        <span>
          <Icon size={14} />
        </span>
      </Button>
    </li>
  );
}
