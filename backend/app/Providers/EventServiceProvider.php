<?php

namespace App\Providers;

use App\Events\CsvUploaded;
use App\Listeners\ProcessCsvListener;
use Illuminate\Support\ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    protected $listen = [
        CsvUploaded::class => [
            ProcessCsvListener::class,
        ],
    ];
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
