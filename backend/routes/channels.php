<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('my-private-channel.user.{id}',function($user,$id){
    return (int) $user->id === (int) $id;
},['guards' => ['sanctum'],]);