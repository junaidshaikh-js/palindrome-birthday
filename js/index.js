const birthDateInput = document.querySelector("#birth-date");
const form = document.querySelector("form");
const output = document.querySelector(".output");

function isPalindromeStr(str) {
  // reverser the string
  let reverse = str.split("").reverse().join("");

  // return true if palindrome else false
  return str == reverse;
}

function dateToArr(date) {
  let dateArr = date.split("-");
  return dateArr;
}

function dateVariations(Bdate) {
  let [year, month, day] = dateToArr(Bdate);

  let ddmmyyyy = day + month + year;
  let mmddyyyy = month + day + year;
  let yyyymmdd = year + month + day;
  let ddmmyy = day + month + year.slice(-2);
  let mmddyy = month + day + year.slice(-2);
  let yymmdd = year.slice(-2) + month + day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function palindromeForAllDateFormats(date) {
  // get all date formats into array
  let allDateFormats = dateVariations(date);

  // loop over all date formats and push the palindrome date into array
  for (let i = 0; i < allDateFormats.length; i++) {
    let currentDateFormat = allDateFormats[i];

    if (isPalindromeStr(currentDateFormat)) {
      return true;
      // break;
    }
  }
}

function getNextDate(date) {
  let [year, month, day] = dateToArr(date);

  const tomorrow = new Date(year, month - 1, day);

  tomorrow.setDate(tomorrow.getDate() + 1);

  let nextDate = tomorrow.getDate();
  let nextMonth = tomorrow.getMonth() + 1;
  let nextYear = tomorrow.getFullYear();

  if (nextDate < 10) {
    nextDate = "0" + nextDate;
  }

  if (nextMonth < 10) {
    nextMonth = "0" + nextMonth;
  }

  return `${nextYear}-${nextMonth}-${nextDate}`;
}

function nextPalindromeDate(date) {
  let nextDate = getNextDate(date);
  let diff = 0;

  while (true) {
    diff++;
    if (palindromeForAllDateFormats(nextDate)) {
      return [nextDate, diff];
    }

    nextDate = getNextDate(nextDate);
  }
}

function flush(message) {
  output.setAttribute("class", "result");
  output.innerHTML = '<div class="lds-ripple"><div></div><div></div></div>';

  setTimeout(() => {
    output.innerHTML = `${message}`;
  }, 2000);
}

function palindromeBirthdate(e) {
  e.preventDefault();

  // get birthdate by user
  let birthDate = birthDateInput.value;

  // check if any variation of date is palindrome
  if (palindromeForAllDateFormats(birthDate)) {
    flush("Yayy!! Your Birthdate is a Palindrome");
  } else {
    // calculate next palindrome date and difference
    let [nextPalindrome, diff] = nextPalindromeDate(birthDate);

    let [year, month, day] = dateToArr(nextPalindrome);

    flush(
      `The nearest palindrome date is ${day}-${month}-${year}, you missed by ${diff} ${
        diff > 1 ? "days" : "day"
      }`
    );
  }
}

form.addEventListener("submit", palindromeBirthdate);
