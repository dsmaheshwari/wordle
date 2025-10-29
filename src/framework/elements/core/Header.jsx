import RenderComponent from "../../jsx/Render-Component.jsx";
import { useAppProperties } from "../../jsx/app-properties.jsx";

function HeaderTemplate() {
    const { headerName } = useAppProperties();

    return (
        <header>
            <h1>
                {headerName}
            </h1>
        </header>
    );
}

function Header() {
    return RenderComponent(HeaderTemplate, {}, {});
}

export default Header;
