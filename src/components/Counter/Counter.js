import { Box, Button, Container, Flex, Heading } from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";

function CounterComponent() {
  const [count, setCount] = useState(0);
  const increment = () => setCount((c) => c + 1);
  const decrement = () => setCount((c) => c - 1);

  return (
    <div>
      <div>Current count: {count}</div>
      <button onClick={decrement}>Decrement</button>
      <button onClick={increment}>Increment</button>
    </div>
    // <>
    //   <Heading as="h1" pt={8} pb={20} textAlign="center">
    //     <Link href="/">Testing React</Link>
    //   </Heading>
    //   <Flex align="center" justify="center">
    //     <Box
    //       bg="gray.900"
    //       w={400}
    //       height={250}
    //       p={30}
    //       pt={10}
    //       borderRadius={10}
    //     >
    //       <Heading textAlign="center">Current count: {count}</Heading>
    //       <Flex justify="space-around" mt={10}>
    //         <Button onClick={decrement} colorScheme="red">
    //           Decrement
    //         </Button>
    //         <Button onClick={increment} colorScheme="green">
    //           Increment
    //         </Button>
    //       </Flex>
    //     </Box>
    //   </Flex>
    // </>
  );
}

export default CounterComponent;
