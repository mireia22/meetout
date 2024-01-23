import React from "react";
import InputFile from "../InputFile";
import { FetchedUserData } from "../../types/Types";

interface UserFormProps {
  onFormSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  error: string;
  loading?: boolean;
  userData: FetchedUserData;
  setFileInput?: (file: File | null) => void;
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
      <article>
        {setFileInput && (
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={userData?.user?.name || ""}
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
            value={userData?.user?.email || ""}
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
            value={userData?.user?.password || ""}
            onChange={handleInputChange}
          />
        </div>
        {setFileInput && (
          <div>
            <InputFile
              onChange={(file: File | null) => setFileInput(file)}
              inputName={"Choose Avatar 📂"}
            />
          </div>
        )}
      </article>
      {error && <p>🚫 {error}</p>}

      <button type="submit">Save</button>
    </form>
  );
};

export default UserForm;
