import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import countries from "../util/countries";

export default ({ onSelect, onPickerOpen }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(false);
  useEffect(() => {
    onSelect(value);
  }, [value]);
  useEffect(() => {
    if (open) onPickerOpen();
  }, [open]);

  return (
    <View>
      <DropDownPicker
        // listMode="SCROLLVIEW"
        listMode="MODAL"
        //   scrollViewProps={}
        searchable
        open={open}
        value={value}
        items={countries.map((ctry) => {
          return { label: ctry, value: ctry };
        })}
        setOpen={() => {
          setOpen(!open);
        }}
        setValue={setValue}
        // setItems={setItems}
        theme="DARK"
        mode="BADGE"
        badgeDotColors={[
          "#e76f51",
          "#00b4d8",
          "#e9c46a",
          "#e76f51",
          "#8ac926",
          "#00b4d8",
          "#e9c46a",
        ]}
      />
    </View>
  );
};
