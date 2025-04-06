<?php

namespace App\Http\Controllers;

use Exception;
use App\Events\CsvUploaded;
use App\Http\Requests\CsvRequest;

class CsvController extends Controller
{
    public function upload(CsvRequest $request)
    {
        try {
            $path = $request->file('file')->store('csv_files');
            CsvUploaded::dispatch($path);
            return response()->json([
                'success' => 'true',
                'message' => 'File uploaded successfully! Processing started.',
                'path' => $path
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'success' => 'false',
                'message' => 'Error uploading file ' . $e,
                'path' => null
            ], 200);
        }

    }
}
