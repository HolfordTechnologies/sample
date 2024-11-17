<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Item extends Model
{
    use HasFactory;

    protected $table = 'items';
    protected $primaryKey = 'id';
    protected $fillable = ['label', 'inventory', 'price', 'is_layaway', 'image'];   
    
    public function category()
	{
	    return $this->belongsTo('App\Models\Category', 'category_id', 'id');
	} 

    public function comments()
    {
        return $this->hasMany( 'App\Models\Comment', 'item_id', 'id');
    }
}
