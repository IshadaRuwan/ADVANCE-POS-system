import React, { useEffect } from "react";
import Left from "../left/Left.js";
import { useState } from "react";
import axios from "axios";
<link href="./output.css" rel="stylesheet"></link>

const ReportPage = () => {
  const [sales, setSales] = useState([]);
  const [saleReport, setSalesReport] = useState([]);
  const [dayTable, setDayTable] = useState(false);
  const [weekTable, setWeekTable] = useState(false);
  const [monthTable, setMonthTable] = useState(false);
  const [yearTable, setYearTable] = useState(false);

  const getSales = async () => {
    try {
      await axios.get("http://localhost:8080/Sale").then((res) => {
        console.log("deta get to  fronend" + JSON.stringify(res));
        setSales(res.data);
      });
    } catch (error) {
      console.error("can get sele deta", error);
    }
  };
  useEffect(() => {
    getSales();
  }, []);

  // ====================================================================================

  // useEffect(()=>{
  //   updateSaleWithDate();
  // },[sales])

  // const updateSaleWithDate = () => {
  //   sales.forEach((item) => {
  //     const date = new Date(item.date); // Convert the string to Date object
  //     const year = date.getFullYear(); // Now you can call getFullYear() on the Date object
  //     const month = date.getMonth() + 1; // Months are zero-indexed
  //     const day = date.getDate();

  //     // Calculate ISO week number
  //     const startDate = new Date(year, 0, 1); // Start of the year
  //     const days = Math.floor((date - startDate) / (24 * 60 * 60 * 1000)); // Days since the start of the year
  //     const weekNumber = Math.ceil((days + 1) / 7); // Calculate the ISO week number

  //     // Add the new properties to the object

  //     item.year = year;
  //     item.month = month;
  //     item.weekNumber = weekNumber;
  //     item.day = day;
  //   });
  // };

  // useEffect(() => {
  //   chek();
  // }, [sales]);

  // const chek = () => {
  //   console.log(`seale drta with date ${sales}  ${JSON.stringify(sales)}}`);
  // };

  const getSaleByDate = async () => {
    setDayTable(true);
    setWeekTable(false);
    setMonthTable(false);
    setYearTable(false);

    setSalesReport([]);
    try {
      await axios.get("http://localhost:8080/Sale/date").then((res) => {
        console.log("deta get to  fronend" + JSON.stringify(res));
        setSalesReport(res.data);
      });
    } catch (error) {
      console.error("can get sele deta", error);
    }
  };

  const getSaleByWeek = async () => {
    setDayTable(false);
    setWeekTable(true);
    setMonthTable(false);
    setYearTable(false);
    setSalesReport([]);
    try {
      await axios.get("http://localhost:8080/Sale/week").then((res) => {
        console.log("deta get to  fronend" + JSON.stringify(res));
        setSalesReport(res.data);
      });
    } catch (error) {
      console.error("can get sele deta", error);
    }
    
    
    
  };

  const getSaleBymonths = async () => {
    setDayTable(false);
    setWeekTable(false);
    setMonthTable(true);
    setYearTable(false);
    setSalesReport([]);
    try {
      await axios.get("http://localhost:8080/Sale/month").then((res) => {
        console.log("deta get to  fronend" + JSON.stringify(res));
        setSalesReport(res.data);
      });
    } catch (error) {
      console.error("can get sele deta", error);
    }
  };

  const getSaleByYear = async () => {
    setDayTable(false);
    setWeekTable(false);
    setMonthTable(false);
    setYearTable(true);
    setSalesReport([]);
    try {
      await axios.get("http://localhost:8080/Sale/year").then((res) => {
        console.log("deta get to  fronend" + JSON.stringify(res));
        setSalesReport(res.data);
      });
    } catch (error) {
      console.error("can get sele deta", error);
    }
  };

  const back=()=>{
    setDayTable(false);
    setWeekTable(false);
    setMonthTable(false);
    setYearTable(false);
  }

  return (
    <>

      <div className="flex-row">
        <Left />

        <h1 className=" justify-center font-bold my-3 text-4xl bg-blue-400 h-16 flex items-center  ">Sales Report</h1>

        <div>
          <div className="flex justify-end gap-5 mr-3 mt-5 ">
           
            <button
            className= "text-center bg-blue-950  text-blue-50 w-36 h-8 rounded-xl hover:scale-110"
              onClick={() => {
                getSaleByDate();
              }}
            >
              report by Day 
            </button>
            <button
            className= "text-center bg-blue-950  text-blue-50 w-36 h-8 rounded-xl hover:scale-110"
              onClick={() => {
                getSaleByWeek();
              }}
            >
              report by week
            </button>
            <button
            className= "text-center bg-blue-950  text-blue-50 w-36 h-8 rounded-xl hover:scale-110"
              onClick={() => {
                getSaleBymonths();
              }}
            >
              report by months
            </button>
            <button
            className= "text-center bg-blue-950  text-blue-50 w-36 h-8 rounded-xl hover:scale-110"
              onClick={() => {
                getSaleByYear();
              }}
            >
              report by Year
            </button>
            <button
            className= "text-center bg-blue-950  text-blue-50 w-36 h-8 rounded-xl hover:scale-110"
              onClick={back}
            >
              BACK
              </button>
          </div>
          

          {yearTable|| monthTable||weekTable||dayTable ?'':(
            <table className="w-10/12 text-center border-2  border-blue-500 mx-auto mt-5" >
            <thead>
              <tr className="bg-blue-400 h-7">
                <th>Product </th>
                <th>Total Price</th>
                <th>Descaount</th>
                <th>Total Price With Descaonnt</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((sale) => (
                <tr key={sale._id} className="border-b-2 border-blue-400 pb-2 odd:bg-white even:bg-blue-100">
                  <td className="w-96  text-center">
                    <tr className=" bg-blue-200 w-full mx-auto ml-5" >
                    <th className="w-1/3 ">Product </th>
                    <th className="w-1/3">Soled Quantity</th>
                    <th className="w-1/3">Price</th>
                    </tr>
                    {sale.items.map((item) => (
                      <tr className="mx-auto ">
                        <td>{item.name}</td>
                        <td>{item.soldQuantity}</td>
                        <td>{item.price}</td>
                      </tr>
                    ))}
                  </td>

                  <td className="font-medium">{sale.total}</td>
                  <td className="font-medium">{sale.discount}</td>
                  <td className="font-medium" >{sale.totalWithDiscount}</td>
                </tr>
              ))}
            </tbody>
          </table>
          )}
        </div>
      </div>

      {yearTable && (
        <div>
          <h1 className=" font-bold text-3xl text-center mt-2">Year Salese</h1>

          <table title="year Sales"  className="w-10/12 text-left border-2  border-blue-500 mx-auto mt-5" >
            <thead>
              <tr className="bg-blue-400 h-7">
                <th>year</th>
                <th>name</th>
                <th>totalSoldQuantity</th>
                <th>totalSales</th>
                <th>totalSalesWithDiscount</th>
                <th>YearTotle</th>
              </tr>
            </thead>
            <tbody>
              {saleReport.map((sale, index) => (
                <tr key={index} className={index === 0 || sale.year !== saleReport[index - 1].year
                  ? "border-t-2 border-blue-400"
                  : ""}>
                  <td>
                    {index === 0 || sale.year !== saleReport[index - 1].year
                      ? sale.year
                      : ""}
                  </td>

                  <td>{sale.name}</td>
                  <td>{sale.totalSoldQuantity}</td>
                  <td>{sale.totalSales}</td>
                  <td>{sale.totalSalesWithDiscount}</td>
                  <td >
                    {index === 0 ||
                    sale.totalSalesWithDiscountForYear !==
                      saleReport[index - 1].totalSalesWithDiscountForYear
                      ? sale.totalSalesWithDiscountForYear
                      : ""}
                  </td>
                </tr>
                
              ))}
            </tbody>
          </table>
        </div>
      )}

      {monthTable && (
        <div>
          <h1 className=" font-bold text-3xl text-center mt-2">Month Salese</h1>
          <table title=" month Sale"  className="w-10/12 text-left border-2  border-blue-500 mx-auto mt-5">
            <thead >
              <tr className="bg-blue-400 h-7">
                <th>year</th>
                <th>Month</th>
                <th>name</th>
                <th>totalSoldQuantity</th>
                <th>totalSales</th>
                <th>totalSalesWithDiscount</th>
                <th>Month Totle</th>
              </tr>
            </thead>
            <tbody>
              {saleReport.map((sale, index) => (
                <tr key={index} className={index === 0 ||
                  sale.year !== saleReport[index - 1].year ||
                  sale.month !== saleReport[index - 1].month
                    ?  "border-t-2 border-blue-400"
                    : ""}>
                  <td>
                    {index === 0 || sale.year !== saleReport[index - 1].year
                      ? sale.year
                      : ""}
                  </td>
                  <td>
                    {index === 0 ||
                    sale.year !== saleReport[index - 1].year ||
                    sale.month !== saleReport[index - 1].month
                      ? sale.month
                      : ""}
                  </td>
                  <td>{sale.name}</td>
                  <td>{sale.totalSoldQuantity}</td>
                  <td>{sale.totalSales}</td>
                  <td>{sale.totalSalesWithDiscount}</td>
                  <td>
                    {index === 0 ||
                    sale.year !== saleReport[index - 1].year ||
                    sale.month !== saleReport[index - 1].month ||
                    sale.totalSalesWithDiscountForMonth !==
                      saleReport[index - 1].totalSalesWithDiscountForMonth
                      ? sale.totalSalesWithDiscountForMonth
                      : ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {weekTable && (
        <div>
          <h1 className=" font-bold text-3xl text-center mt-2">Weekly Sales</h1>
          <table title="Week Sale"  className="w-10/12 text-left border-2  border-blue-500 mx-auto mt-5">
            <thead>
              <tr className="bg-blue-400 h-7">
                <th>Year</th>
                <th>Week</th>
                <th>Name</th>
                <th>Total Sold Quantity</th>
                <th>Total Sales</th>
                <th>Total Sales With Discount</th>
                <th>Week Total</th>
              </tr>
            </thead>
            <tbody>
              {saleReport.map((sale, index) => (
                <tr key={index} className={index === 0 ||
                  sale.year !== saleReport[index - 1].year ||
                  sale.week !== saleReport[index - 1].week
                    ? "border-t-2 border-blue-400"
                    : ""}>
                  <td>
                    {index === 0 || sale.year !== saleReport[index - 1].year
                      ? sale.year
                      : ""}
                  </td>
                  <td>
                    {index === 0 ||
                    sale.year !== saleReport[index - 1].year ||
                    sale.week !== saleReport[index - 1].week
                      ? sale.week
                      : ""}
                  </td>
                  <td>{sale.name}</td>
                  <td>{sale.totalSoldQuantity}</td>
                  <td>{sale.totalSales}</td>
                  <td>{sale.totalSalesWithDiscount}</td>
                  <td>
                    {index === 0 ||
                    sale.year !== saleReport[index - 1].year ||
                    sale.week !== saleReport[index - 1].week ||
                    sale.totalSalesWithDiscountForWeek !==
                      saleReport[index - 1].totalSalesWithDiscountForWeek
                      ? sale.totalSalesWithDiscountForWeek
                      : ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {dayTable && (
        <div>
          <h1 className=" font-bold text-3xl text-center mt-2">Daily Sales</h1>
          <table title="Date Sale"  className="w-10/12 text-left border-2  border-blue-500 mx-auto mt-5">
            <thead>
              <tr className="bg-blue-400 h-7">
                <th>Year</th>
                <th>Month</th>
                <th>Day</th>
                <th>Name</th>
                <th>Total Sold Quantity</th>
                <th>Total Sales</th>
                <th>Total Sales With Discount</th>
                <th>Daily Total</th>
              </tr>
            </thead>
            <tbody>
              {saleReport.map((sale, index) => (
                <tr key={index}  className={index === 0 ||
                  sale.year !== saleReport[index - 1].year ||
                  sale.month !== saleReport[index - 1].month ||
                  sale.day !== saleReport[index - 1].day
                    ? "border-t-2 border-blue-400"
                    : ""} >
                  
                  
                  <td>
                    {index === 0 || sale.year !== saleReport[index - 1].year
                      ? sale.year
                      : ""}
                  </td>

                  <td>
                    {index === 0 ||
                    sale.year !== saleReport[index - 1].year ||
                    sale.month !== saleReport[index - 1].month
                      ? sale.month
                      : ""}
                  </td>

                  <td>
                    {index === 0 ||
                    sale.year !== saleReport[index - 1].year ||
                    sale.month !== saleReport[index - 1].month ||
                    sale.day !== saleReport[index - 1].day
                      ? (sale.day)
                      : ""}
                  </td>

                  <td>{sale.name}</td>
                  <td>{sale.totalSoldQuantity}</td>
                  <td>{sale.totalSales}</td>
                  <td>{sale.totalSalesWithDiscount}</td>

                  <td>
                    {index === 0 ||
                    sale.year !== saleReport[index - 1].year ||
                    sale.month !== saleReport[index - 1].month ||
                    sale.day !== saleReport[index - 1].day ||
                    sale.totalSalesWithDiscountForDate!== saleReport[index - 1].totalSalesWithDiscountForDate
                      ? sale.totalSalesWithDiscountForDate
                      : ""}
                  </td>
                </tr>
               
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default ReportPage;
