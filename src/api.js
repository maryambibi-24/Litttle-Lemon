// Mock booking API. Returns deterministic "available" slots per date,
// so the same date always shows the same times.
const seededRandom = (seed) => {
  const m = 2 ** 35 - 31, a = 185852;
  let s = seed % m;
  return () => (s = (s * a) % m) / m;
};

export const fetchAPI = (date) => {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return []; // edge case: invalid date
  const random = seededRandom(d.getDate());
  const times = [];
  for (let hour = 17; hour <= 23; hour++) {
    if (random() < 0.5) times.push(`${hour}:00`);
    if (random() < 0.5) times.push(`${hour}:30`);
  }
  return times.length ? times : ['17:00']; // always offer at least one slot
};

// Pretend to save the booking. Returns true on success.
export const submitAPI = (formData) => Boolean(formData && formData.date && formData.time);
