import {Spinner, Flex} from "@chakra-ui/react";
import type {NextPage} from "next";
import {useEffect, useRef, useState} from "react";
import init from "src/case/gallery/init";

const Gallery: NextPage = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const canvas = canvasRef.current as HTMLCanvasElement;
        if (canvas) {
            init(canvas, () => {setLoading(false)});
        }
    }, [canvasRef]);

    return (
        <Flex
            justifyContent="center"
            alignItems="center"
            width="100vw"
            height="100vh"
        >
            <canvas ref={canvasRef} style={{position: "absolute", left: "0", top: "0"}}></canvas>
            {
                loading ? (
                    <Spinner
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='orange.500'
                        size='xl'
                    />
                ) : <></>
            }
        </Flex>
    );
}

export default Gallery;
