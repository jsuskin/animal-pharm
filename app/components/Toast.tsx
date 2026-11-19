import React, { useEffect } from "react";

export default function Toast({
  text,
  showToast,
  closeToast,
}: {
  text: string
  showToast: boolean;
  closeToast: () => void;
}) {
  useEffect(() => {
    if (showToast) setTimeout(closeToast, 3000);
  }, [showToast, closeToast]);

  return (
    <div
      className='absolute bg-gray-700 top-15 left-1/2 -translate-x-1/2 p-3 w-80 rounded-sm z-9999 transition duration-300 ease-in-out'
      style={{ opacity: showToast ? "90%" : 0, pointerEvents: showToast ? "auto" : "none" }}
    >
      <p>{text}</p>
    </div>
  );
}
