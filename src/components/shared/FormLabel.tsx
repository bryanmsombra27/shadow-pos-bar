interface LabelProps {
  text: string;
  id: string;
}

const Label = ({ text, id }: LabelProps) => {
  return (
    <label
      htmlFor={id}
      className="font-bold py-2 text-sm  inline-block"
    >
      {text}
    </label>
  );
};

export default Label;
