const TIME_ZONE = "America/Lima";

const timeFormatter = new Intl.DateTimeFormat("es-PE", {
  timeZone: TIME_ZONE,
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
});

const dateFormatter = new Intl.DateTimeFormat("es-PE", {
  timeZone: TIME_ZONE,
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

const clock = document.getElementById("clock");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const dateEl = document.getElementById("date");

/**
 * Read one formatted part from Intl.DateTimeFormat.formatToParts.
 * @param {Intl.DateTimeFormatPart[]} parts
 * @param {Intl.DateTimeFormatPartTypes} type
 * @returns {string}
 */
function partValue(parts, type) {
  const match = parts.find((item) => item.type === type);
  return match ? match.value : "00";
}

/**
 * Capitalize the first letter of a Spanish date string.
 * @param {string} value
 * @returns {string}
 */
function capitalize(value) {
  if (!value) {
    return value;
  }
  return value.charAt(0).toLocaleUpperCase("es-PE") + value.slice(1);
}

function renderClock() {
  const now = new Date();
  const parts = timeFormatter.formatToParts(now);
  const hours = partValue(parts, "hour");
  const minutes = partValue(parts, "minute");
  const seconds = partValue(parts, "second");

  hoursEl.textContent = hours;
  minutesEl.textContent = minutes;
  secondsEl.textContent = seconds;
  clock.dateTime = now.toISOString();
  dateEl.textContent = capitalize(dateFormatter.format(now));
}

renderClock();
window.setInterval(renderClock, 1000);
