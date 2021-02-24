<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{

    protected $fillable = [
        'categoria_productos_id', 'codigo', 'nombre','descripción','marca','categoría',
    ];

    protected $hidden = [
        'created_at', 'updated_at',
    ];
}
