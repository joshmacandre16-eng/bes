<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('vouchers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('seller_id')->nullable()->constrained('seller_profiles')->onDelete('cascade');
            $table->string('code')->unique();
            $table->string('name');
            $table->enum('type', ['percentage', 'fixed']);
            $table->decimal('value', 10, 2);
            $table->decimal('min_spend', 10, 2)->default(0);
            $table->decimal('max_discount', 10, 2)->nullable();
            $table->date('start_date');
            $table->date('end_date');
            $table->integer('usage_limit')->nullable();
            $table->integer('per_user_limit')->default(1);
            $table->integer('used_count')->default(0);
            $table->json('applicable_products')->nullable();
            $table->json('applicable_categories')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            
            $table->index('code');
            $table->index('is_active');
            $table->index(['start_date', 'end_date']);
        });

        Schema::create('user_vouchers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('voucher_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->timestamp('used_at')->nullable();
            $table->foreignId('order_id')->nullable()->constrained();
            $table->timestamps();
            
            $table->unique(['voucher_id', 'user_id']);
            $table->index('used_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('user_vouchers');
        Schema::dropIfExists('vouchers');
    }
};


