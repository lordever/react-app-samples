import {useEffect, useRef} from "react";

export const useRerenderCount = () => {
    const countRef = useRef(1);

    useEffect(() => {
        countRef.current += 1;
    });

    return {count: countRef.current};
}