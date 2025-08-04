import '../css/company-department.css';


function Info({ label, value, isEditing, set, types,isCreating,isEdited }) {

    // Assuming departments is an array of objects with a 'type' property
    return (
        <>
            <div className='info'>
                <label htmlFor={label}>{label}:</label>
                {(types && types.length >= 0 && isEditing) ? (
                    <select className='info-select' id={label} value={value} onChange={(e) => set(e.target.value)}>
                        {isCreating && <option value="">{label}</option>}
                        {isEdited && <option value="">{label}</option>}
                        {types.map((type, index) => (//seçenekler types arrayinden geliyor
                            <option key={index} value={type}>{type}</option>
                        ))}
                    </select>
                ) : (
                    <input readOnly={!isEditing} type="text" id={label} value={value} onChange={(e) => set(e.target.value)} />
                )}
            </div>
        </>
    )
}

export default Info