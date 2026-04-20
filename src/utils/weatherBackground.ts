export function getBackgroundColor(weatherId: number): string {
  if (weatherId >= 200 && weatherId < 300) return '#4a6fa5'; // Гроза
  if (weatherId >= 300 && weatherId < 400) return '#7e9eb5'; // Морось
  if (weatherId >= 500 && weatherId < 600) return '#5c7c99'; // Дождь
  if (weatherId >= 600 && weatherId < 700) return '#b0c4de'; // Снег
  if (weatherId >= 700 && weatherId < 800) return '#a4b0be'; // Туман
  if (weatherId === 800) return '#87CEEB';
  if (weatherId > 800) return '#b0c4de';
  return '#f0f0f0';
}