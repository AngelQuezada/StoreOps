import React from 'react';

const FormInput = ({
	inputLabel,
	labelFor,
	inputType,
	inputId,
	inputName,
	placeholderText,
	ariaLabelName,
  onChange,  // Added this line to handle onChange from parent
  options // Added this line to handle options from parent
}) => {
	return (
		<div className="font-general-regular mb-4">
			<label
				className="block text-lg text-primary-dark dark:text-primary-light mb-1"
				htmlFor={labelFor}
			>
				{inputLabel}
			</label>
			<input
				className="w-full px-5 py-2 border border-gray-300 dark:border-primary-dark border-opacity-50 text-primary-dark dark:text-secondary-light bg-ternary-light dark:bg-ternary-dark rounded-md shadow-sm text-md"
				type={inputType}
				id={inputId}
				name={inputName}
				placeholder={placeholderText}
				aria-label={ariaLabelName}
				required
				onChange={onChange} // Added this line to use onChange from parent
				style={{
					width: '80%',  // This sets the width to 50% of its container
					height: '40px',  // This sets the height to 30 pixels
					marginTop: "10px"
				}}
			/>
      {/* Add this block if you want to use options from parent */}
      {options && options.length > 0 && 
        <datalist id="vendors">
          {options.map((option, index) => (
            <option key={index} value={option} />
          ))}
        </datalist>
      }
		</div>
	);
};

export default FormInput;
