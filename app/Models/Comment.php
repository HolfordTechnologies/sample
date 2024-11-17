<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Comment extends Model
{
    use HasFactory;
    
    protected $table = 'comments';
    protected $primaryKey = 'id';

    public function item()
    {
        return $this->belongsTo('App\Models\Item', 'item_id', 'id');
    }
}
