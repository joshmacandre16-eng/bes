<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained();
            $table->foreignId('product_id')->constrained();
            $table->foreignId('user_id')->constrained();
            $table->integer('rating')->check('rating BETWEEN 1 AND 5');
            $table->text('comment')->nullable();
            $table->json('images')->nullable();
            $table->text('seller_reply')->nullable();
            $table->boolean('is_verified_purchase')->default(true);
            $table->timestamps();
            
            $table->unique(['order_id', 'product_id']);
            $table->index('product_id');
            $table->index('rating');
            $table->index('user_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
};

