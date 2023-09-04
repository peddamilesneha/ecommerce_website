var express = require('express');
var expressEjsLayouts = require('express-ejs-layouts');
var cors = require('cors');

var mysql = require('mysql2');
const app = express()

//configure ejs
app.set('view engine', 'ejs')
app.use(expressEjsLayouts)

// receive form data 
app.use(express.urlencoded({extended: true, limit: '1mb'}))

app.use(express.json({ extended: false }));

const bcrypt = require('bcrypt');
const saltRounds = 10; // Adjust this according to your security needs

function hashPassword(password) {
  return bcrypt.hashSync(password, saltRounds);
}

module.exports = { hashPassword };



app.use(cors());
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});



var con = mysql.createConnection({
 host: "localhost",
 user: "root",
 password: "#Sneha27092002",
 database: "mydata"
});

con.connect(function(err) {
 if (err) throw err;
 console.log("Connected!");
});


app.get('/read', (req, res) =>{
  con.query("SELECT * FROM gross", function (err, result, fields){
    const response = {
        data:result
    }
    res.send(response)
 
  });
});

app.get('/api/search', (req, res) => {
    const { query } = req.query;
  
    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }
  
    const sql = 'SELECT * FROM gross WHERE name LIKE ?';
    const searchTerm = `%${query}%`;
  
    con.query(sql, [searchTerm], (err, results) => {
      if (err) {
        console.error('Error searching for products:', err);
        res.status(500).json({ error: 'Error searching for products' });
      } else {
        res.json({ results });
      }
    });
  });


app.post('/create',(req,res,next)=>{
 let product = req.body;
 query = "insert into gross(id, name, price, unit, img) values(?,?,?,?,?)";
 con.query(query,[product.id, product.name, product.price, product.unit, product.img],function(err,result){
     if(!err){
         return res.status(200).json({message: "Product Added Successfully"});
     }
     else{
         return res.status(500).json(err);
     }
 });
});

app.patch('/update/:id',(req,res,next)=>{
   const id = req.params.id;
   let product = req.body;
   var query = "update gross set name=?, price=?, unit=?, img=? where id=?";
   con.query(query,[product.name, product.price, product.unit, product.img, id],(err,result)=>{
       if(!err){
           if(result.affectedRows == 0)
           {
               return res.status(404).json({message: "Product id not found"});
           }
           return res.status(200).json({message: "Product Updated Successfully"});
       }
       else{
           return res.status(500).json(err);
       }
   });
});

app.delete('/delete/:id',(req,res,next)=>{
   const id = req.params.id;
   var query = "delete from gross where id=?";
   con.query(query,[id],(err,result)=>{
       
       if(!err){
           if(result.affectedRows == 0)
           {
               return res.status(404).json({message: "Product id not found"});
           }
           return res.status(200).json({message: "Product Deleted Successfully"});
       }
       else{
           return res.status(500).json(err);
       }
   }); 
});

app.get('/readauth', (req, res) =>{
    con.query("SELECT * FROM authup", function (err, result, fields){
      const response = {
          data:result
      }
      res.send(response)
   
    });
  });

app.post('/signup',(req,res, next)=>{
    const { name, email, password } = req.body;
    const hashedPassword = hashPassword(password);
    query = "insert into authup(name, email, password) values(?,?,?)";
    const values = [name, email, hashedPassword];
    con.query(query,values,function(err,result){
        if(!err){
            return res.status(200).json({message: "Added Successfully"});
        }
        else{
            return res.status(500).json(err);
        }
    });
   });
   app.post('/login',(req,res, next)=>{
    let p = req.body;
    query = "select * from authup where email = ? and password = ?";
    con.query(query,[p.email, p.password],function(err,result){
        if(err){
            return res.status(500).json(err);
        }
        if(result.length > 0){
            const response = {status:"Success",uid:result[0].id.toString()}
            return res.json(response);
        }
        else{
            const response = {status:"Fail",uid:""}
            return res.json(response);
        }
    });
   });
   app.post('/cart',(req,res,next)=>{
    let product = req.body;
    query = "insert into cart(customerID, productID, quantity) values(?,?,?)";
    con.query(query,[product.customerID, product.productID, product.quantity],function(err,result){
        if(!err){
            return res.status(200).json({message: "Product Added Successfully"});
        }
        else{
            return res.status(500).json(err);
        }
    });
   });

   app.patch('/cartupdate/:productID',(req,res,next)=>{
    const id = req.params.productID;
    let product = req.body;
    // const selectQuery = 'SELECT * FROM cart WHERE productID = ?';
    // con.query(selectQuery, [id], (selectErr, results) => {
    //     if (selectErr) {
    //         //con.release(); // Release the connection in case of an error
    //       return res.status(500).json({ message: 'Database query error' });
    //     }
  
    //     if (results.length === 0) {
    //       // Product with the provided ID does not exist
    //       //con.release(); // Release the connection if no matching record found
    //       return res.status(404).json({ message: 'Product not found' });
    //     }
    var query = "update cart set customerID=?, quantity=? where productID=?";
    con.query(query,[product.customerID, product.quantity, id],(err,result)=>{
        if(!err){
            if(result.affectedRows == 0)
            {
                return res.status(404).json({message: "Product id not found"});
            }
            return res.status(200).json({message: "Product Updated Successfully"});
        }
        else{
            return res.status(500).json(err);
        }
    })
});


 app.get('/readcart', (req, res) =>{
    con.query("SELECT * FROM cart", function (err, result, fields){
      const response = {
          data:result
      }
      res.send(response)
   
    });
  });

  app.delete('/deletecart/:productID',(req,res,next)=>{
    const id = req.params.productID;
    var query = "delete from cart where productID=?";
    con.query(query,[id],(err,result)=>{
        
        if(!err){
            if(result.affectedRows == 0)
            {
                return res.status(404).json({message: "Product id not found"});
            }
            return res.status(200).json({message: "Product Deleted Successfully"});
        }
        else{
            return res.status(500).json(err);
        }
    }); 
 });

 app.post('/createshoppingcart',(req,res,next)=>{
    let product = req.body;
    query = "insert into shoppingcart(id, name, price, unit, quantity, img) values(?,?,?,?,?,?)";
    con.query(query,[product.id, product.name, product.price, product.unit, product.quantity, product.img],function(err,result){
        if(!err){
            return res.status(200).json({message: "Product Added Successfully"});
        }
        else{
            return res.status(500).json(err);
        }
    });
   });

   app.get('/shoppingcart/:productID',(req,res,next)=>{
    const ID = req.params.productID;
    console.log(ID)
    var query = "select *  from gross where id=?";
    con.query(query,[ID],(err,result)=>{
        
        if(!err){
            console.log(result);
            return res.status(200).json(result);
            
        }
        else{
            console.log(err);
            return res.status(500).json(err);
        }
    }); 
 });


app.listen(8080)