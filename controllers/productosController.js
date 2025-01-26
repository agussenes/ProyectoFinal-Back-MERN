const Producto = require('../models/Productos');

async function addProducto(req, res) {
    try {
        const { nombre, precio, categoria, descripcion, imagen } = req.body;

        // Crear una nueva instancia del modelo Producto
        const producto = new Producto({
            nombre,
            precio,
            categoria,
            descripcion,
            imagen
        });

        // Verificar si hay una imagen subida y configurar la URL de la imagen
        if (req.file) {
            const { filename } = req.file;
            producto.setImagen(filename); // Usa el método setImagen del modelo
        }

        // Guardar el producto en la base de datos
        const nuevoProducto = await producto.save();
        res.status(201).send({ producto: nuevoProducto });
    } catch (e) {
        res.status(500).send({ message: e.message });
    }
}

async function getProductos(req, res) {
    try {
        // Obtener todos los productos
        const productos = await Producto.find();
        res.status(200).send({ productos });
    } catch (e) {
        res.status(500).send({ message: e.message });
    }
}

async function findProducto(req, res) {
    try {
        // Buscar producto por ID
        const producto = await Producto.findById(req.params.id);
        if (!producto) {
            return res.status(404).send({ message: 'Producto no encontrado' });
        }
        res.status(200).send({ producto });
    } catch (e) {
        res.status(500).send({ message: e.message });
    }
}

async function updateProducto(req, res) {
    try {
        const { id } = req.params;
        const { nombre, descripcion, categoria, precio } = req.body;

        // Busca el producto por ID
        const producto = await Producto.findById(id);
        if (!producto) {
            console.error("Producto no encontrado");
            return res.status(404).send({ message: "Producto no encontrado" });
        }

        // Actualiza los campos
        producto.nombre = nombre || producto.nombre;
        producto.descripcion = descripcion || producto.descripcion;
        producto.categoria = categoria || producto.categoria;
        producto.precio = precio || producto.precio;

        // Si hay un archivo de imagen nuevo, actualiza la URL
        if (req.file) {
            const nuevaRutaImagen = `${req.protocol}://${req.get("host")}/public/${req.file.filename}`;
            console.log("Nueva imagen cargada:", nuevaRutaImagen);
            producto.imagen = nuevaRutaImagen;
        } else {
            console.log("Manteniendo imagen actual:", producto.imagen);
        }

        // Guarda el producto actualizado
        const productoActualizado = await producto.save();

        // Imprime en la consola el objeto del producto actualizado
        console.log("Producto actualizado:", {
            _id: productoActualizado._id,
            nombre: productoActualizado.nombre,
            descripcion: productoActualizado.descripcion,
            categoria: productoActualizado.categoria,
            precio: productoActualizado.precio,
            imagen: productoActualizado.imagen,
            createdAt: productoActualizado.createdAt,
            updatedAt: productoActualizado.updatedAt,
            __v: productoActualizado.__v,
        });

        // Devuelve el producto actualizado al frontend
        res.status(200).send({
            producto: {
                _id: productoActualizado._id,
                nombre: productoActualizado.nombre,
                descripcion: productoActualizado.descripcion,
                categoria: productoActualizado.categoria,
                precio: productoActualizado.precio,
                imagen: productoActualizado.imagen,
                createdAt: productoActualizado.createdAt,
                updatedAt: productoActualizado.updatedAt,
                __v: productoActualizado.__v,
            },
        });
    } catch (error) {
        console.error("Error al actualizar el producto:", error);
        res.status(500).send({ message: error.message });
    }
}



// async function updateProducto(req, res) {
//     try {

//         const productoActualizado = await Producto.findByIdAndUpdate(req.params.id, req.body, {
//             new: true 
//         });
//         if (!productoActualizado) {
//             return res.status(404).send({ message: 'Producto no encontrado para actualizar' });
//         }
//         res.status(200).send({ producto: productoActualizado });
//     } catch (e) {
//         res.status(500).send({ message: e.message });
//     }
// }

async function deleteProducto(req, res) {
    try {
        // Eliminar producto por ID
        const producto = await Producto.findByIdAndDelete(req.params.id);
        if (!producto) {
            return res.status(404).send({ message: 'Producto no encontrado' });
        }
        res.status(200).send({ message: 'Producto eliminado exitosamente' });
    } catch (e) {
        res.status(500).send({ message: e.message });
    }
}

module.exports = { addProducto, getProductos, findProducto, updateProducto, deleteProducto };
