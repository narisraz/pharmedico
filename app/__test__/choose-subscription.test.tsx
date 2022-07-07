import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ChooseSubscription from '../routes/choose-subscription';

describe('choose-subscription', () => {
  test('Should contain doctor subscription button', () => {
    render(<ChooseSubscription />);

    expect(screen.getByTestId('doctor-subscription')).toBeInTheDocument();
    expect(screen.getByTestId('doctor-subscription')).toHaveAttribute("href", "/doctor/signup")
  })
})