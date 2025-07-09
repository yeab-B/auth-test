<?php
namespace App\Http\Controllers\API;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|unique:users',
                'password' => 'required|confirmed|min:6',
            ]);

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => bcrypt($request->password),
            ]);

            // // Login the user and set HttpOnly cookie
            Auth::login($user);
            $request->session()->regenerate();

            
            return response()->json([
                'user' => $user,
            ]);
        } catch (\Exception $e) {
            throw ValidationException::withMessages(['email' => ['The email has already been taken.']]);
        }
    }

   public function login(Request $request)
{
    $request->validate([
        'email' => 'required|email',
        'password' => 'required'
    ]);

    if (!Auth::attempt($request->only('email', 'password'))) {
        throw ValidationException::withMessages(['email' => ['The credentials are incorrect.']]);
    }

    $request->session()->regenerate();

    return response()->json([
        'user' => Auth::user(),
    ]);
}

  public function index(Request $request)
{
    return response()->json([
        'user' => Auth::user(),
    ]);
}

    public function logout(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['message' => 'Logged out']);
    }
}
