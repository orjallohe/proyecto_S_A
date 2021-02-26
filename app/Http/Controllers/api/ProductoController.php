<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Producto;
use App\CategoriaProducto;
use Illuminate\Http\Request;
use App\Http\Resources\Producto as ProductoResources;
use App\Http\Resources\ProductoCollection;
use App\Http\Requests\Producto as ProductoRequests;

class ProductoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    protected $producto;
    public function __construct(Producto $producto) {
        $this->producto = $producto;
    }

    public function index()
    {
        //
       return response()->json(new ProductoCollection($this->producto->get()));


    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ProductoRequests $request)
    {
        $producto = $this->producto->create($request->all());
        return response()->json(new ProductoCollection($this->producto->get()));
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Producto  $producto
     * @return \Illuminate\Http\Response
     */
    public function show(Producto $producto)
    {
        //
        return response()->json(new ProductoResources($producto));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Producto  $producto
     * @return \Illuminate\Http\Response
     */
    public function update(ProductoRequests $request, Producto $producto)
    {
        $producto->update($request->all());
        return response()->json(new ProductoCollection($this->producto->get()));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Producto  $producto
     * @return \Illuminate\Http\Response
     */
    public function destroy(Producto $producto)
    {
        $producto->delete();
        return response()->json(new ProductoCollection($this->producto->get()));

    }
}
