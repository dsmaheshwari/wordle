import React, {createContext, useContext, useEffect, useMemo, useState} from 'react';

function setPageTitle(title) {
    document.title = title;
}

// Shape of the global app properties
// Add more fields here as needed later (e.g. theme, user, etc.)
const AppPropertiesContext = createContext({
    headerName: '',
    setHeaderName: () => {
    },
});

function AppPropertiesProvider({children}) {
    const [headerName, setHeaderName] = useState('');

    useEffect(() => {
        setPageTitle(headerName);
    }, [headerName]);

    const value = useMemo(
        function () {
            return {
                headerName,
                setHeaderName,
            }
        },
        [headerName]
    );

    return (
        <AppPropertiesContext value={value}>
            {children}
        </AppPropertiesContext>
    );
}

function useAppProperties() {
    return useContext(AppPropertiesContext);
}

export {AppPropertiesContext, AppPropertiesProvider, useAppProperties};
export default AppPropertiesProvider;
