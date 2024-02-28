import { useState } from "react";

export function useQuillInput() {
    const[ quillvalue, setQuillValue ] = useState("");

    const onChange = (value) => {
        setQuillValue(() => value);
    }

    return [ quillvalue, onChange ];
}