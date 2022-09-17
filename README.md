## Redux

```console
yarn create vite redux-rtk-tut
npm i
yarn add @reduxjs/toolkit react-redux axios
yarn dev
```

create _counter-slice.ts_ with in counter that is inside of feature directory
create _store.ts_ in app directory

if we change initialState.counter to 10, we can see the initial state starts form 10 in redux devtool but it doesnt update redux store yet.

we need create our own hooks with type casting so we dont need type casting when we update them in App.tsx

```javascript
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

useDispatch hook with generic type of AppDispatch to assign to your hook to export
useSelector hook to assign to your useAppSelector hook wich has type of RootState
then we can fetch and update Dom by calling hooks in App.tsx

```javascript
import { useAppSelector } from './app/hooks'
  ...
  const count = useAppSelector(state => state.counter.value)
  function handleClick(){dispatch(incremented())}
  ...
  <button onClick={handleClick}>
          count is {count}
```
