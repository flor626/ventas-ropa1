<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        
        // ✅ Llamar al seeder del encargado
        $this->call([
            EncargadoSeeder::class,
        ]);
    }
}
