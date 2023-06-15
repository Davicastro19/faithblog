import { getPrismicClient } from "@/services/prismic";
import { Box, Center, Heading, Text, Button, Image, Stack, IconButton, Link } from "@chakra-ui/react";
import { GetServerSideProps, GetStaticProps } from "next";
import Head from "next/head";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from 'react-icons/md'
import * as prismicH from '@prismicio/helpers'
import { useState } from "react";
import styles from "./post.module.scss"
type Post = {
    slug: String,
    title: String,
    cover: String,
    description: String,
    updateAt: String,

}
interface postProps {
    post: Post
}
export default function Post({ post }: postProps) {

    return (
        <>
            <Head>
                <title>Posts do blog</title>
            </Head>

            <Center flexDir={'column'}  >
                <Center marginTop='50px' flexDir={'column'} w={{ base: '90%', md: '50%' }}  >

                    <Center w='full' padding={'1px'} borderRadius={'2px'} bg="linear-gradient(to bottom right, #00FFF0, transparent)" >
                        <Image borderRadius={'2px'} src={`${post.cover}`} w='full' alt='i' />
                    </Center>
                    <Stack marginTop={'20px'} spacing={2} >

                        <Heading as='h4' size='md' _hover={{ color: 'var(--blue-900)' }}>
                            {post.title}
                        </Heading>


                        <Text className="time" fontSize='md' color={'var(--gray-200)'}>
                            {post.updateAt}
                        </Text>
                        <Box layerStyle={'postContent'} color='white' fontSize='md'  dangerouslySetInnerHTML={{ __html: post.description }} />
                        
                    </Stack>
                </Center>

            </Center>

        </>
    )
}




export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
    if (!params) {
        return { redirect: { destination: '/posts', permanent: false, } }
    }

    const { slug } = params
    const prismic = getPrismicClient(req);
    const response = await prismic.getByUID('posts', String(slug), {})

    if (!response) {
        return {
            redirect: {
                destination: '/posts',
                permanent: false,
            }
        }
    }
    const post = {
        slug: slug,
        title: response.data.title,
        description: prismicH.asHTML(response.data.description),
        cover: response.data.thumbnail.url,
        updateAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        })
    };
    return {
        props: {
            post
        }
    }
}