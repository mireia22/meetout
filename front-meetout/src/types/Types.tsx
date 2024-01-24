export type UserData = {
  _id?: string | null;
  name: string | null;
  email: string | null;
  password: string | null;
  avatar?: string | null;
  postedEvents?: Event[];
  asistedEvents?: Event[];
  setUserData?: React.Dispatch<React.SetStateAction<UserData>> | null;
};

export type UserDataWithToken = {
  token: string;
  user: UserData;
};

export type LoginFormUserData = {
  email: string | null;
  password: string | null;
};

export type Asistant = {
  _id?: string | null;
  name: string | null;
  email: string | null;
};

export type Event = {
  _id: string;
  title?: string | null;
  date: string | null;
  description?: string | null;
  ubication?: string | null;
  sport?: string | null;
  createdBy?: UserData | null;
  createdAt?: string | null;
  difficulty?: string | null;
  eventImage?: string | null;
  participants?: Asistant[] | null;
};
