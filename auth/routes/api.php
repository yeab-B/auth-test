<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);
});
Route::get('/test', function () {
    return response()->json(['message' => 'API works!']);
});
