import React, { createContext, useState, useContext, useCallback, useEffect } from "react";

const LoaderContext = createContext();

export function LoaderProvider({ children }) {
    const [isLoading, setIsLoading] = useState(false);

    const showLoader = useCallback(() => {
        /* console.log("showLoader called"); //debug purposes */
        setIsLoading(true);
    }, []);

    const hideLoader = useCallback(() => {
        /* console.log("hideLoader called"); //debug purposes */
        setIsLoading(false);
    }, []);

    useEffect(() => {
        /*  console.log("isLoading state:", isLoading); //debug purposes */
    }, [isLoading]);

    return (
        <LoaderContext.Provider value={{ showLoader, hideLoader, isLoading }}>
            {children}
        </LoaderContext.Provider>
    );
}

// Export the useLoader hook
export function useLoader() {
    return useContext(LoaderContext);
}