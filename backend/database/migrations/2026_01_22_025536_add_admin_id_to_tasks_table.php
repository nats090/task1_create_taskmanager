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
    Schema::table('tasks', function (Blueprint $table) {
        $table->foreignId('admin_id')
              ->nullable() // ✅ allow nulls for existing rows
              ->constrained('users')
              ->onDelete('cascade');
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tasks', function (Blueprint $table) {
            // ✅ Drop foreign key and column if rolled back
            $table->dropForeign(['admin_id']);
            $table->dropColumn('admin_id');
        });
    }
};
