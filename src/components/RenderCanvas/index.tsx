import React, {FC, useEffect, useRef} from "react";

interface Props {
    init: (canvas: HTMLCanvasElement) => void;
}
const RenderCanvas: FC<Props> = ({init}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current as HTMLCanvasElement;
        if (canvas) {
            init(canvas);
        }
    }, [canvasRef]);

    return (
        <canvas ref={canvasRef}></canvas>
    )
};

export default RenderCanvas;
