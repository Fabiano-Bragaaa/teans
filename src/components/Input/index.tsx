import { TextInput, TextInputProps } from "react-native";
import { InputGroup } from "./styles";

type Props = TextInputProps & {
  inputRef?: React.RefObject<TextInput>;
};

export function Input({ inputRef, ...rest }: Props) {
  return <InputGroup ref={inputRef} {...rest} />;
}
