function Validation(values) {
    let error = {}

    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{8,}$/

    if (values.name === "") 
    { 
        error.name = "Pole nazwa nie może być puste" 
    }
    else 
    { 
        error.name = ""
    }

    if (values.email === "") 
    { 
        error.email = "Pole email nie może być puste" 
    }
    else if (!email_pattern.test(values.email)) 
    { 
        error.email = "Błędny email" 
    }
    else 
    { 
        error.email = ""
    }

    if (values.password === "") 
    { 
        error.password = "Pole hasła nie może być puste" 
    }
    else if (!password_pattern.test(values.password)) 
    { 
        error.password = "Hasło nie spełnia wymagań"
    }
    else
    { 
        error.password = "" 
    }
    return error;
}
export default Validation;
