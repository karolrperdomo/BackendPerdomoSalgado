
const { promises: fs } = require('fs')
   
class ProductManagerFileSystem {

    //Constructor
    constructor(fileName) {
            this.path = `./${fileName}.json`
            console.log(this.path)
        }
      
    //Función para buscar TODOS los productos    
     async  getProducts(){
        try {
           const data = await fs.readFile(this.path)
           const products = JSON.parse(data)
           console.log(products)
           return products
        }
        catch(error) {
            console.log('ERROR getProducts ===> ' + error.message)
        }

    }

     //Función para buscar un producto por ID    
    async getProductsById(id) {
            try {
               
                id = Number(id);
                const  productsData = await this.getProducts()
                const prodById = productsData.find(obj => obj.id === id)

                console.log('------------------ FILTRANDO POR UN UNICO ID ------------------------------------------------------------')
                console.log(id)
                console.log(prodById)
                if (!prodById) {
                  return ' VALIDACION: EL PRODUCTO NO EXISTE !!!'
                }
              return prodById     
            }
            catch (error) {
                console.log('ERROR getProductsById ===> ' + error.message)
            }
        }
      
    //Función para AGREGAR un nuevo producto   
       async addProducts(product){
            try {
                console.log(product)
                
                if ( !product.name || !product.price || !product.category || !product.thumbnail || !product.stock || !product.code)
                   {
                    
                        return 'VALIDACION: - ERROR : TODOS LOS CAMPOS SON REQUERIDOS -----------------------'
                    }
                    
                    const  productsData = await this.getProducts()
                    const prod = productsData.find(prod => prod.code === product.code)                    
                    if( prod ) {
                        return 'ERROR: NO SE PUEDE REPETIR CODIGO'
                     }
                     if (!productsData){
                        return productsData.push({...product, id:1})
                          
                      }
                     
                     productsData.push({...product, id:productsData.length+1})
                     console.log(' ---> Agregando el producto ')
                     //console.log(productsData)
                     console.log(' --------- AGREGANDO EL PRODUCTO AL ARCHIVO')
                     const contenidoStr = JSON.stringify(productsData, null, 2)
                     console.log(contenidoStr)
                     await fs.writeFile(this.path, contenidoStr)

                     return(' ----------PRODUCTO AGREGADO -------------------')          
                

            }
            catch (error) {
                console.log('ERROR addProducts ===> ' + error.message)
            }
                   
                 
        }

        //Función para ACTUALIZAR los datos de un Producto pasando un Id y los campos modificados pd-->esta fue la que más me costó ;)
          async updateProductById(id, newData) {
            try {
              
              const data = await  this.getProducts()  
              const index = data.findIndex(obj => obj.id === id)
              console.log(index)
              
              const {name, price,category,stock} = newData;

               //console.log(name)
               //console.log(price)
               //console.log(data[index])
              // console.log(data.products[index].name)
               data[index].name = name
               data[index].price = price
               data[index].category = category
               data[index].stock = stock
               console.log(data[index])
              
               
               await fs.writeFile(this.path, JSON.stringify(data,null,2));
              

              
            } catch (error) {
                console.log('ERROR updateProductById ===> ' + error.message)   
            }
          }
          

          //Función para BORRAR un Producto pasando un Id
          async deleteProductById(id) {
            try {
              
              const data = await  this.getProducts()  
              const index = data.findIndex(obj => obj.id === id)
              //console.log(index)
              //console.log(data.products[index])

              if  (index === -1) {
                console.log(' VALIDACION: NO SE PUEDE ELIMNAR EL PRODUCTO. NO EXISTE')
              } 
              else {
                data.splice(index, 1);
                const newProductsJSON = JSON.stringify(data,null,2)
                console.log(newProductsJSON)
                await fs.writeFile(this.path, newProductsJSON);

              }
            } catch (error) {
                console.log('ERROR deleteProductById ===> ' + error.message)     
            }
          }


}
module.exports = ProductManagerFileSystem;