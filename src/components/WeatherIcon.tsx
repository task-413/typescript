interface WeatherIconProps {
  iconCode: string;
  altText: string;
}

export function WeatherIcon({ iconCode, altText }: WeatherIconProps) {
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  return <img src={iconUrl} alt={altText} />;
}