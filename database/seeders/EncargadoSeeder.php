<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class EncargadoSeeder extends Seeder
{
    public function run(): void
    {
        // Evita duplicar el encargado si ya existe
        if (!User::where('email', 'encargado@gmail.com')->exists()) {
            User::create([
                'name' => 'Juan Encargado',
                'email' => 'encargado@gmail.com',
                'password' => Hash::make('password'),
                'rol' => 'encargado',
            ]);
        }
    }
}
