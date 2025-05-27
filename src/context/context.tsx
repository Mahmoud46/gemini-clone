import { createContext } from "react";
import ContextDataContent from "../interfaces/context.interface";

export const Context = createContext<ContextDataContent | undefined>(undefined);
