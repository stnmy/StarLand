import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useEffect, useState } from "react";

type Props ={
    items: string[];
    checked: string[];
    onChange: (items: string[]) => void;
}

export default function CheckBoxButtonGroup({items, checked, onChange} : Props) {
  const [checkedItems, setCheckedItems] = useState(checked);  

  useEffect(() => {
    setCheckedItems(checked);
  }, [checked])

  const handleToggle = (value: string) =>{
    const updatedChecked = checkedItems?.includes(value)
        ? checkedItems.filter(item => item != value)
        :[...checkedItems, value];

    setCheckedItems(updatedChecked);
    onChange(updatedChecked);
  }

  return (
    <FormGroup>
    {items.map((item) => (
        <FormControlLabel
          sx={{ width: "100%" }}
          key={item}
          control={<Checkbox 
            checked={checkedItems.includes(item)} 
            onClick={() => handleToggle(item)} 
            sx={{ py: 0.5 }} 
            />}
          label={item}
        />
      ))}
  </FormGroup>
  )
}