const ranges = ["Today", "Yesterday", "Last 7 Days", "Last 30 Days", "This Month", "Last Month", "Custom Range"];

const DateRangeFilter = ({ selectedRange, setSelectedRange }) => {
  return (
    <select
      className=" ml-auto w-40 "
      value={selectedRange}
      onChange={(e) => setSelectedRange(e.target.value)}
    >
      {ranges.map((range) => (
        <option key={range} value={range}>{range}</option>
      ))}
    </select>
  );
};

export default DateRangeFilter;
