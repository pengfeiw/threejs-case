import {Flex} from "@chakra-ui/react";
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
        <Flex
            justifyContent="center"
            alignItems="center"
            width="100vw"
            height="100vh"
        >
            <canvas ref={canvasRef}></canvas>
        </Flex>
    );
}

export default Gallery;
