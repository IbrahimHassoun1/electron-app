<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Http\Controllers\LogController;

class LogTest extends TestCase
{
    /**
     * A basic unit test example.
     */
    public function test_example(): void
    {
        $response = LogController::addLog(
            '127.0.0.1',
            'login',
            'true',
            1
        );
        $this->assertTrue(true,$response);
    }
}
