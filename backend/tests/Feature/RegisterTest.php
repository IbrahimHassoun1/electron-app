<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class RegisterTest extends TestCase
{
    use WithFaker;
    /**
     * A basic feature test example.
     */
    public function test_example(): void
    {
        $data = [
            'first_name' => $this->faker->firstName,
            'last_name' => $this->faker->lastName,
            'email' => $this->faker->unique()->safeEmail,
            'password' => 'password',
            'password_confirmation' => 'password',
            'date_of_birth' => $this->faker->date('Y-m-d', '2005-01-01'),
            'place_of_birth' => $this->faker->city,
            'street' => $this->faker->streetAddress,
            'city' => $this->faker->city,
            'country' => $this->faker->country,
        ];
        $response = $this->post('/api/v0.1/register', $data);

        $response->assertStatus(201);
    }
}
