import { getPrismicClient } from "@/services/prismic";
import { Box, Center, Heading, Text, Button, Image, Stack, IconButton, Link } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import Head from "next/head";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from 'react-icons/md'
import * as prismicH from '@prismicio/helpers'
import { useState } from "react";

type Post ={
  slug: String,
  title:  String,
  cover: String,
  description: String,
  updateAt:String,

}
interface postProps{
 posts: Post[],
 page:String,
 totalPages:String
}
export default function Posts({posts: postsBlog, page, totalPages}: postProps) {
  const [currentPage, setCurrentPage] = useState(Number(page))
  const [posts, setPosts] = useState(postsBlog || [])
  
  
  async function navigatePage(pageNumber: number){
    const prismic = getPrismicClient();
    const response = await prismic.getByType('posts', {
    orderings: {
      field: 'document.first_publication_date',
      direction: 'desc',
    },
    fetchLinks: ['posts.title', 'posts.thumbnail', 'posts.description'],
    //lang: 'fr-fr',
    pageSize: 2,
    page: pageNumber,
    })
    const getPosts:any = response.results.map(post => {
    let description = '';
    const descriptionContent = post.data.description.find(content => content.type === 'paragraph');
    if (descriptionContent && descriptionContent.type === 'paragraph') {
      description = descriptionContent.text || '';
    }
  
    return {
      slug: post.uid,
      title: post.data.title,
      description: description,
      cover: post.data.thumbnail.url,
      updateAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR',{
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })
    };
    });

    setCurrentPage(pageNumber)
    setPosts(getPosts)
  }
  return (
    <>
      <Head>
        <title>Posts do blog</title>
      </Head>

      <Center flexDir={'column'}  >
       
       {posts.map(post =>(
        <Center key={`${post.slug}`}  marginTop='50px' flexDir={'column'} w={{ base: '90%', md: '50%' }}  >
 
        <Link key={`${post.slug}`} style={{textDecoration:  'none'}} href={`/posts/${post.slug}`}>
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
   <Text fontSize='md' color={'var(--gray-100)'}>
     {post.description}
      </Text>
 </Stack>
</Link>
</Center>
       ))}
        <Center marginTop="40px" marginBottom="40px" w={{ base: '90%', md: '50%' }} justifyContent={'space-between'} >
          <Box >
            {(currentPage >= 2) &&
            <>
            <IconButton colorScheme="blue" margin='2px' aria-label='Search database' color='white' bg={'var(--blue-900)'} onClick={() => navigatePage(1)} icon={<MdKeyboardDoubleArrowLeft />} />
            <IconButton colorScheme="blue" margin='2px' aria-label='Search database' color='white' bg={'var(--blue-900)'} onClick={() => navigatePage(currentPage-1)} icon={<MdKeyboardArrowLeft />} />
            </>
             }
              </Box>
          <Box  >
            {currentPage < Number(totalPages) &&
            <>
            <IconButton colorScheme="blue" margin='2px' aria-label='Search database' color='white' bg={'var(--blue-900)'} onClick={() => navigatePage(currentPage+1)} icon={<MdKeyboardArrowRight />} />
            <IconButton colorScheme="blue" margin='2px' aria-label='Search database' color='white' bg={'var(--blue-900)'} onClick={() => navigatePage(Number(totalPages))} icon={<MdKeyboardDoubleArrowRight />} />
            </>
            }
            </Box>
        </Center>

      </Center>

    </>
  )
}




export const getStaticProps : GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const response = await prismic.getByType('posts', {
    orderings: {
      field: 'document.first_publication_date',
      direction: 'desc',
    },
    fetchLinks: ['posts.title', 'posts.thumbnail', 'posts.description'],
    //lang: 'fr-fr',
    pageSize: 2,
    page: 1,
  })
  const posts = response.results.map(post => {
    let description = '';
    const descriptionContent = post.data.description.find(content => content.type === 'paragraph');
    if (descriptionContent && descriptionContent.type === 'paragraph') {
      description = descriptionContent.text || '';
    }
  
    return {
      slug: post.uid,
      title: post.data.title,
      description: description,
      cover: post.data.thumbnail.url,
      updateAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR',{
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })
    };
  });
  return {  
   props: {
    posts,
    page: response.page,
    totalPages: response.total_pages

   },
   revalidate: 60 * 30 // a CADA 2 MIN
 }
}