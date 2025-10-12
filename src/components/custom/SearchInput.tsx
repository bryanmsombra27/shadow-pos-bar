import { useRef, type FC } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { SearchIcon } from "lucide-react";
import { useSearchParams } from "react-router";
interface SearchInputProps {
  placeholder?: string;
}
const SearchInput: FC<SearchInputProps> = ({ placeholder = "busqueda" }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const urlSearch = new URLSearchParams();
  const [_, setSearchParams] = useSearchParams();

  const hangleSearch = () => {
    if (inputRef.current?.value && inputRef.current?.value.length <= 0) {
      urlSearch.delete("busqueda");
      setSearchParams(urlSearch);
      return;
    }

    urlSearch.append("busqueda", inputRef.current?.value!);
    setSearchParams(urlSearch);
  };

  return (
    <InputGroup className="w-[500px]">
      <InputGroupInput
        placeholder={placeholder}
        ref={inputRef}
        onChange={hangleSearch}
      />
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">
        <InputGroupButton>Search</InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
};

export default SearchInput;
