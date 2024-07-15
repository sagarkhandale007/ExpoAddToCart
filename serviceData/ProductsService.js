import ProductData from "../components/ProductData";


export async function getApiProduct() {
    

    try {

        const response = await fetch('https://reactdatabse-default-rtdb.firebaseio.com/data.json',

            {
                method: 'GET',
            });

        if (!response.ok) {

            const errorRes = await response.json();
            console.log("error"+response);

            throw new Error(errorRes.error.message);

        }
        const PRODUCTS = await response.json();

        return PRODUCTS;

    } catch (error) {

        throw new Error(error);

    }

};



export async function getProducts() {

    const loadedProduct = await getApiProduct();

    return loadedProduct;
}

export async function getProduct(id) {
    
    const loadedProduct = await getApiProduct();

    return loadedProduct.find((product) => (product.id == id));
}

