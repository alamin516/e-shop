import { useEffect } from "react";


const useTitle = title =>{
    useEffect(() => {
        document.title = `Car Seller - ${title}`;
    }, [title]);
}

export default useTitle;