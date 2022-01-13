import type {NextPage} from "next";
import {useEffect, useRef} from "react";

const Home: NextPage = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            
        }
    }, [canvasRef]);

    return (
        <canvas ref={canvasRef}></canvas>
    );
}

export default Home
