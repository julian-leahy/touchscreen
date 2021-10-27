import { useRef, useState } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { createUseGesture, pinchAction } from "@use-gesture/react";
import styles from "@/styles/Home.module.css";

const useGesture = createUseGesture([pinchAction]);

export default function Home() {
  const [isZoomed, setIsZoomed] = useState(false);

  const zoomRef = useRef(null);
  const ref = useRef(null);

  useGesture(
    {
      onPinch: () => {
        setIsZoomed(true);
      },
    },
    { target: ref }
  );

  return (
    <div className={styles.container}>
      <div
        ref={ref}
        className={`${isZoomed ? styles.withZoom : styles.noZoom}`}
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
