import { useState } from "react";

export function useValidatedForm(schema, initialValues = {}) {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    const runValidation = (data) => {
        const result = schema.safeParse(data);
        if (result.success) {
            setErrors({});
            return result.data;
        }
        const fieldErrors = {};
        result.error.issues.forEach((issue) => {
            const key = issue.path[0];
            if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
        });
        setErrors(fieldErrors);
        return null;
    };

    const setValue = (key, value) => {
        setValues((current) => {
            const next = { ...current, [key]: value };
            if (touched[key]) runValidation(next);
            return next;
        });
    };

    const handleBlur = (key) => {
        setTouched((current) => ({ ...current, [key]: true }));
        runValidation(values);
    };

    const touchAll = () => {
        setTouched((current) =>
            Object.keys(values).reduce((acc, key) => ({ ...acc, [key]: true }), current)
        );
    };

    // Exposed so callers that need to transform values (e.g. upload a
    // File to a URL) before validating can run validation on demand,
    // separately from the built-in submit flow below.
    const validate = (data) => runValidation(data);

    const handleSubmit = (onValid) => (event) => {
        event?.preventDefault();
        touchAll();
        const data = runValidation(values);
        if (data) onValid(data);
    };

    const reset = (next = initialValues) => {
        setValues(next);
        setErrors({});
        setTouched({});
    };

    const visibleErrors = Object.fromEntries(
        Object.entries(errors).filter(([key]) => touched[key])
    );

    return {
        values,
        errors: visibleErrors,
        setValue,
        handleBlur,
        handleSubmit,
        touchAll,
        validate,
        reset,
    };
}