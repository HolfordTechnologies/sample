import React, { useEffect, useState } from "react";
import {  useParams, useNavigate } from "react-router-dom";
import ItemDisplay from "./ItemDisplay";

export function SelectItem(props){
    const navigate = useNavigate();
    const params = useParams();
    const [id,setID] = useState(false)
    const [loading,setLoading] = useState(false)
    const [item,setItem] = useState({image: '', label: '', price: '', category: {id: '', label: ''}, is_layaway: '', inventory: '', comments: []})
    
    const prependComment = (comment) => {                
        setItem( (prevState) => ({...prevState, comments: [comment, ...prevState.comments]}) );
    }

    useEffect(() => {

        let ele = document.getElementById(props.settings.container);
		if(ele)
		    ele.style.display="none";

        if(params.id )
            setID(params.id);
        
    }, [navigate]);

    useEffect(() => {
		
        if(id)
        {
            setLoading(true);
            props.fetch({url : '/itemById', 'params': { 'item_id': id}, 'callback' : (d)=>{

                setLoading(false);
                setItem(d);
            }})
        }

	  }, [id]);
    
	return (
<React.StrictMode>	
    <div className="p-6">
        <div className="flex justify-between items-center mb-4">
           <button onClick={()=> navigate('/')} className="bg-blue-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center space-x-2 transition duration-200 ease-in-out transform hover:scale-105">                    
                <span>Back</span>
           </button>
        </div>  
    </div>

    {loading==true &&
        <div className="flex items-center justify-center h-150 bg-gray-100 mt-2 mb-2">
            <div className="w-8 h-8 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>      
    }
    {loading==false &&
       <ItemDisplay prependComment={prependComment} fetch={props.fetch} {...item} />
    }
</React.StrictMode>	
		)
}