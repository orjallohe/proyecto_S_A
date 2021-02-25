<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CategoriaProducto extends Model
{
    //
    protected $fillable = [
         'codigo', 'nombre','descripcion','activo',
    ];

    public function Producto()
    {
        return $this->hasOne('App\Producto','id');
    }
}
