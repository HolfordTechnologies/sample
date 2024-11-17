import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function AddItem(props){

    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [label, setLabel] = useState('');
    const [category, setCategory] = useState('');
    const [file, setFile] = useState(false);
    const [image, setImage] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [price, setPrice] = useState('');
    const [checked, setChecked] = useState(false);
    const [inventory, setInventory] = useState(0);
  
    useEffect(() => {
        
        let ele = document.getElementById(props.settings.container);
		if(ele)
		    ele.style.display="none";

    }, [navigate]);

    const handlePriceChange = (e) => {
      setPrice(e.target.value);
    };

    const handleInventoryChange = (e) => {
        setInventory(e.target.value);
    };
  
    const handleCheckboxChange = () => {
      setChecked(!checked);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file)
        {
          setImage(URL.createObjectURL(file)); 
          setFile(file);
        }
    };
    
    useEffect(() => {
        if(file)
            setImage(URL.createObjectURL(file)); 
	}, [file]); 
    
    const handleSubmit = (e) => {

        e.preventDefault();
        if(label=='' || category=='' || price=='' || !file)    
            return;
        
        setSubmitting(true);        
        props.fetch({
            url : '/addItem', 
            upload: file, 
            params: { label: label, category: category, is_layaway: checked ? 1 : 0, inventory: inventory, price: price }, 
            error: (message) => {
                                    setError(message);
                                    setSubmitting(false);        
                                },
            callback : (d)=>{
                                setSubmitting(false);        
                                window.location = '/';
                        }
        })        
    };         

	return (
<React.StrictMode>	
    <div className="p-6">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-700">Add an Inventory Item</h2>
                <button onClick={ () => navigate('/')} className="bg-blue-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center space-x-2 transition duration-200 ease-in-out transform hover:scale-105">                    
                  <span>Cancel</span>
                </button>
        </div>  

        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
            <div className="mb-4">
                <label htmlFor="label" className="block text-gray-700 font-semibold mb-2">Label</label>
                <input
                    required 
                    type="text"
                    id="label"
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    placeholder="Enter label"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="category" className="block text-gray-700 font-semibold mb-2">Category</label>
                <select
                    required
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                >
                    <option value="" disabled>Select a category</option>
                    {props.settings.categories.map((cat, index) => (
                    <option key={index} value={cat.id}>{cat.label}</option>
                    ))}
                </select>
            </div>
           
            <div className="mb-4">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Price
                </label>
                <input
                    required 
                    type="number"
                    id="price"
                    name="price"
                    value={price}
                    onChange={handlePriceChange}
                    step="0.01"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter price"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="inventory" className="block text-sm font-medium text-gray-700">
                Total Available in Inventory
                </label>
                <input
                    required 
                    type="number"
                    id="inventory"
                    name="inventory"
                    value={inventory}
                    onChange={handleInventoryChange}
                    step="1"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter Total in Inventory"
                />
            </div>

            <div className="mb-4">
                <div className="flex items-center">
                    <label htmlFor="checkbox" className="ml-2 text-sm text-gray-700">
                        Item is on layaway.
                    </label>
                    <input
                        type="checkbox"
                        id="checkbox"
                        name="checkbox"
                        checked={checked}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 ml-2"
                    />                    
                </div>
            </div>

            <div className="mb-4">
                <label htmlFor="image" className="block text-gray-700 font-semibold mb-2">Image Upload</label>
                <input
                    required 
                    type="file"
                    id="image"
                    onChange={handleImageChange}
                    accept="image/*"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
                {image && (
                <div className="mt-2">
                    <img src={image} alt="Preview" className="w-32 h-32 object-cover rounded-lg" />
                </div>
                )}
            </div>
 
            <div>
                { submitting==false &&
                <button
                    type="submit"
                    className="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                >Add</button>
                }
                {submitting== true &&
                <div class="flex items-center justify-center ">
                  <div className="w-8 h-8 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
                </div>  
                }
                {error!='' &&
                    <div class="mt-2 bg-red-500 text-white p-4 rounded-md shadow-md">
                        <span>{error}</span>
                    </div>
                }
            </div>
        </form>
    </div>
</React.StrictMode>	
		)
}