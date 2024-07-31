import { TextInputProps } from "react-native";
import { InputGroup } from "./styles";

export function Input({ ...rest }: TextInputProps) {
  return <InputGroup {...rest} />;
}
