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

---

## adding new feature into app and redux

First we need add new method in reducers that consists of state and action(function)in counter-slice.js and we need export it.

```javascript
amountAdded(state, action: PayloadAction<number>) {
      state.value += action.payload;
    },
export const { , amountAdded } = counterSlice.actions;
```

Then import amoutAdded reducer,then create a function where you can dispatch the reducer. Finally we can call the function in jsx/tsx.

```javascript
import { amountAdded } from "./features/counter/counter-slice";
...
function increasedByFour() {
  dispatch(amountAdded(4));
}
...
<button onClick={increasedByFour}> add 4 </button>
```

---

## RTK

we need to create a new features, in this case it is dogs-api-slice.ts under fetures/dogs directories
we will use fetchBaseQueryto fetch and endpoints to path right end point, within createApi build-in method,

```javascript
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.thedogapi.com/v1',
    prepareHeaders(headers) {
      headers.set('x-api-key', DOGS_API_KEY);

      return headers;
    },
  }),
  endpoints(builder) {
    return {
      fetchBreeds: builder.query<Breed[], number | void>({
        query(limit = 10) {
          return `/breeds?limit=${limit}`;
        },
      }),
    };
  },
});

export const { useFetchBreedsQuery } = apiSlice;
```

useFetchBreedsQuery is autamatically created, based on the endpoints method we created earlier. Now we can use this hook in App.tsx

```javascript
const { data = [], isFetching } = useFetchBreedsQuery();
    ...
{data.map((breed) => (
                <tr key={breed.id}>
                  <td>{breed.name}</td>
```

data comes from useFetchBreedsQuery is breed[] or undefine so we assign empty array. Finally we can access fetched data.

---

if you go network tab in devstool, if we fetch 10 dags then 5, than 10 again, we will see is is not fetching network tab because middleware keep in cache.
