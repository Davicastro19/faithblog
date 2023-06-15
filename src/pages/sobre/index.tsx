import { GetStaticProps } from "next";
import {  Divider,  Box, Center, Heading, Text, Button, Stack,Link, IconButton } from "@chakra-ui/react";
import Head from "next/head";
import { getPrismicClient } from "@/services/prismic";
import * as prismicH from '@prismicio/helpers'
import { IoLogoFacebook, IoLogoInstagram, IoLogoLinkedin, IoLogoYoutube } from 'react-icons/io'
type About ={
  title: String,
  sub:  String,
  link_insta: String,
  link_yout: String,
  link_face: String,
  link_link: String,
  image: String,
}
interface aboutProps{
 about: About
}
export default function Home({about}:aboutProps) {
  return (
    <>
      <Head>
        <title>Sobre Blog cristão!</title>
      </Head>
      
      <Center marginTop='2%' marginBottom={'2%'} >
        <Center  flexDir={{ base: 'column', md: 'row' }} w={{ base: 'full', md: '80%' }}  >
        
        <Stack  w='90%' spacing={6} flexDir='column'   display={'flex'} textAlign="left"  >
          <Heading as='h1' fontSize={{ base: '2.5rem', md: '3.5rem' }}  fontWeight={'900'} marginTop={'2.5rem'}>
          {about.title}
          </Heading>
          <Text  w='full'  fontSize='md'>
          {about.sub}
          </Text>
          <Stack flexDir='row' >
          <Link  target="_blank" href={`${about.link_face}`}>
          <IconButton aria-label="" bg='transparent' color='var(--blue-900)' icon={<IoLogoFacebook size={'lg'}/>} />
          </Link>
          <Link target="_blank" href={`${about.link_link}`}>
          <IconButton aria-label="." bg='transparent' color='var(--blue-900)' icon={<IoLogoLinkedin size={'lg'}/>} />
          </Link>
          <Link target="_blank" href={`${about.link_yout}`}>
          <IconButton aria-label=".." bg='transparent' color='var(--blue-900)' icon={<IoLogoYoutube size={'lg'}/>} />
          </Link>
          <Link target="_blank" href={`${about.link_insta}`}>
          <IconButton aria-label="..."  bg='transparent' color='var(--blue-900)'icon={<IoLogoInstagram size={'lg'}/>}  />
          </Link>
          </Stack>
        </Stack>
        <Center  margin='0% 7% 0% 5%' w="60%" h="600"  position="relative" display={{ base: 'none', md: 'flex' }}>
  <Box
  borderRadius="2%"
    bg={`url(${about.image}) no-repeat`}
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
     
     
    </>
  )
}
export const getStaticProps : GetStaticProps = async () => {
   const prismic = getPrismicClient();
   const response = await prismic.getSingle('about')
  const {title,sub,link_insta,link_yout,link_face,link_link,image} = response.data
  const about = {
  title: title,
  sub:  prismicH.asText(sub),
  link_insta: prismicH.asLink(link_insta),
  link_yout: prismicH.asLink(link_yout),
  link_face: prismicH.asLink(link_face),
  link_link: prismicH.asLink(link_link),
  image: prismicH.asImageSrc(image),
 }
   return {
    props: {
      about
    },
    revalidate: 60 * (60 * 24) // a CADA 2 MIN
  }
}