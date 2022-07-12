import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import DoctorSignup from '~/routes/doctor/signup';

describe('choose-subscription', () => {
  test('Should contain doctor signup stepper', () => {
    render(<DoctorSignup />);

    expect(screen.getByTestId('signup-stepper')).toBeInTheDocument();
  })
})