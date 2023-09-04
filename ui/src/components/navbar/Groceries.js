import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActions } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import Cookies from "js-cookie";


function Product(props) {
  const [responseMessage, setResponseMessage] = useState([]);
  const [item, setItem] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:8080/readcart')
      .then(response => {
        //console.log(response.data.data)
        setItem(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

  }, []);

  const addToCart = () => {
    window.location.reload()
    console.log(item)
    const Details = {
      customerID: Cookies.get('uid'),
      productID: props.ID,
      quantity: 1
    }
    var a = 1;
    if(item.length > 0)
    {
      for(var i=0; i<item.length; i++)
      {
        //console.log(item[i].productID, props.ID)
        if(item[i].productID === props.ID)
        {
          a=2
          const Details1 = {
            customerID: Cookies.get('uid'),
            productID: props.ID,
            quantity: Details.quantity + 1
          }
          axios
          .patch(`http://localhost:8080/cartupdate/${props.ID}`, Details1)
          .then((response) => {
            if (response.status === 200) {
              alert('Item updated successfully');
            } else {
              alert('Error while updating item');
            }
          })
          .catch((error) => {
            console.error('Error:', error);
          })
        }
      }
    }
    
    if(a===1)
    {
      axios
      .post('http://localhost:8080/cart',Details)
      .then((response) => {
        setResponseMessage(response.data.message);
        if (response.status === 200) {
          alert('Item added successfully');
        } else {
          alert('Error while adding item');
        }
      })
      .catch((error) => console.error('Error:', error));
    }
    
    

    const productDetails = {
      Name: props.Name,
      Price: props.Price,
      quantity: 1
    }
    var cartDetails = JSON.parse(localStorage.getItem('Cart'));
    if (cartDetails) {
      cartDetails.push(productDetails)
    }
    else {
      cartDetails = []
      cartDetails.push(productDetails)
    }
    localStorage.setItem('Cart', JSON.stringify(cartDetails));
  }


  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="250"
        image={props.Img}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.Name}
        </Typography>
        <h4>
          {props.Unit}
        </h4>
      </CardContent>

      <CardActions style={{ justifyContent: 'space-between' }}>
        <h2>
          &#8377; {props.Price}
        </h2>
        <Button size="small" onClick={addToCart} color="success" variant="contained">
          ADD TO CART
        </Button>

      </CardActions>
    </Card>

  );
}





export default function Groceries() {
  const [items, setItems] = useState([]);
  const [key, setKey] = useState("");
  const searchhandle = (event) => {
    setKey(event.target.value);
    
  }
  useEffect(() => {
    if (key !== "") {
      axios.get(`http://localhost:8080/api/search?query=${key}`)
        .then((value) => {
          console.log(value.data.results);
          setItems(value.data.results)
        });
    }
    else {
      axios.get('http://localhost:8080/read')
        .then(response => {
          console.log("response", response.data.data)
          setItems(response.data.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }

  }, [key]);

  

  return (
    <>

      <div style={{ padding: '25px', alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
        <IconButton color="inherit"><SearchIcon /></IconButton>
        <input type="" style={{ padding: '10px', width: '500px', textalign: 'center' }} onChange={searchhandle} placeholder='Search Product...'></input>
      </div>

      {items && (items.length > 0) ? items.map((item) => <Product ID={item.id} Name={item.name} Price={item.price} Unit={item.unit} Img={item.img} />) :
        <div>Items Not Found</div>
      }
    </>
  );
}



