import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    name: Yup.string()
        .min(2, "Name must be at least 2 characters")
        .required("Username is required"),
    class: Yup.string()
        .required("Class is required"),
        
});

export default validationSchema;