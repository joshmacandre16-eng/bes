<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Broadcast Driver
    |--------------------------------------------------------------------------
    |
    | These configuration options determine the driver you want to be used to
    | broadcast events. You may select any driver you want. By default Laravel
    | supports Pusher and a local "log" driver for logging all broadcasts.
    |
    */

    'default' => env('BROADCAST_DRIVER', 'reverb'),

    /*
    |--------------------------------------------------------------------------
    | Broadcast Providers
    |--------------------------------------------------------------------------
    |
    | The broadcast drivers that should be utilized to broadcast events. You
    | are free to add additional broadcast drivers that you wish to utilize
    | in your application. You will also need to provide a driver specific
    | configuration options for each driver.
    |
    */

    'connections' => [

        'reverb' => [
            'driver' => 'reverb',
            'key' => env('REVERB_APP_KEY'),
            'secret' => env('REVERB_APP_SECRET'),
            'app_id' => env('REVERB_APP_ID'),
            'options' => [
                'host' => env('REVERB_HOST', '127.0.0.1'),
                'port' => env('REVERB_PORT', 8080),
                'scheme' => env('REVERB_SCHEME', 'http'),
            ],
        ],

        'pusher' => [
            'driver' => 'pusher',
            'key' => env('PUSHER_APP_KEY'),
            'secret' => env('PUSHER_APP_SECRET'),
            'app_id' => env('PUSHER_APP_ID'),
            'options' => [
                'cluster' => env('PUSHER_APP_CLUSTER'),
                'host' => env('PUSHER_HOST') ?: 'api-{$PUSHER_APP_CLUSTER}.platform.pusher.com',
                'port' => env('PUSHER_PORT', 443),
                'scheme' => env('PUSHER_SCHEME', 'https'),
                'encrypted' => true,
                'useTLS' => env('PUSHER_SCHEME') === 'https',
            ],
        ],

    ],

];

