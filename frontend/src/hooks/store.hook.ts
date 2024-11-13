// Use throughout your app instead of plain `useDispatch` and `useSelector`
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store/store";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()