import Link from "next/link";
import { Container, Heading, Button, Flex } from "@chakra-ui/react";

export default function Home() {
  return (
    <Container maxW="900px">
      <Heading pt={8} pb={20} textAlign="center">
        Testing React
      </Heading>
      <Flex gap={10}>
        <Flex
          align="center"
          justify="center"
          bg="gray.900"
          height={40}
          w="600px"
          borderRadius="md"
        >
          <Link href="/counter">
            <Button colorScheme="teal" variant="ghost">
              Counter
            </Button>
          </Link>
        </Flex>
        <Flex
          align="center"
          justify="center"
          bg="gray.900"
          height={40}
          w="600px"
          borderRadius="md"
        >
          <Link href="/login">
            <Button colorScheme="teal" variant="ghost">
              Forms
            </Button>
          </Link>
        </Flex>
        <Flex
          align="center"
          justify="center"
          bg="gray.900"
          height={40}
          w="600px"
          borderRadius="md"
        >
          <Link href="/posts">
            <Button colorScheme="teal" variant="ghost">
              Posts
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Container>
  );
}
