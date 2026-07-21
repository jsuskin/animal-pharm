"use client";
import { useState } from "react";
import { useZxing } from "react-zxing";

export const Scanner = () => {
  const [result, setResult] = useState("");
  const [hasCamera, setHasCamera] = useState(true);
  const [isActive, setIsActive] = useState(false);

  const { ref } = useZxing({
    paused: !isActive,
    onDecodeResult(decodedResult) {
      setResult(decodedResult.rawValue);
    },
    onError(err) {
      const errorObject = err as Error;
      if (errorObject.name === "NotFoundError" || errorObject.name === "DevicesNotFoundError") {
        setHasCamera(false);
      } else {
        console.error("Camera error:", errorObject);
      }
    },
  });

  return (
    <div className='flex flex-col items-center gap-4 p-4 w-full border border-gray-200 rounded-xl bg-white shadow-sm'>
      <p className='text-xs text-green-600 font-semibold tracking-wider uppercase'>
        Scanner Component Active
      </p>

      {!hasCamera ? (
        <div className='w-full max-w-sm aspect-video bg-gray-100 text-gray-500 rounded-lg flex flex-col items-center justify-center p-4 text-center'>
          <span className='text-2xl mb-1'>📷</span>
          <p className='text-sm font-semibold'>No camera detected on this device.</p>
        </div>
      ) : (
        <div className='w-full max-w-sm aspect-video bg-black rounded-lg overflow-hidden relative flex items-center justify-center'>
          {isActive ? (
            <video ref={ref} muted playsInline className='w-full h-full object-cover' />
          ) : (
            <div className='text-center p-4'>
              <button
                onClick={() => setIsActive(true)}
                className='px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition shadow-md'
              >
                Enable Camera
              </button>
            </div>
          )}
        </div>
      )}

      <div className='text-center mt-2'>
        <p className='text-gray-600 text-sm'>Last result:</p>
        <p className='font-mono text-xl font-bold text-blue-600 min-h-[30px] mt-1'>
          {result || "(waiting for scan...)"}
        </p>
      </div>
    </div>
  );
};
