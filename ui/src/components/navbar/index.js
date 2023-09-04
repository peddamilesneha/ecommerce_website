import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Groceries from './Groceries';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function NavBarComponent() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Groceries" {...a11yProps(0)} />
          <Tab label="Fruits" {...a11yProps(1)} />
          <Tab label="Vegetables" {...a11yProps(2)} />
          <Tab label="Clothings" {...a11yProps(0)} />
          <Tab label="Electronics" {...a11yProps(1)} />
          <Tab label="Accessories" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
       <Groceries />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
       Fruits
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
       Vegetables
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
       Clothings
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
       Electronics
      </CustomTabPanel>
      <CustomTabPanel value={value} index={5}>
       Accessories
      </CustomTabPanel>
    </Box>
  );
}