// import React from 'react';

// function formatDate(date: Date) {
//   // Convert date to a JavaScript Date object
//   const formattedDate = new Date(date);

//   // Extracting hours, minutes, and AM/PM
//   let hours = formattedDate.getHours();
//   const minutes = formattedDate.getMinutes();
//   const ampm = hours >= 12 ? 'PM' : 'AM';

//   // Convert hours to 12-hour format
//   hours = hours % 12;
//   hours = hours ? hours : 12; // If hours is 0, set it to 12

//   // Array of month names
//   const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

//   // Get day, month, and year
//   const day = formattedDate.getDate();
//   const month = monthNames[formattedDate.getMonth()];
//   const year = formattedDate.getFullYear();

//   // Return the formatted date string
//   return `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}, ${month}. ${day}, ${year}`;
// }

// function DateTimeDisplay() {
//   const currentDate = new Date(); // Get current date and time
//   const formattedDateTime = formatDate(currentDate); // Format the date and time

//   return formattedDateTime;
// }

// export default DateTimeDisplay;


function formatDate(date: Date) {
  // Convert date to a JavaScript Date object
  const formattedDate = new Date(date);

  // Array of day names
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Extracting day of the week, hours, minutes, and AM/PM
  const dayOfWeek = dayNames[formattedDate.getDay()];
  let hours = formattedDate.getHours();
  const minutes = formattedDate.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  // Convert hours to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // If hours is 0, set it to 12

  // Array of month names
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Get day, month, and year
  const day = formattedDate.getDate();
  const month = monthNames[formattedDate.getMonth()];
  const year = formattedDate.getFullYear();
  minutes < 10 ? Number('0' + minutes) : minutes
  // Return the formatted date string
  // return `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}, ${dayOfWeek} ${month}. ${day}, ${year}`;
  return { hours, minutes, ampm, dayOfWeek, month, day, year };
}

function DateTimeDisplay() {
  const currentDate = new Date(); // Get current date and time
  const formattedDateTime = formatDate(currentDate); // Format the date and time

  return formattedDateTime;
}

export default DateTimeDisplay;
