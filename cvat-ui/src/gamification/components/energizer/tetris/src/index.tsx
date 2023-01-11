import { createRoot } from "react-dom/client";
import ModalApp from "./ModalApp";
import "./styles.css";

import TetrisApp from "./TetrisApp";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);

root.render(<ModalApp />);
