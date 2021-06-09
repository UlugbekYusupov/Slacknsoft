import React, { useState } from "react";
import classes from "./InsertPop.module.css";
import Radio from "@material-ui/core/Radio";
import { withStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Input from "../Input";

const GreenRadio = withStyles({
  root: {
    color: "rgb(180, 133, 72)",
    "&$checked": {
      color: "rgb(180, 133, 72)",
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

function InsertPop(props) {
    
  const [yesOrNoValue, setYesOrNoValue] = useState(false);
  const [unitCodeOptionValue, setUnitCodeOptionValue] = useState("");
  const [insDateTimeValue, setInsDateTimeValue] = useState("");
  const [upDateTimeValue, setUpDateTimeValue] = useState("");
  const [insEmpValue, setInsEmpValue] = useState("");
  const [upEmpValue, setUpEmpValue] = useState("");
  const [itemCodeValue, setItemCodeValue] = useState("");
  const [itemNameValue, setItemNameValue] = useState("");
  const [itemSpecValue, setItemSpecValue] = useState("");
  const [remarkValue, setRemarkValue] = useState("");

  const insertTemp = {
    Ins_Emp: insEmpValue,
    Up_Emp: upEmpValue,
    Item_Code: itemCodeValue,
    Item_Name: itemNameValue,
    Item_Spec: itemSpecValue,
    Remark: remarkValue,
    Ins_DateTime: insDateTimeValue,
    Up_DateTime: upDateTimeValue,
    Unit_Code: unitCodeOptionValue,
    Use_YN: yesOrNoValue ? "No" : "Yes",
  };

  const submitCreatedItem = (event) => {
    event.preventDefault();

    const url = "/api/items";
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(insertTemp),
    })
      .then((res) => {
        console.log(res);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Create items failed...";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        window.location.reload();
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className={classes.Popup}>
      <form onSubmit={submitCreatedItem}>
        <Input
          value={insEmpValue}
          onChange={(event) => {
            setInsEmpValue(event.target.value);
          }}
          id="Ins_Emp"
          label="Ins_Emp"
        />
        <Input
          value={upEmpValue}
          onChange={(event) => {
            setUpEmpValue(event.target.value);
          }}
          id="Up_Emp"
          label="Up_Emp"
        />
        <Input
          value={itemCodeValue}
          onChange={(event) => {
            setItemCodeValue(event.target.value);
          }}
          id="Item_Code"
          type="number"
          label="Item_Code"
        />
        <Input
          value={itemNameValue}
          onChange={(event) => {
            setItemNameValue(event.target.value);
          }}
          id="Item_Name"
          label="Item_Name"
        />
        <Input
          value={itemSpecValue}
          onChange={(event) => {
            setItemSpecValue(event.target.value);
          }}
          id="Item_Spec"
          label="Item_Spec"
        />
        <Input
          value={remarkValue}
          onChange={(event) => {
            setRemarkValue(event.target.value);
          }}
          id="Remark"
          label="Remark"
        />

        <div className={classes.control}>
          <label>Unit_Code</label>
          <select
            value={unitCodeOptionValue}
            onChange={(event) => {
              setUnitCodeOptionValue(event.target.value);
            }}
          >
            <option value=" ">Empty</option>
            <option value="A-101">A-101</option>
            <option value="B-202">B-202</option>
            <option value="C-303">C-303</option>
            <option value="D-404">D-404</option>
          </select>
        </div>

        <Input
          value={upDateTimeValue}
          onChange={(event) => {
            setUpDateTimeValue(event.target.value);
          }}
          id="Up_DateTime"
          type="date"
          label="Up_DateTime"
        />

        <Input
          value={insDateTimeValue}
          onChange={(event) => {
            setInsDateTimeValue(event.target.value);
          }}
          id="Ins_DateTime"
          type="date"
          label="Ins_DateTime"
        />

        <div className={classes.radio}>
          <label>Use_YN</label>
          <div>
            <FormControlLabel
              labelPlacement="end"
              control={
                <GreenRadio
                  checked={!yesOrNoValue}
                  onChange={(event) => {
                    setYesOrNoValue(!yesOrNoValue);
                  }}
                  name="radio-button-demo"
                />
              }
              label="Yes"
            />
            <FormControlLabel
              labelPlacement="end"
              control={
                <GreenRadio
                  checked={yesOrNoValue}
                  onChange={(event) => {
                    setYesOrNoValue(!yesOrNoValue);
                  }}
                  name="radio-button-demo"
                />
              }
              label="No"
            />
          </div>
        </div>
        <button className={classes.button}>INSERT</button>
      </form>
    </div>
  );
}

export default InsertPop;
