<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Models\Data;

class DataServicesProvider extends ServiceProvider
{
    public static function getData($dataRequest)
    {
        try {
            $events = Data::query();

            $startDate = $dataRequest->start_date;
            $endDate = $dataRequest->end_date;

            if ($startDate) {
                $events->where('date', '>=', $startDate);
            }
            if ($endDate) {
                $events->where('date', '<=', $endDate);
            }

            $totalDistance = $events->sum('distance_km');
            $totalSteps = $events->sum('steps');
            $totalMinutes = $events->sum('active_minutes');

            $eventRecords = $events->get();
            return [
                'total_distance' => $totalDistance,
                'total_steps' => $totalSteps,
                'total_active_minutes' => $totalMinutes,
                'event_records' => $eventRecords,
            ];
        } catch (\Exception $e) {

        }
    }
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
