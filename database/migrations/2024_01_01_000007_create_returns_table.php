<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('returns', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained();
            $table->foreignId('order_item_id')->constrained();
            $table->foreignId('user_id')->constrained();
            $table->enum('reason', ['wrong_item', 'damaged', 'defective', 'changed_mind', 'not_as_described']);
            $table->text('description');
            $table->json('evidence_images')->nullable();
            $table->enum('status', ['pending', 'approved', 'rejected', 'completed'])->default('pending');
            $table->decimal('refund_amount', 10, 2)->nullable();
            $table->enum('refund_method', ['original', 'wallet'])->default('original');
            $table->timestamp('refunded_at')->nullable();
            $table->text('admin_notes')->nullable();
            $table->timestamps();
            
            $table->index('status');
            $table->index('user_id');
            $table->index('order_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('returns');
    }
};


