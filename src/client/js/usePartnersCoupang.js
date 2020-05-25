import { useCallback, useRef } from "react";
import useScript from "react-script-hook";

function usePartnersCoupang () {
    const partnersCoupangRef = useRef(null);

    const onload = useCallback(() => {
        partnersCoupangRef.current = new PartnersCoupang.G({
            id: 217462
        });
    }, []);

    useScript({
        src: "https://ads-partners.coupang.com/g.js",
        onload
    });

    if(partnersCoupangRef.current!=null){
        return partnersCoupangRef.current;
    }
};

export default usePartnersCoupang;
