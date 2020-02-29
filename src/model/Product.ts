import * as fs from 'fs';

const file = 'database.json';

function readData() {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function writeData(data) {
  return fs.writeFileSync(file, JSON.stringify(data));
}

export default class Product {
  public id: string;
  public title: string;
  public price: string;
  public description: string;

  public static findAll(): Promise<Product[]> {
    const {products} = readData();
    return Promise.resolve(products);
  }

  public static create(product: Product): Promise<Product> {
    const {products, lastId} = readData();
    const newProduct = new Product();
    const id = (lastId + 1).toString();

    newProduct.id = id
    newProduct.title = product.title
    newProduct.price = product.price
    newProduct.description = product.description

    products.push(newProduct);

    writeData({products, lastId: id});

    return Promise.resolve(newProduct);
  }

  public static findById(id: string): Promise<Product> {
    const {products} = readData();
    const product = products.find(p => p.id === id);

    if(!product) return Promise.reject({status: 404})

    return Promise.resolve(product);
  }

  public static findByTitle(title: string): Promise<Product[]> {
    const {products} = readData();
    const regex = new RegExp(title, 'i');

    const filteredProducts = products.filter(p => regex.test(p.title));

    if(!filteredProducts.length) return Promise.reject({status: 404})

    return Promise.resolve(filteredProducts);
  }

  public static updateOne(id: string, product): Promise<Product> {
    const {products, lastId} = readData();
    const index = products.findIndex(p => p.id === id);

    if(index === -1) return Promise.reject({status: 404})

    products[index] = {...products[index], ...product};

    writeData({products, lastId});

    return Promise.resolve(products[index]);
  }

  public static removeOne(id: string): Promise<Product> {
    const {products, lastId} = readData();
    const index = products.findIndex(p => p.id === id);

    if(index === -1) return Promise.reject({status: 404})

    const removedProduct = products[index];
    products.splice(index, 1);
    writeData({products, lastId});

    return Promise.resolve(removedProduct);
  }
}

