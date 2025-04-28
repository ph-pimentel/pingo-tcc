import { useState, useRef,useEffect } from "react";


export function ShowPassword(inputElement) {
    if (inputElement) {
      inputElement.type = inputElement.type === "password" ? "text" : "password";
    }
  }

export function focusInput(e) {
    const input = e.currentTarget.querySelector("input");
    if (document.activeElement !== input) {
        input.focus();
    }
}

export function togglePasswordVisibility(e, setShowPassword) {
    e.stopPropagation();
    setShowPassword(prevState => !prevState);
}


export function useProfileMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const buttonRef = useRef(null);

    const toggleMenu = (e) => {
        e.stopPropagation(); 
        setIsOpen(prev => !prev);
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                menuRef.current && !menuRef.current.contains(event.target) &&
                buttonRef.current && !buttonRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return { isOpen, toggleMenu, menuRef, buttonRef };
}
