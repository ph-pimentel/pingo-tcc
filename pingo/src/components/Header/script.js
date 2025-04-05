import { Scripts } from "react-router-dom";

export function InputFocus(e){
    const input = e.currentTarget.querySelector("input");
    if (document.activeElement !== input) {
        input.focus();
    }
}
