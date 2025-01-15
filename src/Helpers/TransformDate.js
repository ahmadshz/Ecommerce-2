const TransformDate = (date) => {
    const selectedDate = new Date(date); 
  
    // Extract year, month, and day
    const year = selectedDate.getFullYear().toString();
    const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
    const day = selectedDate.getDate().toString().padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  };
  
  export default TransformDate;
  