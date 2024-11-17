import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import axios from 'axios';

import {Welcome}  from './components/Welcome.jsx';
import {AddItem}  from './components/AddItem.jsx';
import {SelectItem}  from './components/SelectItem.jsx';

import '../css/app.css';

function App(props){
	
	const navigate = useNavigate();
	
	useEffect(() => {
		
		window.addEventListener("message", (event) => {

			if (Array.isArray(event.data)) 
				if(event.data[0]=='selectItem')
					return navigate('/item/' + event.data[1])
			
		  	if (event.data === "addItem")
				return navigate('/add')
		});
	  }, []);

	const fetch = ( req ) => {

		const CancelToken = axios.CancelToken;
		let source = CancelToken.source();
		let cb = req.callback;
		let headers = {};
		let formData = {};
		let options = { withCredentials: true , headers:headers, cancelToken: source.token }

		if(req.upload)
		{
			headers['Content-Type'] ='multipart/form-data';
			formData = new FormData();
    		formData.append('file', req.upload);
			options.params = req.params
		}
		else
		{
			formData = req.params;
		}			  
		
		axios.post( req.url, formData, options)
	
			.then(res => {	
				if( res.data.result === false )
				{
					console.log("ERROR" + res.data.response)
				}
				else
					if( res.data.result === true )
					{
						if(cb)
							cb(res.data.response);
					}
	    })
		.catch((error) => {						
			if(req.error)
				req.error(error.message);			
		})

	    return source;
	}
	
	return (
<Routes>
	<Route path="/" element={<Welcome settings={props.settings}/>} />
	<Route path="/add" element={<AddItem fetch={fetch} settings={props.settings}/>}/>
   	<Route path="/item/:id" element={<SelectItem fetch={fetch} settings={props.settings}/>}/>			    		
</Routes>
		)
}
const root = ReactDOM.createRoot(document.getElementById("app"));
root.render( <BrowserRouter><App settings={window.settings}/> </BrowserRouter>);