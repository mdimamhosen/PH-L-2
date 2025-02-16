import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";

export const useAppSelector = useSelector.withTypes<RootState>();

export const useAppDispathch = useDispatch.withTypes<AppDispatch>();
