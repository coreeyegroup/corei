import {
    createContext,
    useContext,
    type PropsWithChildren
} from "react";

import { NavigationManager } from "../manager/navigation-manager";

const NavigationContext = createContext<NavigationManager | null>(null);

export function NavigationProvider({
    children
}: PropsWithChildren) {

    const manager = new NavigationManager();

    return (
        <NavigationContext.Provider value={manager}>
            {children}
        </NavigationContext.Provider>
    );
}

export function useNavigation(): NavigationManager {

    const ctx = useContext(NavigationContext);

    if (!ctx) {
        throw new Error("NavigationProvider not initialized");
    }

    return ctx;
}
