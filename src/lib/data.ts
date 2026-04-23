export const gujaratCities = [
  'Ahmedabad', 'Amreli', 'Anand', 'Bharuch', 'Bhavnagar',
  'Bhuj', 'Botad', 'Gandhinagar', 'Jamnagar', 'Junagadh',
  'Kheda', 'Mehsana', 'Narmada', 'Patan', 'Porbandar',
  'Rajkot', 'Surat', 'Tapi', 'Vadodara', 'Valsad'
].map(city => ({ value: city, label: city.toLowerCase().replace(/ /g, '_') }));

export const soilTypes = ['Alluvial', 'Black', 'Desert', 'Laterite', 'Red', 'Saline']
.map(type => ({ value: type, label: type.toLowerCase() }));

export const previousCrops = ['Bajra', 'Castor', 'Cotton', 'Gram', 'Green Gram', 'Groundnut', 'Maize', 'Paddy', 'Sesame', 'Wheat']
.map(crop => ({ value: crop, label: crop.toLowerCase().replace(/ /g, '_') }));

export const fertilizersUsed = ['None', 'Compost', 'DAP', 'NPK', 'Organic', 'Potash', 'Urea']
.map(fertilizer => ({ value: fertilizer, label: fertilizer.toLowerCase() }));

export const waterHardnessOptions = ['Soft', 'Moderate', 'Hard']
.map(option => ({ value: option, label: option.toLowerCase() }));

export const livestockOptions = ['None', 'Cattle', 'Goat', 'Mixed', 'Poultry']
.map(option => ({ value: option, label: option.toLowerCase() }));

export const resourcesOptions = ['None', 'Drip Irrigation', 'Manual Tools', 'Sprayer', 'Tractor', 'TubeWell Pump']
.map(option => ({ value: option.replace(/ /g, '_'), label: option.toLowerCase().replace(/ /g, '_') }));

export const rainfallOptions = [
  { label: 'heavy', value: '1' },
  { label: 'medium', value: '2' },
  { label: 'low', value: '3' }
];

export const languages = [
    { value: 'en', label: 'English' },
    { value: 'gu', label: 'Gujarati' },
    { value: 'hi', label: 'Hindi' },
];
