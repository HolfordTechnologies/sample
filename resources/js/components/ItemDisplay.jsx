import React, { useState } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const ItemDisplay = ({ fetch, prependComment, id, image, label, price, category, is_layaway, inventory, comments }) => {

  const [comment, setComment] = useState('');
  const [posting, setPosting] = useState(false);

  const handleCommentChange = (e) => setComment(e.target.value);

  const handleCommentSubmit = (e) => {
    
    e.preventDefault();
    setPosting(true);  
    fetch({url : '/addComment', 'params': { 'item_id': id, 'comment': comment.slice(0, 512) }, 'callback' : (d)=>{
      setPosting(false);          
      prependComment(d);
      setComment('');    
    }})
  };

  const imageURI = image ? '/storage/uploads/' + image : 'fallback-image.png'

  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg shadow-lg overflow-hidden mb-4">
      <div className="flex justify-center py-4">
        <img className="h-48 w-48 object-cover" src={imageURI} onerror="this.onerror=null; this.src='fallback-image.png';"/>
      </div>

      <div className="px-6 py-4">
        <h2 className="text-xl font-semibold text-gray-800">{label}</h2>        
        <div className="mt-4 space-y-2">
          <p className="text-gray-600"><strong>Price:</strong> ${price}</p>
          <p className="text-gray-600"><strong>Category:</strong> {category.label}</p>
          <p className="text-gray-600"><strong>In Stock:</strong> {inventory}</p>
          {is_layaway==1 &&
            <p className="text-gray-600 mt-1"><strong>This item is currently on layaway.</strong></p>
          }          
        </div>
      </div>

      <div className="max-w-3xl mx-auto p-4">
     
        <div className="border-b pb-4 mb-6">
          <h2 className="text-2xl font-semibold">Comments</h2>
          <p className="text-sm text-gray-600">Share your thoughts with us!</p>
        </div>
      
        <div className="mb-6">
          <form onSubmit={ handleCommentSubmit }>
            { posting==true &&
              <div className="flex items-center justify-center h-150 bg-gray-100 mt-2 mb-2">
                <div className="w-8 h-8 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
              </div>     
            }
            { posting==false &&
            <textarea
              maxlength="512"
              placeholder="Write a comment..."
              rows="4"
              value={comment}
              onChange={handleCommentChange}
              className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            }
            <button
              type="submit"
              className="mt-2 px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Post Comment
            </button>
          </form>
        </div>
      
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="p-4 border rounded-md bg-gray-50 shadow-sm">
              <div className="flex items-center space-x-3 mb-2">
                <div>
                  <h3 className="font-semibold">{comment.description}</h3>
                  <p className="text-sm text-gray-500">{ dayjs(comment.updated_at).fromNow() }</p>
                </div>
              </div>
              <p className="text-gray-700">{comment.text}</p>
            </div>
          ))}
        </div>
    </div>
    
  </div>
  );
};

export default ItemDisplay;