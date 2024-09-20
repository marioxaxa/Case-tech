import LoginComponent from "../components/LoginComponent";
import MiniDrawer from "../components/MiniDrawer";

type Props = {};

export default function Home({}: Props) {
    return (
        <div>
            <MiniDrawer>
                <LoginComponent />
            </MiniDrawer>
        </div>
    );
}
