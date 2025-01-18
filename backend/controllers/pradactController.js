const Product = require('../models/Pradact');

const getProducts = async (req, res) => {
    let allPraduct;
  try {
    allPraduct = await Product.find();
  } catch (error) {
    console.log(error);
  }
  
  if(!allPraduct){
   return res.status(404).json({ message: 'No products found' });
   
  }else{
    return res.json(allPraduct);
  }


};

const addProduct = async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.status(201).json(product);
};

const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) {
        return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product updated successfully', updatedProduct });
} catch (error) {
    res.status(500).json({ message: error.message });
}
};

const deleteProduct = async (req,res)=>{
  const deleted = await Product.findByIdAndDelete(req.params.id);
  if(!deleted){
    return res.status(404).json({ message: 'Product not found' });
  }else{
    return res.json(deleted);
  }
}

module.exports = { getProducts, addProduct, updateProduct ,deleteProduct };
