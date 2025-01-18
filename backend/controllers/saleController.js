const Sale = require('../models/Sale');

// const recordSale = async (req, res) => {
//   const { name, price, soldQuantity, discount } = req.body;

//   // Validate required fields
//   if (!price || !soldQuantity) {
//     return res.status(400).json({ message: "Price and soldQuantity are required" });
//   }

//   // Add calculated fields if missing
//   req.body.total = price * soldQuantity;
//   req.body.totalWithDiscount = req.body.total * (1 - (discount || 0) / 100);

//   const sale = new Sale(req.body);

//   try {
//     await sale.save();
//     return res.status(201).json(sale);
//   } catch (error) {
//     console.log("Error saving sale:", error);
//     return res.status(500).json({ error: error.message });
//   }
// };


const recordSale = async (req, res) => {

  try {
    console.log(req.body); // Debug: Log incoming request body
    const sale = new Sale(req.body);
    console.log("Error saving sale:", sale); 
    
    await sale.save();
    res.status(201).json({ message: 'Sale recorded successfully' , deta:sale});
} catch (error) {
    res.status(500).json({ message: error.message });
}

  // console.log("Received data in backend:", req.body); // Log received data
  // const sale = new Sale(req.body);

  // try {
  //   await sale.save();
  // } catch (error) {
  //   console.log("Error saving sale:", error);
  //   return res.status(500).json({ error: error.message });
  // }

  // if (!sale) {
  //   return res.status(404).json({ message: 'No sales found' });
  // } else {
  //   return res.status(201).json(sale);
  // }
};


const getSales = async (req, res) => {
  let sales;
    try {
       sales = await Sale.find();
    } catch (error) {
      console.log(error);
    }
    
    if(!sales){
     return res.status(404).json({ message: 'No products found' });
     
    }else{
      return res.status(201).json(sales);
    }

  
 
};


const getDateSale = async (req,res)=>{

  try {
    const salesData = await Sale.aggregate([
      {
      
        $unwind: "$items",
      },
      {
       
        $group: {
          _id: { year: "$year", month:"$month",date: "$day", name: "$items.name" }, 
          totalSoldQuantity: { $sum: "$items.soldQuantity" },
          totalSales: { $sum: "$total" },
          totalSalesWithDiscount: { $sum: "$totalWithDiscount" }, 
        },
      },
      {
      
        $group: {
          _id: { year: "$_id.year", month:"$_id.month",date: "$_id.date"}, 
          totalSalesWithDiscountForDate: { $sum: "$totalSalesWithDiscount" },
          products: {
            $push: {
              name: "$_id.name",
              totalSoldQuantity: "$totalSoldQuantity",
              totalSales: "$totalSales",
              totalSalesWithDiscount: "$totalSalesWithDiscount",
            },
          },
        },
      },
      {
        $unwind: "$products",
      },
      {
        
        $project: {
       
          year: "$_id.year",
          month: "$_id.month",
          day: "$_id.date",
          name: "$products.name",
          totalSoldQuantity: "$products.totalSoldQuantity",
          totalSales: "$products.totalSales",
          totalSalesWithDiscount: "$products.totalSalesWithDiscount",
          totalSalesWithDiscountForDate: 1,
        },
      },
      {
        $sort: { year:1,month:1, date: 1, name: 1 },
      },
    ]);

    res.status(200).json(salesData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching sales data", error: error.message });
  }


}
const getWeekSale = async (req,res)=>{
  try {
    const salesData = await Sale.aggregate([
      {
        // Unwind the items array to process each item separately
        $unwind: "$items",
      },
      {
        // Group by year, week, and product name
        $group: {
          _id: { year: "$year", week: "$week", name: "$items.name" }, // Group by year, week, and product name
          totalSoldQuantity: { $sum: "$items.soldQuantity" }, // Sum sold quantities
          totalSales: { $sum: "$total" }, // Sum total sales
          totalSalesWithDiscount: { $sum: "$totalWithDiscount" }, // Sum total sales with discount
        },
      },
      {
        // Group by year and week to calculate weekly totals for all products
        $group: {
          _id: { year: "$_id.year", week: "$_id.week" }, // Group by year and week only
          totalSalesWithDiscountForWeek: { $sum: "$totalSalesWithDiscount" }, // Total sales with discount for the week
          products: {
            $push: {
              name: "$_id.name",
              totalSoldQuantity: "$totalSoldQuantity",
              totalSales: "$totalSales",
              totalSalesWithDiscount: "$totalSalesWithDiscount",
            },
          },
        },
      },
      {
        // Unwind products array to include each product as a separate entry
        $unwind: "$products",
      },
      {
        // Format the output
        $project: {
          year: "$_id.year", // Project the year
          week: "$_id.week", // Project the week
          totalSalesWithDiscountForWeek: 1, // Include the weekly total sales with discount
          name: "$products.name", // Product name
          totalSoldQuantity: "$products.totalSoldQuantity", // Total sold quantity
          totalSales: "$products.totalSales", // Total sales
          totalSalesWithDiscount: "$products.totalSalesWithDiscount", // Total sales with discount
        },
      },
      {
        // Sort by year, week, and product name for better readability
        $sort: { year: 1, week: 1, name: 1 },
      },
    ]);

    res.status(200).json(salesData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching weekly sales data", error: error.message });
  }

}
const getMonthSale = async (req,res)=>{
  try {
    const salesData = await Sale.aggregate([
      {
        
        $unwind: "$items",
      },
      {
    
        $group: {
          _id: { year: "$year",month:"$month" ,name: "$items.name" }, 
          totalSoldQuantity: { $sum: "$items.soldQuantity" },
          totalSales: { $sum: "$total" }, 
          totalSalesWithDiscount: { $sum: "$totalWithDiscount" }, 
          monthTotle:{$sum:"$totalSalesWithDiscount"}
        },
      },
      {
        $group:{
          _id:{ year: "$_id.year",month:"$_id.month" } ,
          totalSalesWithDiscountForMonth: { $sum: "$totalSalesWithDiscount" }, 
          prduct:{
            $push:{
              
              name: "$_id.name",
              totalSoldQuantity: "$totalSoldQuantity",
              totalSales: "$totalSales",
              totalSalesWithDiscount: "$totalSalesWithDiscount"
            }
          }
        }
      },{
        $unwind:"$prduct"
      },
     
      {
        
        $project: {
          year: "$_id.year",       
          month: "$_id.month",
          name: "$prduct.name",
          totalSoldQuantity: "$prduct.totalSoldQuantity",
          totalSales:  "$prduct.totalSales",
          totalSalesWithDiscount:  "$prduct.totalSalesWithDiscount",
          totalSalesWithDiscountForMonth:1 
        },
      },
      {
   
        $sort: { year: 1,month:1, name: 1 },
      },
    ]);

    res.status(200).json(salesData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching sales data", error: error.message });
  }
  

}
const getYearSale = async (req,res)=>{

  try {
    const salesData = await Sale.aggregate([
      {
    
        $unwind: "$items",
      },
      {
       
        $group: {
          _id: { year: "$year", name: "$items.name" },
          totalSoldQuantity: { $sum: "$items.soldQuantity" }, 
          totalSales: { $sum: "$total" }, 
          totalSalesWithDiscount: { $sum: "$totalWithDiscount" }, 
          yearTotle:{$sum:"$totalSalesWithDiscount"}
        },
      },
      {
        $group:{
          _id: "$_id.year", 
          totalSalesWithDiscountForYear: { $sum: "$totalSalesWithDiscount" }, 
          prduct:{
            $push:{
              name: "$_id.name",
              totalSoldQuantity: "$totalSoldQuantity",
              totalSales: "$totalSales",
              totalSalesWithDiscount: "$totalSalesWithDiscount"
            }
          }
        }
      },
      {
        $unwind:"$prduct"
      },
      {
       
        $project: {
          year: "$_id",
          name: "$prduct.name",
          totalSoldQuantity: "$prduct.totalSoldQuantity",
          totalSales:  "$prduct.totalSales",
          totalSalesWithDiscount:  "$prduct.totalSalesWithDiscount",
          totalSalesWithDiscountForYear:1
        },
      },
      {
        $sort: { year: 1, name: 1 },
      },
    ]);

    res.status(200).json(salesData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching sales data", error: error.message });
  }

}

module.exports = { recordSale, getSales, getDateSale,getWeekSale,getWeekSale,getMonthSale ,getYearSale};
