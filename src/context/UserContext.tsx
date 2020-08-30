import React, {
  createContext,
  Dispatch,
  ReducerState,
  useReducer,
} from 'react';

type User = {
  username: string;
};

type Action = { type: 'SET_USER'; username: string };

const UserContext = createContext<{
  state: User;
  dispatch: React.Dispatch<Action>;
}>({ state: { username: '' }, dispatch: () => null });

const UserProvider = ({
  children,
}: {
  children: React.ReactChildren;
}): React.ReactElement => {
  const [state, dispatch]: [
    ReducerState<(user: User, action: Action) => { username: string }>,
    Dispatch<Action>,
  ] = useReducer(
    (user: User, action: Action): User => {
      switch (action.type) {
        case 'SET_USER':
          return { username: action.username };
        default:
          return state;
      }
    },
    { username: '' },
  );
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
