
import Left from "../left/Left";

import React, { useState, useEffect } from "react";
import axios from "axios";

const InvantntryPage = () => {
  const [products, setProducts] = useState([]);
  const [minQuantitiy, setminQuantitiy] = useState(5);
  const [edidtFormVisible, setedidtFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
  });
  /// get al;l prosucts
  const getPraducts = async () => {
    axios.get("http://localhost:8080").then((res) => setProducts(res.data));
  };

  function handlChange(e) {
    const { type, value } = e.target;

    if (type === "number" && isNaN(value)) {
      alert("Please enter ther valid details");
    } else {
      setFormData((prevStatr) => ({
        ...prevStatr,
        [e.target.name]: e.target.value,
      }));
    }
  }

  // fore delate some praduct
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8080/${id}`).then(() => {
      setProducts(products.filter((product) => product._id !== id));
    });
  };

  // fore edit product
  const editProduct = (product) => {
    setFormData(product);
    setedidtFormVisible(true);
  };

  // update product
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    await axios
      .put(`http://localhost:8080/${formData._id}`, formData)
      .then((res) => {
        console.log("pradacut updated" + res.data);
        setFormData({ name: "", price: "", quantity: "" });
        getPraducts();
      });

    setedidtFormVisible(false);
  };

  useEffect(() => {
    getPraducts();
  }, []);

  // add some poduct
  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.quantity) {
      alert("All fields are required.");
      return;
    }

    const productExists = products.some(
      (product) => product.name === formData.name
    );

  
      if (productExists) {
        alert("product alrady aded");
        setFormData({ name: "", price: "", quantity: "" });
        getPraducts();
        return;
      }
   

    try {
      axios.post("http://localhost:8080", formData).then((res) => {
        console.log("pradacut added" + res.data);
        setFormData({ name: "", price: "", quantity: "" });
        getPraducts();
      });
      
    } catch (error) {
      console.error(error);
      
    }

  };

  return (
    <div className=" flex flex-col border">
      <Left />
      <h1 className="text-center w-full bg-blue-400 text-3xl font-bold">
      INVENTORY
      </h1>
      <div className="w-10/12 mx-auto border border-blue-600">
        <div className="bg-red-200 text-black  w-4/5 mx-auto my-3">
          <table className="w-full text-center  ">
            <tr className="my-5">
              <th colSpan={2}>LOW STOCK </th>
              <th>
                <label htmlFor="Min Quantity">Min Quantity : </label>
                <input
                  className=" h-5 hover:border-b-4  hover:border-red-600 focus:border-b-4  focus:border-red-600 outline-none my-2 bg-red-200"
                  type="number"
                  placeholder="Min Quantity"
                  name="minQuantity"
                  value={minQuantitiy}
                  onChange={(e) => setminQuantitiy(e.target.value)}
                  required
                />
              </th>
            </tr>
            <tr className="border-spacing-2 bg-red-400">
              <th className="border font-bold">Name</th>
              <th className="border font-bold">Price</th>
              <th className="border font-bold">Quantity</th>
            </tr>
            {products.map((product) =>
              product.quantity > minQuantitiy ? null : (
                <tr className="border-4 bg-red-500 ">
                  <td className="border">{product.name} </td>
                  <td className="border">{product.price}</td>
                  <td className="border">{product.quantity}</td>
                </tr>
              )
            )}
          </table>
        </div>

        <form className="border-2 border-blue-700 flex justify-between m-7 p-2">
          <div className="ml-5 flex items-center gap-5">
            <input
              className=" h-4 hover:border-b-2  hover:border-blue-600 focus:border-b-2  focus:border-blue-600 outline-none flex "
              type="text"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handlChange}
              required
            />
            <input
              className=" h-4 hover:border-b-2  hover:border-blue-600 focus:border-b-2  focus:border-blue-600 outline-none flex "
              type="number"
              placeholder="Price"
              name="price"
              value={formData.price}
              onChange={handlChange}
              required
            />
            <input
              className=" h-4 hover:border-b-2  hover:border-blue-600 focus:border-b-2  focus:border-blue-600 outline-none flex "
              type="number"
              placeholder="Quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handlChange}
              required
            />
          </div>
          <div className="">
            {!edidtFormVisible && (
              <button
                className="bg-blue-600 text-black text-center rounded-md w-96 h-11 font-medium"
                onClick={(e) => {
                  handleAddProduct(e);
                }}
              >
                Add Product
              </button>
            )}
            {edidtFormVisible && (
              <button
                className="bg-blue-600 text-black text-center rounded-md w-96 h-11 font-medium"
                onClick={(e) => {
                  handleUpdateProduct(e);
                }}
              >
                Update
              </button>
            )}
          </div>
        </form>

        <div className="my-10 w-full">
          <table className="w-full text-center">
            <thead className="bg-blue-400 ">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-b-2 border-blue-200 ">
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.quantity}</td>
                  <td className="border-2 w-60">
                    <div className="flex gap-5">
                      <button
                        className="bg-blue-600 text-black text-center rounded-md w-32 h-10 font-medium"
                        onClick={() => handleDelete(product._id)}
                      >
                        Delete{" "}
                      </button>

                      <button
                        className="bg-blue-600 text-black text-center rounded-md w-32 h-10 font-medium"
                        onClick={() => editProduct(product)}
                      >
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InvantntryPage;
