import React, { useState } from "react";
import Input from "../Input";
import classes from "../InsertPopup/InsertPop.module.css";
import Radio from "@material-ui/core/Radio";
import { withStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const GreenRadio = withStyles({
  root: {
    color: "rgb(180, 133, 72)",
    "&$checked": {
      color: "rgb(180, 133, 72)",
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

function UpdatePop(props) {
  const {
    Ins_DateTime,
    Ins_Emp,
    Item_Code,
    Item_Name,
    Item_Spec,
    Remark,
    Unit_Code,
    Up_DateTime,
    Up_Emp,
    Use_YN,
    id,
  } = props.rowData;

  const [yesOrNoValue, setYesOrNoValue] = useState(
    Use_YN === "Yes" ? false : true
  );
  const [unitCodeOptionValue, setUnitCodeOptionValue] = useState(Unit_Code);
  const [insDateTimeValue, setInsDateTimeValue] = useState(Ins_DateTime);
  const [upDateTimeValue, setUpDateTimeValue] = useState(Up_DateTime);
  const [insEmpValue, setInsEmpValue] = useState(Ins_Emp);
  const [upEmpValue, setUpEmpValue] = useState(Up_Emp);
  const [itemCodeValue, setItemCodeValue] = useState(Item_Code);
  const [itemNameValue, setItemNameValue] = useState(Item_Name);
  const [itemSpecValue, setItemSpecValue] = useState(Item_Spec);
  const [remarkValue, setRemarkValue] = useState(Remark);

  const data = {
    Ins_DateTime: insDateTimeValue,
    Ins_Emp: insEmpValue,
    Item_Code: itemCodeValue,
    Item_Name: itemNameValue,
    Item_Spec: itemSpecValue,
    Remark: remarkValue,
    Unit_Code: unitCodeOptionValue,
    Up_DateTime: upDateTimeValue,
    Up_Emp: upEmpValue,
    Use_YN: yesOrNoValue === true ? "No" : "Yes",
    id: id,
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const url = "/api/items";
    fetch(`${url}/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.ok) {
        window.location.reload();
      }
    });
  };

  return (
    <div className={classes.Popup}>
      <form onSubmit={handleSubmit}>
        <Input
          value={insEmpValue}
          onChange={(event) => setInsEmpValue(event.target.value)}
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
        <button className={classes.button}>UPDATE</button>
      </form>
    </div>
  );
}

export default UpdatePop;
