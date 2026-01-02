import { useState } from "react";
import "./Toggle.scss";
function Toggle() {
    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => setIsOpen((prev) => !prev)
    return (
        <div>
            <button onClick={toggle}> {isOpen ? "Hide" : "Show"} Detail  </button>
            {isOpen && <div className="bufolo">Xin chào con trâu!!</div>}
        </div>
    );
}
export default Toggle;