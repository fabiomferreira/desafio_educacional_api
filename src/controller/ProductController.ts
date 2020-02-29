import Product from '../model/Product';

export default class UserController {
  public save(product) {
    const errors = [];

    if(!product.title) errors.push({message: 'Título é obrigatório'});
    if(!product.price) errors.push({message: 'Preço é obrigatório'});

    if(errors.length) return Promise.reject({errors, status: 400});

    return Product.create(product);
  }

  public fetchAll(query) {
    if(query.title) {
      return Product.findByTitle(query.title)
    }
    return Product.findAll();
  }

  public fetchOneById(id: string) {
    return Product.findById(id);
  }

  public update(id, product) {
    return Product.updateOne(id, product);
  }

  public remove(id) {
    return Product.removeOne(id);
  }

}
