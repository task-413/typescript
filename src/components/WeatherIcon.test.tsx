import { render, screen } from '@testing-library/react';
import { WeatherIcon } from './WeatherIcon';
import { describe, expect, it } from 'vitest';

describe('WeatherIcon', () => {
  it('renders img with correct src and alt', () => {
    render(<WeatherIcon iconCode="10d" altText="light rain" />);
    const img = screen.getByAltText('light rain');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://openweathermap.org/img/wn/10d@2x.png');
  });
});