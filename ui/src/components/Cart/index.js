import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function CartComponent() {
  const [user, setUsers] = useState([]);

  const [procart, setProscart] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/readcart')
      .then(response => {
        console.log(response.data.data);
        setUsers(response.data.data);
        const promises = [];
  
        for (var j = 0; j < response.data.data.length; j++) {
          const quantity = response.data.data[j].quantity;
          const productID = response.data.data[j].productID;
  
          // Create a promise for each Axios request
          const requestPromise = axios.get(`http://localhost:8080/shoppingcart/${productID}`)
            .then(res => {
              const item = {
                name: res.data[0].name,
                price: res.data[0].price,
                unit: res.data[0].unit,
                img: res.data[0].img,
                quantity: quantity
              };
              console.log(item);
              return item;
            })
            .catch(error => {
              // Handle errors for this specific request
              console.error(`Error fetching data for product ID ${productID}:`, error);
              return null; // Return null or another appropriate value
            });
  
          promises.push(requestPromise);
        }
  
        // Wait for all promises to resolve
        Promise.all(promises)
          .then(items => {
            // Filter out any null values (requests that had errors)
            const validItems = items.filter(item => item !== null);
  
            // Update the state with valid items
            setProscart([...procart, ...validItems]);
          });
      })
      .catch(error => {
        console.error('Error fetching data from readcart:', error);
      });
  }, []);

   var [count,setcount] = React.useState(0)
   var total;
  var setQuantity = (ind, increment) =>{
    var prev = procart
    prev[ind].quantity = parseInt(prev[ind].quantity) + increment
    setProscart(prev)
     setcount(count+1)
  }
  var sum = 0;
  for(let i=0;i<procart.length;i++){
    sum = sum + parseInt(procart[i].quantity) * parseInt(procart[i].price)
  }
  total = sum;

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {
        
        (procart.length > 0) && procart.map((item, index) =>
          <ListItem key={index}>
            <ListItemAvatar>
              <Avatar src={item.img} />
            </ListItemAvatar>
            {/* var x = {item.Price * item.quantity} */}
            <ListItemText>{item.name}</ListItemText>
            <ListItemText>&#8377; {item.price}</ListItemText>
            <ListItemText>{item.quantity}</ListItemText>
            <ButtonGroup>
          <Button
            aria-label="reduce"
            onClick={() => {
              setQuantity(index,-1);
            }}
          >
            <RemoveIcon fontSize="small" />
          </Button>
          <Button
            aria-label="increase"
            onClick={() => {
              setQuantity(index,1);
            }}
          >
            <AddIcon fontSize="small" />
          </Button>
        </ButtonGroup>
          </ListItem>

        )}
      <h>Total price = {total}</h>
    </List>
  );
}

