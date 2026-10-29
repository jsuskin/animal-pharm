import { SortBy } from "@/utils/types";
import { useStore } from "@/app/store/useStore";

export default function SortByListItem({
  sortBy,
  closeMenu,
}: {
  sortBy: SortBy;
  closeMenu: () => void;
}) {
  const activeSortBy = useStore((state) => state.sort.by);
  const _setSortBy = useStore((state) => state.setSortBy);

  const setSortBy = (sortBy: SortBy) => {
    _setSortBy(sortBy);
    closeMenu();
  };

  return (
    <li
      className={`${sortBy === activeSortBy ? "bg-zinc-700 border-b-3 border-r-2 border-b-zinc-600 border-r-zinc-500 active:border-b-0 active:mt-[4px] transition-all rounded-md" : "transparent"}`}
    >
      <button onClick={() => setSortBy(sortBy)}>
        {sortBy
          .split("_")
          .map((w) => w[0].toUpperCase() + w.slice(1))
          .join(" ")}
      </button>
    </li>
  );
}
