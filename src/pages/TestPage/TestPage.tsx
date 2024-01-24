import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {
  AppDispatch,
  RootState,
  addCents,
  addDollars,
  addUser,
} from "../../app/store";

const TestPage = () => {
  const useAppDispatch = () => useDispatch<AppDispatch>();
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const value = useAppSelector((state) => state.money.cash);
  const users = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  const addDollarsHandler = (sum: number) => {
    dispatch(addDollars(sum));
  };
  const addCentsHandler = (sum: number) => {
    dispatch(addCents(sum));
  };
  const addUserHandler = () => {
    dispatch(addUser({ name: "gg", sirname: "gg2" }));
  };
  return (
    <>
      <h1>
        Money: {value.dollars}.{value.cents}
      </h1>
      <button onClick={() => addDollarsHandler(Number(prompt()))}>
        Add dollar
      </button>
      <button onClick={() => addCentsHandler(Number(prompt()))}>
        Add cent
      </button>
      <button onClick={addUserHandler}>add user</button>
      <h1>Users list: </h1>
      <ul>
        {users.map((user) => (
          <li>
            {user.name} {user.sirname}
          </li>
        ))}
      </ul>
    </>
  );
};

export default TestPage;
