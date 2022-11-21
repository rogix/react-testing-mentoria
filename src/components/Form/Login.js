import { Box, Button, Flex, FormLabel, Heading, Input } from "@chakra-ui/react";
import Link from "next/link";

function LoginForm({ onSubmit }) {
  function handleSubmit(event) {
    event.preventDefault();
    const { username, password } = event.target.elements;

    onSubmit({
      username: username.value,
      password: password.value,
    });
  }

  return (
    <>
      <Heading as="h1" pt={8} pb={20} textAlign="center">
        <Link href="/">Testing React</Link>
      </Heading>
      <Flex align="center" justify="center">
        <Flex
          align="center"
          justify="center"
          w="400px"
          h="300px"
          bg="gray.900"
          borderRadius={8}
        >
          <form onSubmit={handleSubmit}>
            <div>
              <FormLabel htmlFor="username-field">Username</FormLabel>
              <Input id="username-field" name="username" type="text" mb={4} />
            </div>
            <div>
              <FormLabel htmlFor="password-field">Password</FormLabel>
              <Input
                id="password-field"
                name="password"
                type="password"
                mb={4}
              />
            </div>
            <div>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Flex>
      </Flex>
    </>
  );
}

export default LoginForm;
