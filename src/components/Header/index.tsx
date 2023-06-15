import { Box, Link, Flex, Button, useDisclosure, Collapse, Center } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { RxHamburgerMenu } from 'react-icons/rx';
import { AiOutlineClose } from 'react-icons/ai';
import logo from '../../../public/images/logo.svg';
import Image from 'next/image'
type NavLinkProps = {
  href: string;
  children: React.ReactNode;
};

export default function Header() {
  const { isOpen, onToggle } = useDisclosure();
  const router = useRouter();

  return (
    <Center flexDir='column' bg="var(--gray-700)" py={2} px={{ base: 4, md: 8 }}  justifyContent="space-between"  borderBottom={'1px'} borderColor={'var(--gray-200)'}>
      <Flex w={{ base: '100%', md:'85%' }}  justifyContent="space-between" >
        <Link   href="/">
          <Image src={logo} alt="Logo" width={200}  />
        </Link>

        <Box marginTop="2%"  display={{ base: 'block', md: 'none' }}>
          <Button onClick={onToggle} variant="ghost" color="white" _hover={{ color: 'gray.100' }}>
            {isOpen ? <AiOutlineClose color="white" /> : <RxHamburgerMenu />}
          </Button>
        </Box>

        <Box w="full" display={{ base: 'none', md: 'flex' }}>
          <NavLinks activeLinkColor="cyan.500" />
        </Box>
      </Flex>

      <Collapse in={isOpen}   animateOpacity>
        <Box  w='full'>
          <NavLinks activeLinkColor="cyan.500" />
        </Box>
      </Collapse>
    </Center>
  );
}

function NavLinks({ activeLinkColor }: { activeLinkColor: string }) {
  const router = useRouter();

  return (
    <Center  justifyContent="space-between" w={{ base: 'full', md: '92%' }} flexDir={{ base: 'column', md: 'row' }}>
      <Center   margin="0 10%"  w="100%" flexDir={{ base: 'column', md: 'row' }} >
        <Center  w="full">
          <NavLink href="/" isActive={router.pathname === '/'} activeLinkColor={activeLinkColor}>
            Home
          </NavLink>
        </Center>
        <Center w="full">
          <NavLink href="/posts" isActive={router.pathname === '/posts'} activeLinkColor={activeLinkColor}>
            Conteúdos
          </NavLink>
        </Center>
        <Center w="full">
          <NavLink href="/sobre"  isActive={router.pathname === '/quem-somos'} activeLinkColor={activeLinkColor}>
            Quem somos?
          </NavLink>
        </Center>
      </Center>
      <Button w={["full",'500','20%']} colorScheme="blue" size="sm">
        Começar
      </Button>
    </Center>
  );
}

function NavLink({ href, children, isActive, activeLinkColor }: NavLinkProps & { isActive: boolean; activeLinkColor: string }) {
  
  const color = isActive ? activeLinkColor : 'gray.300';

  return (
    <Link href={href} style={{textDecoration:  'none'}}  layerStyle={'noneline'} >
      <Box as="span"   _hover={{ color: 'white' }} color={color} fontSize="md" fontWeight="medium" mx={2}>
        {children}
      </Box>
    </Link>
  );
}
