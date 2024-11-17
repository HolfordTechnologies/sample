<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('items', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('category_id');
            $table->string('label',256)->default('');
            $table->integer('inventory')->default(0);
            $table->decimal('price', 10, 2)->nullable();
            $table->boolean('is_layaway')->default(0);
            $table->string('image',256)->default('');
            $table->timestamps();
        });

        Schema::create('category', function (Blueprint $table) {
            $table->id();
            $table->string('label',256)->default('');            
        });

        Schema::create('items_category', function (Blueprint $table) {
            $table->unsignedBigInteger('item_id');
            $table->unsignedBigInteger('category_id');
            $table->foreign('item_id')->references('id')->on('items')->onDelete('cascade');
            $table->foreign('category_id')->references('id')->on('category')->onDelete('cascade');
            $table->timestamps();
        });

        Schema::create('comments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('item_id');
            $table->foreign('item_id')->references('id')->on('items')->onDelete('cascade');
            $table->string('description',512)->default('');
            $table->timestamps();
        });

        DB::table('category')->insert([
            ['label' => 'Entertainment'],
            ['label' => 'Grocery'],
            ['label' => 'Books'],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('comments');
        Schema::dropIfExists('items_category');
        Schema::dropIfExists('items');
        Schema::dropIfExists('category');
    }
};
