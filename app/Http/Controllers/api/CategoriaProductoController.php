<?php

namespace App\Http\Controllers\api;

use App\CategoriaProducto;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\CategoriaProducto as CategoriaProductoResources;
use App\Http\Resources\CategoriaProductoCollection;

class CategoriaProductoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    protected $categoria;
    public function __construct(CategoriaProducto $categoria) {
        $this->categoria = $categoria;
    }
    public function index()
    {
        //
        return response()->json(new CategoriaProductoCollection($this->categoria->get()));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $CategoriaProducto = $this->categoria->create($request->all());
        return response()->json(new CategoriaProductoCollection($this->categoria->get()));
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\CategoriaProducto  $categoriaProducto
     * @return \Illuminate\Http\Response
     */
    public function show(CategoriaProducto $CategoriaProducto)
    {
        //
        return response()->json(new CategoriaProductoResources($CategoriaProducto));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\CategoriaProducto  $categoriaProducto
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, CategoriaProducto $CategoriaProducto)
    {
        $CategoriaProducto->update($request->all());
        return response()->json(new CategoriaProductoCollection($this->categoria->get()));

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\CategoriaProducto  $categoriaProducto
     * @return \Illuminate\Http\Response
     */
    public function destroy(CategoriaProducto $CategoriaProducto)
    {

        $CategoriaProducto->delete();
        return response()->json(new CategoriaProductoCollection($this->categoria->get()));
    }
}
