interface InputFileProps {
  onChange: (file: File | null) => void;
  inputName: string;
}
const InputFile: React.FC<InputFileProps> = ({ onChange, inputName }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.files && e.target.files[0]);
  };

  return (
    <article className="inputfile-container">
      <input
        type="file"
        className="input-file"
        name={inputName}
        onChange={handleFileChange}
      />
      {inputName}
    </article>
  );
};

export default InputFile;
