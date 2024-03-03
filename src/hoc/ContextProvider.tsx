import {createContext, FC, PropsWithChildren, Dispatch, SetStateAction, useState} from "react";

type contextType = {
    theme: boolean;
    setTheme: Dispatch<SetStateAction<boolean>>;
}
const Context = createContext<contextType | null>(null);

interface IProps extends PropsWithChildren {

}

const ContextProvider: FC<IProps> = ({children}) => {
    const [theme, setTheme] = useState(false);
    return (
        <Context.Provider value={{theme, setTheme}}>
            {children}
        </Context.Provider>
    );
};

export {
    ContextProvider,
    Context
};