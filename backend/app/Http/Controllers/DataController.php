<?php

namespace App\Http\Controllers;

use App\Providers\DataServicesProvider;
use Exception;
use App\Models\Data;
use App\Http\Requests\DataRequest;
use Illuminate\Database\QueryException;


class DataController extends Controller
{
    public function getData(DataRequest $dataRequest)
    {
        try {

            $response = DataServicesProvider::getData($dataRequest);
            return response()->json([
                'message' => 'Data fetched successfully',
                'data' => [
                    'total_distance' => $response['total_distance'],
                    'total_steps' => $response['total_steps'],
                    'total_minutes' => $response['total_active_minutes'],
                    'records' => $response['event_records']
                ]
            ], 200);
        } catch (QueryException $e) {
            return response()->json([
                'message' => 'Database query error',
                'error' => $e->getMessage()
            ], 500);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'An unexpected error occurred',
                'error' => $e->getMessage()
            ], 500);
        }
    }

}
