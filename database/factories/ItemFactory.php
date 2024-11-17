<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Category;
use App\Models\Item;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Item>
 */
class ItemFactory extends Factory
{
    protected $model = Item::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
           'label' => fake()->words(3, true),
           'inventory' => fake()->numberBetween(1, 100),
           'is_layaway' => fake()->boolean,
           'price' => fake()->randomFloat(2, 5, 500),
           'category_id' => Category::inRandomOrder()->first()->id,
        ];
    }
}
