import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RooState } from "../store/store";

export const useAppSelector = useSelector.withTypes<RooState>();

export const useAppDispathch = useDispatch.withTypes<AppDispatch>();
