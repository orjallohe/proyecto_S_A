<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\CategoriaProducto;

class Producto extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $categoria = CategoriaProducto::find($this->categoria_productos_id);
        return ["id"      => $this->id,
        "codigo"          => $this->codigo,
        "nombre"          =>$this->nombre,
        "descripcion"     =>$this->descripcion,
        "marca"           =>$this->marca,
        "categoria"       =>$categoria->nombre,
        "precio"          =>$this->precio];
    }
}
