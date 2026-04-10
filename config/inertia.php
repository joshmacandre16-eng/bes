<?php

return [

    'middleware' => [
        'web',
    ],

    'root_view' => 'app',

    /*
    |--------------------------------------------------------------------------
    | Shared Data
    |--------------------------------------------------------------------------
    |
    | This option controls what data will be applied globally to each Inertia
    | response sent by your application. This data is shared across views.
    |
    */

    'shared_data' => [
        // 'foo' => fn () => 'bar',
    ],

    /*
    |--------------------------------------------------------------------------
    | Vite Settings
    |--------------------------------------------------------------------------
    |
    | These options configure the Vite integration within the Inertia server.
    | More information about configuring Vite may be found in the docs.
    |
    */

    'vite' => [
        'ssr' => [
            'entry' => 'resources/js/ssr.jsx',
            'enabled' => false,
        ],
    ],

];

