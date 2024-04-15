interface DateComponentProps {
  dateString: string;
}

const DateComponent: React.FC<DateComponentProps> = ({ dateString }) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);

  return <span>{formattedDate}</span>;
};

export default DateComponent;