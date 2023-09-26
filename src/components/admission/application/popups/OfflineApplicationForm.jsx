import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { forwardRef, useEffect, useState } from "react";
import axios from "axios";
import { DatePicker } from "@mui/x-date-pickers";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function OfflineApplicationForm({ open, close }) {
  const [countries, setCounties] = useState([]);
  const [permStates, setPermStates] = useState([]);
  const [permCities, setPermCities] = useState([]);

  const [curState, setCurState] = useState([]);
  const [curCities, setCurCities] = useState([]);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    middle_name: "",
    dob: "",
    gender: "",
    is_critical_ailment: "",
    critical_ailment: "",
    nationality: "",
    religion: "",
    category: "",
    contact_number: "",
    email: "",
    applying_for: "",
    admission_year: "",
    current_class: "",
    percentage_secured: "",
    caste: "",
    school_name: "",
    board: "",
    medium: "",
    permanent_address: "",
    permanent_country: "",
    permanent_states: "",
    permanent_cities: "",
    permanent_district: "",
    permanent_pin_code: "",
    is_same_as_permanent_address: "",
    current_address: "",
    current_country: "",
    current_states: "",
    current_cities: "",
    current_district: "",
    current_pin_code: "",
    father_name: "",
    father_occupation: "",
    father_annual_income: "",
    father_contact_number: "",
    father_email: "",
    mother_name: "",
    mother_occupation: "",
    mother_annual_income: "",
    mother_email: "",
    mother_contact_number: "",
    guardian_name: "",
    guardian_occupation: "",
    guardian_annual_income: "",
    guardian_contact_number: "",
    guardian_email: "",
    payment_date: "",
    payment_mode: "",
    receipt_no: "",
    type: "",
  });

  // country

  useEffect(() => {
    axios
      .get("https://api.countrystatecity.in/v1/countries", {
        headers: {
          "X-CSCAPI-KEY":
            "UktWSUFIa0VSazU1V1ZpZnRKN0IzNFVlWjRtWlR4bDl0Tm43RFcyNA==",
        },
      })
      .then((res) => setCounties(res.data));
  }, []);

  // permanent state
  useEffect(() => {
    if (formData.permanent_country == "") return;
    axios
      .get(
        `https://api.countrystatecity.in/v1/countries/${formData.permanent_country}/states`,
        {
          headers: {
            "X-CSCAPI-KEY":
              "UktWSUFIa0VSazU1V1ZpZnRKN0IzNFVlWjRtWlR4bDl0Tm43RFcyNA==",
          },
        }
      )
      .then((res) => setPermStates(res.data));
  }, [formData.permanent_country]);

  // permanent city
  useEffect(() => {
    if (formData.permanent_states == "") return;

    axios
      .get(
        `https://api.countrystatecity.in/v1/countries/IN/states/${formData.permanent_states}/cities/`,
        {
          headers: {
            "X-CSCAPI-KEY":
              "UktWSUFIa0VSazU1V1ZpZnRKN0IzNFVlWjRtWlR4bDl0Tm43RFcyNA==",
          },
        }
      )
      .then((res) => setPermCities(res.data));
  }, [formData.permanent_states]);

  // current state
  useEffect(() => {
    if (formData.current_country == "") return;
    axios
      .get(
        `https://api.countrystatecity.in/v1/countries/${formData.current_country}/states`,
        {
          headers: {
            "X-CSCAPI-KEY":
              "UktWSUFIa0VSazU1V1ZpZnRKN0IzNFVlWjRtWlR4bDl0Tm43RFcyNA==",
          },
        }
      )
      .then((res) => setCurState(res.data));
  }, [formData.current_country]);

  // current city
  useEffect(() => {
    if (formData.current_states == "") return;

    axios
      .get(
        `https://api.countrystatecity.in/v1/countries/IN/states/${formData.current_states}/cities/`,
        {
          headers: {
            "X-CSCAPI-KEY":
              "UktWSUFIa0VSazU1V1ZpZnRKN0IzNFVlWjRtWlR4bDl0Tm43RFcyNA==",
          },
        }
      )
      .then((res) => setCurCities(res.data));
  }, [formData.current_states]);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  function handleChange(e) {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  const [PAC, setPAC] = useState(false);

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={close}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={close}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} fontSize={"1rem"}>
            Offline Application
          </Typography>
          <Button autoFocus color="inherit" onClick={close}>
            Submit
          </Button>
        </Toolbar>
      </AppBar>
      <Box display={"flex"} p={3} alignItems={"flex-start"}>
        <Grid container px={4} spacing={1} flex={2}>
          <Grid item xs={12}>
            <Typography
              p={1}
              borderRadius={1}
              bgcolor={"#ececec"}
              fontWeight={500}
              mb={1}
            >
              Personal Details
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography fontWeight={600}>Candidate's Image</Typography>
          </Grid>
          <Grid item xs={12} mb={2}>
            <input type="file" />
          </Grid>

          <Grid item xs={12}>
            <Typography fontWeight={600}>Candidate's Name</Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField fullWidth label="First" />
          </Grid>
          <Grid item xs={4}>
            <TextField fullWidth label="Middle" />
          </Grid>
          <Grid item xs={4}>
            <TextField fullWidth label="Last" />
          </Grid>
          <Grid item xs={12}>
            <Typography fontWeight={600} mt={2}>
              Contact Details
            </Typography>
          </Grid>

          <Grid item xs={4}>
            <TextField fullWidth label="Contact Number" />
          </Grid>
          <Grid item xs={8}>
            <TextField fullWidth label="Email" />
          </Grid>

          <Grid item xs={12}>
            <Typography fontWeight={600} mt={2}>
              Other Details
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField fullWidth label="Nationality" />
          </Grid>
          <Grid item xs={4}>
            <TextField fullWidth label="Religion" />
          </Grid>
          <Grid item xs={4}>
            <TextField fullWidth label="Category" />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Date of Birth"
              placeholder="yyyy-mm-dd"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField fullWidth label="Gender" />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Critical Medical
Ailment(if any)"
            />
          </Grid>
          <Grid item xs={12}>
            <Typography
              p={1}
              px={1}
              bgcolor={"#ececec"}
              borderRadius={1}
              color={"black"}
              fontWeight={500}
              mb={1}
              mt={2}
            >
              Application Details
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField fullWidth label="Applying For" placeholder="class" />
          </Grid>
          <Grid item xs={4}>
            <TextField fullWidth label="Admission Year" />
          </Grid>
          <Grid item xs={4}>
            <TextField fullWidth label="Current Class" />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="% secured in Prev.
Class Final Exam"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField fullWidth label="Specialization" />
          </Grid>
          <Grid item xs={4}>
            <TextField fullWidth label="School Name" />
          </Grid>
          <Grid item xs={4}>
            <TextField fullWidth label="Board" />
          </Grid>
          <Grid item xs={4}>
            <TextField fullWidth label="Medium" />
          </Grid>
          <Grid item xs={12}>
            <Typography
              fontSize={"1rem"}
              p={1}
              px={1}
              bgcolor={"#ececec"}
              borderRadius={1}
              color={"black"}
              fontWeight={500}
              mb={1}
            >
              Fee Payment Details
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <DatePicker
                label="Payment Date"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    payment_date: new Date(e),
                  }))
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Payment Mode
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Payment Mode"
                onChange={handleChange}
                name="payment_mode"
                value={formData.payment_mode}
              >
                <MenuItem value={"offline"}>offline</MenuItem>
                <MenuItem value={"online"}>online</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <TextField
              type="text"
              fullWidth
              label="Challan No. / Reciept No."
              onChange={handleChange}
              name="receipt_no"
              value={formData.receipt_no}
            />
          </Grid>
        </Grid>
        <Box bgcolor={"grey.300"} width={"1px"}></Box>
        <Grid container px={4} spacing={1} rowSpacing={2} flex={2}>
          <Grid item xs={12}>
            <Typography
              fontSize={"1rem"}
              p={1}
              px={1}
              bgcolor={"#ececec"}
              borderRadius={1}
              color={"black"}
              fontWeight={500}
              mb={1}
            >
              Address Details
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography fontWeight={"bold"}>Parmanent Address</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Current Residential Address"
              name="permanent_address"
              value={formData.permanent_address}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Country</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Country"
                name="permanent_country"
                onChange={handleChange}
                value={formData.permanent_country}
              >
                {countries.map((c, idx) => (
                  <MenuItem key={idx} value={c.iso2}>
                    {c.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">State</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                disabled={
                  formData.permanent_country == "" || permStates.length == 0
                }
                label="State"
                onChange={handleChange}
                name="permanent_states"
                value={formData.permanent_states}
              >
                {permStates.map((s, idx) => (
                  <MenuItem key={idx} value={s.iso2}>
                    {s.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">City</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                disabled={
                  formData.permanent_states == "" || permCities.length == 0
                }
                id="demo-simple-select"
                label="City"
                onChange={handleChange}
                name="permanent_cities"
                value={formData.permanent_cities}
              >
                {permCities.map((c, idx) => (
                  <MenuItem key={idx} value={c.name}>
                    {c.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="District"
              value={formData.permanent_district}
              onChange={handleChange}
              name="permanent_district"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              type="number"
              fullWidth
              label="Pin Code"
              value={formData.permanent_pin_code}
              onChange={handleChange}
              name="permanent_pin_code"
              onInput={(e) => {
                e.target.value = Math.max(0, parseInt(e.target.value))
                  .toString()
                  .slice(0, 6);
              }}
            />
          </Grid>

          <Grid
            item
            xs={12}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography fontWeight={"bold"}>Current Address</Typography>
            <FormControlLabel
              control={
                <Checkbox
                  checked={PAC}
                  onChange={(e, ch) => {
                    setPAC(ch),
                      setFormData((prev) => ({
                        ...prev,
                        is_same_as_permanent_address: ch ? 1 : 0,
                      }));
                  }}
                />
              }
              label="Same as Parmanent Address"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              disabled={PAC}
              fullWidth
              onChange={handleChange}
              name="current_address"
              value={
                PAC ? formData.permanent_address : formData.current_address
              }
              label="Current Residential Address"
            />
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth disabled={PAC}>
              <InputLabel id="demo-simple-select-label">Country</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Country"
                name="current_country"
                onChange={handleChange}
                value={
                  PAC ? formData.permanent_country : formData.current_country
                }
              >
                {countries.map((c, idx) => (
                  <MenuItem key={idx} value={c.iso2}>
                    {c.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl
              fullWidth
              disabled={
                PAC || formData.current_country == "" || curState.length == 0
              }
            >
              <InputLabel id="demo-simple-select-label">State</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="State"
                name="current_states"
                value={
                  PAC ? formData.permanent_states : formData.current_states
                }
                onChange={handleChange}
              >
                {PAC
                  ? permStates.map((c, idx) => (
                      <MenuItem key={idx} value={c.iso2}>
                        {c.name}
                      </MenuItem>
                    ))
                  : curState.map((c, idx) => (
                      <MenuItem key={idx} value={c.iso2}>
                        {c.name}
                      </MenuItem>
                    ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl
              fullWidth
              disabled={
                PAC || formData.current_states == "" || curCities.length == 0
              }
            >
              <InputLabel id="demo-simple-select-label">City</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="City"
                onChange={handleChange}
                name="current_cities"
                value={
                  PAC ? formData.permanent_cities : formData.current_cities
                }
              >
                {PAC
                  ? permCities.map((c, idx) => (
                      <MenuItem key={idx} value={c.name}>
                        {c.name}
                      </MenuItem>
                    ))
                  : curCities.map((c, idx) => (
                      <MenuItem key={idx} value={c.name}>
                        {c.name}
                      </MenuItem>
                    ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="District"
              disabled={PAC}
              value={
                PAC ? formData.permanent_district : formData.current_district
              }
              onChange={handleChange}
              name="current_district"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              disabled={PAC}
              type="number"
              fullWidth
              label="Pin Code"
              value={
                PAC ? formData.permanent_pin_code : formData.current_pin_code
              }
              onChange={handleChange}
              name="current_pin_code"
              onInput={(e) => {
                e.target.value = Math.max(0, parseInt(e.target.value))
                  .toString()
                  .slice(0, 6);
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography
              fontSize={"1rem"}
              p={1}
              px={1}
              bgcolor={"#ececec"}
              borderRadius={1}
              color={"black"}
              fontWeight={500}
            >
              Parent / Guardian Details
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography fontWeight={"bold"}>Father's Details</Typography>
          </Grid>

          <Grid item xs={4}>
            <TextField
              type="text"
              fullWidth
              label="Name"
              onChange={handleChange}
              name="father_name"
              value={formData.father_name}
            />
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Occupation</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Occupation"
                onChange={handleChange}
                name="father_occupation"
                value={formData.father_occupation}
              >
                <MenuItem value={"Government"}>Government</MenuItem>
                <MenuItem value={"private"}>Private</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <TextField
              type="text"
              fullWidth
              label="Anual Income"
              onChange={handleChange}
              name="father_annual_income"
              value={formData.father_annual_income}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              type="number"
              fullWidth
              label="Contact Number"
              value={formData.father_contact_number}
              onChange={handleChange}
              name="father_contact_number"
              onInput={(e) => {
                e.target.value = Math.max(0, parseInt(e.target.value))
                  .toString()
                  .slice(0, 10);
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              type="email"
              fullWidth
              label="Email"
              value={formData.father_email}
              onChange={handleChange}
              name="father_email"
            />
          </Grid>

          <Grid item xs={12}>
            <Typography fontWeight={"bold"}>Mother's Details</Typography>
          </Grid>

          <Grid item xs={4}>
            <TextField
              type="text"
              fullWidth
              label="Name"
              onChange={handleChange}
              name="mother_name"
              value={formData.mother_name}
            />
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Occupation</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Occupation"
                onChange={handleChange}
                name="mother_occupation"
                value={formData.mother_occupation}
              >
                <MenuItem value={"Government"}>Government</MenuItem>
                <MenuItem value={"private"}>Private</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <TextField
              type="text"
              fullWidth
              label="Anual Income"
              onChange={handleChange}
              name="mother_annual_income"
              value={formData.mother_annual_income}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              type="number"
              fullWidth
              label="Contact Number"
              value={formData.mother_contact_number}
              onChange={handleChange}
              name="mother_contact_number"
              onInput={(e) => {
                e.target.value = Math.max(0, parseInt(e.target.value))
                  .toString()
                  .slice(0, 10);
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              type="email"
              fullWidth
              label="Email"
              value={formData.mother_email}
              onChange={handleChange}
              name="mother_email"
            />
          </Grid>
          <Grid item xs={12}>
            <Typography fontWeight={"bold"}>
              Local Guardian's Details
            </Typography>
          </Grid>

          <Grid item xs={4}>
            <TextField
              type="text"
              fullWidth
              label="Name"
              onChange={handleChange}
              name="mother_name"
              value={formData.mother_name}
            />
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Occupation</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Occupation"
                onChange={handleChange}
                name="mother_occupation"
                value={formData.mother_occupation}
              >
                <MenuItem value={"Government"}>Government</MenuItem>
                <MenuItem value={"private"}>Private</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <TextField
              type="text"
              fullWidth
              label="Anual Income"
              onChange={handleChange}
              name="mother_annual_income"
              value={formData.mother_annual_income}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              type="number"
              fullWidth
              label="Contact Number"
              value={formData.mother_contact_number}
              onChange={handleChange}
              name="mother_contact_number"
              onInput={(e) => {
                e.target.value = Math.max(0, parseInt(e.target.value))
                  .toString()
                  .slice(0, 10);
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              type="email"
              fullWidth
              label="Email"
              value={formData.mother_email}
              onChange={handleChange}
              name="mother_email"
            />
          </Grid>
          
        </Grid>
      </Box>
    </Dialog>
  );
}

export default OfflineApplicationForm;
