import { SortDirection } from "@/utils/types";
import React from "react";
import { IconProps } from "@phosphor-icons/react";
import { useStore } from "@/app/store/useStore";

export default function SortDirectionListItem({
  sortDirection,
  closeMenu,
  Icon,
}: {
  sortDirection: SortDirection;
  closeMenu: () => void;
  Icon: React.ComponentType<IconProps>;
}) {
  const activeSortDirection = useStore((state) => state.sort.direction);
  const _setSortDirection = useStore((state) => state.setSortDirection);

  const setSortDirection = () => {
    _setSortDirection(sortDirection);
    closeMenu();
  };

  return (
    <button
      onClick={setSortDirection}
      className={`flex items-center px-3 gap-1 rounded-md ${sortDirection === activeSortDirection ? "bg-zinc-700 border-b-3 border-r-2 border-b-zinc-600 border-r-zinc-500 active:border-b-0 active:mt-[4px] transition-all" : "transparent"}`}
    >
      <span className='flex flex-col items-center text-[0.6rem]'>
        {sortDirection === "descending" && <span className="translate-y-1">DESC</span>}
        <Icon size={24} weight='bold' />
        {sortDirection === "ascending" && <span className="-translate-y-1">ASC</span>}
      </span>
    </button>
  );
}
