import breakpoints from './themes/breakpoints';

export function responsiveFontSizes({ sm, lg }) {
  return {
    [`@media (max-width: ${breakpoints.values.lg}px)`]: lg,
    [`@media (max-width: ${breakpoints.values.sm}px)`]: sm
  };
}
