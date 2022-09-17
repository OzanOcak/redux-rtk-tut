import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

//useDispatch hook with generic type of AppDispatch to assign to your hook to export

//useSelector hook to assign to your useAppSelector hook wich has type of RootState