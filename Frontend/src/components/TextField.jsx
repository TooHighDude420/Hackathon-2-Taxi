function TextField({ label, ...inputProps }) {
  return (
    <label className="mb-3 block">
      <span className="mb-1 block text-xs font-medium uppercase text-gray-500">{label}</span>
      <input
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
        {...inputProps}
      />
    </label>
  )
}

export default TextField
