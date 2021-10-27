import { useRef, useState, useEffect } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { createUseGesture, pinchAction } from "@use-gesture/react";
import styles from "@/styles/Home.module.css";

const useGesture = createUseGesture([pinchAction]);

export default function Home() {
  const [isZoomed, setIsZoomed] = useState(false);

  const zoomRef = useRef(null);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => e.preventDefault();
    document.addEventListener("gesturestart", handler);
    document.addEventListener("gesturechange", handler);
    return () => {
      document.removeEventListener("gesturestart", handler);
      document.removeEventListener("gesturechange", handler);
    };
  }, []);

  const zoom = () => {
    setIsZoomed(true);
  };

  const noZoom = () => {
    zoomRef.current.resetTransform();
    setIsZoomed(false);
  };

  useGesture(
    {
      onPinch: ({ movement }) => {
        if (isZoomed && movement[0] < 0.3) {
          noZoom();
        } else {
          zoom();
        }
      },
    },
    { target: ref }
  );

  return (
    <div className={styles.container}>
      <div
        ref={ref}
        className={`${isZoomed ? styles.withZoom : styles.noZoom}`}
        onDoubleClick={() => {
          setIsZoomed(true);
        }}
      >
        <TransformWrapper ref={zoomRef} disabled={!isZoomed}>
          <TransformComponent>
            <>
              <img src="./bike.png" />
            </>
          </TransformComponent>
        </TransformWrapper>
      </div>
    </div>
  );
}
