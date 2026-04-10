<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('carts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('product_id')->constrained('products');
            $table->integer('quantity')->default(1);
            $table->json('variant_details')->nullable();
            $table->string('variant_hash')->nullable(); // MD5 of variant_details
            $table->boolean('selected')->default(true);
            $table->timestamps();
            
            $table->unique(['user_id', 'product_id', 'variant_hash']);
            $table->index('user_id');
            $table->index(['user_id', 'product_id']);
            $table->index('selected');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('carts');
    }
};





