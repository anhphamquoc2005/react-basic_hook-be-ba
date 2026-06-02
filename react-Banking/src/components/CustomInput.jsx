export default function CustomInput({ label, name, type, register, error }) {
    return (
        <div className="mb-3">
            <label className="form-label fw-bold">{label}</label>
            <input 
                type={type}
                className={`form-control ${error ? "is-invalid" : ""}`}
                {...register(name)} 
            />

            {error && (
                <div className="invalid-feedback">
                    {error.message}
                </div>
            )}
        </div>
    )
}