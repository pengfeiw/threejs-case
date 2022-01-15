import type {NextPage} from "next";
import {useEffect, useRef} from "react";
import init from "src/case/gallery/init";

const Gallery: NextPage = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current as HTMLCanvasElement;
        if (canvas) {
            init(canvas);
        }
    }, [canvasRef]);

    return (
        <canvas ref={canvasRef}></canvas>
    );
}

export default Gallery;
