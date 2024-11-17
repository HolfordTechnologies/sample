import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Welcome(props){

    const navigate = useNavigate();

    useEffect(() => {
        
        let ele = document.getElementById(props.settings.container);
		if(ele)
		    ele.style.display="block";

    }, [navigate]);

    return(<></>)
}