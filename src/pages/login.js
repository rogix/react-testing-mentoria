import { Box, Center, Flex, Heading, Spinner } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useReducer, useState } from "react";
import LoginForm from "../components/Form/Login";

function Login() {
  const [formData, setFormData] = useState(null);
  const { status, responseData, errorMessage } = useFormSubmission({
    endpoint: "https://auth-provider.example.com/api/login",
    data: formData,
  });

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
          direction="column"
        >
          {status === "resolved" ? (
            <div>
              Welcome <strong>{responseData.username}</strong>
            </div>
          ) : (
            <LoginForm onSubmit={(data) => setFormData(data)} />
          )}
          <Box height={4} textAlign="center" w="215px">
            {status === "pending" ? (
              <Spinner
                aria-label="loading..."
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xs"
              />
            ) : null}
            {status === "rejected" ? (
              <div
                role="alert"
                style={{
                  color: "yellow",
                  textAlign: "left",
                  paddingTop: "10px",
                }}
              >
                {errorMessage}
              </div>
            ) : null}
          </Box>
        </Flex>
      </Flex>
    </>
  );
}

export default Login;

function formSubmissionReducer(state, action) {
  switch (action.type) {
    case "START": {
      return { status: "pending", responseData: null, errorMessage: null };
    }
    case "RESOLVE": {
      return {
        status: "resolved",
        responseData: action.responseData,
        errorMessage: null,
      };
    }
    case "REJECT": {
      return {
        status: "rejected",
        responseData: null,
        errorMessage: action.error.message,
      };
    }
    default:
      throw new Error(`Unsupported type: ${action.type}`);
  }
}

function useFormSubmission({ endpoint, data }) {
  const [state, dispatch] = useReducer(formSubmissionReducer, {
    status: "idle",
    responseData: null,
    errorMessage: null,
  });

  const fetchBody = data ? JSON.stringify(data) : null;

  useEffect(() => {
    if (fetchBody) {
      dispatch({ type: "START" });
      window
        .fetch(endpoint, {
          method: "POST",
          body: fetchBody,
          headers: {
            "content-type": "application/json",
          },
        })
        .then(async (response) => {
          const data = await response.json();
          if (response.ok) {
            dispatch({ type: "RESOLVE", responseData: data });
          } else {
            dispatch({ type: "REJECT", error: data });
          }
        });
    }
  }, [fetchBody, endpoint]);

  return state;
}
