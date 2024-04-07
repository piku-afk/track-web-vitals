import { Center, Container, Title } from '@mantine/core';
import { useRouteError } from '@remix-run/react';

const ErrorFallback = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <Container component="main" size="lg" px={{ base: 24, lg: 0 }} py={40} h="100vh">
      <Center component="section">
        <Title>Error Fallback</Title>
      </Center>
    </Container>
  );
};

export default ErrorFallback;
