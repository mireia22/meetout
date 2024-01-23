import React from "react";
import InputFile from "../InputFile";

interface UserFormProps {
  onFormSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  error: string;
  loading?: boolean;
  userData: {
    name: string;
    email: string;
    password: string;
  };
  setFileInput?: (file: string) => void;
  handleInputChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

const UserForm: React.FC<UserFormProps> = ({
  onFormSubmit,
  error,
  userData,
  setFileInput,
  handleInputChange,
}) => {
  return (
    <form onSubmit={onFormSubmit}>
      {error && <p>{error}</p>}
      <article>
        {setFileInput && (
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={userData?.name || ""}
              onChange={handleInputChange}
            />
          </div>
        )}

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={userData?.email || ""}
            onChange={handleInputChange}
          />
        </div>
      </article>
      <article>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={userData?.password || ""}
            onChange={handleInputChange}
          />
        </div>
        {setFileInput && (
          <div>
            <InputFile
              onChange={(file: string) => setFileInput(file)}
              inputName={"Choose Avatar 📂"}
            />
          </div>
        )}
      </article>

      <button type="submit">Save</button>
    </form>
  );
};

export default UserForm;
