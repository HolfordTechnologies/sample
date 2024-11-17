<?php

use Illuminate\Support\Facades\Route;

Route::get('/', 'App\Http\Controllers\InventoryController@welcome');
Route::get('/item/{id}', 'App\Http\Controllers\InventoryController@welcome');
Route::get('/add', 'App\Http\Controllers\InventoryController@welcome');
Route::post('/itemById', 'App\Http\Controllers\InventoryController@itemById');
Route::post('/addItem', 'App\Http\Controllers\InventoryController@addItem');
Route::post('/addComment', 'App\Http\Controllers\InventoryController@addComment');