<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Log;

class HandleCors
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        // Get CORS settings from config
        $allowedOrigins = config('cors.allowed_origins');
        $allowedMethods = config('cors.allowed_methods');
        $allowedHeaders = config('cors.allowed_headers');
        $supportsCredentials = config('cors.supports_credentials');

        // Add CORS headers
        $response = $next($request);

        // Allow all origins or specify allowed ones
        if ($allowedOrigins == ['*']) {
            $response->headers->set('Access-Control-Allow-Origin', '*');
        } else {
            // If you want to limit the allowed origins
            $origin = $request->headers->get('Origin');
            if (in_array($origin, $allowedOrigins)) {
                $response->headers->set('Access-Control-Allow-Origin', $origin);
            }
        }

        // Set allowed methods
        $response->headers->set('Access-Control-Allow-Methods', implode(', ', $allowedMethods));

        // Set allowed headers
        $response->headers->set('Access-Control-Allow-Headers', implode(', ', $allowedHeaders));

        // Handle pre-flight requests (OPTIONS)
        if ($request->getMethod() == "OPTIONS") {
            $response->headers->set('Access-Control-Allow-Credentials', $supportsCredentials);
            return response()->json([], Response::HTTP_OK);
        }

        // Set the credentials flag
        if ($supportsCredentials) {
            $response->headers->set('Access-Control-Allow-Credentials', 'true');
        }

        return $response;
    }
}