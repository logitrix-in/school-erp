import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import ImgCrop from "antd-img-crop";
import { Upload } from "antd";

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
import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { DatePicker } from "@mui/x-date-pickers";
import debounce from "lodash.debounce";
import api from "../../../../config/api";
import dayjs from "dayjs";
import { ToastContainer, toast } from "react-toastify";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function OfflineApplicationForm({ open, close }) {
  const [countries, setCounties] = useState([]);
  const [permStates, setPermStates] = useState([]);
  const [permCities, setPermCities] = useState([]);

  const [curState, setCurState] = useState([]);
  const [curCities, setCurCities] = useState([]);

  const [board, setBoard] = useState("");
  const [medium, setMedium] = useState("");

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    middle_name: "",
    dob: "",
    gender: "",
    is_critical_ailment: false,
    critical_ailment: "",
    nationality: "",
    religion: "",
    category: "",
    contact_number: "",
    email: "",
    profile_photo: "",
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
    type: "offline",
  });

  const convertObjectToFormData = (obj) => {
    const formData = new FormData();

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        formData.append(key, obj[key]);
      }
    }

    return formData;
  };

  const onSubmit = () => {
    const required = [
      "first_name",
      "last_name",
      "dob",
      "admission_year",
      "applying_for",
    ];
    if (
      required.map((key, idx) => {
        if (formData[key] == "")
          return toast.error(`${key.replaceAll("_", " ")} is required`, {
            position: "top-right",
            autoClose: (idx + 3) * 500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "dark",
          });
      })
    )
      console.log(convertObjectToFormData(formData));
    api
      .post("/admission/application/", convertObjectToFormData(formData), {
        "Content-Type": "multipart/form-data",
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const nationalityCategories = useMemo(() => [
    "Asian",
    "European",
    "African",
    "North American",
    "South American",
    "Middle Eastern",
    "Oceanian",
    "Caribbean",
    "Central American",
    "Pacific Islander",
    "Indigenous Peoples",
    "Mixed or Multinational",
  ]);

  const religionOptions = useMemo(() => [
    "Christianity",
    "Islam",
    "Hinduism",
    "Buddhism",
    "Judaism",
    "Sikhism",
    "Jainism",
    "Bahá'í Faith",
    "Shintoism",
    "Taoism",
    "Zoroastrianism",
    "Atheism",
    "Agnosticism",
    "Other / Not specified",
  ]);

  const [classOptions, setClasses] = useState([]);

  const admissionYearOptions = useMemo(() => ["2023-24", "2024-25", "2025-26"]);
  const specializationOptions = useMemo(() => ["Science", "Arts", "Commerce"]);
  const boardOptions = useMemo(() => ["CBSE", "ICSE", "State Board", "Other"]);
  const mediumOptions = useMemo(() => ["English", "Bengali", "Hindi", "Other"]);
  // country

  useEffect(() => {
    api
      .get(
        "/admission/application/manage-application/?date_format=calendar&is_active=1"
      )
      .then((res) => {
        setClasses(res.data.map((d) => d.class_name));
      });

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

  const [image, setImage] = useState();
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (image) {
      const reader = new FileReader();

      reader.onload = (event) => {
        setImagePreview(event.target.result);
        console.log(event.target.result);
      };

      reader.readAsDataURL(image);
    } else {
      setImagePreview(null);
    }
  }, [image]);

  function handleImageChange(e) {
    const selectedFile = e.target.files[0];

    setImage(selectedFile);
    setFormData((prevFormData) => ({
      ...prevFormData,
      profile_photo: selectedFile,
    }));
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  const [PAC, setPAC] = useState(false);

  const imageRef = useRef();

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={close}
      TransitionComponent={Transition}
    >
      <ToastContainer />
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
        </Toolbar>
      </AppBar>
      <Box display={"flex"} p={3} alignItems={"flex-start"}>
        <Grid container px={4} spacing={1} rowSpacing={2} flex={2}>
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
          <Grid
            item
            xs={12}
            mb={2}
            display={"flex"}
            alignItems={"stretch"}
            gap={2}
          >
            <input
              type="file"
              hidden
              ref={imageRef}
              accept="image/*"
              onChange={handleImageChange}
            />
            {imagePreview && (
              <img
                style={{
                  borderRadius: "10px",
                  height: "150px",
                  width: "150px",
                  objectFit: "contain",
                  background: "whitesmoke",
                }}
                src={imagePreview}
                alt="Preview"
              />
            )}
            <Box flex={1} display={"flex"} flexDirection={"column"}>
              {image && <Typography fontWeight={500}>{image.name}</Typography>}
              {image && <Typography>{image.type}</Typography>}
              {image && (
                <Typography>
                  {(image.size / (1024 * 1024)).toFixed(2) + "MB"}
                </Typography>
              )}
              <Button
                sx={{ mt: "auto" }}
                variant="contained"
                fullWidth
                onClick={() => imageRef.current.click()}
              >
                Upload
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Typography fontWeight={600}>Candidate's Name</Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              required
              label="First"
              // value={formData.first_name}
              name="first_name"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Middle"
              // value={formData.middle_name}
              name="middle_name"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              required
              fullWidth
              label="Last"
              // value={formData.last_name}
              name="last_name"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography fontWeight={600} mt={2}>
              Contact Details
            </Typography>
          </Grid>

          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Contact Number"
              type="number"
              name="contact_number"
              // value={formData.contact_number}
              onChange={handleChange}
              onInput={(e) => {
                e.target.value = Math.max(0, parseInt(e.target.value))
                  .toString()
                  .slice(0, 10);
              }}
            />
          </Grid>
          <Grid item xs={8}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              // value={formData.email}
              onChange={handleChange}
              name="email"
            />
          </Grid>

          <Grid item xs={12}>
            <Typography fontWeight={600} mt={2}>
              Other Details
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Nationality</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Nationality"
                onChange={handleChange}
                name="nationality"
                // value={formData.nationality}
              >
                {nationalityCategories.map((category, index) => (
                  <MenuItem key={index} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Religion</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Religion"
                onChange={handleChange}
                name="religion"
                // value={formData.religion}
              >
                {religionOptions.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Category"
                onChange={handleChange}
                name="category"
                // value={formData.category}
              >
                <MenuItem value={"gn"}>General</MenuItem>
                <MenuItem value={"sc"}>Sc</MenuItem>
                <MenuItem value={"st"}>St</MenuItem>
                <MenuItem value={"obc"}>Obc</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <DatePicker
                defaultValue={new dayjs()}
                label="Date of Birth"
                onChange={(date) => {
                  const _date = new Date(date);
                  const year = _date.getFullYear();
                  const month = String(_date.getMonth() + 1).padStart(2, "0");
                  const day = String(_date.getDate()).padStart(2, "0");

                  const formattedDate = `${year}-${month}-${day}`;
                  setFormData((prev) => ({ ...prev, dob: formattedDate }));
                }}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Gender</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Gender"
                onChange={handleChange}
                name="gender"
                // value={formData.gender}
              >
                <MenuItem value={"male"}>Male</MenuItem>
                <MenuItem value={"female"}>Female</MenuItem>
                <MenuItem value={"other"}>Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Critical Medical Ailment (if any)
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Critical Medical Ailment (if any)"
                onChange={handleChange}
                name="is_critical_ailment"
                defaultValue={2}
                // value={formData.gender}
              >
                <MenuItem value={true}>Yes</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {formData.is_critical_ailment && (
            <Grid item xs={12}>
              <TextField
                onChange={handleChange}
                name="critical_ailment"
                fullWidth
                placeholder="Critical Condition"
              />
            </Grid>
          )}

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
            <FormControl fullWidth>
              <InputLabel id="applying-for-label">Applying For</InputLabel>
              <Select
                labelId="applying-for-label"
                id="applying-for"
                label="Applying For"
                name="applying_for"
                onChange={handleChange}
                // value={formData.applying_for}
              >
                {classOptions.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="admission-year-label">Admission Year</InputLabel>
              <Select
                required
                labelId="admission-year-label"
                id="admission-year"
                label="Admission Year"
                name="admission_year"
                onChange={handleChange}
                // value={formData.admission_year}
              >
                {admissionYearOptions.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="current-class-label">Current Class</InputLabel>
              <Select
                labelId="current-class-label"
                id="current-class"
                label="Current Class"
                name="current_class"
                onChange={handleChange}
                // value={formData.current_class}
              >
                {classOptions.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <TextField
              fullWidth
              label="% secured in Prev. Class Final Exam"
              name="percentage_secured"
              type="number"
              // value={formData.percentage_secured}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="specialization-label">Specialization</InputLabel>
              <Select
                labelId="specialization-label"
                id="specialization"
                label="Specialization"
                name="specialization"
                onChange={handleChange}
                // value={formData.}
              >
                <MenuItem value="" disabled>
                  Select specialization
                </MenuItem>
                {specializationOptions.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <TextField
              fullWidth
              label="School Name"
              name="school_name"
              // value={formData.school_name}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="board-label">Board</InputLabel>
              <Select
                labelId="board-label"
                id="board"
                label="Board"
                name="board"
                onChange={handleChange}
                // value={formData.board}
              >
                {boardOptions.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {formData.board == "Other" && (
              <TextField
                sx={{ mt: 0.5 }}
                fullWidth
                placeholder="Board Name"
                // value={board}
                onChange={(e) => debounce(() => setBoard(e.target.value))}
              />
            )}
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="medium-label">Medium</InputLabel>
              <Select
                labelId="medium-label"
                id="medium"
                label="Medium"
                name="medium"
                onChange={handleChange}
                // value={formData.medium}
              >
                {mediumOptions.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {formData.medium == "Other" && (
              <TextField
                sx={{ mt: 0.5 }}
                fullWidth
                placeholder="Medium Name"
                // value={medium}
                onChange={(e) => debounce(() => setMedium(e.target.value))}
              />
            )}
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
                onChange={(e) => {
                  const _date = new Date(e);
                  const year = _date.getFullYear();
                  const month = String(_date.getMonth() + 1).padStart(2, "0");
                  const day = String(_date.getDate()).padStart(2, "0");

                  const formattedDate = `${year}-${month}-${day}`;
                  setFormData((prev) => ({
                    ...prev,
                    payment_date: formattedDate,
                  }));
                }}
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
                // value={formData.payment_mode}
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
              // value={formData.receipt_no}
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
              // value={formData.permanent_address}
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
                // value={formData.permanent_country}
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
                // value={formData.permanent_states}
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
                // value={formData.permanent_cities}
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
              // value={formData.permanent_district}
              onChange={handleChange}
              name="permanent_district"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              type="number"
              fullWidth
              label="Pin Code"
              // value={formData.permanent_pin_code}
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
            <FormControl
              Label
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
              name="guardian_name"
              value={formData.guardian_name}
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
                name="guardian_occupation"
                value={formData.guardian_occupation}
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
              name="guardian_annual_income"
              value={formData.guardian_annual_income}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              type="number"
              fullWidth
              label="Contact Number"
              value={formData.guardian_contact_number}
              onChange={handleChange}
              name="guardian_contact_number"
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
              value={formData.guardian_email}
              onChange={handleChange}
              name="guardian_email"
            />
          </Grid>
        </Grid>
      </Box>
      <Box p={2} px={6}>
        <Button fullWidth variant="contained" onClick={() => onSubmit()}>
          Submit
        </Button>
      </Box>
    </Dialog>
  );
}

export default OfflineApplicationForm;
