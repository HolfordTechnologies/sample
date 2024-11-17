<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Coding Challenge - Jon Holford</title>
        @vite('resources/css/app.css')
        <script>
    		window.settings = @php echo json_encode($settings); @endphp;            
            function addItem(){
                window.postMessage("addItem", "*");
            }
            function selectItem(id){                
                window.postMessage(["selectItem", id], "*");
            }
    	</script>
    </head>
    <body>
        <div class="max-w-4xl mx-auto p-4">
            <div class="bg-white shadow-lg rounded-lg overflow-hidden">
                <div id="main-container" style="display: none" class="p-6">
                    <div class="flex justify-between items-center mb-4">
                        <h2 class="text-2xl font-semibold text-gray-700">Inventory</h2>
                        <button onclick="addItem()" class="bg-blue-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center space-x-2 transition duration-200 ease-in-out transform hover:scale-105">
                            <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                            </svg>
                            <span>Add Item</span>
                        </button>
                    </div>      
                    <div class="overflow-x-auto">
                        <table class="min-w-full table-auto border-collapse">
                            <thead>
                                <tr class="bg-gray-100">
                                <th class="px-4 py-2 text-left text-sm font-medium text-gray-600"></th>
                                <th class="px-4 py-2 text-left text-sm font-medium text-gray-600">Item</th>
                                <th class="px-4 py-2 text-left text-sm font-medium text-gray-600">Category</th>
                                <th class="px-4 py-2 text-left text-sm font-medium text-gray-600">Available</th>                                                                
                                <th class="px-4 py-2 text-left text-sm font-medium text-gray-600">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                            @if($items->isEmpty())
                                <tr class="border-t">
                                    <td col-span="4" class="px-4 py-2 text-sm text-gray-700">No Items Found</td>
                                </tr>                                
                            @else
                                @foreach($items as $item)
                                @php
                                    $image = $item->image ? '/storage/uploads/'. $item->image : 'fallback-image.png';
                                @endphp
                                <tr onclick="selectItem({{$item->id}})" class="border-t hover:bg-blue-100 cursor-pointer">
                                    <td class="px-4 py-2 text-sm text-gray-700"><img src="{{$image}}" onerror="this.onerror=null; this.src='fallback-image.png';"
                                                class="w-16 h-16 object-cover">
                                    </td>    
                                    <td class="px-4 py-2 text-sm text-gray-700">
                                        {{$item->label}}
                                    </td>
                                    <td class="px-4 py-2 text-sm text-gray-700">{{$item->category->label}}</td>    
                                    <td class="px-4 py-2 text-sm text-gray-700">{{$item->inventory}}</td>
                                    <td class="px-4 py-2 text-sm text-gray-700">${{$item->price}}</td>
                                </tr>
                                @endforeach
                            @endif
                            </tbody>
                        </table>                        
                    </div>
                </div>
                <div id="app"></div>
		        @viteReactRefresh
		        @vite('resources/js/app.jsx')
            </div>
        </div>        
    </body>
</html>