import React, { useEffect, useRef, useState } from "react";
import Left from "../left/Left";
import axios from "axios";

const SalePage = () => {
  const [updatePorduct, setupdatePorduct] = useState([]);
  const [products, setToSaleProducts] = useState([]);
  const [saleDeta, setSaleDeta] = useState();
  const [bilDatas, setBilDatas] = useState([]);
  const [totle, setTotle] = useState();
  const [numberOfQuanToSale, setNumberOfQuanToSale] = useState();
  const [discount, setdiscount] = useState('');
  const [searchTerm, setSearchTerm] = useState("");
  const [input, setInput] = useState(0);
  const printAreaRef = useRef(null);

  const getPraducts = async () => {
    axios
      .get("http://localhost:8080")
      .then((res) => setToSaleProducts(res.data));
  };

  useEffect(() => {
    getPraducts();
  }, []);

  const addTobill = (product, numberOfQuanToSale) => {
    if (product.quantity < numberOfQuanToSale) {
      alert("Not enough quantity");
      return;
    } else if (numberOfQuanToSale > 0) {
      setBilDatas((prev) => [
        ...(prev || []),
        {
          _id: product._id,
          name: product.name,
          price: product.price,
          quantity: product.quantity,
          numOfQuntToSale: numberOfQuanToSale,
        },
      ]);
      setNumberOfQuanToSale("");
    } else {
      alert(" PLese Enter Quantity ");
    }
  };

  // delete deta from bilol
  const deleteFromBill = (productName) => {
    setBilDatas((prev) => prev.filter((item) => item.name !== productName));
  };
  //set quantity for sale

  // const seleQuantitiy = (e) => {
  //   setNumberOfQuanToSale(Number(e.target.value));
  // };

  useEffect(() => {
    getTotle();
  }, [bilDatas]);

  const getTotle = () => {
    let toleOfSale = bilDatas.reduce(
      (acc, bildeta) => acc + bildeta.price * bildeta.numOfQuntToSale,
      0
    );
    setTotle(toleOfSale);
  };

  useEffect(() => {
    getPraducts();
  }, [saleDeta]);

  // Function to update the database and print the bill
  const printAndUpdate = () => {
    // print();
    // setTimeout(() => {

    update();

    //   console.log("Updated=====================================");
    // }, 1000); // Delay to ensure printing happens before the update

    // setTimeout(() => {
    //   print();
    // },800)
  };

  //update backend detabase=======================================================================================
  const update = () => {
    console.log(
      "bill deta alll" + JSON.stringify(bilDatas) + "this is onther" + bilDatas
    );
    setProductDetaToUpdater();
    setSaleDetaToSend();

    // setSaleDetaToUpdater();
  };

  const setProductDetaToUpdater = () => {
    bilDatas.forEach((element) => {
      console.log(
        "element from   " + element + " to " + JSON.stringify(element)
      );
      setupdatePorduct((prev) => [
        ...prev,
        {
          _id: element._id,
          quantity: element.quantity - element.numOfQuntToSale,
        },
      ]);
    });

    console.log(
      "update deta alll" +
        JSON.stringify(updatePorduct) +
        "this is onther update " +
        updatePorduct
    );
  };

  // const setSaleDetaToSend =()=>{

  //   bilDatas.forEach(element => {
  //         console.log("element from  billdeta " +element + " to " + JSON.stringify(element));
  //         setSaleDeta((prev)=>[
  //           ...prev, {
  //             item: {
  //               name: element.name,
  //               price: element.price,
  //               soldQuantity: element.numOfQunt,
  //             },
  //             total: element.price * element.numOfQunt,
  //             discount: discount,
  //             totalWithDiscount: (element.price * element.numOfQunt) * (1 - discount / 100),
  //           },
  //         ])
  //       });

  //       console.log("Sale deta alll" + JSON.stringify(saleDeta)+ "this is onther update "+ saleDeta);

  // }

  const setSaleDetaToSend = () => {
    if (bilDatas.length === 0) {
      console.error("No items in the current sale to process.");
      return;
    }

    const sale = {
      items: bilDatas.map((element) => ({
        name: element.name,
        price: element.price,
        soldQuantity: element.numOfQuntToSale,
      })),
      total: totle,
      discount: discount,
      totalWithDiscount: totle * (1 - discount / 100),
    };

    setSaleDeta(sale); // Add to salesData

    console.log("Added sale:", sale);
  };

  useEffect(() => {
    if (!saleDeta == "") {
      sendSalesToBackend();
    }
  }, [saleDeta]);

  useEffect(() => {
    if (updatePorduct.length > 0) {
      updateDetabase();
    }
    // processAndSendSalesData(bilDatas, discount);
  }, [updatePorduct]);

  const updateDetabase = () => {
    console.log(
      "update detabase alll" +
        JSON.stringify(updatePorduct) +
        "this is onther updateDetabas " +
        updatePorduct
    );

    updatePorduct.forEach((element) => {
      axios
        .put(`http://localhost:8080/${element._id}`, {
          quantity: element.quantity,
        })
        .then((res) => {
          console.log("pradacut updated" + res.data);
          getPraducts();
          setupdatePorduct([]);
        });
    });
  };

  // const updateSaleDetabase=()=>{

  //   console.log("update Sale detabase alll" + JSON.stringify(saleDeta)+ "this is onther Sale "+ saleDeta);

  //   saleDeta.forEach(element =>{
  //     console.log("Processed sale:", JSON.stringify(element));

  //         // Send data to backend
  //         try {
  //           axios.post("http://localhost:8080/Sale", element).then((res)=>{
  //             console.log("Data successfully sent to backend:", res.data);
  //           })

  //         } catch (error) {
  //           console.error("Error sending data to backend:", error);
  //         }

  //   })
  // }
  // const axios = require('axios');

  // Function to process bilDatas and send to the backend
  // const processAndSendSalesData = async (bilDatas, discount) => {
  //   const saleDetas = [];

  //   bilDatas.forEach((element) => {
  //     console.log("Processing element:", element);

  //     const saleDeta = {
  //       _id: element._id,
  //       name: element.name,
  //       price: element.price,
  //       soldQuantity: element.numOfQunt,
  //       total: element.price * element.numOfQunt,
  //       discount: discount,
  //       totalWithDiscount: (element.price * element.numOfQunt) * (1 - discount / 100),
  //     };

  //     // Add to the updatedProducts array
  //     saleDetas.push(saleDeta);
  //   });

  //   console.log("Processed sale:", JSON.stringify(saleDetas));

  //   // Send data to backend
  //   try {
  //     const response = await axios.post("http://localhost:8080/Sale", saleDetas);
  //     console.log("Data successfully sent to backend:", response.data);
  //   } catch (error) {
  //     console.error("Error sending data to backend:", error);
  //   }
  // };

  const sendSalesToBackend = async () => {
    try {
      console.log(" redy sale dat to send backend " + saleDeta);
      await axios
        .post("http://localhost:8080/Sale/record", saleDeta)
        .then((res) => {
          console.log(
            "All sales data successfully sent to backend." +
              JSON.stringify(res.deta)
          );
          setSaleDeta("");
          setBilDatas([]);
          setdiscount('');
        });

      // Clear after successful send
    } catch (error) {
      console.error("Error sending sales data to backend:", error);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //print bill

  // const print =()=>{
  //     console.log("qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq")
  //   const printContents =  document.getElementById("printArea").innerHTML;
  //     const originalContents = document.body.innerHTML;

  //     document.body.innerHTML = printContents; // Replace the body content with the printable div's content
  //     window.print(); // Open the print dialog
  //     document.body.innerHTML = originalContents;

  // }

  return (
    <div class="flex flex-col">
      <Left />
      <div class="flex border-4 w-10/12 mx-auto">
        <div class="flec flex-col w-3/4 ">
          <h1 className="text-center font-bold my-3 text-4xl"> ITEMS FORE SALE</h1>
          <input
          className=" h-10 hover:border-b-2  hover:border-blue-600 focus:border-b-2  focus:border-blue-600 outline-none flex w-10/12 mx-auto mb-6 "
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

          <div>
            <table className="w-full text-left">
              <thead className="bg-blue-400 ">
                <tr className="">
                  <th className="ml-8 text-center">ID</th>
                  <th className="ml-8">Name</th>
                  <th className="ml-8">Price</th>
                  <th className="ml-8"> Quantity</th>
                  <th className="ml-8"> Quantity to Sale</th>
                  <th className="ml-8"></th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((praduct) =>
                  praduct.quantity < 1 ? (
                    ""
                  ) : (
                    <tr
                      key={praduct._id}
                      className="border-b-2 border-blue-200 "
                    >
                      <td>{praduct._id}</td>
                      <td>{praduct.name}</td>
                      <td>${praduct.price}</td>
                      <td>{praduct.quantity}</td>
                      <td>
                        <input
                          className=" h-4 hover:border-b-2  hover:border-blue-600 focus:border-b-2  focus:border-blue-600 outline-none flex w-28 "
                          type="number"
                          name="numOfQunt"
                          id="QunINput"
                          onChange={(e) =>
                            setNumberOfQuanToSale(e.target.value)
                          }
                        />
                      </td>
                      <td className="border-2 w-60">
                        <div className="flex gap-8">
                          <button
                            className="bg-blue-600 text-black text-center rounded-md w-32 h-10 font-medium"
                            onClick={() => {
                              addTobill(praduct, numberOfQuanToSale);
                              {
                                document.getElementById("QunINput").value = "";
                              }
                            }}
                          >
                            ADD TO BILL
                          </button>

                          <button
                            className="bg-blue-600 text-black text-center rounded-md w-32 h-10 font-medium"
                            onClick={() => {
                              deleteFromBill(praduct.name);
                            }}
                          >
                            DELETE
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div class="flex flex-col w-1/4  border-l-2  ">
          <div ref={printAreaRef} id="printArea" className="m-3 mt-32 font-bold border border-black p-3">
            <h1 className="text-center"> Bill</h1>
            
            <table className="w-full text-left">
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
              {bilDatas.map((bildeta) => (
                <tr className="font-normal border-b-2">
                <td>{bildeta.name}</td>
                <td>${bildeta.price}</td>
                <td>{bildeta.numOfQuntToSale}</td>
                <td> {bildeta.price * bildeta.numOfQuntToSale}</td>
                </tr>
                ))}
            </table>


            {/* {bilDatas.map((bildeta) => (
              <div>
                {bildeta.name} - ${bildeta.price} - {bildeta.numOfQuntToSale} -{" "}
                {bildeta.price * bildeta.numOfQuntToSale}
              </div>
            ))} */}
           <span className="flex items-center"> <input
             className=" h-4 hover:border-b-2  hover:border-blue-600 focus:border-b-2  focus:border-blue-600 outline-none flex w-20 "
              type="number"
              placeholder="descont"
              name="descont"
              value={discount}
              onChange={(e) => setdiscount(e.target.value)}
            /> %</span>
            <h1>All TOTLE : {totle}</h1>
            <h1>TOTLE WITH DISCOUNT : {totle - (totle * discount) / 100}</h1>
          </div>

          <div className="flex justify-center">
            <button 
            className="bg-blue-600 text-black text-center rounded-md w-32 h-10 font-medium"
            onClick={printAndUpdate}>SALE</button>

            {/* <button onClick={setSaleDetaToSen}>update Sale</button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalePage;
