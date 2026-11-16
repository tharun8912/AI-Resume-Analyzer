
import { createContext, useContext, useState } from "react";

const AccordionContext = createContext(null);

const Accordion = ({ children, defaultOpen = null }) => {
    const [openItem, setOpenItem] = useState(defaultOpen);

    const toggleItem = (id) => {
        setOpenItem((current) => (current === id ? null : id));
    };

    return (
        <AccordionContext.Provider value={{ openItem, toggleItem }}>
            <div className="flex flex-col gap-3 w-full">
                {children}
            </div>
        </AccordionContext.Provider>
    );
};

const AccordionItem = ({ id, children }) => {
    return (
        <div className="border border-gray-200 rounded-2xl px-5 py-3 w-full">
            {children}
        </div>
    );
};

const AccordionHeader = ({ itemId, children }) => {
    const context = useContext(AccordionContext);
    const isOpen = context.openItem === itemId;

    return (
        <button
            type="button"
            onClick={() => context.toggleItem(itemId)}
            aria-expanded={isOpen}
            className="flex items-center justify-between w-full text-left gap-4"
        >
            <div className="flex-1">{children}</div>
            <span className="text-2xl text-gray-500">
                {isOpen ? "−" : "+"}
            </span>
        </button>
    );
};

const AccordionContent = ({ itemId, children }) => {
    const context = useContext(AccordionContext);
    const isOpen = context.openItem === itemId;

    if (!isOpen) return null;

    return (
        <div className="pt-4">
            {children}
        </div>
    );
};

export {
    Accordion,
    AccordionItem,
    AccordionHeader,
    AccordionContent,
};
