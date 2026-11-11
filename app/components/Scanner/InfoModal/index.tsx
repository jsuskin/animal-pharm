import { PencilIcon, XIcon } from "@phosphor-icons/react";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import DiagramSVG from "./DiagramSVG";
import ScanModeInfo from "./ScanModeInfo";
import ScreenActionssInfo from "./ScreenActionsInfo";
import ScannerControlsInfo from "./ScannerControlsInfo";
import ScannedItemFieldsInfo from "./ScannedItemFieldsInfo";
import ScannedItemQueueInfo from "./ScannedItemQueueInfo";

export type DiagramColor = "aqua" | "fuchsia" | "orange" | "lime" | "yellow";

const diagramColors = {
  aqua: "#00FFFF",
  yellow: "#FFFF00",
  lime: "#00FF00",
  orange: "#FF6600",
  fuchsia: "#FF00FF",
};

export default function InfoModal({ closeModal }: { closeModal: () => void }) {
  const [selectedColor, setSelectedColor] = useState<DiagramColor | null>(null);
  const [activeLabel, setActiveLabel] = useState(0);

  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    spanRef.current?.animate(
      [
        { transform: "translateX(500%)", opacity: 0 },
        { transform: "translateX(0)", opacity: 1 },
      ],
      { duration: 500, easing: "ease-out", delay: 10, fill: "backwards" },
    );
  }, [activeLabel]);

  const setActiveSection = (color: DiagramColor, label: number) => (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedColor(color);
    setActiveLabel(label);
  };

  return (
    <div
      className='absolute top-0 left-0 w-full h-full p-5 z-9999'
      onClick={() => {
        setSelectedColor(null);
        setActiveLabel(0);
      }}
    >
      <div className='relative w-full h-full rounded-lg bg-black/90'>
        <div className='relative h-20'>
          <button className='absolute top-0 right-0 m-4' onClick={closeModal}>
            <XIcon size={32} className='text-slate-400' />
          </button>
        </div>
        <div>
          <p className='text-center text-xl m-2'>Click a Region to View Info</p>
          <div className='flex justify-center m-4'>
            <DiagramSVG mult={!selectedColor ? 2 : 0.5} setActiveSection={setActiveSection} />
          </div>
          {selectedColor && (
            <div>
              <div
                className='relative h-8 w-full'
                style={{ backgroundColor: diagramColors[selectedColor], opacity: 0.7 }}
              >
                <span ref={spanRef} className='absolute -top-6 text-7xl font-black text-white/70'>
                  {["①", "②", "③", "④", "⑤"][activeLabel - 1]}
                </span>
              </div>
              {activeLabel === 1 ? (
                <ScanModeInfo />
              ) : activeLabel === 2 ? (
                <ScreenActionssInfo />
              ) : activeLabel === 3 ? (
                <ScannedItemFieldsInfo />
              ) : activeLabel === 4 ? (
                <ScannerControlsInfo />
              ) : activeLabel === 5 ? (
                <ScannedItemQueueInfo />
              ) : (
                <></>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
