export const CONTACT_FORM_ERROR_MESSAGES: Record<string, Record<string, string>> = {
    firstName: {
        required: 'First name is required',
        minlength: 'Minimum 2 characters'
    },
    lastName: {
        required: 'Last name is required',
        minlength: 'Minimum 2 characters'
    },
    email: {
        required: 'Email is required',
        email: 'Please enter a valid email address'
    },
    phone: {
        required: 'Phone number is required',
        pattern: 'Digits only',
        minlength: 'Minimum 10 digits'
    },
    cell: {
        pattern: 'Digits only',
        minlength: 'Minimum 10 digits'
    },
    image: {
        invalid: 'Invalid image file or too large'
    }
};
