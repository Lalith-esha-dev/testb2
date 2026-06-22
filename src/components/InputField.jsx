import { useState } from 'react';
import './InputField.css';

export default function InputField({
  value,
  onChange,
  placeholder,
  icon,
  onSubmit,
  ariaLabel,
}) {
  const [focused, setFocused] = useState(false);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && onSubmit) {
      event.preventDefault();
      onSubmit();
    }
  };

  const wrapClasses = focused
    ? 'input-field-wrap input-field-wrap-focused'
    : 'input-field-wrap';

  return (
    <div className={wrapClasses}>
      {icon ? (
        <span className="input-field-icon-wrap" aria-hidden="true">
          <span className="input-field-icon">{icon}</span>
        </span>
      ) : null}
      <input
        type="text"
        className="input-field-input"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel || placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
