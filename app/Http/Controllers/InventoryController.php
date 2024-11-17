<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Item;
use App\Models\Category;
use App\Models\Comment;

class InventoryController extends Controller
{   
    /**
    * This method responds to get requests for initial page load
    * 
    * @param \Illuminate\Http\Request $request The HTTP request instance containing input data, headers, and other details.
    * @return \Illuminate\Http\Response|\Illuminate\Contracts\Routing\ResponseFactory The response returned to the client.
    */
    public function welcome(Request $request)
    {
        $items = Item::with('category')->get();    
        $settings = ['container'=> 'main-container', 'categories'=> Category::all() ] ;

        return view('welcome', ['items'=> $items, 'settings'=> $settings]);
    }

    /**
    * Loads a single Item record for the provided id
    * 
    * @param \Illuminate\Http\Request $request The HTTP request instance containing input data containing the item's unique id, headers, and other details.
    * @return \Illuminate\Http\Response|\Illuminate\Contracts\Routing\ResponseFactory The response returned to the client.
    */
    public function itemById(Request $request)
    {
        $item_id = $request->has('item_id') ? $request->get('item_id') : false;
        $item    = false;
        
        if($item_id)
            $item = Item::with('category')->with(['comments' => function($query){
                                                                     $query->orderBy('updated_at', 'desc'); 
                                                                }
                                                ])->where('id','=',$item_id)->first();
          
        return response()->json( [ 'result' => true, 'response' => $item]);
    }

    /**
    * This method responds loads a single Item record for the provided id
    * 
    * @param \Illuminate\Http\Request $request The HTTP request instance containing input data containing the Item properties, headers, and other details.
    * @return \Illuminate\Http\Response|\Illuminate\Contracts\Routing\ResponseFactory The response returned to the client.
    */
    public function addItem(Request $request)
    {                       
        $validated = $request->validate([
            'price'         => 'required|numeric|min:0',       
            'inventory'     => 'required|numeric|min:0',       
            'label'         => 'required|string|max:255',      
            'category'      => 'required|exists:category,id',
            'is_layaway'    => 'required',
            'file'          => 'required'    
        ]);

        $path       = false;
        $customFileName = '';

        if ($request->hasFile('file')) 
        {
            $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            $randomString = 'I';
        
            for ($i = 0; $i < 16; $i++) 
            {
                $index = rand(0, strlen($characters) - 1);
                $randomString .= $characters[$index];
            }
                    
            $randomString .= time();
            $file = $request->file('file');
            $customFileName = $randomString . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('uploads', $customFileName, 'public');
        }

        $fill = [
            'label'         => $validated['label'],
            'inventory'     => $validated['inventory'],
            'price'         => $validated['price'],
            'image'         => $customFileName,
            'is_layaway'    => $validated['is_layaway'] ? 1: 0
        ];

        $item = new Item($fill);  
        $item->category()->associate($validated['category']);  
        $item->save();

        return response()->json(['result'=>true,'response'=> [ 'stored' => $path ]]);        
    }

    /**
    * Creates a new Comment on a specific Item
    * 
    * @param \Illuminate\Http\Request $request The HTTP request instance containing input data containing the Comment value and Item unique id, headers, and other details.
    * @return \Illuminate\Http\Response|\Illuminate\Contracts\Routing\ResponseFactory The response returned to the client.
    */
    public function addComment(Request $request)
    {   
        $validated = $request->validate([
            'item_id'         => 'required|numeric|min:0|exists:items,id',       
            'comment'         => 'required|string|max:512',                  
        ]); 

        $Comment = new Comment();
        $Comment->description = $validated['comment'];
        $Comment->item()->associate($validated['item_id']);  
        $Comment->save();

        return response()->json(['result'=>true,'response'=> $Comment ]);         
    }
}
