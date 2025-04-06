<?php

namespace App\Listeners;

use \Carbon\Carbon;
use \App\Models\Data;
use App\Events\CsvUploaded;
use Illuminate\Support\Facades\Storage;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Log;


class ProcessCsvListener
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(CsvUploaded $event): void
    {
        $fullPath = Storage::path($event->filePath);

        if (($handle = fopen($fullPath, 'r')) !== false) {
            // Skip the header row directly by reading it (we don't process the header)
            fgetcsv($handle);

            // Prepare an array to store the rows to be inserted
            $dataToInsert = [];

            // Read and process each row from the file
            while (($row = fgetcsv($handle, 1000, ',')) !== false) {
                if (count($row) == 5) {
                    try {
                        $date = Carbon::createFromFormat('Y-m-d', $row[1])->format('Y-m-d H:i:s');

                        // Add the row to the array of data to be inserted
                        $dataToInsert[] = [
                            'user_id' => $row[0],
                            'date' => $date,
                            'steps' => $row[2],
                            'distance_km' => $row[3],
                            'active_minutes' => $row[4],
                        ];
                    } catch (\Exception $e) {
                        Log::error('Invalid date format in row: ' . implode(',', $row) . ' Error: ' . $e->getMessage());
                        continue;
                    }
                } else {
                    Log::error('Invalid row format: ' . implode(',', $row));
                }

                // Insert data in batches 
                if (count($dataToInsert) >= 1000) {
                    Data::insert($dataToInsert);
                    $dataToInsert = [];
                }
            }

            if (!empty($dataToInsert)) {
                Data::insert($dataToInsert);
            }

            fclose($handle);
        }
    }

}
