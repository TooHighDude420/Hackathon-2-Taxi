function ToggleGroup({ legend, name, options, value, onChange }) {
  return (
    <fieldset className="mb-3">
      <legend className="mb-1 text-xs font-medium uppercase text-gray-500">{legend}</legend>
      <div className="grid grid-cols-2 gap-2">
        {options.map((option) => {
          const selected = option.value === value
          return (
            <label
              key={option.value}
              className={`cursor-pointer rounded-md border px-4 py-2 text-center text-sm font-semibold transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-blue-600 has-[:focus-visible]:ring-offset-2 ${
                selected
                  ? 'border-blue-600 bg-blue-600 text-white'
                  : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-200'
              }`}
            >
              <input
                type="radio"
                name={name}
                className="sr-only"
                checked={selected}
                onChange={() => onChange(option.value)}
              />
              {option.label}
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

export default ToggleGroup
