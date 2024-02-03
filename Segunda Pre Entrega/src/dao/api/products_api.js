class ProductsApi {
    /**
     * Constructor de la clase ProductsApi.
     * Inicializa un array vacío para almacenar elementos y un contador de IDs.
     */
    constructor() {
        this.elements = [];
        this.id = 0;
    }

    /**
     * Muestra un elemento por su ID.
     * @param {number} id - ID del elemento a mostrar.
     * @returns {Object} - Retorna el elemento encontrado o un objeto con un mensaje de error.
     */
    show(id) {
        const elem = this.elements.find(elem => elem.id == id);
        return elem || { error: `Elemento no encontrado` };
    }

    /**
     * Muestra todos los elementos.
     * @returns {Array} - Retorna una copia del array de elementos.
     */
    showAll() {
        return [...this.elements];
    }

    /**
     * Guarda un nuevo elemento.
     * @param {Object} elem - Elemento a guardar.
     * @returns {Object} - Retorna el nuevo elemento con un ID asignado.
     */
    save(elem) {
        const newElem = { ...elem, id: ++this.id };
        this.elements.push(newElem);
        return newElem;
    }

    /**
     * Actualiza un elemento por su ID.
     * @param {Object} elem - Nuevo contenido del elemento.
     * @param {number} id - ID del elemento a actualizar.
     * @returns {Object} - Retorna el elemento actualizado o un objeto con un mensaje de error.
     */
    update(elem, id) {
        const newElem = { id: Number(id), ...elem };
        const index = this.elements.findIndex(p => p.id == id);
        if (index !== -1) {
            this.elements[index] = newElem;
            return newElem;
        } else {
            return { error: `Elemento no encontrado` };
        }
    }

    /**
     * Elimina un elemento por su ID.
     * @param {number} id - ID del elemento a eliminar.
     * @returns {Object} - Retorna el elemento eliminado o un objeto con un mensaje de error.
     */
    delete(id) {
        const index = this.elements.findIndex(elem => elem.id == id);
        if (index !== -1) {
            return this.elements.splice(index, 1)[0];
        } else {
            return { error: `Elemento no encontrado` };
        }
    }

    /**
     * Elimina todos los elementos.
     */
    deleteAll() {
        this.elements = [];
    }
}

module.exports = ProductsApi;
