export const formatMileage = (km: number): string =>
  km.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' km';
