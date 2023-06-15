import { GetStaticProps } from "next";
import {  Divider,  Box, Center, Heading, Text, Button, Stack,Link } from "@chakra-ui/react";
import Head from "next/head";
import { getPrismicClient } from "@/services/prismic";
import * as prismicH from '@prismicio/helpers'

type Content ={
  title: String,
  sub:  String,
  link_action: String,
  image_one: String,
  title_to: String,
  sub_to: String,
  image_to: String,
  image_three: String,
  title_three:String,
  sub_three:String,

}
interface contentProps{
 content: Content
}
export default function Home({content}:contentProps) {
  return (
    <>
      <Head>
        <title>Meu Blog cristão!</title>
      </Head>
      
      <Center marginTop='2%' marginBottom={'2%'} >
        <Center  flexDir={{ base: 'column', md: 'row' }} w='80%'  >
        
        <Stack spacing={6} flexDir='column'   display={'flex'} textAlign="left"  >
          <Heading as='h1' fontSize={{ base: '2.5rem', md: '3.5rem' }}  fontWeight={'900'} marginTop={'2.5rem'}>
          {content.title}
          </Heading>
          <Text fontSize={{ base: '1rem', md: '1.5rem' }}>
          {content.sub}</Text>
          <Link target="_blank" href={`${content.link_action}`}>
          <Button w={["full",'500','30%']} colorScheme="blue" size="sm">
            Começar agora
          </Button>
          </Link>
        </Stack>
        <Center margin='0% 7% 0% 5%' w="full" h="550px"  position="relative">
  <Box
  borderRadius="2%"
    bg={`url(${content.image_one}) no-repeat`}
    bgSize="cover"
    bgPosition="center"
    position="absolute"
    top={0}
    left={0}
    right={0}
    bottom={0}
    zIndex={-1}
  />
  <Box
    bgGradient="linear(to-t, rgba(17, 17, 19, 1),rgba(17, 17, 19, 0.5), rgba(0, 0, 0, 0)  )"
    position="absolute"
    top={0}
    left={0}
    right={0}
    bottom={0}
    borderRadius="0%"
  />
        </Center>

        </Center>
      </Center>
      <Divider marginTop='10%' marginBottom={'10%'}  orientation='horizontal' />
      <Center marginTop='2%' marginBottom={'2%'} >
        <Center  flexDir={{ base: 'column', md: 'row' }} w='80%'  >
        
        <Stack spacing={6} flexDir='column'   display={'flex'} textAlign="left"  >
          <Heading as='h1' fontSize={{ base: '2.5rem', md: '3.5rem' }}  fontWeight={'900'} marginTop={'2.5rem'}>
         {content.title_to}
          </Heading>
          <Text fontSize={{ base: '1rem', md: '1.5rem' }}>
            {content.sub_to}
          </Text>
          
        </Stack>
        <Center margin='0% 7% 0% 5%' w="full" h="550px"  position="relative">
  <Box
   borderRadius="2%"
    bg={`url(${content.image_to}) no-repeat`}
    bgSize="cover"
    bgPosition="center"
    position="absolute"
    top={0}
    left={0}
    right={0}
    bottom={0}
    zIndex={-1}
  />
  <Box
    bgGradient="linear(to-t, rgba(17, 17, 19, 1),rgba(17, 17, 19, 0.5), rgba(0, 0, 0, 0)  )"
    position="absolute"
    top={0}
    left={0}
    right={0}
    bottom={0}
    borderRadius="0%"
  />
        </Center>

        </Center>
      </Center>
      <Divider marginTop='10%' marginBottom={'10%'}  orientation='horizontal' />
      <Center >
        <Center   flexDir={{ base: 'column', md: 'row' }} w='80%'  >
        <Center margin='0% 7% 0% 5%' w="full" h="550px"  position="relative">
  <Box
   borderRadius="2%"
    bg={`url(${content.image_three}) no-repeat`}
    bgSize="cover"
    bgPosition="center"
    position="absolute"
    top={0}
    left={0}
    right={0}
    bottom={0}
    zIndex={-1}
  />
  <Box
    bgGradient="linear(to-t, rgba(17, 17, 19, 1),rgba(17, 17, 19, 0.5), rgba(0, 0, 0, 0)  )"
    position="absolute"
    top={0}
    left={0}
    right={0}
    bottom={0}
    borderRadius="0%"
  />
        </Center>

        <Stack spacing={6} flexDir='column'   display={'flex'} textAlign="left"  >
          <Heading as='h1' fontSize={{ base: '2.5rem', md: '3.5rem' }}  fontWeight={'900'} marginTop={'2.5rem'}>
         {content.title_three}
          </Heading>
          <Text fontSize={{ base: '1rem', md: '1.5rem' }}>
          {content.sub_three}
          </Text>
        </Stack>
      
        </Center>
      </Center>
    </>
  )
}


export const getStaticProps : GetStaticProps = async () => {
   const prismic = getPrismicClient();
   const response = await prismic.getSingle('home')
   
  const {title,sub,link_action,image_one,title_to,sub_to,image_to,image_three,title_three,sub_three} = response.data
 
  const content = {
  title: title,
  sub:  prismicH.asText(sub),
  link_action: prismicH.asLink(link_action),
  image_one: prismicH.asImageSrc(image_one),
  title_to: title_to,
  sub_to: prismicH.asText(sub_to),
  image_to: prismicH.asImageSrc(image_to),
  image_three: prismicH.asImageSrc(image_three),
  title_three: title_three,
  sub_three: prismicH.asText(sub_three),

 }
   return {
    props: {
      content
    },
    revalidate: 60 * 30 // a CADA 2 MIN
  }
}