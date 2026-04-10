<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Buyer Profiles
        Schema::create('buyer_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->unique()->constrained()->onDelete('cascade');
            $table->integer('loyalty_points')->default(0);
            $table->decimal('total_spent', 12, 2)->default(0);
            $table->integer('order_count')->default(0);
            $table->string('preferred_payment_method')->nullable();
            $table->json('wishlist')->nullable();
            $table->json('saved_cards')->nullable();
            $table->boolean('newsletter_subscribed')->default(false);
            $table->timestamps();
            
            $table->index('loyalty_points');
        });

        // Seller Profiles
        Schema::create('seller_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->unique()->constrained()->onDelete('cascade');
            $table->string('store_name');
            $table->string('store_slug')->unique();
            $table->string('store_logo')->nullable();
            $table->string('store_banner')->nullable();
            $table->text('store_description')->nullable();
            $table->string('business_license')->nullable();
            $table->string('tax_id')->nullable();
            $table->string('bank_account_name');
            $table->string('bank_account_number');
            $table->string('bank_name');
            $table->enum('verification_status', ['pending', 'approved', 'rejected'])->default('pending');
            $table->boolean('is_open')->default(true);
            $table->decimal('commission_rate', 5, 2)->default(10.00);
            $table->integer('total_sales')->default(0);
            $table->decimal('total_revenue', 12, 2)->default(0);
            $table->decimal('rating_avg', 3, 2)->default(0);
            $table->integer('response_rate')->default(100);
            $table->integer('response_time')->default(60);
            $table->timestamps();
            
            $table->index('verification_status');
            $table->index('store_slug');
        });

        // Courier Profiles
        Schema::create('courier_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->unique()->constrained()->onDelete('cascade');
            $table->string('full_name');
            $table->string('national_id')->unique();
            $table->string('driver_license')->unique();
            $table->enum('vehicle_type', ['motorcycle', 'car', 'bicycle'])->default('motorcycle');
            $table->string('vehicle_plate');
            $table->json('service_area');
            $table->decimal('current_latitude', 10, 8)->nullable();
            $table->decimal('current_longitude', 11, 8)->nullable();
            $table->boolean('is_online')->default(false);
            $table->enum('verification_status', ['pending', 'approved', 'rejected'])->default('pending');
            $table->integer('total_deliveries')->default(0);
            $table->decimal('rating_avg', 3, 2)->default(5.00);
            $table->integer('acceptance_rate')->default(100);
            $table->integer('on_time_rate')->default(100);
            $table->timestamps();
            
            $table->index('is_online');
            $table->index('verification_status');
        });

        // Admin Profiles
        Schema::create('admin_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->unique()->constrained()->onDelete('cascade');
            $table->string('position');
            $table->string('department');
            $table->json('permissions');
            $table->timestamp('last_action_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('admin_profiles');
        Schema::dropIfExists('courier_profiles');
        Schema::dropIfExists('seller_profiles');
        Schema::dropIfExists('buyer_profiles');
    }
};


