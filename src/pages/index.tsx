import type {NextPage} from "next";
import {Box, OrderedList, ListItem, Link} from "@chakra-ui/react";
import {H1, H2, Paragraph} from "src/components/primitives/typography";
import {getPathWithPrefix} from "src/util";

const Home: NextPage = () => {
    return (
        <Box
            maxW={1000}
            m="0 auto"
            padding="10px"
        >
            <H1>Threejs Case</H1>
            <Paragraph>使用 ThreeJs 写的一些小程序。</Paragraph>
            <H2>Source</H2>
            <Paragraph>
                github：
                <Link href="https://github.com/pengfeiw/threejs-case">https://github.com/pengfeiw/threejs-case</Link>
            </Paragraph>
            <H2>Case</H2>
            <OrderedList>
                <ListItem>
                    Gallery：
                    <Link href={getPathWithPrefix("/gallery")}>https://pengfeiw.github.io/threejs-case/gallery</Link>
                </ListItem>
                <ListItem>
                    Star：
                    <Link href={getPathWithPrefix("/star")}>https://pengfeiw.github.io/threejs-case/star</Link>
                </ListItem>
                <ListItem>
                    Torch：
                    <Link href={getPathWithPrefix("/torch")}>https://pengfeiw.github.io/threejs-case/torch</Link>
                </ListItem>
            </OrderedList>
        </Box>
    );
}

export default Home
