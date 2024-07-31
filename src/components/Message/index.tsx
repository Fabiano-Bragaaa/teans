import { View } from "react-native";
import { Container, Title } from "./styles";

type Props = {
  title: string;
};

export function Message({ title }: Props) {
  return (
    <Container>
      <Title> {title} </Title>
    </Container>
  );
}
