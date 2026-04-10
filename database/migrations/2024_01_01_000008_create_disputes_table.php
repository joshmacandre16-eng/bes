<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('disputes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('return_id')->unique()->constrained()->onDelete('cascade');
            $table->text('buyer_message');
            $table->text('seller_message')->nullable();
            $table->enum('admin_decision', ['buyer_wins', 'seller_wins', 'pending'])->default('pending');
            $table->text('decision_reason')->nullable();
            $table->foreignId('decided_by')->nullable()->constrained('users');
            $table->timestamp('decided_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('disputes');
    }
};

