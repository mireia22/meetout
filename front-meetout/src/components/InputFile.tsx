const InputFile = ({ onChange, inputName }) => {
  const handleFileChange = (e) => {
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
